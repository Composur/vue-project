<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button  @click="open()">错误</el-button>
    <el-button  @click="open1()">test</el-button>
    <el-button  @click="open2()">register</el-button>
    <el-button  @click="open3()">login</el-button>
    <el-button  @click="open4()">logInfo</el-button>
    <el-button  @click="open5()">logOut</el-button>
  </div>
</template>

<script src='./index.js'></script>
<style scoped lang='less' src='./index.less'></style>
