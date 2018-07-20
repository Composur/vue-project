<template>
  <div class="category_add">
    <breadcrumb path="新建分类"></breadcrumb>
    <el-form :model="form" :rules="rules">
      <el-form-item label="分类名称" prop="newCateName">
        <el-input v-model="form.newCateName" placeholder="请输入新的分类名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="es6">
  import breadcrumb from '../../components/breadcrumb.vue'
  export default {
    data() {
      return {
        form: {
          newCateName: '',
        },
        rules: {
          newCateName: [
            {required: true, message: '请输入新的分类名称', trigger: 'blur'},
          ],
        },
      }
    },
    methods: {
      onSubmit() {
        if (this.form.newCateName == '') {
          this.$message({
            message: '分类名不能为空',
            type: 'warning'
          });
          return;
        }
        this.$http.post('http://'+this.$url+':8081/admin/category/add', {
          name: this.form.newCateName,
        }).then(response => {
          if (response.data.code != 0) {
            this.$message({
              message: response.data.message,
              type: 'warning'
            });
          } else {
            this.$message({
              message: response.data.message,
              type: 'success'
            });
          }
          this.form.newCateName = '';
        }, response => {
          console.log('error:' + response);
        })
      },
    },
    components: {
      breadcrumb,
    }
  }

</script>

<style lang="stylus">
</style>
