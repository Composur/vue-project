<template>
  <div class="border" id="container">
    <svg :width='svgWidth' :height='svgHeight'>
      <g>
        <rect></rect>
      </g>
    </svg>
  </div>
</template>
<script>

import * as d3 from 'd3'
const {sacleLinear,scaleBand,max,min,selectAll,transition} = d3
export default {
  name:'BarChart',
  data() {
    return {
      svgWidth:0,
      svgHeight:0
    }
  },
  created() {
    console.log(d3)
  },
  mounted() {
    this.svgWidth=document.querySelector('#container').offsetWidth*0.95
  },
}
</script>
<style lang="less">
.border{
  border: 1px solid red;
}
</style>