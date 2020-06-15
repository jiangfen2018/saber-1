<template>
 <basic-container>
     <avue-crud :data="data" :option="option" :page="page"  v-model="obj"
        @row-update="editRow" @on-load="onLoad"></avue-crud>
 
 </basic-container>
</template>

<script>
 
import { getList,update } from "@/api/platform_device/contract";
// import { getResponse } from "@/api/customer/customer";
export default {
  data() {
    return {
    
      data: [],
      page: {
         pageSize: 10,
         currentPage: 1,
         total: 0,
      },
      obj: {},
      query: {},

      option: {
        width: "100%",
        index: true,
        border: true,
        refreshBtn: false,
        page: true,
        header: false,
        align: "center",
        menu: true,
        delBtn: false,
        cellBtn: true,
        editBtn: false,
        stripe: true,
        column: [
          { label: '客户', prop: 'customerName' },
          { label: '项目', prop: 'projectName' },
          { label: '合同号', prop: 'contractNo',width:"120px", },
          { label: '合同签约时间', prop: 'signTime' , type: 'date',width:"100px",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd HH:mm:ss"},
          { label: '合同交货时间', prop: 'contractDeliveryTime', type: 'date',
            format: "yyyy-MM-dd",width:"100px",
            valueFormat: "yyyy-MM-dd HH:mm:ss" },
          { label: '图纸下发时间', prop: 'expectDesignedTime', type: 'date',cell: true,
            format: "yyyy-MM-dd",width:"100px",
            valueFormat: "yyyy-MM-dd HH:mm:ss"},
         { label: '预计交货时间', prop: 'expectDeliveryTime' , type: 'date',cell: true,
            format: "yyyy-MM-dd",width:"100px",
            valueFormat: "yyyy-MM-dd HH:mm:ss"},
         { label: '生产预计完成时间', prop: 'expectProducedTime' , type: 'date',cell: true,
            format: "yyyy-MM-dd",width:"140px",
            valueFormat: "yyyy-MM-dd HH:mm:ss"},
         { label: '发货开始时间', prop: 'deliveryTimeBegin' , type: 'date',cell: true,
            format: "yyyy-MM-dd",width:"100px",
            valueFormat: "yyyy-MM-dd HH:mm:ss" },
        { label: '发货结束时间', prop: 'deliveryTimeEnd' , type: 'date',cell: true,
            format: "yyyy-MM-dd",width:"100px",
            valueFormat: "yyyy-MM-dd HH:mm:ss"},
             { label: '备注', prop: 'remark',width:"120px", cell: true,},
        ]
      } 
    };
  },
  components: {
 
  },
  created() {
    this.onLoad(this.page);
  },
  computed: {},
  methods: {

    onLoad(page, params = {}) {
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
      });
    },
    editRow (form, index, done, loading) {
        loading();
        update(form).then(res =>{
             this.$message.success("更新成功！")
        }).catch(err=>{
            this.$message.error("更新失败！")
           
        })
        done();
    }
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
