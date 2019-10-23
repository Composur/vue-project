<template>
	<div>
		<el-row>
<!-- <el-input v-model="input" placeholder="请输入内容" clearable></el-input> -->
	   <el-upload
  class="upload-demo"
  drag
  action='http://localhost:8081/admin/upload'
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
</el-upload>
	     <el-button calss='btn' type="primary" @click='download'>下载<i class="el-icon-download el-icon--right"></i></el-button>
		</el-row>
	</div>
</template>
<script>
export default {
  data() {
    return {
      btn: "点击下载",
      input: ""
    };
  },
  methods: {
    upload() {
		this.$http.post('/admin/upload',{

		}).then(function(res){
			console.log(res)
		})
	},
	download() {
		this.$http.get('/admin/download').then(function(res){
			console.log(res)
		})
	}
  }
};
</script>

<style lang="less">
.btn {
  margin-top: 10px;
}
</style>

