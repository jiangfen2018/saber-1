<template>
  <div class="container">
    <div class="top">
      <!--      <div class="tableItem">
        <tableItem :item="tableItemData"></tableItem>
      </div> -->
      <div class="useCompany">
        <useCompany :data="infoDetailData.companies"></useCompany>
      </div>
    </div>

    <cline></cline>
    <div style="margin-left:10px">
      <tabs @onTabs='onTabs' firstName='参数与价格' secondName="配件"></tabs>
    </div>

    <div class="tab-wrapper">
      <div v-if="tabShow.m2">
        <tableStyle01 :parentId='tableItemData.id'></tableStyle01>
      </div>
      <div v-if="tabShow.m1">
        <part01 :data="infoDetailData"></part01>
        <table02 :column='column' url='sequencepricehistory' :queryValue='query.sequenceId_equal'></table02>
      </div>
    </div>
  </div>
</template>

<script>
import tableItem from './components/tableItem'
import useCompany from './components/useCompany'
import tableStyle01 from './components/tableStyle01'
import part01 from '@/components/part01'
import tabs from '@/components/tabs'
import table02 from '@/components/table02'
import { getDetail } from "@/api/platform_device/devicesequence";
export default {
  data() {
    return {
      tableItemData: {
        id: undefined
      },
      infoDetailData: {},
      tabShow: {
        m1: true,
        m2: false
      },
      obj: {},
      query: {
        sequenceId_equal: undefined
      },
      data: [],
      column: [
        { label: '交易系数', prop: 'normalTradeRatio' },
        { label: '交易价格', prop: 'normalTradePrice' },
        { label: '成本', prop: 'materialCostPrice' },
        { label: '钢材价格', prop: 'q235Price' },
        { label: '调整原因', prop: 'reason' },
        { label: '调整时间', prop: 'createTime', width: '200px' },
        { label: '调整人', prop: 'updateUser' },
      ],
    };
  },
  components: {
    tableItem, useCompany, tableStyle01, part01, table02, tabs
  },
  computed: {},
   beforeRouteUpdate(to,from,next){
    
      if(to.query.id){
        this.tableItemData.id = to.query.id
        this.query.sequenceId_equal = to.query.id
        getDetail(to.query.id).then(res => {
          this.infoDetailData = res.data.data
        });
      }
      next();
  },
  created() {
    /*
    if (this.$route.params.info) {
      this.tableItemData = this.$route.params.info
      this.query.sequenceId_equal = this.$route.params.info.id
      getDetail(this.$route.params.info.id).then(res => {
        this.infoDetailData = res.data.data
      });
    }*/
    if (this.$route.query.id) {
      this.tableItemData.id = this.$route.query.id
      this.query.sequenceId_equal = this.$route.query.id
      getDetail(this.$route.query.id).then(res => {
        this.infoDetailData = res.data.data
      });
    }
  },
  methods: {
    onTabs(tabShow) {
      this.tabShow = tabShow
    },
  }
};
</script>

<style lang="stylus" scoped>
.container
  .top
    display: flex
    .useCompany
      width: 800px
  .tab-wrapper
    margin-top: 20px
    .table-box
      background-color: #fff
      margin-left: 10px
      margin-top: 20px
      padding: 10px 0 30px 0
      .swapper
        width: 1000px
        margin-left: 10px
      h3
        color: #606266
        font-size: 14px
        font-weight: normal
</style>
