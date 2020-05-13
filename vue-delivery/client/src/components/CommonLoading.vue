<template>
  <div class="loading" v-if="loading">
    <mt-spinner type="snake"></mt-spinner>
  </div>
</template>

<script>
export default {
  name: "commonLoading",
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style>
.loading {
  color: #a6a6a6;
  padding-bottom: vw(40);
  display: flex;
  justify-content: center;
  align-items: center;
  height: vw(250);
}
</style>
