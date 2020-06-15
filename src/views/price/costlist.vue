<template>
  <div class="container">
    <searchStyle02 :data='searchInput' @searchInputFather="searchInputFather"></searchStyle02>
    <searchStyle01 :data='searchItem.machine' @searchFather="searchFather" name='dictValue'></searchStyle01>
    <searchStyle01 :data='searchItem.flow' @searchFather="searchFather" name='dictValue'></searchStyle01>
    <searchStyle01 :data='searchItem.class' @searchFather="searchFather" name='dictValue'></searchStyle01>
    <searchStyle01 :data='searchItem.device' @searchFather="searchFather"></searchStyle01>
    <div class="table07-box">
      <table07 :data='data' :option='option'></table07>
    </div>
    <cpagination v-bind:child-msg="page" @callFather='callFather'></cpagination>
  </div>
</template>

<script>
import table07 from '@/components/table07'
import { getList } from "@/api/platform_device/sequenceprice"
import { getListItem } from "@/api/system/dict";
import { selectTypeList } from "@/api/platform_device/devicetype";
export default {
  data() {
    return {
      option: {
        head: { isShow: true, label: 'deviceName' },//头部
        button: [false, false, false],//按钮
        onbutton: false,//点击进入
        price: false,//价格
        column: [
          { label: '系数', value: 'normalTradeRatio' },
          { label: '其他', value: 'otherPrice' },
          { label: '人工', value: 'manMadePrice' },
          { label: '钢材', value: 'q235Price' },
          { label: '材料', value: 'materialPrice' },
          { label: '备注', value: 'reason' },
          { label: '成本', value: 'materialCostPrice', style: "price" },
        ]
      },
      query: {
        'h.project': undefined,//类型
        'h.name': undefined,//名称
        projectName: undefined,//项目
        flow: undefined,//流数
        type: undefined,//类别
        parentId: undefined,//s设备
        'a.status': 0
      },
      page: {
        pageSize: 8,
        pages: 1,
        currentPage: 1,
      },
      searchInput: [{ name: '名称', value: '12', label: 'name', type: 'input' }],
      searchItem: {
        machine: {
          label: '类型',
          res: []
        },
        flow: {
          label: '流数',
          res: [],
        },
        class: {
          label: '类别',
          res: []
        },
        device: {
          label: '设备',
          res: []
        }
      },
      data: []
    }
  },
  components: {
    table07
  },
  computed: {

  },
  created() {
    this.onLoad(this.page)
    this.getSelect('flow')
    this.getSelect('machine')
    this.getSelect('class')
    this.getSelect('device')
  },
  methods: {
    searchInputFather(inputValue) {
      this.query['h.name'] = inputValue.name
      this.query['projectName'] = inputValue.project
      this.onLoad(this.page)
    },
    searchFather(label, item) {
      switch (label) {
        case '类型':
          this.query['h.project'] = item.dictKey
          break;
        case '流数':
          this.query['flow'] = item.dictKey
          break;
        case '类别':
          this.query['h.type'] = item.dictKey
          break;
        case '设备':
          this.query['h.parentId'] = item.id
          break;
        default:
          break;
      }
      this.onLoad(this.page)
    },
    getSelect(item) {
      if (item === 'device') {
        selectTypeList().then(res => {
          this.searchItem[item].res = res.data.data
        });
      } else {
        getListItem(item).then(res => {
          this.searchItem[item].res = res.data.data
        });
      }
    },
    onLoad(page, params = {}) {
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.data = data.records;
      });
    },
    goDetail(item) {
      this.$router.push({
        name: '设备价格',
        path: '/device/deviceprice',
        params: {
          item: item
        }
      })
    },
    callFather(parm) {
      this.page.currentPage = parm.currentPage
      this.onLoad(this.page)
    }
  }
};
</script>

<style lang="stylus" scoped>
.container
  margin: 20px 40px
  width: auto
  .table07-box
    margin-top: 30px
</style>
