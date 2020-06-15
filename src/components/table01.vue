/* 价格列表 */
<template>
  <div class="wrapper">
    <div class="list" v-for='item in data' :key="item.chart">
      <div class="left">
        <h3>{{item.deviceName}}</h3>
        <p>{{item.projectName}}</p>
        <p>{{item.flow}}机{{item.flow}}流项目</p>
        <p>{{item.projectCreateTime |timeFilter}}</p>
      </div>
      <div class="middle">
        <div class="item">
          <div class="head">图号</div>
          <div class="text">{{item.chart}}</div>
        </div>
        <div class="item">
          <div class="head">修改时间</div>
          <div class="text">{{item.updateTime |timeFilter}}</div>
        </div>
        <div class="item">
          <div class="head">标准号</div>
          <div class="text">{{item.standard}}</div>
        </div>
        <div class="item">
          <div class="head">系数</div>
          <div class="text">{{item.normalTradeRatio}}</div>
        </div>
        <div class="item">
          <div class="head">其他</div>
          <div class="text">{{item.otherPrice}}</div>
        </div>
        <div class="item">
          <div class="head">人工</div>
          <div class="text">{{item.manMadePrice}}</div>
        </div>
        <div class="item">
          <div class="head">钢材</div>
          <div class="text">{{item.q235Price}}</div>
        </div>
        <div class="item">
          <div class="head">材料</div>
          <div class="text">{{item.materialPrice}}</div>
        </div>
        <div class="item">
          <div class="head">成本</div>
          <div class="text">{{item.materialCostPrice}}</div>
        </div>
        <div class="item">
          <div class="head">备注</div>
          <div class="text">{{item.reason}}</div>
        </div>
      </div>
      <div class="right" @click="goTo(item)">
        <div class="right-box">
          <h1>当前价格</h1>
          <h1 class="price">￥{{item.normalTradePrice}}</h1>
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
      default: function () {
        return []
      }
    }
  },
  data() {
    return {

    };
  },
  computed: {},
  created() {

  },
  methods: {
    goTo(item) {
      this.$emit("goDetail", item);
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper
  .list
    display: flex
    height: 134px
    margin-bottom: 20px
    .left
      background-color: #ffa897
      color: #ffffff
      font-size: 14px
      padding: 0 20px
      width: 110px
      h1
        font-size: 28px
        font-weight: normal
        margin: 10px 0
      p
        margin: 4px 0
    .middle
      display: flex
      color: #303133
      flex: 1
      background-color: #ffffff
      padding: 20px
      align-items: center
      .item
        flex: 1
        font-size: 14px
        .head
          border-bottom: none
        div
          border: 1px solid #DCDFE6
          border-right: none
          height: 30px
          line-height: 30px
          text-align: center
        &:last-child
          border-right: 1px solid #DCDFE6
    .right
      background-color: #89c3f8
      color: #ffffff
      width: 120px
      text-align: center
      display: flex
      cursor: pointer
      align-items: center
      .right-box
        flex: 1
        h1
          font-size: 18px
          font-weight: normal
          width: 100%
          margin: 10px 0
        .price
          font-size: 28px
</style>
