<template>
  <div>
    <DetailHead/>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/detail/orderFood" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/detail/appraise" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/detail/business" replace>商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import Vue from 'vue'
import {mapActions,mapState} from 'vuex'
import {GET_FOOD_INFO} from '../../store/mutations_types.js'
import DetailHead from '@components/DetailHead/DetailHead'
import Appraise from './Appraise'
import Business from './Business'
import OrderFood from './OrderFood'
// import { Navbar, TabItem , TabContainer, TabContainerItem} from 'mint-ui';

// Vue.component(Navbar.name, Navbar);
// Vue.component(TabItem.name, TabItem);
// Vue.component(TabContainer.name, TabContainer);
// Vue.component(TabContainerItem.name, TabContainerItem);
export default {
  data() {
    return {

    }
  },
  mounted() {
    this[GET_FOOD_INFO]()
  },
  methods: {
    ...mapActions([GET_FOOD_INFO])
  },
  computed: {
  },
  components:{
    DetailHead,
    Appraise,
    Business,
    OrderFood
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
