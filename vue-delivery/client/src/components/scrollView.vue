<template>
    <div ref="wrapper" >
        <slot></slot>
    </div>
</template>
<style>
.bscroll-vertical-scrollbar{
  width:10px !important; /*px*/
}
</style>

<script>
import BScroll from 'better-scroll'
import store from '../store'
import {SAVE_CURRENT} from '../store/mutation-types'
export default {
  props: {
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 列表的数据
     */
    data: {
      type: [Array,Object],
      default: null
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullup: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pulldown: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    },

    // 是否出现滚动条

    // scrollbar:{
    //   type:null,
    //   default: true

    // }
    searchToBar:{
      type:Boolean,
      default:false
    }

  },
  data(){
    return {
      domHeight:0,
      scrollbar:false,
      updateFlag:false,
      scrollFlag:false
    }
  },
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },

  updated(){

    if(store.state.cart.saveCurrent.enterDetail==true && store.state.cart.saveCurrent.enterMarket==true){
      this.scrollTo(0,store.state.cart.saveCurrent.scroll)
      return
    }
    if(this.updateFlag){
      return

    }
    if(this.scroll){

       if(this.domHeight!= this.$refs.wrapper.firstChild.offsetHeight){
          // this.updateFlag=true
        if(this.$refs.wrapper.offsetHeight<this.$refs.wrapper.firstChild.offsetHeight){
             this.scrollbar={
              fade:false,
              interactive:true
            }
            this.updateFlag=true;
            this.scroll.destroy();
            this._initScroll();

        }else{
          this.scrollbar=false;
          this.updateFlag=false;
           this.scroll.destroy();
            this._initScroll()
        }

    }
    }

  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }

      this.domHeight=this.$refs.wrapper.firstChild.offsetHeight;
      if(this.domHeight>this.$refs.wrapper.offsetHeight){

        this.scrollbar={
          fade:false,
          interactive:true
        }
      }else{
        this.scrollbar=false
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        scrollbar: this.scrollbar
      })

      // 是否派发滚动事件
      if (this.listenScroll) {
        let me = this
        this.scroll.on('scroll', pos => {
          me.$emit('scroll', pos)

        })
      }
      let me=this
      this.scroll.on('scroll',function({x,y}){

        if(store.state.cart.saveCurrent.enterMarket==true){
            store.commit(SAVE_CURRENT,{y,val:1})
    }
      })
      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {


        this.scroll.on('scrollEnd', () => {
          // 滚动到底部
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('scrollToEnd')
          }
        })
      }

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        this.scroll.on('touchend', pos => {
          // 下拉动作
          if (pos.y > 50) {
            this.$emit('pulldown')
          }
        })
      }

      // 是否派发列表滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    stop(){
      this.scroll && this.scroll.stop()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  computed:{
    scrollToFlag(){

      return store.state.cart.scrollToFlag
    }
  },
  watch: {
    scrollToFlag(newValue){

      if(newValue>0){
          if(store.state.cart.saveCurrent.enterDetail==true && store.state.cart.saveCurrent.enterMarket==true){

            setTimeout(() => {
              this.refresh();
            this.scrollTo(0,store.state.cart.saveCurrent.scroll)
            }, 50);
          }
      }
    },
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data(newValue,oldValue) {

      if(newValue.length==0){
        setTimeout(()=>{
          if(this.scroll){
            this.scroll.destroy();
             this.updateFlag=false

          this._initScroll()
          }


        } )
      }else{

         setTimeout(() => {

               this.refresh()

           },this.refreshDelay)
      }

    }

  }
}
</script>
