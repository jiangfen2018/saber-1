/* 项目详情-设备列表 */
<template>
  <div class="wrapper">
    <div class="list"
         v-for='item in data'
         :key="item.id">
      <div class="detail">
        <h3>{{item.equipment}}({{item.name}})</h3>
        <!-- <h3 v-if="item.status=='0'">{{item.equipment}}({{item.name}})</h3> -->
        <!-- <h3 v-if="item.status=='1'">{{item.name}}</h3> -->
        <div class="line"><span class="tip">标准号</span><span class="text">{{item.standard}}</span></div>
        <div class="line"><span class="tip">图号</span><span class="text">{{item.chart}}</span></div>
        <div class="line"><span class="tip">重量（吨）</span><span class="text">{{item.weight}}</span></div>
        <div class="line"><span class="tip">数量</span><span class="text">{{item.num}}</span></div>
        <div class="line"><span class="tip">参数</span><span class="text">{{item.param}}</span></div>
        <div class="line"><span class="price">{{item.price}}</span></div>
      </div>
      <div class="btn-wrapper">
        <div class="btn btn1" @click="editInfo(item)">配置</div>
        <div class="btn btn2">价格</div>
        <div class="btn btn3">查看</div>
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
  data () {
    return {

    };
  },
  computed: {},
  created () {

  },
  methods: {
    editInfo(item){
      this.$parent.editInfo(item)
    }
  }
};
</script>

<style lang="stylus" scoped>
.list {
  display: inline-block;
  width: 280px;
  color: #303133;
  padding-bottom: 10px;
  font-size: 14px;
  margin-right: 32px;
  margin-top: 20px;

  &:last-child {
    margin-right: 0;
  }

  .detail {
    background-color: #fff;

    h3 {
      font-size: 16px;
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

      .price {
        font-size: 20px;
        color: #E6A23C;

        &:before {
          padding-right: 10px;
          content: '¥';
        }
      }

      .tip {
        width: 80px;
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
  }

  .btn-wrapper {
    display: flex;
    margin: 20px 20px 5px 20px;
    justify-content: space-around;

    .btn {
      width: 60px;
      font-size: 14px;
      padding: 2px 0;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
      background-color: #DCDFE6;
    }
  }
}
</style>
