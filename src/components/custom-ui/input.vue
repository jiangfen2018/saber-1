<template>
  <div class="c-box">
    <input type="text" @input="$emit('input',$event.target.value)">
  </div>
</template>

<script>
export default {
  props: {
    value: [String]
  },
};
</script>
<style lang="stylus" scoped>
.c-box
  display inline
  input
    background: none
    border: 1px solid #C0C4CC
    width: 90px
    // margin-left 10px
</style>
