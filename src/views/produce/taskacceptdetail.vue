<template>
  <div>
    <div class="container"
         v-if="isLoad">
      <div class="introduce">
        <div class="item">
          <div class="title">客户</div>
          <div class="text">
            <div class="href"
                 @click="goToCustomer(projectInfo.customerName)">{{projectInfo.customerName}}</div>
          </div>
        </div>
        <div class="item">
          <div class="title">项目</div>
          <div class="text">
            <div class="href"
                 @click="goToProject(projectInfo.projectName)">{{projectInfo.projectName}}</div>
          </div>
        </div>
        <div class="item">
          <div class="title">合同号</div>
          <div class="text">
            <div class="href">{{projectInfo.contractNo}}</div>
          </div>
        </div>
        <div class="item">
          <div class="title">项目类型</div>
          <div class="text">{{projectInfo.typeName}}</div>
        </div>
        <div class="item">
          <div class="title">任务单时间</div>
          <div class="text">{{projectInfo.jobCreateTime|timeFilter }}</div>
        </div>
        <div class="item">
          <div class="title">交付时间</div>
          <div class="text">{{projectInfo.payTime|timeFilter}}</div>
        </div>
        <div class="item">
          <div class="title">机型</div>
          <div class="text">{{projectInfo.model}}</div>
        </div>
        <div class="item">
          <div class="title">弧度半径</div>
          <div class="text">{{projectInfo.radiusGyration}}</div>
        </div>
        <div class="item">
          <div class="title">铸机流数</div>
          <div class="text">{{projectInfo.flow}}</div>
        </div>
        <div class="item">
          <div class="title">浇筑钢种</div>
          <div class="text">{{projectInfo.steelGrade}}</div>
        </div>
        <div class="item">
          <div class="title">浇筑断面</div>
          <div class="text">{{projectInfo.section}}</div>
        </div>
        <div class="item">
          <div class="title">定尺长度</div>
          <div class="text">{{projectInfo.fixed}}</div>
        </div>
      </div>

      <!-- <el-button type="primary"
                 size="mini"
                 @click.native.prevent="updateData"
                 class="login-submit"
                 style="width:250px">更新</el-button> -->

      <!-- <div style="margin:10px 0;color:red">请填写完当面，点击更新进行保存！</div> -->

      <div class="table-box">
        <div class="item"
             v-for="(item) in data_part"
             :key="item.id">
          <div>
            <el-row type="flex" style="padding-top:20px;">
              <div></div>
            </el-row>
            <el-row type="flex">
               <el-col :span="4"  >
                 <div class="title">{{item.equipment}}({{item.name}})      
                    <el-button size="small" v-if="item.paperName"
                            @click.native="downloadBatch(item)"
                            type="text" :loading="loading1"
                            round>压缩包下载</el-button> 
                            </div>
               </el-col>
                <el-col :span="18"></el-col>
              <!-- <el-col :span="1" >
                    <el-button type="primary" size="mini"   @click.native.prevent="sendAll(item,i)">批量下发</el-button>
              </el-col> -->
            </el-row>
          </div>
          
            <!-- 配件列表  @row-click="editRowDialog" -->
            <avue-crud :data="item.children" v-show="item.children.length>0"
                        :option="option_part">
              <template slot="menu"
                        slot-scope="scope">
                <el-button size="small"  v-if="scope.row.paperName && (scope.row.acceptStatus==0)"
                            @click.native="acceptOne(scope.row,scope.index)"
                            type="text"  :loading="loading"
                            round>接收</el-button>
                  <el-button size="small" v-if="scope.row.paperName &&  (scope.row.acceptStatus==1)"
                            @click.native="downloadOne(scope.row,scope.index)"
                            type="text" :loading="loading"
                            round>下载</el-button>
              </template>
            </avue-crud>
          
        </div>
        <cpagination v-bind:child-msg="page_part"
                     @callFather="callFather"></cpagination>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from "vuex";
import { getToken } from '@/util/auth'
import website from '@/config/website';
import { Base64 } from 'js-base64';
import table11 from "@/components/table11";
import selectpart4 from "@/views/device/selectpart4";
import { getListItem } from "@/api/system/dict";
import {
  getPartDetail,updateJobequipmentlist,downloadPaper,downloadPaperBatch,
  updateData,updateData2,getSendDevicePartList, getEngineerList
} from "@/api/platform_device/projectjob";
import { getDetail } from "@/api/platform_device/project";
import cselectConect2 from "@/components/custom-ui/selectConect2";
import { getList as getList2 } from "@/api/platform_device/typeconfig";
export default {
  data () {
    return {
      isLoad: true,
      loading: false,
      loading1: false,
      delIds: undefined,
      partSelectData: [],
      data: [],
      data_part: [],
      obj: {},
      projectInfo: {},
      deviceInfo: {},
      query_part: {
        // 'projectId_equal': undefined
        jobId_equal: undefined
      },
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 1
      },
      page_part: {
        pageSize: 10,
        pages: 1,
        currentPage: 1
      },
      selectPartFormVisible: false,
      addFormVisible: false,
      selectFormVisible: false,
      editFormVisible: false,
      infoFormVisible: false,

      form: {
        // customerId: undefined,
        // projectId: undefined,
        // jobType: 0,
      },
      editform: {},
      formData: {
        projectJobDTO: undefined
      },
      jobId: undefined,
      rowdata: undefined,
      // rownum: undefined,
      engineerValue:0,
      form_part: {
        customerId: undefined,
        projectId: undefined
      },
      child_form: {},
      edit: false,
      jobCreateTIme: this.$route.query.jobCreateIime,
      option_part: {
        width: "100%",
        tree: true,
        index: true,
        border: true,
        refreshBtn: false,
        page: false,
        header: false,
        align: "center",
        menu: true,
        delBtn: false,
        editBtn: false,
        stripe: true,
        column: [
          { label: "id", prop: "id", hide: true },
           { label: "类型", prop: "status", formatter (row, value, label, column) {
             if(value==0){
               return '设备'
             }else{
               return '配件'
             }
           } },
          { label: "名称", prop: "equipment" },
          { label: "规格", prop: "standards" },
          { label: "图号", prop: "chart" },
          { label: "标准号", prop: "standard" },
          { label: "数量", prop: "num" },
          { label: "单重/吨", prop: "weight" },
          { label: "参数", prop: "param" },
          { label: "工程师", prop: "engineername" },
              {
            label: "状态",
            prop: "jobStatus",
            
            type: "select",
            formatter (row, value, label, column) {
              // if(value && value>2){
              //   return value;
              // }
              //  if(row.chart || row.standard){
              //     //说明表示已设计完成，
              //     return 4;
              //  }else{
              //    return 1;
              //  }
                return '完成';
            },
            dicData: [
                {
                label: "未设计",
                value: 0
              },
                {
                label: "设计中",
                value: 1
              },
                {
                label: "设计暂停",
                value: 2
              },
               {
                label: "设计完成",
                value: 3
              },
              {
                label: "生产中",
                value: 4
              },
              {
                label: "暂停生产",
                value: 5
              },
              {
                label: "生产完成",
                value: 6
              }
            ]
          },
          // { label: "状态", prop: "deviceStatus" },
          // { label: "状态", prop: "statusname" },
          // { label: "完成时间", prop: "completeTime" },
          { label: "备注", prop: "remark" }
        ]
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
          { label: "客户", prop: "customerName" },
          { label: "项目", prop: "projectName" },
          { label: "合同编号", prop: "contractNo" },
          { label: "销售", prop: "realName" },
          { label: "任务单添加人", prop: "userName" },
          { label: "任务单添加时间", prop: "createTime" },
          { label: "交付时间", prop: "payTime" },
          { label: "备注", prop: "remark" },
          { label: "状态", prop: "progress" }
        ]
      }
    };
  },
  computed: {
      ...mapGetters(["userInfo"]),
  },
  components: {
    cselectConect2,
    table11,
    selectpart4
  },
  beforeRouteUpdate (to, from, next) {
    getEngineerList().then(res => {
      this.engineerArr = res.data.data;
       if(this.engineerArr ){
        for(var i=0;i<this.engineerArr.length;i++){
          if( (this.engineerArr[i].id==(this.userInfo.userId))){
            this.engineerValue = this.userInfo.userId
          }
        }
        
      }else{
         this.engineerValue = 0
      }
    });
    getListItem("job_status").then(res => {
      this.statusArr = res.data.data;
    });
    this.jobId = to.query.id;
    this.projectId = to.query.projectId;
    if (this.projectId) {
      getDetail(this.projectId).then(res => {
        this.projectInfo = res.data.data;
        this.projectInfo["jobCreateTime"] = to.query.jobCreateTime;
        this.projectInfo["payTime"] = to.query.payTime;
      });

      if (this.projectId) {
        this.query_part.projectId_equal = this.projectId;
        this.onLoad_part(this.page_part);
      }
      getEngineerList().then(res => {
        this.engineerArr = res.data.data;
      });
    }
    next();
  },
  created () {
    this.initEngineer()
    getEngineerList().then(res => {
      this.engineerArr = res.data.data;
      if(this.engineerArr ){
        for(var i=0;i<this.engineerArr.length;i++){
          if( (this.engineerArr[i].id==(this.userInfo.userId))){
            this.engineerValue = this.userInfo.userId
          }
        }
        
      }else{
         this.engineerValue = 0
      }
    });
    getListItem("job_status").then(res => {
      this.statusArr = res.data.data;
    });

    this.jobId = this.$route.query.id;
    this.projectId = this.$route.query.projectId;
    if (this.projectId) {
      getDetail(this.projectId).then(res => {
        this.projectInfo = res.data.data;
        this.projectInfo.jobCreateTime = this.$route.query.jobCreateTime;
        this.projectInfo.payTime = this.$route.query.payTime;
      });

      if (this.projectId) {
        this.query_part.projectId_equal = this.projectId;
        this.onLoad_part(this.page_part);
      }
    }
  },
  methods: {
    initEngineer(){
      console.log(this.userInfo)
    },
    callFather (param) {
      this.page_part.currentPage = param.currentPage;
      this.onLoad_part(this.page_part);
    },
 
   
 
    downloadOne(item){
       this.loading = true
      let jobequipmentlist ={}
      jobequipmentlist.id = item.id
      jobequipmentlist.acceptStatus = 2 //表示已接收
      jobequipmentlist.downloadTimes = item.downloadTimes==undefined?1: (item.downloadTimes+1)
   
      downloadPaper(jobequipmentlist).then(res=>{
          this.loading = false
        if(res.status!=200){
            this.$message({ type: "error", message: '文件下载失败！'});
            return
        }
          this.download(res,item.paperName)
          this.$message({ type: "success", message: "下载成功!" });
          // this.onLoad_part(this.page_part);
          item.acceptStatus = 2 //表示已接收
      }).catch(error =>{
         console.log('error:',error);
         
          this.loading = false
          this.$message({ type: "error", message:  error.msg });
      })

    },


        // 下载文件
    download (res,fileName) {
      // return 'data:image/dwg;base64,'+btoa(new Uint8Array(res.data)
      // .reduce((data, byte)=> data+String.fromCharCode(byte),''))
      
        const content = res.data
        const blob = new Blob([content]) // 构造一个blob对象来处理数据
         // fileName 导出文件名
        // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
        // IE10以上支持blob但是依然不支持download
        if ('download' in document.createElement('a')) { // 支持a标签download的浏览器
          const link = document.createElement('a') // 创建a标签
          link.download = fileName // a标签添加属性
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click() // 执行下载
          URL.revokeObjectURL(link.href) // 释放url
          document.body.removeChild(link) // 释放标签
        } else { // 其他浏览器
          navigator.msSaveBlob(blob, fileName)
        }
    },
    downloadBatch(item){
      this.loading1 = true
      let jobequipmentlist ={}
      jobequipmentlist.id = item.id
      // jobequipmentlist.acceptStatus = 2 //表示已接收
      // jobequipmentlist.downloadTimes = item.downloadTimes==undefined?1: (item.downloadTimes+1)
      console.log(item.equipment+'('+item.name+')'+".zip");
      jobequipmentlist.name = item.equipment+'('+item.name+')'
      jobequipmentlist.projectId = this.$route.query.projectId
      downloadPaperBatch(jobequipmentlist).then(res=>{
          this.loading1 = false
        if(res.status!=200){
            this.$message({ type: "error", message: '文件下载失败！'});
            return
        }
          this.download(res,item.equipment+'('+item.name+')'+".zip")
          this.$message({ type: "success", message: "下载成功!" });
          // this.onLoad_part(this.page_part);
       
      }).catch(error =>{
         console.log('error:',error);
         
          this.loading1 = false
          this.$message({ type: "error", message:  error.msg });
      })
    },
    acceptOne(item){
      this.loading = true
      let jobequipmentlist ={}
      jobequipmentlist.id = item.id
      jobequipmentlist.acceptStatus = 1 //表示已接收

      updateJobequipmentlist(jobequipmentlist).then(res =>{
       item.acceptStatus = 1
        // this.onLoad_part(this.page_part);
        
        this.$message({ type: "success", message: "接收成功!" });
      }).catch(error =>{
        this.$message({ type: "error", message: "接收失败!" });
      })
      this.loading = false
    },
 
    goToCustomer (customerName) {
      this.$router.push({
        name: "客户列表",
        path: "/customer/customer",
        query: {
          customerName: customerName
        }
      });
    },
    goToProject (projectName) {
      this.$router.push({
        name: "项目列表",
        path: "/customer/project",
        query: {
          projectName: projectName
        }
      });
    },
 

    onLoad_part (page, params = {}) {
      this.query_part["id_equal"] = this.jobId;
      getPartDetail(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query_part)
      ).then(res => {
        const data = res.data.data;
        this.page_part.pages = data.pages;
        // this.data_part = data.records;
        var data1 = []
        data.records.forEach(item => {
          var obj ={}
          Object.assign(obj, item)
          item.children =[]
          item.children.push(obj)
          data1.push(item)
          
        })
        this.data_part = data1
      });
    },

  }
};
</script>

<style  lang="stylus" scoped>
.container {
  margin: 20px 40px;
  width: auto;

  .table-box {
    margin-top: 20px;

    .btn-box {
      text-align: right;
      margin-bottom: 10px;
      padding-right: 10px;
    }
  }
}

.blank {
  height: 10px;
}

.namebtn {
  color: #fff;
  background-color: #FFA897;
  width: 170px;
  padding: 12px 0;
  text-align: center;
  cursor: pointer;
  margin-right: 2px;

  &.on {
    background-color: #ffa897;
  }
}

.table-box {
  font-size: 0.07rem;
  color: #515151;

  .item {
    .tip-box {
      display: flex;
      padding: 10px;
      justify-content: space-between;

      .btn {
        transform: scale(0.9);
      }
    }
  }
}

// 详情页样式
.el-form-item {
  margin-bottom: 10px;
}

.container {
  margin: 20px 40px;
  width: auto;

  .introduce {
    display: flex;

    .item {
      flex: 1;

      &:last-child {
        border-right: 1px solid #dcdfe6;
      }

      .title, .text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.07rem;
        text-align: center;
        height: 40px;
        line-height: 40px;
        border: 1px solid #dcdfe6;
        border-right: none;
      }

      .title {
        background-color: #ffa897;
        color: #ffffff;
        border-bottom: none;
      }

      .text {
        .href {
          color: #8693f3;
        }
      }
    }
  }

  .table-box {
    font-size: 0.07rem;
    color: #515151;

    .item {
      .tip-box {
        display: flex;
        justify-content: space-between;

        .btn {
          transform: scale(0.9);
        }
      }

      .main-box {
        border: 1px solid #89c3f8;
        padding: 10px 20px;

        .input-box {
          display: flex;

          .input-list {
            flex: 1;

            &.input-list-fix {
              width: 100px;
            }
          }
        }

        .list-box {
          display: inline-block;

          .list {
            padding: 0 10px;
            margin-top: 20px;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>