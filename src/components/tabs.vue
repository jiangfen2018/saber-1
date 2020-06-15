<template>
  <div>
    <div class="tab-btn">
      <div class="btn" :class="{on:!tabShow.m1}" @click="onTabs('m1')">{{firstName}}</div>
      <div class="btn" :class="{on:!tabShow.m2}" @click="onTabs('m2')">{{secondName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    firstName: {
      type: String,
      default: ''
    },
    secondName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tabShow: {
        m1: true,
        m2: false
      },
    };
  },
  methods: {
    onTabs(i) {
      this.tabShow.m1 = false
      this.tabShow.m2 = false
      this.tabShow[i] = true
      this.$emit("onTabs", this.tabShow);
    },
  }
};
</script>
<style lang="stylus" scoped>
.tab-btn
  display: flex
  .btn
    color: #fff
    background-color: #ffa897
    width: 170px
    padding: 8px 0
    text-align: center
    cursor: pointer
    &.on
      background-color: #cdcdcd
</style>
