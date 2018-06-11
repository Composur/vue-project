<template>
  <div id="edit">
    <h1>创建文章</h1>
    <h3>文章标题</h3>
    <el-input v-model="title"></el-input>
    <p class="msg">限30个字</p>
    <h3>内容简介</h3>
    <el-input type="textarea" v-model="content" autosize></el-input>
    <p class="msg">限30个字</p>
    <h3>文章内容</h3>
    <el-input type="textarea"  v-model="description"  :autosize="{ minRows: 8, maxRows: 15}"></el-input>
    <p class="msg">限30个字</p>
    <p>
      是否展示到首页
    <el-switch
      v-model="atIndex"
      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch>
   </p>
    <el-button v-on:click='onCreate()'>确定</el-button>
  </div>
</template>

<script src='./create.js'></script>

<style scoped src='./create.less'></style>


