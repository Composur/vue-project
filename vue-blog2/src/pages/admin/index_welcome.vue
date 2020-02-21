<template>
<div>
  <div id="file-upload">
    <el-row>
      <el-col :span="12">
        <input type="file" class="file-input" @change="handleFileChange" />
      </el-col>
      <el-col :span="12">
        <el-button @click="handleUpload" :disabled="uploadDisabled">上传</el-button>
        <el-button @click="handleResume" v-if="status === Status.pause">恢复</el-button>
        <el-button v-else :disabled="status !== Status.uploading || !container.hash" @click="handlePause">暂停</el-button>
      </el-col>
    </el-row>
    <el-row>
      <div>
        <div>计算文件 hash</div>
        <el-progress :percentage="hashPercentage"></el-progress>
        <div>总进度</div>
        <el-progress :percentage="fakeUploadPercentage"></el-progress>
      </div>
    </el-row>
    <el-row>
      <template>
        <el-table :data="data" stripe header-align='center' style="width: 100%">
          <el-table-column prop="filename" label="切片名称" width="180">
          </el-table-column>
          <el-table-column prop="hash" label="切片hash" width="180">
          </el-table-column>
          <el-table-column prop="size" label="切片文件大小（kb）">
              <template v-slot="{ row }">
                  {{ row.size | transformByte }}
               </template>
          </el-table-column>
          <el-table-column prop="percentage" label="上传进度">
              <template v-slot="{ row }">
                   <el-progress :percentage="row.percentage" color="#909399"></el-progress>
               </template>
          </el-table-column>
        </el-table>
      </template>
    </el-row>
  </div>
</div>
</template>

<script>
const SIZE = 10 * 1024 * 1024; // 切片大小

const Status = {
  wait: "wait",
  pause: "pause",
  uploading: "uploading"
};
import {
  server_port,server_address
} from '../../../config/config.default.js'
export default {
  data: () => ({
    Status,
    container: {
      file: null,
      hash: "",
      worker: null
    },
    hashPercentage: 0, // 总的上传进度
    data: [],
    requestList: [],
    status: Status.wait,
    // 当暂停时会取消 xhr 导致进度条后退
    // 为了避免这种情况，需要定义一个假的进度条
    fakeUploadPercentage: 0,
    uploadDisabled: false,
  }),
  methods: {
    // 接收 input 文件
    handleFileChange(e) {
      //  得到文件对象 包含 [name,size,type]
      const [file] = e.target.files;
      if (!file) return;
      Object.assign(this.$data, this.$options.data());
      this.container.file = file;
    },
    // 生成hash  hash（web-worker）
    calculateHash(fileChunkList) {
      return new Promise(resolve => {
        // HTML5 优化部分 
        // web Worker 会开一个线程去计算 hash 不会影响UI主线程的
        this.container.worker = new Worker('/static/hash.js');
        // 链接 UI 线程和 hash 线程 通过事件订阅的方式传送 fileChunkList
        this.container.worker.postMessage({
          fileChunkList
        });
        // 计算完成 回调得到 hash 
        this.container.worker.onmessage = e => {
          const {
            percentage,
            hash
          } = e.data;
          // 总进度
          this.hashPercentage = percentage;
          if (hash) {
            resolve(hash);
          }
        };
      });
    },
    // 上传
    async handleUpload() {
      if (!this.container.file) return;
      this.status = Status.uploading;
      // 分片
      const fileChunkList = this.createFileChunk(this.container.file)

      // 得到文件生成的 hash 
      this.container.hash = await this.calculateHash(fileChunkList);
      const {
        shouldUpload,
        uploadedList
      } = await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      );
      // hash 校验失败 或者文件已经存在
      if (!shouldUpload) {
        this.$message.success("秒传：上传成功");
        this.status = Status.wait;
        return;
      }
      // 上传的内容
      this.data = fileChunkList.map(({
        file
      }, index) => ({
        fileHash: this.container.hash, // 整个文件的 hash 
        index,
        hash: this.container.hash + "-" + index, // 切片文件名，每个唯一可追踪。
        filename: this.container.file.name + "-" + index,
        chunk: file,
        size: file.size,
        percentage: uploadedList.includes(index) ? 100 : 0 // 当前切片是否已经上传 
      }));

      await this.uploadChunks(uploadedList);
    },

    // 上传校验 返回是否需要上传 和已经上传的百分比
    async verifyUpload(filename, fileHash) {
      const {
        data
      } = await this.request({
        // url: "http://localhost:" + server_port + "/admin/verify",
        url:server_address+ "/admin/verify",
        headers: {
          "content-type": "application/json"
        },
        data: JSON.stringify({
          filename,
          fileHash
        })
      });
      return JSON.parse(data)
    },

    // 原生请求封装
    request({
      url,
      method = "post",
      data,
      headers = {},
      onProgress = e => e,
      requestList
    }) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = onProgress
        xhr.open(method, url);
        Object.keys(headers).forEach(key =>
          xhr.setRequestHeader(key, headers[key])
        );
        xhr.send(data);
        xhr.onload = e => {
          resolve({
            data: e.target.response
          });
        };
      });
    },

    // 生成文件切片 
    createFileChunk(file, size = SIZE) {
      const fileChunkList = [];
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push({
          file: file.slice(cur, cur + size)
        });
        cur += size;
      }
      return fileChunkList;
    },

    // 上传切片
    async uploadChunks(uploadedList = []) {
      const requestList = this.data
        .map(({
          chunk,
          hash,
          index
        }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("hash", hash);
          formData.append("filename", this.container.file.name);
          formData.append("fileHash", this.container.hash);
          return {
            formData,
            index
          };
        })
        .map(async ({
            formData,
            index
          }) =>
          this.request({
            url: server_address+ '/admin/upload',
            data: formData,
            onProgress: this.createProgressHandler(this.data[index]),
          }));
      await Promise.all(requestList); // 并发上传切片
      await this.mergeRequset() // 这里采用的是前端通知服务端上传完成可以进行服务端合并
    },

    // 发送合并请求
    async mergeRequset() {
      await this.request({
        url: server_address + '/admin/merge',
        headers: {
          "content-type": 'application/json'
        },
        data: JSON.stringify({
          filename: this.container.file.name,
          size: SIZE,
          fileHash: this.container.hash,
        })
      })
    },

    // 上传暂停
    handlePause() {
      return
    },

    // 上传恢复
    handleResume() {
      return
    },

    // 上传过程中的进度
    createProgressHandler(item) {
      return e => {
        item.percentage = parseInt(String((e.loaded / e.total) * 100));
      };
    }
  },
  computed: {

  },
  filters: {
    transformByte(val) {
      return Number((val / 1024).toFixed(0));
    }
  },
};
</script>

<style>
#file-upload {
  display: block;
  width: 100%;
  padding: 30px;
}

.file-input {
  border: 2px solid #2ca2fc;
  outline: none;
  border-radius: 2px;
}
</style>
