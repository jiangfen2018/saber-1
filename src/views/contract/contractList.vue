<template>
  <div class="container">
    <searchStyle02 :data="searchInput" @searchInputFather="searchInputFather"></searchStyle02>
    <searchStyle01 :data="searchItem.mold" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.flow" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.response" @searchFather="searchFather" name="username"></searchStyle01>

    <table13 :data="data"></table13>
    <cpagination v-bind:child-msg="page" @callFather="callFather"></cpagination>
  </div>
</template>

<script>
import table13 from "@/components/table13";
import { getListItem } from "@/api/system/dict";
import searchStyle01 from "@/components/searchStyle01";
import searchStyle02 from "@/components/searchStyle02";
import { getList } from "@/api/platform_device/contract";
import { getResponse } from "@/api/customer/customer";
export default {
  data() {
    return {
      searchItem: {
        mold: {
          label: "类型",
          res: []
        },
        flow: {
          label: "流数",
          res: []
        },
        response: {
          label: "负责人",
          res: []
        }
      },
      searchInput: [
        { name: "客户", value: "1", label: "customerName", type: "input" },
        { name: "项目", value: "2", label: "projectName", type: "input" },
        { name: "合同号", value: "2", label: "contractNo", type: "input" },
        { name: "签约时间", value: "3", label: "signTime", type: "daterange" }
      ],
      data: [],
      page: {
        pageSize: 5,
        pages: 1,
        currentPage: 1
      },
      query: {}
      /*       data: [],
            obj: {},
            query: {
              sequenceId_equal: undefined
            },
            page: {
              pageSize: 10,
              currentPage: 1,
              total: 1,
            },
            option: {
              width: '50%',
              index: true,
              border: true,
              refreshBtn: false,
              page: true,
              header: false,
              align: 'center',
              addBtn: false,
              menu: false,
              stripe: true,
              column: [
                { label: '姓名', prop: 'realName', search: true },
                { label: '业绩总额', prop: 'contractAmount' },
                { label: '已收款', prop: 'receivedAmount' },
                { label: '未收款', prop: 'noReceivedAmount' },
                { label: '最近项目', prop: 'projectName' },
                { label: '下次跟进', prop: 'nextTime', search: true, type: 'date', valueFormat: 'yyyy-MM-dd' },
                { label: '项目', prop: 'sum' },
              ]
            } */
    };
  },
  components: {
    table13,
    searchStyle01,
    searchStyle02
  },
  created() {
    this.onLoad(this.page);
    this.getSelect("mold");
    this.getSelect("flow");
    this.getSelect("response");
  },
  computed: {},
  methods: {
    getSelect(item) {
      if (item === "response") {
        getResponse().then(res => {
          this.searchItem[item].res = res.data.data;
        });
      } else {
           getListItem(item).then(res => {
          if (item === "mold") {
            this.selectDataType = res.data.data;
            this.searchItem[item].res = res.data.data;
          } else {
            this.searchItem[item].res = res.data.data;
          }
        });
      }
    },
    searchFather(label, item) {
      switch (label) {
        case "类型":
          this.query["b.type_equal"] = item.dictKey;
          break;
        case "流数":
          this.query["b.flow"] = item.dictKey;
          break;
        case "负责人":
          this.query["c.chargeId"] = item.id;
          break;
        default:
          break;
      }
      this.onLoad(this.page);
    },
    searchInputFather(inputValue) {
      this.query["customerName"] = inputValue.customerName;
      this.query["projectName"] = inputValue.projectName;
      this.query["contractNo"] = inputValue.contractNo;
      if (inputValue.signTime) {
        this.query["a.signTime_datege"] = inputValue.signTime[0];
        this.query["a.signTime_datele"] = inputValue.signTime[1].replace('00:00:00','24:60:60');
      }else{
          this.query["a.signTime_datege"] =  undefined
          this.query["a.signTime_datele"] = undefined
      }

      this.onLoad(this.page);
    },
    callFather(parm) {
      this.page.currentPage = parm.currentPage;
      this.onLoad(this.page);
    },
    onLoad(page, params = {}) {
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.data = data.records;
        console.log(this.data);
      });
    }
    /*     searchChange(params) {
          this.query = params;
          this.onLoad(this.page, params);
        },
        onLoad(page, params = {}) {
          getMarketList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
            const data = res.data.data;
            this.page.total = data.total;
            this.data = data.records;
          });
        }, */
  }
};
</script>
<style>
.el-progress-bar__outer{
background-color: #89c3f8 !important;
}
    
</style>
<style  lang="stylus" scoped>
.container {
  margin: 20px 40px;
  width: auto;
}
</style>
