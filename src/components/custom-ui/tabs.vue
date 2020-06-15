<template>
  <div>
    <div class="tab-btn">
      <div class="btn" v-for="item in option" :key="item.id" :class="{on:item.id===curButton}" @click="onTabs(item.id)">{{item.title}}</div>
      <div class="btn-add" v-if="isDialogBtn" style="padding: 4px 10px;">
        <el-button icon="el-icon-plus" circle size='mini' @click="openAdd"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    option: {
      type: Array,
      default: function () {
        return []
      }
    },
    isDialogBtn: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      curButton: 0
    };
  },
  methods: {
    openAdd() {
      this.$emit("openAdd");
    },
    onTabs(id) {
      this.curButton = id
      this.$emit("onTabs", id);
    },
  }
};
</script>
<style lang="stylus" scoped>
.tab-btn
  display: flex
  .btn
    color: #fff
    background-color: #cdcdcd
    width: 170px
    padding: 8px 0
    text-align: center
    cursor: pointer
    margin-right: 2px
    &.on
      background-color: #ffa897
</style>
