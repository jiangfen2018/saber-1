<template>
  <div>
    <part01 :data="data" isEdit='true' fromPage='deviceprice' @openEditDialog='openEditDialog'></part01>
    <table02 ref="table02" :column='column' url='sequencepricehistory' :queryValue='query.sequenceId_equal'></table02>

    <el-dialog title="修改" :visible.sync="editFormVisible" width="30%">
      <el-form label-width="120px" :model="editForm" ref="editForm">
        <el-form-item label="交易系数" prop="name">
          <el-input size="small" v-model="editForm.normalTradeRatio" auto-complete="off" placeholder="请输入交易系数" style="width:90%"></el-input>
        </el-form-item>
        <el-form-item label="交易价格" prop="name">
          <el-input size="small" v-model="editForm.normalTradePrice" auto-complete="off" placeholder="请输入交易价格" style="width:90%"></el-input>
        </el-form-item>
        <el-form-item label="人工" prop="name">
          <el-input size="small" v-model="editForm.manMadePrice" auto-complete="off" placeholder="请输入人工" style="width:90%"></el-input>
        </el-form-item>
        <el-form-item label="其他" prop="name">
          <el-input size="small" v-model="editForm.otherPrice" auto-complete="off" placeholder="请输入其他" style="width:90%"></el-input>
        </el-form-item>
        <el-form-item label="调整原因" prop="reason">
          <el-input size="small" v-model="editForm.reason" auto-complete="off" placeholder="请输入调整原因" style="width:90%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" class="title" @click="submitForm">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import part01 from '@/components/part01'
import table02 from '@/components/table02'
import { getDetail } from "@/api/platform_device/devicesequence";
import { save } from "@/api/platform_device/sequenceprice"
export default {
  data() {
    return {
      editForm: {
        id: undefined,
        sequenceId:this.$route.query.id,
        normalTradeRatio: undefined,
        normalTradePrice: undefined,
        manMadePrice: undefined,
        otherPrice: undefined,
      },
      editFormVisible: false,
      column: [
        { label: '交易系数', prop: 'normalTradeRatio' },
        { label: '交易价格', prop: 'normalTradePrice' },
        { label: '成本', prop: 'materialCostPrice' },
        { label: '钢材价格', prop: 'q235Price' },
        { label: '人工', prop: 'manMadePrice' },
        { label: '其他', prop: 'otherPrice' },
        { label: '项目', prop: 'projectName' },
        { label: '调整原因', prop: 'reason' },
        { label: '调整时间', prop: 'updateTime' },
        { label: '调整人', prop: 'updateUser' },
      ],
      data: undefined,
      query: {
        sequenceId_equal: undefined
      },
    };
  },
  computed: {},
   beforeRouteUpdate(to,from,next){
      if(to.query.id){
         this.query.sequenceId_equal = this.$route.query.id
         this.getDetail();
      }
      next();
  },
  created() {
    /*if (this.$route.params.item) {     
      this.query.sequenceId_equal = this.$route.params.item.deviceId
      this.getDetail();
    }*/
   if (this.$route.query.id) {     
      this.query.sequenceId_equal = this.$route.query.id
      this.getDetail();
    }
  },
  components: {
    part01, table02
  },
  methods: {
    getDetail() {
     /* getDetail(this.$route.params.item.deviceId).then(res => {
        this.data = res.data.data
      });*/
      getDetail( this.$route.query.id).then(res => {
          this.data = res.data.data
        });

    },
    submitForm() {
      save(this.editForm).then(res => {
        console.log(res);

        this.$message({ type: "success", message: "操作成功!" });
        this.editFormVisible = false
        this.getDetail();
        this.$refs.table02.onLoad({
          pageSize: 10,
          currentPage: 1,
          total: 1,
        });
      }, error => {
        console.log(error);
      });
    },
    cancel(){
      this.editFormVisible = false
    },
    openEditDialog() {
      this.editFormVisible = true
      console.log(this.data)
      if (this.data) {
        this.editForm.id = this.data.sequencePrice.id
        this.editForm.sequenceId = this.$route.query.id
        this.editForm.normalTradeRatio = this.data.sequencePrice.normalTradeRatio
        this.editForm.normalTradePrice = this.data.sequencePrice.normalTradePrice
        this.editForm.manMadePrice = this.data.sequencePrice.manMadePrice
        this.editForm.otherPrice = this.data.sequencePrice.otherPrice
      }
    }
  }
};
</script>

<style lang="stylus" scoped></style>
