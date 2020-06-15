<template>
  <div class="container">
    <searchStyle02 :data='searchInput' @searchInputFather="searchInputFather"></searchStyle02>
    <div class="main">
      <cbutton title='添加配置' @clickButton='clickButton'></cbutton>
      <table07 :data='data' @onClickSee='onClickSee' :option='option'></table07>
      <cpagination v-bind:child-msg="page" @callFather='callFather'></cpagination>
    </div>
  </div>
</template>

<script>
import table07 from '@/components/table07'
import searchStyle02 from '@/components/searchStyle02'
import { getList } from "@/api/platform_device/devicesequence";
export default {
  data() {
    return {
      query: {
        'a.status': 1
      },
      searchInput: [{
        name: '名称',
        value: '1',
        label: 'name',
        type: 'input'
      }, {
        name: '标准号',
        value: '2',
        label: 'standard',
        type: 'input'
      }, {
        name: '图号',
        value: '3',
        label: 'chart',
        type: 'input'
      }],
      data: [],
      page: {
        pageSize: 8,
        pages: 1,
        currentPage: 1,
      },
      option: {
        head: false,//头部
        button: [true, false, true],//按钮
        onbutton: false,//点击进入
        price: true,//价格
        column: [
          { label: '标准号', value: 'standard' },
          { label: '图号', value: 'chart' },
          { label: '重量（吨）', value: 'weight' },
          { label: '参数', value: 'param' }
        ]
      }
    }
  },
  components: {
    table07, searchStyle02
  },
  computed: {

  },
  created() {
    this.onLoad(this.page)
  },
  methods: {
    onClickSee(item) {
      this.$router.push({
        name: '配置信息',
        path: '/device/configinfo',
        params: {
          info: item
        }
      })
    },
    searchInputFather(inputValue) {
      this.query['chart'] = inputValue.chart
      this.query['standard'] = inputValue.standard
      this.query['name'] = inputValue.name
      this.onLoad(this.page)
    },
    clickButton() {
      /*       this.editFormVisible = true */
    },
    callFather(parm) {
      this.page.currentPage = parm.currentPage
      this.onLoad(this.page)
    },
    onLoad(page, params = {}) {
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.data = data.records;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.container
  margin: 20px 40px
  width: auto
  .main
    margin-top: 20px
</style>
