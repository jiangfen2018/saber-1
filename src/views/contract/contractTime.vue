<template>
  <div class="container">
      <el-row>
        <el-col :span="8">
          <h1>客户：<span  style="color:black">{{project.customerName}}</span></h1>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="10">
           <h1>项目：<span  style="color:black">{{project.projectName}}</span></h1>
        </el-col>
  
      </el-row>
      <h1>发货时间</h1>
      <div class="base-info">
              <el-row>
                <el-col :span="10">
                  <div class="list">
                     <el-timeline>
                      <el-timeline-item :timestamp="item.time|timeFilter" placement="top" v-for="item in data1" :key="item.id">
                        <el-card>
                          <p>{{typeList[item.type-1].name}}     <span class="price"> {{item.time|timeFilter}} </span>  </p>
                        </el-card>
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                   

                </el-col>
                  <div style="margin:45px 0px 0px 10px;">
                 <el-col :span="5"  >
                    <el-select v-model="form1.type" placeholder="请选择"   size="mini" style="padding-left:20px">
                      <el-option
                        v-for="item in typeList1"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    </el-col>
              <el-col :span="7">
                     <el-date-picker
                      size="mini" style="padding-right:20px" 
                      v-model="form1.time"
                      align="right"
                      type="date"     value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
                  </el-date-picker>
                 
                  <el-button  size="mini" type="primary" @click="submitForm(form1,1)">添加</el-button>
                </el-col>
                  </div>
              </el-row>
       </div>



      <h1 style="padding-top:40px">安装调试时间</h1>
       <div class="base-info">
              <el-row>
                <el-col :span="10">
                  <div class="list">
                    <el-timeline>
                      <el-timeline-item :timestamp="item.time|timeFilter" placement="top" v-for="item in data2" :key="item.id">
                        <el-card>
                          <p>{{typeList[item.type-1].name}}     <span class="price"> {{item.time |timeFilter}} </span>   </p>
                        </el-card>
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                </el-col>
                 
                  
                <div style="margin:45px 0px 0px 10px;">
                 <el-col :span="5"  >
                            <el-select v-model="form2.type" placeholder="请选择"  size="mini" style="padding-left:20px">
                                                  <el-option
                                                    v-for="item in typeList2"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id">
                                                  </el-option>
                                                </el-select>
               
                   
                    </el-col>
              <el-col :span="7">
                     <el-date-picker 
                      size="mini"  style="padding-right:20px" 
                      v-model="form2.time"
                      align="right"
                      type="date"  value-format="yyyy-MM-dd HH:mm:ss"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
                  </el-date-picker>
                  
                  <el-button  size="mini" type="primary"   @click="submitForm(form2,2)">添加</el-button>
                </el-col>
                  </div>
              </el-row>
       </div>


      <h1 style="padding-top:40px">质保时间</h1>
      <div class="base-info">
              <el-row>
                
                 <el-col :span="10">
                   <span> 质保时长： </span>
                    <el-select v-model="form.premiumCycle" placeholder="请选择"  size="mini">
                      <el-option
                        v-for="item in longList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                    </el-col>
              <el-col :span="14">
                <span> 质保启动时间：</span>
                     <el-date-picker
                      size="mini"  style="padding-right:20px" 
                      v-model="form.premiumTimeBegin"
                      align="right"
                      type="date"
                      placeholder="选择日期"  value-format="yyyy-MM-dd HH:mm:ss"
                      :picker-options="pickerOptions">
                  </el-date-picker>
                 
                  <el-button  size="mini" type="primary"  @click="submitForm(form,3)">修改</el-button>
                </el-col>
              </el-row>
       </div>
  </div>

</template>

<script>
import { update } from "@/api/platform_device/contract";
import { getDetail} from "@/api/platform_device/contract";
import { getDetail as getProjectDetail} from "@/api/platform_device/project";
import { add ,getList as getRecordList } from "@/api/platform_device/contracttimerecord";
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
      project:{},
      form:{},
      editFormVisible3 :false,
      form1: {},
      form2: {},
      page:{
        pageSize: 100,
        pages: 1,
        currentPage: 1
      },
      data1:[],
      data2:[],
      query:{ contractId: this.$route.query.id},
      pickerOptions: {
          // disabledDate(time) {
          //   return time.getTime() > Date.now();
          // },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
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
      //1设备发货 2 最后一批 3派遣安装人员 4派遣调试人员 5安装完成 6 调试完成 7 验收完成
      typeList1:[{id:1,name:'设备发货'},{id:2,name:'最后一批'}],
      typeList2:[{id:3,name:'派遣安装人员'},{id:4,name:'派遣调试人员'},{id:5,name:'安装完成'},{id:6,name:'调试完成'},{id:7,name:'验收完成'}],
      typeList:[{id:1,name:'设备发货'},{id:2,name:'最后一批'},{id:3,name:'派遣安装人员'},{id:4,name:'派遣调试人员'},{id:5,name:'安装完成'},{id:6,name:'调试完成'},{id:7,name:'验收完成'}],
      longList:[{id:1,name:1},{id:2,name:2},{id:3,name:4},{id:5,name:5},{id:6,name:6},{id:7,name:7},{id:8,name:8},{id:9,name:9},{id:10,name:10}]
    };
  },
  components: {
  },
  computed: {},
  created() {
    getDetail(this.$route.query.id).then(res =>{
      this.form = res.data.data
      getProjectDetail(this.form.projectId).then(res=>{
       this.project  = res.data.data
      })
    })
     this.onLoad(this.page)
  },
  methods: {
    addContract() {
      this.$router.push({
        name: "合同新增",
        path: "/contract/addcontract",
        query: {
          contractId: this.form.id
        }
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
       return a-b>0
    },
    submitForm(form,type) {
      // if(!this.price){
      //   this.$message.error('请输入金额！')
      //   return
      // }
      // this.$refs[editData].validate(valid => {
        // if (valid) {
          // if(this.type===1){
            
          // }
     
        if(type ==1){
             if(!form.type){
            this.$message.error("类型不能为空，请选择类型！")
          }
          if(!form.time){
            this.$message.error("时间不能为空，请选择时间！")
        }
          if(form.type==1){
            if(!this.form.deliveryTimeBegin){
              //说明第一次添加 发货开始时间
              console.log(form.time)
               update({id:this.form.id,deliveryTimeBegin:form.time}).then(res=>{
                  this.$message({ type: "success", message: "操作成功!" });
                })
            }
          }
          if(form.type==2){
            //更新最后一批的时间 发货结束时间
            console.log(form.time)
            update({id:this.form.id,deliveryTimeEnd:form.time}).then(res=>{
                  this.$message({ type: "success", message: "操作成功!" });
           })
          }
          this.addRecord(form.type,form.time)
        }

        if(type==2){
             if(!form.type){
            this.$message.error("类型不能为空，请选择类型！")
          }
          if(!form.time){
            this.$message.error("时间不能为空，请选择时间！")
        }
          if(form.type==3){
            if(!this.form.debuggerTimeBegin){
                    //说明第一次添加 安装调试开始时间
                    console.log(form.time)
                  update({id:this.form.id,debuggerTimeBegin:form.time}).then(res=>{
                          this.$message({ type: "success", message: "操作成功!" });
                  })
            }
          }
          if(form.type==7){
              //安装完成时间 安装调试时间
                update({id:this.form.id,debuggerTimeEnd:form.time}).then(res=>{
                          this.$message({ type: "success", message: "操作成功!" });
                  })
          }
          //record
          this.addRecord(form.type,form.time)
        }
         if(type==3){
          if(!this.form.premiumCycle){
            this.$message.error("质保时长不能为空，请选择时长！")
          }
          if(!this.form.premiumTimeBegin){
            this.$message.error("质保启动时间不能为空，请选择时间！")
        }
          update({id:this.form.id,premiumCycle:this.form.premiumCycle,premiumTimeBegin:this.form.premiumTimeBegin}).then(res=>{
            this.$message({ type: "success", message: "操作成功!" });
          })
          return
        }
        getDetail(this.$route.query.id).then(res =>{
              this.form = res.data.data
            })
        this.onLoad(this.page)
        
          // update(this.form).then(res => {
          //   this.addRecord(1,this.form1.prepayAmountR)
          //   this.addRecord(2,this.form1.takeAmountR)
          //   this.addRecord(3,this.form1.premiumR)
          //   this.addRecord(4,this.form1.debuggerPriceR)
          //   this.addRecord(5,this.form1.freightPriceR)
          //   this.$message({ type: "success", message: "操作成功!" });
          //  //返回
          //   this.$router.push({
          //           name: "合同列表",
          //           path: "/contract/contractList",
          //           query: {}
          //   });
              
          // });
       
        // }
      // });
    },
    cancel(key) {
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
        this.data1 =[]
        this.data2=[]
        this.data.forEach(item=>{
          if(item.type == 1 || item.type==2){
            this.data1.push(item)
          }else{
            this.data2.push(item)
          }
        })
      });
    },
    addRecord(type,time){
      if(time){
          var obj={};
          obj.type =  type
          obj.time =  time 
          obj.contractId = this.form.id
          // obj.remark = this.form.recieveRemark
          add(obj).then(res=>{
            console.log('记录添加成功',type,time)
            this.onLoad(this.page)
          })
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
  margin: 20px 40px 0px 20px;
  width: auto;
  height:auto;
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
    .list {
      height: 208px;
      overflow-y: scroll;
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
