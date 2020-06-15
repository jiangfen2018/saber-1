/* 历史价格 */
<template>
  <div class="wrapper">
    <div class="table-box">
      <div class="swapper">
        <h3>历史价格</h3>
        <avue-crud :data="data" :option="option" :page="page" v-model="obj" @on-load="onLoad"></avue-crud>
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from "@/api/platform_device/sequencepricehistory";
export default {
  props: {
    column: {
      type: Array,
      default: function () {
        return []
      }
    },
    url: {
      type: String,
      default: undefined
    },
    queryValue: {
      type: Number,
      default: undefined
    },
  },
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
        column: []
      }
    };
  },
  computed: {},
  created() {
    this.option.column = this.column
    if (this.url === 'sequencepricehistory') {
      this.query.sequenceId_equal = this.queryValue
    }
  },
  methods: {
    onLoad(page, params = {}) {
      if (this.url === 'sequencepricehistory') {
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
        });
      }
    },

  }
};
</script>

<style lang="stylus" scoped>
.table-box
  background-color: #fff
  margin-left: 10px
  margin-top: 20px
  padding: 10px 0 30px 0
  margin-right: 10px
  .swapper
    margin-left: 10px
  h3
    color: #606266
    font-size: 14px
    font-weight: normal
</style>
