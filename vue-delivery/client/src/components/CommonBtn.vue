<template>
<div class="common-btn" @click="clickHandler">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: "commonBtn",
  props: ['type'],
  methods: {
    clickHandler() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.common-btn {
  height: 30px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #19a675;
  color: #ffffff;
}
</style>
