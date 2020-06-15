<template>
  <div class="wrapper">
    <ctabs @onTabs='onTabs'
           :option="option"
           style="padding-buttom:10px"></ctabs>
    <div class="center"></div>
    <div class="table"
         v-if="tabShow===1">
      <div class="item">
        <div class="title">名称</div>
        <div class="text">{{allData.customerName}}</div>
      </div>
      <div class="item">
        <div class="title">联系人</div>
        <div class="text">{{allData.contacts}}</div>
      </div>
      <div class="item">
        <div class="title">负责人</div>
        <div class="text">{{allData.userName}}</div>
      </div>
      <div class="item">
        <div class="title">电话</div>
        <div class="text">{{allData.phone}}</div>
      </div>
      <div class="item">
        <div class="title">描述</div>
        <div class="text">{{allData.remark}}</div>
      </div>
      <div class="item">
        <div class="title">客户所在地区</div>
        <div class="text">{{allData.inArea}}</div>
      </div>
      <div class="item">
        <div class="title">详细地址</div>
        <div class="text">{{allData.address}}</div>
      </div>
    </div>

    <div class="table style"
         v-if="tabShow===0">
      <div class="item">
        <div class="title">名称</div>
        <div class="text">{{allData.projectName}}</div>
      </div>
      <div class="item">
        <div class="title">类型</div>
        <div class="text">{{allData.typeName}}</div>
      </div>
      <div class="item">
        <div class="title">机型</div>
        <div class="text">{{allData.model}}</div>
      </div>
      <div class="item">
        <div class="title">铸机流数</div>
        <div class="text">{{allData.flow}}</div>
      </div>
      <div class="item">
        <div class="title">弧度半径</div>
        <div class="text">{{allData.radiusGyration}}</div>
      </div>
      <div class="item">
        <div class="title">浇筑钢种</div>
        <div class="text">{{allData.steelGrade}}</div>
      </div>
      <div class="item">
        <div class="title">浇筑断面</div>
        <div class="text">{{allData.section}}</div>
      </div>
      <div class="item">
        <div class="title">定尺长度</div>
        <div class="text">{{allData.fixed}}</div>
      </div>
      <div class="item">
        <div class="title">合同号</div>
        <div class="text">{{allData.contractNo}}</div>
      </div>
      <div class="item">
        <div class="title">备注</div>
        <div class="text">{{allData.remark}}</div>
      </div>
      <div class="item">
        <div class="title">时间</div>
        <div class="text">{{allData.updateTime | timeFilter}}</div>
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
      handler (newValue) {
        this.allData = newValue
      },
      deep: true
    }
  },
  data () {
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
      },
      tabShow: 0,
      option: [
        { title: '项目基本信息', id: 0 },
        { title: '公司基本信息', id: 1 }
      ],
    }
  },
  computed: {},
  created () {
    if (JSON.stringify(this.data) != "{}") {
      this.allData = this.data
    }
  },
  methods: {
    onTabs (id) {
      this.tabShow = id
    },
    openEditDialog () {
      this.$emit("openEditDialog");
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  display: flex;
  flex-direction: column;

  h3 {
    color: #606266;
    font-size: 14px;
    font-weight: normal;
  }

  .center {
    height: 10px;
  }

  .table {
    background-color: #8693f3;
    display: flex;
    color: #ffffff;
    font-size: 14px;
    border-radius: 4px;
    line-height: 35px;

    .item {
      margin: 15px 8px;
      text-align: center;
      display: flex;
      flex-direction: column;

      .title {
        color: #EBEEF5;
        line-height: 20px;
        padding: 4px 0;
      }

      .text {
        line-height: 20px;
        padding: 4px 0;
      }
    }

    &.style {
      background-color: #89c3f8;
    }
  }

  .cur-price {
    display: flex;
    margin-top: 20px;
    margin-bottom: 10px;
    width: 1000px;

    .text {
      flex: 1;
      color: #606266;
      font-size: 14px;
    }

    .btn {
      flex: 1;
      font-size: 16px;
      color: #89c3f8;
      cursor: pointer;
      text-align: right;
      padding-right: 35px;
      height: 27px;
      line-height: 27px;
      background: url('../assets/img/xiugai.png') no-repeat;
      background-position: right 50%;
    }
  }
}
</style>
