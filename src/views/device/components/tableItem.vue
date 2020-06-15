<template>
  <div>
    <div class="list">
      <div class="detail">
        <p><label>标准号</label><span>{{item.standard}}</span></p>
        <p><label>图号</label><span>{{item.chart}}</span></p>
        <p><label>重量（吨）</label><span>{{item.weight}}</span></p>
        <p><label>参数</label><span>{{item.param}}</span></p>
        <p class="price">{{item.price}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: function () {
        return {
          standard: '',
          chart: '',
          weight: '',
          param: '',
          price: '',
        }
      }
    }
  },
  data() {
    return {
      data: [{}]
    };
  },
  computed: {},
  created() {

  },
  methods: {

  }
};
</script>

<style lang="stylus" scoped>
.list
  width: 292px
  margin: 10px 10px 0 10px
  .detail
    color: #303133
    margin: 0 auto
    background-color: #fff
    font-size: 14px
    padding: 20px 30px 10px 30px
    p
      color: #909399
      margin: 12px 0
      label
        display: inline-block
        color: #303133
        width: 90px
        text-align-last: justify
        &:after
          content: ':'
          padding-right: 15px
    .price
      font-size: 20px
      color: #E6A23C
      &:before
        padding-right: 10px
        content: '¥'
  .btn-wrapper
    display: flex
    margin: 20px 20px 5px 20px
    justify-content: space-between
    .btn
      width: 60px
      font-size: 14px
      padding: 2px 0
      border-radius: 4px
      text-align: center
      cursor: pointer
      background-color: #DCDFE6
</style>
