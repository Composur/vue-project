import request from '../helper/req'

const URL={
   BLOG:'/blog',
   BLOGID:'/blog/:blogId',
}

export default {
    // 获取所有的blog
   getBlogs({page=1,userId,atIndex}){
        return request(URL.BLOG)
    },
    // 获取首页的blog
    getIndexBlogs({page=1}){
        return this.getBlogs({page,atIndex:true})
    },
    // 获取某个用户所有的blog
    getAllBlogsForUser(userId,{page=1,atIndex}={page:1}){
        return this.getBlogs({userId,page,atIndex})
    }, 
    // blogDetail
    getDetail({blogId}){
        return request(URL.BLOGID.replace(':blogId','blogId'))
    },
    updateBlog({blogId}){
        return request(URL.BLOGID.replace(':blogId',"blogId"),'PATCH',{title,content,description,atIndex})
    },
    delBlog({blogId}){
        return request(URL.BLOGID.replace(':blogId','blogId'),'DELETE')
    },
    createBlog({title='',content='',description=''}={title:'',content:'',description:''}){
        return request(URL.BLOG,'POST',{title,content,description})
    }
}