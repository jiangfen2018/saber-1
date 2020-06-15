/* 配置详情 */
<template>
  <div class="wrapper">
    <div class="list" v-for='item in data' :key="item.id">
      <h3 v-if='option.head.isShow'>{{item[option.head.label]}}{{option.head.title}}</h3>
      <div class="detail">
        <div class="line" v-for='line in option.column' :key="line.value">
          <span class="tip" v-if='line.value!=""'>{{line.label}}</span> 
          <span class="tip-null" v-else>{{line.label}}</span>
          <span class="text" :class="{'price':line.style==='price'}">{{item[line.value]}}</span>
        </div>
        <div class="line" v-if='option.price'><span class="price">{{item.price}}</span></div>
        <div class="btn" v-if='option.onbutton' @click="goDetail(item)">点击进入</div>
      </div>
      <div class="btn-wrapper">
        <div class="btn btn1" v-if='option.button[0]' @click="onClickConfig(item)">配置</div>
        <div class="btn btn2" v-if='option.button[1]' @click="onClickPrice(item)">价格</div>
        <div class="btn btn3" v-if='option.button[2]' @click="onClickSee(item)">查看</div>
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
    },
    equipment: {
      type: String,
      default: function () {
        return ''
      }
    },
    name: {
      type: String,
      default: function () {
        return ''
      }
    },
    option: {
      type: Object,
      default: function () {
        return {
          head: { isShow: true, label: '', title: '' },//头部
          button: [true, true, true],//按钮
          onbutton: true,//点击进入
          price: true,//价格
          column: [
            /*    { label: '客户', value: 'a'， style: "price"  }, */
          ]
        }
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
    onClickConfig(item) {
      if(this.equipment && this.name){
          item.equipment2 =this.equipment+'('+this.name+')'
      }
    
      this.$emit("onClickConfig", item);
    },
    onClickPrice(item) {
      this.$emit("onClickPrice", item);
    },
    onClickSee(item) {
      this.$emit("onClickSee", item);
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper
  display: inline-block
  margin-right: 32px
  vertical-align: top
  &:last-child
    margin-right: 0
.list
  display: inline-block
  width: 280px
  color: #303133
  font-size: 14px
  margin-right: 32px
  margin-top: 20px
  padding-bottom: 10px
  &:last-child
    margin-right: 0
  h3
    font-size: 16px
    font-weight: normal
    text-align: center
    background-color: #fff
    border-bottom: 1px solid #DCDFE6
    line-height: 40px
    margin-bottom: 0
    margin-top: 0
  .detail
    background-color: #fff
    padding: 10px 0
    .line
      line-height: 26px
      padding: 0 30px
      .price
        font-size: 20px
        color: #E6A23C
        &:before
          padding-right: 10px
          content: '¥'
      .tip, .tip-null
        width: 88px
        display: inline-block
        text-align: justify
        text-align-last: justify
        margin-right: 20px
      .tip-null
        color: #8693f3
      .tip
        &:after
          content: ':'
      .text
        color: #606266
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        width: 112px;
        vertical-align: middle;
        &.price
          font-size: 20px
          color: #E6A23C
    .btn
      width: 80px
      margin: 10px auto 0 auto
      padding: 2px 0
      border-radius: 2px
      color: #fff
      text-align: center
      background-color: #8693f3
      cursor: pointer
  .btn-wrapper
    display: flex
    margin: 20px 20px 5px 20px
    justify-content: space-around
    .btn
      width: 60px
      font-size: 14px
      padding: 2px 0
      border-radius: 4px
      text-align: center
      cursor: pointer
      background-color: #DCDFE6
</style>
