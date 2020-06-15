<template>
  <basic-container>
    <avue-crud :data="data" :option="option" :page="page" v-model="obj" @search-change="searchChange" @on-load="onLoad"></avue-crud>
  </basic-container>
</template>

<script>
import { getList } from "@/api/platform-uf/uf";
export default {
  data() {
    return {
      data: [],
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
          { label: '业务类型', prop: 'realName' },
          { label: '订单编号', prop: 'contractAmount' },
          { label: '订单日期', prop: 'receivedAmount' },
          { label: '供应商编码', prop: 'noReceivedAmount' },
          { label: '供货商', prop: 'projectName' },
          { label: '币种', prop: 'nextTime' },
          { label: '部门名称', prop: 'sum' },
          { label: '存货编码', prop: 'sum' },
          { label: '规格型号', prop: 'sum' },
          { label: '主计量', prop: 'sum' },
          { label: '未到货数量', prop: 'sum' },
        ]
      }
    };
  },
  components: {

  },
  created() {

  },
  computed: {

  },
  methods: {
    searchChange(params) {
      this.query = params;
      this.onLoad(this.page, params);
    },
    onLoad(page, params = {}) {
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
      });
    },
  }
};
</script>

<style  lang="stylus" scoped></style>