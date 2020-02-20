<template>
<div>
  <input type="file" @change="handleFileChange" />
  <el-button @click="handleUpload">上传</el-button>
</div>
</template>

<script>
const SIZE = 10 * 1024 * 1024; // 切片大小
import {server_port} from '../../../config/config.default.js'
export default {
  data: () => ({
    container: {
      file: null,
      hash:''
    },
    data: []
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
        this.container.worker = new Worker('/hash.js');
        this.container.worker.postMessage({ fileChunkList });
        this.container.worker.onmessage = e => {
          const { percentage, hash } = e.data;
          this.hashPercentage = percentage;
          if (hash) {
            resolve(hash);
          }
        };
      });
    },
    async handleUpload() {
      if (!this.container.file) return;
   
      // 分片
      const fileChunkList = this.createFileChunk(this.container.file)  
      // this.container.hash = await this.calculateHash(fileChunkList);
      this.data = fileChunkList.map(({
        file
      }, index) => {
        return {
          chunk: file,
          hash: this.container.file.name + '_' + index  //定义一个 hash 
        }
      })
      await this.uploadChunks()
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
    async uploadChunks() {
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
            url: "http://localhost:"+server_port+'/admin/upload',
            data: formData
          }));
      await Promise.all(requestList); // 并发上传切片
      await this.mergeRequset() // 这里采用的是前端通知服务端上传完成可以进行服务端合并
    },
   async mergeRequset(){
      await this.request({
        url:'http://localhost:'+server_port+'/admin/merge',
        headers:{
          "content-type":'application/json'
        },
        data:JSON.stringify({
          filename:this.container.file.name,
          size:SIZE,
          fileHash: this.container.hash,
        })
      })
    }
  }
};
</script>
