import blog from '../../api/blog'
export default {
    data() {
      return {
        title: '',
        content: '',
        description:'',
        atIndex:false
      }
    },
    methods:{
        onCreate() {
           blog.createBlog({
            title:this.title,
            content:this.content,
            description:this.description,
            atIndex:this.atIndex
           }).then((res)=>{
            //  this.$message(res.msg)
            console.log('创建成功！')
            this.$router.push(`/detail/${res.data.id}`)
           })
        }
    }
  };



  