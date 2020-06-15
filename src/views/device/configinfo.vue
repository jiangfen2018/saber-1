<template>
  <div class="container">
    <div class="main">
      <table07 :data='data_head' :option='option_head'></table07>
      <cline></cline>
      <ctabs @onTabs='onTabs' :option="option_tab"></ctabs>
      <table07 :data='data' :option='option' @onClickPrice='onClickPrice'></table07>
      <cpagination v-bind:child-msg="page" @callFather='callFather'></cpagination>
      <!-- <cbutton title='添加配置' @clickButton='clickButton'></cbutton>-->
    </div>
  </div>
</template>

<script>
import table07 from '@/components/table07'
import { getDetail } from "@/api/platform_device/devicesequence";
import { getPartList } from "@/api/platform_device/devicesequence";
/* import searchStyle02 from '@/components/searchStyle02'
import { getList } from "@/api/platform_device/devicesequence"; */
export default {
  data() {
    return {
      page: {
        pageSize: 8,
        pages: 1,
        currentPage: 1,
      },
      tabShow: 0,
      option_tab: [
        { title: '使用设备', id: 0 },
      ],
      data_head: [],
      option_head: {
        head: false,//头部
        button: [false, false, false],//按钮
        onbutton: false,//点击进入
        price: true,//价格
        column: [
          { label: '标准号', value: 'standard' },
          { label: '图号', value: 'chart' },
          { label: '重量（吨）', value: 'weight' },
          { label: '参数', value: 'param' }
        ]
      },
      query: {},
      data: [],
      option: {
        head: false,//头部
        button: [true, true, true],//按钮
        onbutton: false,//点击进入
        price: true,//价格
        column: [
          { label: '名称', value: 'name' },
          { label: '标准号', value: 'standard' },
          { label: '图号', value: 'chart' },
          { label: '重量（吨）', value: 'weight' },
          { label: '参数', value: 'param' }
        ]
      },
    }
  },
  components: {
    table07
  },
  computed: {

  },
  created() {
    if (this.$route.params.info) {
      getDetail(this.$route.params.info.id).then(res => {
        this.data_head.push(res.data.data)
      });
      this.query.parentId = this.$route.params.info.id
      this.onLoad(this.page)
    }
  },
  methods: {
    onClickPrice(item) {
      this.$router.push({
        name: '设备价格',
        path: '/device/deviceprice',
        params: {
          item: item
        }
      })
    },
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
    },
    onTabs(id) {
      this.tabShow = id
    },
  }
};
</script>

<style lang="stylus" scoped>
.container
  margin: 20px 40px
  width: auto
  .main
    margin-top: 20px
    width: 1250px
</style>
