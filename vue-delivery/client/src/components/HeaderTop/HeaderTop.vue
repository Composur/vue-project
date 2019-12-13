<template>
  <header class="header">
    <slot name="left"></slot>
    <span class="header_title">
       <span class="header_title_text ellipsis"><i class="iconfont" :class="{iconaddress:showIcon}"></i>{{title}}</span>
    </span>
    <slot name="right"></slot>
  </header>
</template>

<script>

  export default {
    props: {
      title: String,
      showIcon:Boolean
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header
    background-color #02a774
    position fixed
    z-index 100
    left 0
    top 0
    width 100%
    height 45px
    .header_search
      position absolute
      left 15px
      top 50%
      transform translateY(-50%)
      width 10%
      height 50%
      .iconicon_shaoma_xian
        font-size 20px
        color #fff
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      text-align center
      .header_title_text
        color #fff
        display block
        transform scale(0.9)
    .header_login
      font-size 14px
      color #fff
      position absolute
      right 15px
      top 50%
      transform translateY(-50%)
      .header_login_text
        font-size 20px
        color #fff
</style>