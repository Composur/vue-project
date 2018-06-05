<template>
  <div id="index">
    <section class="item">
      <h3>前端布局基础概述 <span>3天前</span></h3>
      <span class="avatar">
           <img src="@/assets/logo.png" alt="">
           <figcaption>作者</figcaption>
      </span>
      <p>BFC, 全称是block formatting context，它是一个独立封闭的渲染区域，在这个区域内的所有元素，从区域的顶部起，一个接一个地根据自身的布局特性进行排列：在这个区域内的块级元素 ，按从上到下的顺序显示，相邻的块级元素可以使用margin隔离，但在垂直方向上相邻的块级元素会发生margin合并；在这个区域内的inline-level或inline-level-block元素，则按从左到右的顺序显示（W3C组织说BFC内部的元素都是一个接一个地垂直显示，我觉得不是很严格，因为BFC内部也可以容纳inline-level和inline-level-block元素，所以这里我的解释和W3C还是稍微有一些不一样）。具有BFC格式化环境的元素，我们称之为BFC元素，可以说，BFC定义了BFC元素content区域的渲染规则。</p>
    </section>
  </div>
</template>

<script src='./index.js'></script>
<style scoped lang='less' src='./index.less'></style>
