<template>
<div>
  <div id="file-upload">
    <el-row>
      <el-col :span="12">
        <input type="file" class="file-input" @change="handleFileChange" />
      </el-col>
      <el-col :span="12">
        <el-button @click="handleUpload" :disabled="uploadDisabled">上传</el-button>
        <!-- <el-button @click="handleResume" v-if="status === Status.pause"
        >恢复</el-button
      >
      <el-button
        v-else
        :disabled="status !== Status.uploading || !container.hash"
        @click="handlePause"
        >暂停</el-button
      > -->
      </el-col>
    </el-row>
    <el-row>
      <div>
        <div>计算文件 hash</div>
        <el-progress :percentage="hashPercentage"></el-progress>
        <div>总进度</div>
        <el-progress :percentage="allTotalPercentage"></el-progress>
      </div>
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
  server_port
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
    handleFileChange(e) {
      //  得到文件对象 包含 [name,size,type]
      const [file] = e.target.files;
      if (!file) return;
      Object.assign(this.$data, this.$options.data());
      this.container.file = file;
    },
    // 生成文件 hash（web-worker）
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
        fileHash: this.container.hash,
        index,
        hash: this.container.hash + "-" + index,
        chunk: file,
        size: file.size,
        percentage: uploadedList.includes(index) ? 100 : 0
      }));

      await this.uploadChunks(uploadedList);
    },
    // 根据 hash 验证文件是否曾经已经被上传过
    // 没有才进行上传
    async verifyUpload(filename, fileHash) {
      const {
        data
      } = await this.request({
        url: "http://localhost:" + server_port + "/admin/verify",
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
      requestList
    }) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
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
    // 生成文件切片 每个切片发送一次HTTP请求
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
          hash
        }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("hash", hash);
          formData.append("filename", this.container.file.name);
          return {
            formData
          };
        })
        .map(async ({
            formData
          }) =>
          this.request({
            url: "http://localhost:" + server_port + '/admin/upload',
            data: formData
          }));
      await Promise.all(requestList); // 并发上传切片
      await this.mergeRequset() // 这里采用的是前端通知服务端上传完成可以进行服务端合并
    },
    async mergeRequset() {
      await this.request({
        url: 'http://localhost:' + server_port + '/admin/merge',
        headers: {
          "content-type": 'application/json'
        },
        data: JSON.stringify({
          filename: this.container.file.name,
          size: SIZE,
          fileHash: this.container.hash,
        })
      })
    }
  },
  computed: {
    allTotalPercentage() {
      return this.hashPercentage
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
