### 获取veux上的state
由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态：
```
computed: {
    count () {
     return this.$store.state.count
    }
  }
```

获取多个 辅助函数 mapState 返回的是一个对象
```
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


