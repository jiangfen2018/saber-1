
<template>
  <div class="wrapper">
    <div class="list-box">
      <div class="list"
           v-for="item in data"
           :key="item.id">
        <div class="title">{{item.name}}</div>
        <div class="btn-wrapper">
          <div class="btn btn1"
               @click="onClickConfig(item)">配件</div>
          <div class="btn btn2"
               @click="onClickSee(item)">查看</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {
    onClickConfig(item) {
      this.$emit("onClickConfig", item);
    },
    onClickSee(item) {
      this.$emit("onClickSee", item);
    }
  }
};
</script>

<style lang="stylus" scoped>

.list-box {
  display: flex;
  flex-flow: wrap;

  .list {
    background-color: #fff;
    padding: 15px 20px;
    width: 190px;
    margin: 10px;

    .title {
      color: #303133;
      font-size: 0.07rem;
      text-align: center;
    }

    .btn-wrapper {
      display: flex;
      padding-top: 20px;
      justify-content: space-between;

      .btn {
        width: 60px;
        font-size: 0.07rem;
        padding: 2px 0;
        border-radius: 4px;
        text-align: center;
        color: #fff;
        cursor: pointer;

        &.btn1 {
          background-color: #8693f3;
        }

        &.btn2 {
          background-color: #89c3f8;
        }
      }
    }
  }
}
</style>
