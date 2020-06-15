<template>
  <div class="container">
 
      <!-- 客户 项目选择 -->
      <!-- <cselectConect3 ref="cselectConect2"
                      v-show="!edit"
                      @setDataFather="setDataFather"></cselectConect3> -->

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
          <div class="text">{{projectInfo.jobCreateTime |timeFilter}}</div>
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

      <div style="display:flex;flex-direction:row;padding-top:20px">
       
              <cbutton title="新增设备"
                      v-if="!edit && childForm.projectId"
                      style="padding:10px"
                      @clickButton="addEquipment"></cbutton>
        <!-- 添加设备 选取设计任务单中已完成设计的设备 -->
            <cbutton title="新增配件"
                    v-if="!edit && childForm.projectId"
                    style="padding:10px"
                    @clickButton="addPart"></cbutton>
            <!-- 添加设备 选取设计任务单中已完成设计的设备 -->
     

      </div>
      <div class="table-box">
     
 <el-row>
        <div class="item"
             v-for="(item, index) in data_part"
             :key="item.id">
         
          <el-row>
            <el-col :span="4">
               <div class="tip-box">
                 <div class="title"  v-if="item.parts.length>0" >{{item.equipment}}</div>
               
               </div>
            </el-col>
            <el-col :span="16">
            </el-col>
            <el-col :span="2">
               <el-select v-model="childForm.sendType"
                      size="mini"  v-if="$route.query.progress==-3&&!edit&& index==0" 
                      style="width:auto;padding-right:5px">
              <el-option v-for="item in selectDataType"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"></el-option>
            </el-select>
            </el-col>
            <el-col :span="2"  style="width:auto;padding-right:5px">
               <el-button size='mini' type="primary"    v-if="$route.query.progress==-3&&index==0"  :loading="loading"
                 @click="submitForm">提交审核</el-button>
            </el-col>
          </el-row>
           
            
            <!-- <cbutton class="btn"
                       title='添加配件'
            @clickButton='addPartDialog(item)'></cbutton>-->
         
          <div>
            <!-- 配件列表 -->
            <avue-crud :data="item.parts"
                      v-if="item.parts.length>0"
                       :option="edit==false?option_part:option_edit_part"
                       @row-del="delRow"
                       @row-update="editRow">
              <!-- 自定义按钮 -->
              <template slot="menu"
                        slot-scope="scope" v-if="$route.query.progress!=-2">
                <el-button size="small" v-if="scope.row.isBuy!=1 && $route.query.progress!=-3" 
                           @click.native="progressRow(scope.row,scope.index)"
                            type="text"  plain>进度</el-button>
                <el-button size="small" v-if="!scope.row.isBuy && $route.query.progress!=-3"
                           @click.native="buyRow(scope.row,scope.index)"
                            type="text"  plain>外购</el-button>
              </template>

            </avue-crud>
            <div style="height:20px"></div>   
          </div>
        </div>
 </el-row>
        <!-- TODO 暂时关闭分页 -->
        <cpagination v-bind:child-msg="page_part"
                     
                     @callFather="callFather"></cpagination>
      </div>
      <!-- <div slot="footer"
           class="dialog-footer">
        <el-button size="small"
                   @click="closeDialog()">取消</el-button>
        <el-button size="small"
                   type="primary"
                   :loading="loading"
                   @click="submitForm('form')">保存</el-button>
      </div> -->


   <!-- <div class="btn-box">
      <el-button type="primary"
                 @click="submitForm">保存</el-button>
      <el-button @click="closeDialog">取消</el-button>
    </div> -->

 <el-dialog title="外购"
               :key="timer"
               :visible.sync="checkFormVisiable"
               width="10%">
               <el-row>
                     <span>  请确定是否加入外购？</span>
               </el-row>
            <el-row style="padding-top:10px">
                 <el-button type="primary"
                 @click="buySubmit">确定</el-button>
                 <el-button @click="checkFormVisiable = false">取消</el-button>
            </el-row>
   
    </el-dialog>

    <!-- 添加设备 -->
    <el-dialog title="新增设备"
               :key="timer"
               :visible.sync="addEquipmentFormVisible"
               width="80%">
      <selectdevice2 :projectId="childForm.projectId"
                     status="0"
                     :notInIds="notInIds"
                     @selectedSave="selectedDeviceSave"
                     @selectedClose="selectedDeviceClose"></selectdevice2>
    </el-dialog>

    <!-- 添加配件 -->
    <el-dialog title="新增配件"
               :key="timer"
               :visible.sync="addPartFormVisible"
               width="80%">
      <selectdevice2 :projectId="childForm.projectId"
                     status="1"
                     :notInIds="notInIds"
                     @selectedSave="selectedPartSave"
                     @selectedClose="selectedPartClose"></selectdevice2>
    </el-dialog>
  </div>
</template>

<script>
import cselectConect3 from "@/components/custom-ui/selectConect3";
import selectdevice2 from "@/views/device/selectdevice2";
import selectdevice3 from "@/views/device/selectdevice3";
import { getListItem } from "@/api/system/dict";
// import { add } from "@/api/platform_device/projectjob";
import { getResponse } from "@/api/customer/customer";
import { getDetail, getPartDetail } from "@/api/platform_device/project";
import {
  updateData,
  getEngineerList,
  getList,
  getProjectDeviceList,
  getProduceDeviceList,
  updateProduceData2,
  updateProduceData3,
  remove,update,add,
  sendProgress,getDeviceList,updateJobEquipmentList
} from "@/api/platform_device/projectjob";
// import { getDeviceList } from "@/api/platform_device/projectjob";
export default {
  data () {
    return {
      data: [],
      obj: {},
      tableTimer: "",
      query: {
        "a.jobType": 1,
        "d.customerName": undefined,
        "c.type": undefined,
        "a.createTime": undefined,
        "c.projectName": undefined
      },

      listdata:[],
      tableData: [],
      table_page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      timer: "",
      editFormVisible: false,
      buyRowData: undefined,
      buyRowIndex: undefined,
      checkFormVisiable :false,
      edit: false,
      addEquipmentFormVisible: false,
      addPartFormVisible: false,
      editEquipmentFormVisible: false,
      childForm: {sendType:''},
      data_part: [],
      jobId: undefined,
      notInIds: "",
      projectInfo: {},
      form: {},
      deviceList: [],
      modleData: [],
      partRow: {},
      page_part: {
        pageSize: 10,
        pages: 1,
        currentPage: 1
      },
      loading: false,
      query_part: {},
      option_part: {
        width: "100%",
        index: true,
        border: true,
        refreshBtn: false,
        page: false,
        header: false,
        align: "center",
        addBtn: false,
        menu: true,
        delBtn: true,
        cellBtn: true,
        editBtn: false,
        stripe: true,
        column: [
          {
            label: "类型",
            prop: "status",
            formatter (row, value, label, column) {
              if (value == 0) {
                return "设备";
              } else if (value == 1) {
                return "配件";
              }
            }
          },
          { label: "名称", prop: "name" , formatter (row, value, label, column) {
             if (row.status == 0) {
                if (row.equipment) {
                  return row.equipment + '(' +value + ')';
                } else {
                  return value;
                }
              }else{
                if (row.standards) {
                  return row.equipment + '(' +row.standards + ')';
                } else {
                  return  row.equipment;
                }
              }
            }},
              { label: "规格", prop: "standards" },
          {
            label: "数量",
            prop: "num",
            cell: true,
            rules: [
              {
                required: true,
                message: "请输入数量",
                trigger: "blur"
              }
            ], formatter (row, value, label, column) {
              if (row.unit) {
                return value + row.unit;
              } else {
                return value;
              }
            }
          },
          // { label: "单位", prop: "unit" },
          { label: "重量", prop: "weight" },
          { label: "参数", prop: "param" }
        ]
      },
      option_edit_part: {
        width: "100%",
        index: true,
        border: true,
        refreshBtn: false,
        page: false,
        header: false,
        align: "center",
        addBtn: false,
        menu: true,
        delBtn: false,
        cellBtn:this.$route.query.progress!=-2?true:false ,
        editBtn: false,
        stripe: true,
        column: [
          {
            label: "类型",
            prop: "status",
            formatter (row, value, label, column) {
              if (value == 0) {
                return "设备";
              } else if (value == 1) {
                return "配件";
              }
            }
          },
          { label: "名称", prop: "name", formatter (row, value, label, column) {
              if (row.equipment) {
                return row.equipment + '(' +value + ')';
              } else {
                return value;
              }
            } },
          { label: "图号", prop: "chart" },
          {
            label: "图纸接收时间",
            prop: "acceptTime",
            // cell: true,
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss"
          },
          { label: "数量", prop: "num" , formatter (row, value, label, column) {
              if (row.unit) {
                return value + row.unit;
              } else {
                return value;
              }
            }},
          // { label: "单位", prop: "unit" },
          { label: "单重/吨", prop: "weight" },
          { label: "参数", prop: "param" },
          {
            label: "状态",
            prop: "jobStatus",
            // cell: true,
            type: "select",
            formatter (row, value, label, column) {
              if(value && value>2){
                return value;
              }
               if(row.chart || row.standard){
                  //说明表示已设计完成，
                  return 4;
               }else{
                 return 1;
               }

            },
            dicData: [
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
          { label: "已完成数量", prop: "completeNum" },
          {
            label: "开始时间",
            prop: "completeTime",
            cell: true,
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss"
          },
          {
            label: "完成时间",
            prop: "completedTime",
            // cell: true,
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss"
          },
          { label: "备注", prop: "remark" ,cell: true }
        ]
      },
       selectDataType: [{ 'value': '', 'name': '默认' }, { 'value': 'finance', 'name': '财务' }, { 'value': 'manager', 'name': '总经理' }],
       editOrderEquipmentList:[],
       deleteOrderEquipmentList:[],
    };
  },
  components: {
    cselectConect3,
    selectdevice2,
    selectdevice3
  },
  beforeRouteUpdate(to,from,next){
    this.init(to.query.id,to.query.progress,to.query.projectId,to.query.jobCreateTime,to.query.payTime)
    next()
  },
  created () {
    this.init(this.$route.query.id,this.$route.query.progress,this.$route.query.projectId,this.$route.query.jobCreateTime,this.$route.query.payTime)
  },
  computed: {},
  methods: {

    getSelect (item) {
      //获得选择
      if (item === "response") {
        getResponse().then(res => {
          this.searchItem[item].res = res.data.data;
        });
      } else if (item === "device") {
        /*     selectTypeList().then(res => {
              this.searchItem[item].res = res.data.data
            }); */
      } else {
        getListItem(item).then(res => {
          this.searchItem[item].res = res.data.data;
        });
      }
    },


    init(id,progress,projectId,jobCreateTime,payTime) {
     
      this.jobId = id;
      this.editFormVisible = true;

      if(progress === -3){
        this.edit = false;
      }else{
        //从生产任务单中查找
        // this.query_part["jobType_equal"] = 1;
        this.edit = true
      }
      
      //防止未加载 导致this.$refs为空
      // this.$nextTick(() => {
      //   this.$refs["cselectConect2"].setValues(row.customerId, row.projectId);
      // });
      getDetail(projectId).then(res => {
        this.projectInfo = res.data.data;
        this.projectInfo["jobCreateTime"] = jobCreateTime;
        this.projectInfo["payTime"] = payTime;
      });
       this.query_part["projectId_equal"] = this.$route.query.projectId;
      this.onLoad_part(this.page_part);
      
    },
    delJobRow (row) {
      // this.$message({ type: "error", message: "暂不开放功能!" });
      remove(row.id).then(res => {
        this.$message.success("删除成功！");
        this.onLoad(this.page_part);
      });
    },

    onLoad (page, params = {}) {
     
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
      });
    },

    setDataFather (form) {
      this.childForm = form;
      //由于需求变化 不再加载，等编辑时 再加载
      // if (this.childForm.projectId) {
      //   this.onLoad_part({
      //   pageSize: 100000,
      //   pages: 1,
      //   currentPage: 1
      // });
      // }
    
    },

    addEquipment () {
      if (this.childForm.projectId) {
        this.judgeCondition();
        this.timer = new Date().getTime();
        this.addEquipmentFormVisible = true;
      } else {
        this.$message({ type: "error", message: "请选择项目!" });
        return;
      }
    },
    selectedDeviceSave (selectParts) {
      this.deviceList = selectParts;
      var dataList = this.data_part;
      //将添加的设备按类别添加
      this.data_part.forEach((part, i) => {
        selectParts.forEach((item, index) => {
          //找到同一个类别 加入
          if (item.parentTypeId == part.id) {
            item.parts.push(item);
          }
          //当没有找到给类别的时候 先加入类别，在加入具体数据
          if (index > item.length) {
            this.dataList.push({
              id: item.parentTypeId,
              equipment: item.equipment
            });
            this.dataList[i + 1].parts.push(item);
          }
        });
      });
      this.data_part = dataList;
      this.addEquipmentFormVisible = false;
    },
    selectedDeviceClose () {
      this.addEquipmentFormVisible = false;
    },
    judgeCondition () {
      this.notInIds = {};
      this.data_part.forEach(part => {
        part.parts.forEach(item => {
          this.notInIds += "," + item.id;
        });
      });
      if (!this.childForm.projectId) {
        this.$message({ type: "error", message: "请选择项目!" });
        return;
      }
    },
    addPart () {
      this.judgeCondition();
      // if (this.childForm.projectId) {
      //   this.addPartFormVisible = true
      // } else {
      //   this.$message({ type: "error", message: "请选择项目!" });
      // }
      this.timer = new Date().getTime();
      if (!this.childForm.projectId) {
        this.timer = new Date().getTime();
        this.addPartFormVisible = true;
      } else {
        this.$message({ type: "error", message: "请选择项目!" });
        return;
      }
    },
    selectedPartSave (selectParts) {
      getDeviceList(1, 100, {
        projectId: this.childForm.projectId,
        jobStatus: 3
      }).then(res => {
        const data = res.data.data;
        this.modleData = data.records;
      });
      //判断是否已加入设备列表（modleData）
      selectParts.forEach(part => {
        for (var i = 0; i < this.deviceList; i++) {
          if (part.parentId == this.deviceList[i].id) {
            this.deviceList[i].parts.push(part);
          }
        }
      });
      // this.deviceList = selectParts
      this.addPartFormVisible = false;
    },
    selectedPartClose () {
      this.addPartFormVisible = false;
    },
    editRowDialog (row) {
      console.log(row);
    },
    onLoad_part (page, params = {}) {
       if(this.$route.query.progress != -3){
          this.query_part["jobType_equal"] = 1
       }
      //修改getProduceDeviceList改为getProjectDeviceList
      if (!this.edit) {
        var ids =''
        this.deleteOrderEquipmentList.forEach(item=>{
          ids +=item.id+","
        })
        this.query_part['idsNotIn']=ids
        getProjectDeviceList(
          page.currentPage,
          page.pageSize,
          Object.assign(params, this.query_part)
        ).then(res => {
          const data = res.data.data;
          this.page_part.total = data.pages.total
          this.page_part.pages = data.pages;
          this.data_part = data.records;
        });
      } else {
        this.query_part['idsNotIn']= undefined
        getProduceDeviceList(
          page.currentPage,
          page.pageSize,
          Object.assign(params, this.query_part)
        ).then(res => {
          const data = res.data.data;
          this.page_part.pages = data.pages;
          this.data_part = data.records;
        });
        this.query_part["jobType_equal"] = undefined;
      }
    },
    callFather (param) {
      //分页回调
      this.page_part.currentPage = param.currentPage;
      this.onLoad_part(this.page_part);
    },
    getList(currentPage) {
    //console.log("当前页面页码是：" + currentPage)
    this.tableData.splice(0,this.tableData.length);
    for(var i = this.page.pageSize*(currentPage - 1) + 1;
          i<= ((this.page.total>this.page.pageSize*currentPage)?(this.page.pageSize*currentPage):(this.page.total)); i++){
            this.tableData.push(this.listdata[i-1]);
      }
      this.tableLoading = false
      },
      sizeChange(val) {
    this.page.currentPage = 1
      this.page.pageSize = val
      this.getList(this.page.currentPage)
    },
    currentChange(val) {
      this.page.currentPage = val
       this.getList(val)
      // this.$message.success('页码' + val)
    },
 

    editRow (form, index, done, loading) {
      loading();
      //提交审核时才提交
      if(this.$route.query.progress==-3){
          this.editOrderEquipmentList.push(form)
          done();
      }else{
        //提交修改
        var data ={}
        data.id = form.id
        data.completeTime = form.completeTime
        data.remark = form.remark
        // updateProduceData2 updateJobEquipmentList
        updateJobEquipmentList(data).then(res=>{
            this.$message({ type: "success", message: "更新成功!" });
             done();
        }).catch(error=>{
            this.$message({ type: "error", message: "更新失败 请联系管理员!" });
             done();
        })
      }
     
    },
    buyRow(row,index){
      this.checkFormVisiable = true
      this.buyRowData =  row
      this.buyRowIndex = index
    },
    buySubmit(){
        var data ={}
        data.id = this.buyRowData.id
        data.isBuy = 1
        updateJobEquipmentList(data).then(res=>{
            this.$message({ type: "success", message: "更新成功!" });
            this.buyRowData.isBuy = 1
             this.checkFormVisiable = false
        }).catch(error=>{
            this.$message({ type: "error", message: "更新失败 请联系管理员!" });
        })
    },
    sendJobRow (row, index) {
      sendProgress(row.id).then(res => {
        this.$message({ type: "success", message: "下发成功!" });
        this.tableTimer = new Date().getTime();
      });
    },
    delRow (row, index) {
     
      this.data_part.forEach(item => {
        
        //找到对应的类别下
        if (item.parentTypeId == row.parentTypeId) {
          //删除配件中的数据
          this.deleteOrderEquipmentList.push(row)
          this.editOrderEquipmentList.forEach((order,i)=>{
            if(order.id === row.id){
              this.editOrderEquipmentList.splice(i,1)
            }
          })
          item.parts.splice(index, 1);
        }
      });
    },
    progressRow(row,index){
      console.log(1111,row)
      this.$router.push({
          name: "生产进度",
          path: "/produce/produceprogress",
          query: {
            id: row.id,
            projectId: this.$route.query.projectId,
            project: this.projectInfo.projectName,
            customer: this.projectInfo.customerName,
            equipment:row.equipment,
            chart:row.chart,
            num:row.num,
            unit:row.unit
          }
        });


    },


 submitForm () {
      //提交信息
      this.loading = true;
      var projectJobDTO = {};
      var projectJob = {};
      projectJob.id = this.jobId;
      projectJob.jobType = 1;
      projectJob.progress = 5;
      // projectJob.customerId = this.childForm.customerId;
      projectJob.projectId = this.projectInfo.id;
      // projectJob.payTime = this.childForm.payTime;
      if (this.childForm.sendType) {
        projectJob.sendType = this.childForm.sendType;
      }
      //由于需求变动 进行是否新增 跟编辑判断
      
        var jobEquipmentList = [];
        this.data_part.forEach(item => {
          item.parts.forEach(part => {
            //从所有父类的类别查找对应的设备id
            var ps = part.parentId.split(",");
            ps.forEach(p => {
              if (item.deviceId == p) {
                part.parentId = p;
              }
            });
          });
          jobEquipmentList = jobEquipmentList.concat(item.parts);
        });
        projectJobDTO.projectJob = projectJob;
        projectJobDTO.jobEquipmentList = jobEquipmentList;
        projectJobDTO.editOrderEquipmentList =this.editOrderEquipmentList
        projectJobDTO.deleteOrderEquipmentList = this.deleteOrderEquipmentList
        this.loading = false;
 
        updateProduceData3(projectJobDTO)
          .then(res => {
            this.loading = false;
            this.tableTimer = new Date().getTime();
            this.$message({ type: "success", message: "更新成功!" });
             this.$router.back()
          })
          .catch(err => {
            this.$message({ type: "success", message: "更新失败 请联系管理员!" });
            this.loading = false;
          });

    },
// 加入分页 不再全部提交 根据变化的数据进行提交
    // submitForm () {
    //   //提交信息
    //   this.loading = true;
    //   var projectJobDTO = {};
    //   var projectJob = {};
    //   projectJob.id = this.jobId;
    //   projectJob.jobType = 1;
    //   projectJob.progress = 5;
    //   // projectJob.customerId = this.childForm.customerId;
    //   projectJob.projectId = this.projectInfo.id;
    //   // projectJob.payTime = this.childForm.payTime;
    //   if (this.childForm.sendType) {
    //     projectJob.sendType = this.childForm.sendType;
    //   }
    //   //由于需求变动 进行是否新增 跟编辑判断
      
    //     var jobEquipmentList = [];
    //     this.data_part.forEach(item => {
    //       item.parts.forEach(part => {
    //         //从所有父类的类别查找对应的设备id
    //         var ps = part.parentId.split(",");
    //         ps.forEach(p => {
    //           if (item.deviceId == p) {
    //             part.parentId = p;
    //           }
    //         });
    //       });
    //       jobEquipmentList = jobEquipmentList.concat(item.parts);
    //     });
    //     projectJobDTO.projectJob = projectJob;
    //     projectJobDTO.jobEquipmentList = jobEquipmentList;

    //     this.loading = false;
    //     console.log('projectJobDTO : ',projectJobDTO)
    //     // updateProduceData(projectJobDTO)
    //     //   .then(res => {
    //     //     this.loading = false;
    //     //     this.tableTimer = new Date().getTime();
    //     //     this.$message({ type: "success", message: "更新成功!" });
    //     //      this.$router.back()
    //     //   })
    //     //   .catch(err => {
    //     //     this.loading = false;
    //     //   });

    // },
    closeDialog () {
       this.$router.go(-1)
    }
  }
};
</script>

<style lang="stylus">
.el-table {
  font-size: 0.07rem;
}

.el-table .cell {
  font-size: 0.07rem;
}

.el-form-item__label {
  font-size: 0.07rem;
}

.el-button--mini, .el-button--small {
  font-size: 0.07rem;
}
</style>
<style  lang="stylus" scoped>
 
.container {
  margin: 20px 40px;
  width: auto;

  .table-box {
    background-color: #ffffff;
    .btn-box {
      text-align: right;
      margin-bottom: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
    }
  }
}
 .btn-box {
    text-align: center;
    margin-top: 20px;
  }

.form-box {
  border: 1px solid #89c3f8;
  padding: 0 10px;
  margin-top: 20px;

  .in-form-box {
    width: 400px;
    padding-top: 20px;
  }
}

.tab-btn {
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;

  .btn {
    color: #fff;
    background-color: #FFA897;
    width: 170px;
    height: 30px;
    padding-top: 8px;
    text-align: center;
    cursor: pointer;
    margin-right: 2px;

    &.on {
      background-color: #ffa897;
    }
  }
}

.table-box {
  font-size: 0.07rem;
  color: #515151;
  padding-top: 10px;
  padding-bottom: 10px;
  .item {
    .tip-box {
      display: flex;
      justify-content: space-between;

      .title {
        padding: 10px 30px;
        margin-left: 8px;
        background-color: #FFA897;
      }

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
</style>