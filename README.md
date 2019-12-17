## [vue博客](https://github.com/Composur/vue-project/tree/master/vue-blog2)
  + [预览](https://blog.xutong.top/)
## [vue 饿了么](https://github.com/Composur/vue-project/tree/master/vue-delivery) 
  + [预览](https://blog.xutong.top/)


## 目录结构

### server/src
|文件目录 |含义 |
| ----- | ------  |
| api | 请求接口相关  |
| assets | 公用资源  |
| mock | 模拟数据  |
| components | 公共组件（非路由组件）  |
| pages | 路由组件  |
| store | vuex 相关  |
| vue.config | 覆盖 vue-cli 配置文件  |
| App.vue | 应用根模块  |
| main.js| 应用入口  |


### client 客户端，用户交互
  + [预览链接](https://react.xutong.top/)

#### 首页

![home](./client/doc/img/home.jpg)
![login](./client/doc/img/login.jpg)
![order](./client/doc/img/order.jpg)
![user](./client/doc/img/user.jpg)

### server 服务端，为 client 提供API服务
  + 包含 `api` 文档， `mock` 数据
  + data 目录下为原始数据，可以导入到 `MongoDB`

    ```
      db.shops.insertMany([...])
    ```
