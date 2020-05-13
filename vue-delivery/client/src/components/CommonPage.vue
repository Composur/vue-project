<template>
<div class="gd-page" :style="initStyle">
  <div class="gd-header">
            <slot name="header"></slot>
     </div>
  <div class="gd-main" ref="_main" @scroll="onScroll">
    <div class="gd-scroll-wrap" :style="translateStyle" :class="{isDropped:dropped}" id="scrollWrap" ref="scrollWrap">
      <div class="load-wrap" v-if="dropFn && !isIos">
        <slot name="loadMore-up" v-if="dropFlag==0 || dropFlag==1 || dropFlag==2">
          <div>
            <!-- 下拉刷新 -->
            <mt-spinner type="snake"></mt-spinner>
          </div>
        </slot>
        <!-- 释放刷新 -->
        <!-- <slot name="loadMore-down" v-if="dropFlag==1">
                        <div>
                          <mt-spinner type="snake"></mt-spinner>
                        </div>
                    </slot> -->
        <!-- 正在加载 -->
        <!-- <slot name="loadMore-loading" v-if="dropFlag==2">
                        <div>
                          <mt-spinner type="snake"></mt-spinner>
                        </div>
                    </slot> -->
      </div>
      <slot name="main"></slot>
    </div>
    <!-- <slot v-if="infiniteFlag&&!dataFinish&&infiniteFn" name="infinite">
                <div class="infinite">
                    <mt-spinner type="snake"></mt-spinner>
                </div>
            </slot>
            <slot name="dataFinish" v-if="dataFinish">
            </slot> -->
  </div>
  <!-- <div class="gd-footer">
            <slot name="footer" class="gd-footer"></slot>
        </div>
        <div class="gd-other">
            <slot name="other"></slot>
        </div> -->
</div>
</template>

<script>
const isIos = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
export default {
  data() {
    return {
      initStyle: {
        height: '',
        width: ''
      },
      scrollCash: 0,
      infiniteFlag: false,
      infiniteEnd: true,
      dropFlag: -1, // 0 down,1 up, 2 loading
      startY: 0,
      disY: 0,
      translate: 0,
      dropped: false,
      timer: null,
      isScroll: false,
      isLoadFn: false,
      isIos: isIos
    }
  },
  props: {
    infiniteFn: {
      type: Function
    },
    dataFinish: {
      type: Boolean,
      default: false
    },
    dropFn: {
      type: Function
    }
  },
  watch: {
    dropFn: {
      handler(value) {
        if (value && typeof value === 'function') {
          if (this.isLoadFn) return
          this.$nextTick(() => {
            this.isLoadFn = true
            this.$refs.scrollWrap.addEventListener('touchstart', this.dropStart)
            this.$refs.scrollWrap.addEventListener('touchmove', this.dropMove)
            this.$refs.scrollWrap.addEventListener('touchend', this.dropEnd)
          })
        }
      },
      immediate: true
    }
  },
  created() {
    this.initStyle.height = document.documentElement.clientHeight + 'px'
    this.initStyle.width = document.documentElement.clientWidth + 'px'
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  mounted() {
    // document.body.addEventListener('touchmove', (e) => {
    //   if (!document.querySelector('.gd-scroll-wrap').contains(e.target)) {
    //     e.preventDefault();
    //   }
    // }, {
    //  passive: false
    // })
  },
  computed: {
    translateStyle() {
      if (isIos) return
      if (this.translate > 0) {
        return {
          'transform': 'translate3d(0, ' + 50 + 'px, 0)'
        }
      } else {
        return {}
      }
    }
  },
  methods: {
    resize() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        let height = document.documentElement.clientHeight + 'px'
        let width = document.documentElement.clientWidth + 'px'
        this.initStyle.height = height
        this.initStyle.width = width
      }, 200)
    },
    onScroll(e) {
      this.isScroll = true
      this.bindInfinite(e)
    },
    bindInfinite(e) {
      if (this.dataFinish || !this.infiniteFn) return
      if (this.dropFlag === 2) return
      let target = e.target
      let children = target.querySelector('.gd-scroll-wrap')
      let height = 10
      if (this.dropFn && !isIos) {
        let loadWrap = document.querySelector('.load-wrap')
        height += loadWrap.offsetHeight
      }
      if (target.scrollTop >= (children.offsetHeight - target.offsetHeight - height)) {
        (this.infiniteEnd && this.infiniteFn) && this.onInfinite()
        this.infiniteFlag = true
      } else {
        this.infiniteFlag = false
      }
    },
    dropStart(e) {
      this.isScroll = false
      this.startY = e.touches[0].clientY
      this.startOffsetTop = this.$refs._main.offsetTop
    },
    dropMove(e) {
      if (this.isScroll) return
      if (this.dropFlag === 2) return
      this.dropped = false
      this.disY = e.touches[0].clientY - this.startY
      /* disY 为手势的垂直滚动距离
       * 大于0为手势向下滚动（页面向上）
       * 小于0为手势向上滚动（页面向下）
       * startOffsetTop 为 .gd-scroll-wrap 距离页面顶部的距离
       */
      let dis = this.disY - this.startOffsetTop
      if (dis < 0) {
        return
      }
      if (dis > 0) e.preventDefault()
      dis = Math.pow(dis, 0.8)
      dis = dis > 70 ? 70 : dis
      
      let main = this.$refs._main
      if (main.scrollTop === 0) {
        this.translate = dis
        if (dis <= 50) {
          this.dropFlag = 0
        } else {
          this.dropFlag = 1
        }
      }
    },
    async dropEnd() {
      if (this.dropFlag === 2) return
      this.dropped = true
      if (this.dropFlag === 0) {
        // 下拉但不到距离，返回原始状态不允许刷新
        this.translate = 0
      } else if (this.dropFlag === 1) {
        this.dropFlag = 2
        this.dropFn && !isIos && await this.dropFn()
        setTimeout(() => {
          this.translate = 0
          this.$refs._main.scrollTop = 0
          this.dropFlag = -1
        }, 300)
      }
    },
    async onInfinite() {
      this.infiniteEnd = false
      await this.infiniteFn()
      this.infiniteEnd = true
    }
  },
  activated() {
    this.$refs._main.scrollTop = this.scrollCash
  },
  deactivated() {
    this.scrollCash = this.$refs._main.scrollTop
  }
}
</script>

<style lang="stylus" scoped>
.gd-header {
  z-index: 10;
}

.gd-page {
  display: flex;
  flex-direction: column;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  // padding-top: env(safe-area-inset-top);
}

.gd-main {
  flex: 1;
  // margin-top: vw(1); // 禁止滚动之后出现黑色边
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  position: relative;
}

.infinite {
  display: flex;
  align-items: center;
  justify-content: center;
}

.infinite-data-finish {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
}

.load-wrap {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gd-scroll-wrap {
  min-height: 100%;
}

.hasDrop {
  margin-top: -50px;
}

.isDropped {
  transition: 0.2s;
}
</style>
