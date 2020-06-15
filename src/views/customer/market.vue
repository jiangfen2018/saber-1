<template>
  <basic-container>
    <avue-crud :data="data" :option="option" :page="page" v-model="obj" @search-change="searchChange" @on-load="onLoad"></avue-crud>
  </basic-container>
</template>

<script>
import { getMarketList } from "@/api/platform_device/contract";
export default {
  data() {
    return {
       filters: {},
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
          { label: "姓名", prop: "realName", search: true },
          { label: "业绩总额", prop: "contractAmount",
             formatter(row,value){
               if(value){
                  var num = (value || 0).toString(),
                    result = '';
                  while (num.length > 3) {
                    result = ',' + num.slice(-3) + result;
                    num = num.slice(0, num.length - 3);
                  }
                  if (num) {
                    result = num + result;
                  }
                  return result;
               }else{
                 return
               }
             }

          },
          { label: "已收款", prop: "receivedAmount" ,
            formatter(row,value){
               if(value){
                  var num = (value || 0).toString(),
                    result = '';
                  while (num.length > 3) {
                    result = ',' + num.slice(-3) + result;
                    num = num.slice(0, num.length - 3);
                  }
                  if (num) {
                    result = num + result;
                  }
                  return result;
               }else{
                 return
               }
             }

          },
          { label: "未收款", prop: "noReceivedAmount",
            formatter(row,value){
               if(value){
                  var num = (value || 0).toString(),
                    result = '';
                  while (num.length > 3) {
                    result = ',' + num.slice(-3) + result;
                    num = num.slice(0, num.length - 3);
                  }
                  if (num) {
                    result = num + result;
                  }
                  return result;
               }else{
                 return
               }
             }

           },
          { label: "最近项目", prop: "projectName" },
          {
            label: "下次跟进",
            prop: "nextTime",
            search: true,
            type: "date",
            valueFormat: "yyyy-MM-dd"
          },
          { label: "项目", prop: "sum" }
        ]
      }
    };
  },
      
  components: {},
  created() {
    // this.formatter()
  },
  computed: {},
  methods: {
    searchChange(params) {
      this.query = params;
      this.onLoad(this.page, params);
    },
    onLoad(page, params = {}) {
      getMarketList(
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
</style>