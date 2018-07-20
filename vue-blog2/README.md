

## 前言:首先感谢作者提供的信息
>[参考hackerwen](https://github.com/hackerwen/vue-blog)
完全使用ajax交互, 无服务端模版渲染
后端部分基本完全参考妙味课堂腾讯课堂公开的nodejs搭建博客视频
但是该视频是完全的后端项目,后端模版渲染,十分不习惯就用vue重写了
没有node基础和mongoose基础的同学可以去看看,两天快速刷完
[传送门](https://ke.qq.com/course/185893)

项目截图:
1. client


![博客首页](http://upload-images.jianshu.io/upload_images/4869616-a5a85407f8989cd5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![查看文章](http://upload-images.jianshu.io/upload_images/4869616-98902ebcb14be0c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


2. admin

![分类管理](http://upload-images.jianshu.io/upload_images/4869616-5607d40b3c962905.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![新建文章](http://upload-images.jianshu.io/upload_images/4869616-543c8a2c96fdfc6b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


使用技术:

* 前端
    1. vue
    2. vue-router 前端路由管理
    3. axios 发送ajax请求
    4. stylus css 预处理
    5. element-ui 后台管理ui
    6. marked.js 新建文章支持markdown语法
    7. highlight.js 新建文章支持代码高亮

* 后端
    1. express
    2. body-parser 获取post请求内容
    3. cookies cookie处理模块
    4. mongoose 数据库操作模块

* 功能需求

前端:

1. 首页内容聚合
2. 列表页 —— 分类列表
3. 内容页 —— 评论
4. 注册
5. 登录

后台:

1. 登录
2. 分类管理

    * 分类列表
    * 添加分类
    * 修改分类
    * 删除分类
    * 查看分类下的所有博文 (暂未实现)

3. 文章管理

    * 文章列表 : 所有文章;  按分类查看文章 (暂未实现)
    * 添加文章
    * 修改文章
    * 删除文章
    * 查看文章下所有评论(暂未实现)

4. 评论管理 (暂未实现)

    * 评论列表 : 所有评论; 查看指定文章评论
    * 删除评论

5. 移动端适配 (暂未实现)

## 开始

``` bash
# server目录以及vue项目根目录均需npm install
npm install

# 进入mongodb的bin目录启动数据库 (需了解mongodb的初步启动)
mongod --dbpath=E:\project\blog\server\db 

# 进入server目录启动服务端
node app.js

# 启动浏览器端
npm run dev
```

![启动数据库](http://upload-images.jianshu.io/upload_images/4869616-f19cc757348fdad2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![启动服务端(node)](http://upload-images.jianshu.io/upload_images/4869616-83ade7c7bc8206a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![启动浏览器端(vue)](http://upload-images.jianshu.io/upload_images/4869616-023feed148beed78.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 注意

1. cookie相关:使用axios碰到的跨域cookie问题
参考:[axios cookie问题和表单上传问题探究](http://blog.csdn.net/hongchh/article/details/72675777)

2. markdown语法支持: marked.js + highlight.js
使用方法可参见源文件 src => pages => admin => markdown.vue 有详细的使用代码
参考:[marked.js简易手册](http://www.cnblogs.com/djtao/p/6224399.html)

3. mongoose以及express等后端部分代码有详细的注释,但是基本知识还是要了解,不懂可以看前面提到的视频


