<template>
  <div class="content_index">
    <breadcrumb path="文章管理"></breadcrumb>
    <el-table
      :data="tableData"
      border
      style="width: 85%">
      <el-table-column
        prop="_id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题">
      </el-table-column>
      <el-table-column
        prop="category.name"
        label="所属分类">
      </el-table-column>
      <el-table-column
        prop="user.username"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="addTime"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="views"
        label="阅读量">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">
            <router-link :to="{path: '/admin/content/edit', query:{id: scope.row._id}}">编辑</router-link>
          </el-button>
          <el-button type="text" size="small" @click="deleteContent(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pager :url='url' @getData="gotIt" v-if="render"></pager>
  </div>
</template>

<script type="es6">
  import pager from '../../components/pager.vue'
  import breadcrumb from '../../components/breadcrumb.vue'
  export default {
    data() {
      return {
        tableData: [],
        url: '/admin/content?page=',
        render: true,
      }
    },
    methods: {
      gotIt(response) {
        response.data.contents.forEach((content) => {
          content.addTime = this.formatDate(content.addTime);
        })
        this.tableData = response.data.contents;
      },
      deleteContent(id) {
        this.$http.get('/admin/content/delete?id=' + id).then(response => {
          this.render = false;
          this.$nextTick(function () {
            this.render = true;
          })
          this.$message({
            message: response.data.message,
            type: 'success'
          });
        }, response => {
          console.log('error:' + response);
        })
      },
    },
    components: {
      breadcrumb,
      pager,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
