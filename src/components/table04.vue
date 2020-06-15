/* 项目列表 */
<template>
  <div class="wrapper">
    <div class="list"
         v-for='item in data'
         :key="item.id">
      <h3>{{item.projectName}}</h3>
      <div class="line"><span class="tip">客户</span><span class="text">{{item.customerName}}</span></div>
      <div class="line"><span class="tip">创建时间</span><span class="text">{{item.createTime | timeFilter}}</span></div>
      <div class="line"><span class="tip">当前状态</span><span class="text">{{item.progressName}}</span></div>
      <div class="line"><span class="tip">负责人</span><span class="text">{{item.userName}}</span></div>
      <div class="line"><span class="tip">下次跟进</span><span class="text">{{item.nextTime | timeFilter}}</span></div>
      <div class="buttonline">
        <div class="btn"
             @click="goDetail(item)">点击进入</div>
        <!-- <div class="btn"
             @click="createDesign(item)">任务单生成</div> -->
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
    goDetail(item) {
      this.$emit("goDetail", item);
    },
    createDesign(item) {
      this.$emit("createDesign", item);
    }
  }
};
</script>

<style lang="stylus" scoped>
.list {
  display: inline-block;
  width: 280px;
  background-color: #fff;
  color: #303133;
  padding-bottom: 10px;
  font-size: 0.07rem;
  margin-right: 32px;
  margin-top: 20px;
  padding-bottom: 10px;

  &:last-child {
    margin-right: 0;
  }

  h3 {
    font-size: 0.07rem;
    font-weight: normal;
    text-align: center;
    border-bottom: 1px solid #DCDFE6;
    line-height: 40px;
    margin-bottom: 0;
    margin-top: 0;
  }

  .line {
    line-height: 32px;
    padding: 0 30px;

    .tip {
      width: 70px;
      display: inline-block;
      text-align: justify;
      text-align-last: justify;
      margin-right: 20px;

      &:after {
        content: ':';
      }
    }

    .text {
      color: #606266;
    }
  }

  .buttonline {
    display: flex;
    flex-direction: row;
  }

  .btn {
    width: 80px;
    margin: 10px auto 0 auto;
    padding: 6px 0;
    border-radius: 2px;
    color: #fff;
    text-align: center;
    background-color: #8693f3;
    cursor: pointer;
  }
}
</style>
