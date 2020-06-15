<template>
  <div class="container">
    <searchStyle02 :data="searchInput"
                   @searchInputFather="searchInputFather"></searchStyle02>
    <searchStyle01 :data="searchItem.mold"
                   @searchFather="searchFather"
                   name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.flow"
                   @searchFather="searchFather"
                   name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.response"
                   @searchFather="searchFather"
                   name="username"></searchStyle01>
    <searchStyle01 :data="searchItem.progress"
                   @searchFather="searchFather"
                   name="dictValue"></searchStyle01>
    <div class="table-box">
      <div class="btn-box">
        <cbutton title="新增任务单"
                 @clickButton="clickButton"></cbutton>
      </div>

      <avue-crud :data="data"
                 :key="tableTimer"
                 :option="option"
                 :page="page"
                 v-model="obj"
                 @search-change="searchChange"
                 @on-load="onLoad">
        <template slot="menu"
                  slot-scope="scope">
          <el-button size="small"
                     @click.native="editJobRow(scope.row,scope.index)"
                     type="primary"
                     icon="el-icon-edit"
                     plain>查看</el-button>
    <!-- v-if=" (scope.row.sendType && scope.row.progress>0 ) || (!scope.row.sendType &&scope.row.progress>=0 )" -->
          <!-- <el-button size="small"
                     v-if="!scope.row.processInstanceId && scope.row.sendType!='' "
                     @click.native="sendJobRow(scope.row,scope.index)"
                     type="primary"
                     icon="el-icon-edit"
                     plain>下发</el-button> -->
          <!-- <el-button size="small"
                     @click.native="delJobRow(scope.row,scope.index)"
                     type="danger"
          icon="el-icon-delete">删除</el-button>-->
        </template>
      </avue-crud>
    </div>



    <!-- 任务单新增 -->
    <el-dialog title="任务单新增"
               :visible.sync="addFormVisible"
               :key="timer"
               class="abow_dialog"
               width="80%" >
      <!-- 客户 项目选择 -->
      <cselectConect3 ref="cselectConect2"
                      @setDataFather="setDataFather"></cselectConect3>

    <div slot="footer"
           class="dialog-footer">
        <el-button size="small"
                   @click="closeDialog()">取消</el-button>
        <el-button size="small"
                   type="primary"
                   :loading="loading"
                   @click="submitForm1('form')">保存</el-button>
      </div>
    </el-dialog>



    <!-- 任务单编辑 -->
    <el-dialog title="任务单编辑"
               :visible.sync="editFormVisible"
               :key="timer"
               class="abow_dialog"
               width="90%" >
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
        <div class="item"
             v-for="(item, index) in data_part"
             :key="item.id">
          <div class="tip-box">
            <div class="title">{{item.equipment}}</div>

             <el-select v-model="childForm.sendType"
                      size="mini"  v-if="!edit&& index==0" 
                      style="width:auto;padding-right:5px">
              <el-option v-for="item in selectDataType"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"></el-option>
            </el-select>
            <!-- <cbutton class="btn"
                       title='添加配件'
            @clickButton='addPartDialog(item)'></cbutton>-->
          </div>
          <div style="height:10px"></div>
          <div>
            <!-- 配件列表 -->
            <avue-crud :data="item.parts"
                       :option="edit==false?option_part:option_edit_part"
                       @row-del="delRow"
                       @row-update="editRow">
              <!-- 自定义按钮 -->
              <!-- <template slot="menu"
                        slot-scope="scope">
                <el-button size="small"
                           @click.native="delRow(scope.row,scope.index)"
                           type="danger"
                           icon="el-icon-delete">删除</el-button>
              </template>-->
            </avue-crud>
          </div>
        </div>
        <!-- TODO 暂时关闭分页 -->
        <!-- <cpagination v-bind:child-msg="page_part"
                     v-show="childForm.projectId"
                     @callFather="callFather"></cpagination> -->
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="small"
                   @click="closeDialog()">取消</el-button>
        <el-button size="small"
                   type="primary"
                   :loading="loading"
                   @click="submitForm('form')">保存</el-button>
      </div>
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
  updateProduceData,
  remove,update,add,
  sendProgress
} from "@/api/platform_device/projectjob";
import { getDeviceList } from "@/api/platform_device/projectjob";
export default {
  data () {
    return {
      searchItem: {
        mold: { label: "类型", res: [] },
        flow: { label: "流数", res: [] },
        response: { label: "销售", res: [] },
        progress: { label: "状态", res: [] }
      },
      searchInput: [
        { name: "客户", value: "1", label: "customerName", type: "input" },
        { name: "项目", value: "2", label: "projectName", type: "input" },
        { name: "时间", value: "3", label: "createTime", type: "daterange" }
      ],
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
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      listdata:[],
      tableData: [],
      table_page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
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
        // menu: false,
        // menuType: 'button',
        delBtn: false,
        editBtn: false,
        stripe: true,
        column: [
          { label: "客户", prop: "customerName" },
          { label: "项目", prop: "projectName" },
          { label: "合同编号", prop: "contractNo" },
          { label: "销售", prop: "userName" },
          { label: "任务单新增人", prop: "realName" },
          { label: "任务单新增时间", prop: "createTime" },
          { label: "交付时间", prop: "payTime" },
          { label: "备注", prop: "remark" },
          {
            label: "状态",
            prop: "progress",
            formatter (row, value, label, column) {
              if(row.sendType){
                 if (value>-2 && value <= 0) {
                  return "审核中";
                 }
                if (value === 1) {
                      return "审核通过";
                  }
              }else{
                if (value>-2 && value < 0) {
                  return "审核中";
                 }
                 if (value === 0) {
                  return "审核通过";
                 }
              }
             
             if (value === -3) {
                return "未提交";
              }
              if (value === 2) {
                return "设计中（部分暂停）";
              }
              if (value === 3) {
                return "设计完成";
              }
              if (value === 4) {
                return "设计完成（部分暂停）";
              }
              if (value === 5) {
                return "设计(全部暂停)";
              }
              if (value === 6) {
                return "生产中";
              }
              if (value === 7) {
                return "生产（部分暂停）";
              }
              if (value === 8) {
                return "生产完成";
              }
              if (value === 9) {
                return "生产完成(部分暂停)";
              }
              if (value === 10) {
                return "生产(全部暂停)";
              }
              if (value === -2) {
                return "审核不通过";
              }
              // if (value === 11) {
              //   return "审核通过";
              // }
            }
          }
        ]
      },
      timer: "",
      addFormVisible: false,
      editFormVisible: false,
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
            cell: true,
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
            cell: true,
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
          { label: "已完成数量", prop: "completeNum", cell: true },
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
            cell: true,
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss"
          },
          { label: "备注", prop: "remark" }
        ]
      },
       selectDataType: [{ 'value': '', 'name': '默认' }, { 'value': 'finance', 'name': '财务' }, { 'value': 'manager', 'name': '总经理' }],
    };
  },
  components: {
    cselectConect3,
    selectdevice2,
    selectdevice3
  },
  created () {
    this.getSelect("mold");
    this.getSelect("flow");
    this.getSelect("response");
    this.getSelect("producejob");
  },
  computed: {},
  methods: {
    clickButton () {
      //新增
      this.timer = new Date().getTime();
      //从设计任务单中查找
      // this.query_part['jobType_equal'] = 0
      this.addFormVisible = true;
      this.edit = false;
      //清空下方列表
      this.data_part = [];
    },
    getSelect (item) {
      //获得选择
      if (item === "response") {
        getResponse().then(res => {
          this.searchItem[item].res = res.data.data;
        });
      } else if (item === "mold") {
         getListItem(item).then(res => {
          this.searchItem[item].res = res.data.data;
        });}
       else if (item === "producejob") {
         getListItem(item).then(res => {
          this.searchItem['progress'].res = res.data.data;
        });
      } 
      else {
        getListItem(item).then(res => {
          this.searchItem[item].res = res.data.data;
        });
      }
    },
    searchFather (label, item) {
      switch (label) {
        case "类型":
          this.query["c.type_equal"] = item.dictKey;
          break;
        case "流数":
          this.query["flow_equal"] = item.dictKey;
          break;
        case "状态":
          this.query["a.progress_equal"] = item.dictKey;
          break;
        case "销售":
          this.query["d.chargeId_equal"] = item.id;
          break;
        default:
          break;
      }
      this.onLoad(this.page);
    },
    searchInputFather (inputValue) {
      this.query["d.customerName"] = inputValue.customerName;
      this.query["c.projectName"] = inputValue.projectName;
      if (inputValue.createTime) {
        this.query["a.createTime_datege"] = inputValue.createTime[0];
        this.query["a.createTime_datele"] = inputValue.createTime[1].replace(
          "00:00:00",
          "24:60:60"
        );
      }else{
        this.query["a.createTime_datege"] = undefined
        this.query["a.createTime_datele"] = undefined
      }
      this.onLoad(this.page);
    },
    editJobRow (row) {
      this.$router.push({
          name: "生产任务单详情",
          path: "/produce/producetaskdetail",
          query: {
            id: row.id,
            projectId: row.projectId,
            progress: row.progress,
            jobCreateTime: row.createTime,
            payTime: row.payTime
          }
        });

      
      /*
      this.timer = new Date().getTime();
  
     
      this.jobId = row.id;
      this.editFormVisible = true;

      if(row.progress === -3){
        this.edit = false;
      }else{
        //从生产任务单中查找
        this.query_part["jobType_equal"] = 1;
        this.edit = true
      }
      
      //防止未加载 导致this.$refs为空
      // this.$nextTick(() => {
      //   this.$refs["cselectConect2"].setValues(row.customerId, row.projectId);
      // });
      getDetail(row.projectId).then(res => {
        this.projectInfo = res.data.data;
        this.projectInfo["jobCreateTime"] = row.createTime;
        this.projectInfo["payTime"] = row.payTime;
      });
       this.query_part["projectId_equal"] = row.projectId;
      this.onLoad_part({
            pageSize: 100000,
            pages: 1,
            currentPage: 1
          });
      */
    },
    delJobRow (row) {
      // this.$message({ type: "error", message: "暂不开放功能!" });
      remove(row.id).then(res => {
        this.$message.success("删除成功！");
        this.onLoad(this.page_part);
      });
    },
    searchChange (params) {
      this.query = params;
      this.onLoad(this.page, params);
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
     
      //修改getProduceDeviceList改为getProjectDeviceList
      if (!this.edit) {
        getProjectDeviceList(
          page.currentPage,
          page.pageSize,
          Object.assign(params, this.query_part)
        ).then(res => {
          const data = res.data.data;
          this.table_page.total = data.pages.total
          // this.table
          // this.page_part.pages = data.pages;
          this.data_part = data.records;
        });
      } else {
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
      this.table_page.currentPage = param.currentPage;
      // this.onLoad(this.page_part);
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
      done();

      // console.log(row)
      // this.partRow = row
      // this.editEquipmentFormVisible = true
      // if (row.status == 0) {
      //   this.partRow.statusname = '设备'
      // } else if (row.status == 1) {
      //   this.partRow.statusname = '配件'
      // }
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
        if (item.id == row.parentTypeId) {
          //删除配件中的数据
          item.parts.splice(index, 1);
        }
      });
    },
    submitForm1 () {
      if(!this.childForm.projectId){
         this.loading = false;
         this.$message({ type: "error", message: "请先选择客户或者项目!" });
      }
     this.loading = true;
      var projectJobDTO = {};
      var projectJob = {};
      projectJob.id = this.jobId;
      projectJob.jobType = 1;
      projectJob.progress = -3;
      projectJob.customerId = this.childForm.customerId;
      projectJob.projectId = this.childForm.projectId;
      projectJob.payTime = this.childForm.payTime;
      add(projectJob)
        .then(res => {
          this.loading = false;
          this.tableTimer = new Date().getTime();
          this.$message({ type: "success", message: "提交成功!" });
          this.addFormVisible = false;
        })
        .catch(err => {
          this.loading = false;
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
      // projectJob.customerId = this.projectInfo.customerId;
      console.log( ' this.projectInfo : ',this.projectInfo);
      
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
        updateProduceData(projectJobDTO)
          .then(res => {
            this.loading = false;
            this.tableTimer = new Date().getTime();
            this.$message({ type: "success", message: "提交成功!" });
            this.addFormVisible = false;
          })
          .catch(err => {
            this.loading = false;
          });

    },
    closeDialog () {
      this.editFormVisible = false
      this.addFormVisible = false;
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
    }
  }
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