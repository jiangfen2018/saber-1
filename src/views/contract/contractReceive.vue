<template>
  <div class="container">

      <el-row>
        <el-col :span="8">
          <h1>客户：<span style="color:black">{{project.customerName}}</span></h1>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="10">
           <h1>项目：<span  style="color:black">{{project.projectName}}</span></h1>
        </el-col>
  
      </el-row>
         
           <h1>收款信息</h1>
           <div class="base-info">
              <el-row>
              <el-col :span="3">
                <div class="line"><span class="tip">总收款</span><span class="text" v-if="form.receivedAmount!=0">{{form.contractAmount |formatMoneyFilter(true)}}</span>  
                <span class="text" v-if="form.receivedAmount!=0">{{form.receivedAmount/form.contractAmount *100|formatPercentFilter}}%</span> 
                  <span class="text" v-if="form.receivedAmount==0">无</span> 
                 </div>
              <div class="line" v-if ="form.receivedAmount/form.contractAmount!=1"><span class="tip">待收款&nbsp;&nbsp;&nbsp;</span><span class="text">{{form.contractAmount-form.receivedAmount|formatMoneyFilter(true)}}</span></div>
                <div class="line" v-if ="form.receivedAmount/form.contractAmount==1"><span class="tip">已收完</span><span class="text">{{form.receivedAllTime |timeFilter}}</span></div>
                </el-col>
                <el-col :span="1">
                  <div style="float:left;width: 2px; height:60px;background: #C2DCF6;"></div> 
                 </el-col>
              <el-col :span="3">
                <div class="line"><span class="tip">预付款</span><span class="text" v-if="form.prepayAmount!=0" >{{form.prepayAmountR|formatMoneyFilter(true)}}</span>  
                 <span  class="text" v-if="form.prepayAmountR!=0">{{form.prepayAmountR/form.prepayAmount *100|formatPercentFilter}}%</span> 
                 <span class="text" v-if="form.prepayAmount==0">无</span> 
                 </div>
                <div class="line" v-if ="form.prepayAmountR/form.prepayAmount!=1 && form.prepayAmount!=0"><span class="tip" >待收款&nbsp;&nbsp;&nbsp;</span><span class="text">{{form.prepayAmount-form.prepayAmountR|formatMoneyFilter(true)}}</span></div>
                <div class="line" v-if ="form.prepayAmountR/form.prepayAmount==1"><span class="tip">已收完</span><span class="text">{{form.reveiceAllTime |timeFilter}}</span></div>
                </el-col>
               <el-col :span="1">
                  <div style="float:left;width: 2px; height:60px;background: #C2DCF6;"></div> 
                 </el-col>

             <el-col :span="3">
                <div class="line"><span class="tip">提货款</span><span class="text"  v-if="form.takeAmount!=0">{{form.takeAmountR|formatMoneyFilter(true)}}</span> 
                <span  class="text" v-if="form.takeAmount!=0">{{form.takeAmountR/form.takeAmount *100| formatPercentFilter}}%</span> 
                <span class="text" v-if="form.takeAmount==0">无</span> 
                </div>
              <div class="line" v-if ="form.takeAmount/form.takeAmountR!=1 && form.takeAmount!=0"><span class="tip">待收款&nbsp;&nbsp;&nbsp;</span><span class="text">{{form.takeAmount-form.takeAmountR|formatMoneyFilter(true)}}</span></div>
                <div class="line" v-if ="form.takeAmount/form.takeAmountR==1"><span class="tip">已收完</span><span class="text">{{form.takeAllTime |timeFilter}}</span></div>

                </el-col>
      
              <el-col :span="1">
                  <div style="float:left;width: 2px; height:60px;background: #C2DCF6;"></div> 
                 </el-col>
              <el-col :span="4">
                <div class="line"><span class="tip">安装调试费</span><span class="text"  v-if="form.debuggerPrice!=0">{{form.debuggerPriceR|formatMoneyFilter(true)}}</span> 
                <span  class="text" v-if="form.debuggerPrice!=0">{{form.debuggerPriceR/form.debuggerPrice *100 |formatPercentFilter}}%</span>
                <span class="text" v-if="form.debuggerPrice==0">无</span> 
                 </div>
               <div class="line" v-if ="form.debuggerPriceR/form.debuggerPrice!=1 &&  form.debuggerPrice!=0"><span class="tip">待收款&nbsp;&nbsp;&nbsp;</span><span class="text">{{form.debuggerPrice-form.debuggerPriceR|formatMoneyFilter(true)}}</span></div>
                <div class="line" v-if ="form.debuggerPriceR/form.debuggerPrice==1"><span class="tip">已收完</span><span class="text">{{form.debuggerAllTime |timeFilter}}</span></div>
                </el-col>
                <el-col :span="1">
                   <div style="float:left;width: 2px; height:60px;background: #C2DCF6;"></div> 
                 </el-col>
              <el-col :span="3">
                <div class="line"><span class="tip">质保金额</span><span class="text"  v-if="form.premium!=0">{{form.premiumR|formatMoneyFilter(true)}}</span> 
                 <span  class="text" v-if="form.premium!=0">{{form.premiumR/form.premium *100 | formatPercentFilter}}%</span>
                 <span class="text" v-if="form.premium==0">无</span> 
                  </div>
                <div class="line" v-if ="form.premiumR/form.premium!=1 && form.premium!=0" ><span class="tip">待收款&nbsp;&nbsp;&nbsp;</span><span class="text">{{form.premium-form.premiumR|formatMoneyFilter(true)}}</span></div>
                <div class="line" v-if ="form.premiumR/form.premium==1"><span class="tip">已收完</span><span class="text">{{form.premiumAllTime |timeFilter}}</span></div>
                </el-col>
               <el-col :span="1">
                  <div style="float:left;width: 2px; height:60px;background: #C2DCF6;"></div> 
                 </el-col>
                <el-col :span="3">
                <div class="line"><span class="tip">运费</span><span class="text"  v-if="form.freightPrice!=0">{{form.freightPriceR|formatMoneyFilter(true)}}</span> 
                  <span  class="text" v-if="form.freightPrice!=0">{{form.freightPriceR/form.freightPrice *100 | formatPercentFilter}}%</span> 
                  <span class="text" v-if="form.freightPrice==0">无</span> 
                   </div>
                  <div class="line" v-if ="form.freightPriceR/form.freightPrice!=1 && form.freightPrice!=0"><span class="tip">待收款&nbsp;&nbsp;&nbsp;</span><span class="text">{{form.freightPrice-form.freightPriceR|formatMoneyFilter(true)}}</span></div>
                <div class="line" v-if ="form.freightPriceR/form.freightPrice==1"><span class="tip">已收完</span><span class="text">{{form.premiumAllTime |timeFilter}}</span></div>
              
                </el-col>
              </el-row>

           </div>
            <el-row  style="padding-buttom:40px">
               <span class="reamrk">备注： {{form.contractRemark}}</span> <el-button class="edit-btn" type="primary" size='mini' @click ="editFormVisible3 = true" icon="el-icon-edit" circle></el-button>
            </el-row>
          

        <h1 style="padding-top:20px">收款详情</h1>
        <div class="receive-info">
          <el-timeline>
            <el-timeline-item :timestamp="item.createTime" placement="top" v-for="item in data" :key="item.id">
              <el-card v-if="item.type<6" >
                <p>{{typeList[item.type-1].name}}         <span class="price"> {{item.price|formatMoneyFilter(true)}} </span>       提交于 {{item.createTime}}</p>
              </el-card>
               <el-card v-if="item.type==6" >
                 <p> 于{{item.createTime}} 项目已全部回款</p>
               </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
        <el-row  >
             <span lcass="remark">备注： {{form.recieveRemark}}</span>  
        </el-row>
        
        
        <h1 style="padding:20px 0px 10px 0px;">收款金额</h1>
        <div class="receive-money">
     
              <el-row type="flex">
                 <el-col :span='8'>
                   <el-row type="flex">
                    <span class="text1" >预付款:</span>  <el-input size="mini" v-model.number="form1.prepayAmountR" style="width:40%" ></el-input> 
                    <span class="text" v-show='form1.prepayAmountR'>{{form1.prepayAmountR/10000}}万</span>   <el-divider direction="vertical"></el-divider> 
                    <span class="text"  v-show='form1.prepayAmountR && (form.prepayAmount-form.prepayAmountR-form1.prepayAmountR)>=0'>剩余：{{(form.prepayAmount-form.prepayAmountR-form1.prepayAmountR)/10000}}万</span>
                    <span class="text"  v-show='form1.prepayAmountR && (form.prepayAmount-form.prepayAmountR-form1.prepayAmountR)<0'> 超过实际金额！</span>
                   </el-row>
                 </el-col>

                <el-col :span='8'>
                  <el-row type="flex">
                   <span class="text1" >质保金:</span>  <el-input size="mini" v-model.number="form1.premiumR" style="width:40%" ></el-input> 
                   <span  class="text"  v-show='form1.premiumR'>{{form1.premiumR/10000}}万</span>   <el-divider direction="vertical"></el-divider>
                    <span class="text"  v-show='form1.premiumR && (form.premium-form.premiumR-form1.premiumR)>=0'>剩余：{{(form.premium-form.premiumR-form1.premiumR)/10000}}万</span>
                    <span class="text"  v-show='form1.premiumR && (form.premium-form.premiumR-form1.premiumR)<0'> 超过实际金额！</span>
                    </el-row>
                 </el-col>


                <el-col :span='8'>
                  <el-row type="flex">
                   <span class="text1" >运费:</span>  <el-input size="mini" v-model.number="form1.freightPriceR" style="width:40%" ></el-input>
                   <span class="text"  v-show='form1.freightPriceR'>{{form1.freightPriceR/10000}}万</span>   <el-divider direction="vertical"></el-divider>
                    <span class="text"  v-show='form1.freightPriceR && (form.freightPrice-form.freightPriceR-form1.freightPriceR)>=0'>剩余：{{(form.freightPrice-form.freightPriceR-form1.freightPriceR)/10000}}万</span>
                    <span class="text"  v-show='form1.freightPriceR && (form.freightPrice-form.freightPriceR-form1.freightPriceR)<0'> 超过实际金额！</span>
                    </el-row>
                 </el-col>

              </el-row>

            <el-row type="flex">
                <el-col :span='8'>
                  <el-row type="flex">
                   <span class="text1" >提货款:</span>  <el-input size="mini" v-model.number="form1.takeAmountR" style="width:40%"></el-input>
                     <span class="text" v-show='form1.takeAmountR'>{{form1.takeAmountR/10000}}万</span>  <el-divider direction="vertical"></el-divider>
                    <span class="text"  v-show='form1.takeAmountR && (form.takeAmount-form.takeAmountR-form1.takeAmountR)>=0'>剩余：{{(form.takeAmount-form.takeAmountR-form1.takeAmountR)/10000}}万</span>
                    <span class="text"  v-show='form1.takeAmountR && (form.takeAmount-form.takeAmountR-form1.takeAmountR)<0'> 超过实际金额！</span>
                   </el-row>
                 </el-col>

                <el-col :span='8'>
                  <el-row type="flex">
                   <span class="text1" >安装费:</span>  <el-input size="mini" v-model.number="form1.debuggerPriceR" style="width:40%" ></el-input>
                   <span class="text"  v-show='form1.debuggerPriceR'>{{form1.debuggerPriceR/10000}}万</span>  <el-divider direction="vertical"></el-divider>
                    <span class="text"  v-show='form1.debuggerPriceR && (form.debuggerPrice-form.debuggerPriceR-form1.debuggerPriceR)>=0'>剩余：{{(form.debuggerPrice-form.debuggerPriceR-form1.debuggerPriceR)/10000}}万</span>
                    <span class="text"  v-show='form1.debuggerPriceR && (form.debuggerPrice-form.debuggerPriceR-form1.debuggerPriceR)<0'> 超过实际金额！</span>
                   </el-row>
                 </el-col>

                <el-col :span='8' >
                   <span  class="text1">备注:</span>  <el-input size="mini" v-model="form.recieveRemark" style="width:40%"></el-input>
                 </el-col>
              </el-row>

                <el-row type="flex">
                  <el-col :span='8' >
                       <el-row type="flex">
                        <span class="text1" >时  间:</span>   
                          <el-date-picker
                            size="mini"
                            v-model="form.createTimeOne"
                            format="yyyy-MM-dd HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            style="width:40%"
                            type="date" 
                            placeholder="选择时间"
                          ></el-date-picker>
                       </el-row>
                  </el-col>
                </el-row>
        </div>

        <div style="margin-top:10px;display:block;margin-left:40%;">
                      <el-button
                        type="primary"
                        @click="submitForm('form1')"
                       
                      >确定</el-button>
                      <el-button
                        type="info"
                        @click="cancel('time')"
                   
                      >取消</el-button>
              </div>
    
    
    <el-dialog title="备注修改" :visible.sync="editFormVisible3" width="360px">
      <el-form ref="form" :model="form" :rules="rules3" label-width="80px" :inline="true">
           <el-form-item label="备注" prop="remark">
               <el-input size="mini" v-model="form.contractRemark"  type="textarea"
                :rows="2"
                placeholder="请输入备注"></el-input>
             </el-form-item>

     <el-form-item style="margin-top:10px;display:block;margin-left:50px;">
          <el-button
            type="primary"
            @click="submitForm1('form')"
            style="margin-right:15px;width:100px;height:25px;line-height: 1px;"
          >确定</el-button>
          <el-button
            type="info"
            @click="cancel1('time')"
            style="width:100px;height:25px;line-height: 1px;"
          >取消</el-button>
        </el-form-item>

        </el-form>
    </el-dialog>


  </div>
</template>

<script>
// import store from './store'
import { getDetail as getProjectDetail} from "@/api/platform_device/project";
import { update, getDetail ,getList } from "@/api/platform_device/contract";
import { add ,save,getList as getRecordList } from "@/api/platform_device/contractpricerecord";
export default {
  props: {
    // data: {
    //   type: Array,
    //   default: function() {
    //     return [{}];
    //   }
    // }
  },
  data() {
    return {
      // form: JSON.parse(this.$route.query.item),
      project:{},
      form :{},
      editFormVisible3 :false,
      form1: {},
      page:{
        pageSize: 100,
        pages: 1,
        currentPage: 1
      },
      data:[],
      query:{ contractId: this.$route.query.id},
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
      },
      rules3: {
           remark: [
          { required: true, message: "请输入备注", trigger: "blur" }
        ],
      },
      typeList:[{id:1,name:'预付款'},{id:2,name:'提货款'},{id:3,name:'质保金'},{id:4,name:'安装费'},{id:5,name:'运费'}],
 
    };
  },
  components: {
  },
  computed: {},
  created() {
     this.onLoad(this.page)
  },
  methods: {
    addContract() {
      this.$router.push({
        name: "合同新增",
        path: "/contract/addcontract",
        query: {}
      });
    },

    judge(a,b){
       return a-b>0
    },
    submitForm(editData) {
      // if(!this.price){
      //   this.$message.error('请输入金额！')
      //   return
      // }
      // this.$refs[editData].validate(valid => {
        // if (valid) {
          // if(this.type===1){
            if(this.judge(this.form1.prepayAmountR,this.form.prepayAmount-this.form.prepayAmountR)){
              this.$message.error('输入的金额超过范围，请核实！！！')
              return
            }
            if(this.form1.prepayAmountR){
                 this.form.prepayAmountR += parseFloat(this.form1.prepayAmountR);
                this.form.receivedAmount += parseFloat(this.form1.prepayAmountR);
            }
          
          // }
        //  if(this.type===2){
            if(this.judge(this.form1.takeAmountR,this.form.takeAmount-this.form.takeAmountR)){
              this.$message.error('输入的金额超过范围，请核实！！！')
              return
            }
            if(this.form1.takeAmountR){
                 this.form.takeAmountR += parseFloat(this.form1.takeAmountR);
                 this.form.receivedAmount += parseFloat(this.form1.takeAmountR);
            }
          
          // }
        //  if(this.type===3){
           if(this.judge(this.form1.debuggerPriceR,this.form.debuggerPrice-this.form.debuggerPriceR)){
              this.$message.error('输入的金额超过范围，请核实！！！')
              return
            }
            if(this.form1.debuggerPriceR){
              this.form.debuggerPriceR += parseFloat(this.form1.debuggerPriceR);
              this.form.receivedAmount += parseFloat(this.form1.debuggerPriceR); 
            }

          // }
        //  if(this.type===4){
            if(this.judge(this.form1.freightPriceR,this.form.freightPrice-this.form.freightPriceR)){
              this.$message.error('输入的金额超过范围，请核实！！！')
              return
            }
            if(this.form1.freightPriceR){
              this.form.freightPriceR += parseFloat(this.form1.freightPriceR);
              this.form.receivedAmount += parseFloat(this.form1.freightPriceR);
            }

          // }

        //  if(this.type===5){
             if(this.judge(this.form1.premiumR,this.form.premium-this.form.premiumR)){
              this.$message.error('输入的金额超过范围，请核实！！！')
              return
            }
            if(this.form1.premiumR){
              this.form.premiumR += parseFloat(this.form1.premiumR);
             this.form.receivedAmount += parseFloat(this.form1.premiumR);
            }
          
          // }
         
          update(this.form).then(res => {
            this.addRecord(1,this.form1.prepayAmountR)
            this.addRecord(2,this.form1.takeAmountR)
            this.addRecord(3,this.form1.premiumR)
            this.addRecord(4,this.form1.debuggerPriceR)
            this.addRecord(5,this.form1.freightPriceR)
            
            
            if(this.form.receivedAmount == this.form.contractAmount){
              //6 说明总收款完成
               this.addRecord(6,this.form.contractAmount)
            }
            this.$message({ type: "success", message: "操作成功!" });
           //返回
            // this.$router.push({
            //         name: "合同列表",
            //         path: "/contract/contractList",
            //         query: {}
            // });
            this.onLoad(this.page)
          });
       
        // }
      // });
    },
    cancel(key) {
      
      console.log('123123');
        // store.commit('DEL_TAG', {
        //     label: label,
        //     value: value,
        //     params: to.params,
        //     query: to.query,
        //     meta: (() => {
        //       if (!i18n) {
        //         return meta
        //       }
        //       return {
        //         i18n: i18n
        //       }
        //     })(),
        //     group: router.$avueRouter.group || []
        //   });
      this.$router.go(-1);
    // this.$store.dispatch('contract/contractList', this.$route)
        this.$route.back()
    },
    submitForm1(editData) {
         update(this.form).then(res => {
            this.$message.success('更新备注成功！')
          });
    },
    cancel1(key) {
        this.editFormVisible3 = false
    },
   onLoad(page, params = {}) {
      getRecordList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.data = data.records;

        getDetail(this.$route.query.id).then(res =>{
                   this.form = res.data.data
                    getProjectDetail(this.form.projectId).then(res=>{
                      this.project  = res.data.data
                      })
                    if(this.form.prepayAmount-this.form.prepayAmountR==0){
                      this.data.forEach(data=>{
                        if(data.type==1){
                          this.form.reveiceAllTime = data.createTime
                        }
                      })
                    }

                    if(this.form.takeAmount-this.form.takeAmountR==0){
                      this.data.forEach(data=>{
                        if(data.type==2){
                          this.form.takeAllTime = data.createTime
                        }
                      })
                    }
                    if(this.form.premium-this.form.premiumR==0){
                      this.data.forEach(data=>{
                        if(data.type==3){
                          this.form.premiumAllTime = data.createTime
                        }
                      })
                    }

                   if(this.form.debuggerPrice-this.form.debuggerPriceR==0){
                      this.data.forEach(data=>{
                        if(data.type==4){
                          this.form.debuggerAllTime = data.createTime
                        }
                      })
                    }
                    if(this.form.freightPrice-this.form.freightPriceR==0){
                      this.data.forEach(data=>{
                        if(data.type==5){
                          this.form.freightAllTime = data.createTime
                        }
                      })
                    }
                if(this.form.receivedAmount-this.form.contractAmount==0){
                      this.data.forEach(data=>{
                        if(data.type==6){
                          this.form.receivedAllTime = data.createTime
                        }
                      })
                    }

        })

      });
    },
    addRecord(type,price){
      if(price){
          var obj={};
          obj.type =  type
          obj.price =  price 
          obj.contractId = this.form.id
          obj.createTime = this.form.createTimeOne
          if(obj.createTime){
            save(obj).then(res=>{
              // this.onLoad(this.page)
             this.$message.success('记录添加成功')
            })
          }else{
            add(obj).then(res=>{
            // this.onLoad(this.page) 
             this.$message.success('记录添加成功')
            })
          }
          
      }
      
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-form--inline .el-form-item {
  display: block !important;
}
 .container {
  margin: 20px 40px;
  width: auto;
  h1{
    font-size: 24px;
    color: #C2DCF6;
  }

  .base-info {
    border: 1px solid #89c3f8;
    margin: 10px 0;
    padding: 10px 20px;
    background-color: whiter;
    .line {
      padding: 10px 10px 5px 20px;
    }
    .text{
      padding-left: 10px;
       color: #C2DCF6;
    }
    .list-scroll {
      height: 325px;
      overflow-y: scroll;
    }
    .remark {
      padding:10px 10px 40px 0px;
    }
    edit-btn {
      padding-left: 10px;
    }
  }

 .receive-info {
    border: 1px solid #89c3f8;
    margin: 10px 0;
    padding: 10px 20px;
    background-color: whiter;
    height: 280px;
    overflow-y: scroll;
    .price {
      padding-left: 50px;
      padding-right: 50px;
    }
}
 .receive-money {
    border: 1px solid #89c3f8;
    margin: 10px 0;
    padding: 10px 20px;
    background-color: whiter;
    .text1{
      padding: 5px 13px 13px;
    }
   .text{
      padding: 5px 13px 13px;
       color: #C2DCF6;
    }
}




}






</style>
