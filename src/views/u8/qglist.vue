<template>
  <div class="container">
    <searchStyle02 :data='searchInput' @searchInputFather="searchInputFather"></searchStyle02>
    <searchStyle01 :data='searchItem.machine' @searchFather="searchFather" name='dictValue'></searchStyle01>
    <searchStyle01 :data='searchItem.flow' @searchFather="searchFather" name='dictValue'></searchStyle01>
    <div class="table-box">
      <avue-crud :data="data" :option="option" :page="page" v-model="obj" @search-change="searchChange" @on-load="onLoad"></avue-crud>
    </div>
  </div>
</template>

<script>
import { getListItem } from "@/api/system/dict";
import { requestOrderList } from "@/api/platform-uf/uf";
export default {
  data() {
    return {
      searchItem: {
        machine: { label: "类型", res: [] },
        flow: { label: "流数", res: [] }
      },
      searchInput: [
        { name: "客户", value: "1", label: "customerName", type: "input" },
        { name: "项目", value: "2", label: "projectName", type: "input" },
        { name: "时间", value: "3", label: "createTime", type: "date" },
        { name: "存货编码", value: "2", label: "projectName", type: "input" }
      ],
      data: [],
      obj: {},
      query: {
        sequenceId_equal: undefined
      },
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 1
      },
      option: {
        width: "50%",
        index: true,
        border: true,
        refreshBtn: false,
        page: true,
        header: false,
        align: "center",
        addBtn: false,
        menu: false,
        stripe: true,
        column: [
          { label: "项目", prop: "" },
          { label: "单据号", prop: "ccode" },
          { label: "日期", prop: "ddate" },
          { label: "采购类型", prop: "cbustype" },
          { label: "请购部门", prop: "cdepname" },
          { label: "请购人员", prop: "cmaker" },
          { label: "需求日期", prop: "drequirdate" }
        ]
      }
    };
  },
  components: {},
  created() {
    this.getSelect("machine");
    this.getSelect("flow");
  },
  computed: {},
  methods: {
    getSelect(item) {
      getListItem(item).then(res => {
        this.searchItem[item].res = res.data.data;
      });
    },
    searchFather(label, item) {
      switch (label) {
        case "类型":
          this.query["c.type"] = item.dictKey;
          break;
        case "流数":
          this.query["flow"] = item.dictKey;
          break;
        default:
          break;
      }
      this.onLoad(this.page);
    },
    searchInputFather(inputValue) {
      this.query["d.customerName"] = inputValue.customerName;
      this.query["c.projectName"] = inputValue.projectName;
      this.query["a.createTime_datege"] = inputValue.createTime[0];
      this.query["a.createTime_datele"] = inputValue.createTime[1].replace('00:00:00','24:60:60');
      this.onLoad(this.page);
    },
    searchChange(params) {
      this.query = params;
      this.onLoad(this.page, params);
    },
    onLoad(page, params = {}) {
      requestOrderList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
      });
    }
  }
};
</script>

<style  lang="stylus" scoped>
.container {
  margin: 20px 40px;
  width: auto;

  .table-box {
    background-color: #ffffff;
    padding: 20px 0;
    margin-top: 20px;

    .btn-box {
      text-align: right;
      margin-bottom: 10px;
      padding-right: 10px;
    }
  }
}
</style>