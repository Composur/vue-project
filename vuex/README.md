#### vuex笔记
+ 首先明白什么是状态管理模式

```
     // state
  data() {
    return {
      count:0
    }
  },
  // actions
  methods:{
    increment() {
      this.count++
    },
    subtract() {
      this.count--
    },
  }
```
+ state可以理为初始的数据，是数据源，当用户再view进行actions的操作会导致数据源发生改变，然后的view上的数据发生改变
+ 每一个vuex应用的核心就是store是一个容器，包含state（状态）有点类似全局对象，但也不一样，state中的状态是响应式的和组件中的数据一致，vuex中不能直接操控state，需要通过显示的commit mutation来改变


