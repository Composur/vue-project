### 获取veux上的state
由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态：
```javascript
computed: {
    count () {
     return this.$store.state.count
    }
  }
```

获取多个 辅助函数 mapState 返回的是一个对象
```javascript
 computed: {
    ...mapState(['address']) //映射的计算属性的名称与 state 的子节点名称相同,都是address 可以简写成这样
  },
  # 相当于
 computed: {
   address(){
     return this.$store.state.count
   }
  },
   # 相当于
 computed: mapState({
    address:state => state.address
  }),
```
### vue 模板上的数据来源
+ data
+ props
+ computed

### 1. slot/插槽
> 原理类似电脑上的 use 电源 耳机 插槽等，让使用者（一般是父组件传入的html模板）决定怎么使用 这是具名插槽
```javascript
//子组件
<header class="header">
    <slot name="left"></slot>
    <slot name="right"></slot>
</header>

//父组件
<HeaderTop :title=address showIcon>
    <span class="header_search" slot="left">
        <i class="iconfont iconicon_shaoma_xian"></i>
    </span>
    <span class="header_login" slot="right"> 
        <i class="iconfont iconicon-xiaoxi"></i>
    </span>
</HeaderTop>


```

1). 插槽的作用:
    父组件向子组件传递标签结构(也可以是数据)
    通过标签体传递, 而不再是标签属性
2). slot的分类
    普通插槽(slot)
    命名插槽(named slot)
    作用域插槽(scoped slot)（数据由子组件决定，样式由父组件决定）

    ```
    $ 父 获取数据
    <template :slot-scope="data">
        //do
    </template>
    $ 子 传递数据
     <slot :data='data'>
    
    </slot>
    
    ```

3). 区别
    普通插槽: 子组件只能有一个插槽, 标签体内容在父组件中解析好后(数据在父组件), 传递给这个插槽
    命名插槽: 子组件有多个指定了name的插槽, 标签体内容在父组件中解析好后(数据在父组件), 分别传递给对应的插槽
    作用域插槽: 数据在子组件, 子组件有部分结构需要父组件传递, 但父组件需要读取子组件数据
                子组件需要先向父组件传递数据, 父组件根据数据渲染标签结构后传递给子组件的插槽
    需求: todo列表组件: 根据内部的todos数据显示todo列表, 但列表项的样式由使用者决定

### 2. mixin/混合
    1). 作用:
        复用多个组件重复的JS代码(配置)
        一个mixin是一个可复用的组件配置对象
    2). 定义mixin
        var myMixin = {
          data () {
            return {
              a: 'a1111',
            }
          },
          computed: {
            length () {
              return this.a.length
            }
          }
        }
    3). 多组件中引入mixin
        通过mixins配置引用: mixins: [myMixin]
        mixin中的配置与当前组件的配置会自动合并


### 3. 动态组件 / 缓存组件 / 异步组件
    1). 动态组件
        通过<component :is="componentName">来动态决定渲染哪个组件
        被切换的组件默认会被自动销毁
    2). 缓存组件
        通过<keep-alive>来缓存被切换的动态组件(非路由组件)
        也可以缓存路由组件
    3). 异步组件
        在需要组件时, 才异步请求加载组件的代码(从后台)
        Vue 能够将组件定义为一个工厂函数(factory function)，此函数可以异步地解析(resolve)组件
        import()的语法比较适合的是路由组件的异步懒加载

### 4. 原生事件 / vue自定义事件 / 全局事件总线
    1). 什么条件下绑定的原生DOM事件监听?
        a. 给html标签绑定dom事件监听: <div ="handleClick">
        b. 给组件标签绑定dom事件监听(使用.native): <MyCommponent @click.native="handleClick">
    2). 什么条件下绑定的vue自定义事件监听?
        a. 自定义事件名:  <MyComponent @xxx="handleClick2">
        b. 与dom事件名同名: <MyComponent @click="handleClick">
    3). 利用vm实现全局eventBus
        a. 前置知识:
            Vue原型对象上有3个事件处理的方法: $on() / $emit() / $off()
            组件对象的原型对象是一个vm对象: 组件对象可以直接访问Vue原型对象上的方法
        b. 实现
            创建vm作为全局事件总线对象: Vue.prototype.$bus = new Vue()
            分发事件/传递数据的组件: this.$bus.$emit('eventName', data)
            处理事件/接收数据的组件: this.$bus.$on('eventName', (data) => {})

### 5. 使用组件标签上使用v-model
    1). v-model的本质
        <input v-model="name">
        <input :value="name" @input="name = $event.target.value">
    2). 在自定义组件上使用v-model
        <MyInput v-model="name">
        MyInput.vue
            props: ['value']
            <input :value='value' @input="$emit('input', $event.target.value)">

### 6. vue的响应式原理
> Vue在进行DOM渲染时会尽可能的复用已经存在的的元素，而不是重新创建元素。强制不使用的话就加一个key。
    1). 关注点有哪些?
        vue的数据绑定效果: 组件更新data数据后, 当前组件及相关的子组件都会更新相应的节点
        如何知道数据变化了?
        通知哪些组件更新渲染?
        组件更新渲染是同步还是异步的?

    2). 基本原理
        在初始化时: 利用Object.defineProperty()给data属性添加 setter 监视数据变化
        在初始化时: 每个组件实例都有相应的观察者 watcher 对象, 每个属性都关联上所有相关的watcher对象
        在更新数据后: 对应的setter调用, 通知所有相关的watcher, watcher内异步更新节点或者子组件
    
    3). 一些细节
> 数据上的一些方式是响应式的，通过数组的下标去更改数组的值做不到响应式（vue没有通过这种方式监听） 
        只有data中属性是响应式的, 只在组件对象上的属性不是响应式的
        data中所有层次属性都是响应式的
        直接能data中响应式属性对象添加一个新的属性, 默认不是响应式的, 需要用Vue提供的语法添加
            Vue.set(obj, propName, value)
            vm.$set(obj, propName, value)
        vue的异步更新: 
            vue 在内部尝试对异步队列使用原生的 Promise.then 和 MessageChannel，
            如果执行环境不支持，会采用 setTimeout(fn, 0) 代替
        关于<Root>组件标签: 
            整体应用界面的根标签不是<App>, 而是<Root>, 
            <Root>对应的是vm
            index页面中的的div元素会被替换, 而不是插入其中
        组件的data配置不能是对象?
            组件会被多次使用, 每次使用都会读取data配置值, 如果是对象, 那就会共用一个data对象
            而函数就没有问题, 因为每次调用函数返回一个新的data对象

### 7. 组件的生命周期

    1). vue的生命周期: 创建=>挂载=>更新=>销毁
    2). vue的生命周期勾子:
        初始化(一次): beforeCreate() => created() => beforeMount() => mounted()
        更新(n次): beforeUpdate() => updated()
        销毁(一次): beforeDestroy() => destroyed()
    3). 一些细节
    	beforeCreate(): 在实例初始化之后，立即同步调用，在数据观察(data observer)和 event/watcher 配置之前被调用。
    	created(): 可以读取或修改data中的数据, 已经完成数据观察(data observer)和 event/watcher 配置
    	beforeMount(): 模板已经在内存中编译, 但还没有挂载到页面上, 不能通过ref找到对应的标签
    	mounted(): 页面已经初始显示, 可以通过ref找到对应的标签
    	beforeUpdate(): 在数据更新之后, 界面更新前调用, 只能访问到原有的界面
    	updated(): 在界面更新之后调用, 此时可以访问最新的界面
    	beforeDestroy(): 实例销毁之前调用, 此时实例仍然完全可用。
    	destroyed(): Vue 实例销毁后调用, 数据绑定/事件监听器都没了, 但dom结构还在
      deactivated(): 路由组件失活, 但没有死亡
      activated(): 路由组件激活, 被复用


### v-modal 的使用
```
data(){
    $ 模板上绑定的数据类型 v-modal 的类型
    radios:Boolean,  // 单选框
    checkBox:Array,  // 多选框
    select:  String || Array   // 下拉框
}
```
#### 修饰符
1. v-modal.lazy
    + 事件触发的时候才调用，例如 input 回车的时候取值而不是实时取值
2. v-modal.number
    + 必须是数字，因为v-modal 赋值的时候是 string 类型
3. v-modal.trim
    + 去除两边的空格

### 组件化
1. 构造
    ```javascript
     const component = Vue.extend({
         templete:`<div></div>`
     })
    ```
    语法糖注册方式
    ```javascript
    Vue.component('my-component',{
         templete:`<div></div>` 
    })
    ```

2. 注册
    $ 全局注册
    
    ```javascript
    Vue.component('my-component',component)
    ```
    $ 实例下注册的组件是局部组件
3. 使用
   
    + 在创建的实例中使用

### 父子组件传参
1. 父传子，通过 props
    + 在子组件绑定props `v-bind:children-data='data'` 暂不支持驼峰命名
2. 子传父，通过 自定义事件 $emit Events 发射一个事件
    + 在子组件通过 this.$emit('事件名',obj)，事件名不支持驼峰命名
    + 父组件上监听 v-on:事件名=methods 父组件方法中获取 obj



### vue-router

> 路由表：是一个映射表，决定了数据包的指向，内网 IP 和 mac 地址绑定

#### 1.使用

+ 通过 Vue.use(Router) 安装插件

+ 通过 mode 配置 hash 和 history 两种模式

+ 可以在方法中获取 this.$router

#### 1.1 Router-link

```
 <--! 默认是 push 浏览器可以前进、回退 -->
<router-link to = '/path' replace active-class="active 可以在路由统一定义选中样式">   
```

#### 1.2

+ $route 代表当前路由 可以配置meta属性

+ $router 是路由方法






