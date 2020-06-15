<template>
  <div class="wrapper">
    <h3>{{allData.equipment}}</h3>
    <div class="table">
      <div class="item">
        <div class="title">类型</div>
        <div class="text">{{allData.type}}</div>
      </div>
      <div class="item">
        <div class="title">单位</div>
        <div class="text">{{allData.unit}}</div>
      </div>
      <div class="item">
        <div class="title">型号</div>
        <div class="text">{{allData.model}}</div>
      </div>
      <div class="item">
        <div class="title">标准号</div>
        <div class="text">{{allData.standard}}</div>
      </div>
      <div class="item">
        <div class="title">图号</div>
        <div class="text">{{allData.chart}}</div>
      </div>
      <div class="item">
        <div class="title">重量（吨）</div>
        <div class="text">{{allData.weight}}</div>
      </div>
      <div class="item">
        <div class="title">材料</div>
        <div class="text">{{allData.material}}</div>
      </div>
      <div class="item">
        <div class="title">参数</div>
        <div class="text">{{allData.param}}</div>
      </div>
    </div>

    <div class="cur-price" v-if='isEdit' @click="openEditDialog">
      <div class="text">当前价格</div>
      <div class="btn">修改</div>
    </div>
    <h3 v-else>当前价格</h3>
    <div class="table style">
      <div class="item">
        <div class="title">交易系数</div>
        <div class="text">{{allData.sequencePrice.normalTradeRatio}}</div>
      </div>
      <div class="item">
        <div class="title">交易价格</div>
        <div class="text">{{allData.sequencePrice.normalTradePrice}}万元</div>
      </div>
      <div class="item">
        <div class="title">设备成本</div>
        <div class="text">{{allData.sequencePrice.materialCostPrice}}万元</div>
      </div>
      <div class="item" v-if="fromPage==='deviceprice'">
        <div class="title">人工</div>
        <div class="text">{{allData.sequencePrice.manMadePrice}}万元</div>
      </div>
      <div class="item" v-if="fromPage==='deviceprice'">
        <div class="title">其他</div>
        <div class="text">{{allData.sequencePrice.otherPrice}}万元</div>
      </div>
      <div class="item">
        <div class="title">调整价格原因</div>
        <div class="text">{{allData.sequencePrice.reason}}</div>
      </div>
      <div class="item">
        <div class="title">调整价格时间</div>
        <div class="text">{{allData.sequencePrice.updateTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
    isEdit: {
      type: String,
      default: undefined
    },
    fromPage: {
      type: String,
      default: undefined
    },
  },
  watch: {
    data: {
      handler(newValue) {
        this.allData = newValue
      },
      deep: true
    }
  },
  data() {
    return {
      allData: {
        type: undefined,
        unit: undefined,
        model: undefined,
        standard: undefined,
        chart: undefined,
        weight: undefined,
        material: undefined,
        param: undefined,
        sequencePrice: {
          normalTradeRatio: undefined,
          currentMoney: undefined,
          normalTradePrice: undefined,
          materialCostPrice: undefined,
          reason: undefined,
          updateTime: undefined,
          manMadePrice: undefined,
          otherPrice: undefined,
        }
      }
    }
  },
  computed: {},
  created() {
    if (JSON.stringify(this.data) != "{}") {
      this.allData = this.data
    }
  },
  methods: {
    openEditDialog() {
      this.$emit("openEditDialog");
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper
  background-color: #fff
  margin-left: 10px
  margin-right: 10px
  padding: 30px 10px 20px 10px
  h3
    color: #606266
    font-size: 14px
    font-weight: normal
  .table
    background-color: #8693f3
    display: flex
    color: #ffffff
    font-size: 14px
    border-radius: 4px
    width: 1000px
    line-height: 35px
    .item
      margin: 15px
      text-align: center
      flex: 1
      .title
        color: #EBEEF5
      .text
        line-height: 18px;
    &.style
      background-color: #89c3f8
  .cur-price
    display: flex
    margin-top: 20px
    margin-bottom: 10px
    width: 1000px
    .text
      flex: 1
      color: #606266
      font-size: 14px
    .btn
      flex: 1
      font-size: 16px
      color: #89c3f8
      cursor: pointer
      text-align: right
      padding-right: 35px
      height: 27px
      line-height: 27px
      background: url('../assets/img/xiugai.png') no-repeat
      background-position: right 50%
</style>
