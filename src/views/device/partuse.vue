<template>
  <div class="container">
    <div class="main">
      <table07 :data='data_head' :option='option_head'></table07>
      <cline></cline>
      <ctabs @onTabs='onTabs' :option="option_tab"  ></ctabs>
      <table07 :data='data' :option='option'  @onClickConfig='onClickConfig' @onClickSee='onClickSee'  @onClickPrice='onClickPrice'></table07>
      <cpagination v-bind:child-msg="page" @callFather='callFather'></cpagination>

    </div>
  </div>
</template>

<script>
import table07 from '@/components/table07'
import { getDetail, getPartUsedList, save } from "@/api/platform_device/devicesequence";
import { getListItem } from "@/api/system/dict";
import { selectList2, getList as getList1 } from "@/api/platform_device/devicetype";
import {  getList as getList2 } from "@/api/platform_device/typeconfig";
/* import searchStyle02 from '@/components/searchStyle02'
*/
export default {
  data() {
    return {
      partSelectData: [],
      searchItem: {
        class: { label: '类别', res: [] },
      },
      rules: {
        configId: [{ required: true, message: '请选择配件', trigger: 'change' }],
        typeId: [{ required: true, message: '请选择型号', trigger: 'change' }],
        chart: [{ required: true, message: '请输入图号', trigger: 'blur' }],
        standard: [{ required: true, message: '请输入标准号', trigger: 'blur' }],
        weight: [{ required: true, message: '请输入重量', trigger: 'blur' }],
        param: [{ required: true, message: '请输入参数', trigger: 'blur' }],
        num: [{ required: true, message: '请输入数量', trigger: 'blur' }],
      },
      form: {
        configId: undefined,
        typeId: undefined,
        chart: undefined,
        standard: undefined,
        weight: undefined,
        param: undefined,
        num: undefined,
        status: 1
      },
      editFormVisible: false,
      editFormVisible_Add: false,
      page: {
        pageSize: 8,
        pages: 1,
        currentPage: 1,
      },
      tabShow: 0,
      option_tab: [
        { title: '使用设备', id: 0, isDialogBtn: true },
      ],
      data_head: [],
      option_head: {
        head: false,//头部
        button: [false, false, false],//按钮
        onbutton: false,//点击进入
        price: true,//价格
        column: [
          { label: '名称', value: 'name' },
          { label: '标准号', value: 'standard' },
          { label: '图号', value: 'chart' },
          { label: '型号', value: 'model' },
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
          { label: '名称', value: 'equipment' },
          { label: '标准号', value: 'standard' },
          { label: '图号', value: 'chart' },
          { label: '重量（吨）', value: 'weight' },
          { label: '数量', value: 'num' },
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
   beforeRouteUpdate(to,from,next){
    
      if(to.query.id){
        this.data_head=[]
        getDetail(to.query.id).then(res => {
          this.data_head.push(res.data.data)
        });
        this.query.id = to.query.id
        
        this.onLoad(this.page)
       
      }
      next();
  },
  created() {
    if (this.$route.query.id) {
      getDetail(this.$route.query.id).then(res => {
        this.data_head.push(res.data.data)
      });
      this.query.id = this.$route.query.id
      // this.form.parentId = this.$route.query.id
      this.onLoad(this.page)
 
    }
    /*     this.getSelect('class') */

  },
  methods: {
  
    onClickConfig(item){
         this.$router.push({
        name: '配件配置',
        path: '/device/partconfig',
        query: {
          itemId: item.id,
          parentId: this.$route.query.id
        }
      })
    },
    onClickPrice(item) {
      this.$router.push({
        name: '设备价格',
        path: '/device/deviceprice',
        query: {
          id: item.id
        }
      })
    },
    onClickSee(item){

      //查看使用过该配件的设备
       this.$router.push({
        name: '设备详情',
        path: '/device/partuse',
        query: {
           id: item.id,
        }
      })
    },
    onLoad(page, params = {}) {
      getPartUsedList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        console.log(res)
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
