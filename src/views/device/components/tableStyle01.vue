<template>
  <div class="wrapper">
    <div class="table-box">
      <div class="list-box">
        <div class="list" v-for="item in data" :key="item.id">
          <div class="detail">
            <p><label>标准号</label><span>{{item.standard}}</span></p>
            <p><label>图号</label><span>{{item.chart}}</span></p>
            <p><label>重量（吨）</label><span>{{item.weight}}</span></p>
            <p><label>参数</label><span>{{item.param}}</span></p>
            <p class="price">{{item.price}}</p>
          </div>
          <div class="btn-wrapper">
            <div class="btn btn1">配置</div>
            <div class="btn btn3">查看</div>
          </div>
        </div>
      </div>
    </div>

    <cpagination v-bind:child-msg="page" @callFather='callFather'></cpagination>
  </div>
</template>

<script>
import { getPartList } from "@/api/platform_device/devicesequence";
export default {
  props: {
    parentId: {
      type: Number,
      default: undefined
    }
  },
  data() {
    return {
      query: {},
      page: {
        pageSize: 20,
        pages: 1,
        currentPage: 1,
      },
      data: [],
    };
  },
  computed: {},
  created() {
    this.query.parentId = this.parentId
    this.onLoad(this.page)
  },
  methods: {
    onLoad(page, params = {}) {
      getPartList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.data = data.records;
      });
    },
    callFather(parm) {
      this.page.currentPage = parm.currentPage 
      this.onLoad(this.page)    
    }
  }
};
</script>

<style lang="stylus" scoped>
.list-box
  display: flex
  flex-flow: wrap
  .list
    width: 292px
    margin: 10px 10px 20px 10px
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
