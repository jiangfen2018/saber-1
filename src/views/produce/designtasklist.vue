<template>
  <div class="container">
    <searchStyle02 :data="searchInput" @searchInputFather="searchInputFather"></searchStyle02>
    <searchStyle01 :data="searchItem.mold" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.flow" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.response" @searchFather="searchFather" name="username"></searchStyle01>
    <searchStyle01 :data="searchItem.progress" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <div class="table-box">
      <div class="btn-box">
        <cbutton title="新增任务单" @clickButton="addRow"></cbutton>
      </div>
      <!-- @row-click="handleRowClick" -->
      <avue-crud
        :data="data"
        :option="option"
        :page="page"
        v-model="obj"
        @search-change="searchChange"
        @on-load="onLoad"
      >
        <!-- 自定义按钮 -->
        <template slot="menu" slot-scope="scope">
          <el-button
            size="small"
            @click.native="editRow(scope.row,scope.index)"
            type="primary"
            plain
          >编辑</el-button>
          <!-- <el-button size="small"
                     @click.native="delRow(scope.row,scope.index)"
                     type="danger"
          plain>删除</el-button>-->
        </template>
      </avue-crud>

      <!-- 任务单新增 -->
      <el-dialog title="任务单新增" :visible.sync="addFormVisible" width="90%">
        <!-- 客户 项目选择 -->
        <cselectConect2 ref="cselectConect2" @setDataFather="setDataFather"></cselectConect2>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeDialog()">取消</el-button>
          <el-button
            size="small"
            type="primary"
            :loading="loading"
            @click="addSubmitForm('childform')"
          >保存</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import table11 from "@/components/table11";
import cselectConect2 from "@/components/custom-ui/selectConect2";
import { getListItem } from "@/api/system/dict";
import {
  getList,
  updateData,
  getPartDetail,
  getEngineerList,
  remove
} from "@/api/platform_device/projectjob";
import { createDesign } from "@/api/platform_device/project";
import { getResponse } from "@/api/customer/customer";
import { getList as getList2 } from "@/api/platform_device/typeconfig";
export default {
  data() {
    return {
      partSelectData: [],
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
      data_part: [],
      obj: {},
      projectInfo: {},
      deviceInfo: {},
      query: {
        "a.jobType": 0,
        "d.customerName": undefined,
        "c.type": undefined,
        "a.createTime": undefined,
        "c.projectName": undefined
      },
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
      addFormVisible: false,
      selectFormVisible: false,
      editFormVisible: false,
      infoFormVisible: false,
      rules: {
        configId: [
          { required: true, message: "请选择配件", trigger: "change" }
        ],
        // typeId: [{ required: true, message: '请选择型号', trigger: 'change' }],
        chart: [{ required: true, message: "请输入图号", trigger: "blur" }],
        standard: [
          { required: true, message: "请输入标准号", trigger: "blur" }
        ],
        weight: [{ required: true, message: "请输入重量", trigger: "blur" }],
        param: [{ required: true, message: "请输入参数", trigger: "blur" }],
        num: [{ required: true, message: "请输入数量", trigger: "blur" }]
      },
      form: {
        // customerId: undefined,
        // projectId: undefined,
        // jobType: 0,
      },
      childform: {},
      formData: {
        projectJobDTO: undefined
      },
      jobId: undefined,
      engineerArr: [],
      formChartArr: [],
      formEngineerArr: [],
      formStatusArr: [],
      formStandardArr: [],
      formWeightArr: [],
      formCompleteTimeArr: [],
      formParamArr: [],
      formRemarkArr: [],
      formDeviceArr: [],
      formPartArr: [],
      form_part: {
        customerId: undefined,
        projectId: undefined
      },
      child_form: {},
      loading: false,
      // option_part: {
      //   head: { title: '' },//头部
      //   button: [false, false, false],//按钮
      //   onbutton: false,//点击进入
      //   price: false,//价格
      //   column: [
      //     { label: '名称', value: 'equipment' },
      //     { label: '标准号', value: 'standard' },
      //     { label: '图号', value: 'chart' },
      //     { label: '数量', value: 'num', input: true },
      //     { label: '状态', value: 'status', input: true },
      //     { label: '完成时间', value: 'completeTime', input: true },
      //     { label: '参数', value: 'param' },
      //   ]
      // },
      option_part: {
        width: "100%",
        index: true,
        border: true,
        refreshBtn: false,
        page: false,
        header: false,
        align: "center",
        addBtn: false,
        menu: false,
        stripe: true,
        column: [
          { label: "名称", prop: "equipment" },
          { label: "标准号", prop: "standard" },
          { label: "图号", prop: "chart" },
          { label: "工程师", prop: "engineer" },
          { label: "数量", prop: "num" },
          { label: "状态", prop: "status" },
          { label: "完成时间", prop: "completeTime" },
          { label: "参数", prop: "param" }
        ]
      },
      option: {
        width: "50%",
        menuWidth: "180px",
        index: true,
        border: true,
        refreshBtn: false,
        page: true,
        header: false,
        align: "center",
        addBtn: false,
        delBtn: false,
        editBtn: false,
        // menuType: 'icon',
        // menu: false,
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
            formatter(row, value, label, column) {
              if (value === 0) {
                return "待设计";
              }
              if (value === 1) {
                return "设计中";
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
                return "全部暂停";
              }
              if (value === 12) {
                return "审核不通过";
              }
              if (value === 11) {
                return "审核通过";
              }
            }
          }
        ]
      }
    };
  },
  components: {
    table11,
    cselectConect2
  },
  created() {
    this.getSelect("mold");
    this.getSelect("flow");
    this.getSelect("response");
    this.getSelect("designjob");
  },
  computed: {},
  methods: {
    setNumData(id, val) {
      this.formPartArr.push({ id: id, val: val });
      console.log(this.formPartArr);
    },
    setDataFather(form) {
      //  this.$refs.cselectConect.validateChild()
      this.childform = form;
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      //     this.form_part.customerId = this.child_form.customerId
      //     this.form_part.projectId = this.child_form.projectId
      //   }
      // })
    },

    callFather(param) {
      this.page_part.currentPage = param.currentPage;
      this.onLoad(this.page_part);
    },

    getSelect(item) {
      if (item === "response") {
        getResponse().then(res => {
          this.searchItem[item].res = res.data.data;
        });
      }  else if (item === "designjob") {
         getListItem(item).then(res => {
          this.searchItem['progress'].res = res.data.data;
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
    searchFather(label, item) {
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
    searchInputFather(inputValue) {
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
    searchChange(params) {
      this.query = params;
      this.onLoad(this.page, params);
    },
    onLoad(page, params = {}) {
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
    addRow() {
      this.addFormVisible = true;
    },

    editRow(row, index) {
      this.$router.push({
        name: "任务单详情",
        path: "/produce/taskdetail",
        query: {
          id: row.id,
          projectId: row.projectId,
          jobCreateTime: row.createTime,
          payTime: row.payTime
        }
      });
    },
    delRow(row, index) {
      remove(row.id).then(res => {
        this.$message.success("删除成功！");
        this.onLoad(this.page_part);
      });
      // this.$message.success('暂未开放该功能！');
    },

    closeDialog() {
      this.addFormVisible = false;
    },
    addSubmitForm() {
      this.loading = true;
      if (this.childform.projectId) {
        createDesign(this.childform.projectId, this.childform.payTime)
          .then(res => {
            this.loading = false;
            var params = {};
            getList(
              this.page.currentPage,
              this.page.pageSize,
              Object.assign(params, this.query)
            ).then(res => {
              const data = res.data.data;
              this.page.total = data.total;
              this.data = data.records;
            });

            this.$message({
              message: "生成成功",
              type: "success"
            });
            this.addFormVisible = false;
          })
          .catch(err => {
            this.loading = false;
          });
      } else {
        this.$message.console.error("请选择客户|项目！");
      }
    },
    handleRowClick(row, event) {
      this.$router.push({
        name: "任务单详情",
        path: "/produce/taskdetail",
        query: {
          id: row.id,
          projectId: row.projectId,
          jobCreateTime: row.createTime,
          payTime: row.payTime
        }
      });
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
    margin-top: 20px;
    padding-top: 10px;

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
  font-size: 14px;
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
        font-size: 14px;
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
    font-size: 14px;
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