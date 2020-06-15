<template>
  <div class="wrapper">
    <!-- <div class="list-box" v-for='device in data' :key="device.id"> -->
    <!--  <h3>{{device.name}}</h3> -->
    <div class="list-box">
      <!-- <div class="container">
        <cbutton class="btn-left-box" title='添加合同' @clickButton='addContract'></cbutton>  
      </div>-->

      <div class="list" v-for="item in data" :key="item.id">
        <el-row type="flex" :gutter="3">
          <table12 :item="item" :option="option_project" @callEditFather="callEditFather"></table12>
          <table12 :item="item" :option="option_price" @callEditFather="callEditFather"></table12>
          <table12 :item="item" :option="option_in" @callEditFather="callEditFather"></table12>
          <table12 :item="item" :option="option_time" @callEditFather="callEditFather"></table12>
        </el-row>
      </div>
    </div>

    <!--   </div> -->
    <!-- 合同金额修改   已废弃 -->
    <el-dialog title="合同金额修改" :visible.sync="editFormVisible1" width="660px">
      <el-form ref="form" :model="form" :rules="rules1"  :inline="true">
        <!-- <h3>金额情况</h3> -->
        <div>
          <div class="in-form-box">
               <el-form-item label="总金额" prop="contractAmount">
                <el-row type="flex" class="row-bg">
                  <el-col :span="16">
                        <el-input size="mini"  v-model.number="form.contractAmount" readonly>
                    </el-input>
                  
                  </el-col> 
                 <el-col :span="8" >
                   <span>{{form.contractAmount/10000}}万</span>
                </el-col>
                
                </el-row></el-form-item>
            <el-form-item label="预付款" prop="prepayAmount">
              <el-row type="flex" class="row-bg">
                  <el-col :span="18">
                  <el-input size="mini" v-model.number="form.prepayAmount"></el-input>
                </el-col> 
                <el-col :span="8" >
                  <span>{{form.prepayAmount/10000}}万</span>
                </el-col>
                
                </el-row></el-form-item>
            <el-form-item label="提货款" prop="takeAmount">
               <el-row type="flex" class="row-bg">
                  <el-col :span="18">
                       <el-input size="mini" v-model.number="form.takeAmount"></el-input>
                       </el-col> 
                      <el-col :span="8" >
                        <span>{{form.takeAmount/10000}}万</span>
                      </el-col>
                      
                      </el-row></el-form-item>


            <el-form-item label="质保金" prop="premium">
               <el-row type="flex" class="row-bg">
                  <el-col :span="18">
              <el-input size="mini" v-model.number="form.premium"></el-input>
             </el-col> 
                 <el-col :span="8" >
                   <span>{{form.premium/10000}}万</span>
                </el-col>
                
                </el-row></el-form-item>
           
            <el-form-item label="安装费" prop="debuggerPrice">
               <el-row type="flex" class="row-bg">
                  <el-col :span="18">
              <el-input size="mini" v-model.number="form.debuggerPrice"></el-input>
              </el-col> 
                 <el-col :span="8" >
                   <span>{{form.debuggerPrice/10000}}万</span>
                </el-col>
                
                </el-row></el-form-item>

            <el-form-item label="运费" prop="freightPrice">
               <el-row type="flex" class="row-bg">
                  <el-col :span="18">
              <el-input size="mini" v-model.number="form.freightPrice"></el-input>
              </el-col> 
                 <el-col :span="8" >
                   <span>{{form.freightPrice/10000}}万</span>
                </el-col>
                </el-row></el-form-item>

            <el-form-item label="备注" prop="contractRemark">
              <el-row type="flex" class="row-bg">
                  <el-col :span="20">
              <el-input size="mini" v-model.number="form.contractRemark"></el-input>
              </el-col> 
               </el-row>
            </el-form-item>

          </div>
        </div>
        <el-form-item style="margin-top:20px;display:block;margin-left:200px;">
          <el-button
            type="primary"
            @click="submitForm('form')"
            style="margin-right:15px;width:100px;height:25px;line-height: 1px;"
          >确定</el-button>
          <el-button
            type="info"
            @click="cancel('price')"
            style="width:100px;height:25px;line-height: 1px;"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <!-- 时间管理修改 -->
    <el-dialog title="时间管理修改" :visible.sync="editFormVisible3" width="660px">
      <el-form ref="form" :model="form" :rules="rules3" label-width="80px" :inline="true">
        <!-- <h3>金额情况</h3> -->
        <div>
      
          <div class="in-form-box">
            <span>发货时间</span>
            <el-form-item label="开始时间" prop="deliveryTimeBegin">
              <el-date-picker
                size="mini"
                v-model="form.deliveryTimeBegin"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:245px"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="deliveryTimeEnd">
              <el-date-picker
                size="mini"
                v-model="form.deliveryTimeEnd"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:245px"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <span>调试时间</span>
            <el-form-item label="开始时间" prop="debuggerTimeBegin">
              <el-date-picker
                size="mini"
                v-model="form.debuggerTimeBegin"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:245px"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="debuggerTimeEnd">
              <el-date-picker
                size="mini"
                v-model="form.debuggerTimeEnd"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:245px"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>

            <span>质保时间</span>
            <el-form-item label="质保时长" prop="premiumCycle">
              <el-input size="mini" v-model="form.premiumCycle" style="width:245px"></el-input>
            </el-form-item>
            <el-form-item label="启动时间" prop="premiumTimeBegin">
              <el-date-picker
                size="mini"
                v-model="form.premiumTimeBegin"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:245px"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </div>
        </div>
        <el-form-item style="margin-top:10px;display:block;margin-left:200px;">
          <el-button
            type="primary"
            @click="submitForm('form')"
            style="margin-right:15px;width:100px;height:25px;line-height: 1px;"
          >确定</el-button>
          <el-button
            type="info"
            @click="cancel('time')"
            style="width:100px;height:25px;line-height: 1px;"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import table12 from "@/components/table12";
import { update } from "@/api/platform_device/contract";
import { getList } from "@/api/platform_device/contract";
import { add } from "@/api/platform_device/contractpricerecord";
// import { log } from 'util';
export default {
  props: {
    data: {
      type: Array,
      default: function() {
        return [{}];
      }
    }
  },
  data() {
    return {
      page: {
        pageSize: 2,
        pages: 1,
        currentPage: 1
      },
      editFormVisible1: false,
      editFormVisible2: false,
      editFormVisible3: false,
      form: {},
      rules1: {
        signTime: [
          { required: true, message: "请选择签约时间", trigger: "blur" }
        ],
        prepayAmount: [
          {
            required: true,
            message: "请输入预付款",
            trigger: "blur",
            type: "number"
          }
        ],
        premium: [
          {
            required: true,
            message: "请输入质保金",
            trigger: "blur",
            type: "number"
          }
        ],
        takeAmount: [
          {
            required: true,
            message: "请输入提货款",
            trigger: "blur",
            type: "number"
          }
        ],
        debuggerPrice: [
          {
            required: true,
            message: "请输入调试费",
            trigger: "blur",
            type: "number"
          }
        ],
        freightPrice: [
          {
            required: true,
            message: "请输入运费",
            trigger: "blur",
            type: "number"
          }
        ]
      },
      rules2: {
        // receivedAmount: [
        //   {
        //     required: true,
        //     message: "请输入已收款金额",
        //     trigger: "blur",
        //     value:
        //       "prepayAmountR+takeAmountR+debuggerPriceR+freightPriceR+premiumR"
        //   }
        // ],
        /*
        prepayAmountR: [
          {
            required: true,
            message: "请输入预付款",
            trigger: "blur",
            type: "number"
          }
        ],
        premiumR: [
          {
            required: true,
            message: "请输入质保金",
            trigger: "blur",
            type: "number"
          }
        ],
        takeAmountR: [
          {
            required: true,
            message: "请输入提货款",
            trigger: "blur",
            type: "number"
          }
        ],
        debuggerPriceR: [
          {
            required: true,
            message: "请输入调试费",
            trigger: "blur",
            type: "number"
          }
        ],
        freightPriceR: [
          {
            required: true,
            message: "请输入运费",
            trigger: "blur",
            type: "number"
          }
        ],
        price: [
          {
            required: true,
            message: "请输入金额",
            trigger: "blur",
            type: "number"
          }
        ],*/
      },
      rules3: {},
      option_project: {
        head: { title: "项目信息" }, //头部
        button: [false, false, false], //按钮
        onbutton: false, //点击进入
        price: false, //价格
        column: [
          { label: "客户:", value: "customerName" },
          { label: "项目:", value: "projectName" },
          { label: "签约:", value: "signTime" },
          { label: "合同号:", value: "contractNo" },
          { label: "负责人:", value: "saleName" }
          // { label: "", value: "" },
          // { label: "", value: "" },
          // { label: "", value: "" },
          // { label: "", value: "" }
        ]
      },
      type:1,
      price:0,
      typeList:[{id:1,name:'预付款'},{id:2,name:'提货款'},{id:3,name:'质保金'},{id:4,name:'安装费'},{id:5,name:'运费'}],
      option_price: {
        head: {   title: "合同金额", colkey: "price" }, //头部
        button: [false, false, false], //按钮
        onbutton: false, //点击进入
        price: false, //价格
        column: [
          { label: "总金额:", value: "contractAmount", moneyFormatter: true },
          { label: "预付款:", value: "prepayAmount", moneyFormatter: true },
          { label: "提货款:", value: "takeAmount", moneyFormatter: true },
          { label: "质保金:", value: "premium", moneyFormatter: true },
          { label: "安装费:", value: "debuggerPrice", moneyFormatter: true },
          { label: "运费:", value: "freightPrice", moneyFormatter: true },
          { label: "备注:", value: "contractRemark" }
          // { label: "", value: "" },
          // { label: "", value: "" }
        ]
      },
      option_in: {
        head: { isShow: true, title: "收款情况", colkey: "in" }, //头部
        button: [false, false, false], //按钮
        onbutton: false, //点击进入
        price: false, //价格
        column: [
          {
            label: "总收款:",
            value: "receivedAmount",
            moneyFormatter: true,
            rightPercentage: true,
            percent: "receivedAmountPercent"
          },
          {
            label: "预付款:",
            value: "prepayAmountR",
            moneyFormatter: true,
            rightPercentage: true,
            percent: "prepayAmountPercent"
          },
          {
            label: "提货款:",
            value: "takeAmountR",
            moneyFormatter: true,
            rightPercentage: true,
            percent: "takeAmountPercent"
          },
          {
            label: "质保金:",
            value: "premiumR",
            moneyFormatter: true,
            rightPercentage: true,
            percent: "premiumPercent"
          },
          {
            label: "安装费:",
            value: "debuggerPriceR",
            moneyFormatter: true,
            rightPercentage: true,
            percent: "debuggerPricePercent"
          },
          {
            label: "运费:",
            value: "freightPriceR",
            moneyFormatter: true,
            rightPercentage: true,
            percent: "freightPricePercent"
          },

          { label: "备注:", value: "recieveRemark" }
          // { label: "", value: "" },
          // { label: "", value: "" }
        ]
      },
      option_time: {
        head: { isShow: true, title: "时间管理", colkey: "time" }, //头部
        button: [false, false, false], //按钮
        onbutton: false, //点击进入
        price: false, //价格
        column: [
          { label: "发货时间", value: "" },
          { label: "开始:", value: "deliveryTimeBegin" },
          { label: "结束:", value: "deliveryTimeEnd" },
          { label: "安装调试", value: "" },
          { label: "开始:", value: "debuggerTimeBegin" },
          { label: "结束:", value: "debuggerTimeEnd" },
          { label: "质保时间", value: "" },
          { label: "时长(年):", value: "premiumCycle" },
          { label: "质保启动:", value: "premiumTimeBegin" }
        ]
      }
    };
  },
  components: {
    table12
  },
  computed: {},
  created() {},
  methods: {
    addContract() {
      this.$router.push({
        name: "合同新增",
        path: "/contract/addcontract",
        query: {}
      });
    },
    //  setDataFather(form) {
    //     this.child_form = form
    //     this.$refs.form.validate(valid => {
    //       if (valid) {
    //         update(this.form).then(res => {
    //           this.$message({ type: "success", message: "操作成功!" });
    //         });
    //       }
    //     })
    //   },
    judge(a,b){
      console.log(a-b>0)
       return a-b>0
    },
    submitForm(editData) {
      if(!this.price){
        this.$message.error('请输入金额！')
        return
      }
      this.$refs[editData].validate(valid => {
        
        if (valid) {
          if(this.type===1){
            if(this.judge(this.price,this.form.prepayAmount-this.form.prepayAmountR)){
              this.$message.error('输入的金额超过范围，请核实！！！')
              return
            }
             this.form.prepayAmountR += parseFloat(this.price);
             this.form.receivedAmount += parseFloat(this.price);
          }
         if(this.type===2){
            if(this.judge(this.price,this.form.takeAmount-this.form.takeAmountR)){
              this.$message.error('输入的金额超过范围，请核实！！！')
              return
            }
             this.form.takeAmountR += parseFloat(this.price);
             this.form.receivedAmount += parseFloat(this.price);
          }
         if(this.type===3){
           if(this.judge(this.price,this.form.debuggerPrice-this.form.debuggerPriceR)){
              this.$message.error('输入的金额超过范围，请核实！！！')
              return
            }
             this.form.debuggerPriceR += parseFloat(this.price);
             this.form.receivedAmount += parseFloat(this.price);
          }
         if(this.type===4){
            if(this.judge(this.price,this.form.freightPrice-this.form.freightPriceR)){
              this.$message.error('输入的金额超过范围，请核实！！！')
              return
            }
             this.form.freightPriceR += parseFloat(this.price);
             this.form.receivedAmount += parseFloat(this.price);
          }

         if(this.type===5){
             if(this.judge(this.price,this.form.premium-this.form.premiumR)){
              this.$message.error('输入的金额超过范围，请核实！！！')
              return
            }
             this.form.premiumR += parseFloat(this.price);
             this.form.receivedAmount += parseFloat(this.price);
          }
         

          /*
          this.form.receivedAmount = 0;
          if (this.form.prepayAmountR != -1) {
            this.form.receivedAmount += parseFloat(this.form.prepayAmountR);
          }
          if (this.form.takeAmountR != -1) {
            this.form.receivedAmount += parseFloat(this.form.takeAmountR);
          }
          if (this.form.debuggerPriceR != -1) {
            this.form.receivedAmount += parseFloat(this.form.debuggerPriceR);
          }
          if (this.form.freightPriceR != -1) {
            this.form.receivedAmount += parseFloat(this.form.freightPriceR);
          }
          if (this.form.premiumR != -1) {
            this.form.receivedAmount += parseFloat(this.form.premiumR);
          }

          this.form.contractAmount = 0;
          if (this.form.prepayAmount != -1) {
            this.form.contractAmount += parseFloat(this.form.prepayAmount);
          }
          if (this.form.takeAmount != -1) {
            this.form.contractAmount += parseFloat(this.form.takeAmount);
          }
          if (this.form.premium != -1) {
            this.form.contractAmount += parseFloat(this.form.premium);
          }
          if (this.form.debuggerPrice != -1) {
            this.form.contractAmount += parseFloat(this.form.debuggerPrice);
          }
          if (this.form.freightPrice != -1) {
            this.form.contractAmount += parseFloat(this.form.freightPrice);
          }*/
          console.log('price')
          console.log(this.form)
          update(this.form).then(res => {
            var obj={};
            obj.type = this.type
            obj.price = this.price 
            obj.remark = this.form.recieveRemark
            add(obj).then(res=>{
              console.log(123)
            })
            this.onLoad(this.page);
            console.log(2, this.editFormVisible2);
            this.editFormVisible1 = false;
            this.editFormVisible2 = false;
            this.editFormVisible3 = false;
            this.$message({ type: "success", message: "操作成功!" });
            this.$emit("callFather", 1);
            
          });
         
        }
      });
    },
    cancel(key) {
      if (key === "price") {
        this.editFormVisible1 = false;
      }
      if (key === "in") {
        this.editFormVisible2 = false;
      }
      if (key === "time") {
        this.editFormVisible3 = false;
      }
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
    },
    callEditFather(item, key) {
      this.form = item;
      if (key === "price") {
        this.editFormVisible1 = true;
      }
      if (key === "in") {
        // this.editFormVisible2 = true;
        this.$router.push({
          name: "合同收款",
          path: "/contract/contractReceive",
          query: {
            id: item.id
          }
        });

      }
      if (key === "time") {
        // this.editFormVisible3 = true;
            this.$router.push({
              name: "时间管理",
              path: "/contract/contractTime",
              query: {
                id: item.id
              }
            });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-form--inline .el-form-item {
  display: block !important;
}

.in-form-box {
  text-align: center;
  color: #89c3f8;
}

.wrapper {
  margin-top: 20px;

  .btn-right-box {
    float: right;
  }

  .btn-left-box {
    float: left;
  }

  .list-box {
    // display: inline-block;
    .list {
      border: 1px solid #89c3f8;
      padding: 0 10px 20px 10px;
      margin-top: 20px;
      display: inline-block;
      color: #303133;
      font-size: 0.07rem;
      margin-right: 32px;
      margin-bottom: 40px;
    }

    .list2 {
      color: red;
    }
  }
}






</style>
