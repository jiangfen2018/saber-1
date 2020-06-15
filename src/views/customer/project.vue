<template>
  <div class="container">
    <div class="list">
      <div class="item-name">筛选</div>
      <div class="item-list">
        <span class="item-box">
          <label>客戶</label>
          <el-input v-model="customerName" clearable class="my-input" size="mini"></el-input>
        </span>
        <span class="item-box" style="float:left">
          <label>项目</label>
          <el-input v-model="projectName" clearable class="my-input" size="mini"></el-input>
        </span>
        <span class="item-box" style="float:left">
          <label>时间</label>
          <el-date-picker
            v-model="createTime"
            class="my-input"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini" @change="changeTime"
          ></el-date-picker>
        </span>
        <span class="search-btn" @click="searchInputFather">查询</span>
      </div>
    </div>

    <searchStyle01 :data="searchItem.mold" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.area" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.flow" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.progress" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.response" @searchFather="searchFather" name="username"></searchStyle01>
    <div class="main">
      <cbutton title="新增项目" @clickButton="clickButton"></cbutton>
      <table04 :data="data" @goDetail="goDetail" @createDesign="createDesign"></table04>
      <cpagination v-bind:child-msg="page" @callFather="callFather"></cpagination>
    </div>
    <el-dialog title="新增" :visible.sync="editFormVisible" width="660px" height="830px">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <div class="form-inline">
          <div class="left">
            <el-form-item label="客户" prop="customerId">
              <el-select
                v-model="form.customerId"
                size="mini"
                style="width:365px;margin-bottom:-17px"
              >
                <el-option
                  v-for="item in selectDataCustomer"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="right"></div>
        </div>
        <div class="form-inline">
          <div class="left">
            <el-form-item label="项目" prop="projectName">
              <el-input size="mini" v-model="form.projectName" style="width:370px"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="left">
          <el-form-item label="类型" prop="type">
            <el-select v-model="form.type" size="mini" style="width:370px">
              <el-option
                v-for="item in selectDataType"
                :key="item.id"
                :label="item.dictValue"
                :value="item.dictKey"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="form-inline">
          <div class="left">
            <el-form-item label="机型" prop="model">
              <el-input size="mini" v-model="form.model" style="width:370px"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="right">
          <el-form-item label="铸机流数" prop="flow">
            <el-input size="mini" v-model="form.flow" style="width:370px"></el-input>
          </el-form-item>
        </div>
        <div class="form-inline">
          <div class="left">
            <el-form-item label="弧度半径" prop="radiusGyration">
              <el-input size="mini" v-model="form.radiusGyration" style="width:370px"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="right">
          <el-form-item label="浇筑钢种" prop="steelGrade">
            <el-input size="mini" v-model="form.steelGrade" style="width:370px"></el-input>
          </el-form-item>
        </div>
        <div class="form-inline">
          <div class="left">
            <el-form-item label="浇筑断面" prop="section">
              <el-input size="mini" v-model="form.section" style="width:370px"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="right">
          <el-form-item label="定尺长度" prop="fixed">
            <el-input size="mini" v-model="form.fixed" style="width:370px"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="描述" prop="remark">
          <el-input type="textarea" size="mini" v-model="form.remark" style="width:370px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button size="small" @click="closeDialog()">取消</el-button>
        <el-button size="small" :loading="loading" type="primary" @click="submitForm('form')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import table04 from "@/components/table04";
import searchStyle01 from "@/components/searchStyle01";
import { getListItem } from "@/api/system/dict";
import { getList, save, createDesign } from "@/api/platform_device/project";
import { getResponse, selectCustomerList } from "@/api/customer/customer";
export default {
  data() {
    return {
      data: [],
      page: {
        pageSize: 30,
        pages: 1,
        currentPage: 1
      },
      // searchInput: [
      //   {
      //   name: '客户',
      //   value: '1',
      //   label: 'customerName',
      //   type: 'input'
      // },
      //  {
      //   name: '项目',
      //   value: '2',
      //   label: 'projectName',
      //   type: 'input'
      // }, {
      //   name: '时间',
      //   value: '3',
      //   label: 'createTime',
      //   type: 'date'
      // }],
      query: {
        projectName: undefined,
        "b.customerName": undefined,
        "a.createTime": undefined,
        side: undefined,
        "a.type": undefined,
        flow: undefined,
        "a.createUser": undefined,
        progress: undefined
      },
      searchItem: {
        mold: {
          label: "类型",
          res: []
        },
        area: {
          label: "区域",
          res: []
        },
        flow: {
          label: "流数",
          res: []
        },
        response: {
          label: "负责人",
          res: []
        },
        progress: {
          label: "状态",
          res: []
        }
      },
      editFormVisible: false,
      rules: {
        customerId: [
          { required: true, message: "请选择类型", trigger: "blur" }
        ],
        projectName: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }]
        // remark: [{ required: true, message: '请输入描述', trigger: 'blur' }],
      },
      loading: false,
      form: {},
      selectDataType: [],
      selectDataCustomer: [],
      customerName: undefined,
      projectName: undefined,
      createTime: undefined
    };
  },
  components: {
    table04,
    searchStyle01
  },
  beforeRouteUpdate(to, from, next) {
    if (to.query.customerName) {
      this.customerName = to.query.customerName;
      this.query["b.customerName"] = this.customerName;
    }
    if (to.query.projectName) {
      this.projectName = to.query.projectName;
      this.query["projectName"] = to.query.projectName;
    }
    if (to.query.customerId) {
      this.form.customerId = to.query.customerId;
    }
    this.onLoad(this.page);
    this.getSelect("mold");
    this.getSelect("area");
    this.getSelect("flow");
    this.getSelect("progress");
    this.getSelect("response");
    selectCustomerList().then(res => {
      this.selectDataCustomer = res.data.data;
    });
  },
  created() {
    if (this.$route.query.customerName) {
      this.customerName = this.$route.query.customerName;
      this.query["b.customerName"] = this.customerName;
    }
    if (this.$route.query.customerId) {
      this.form.customerId = this.$route.query.customerId;
    }
    if (this.$route.query.projectName) {
      this.projectName = this.$route.query.projectName;
      this.query["projectName"] = this.$route.query.projectName;
    }

    this.onLoad(this.page);
    this.getSelect("mold");
    this.getSelect("area");
    this.getSelect("flow");
    this.getSelect("progress");
    this.getSelect("response");
    selectCustomerList().then(res => {
      this.selectDataCustomer = res.data.data;
    });
  },
  computed: {},
  methods: {
    goDetail(item) {
      this.$router.push({
        name: "项目详情",
        path: "/customer/projectDetail",
        query: {
          id: item.id
        }
      });
    },
    createDesign(item) {
      createDesign(item.id).then(res => {
        this.$message({
          message: "生成成功",
          type: "success"
        });
      });
    },
    clickButton() {
      this.editFormVisible = true;
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
      });
    },
    changeTime(value){
       if (value == null){
          this.query["a.createTime_datege"] = undefined
          this.query["a.createTime_datele"] = undefined
       }
    },
    callFather(parm) {
      this.page.currentPage = parm.currentPage;
      this.onLoad(this.page);
    },
    searchInputFather(inputValue) {
      this.query["b.customerName"] = this.customerName;
      this.query["projectName"] = this.projectName;
      if (this.createTime) {
        this.query["a.createTime_datege"] = this.createTime[0];
        this.query["a.createTime_datele"] = this.createTime[1].replace(
          "00:00:00",
          "24:60:60"
        );
      }
      this.onLoad(this.page);
    },
    searchFather(label, item) {
      switch (label) {
        case "区域":
          this.query["side"] = item.dictKey;
          break;
        case "类型":
          this.query["a.type"] = item.dictKey;
          break;
        case "流数":
          this.query["flow"] = item.dictKey;
          break;
        case "状态":
          this.query["progress"] = item.dictKey;
          break;
        case "负责人":
          this.query["b.chargeId_equal"] = item.id;
          break;
        default:
          break;
      }
      this.onLoad(this.page);
    },
    getSelect(item) {
      if (item === "response") {
        getResponse().then(res => {
          this.searchItem[item].res = res.data.data;
        });
      } else {
        getListItem(item).then(res => {
          if (item === "mold") {
            this.selectDataType = res.data.data;
            this.searchItem[item].res = res.data.data;
          } else {
            this.searchItem[item].res = res.data.data;
          }
        });
      }
    },
    closeDialog() {
      this.editFormVisible = false;
      this.loading = false;
    },
    submitForm(editData) {
      this.loading = false;
      this.$refs[editData].validate(valid => {
        if (valid) {
          this.loading = true;
          save(this.form).then(res => {
            this.loading = false;
            console.log(res);
            this.editFormVisible = false;
            this.onLoad(this.page);
          }).catch(err =>{
              this.loading = false;
          });
        }
      });
    }
  }
};
</script>

<style lang="stylus">
.el-select-dropdown__item {
  background-color: #fff !important;
  height: 46px;
  line-height: 27px;
}

.el-select-dropdown__wrap .el-scrollbar__wrap {
  margin-bottom: -5px !important;
}
</style>
<style  lang="stylus" scoped>
.container {
  margin: 20px 40px;
  width: auto;

  .list .item-name {
    font-size: 0.07rem;
  }

  .list .item-list .item-box label {
    font-size: 0.07rem;
  }

  .el-range-editor.el-input__inner {
    height: 28px;
  }

  .el-date-editor {
    // top: 2px;
  }

  .main {
    margin-top: 20px;
  }

  .form-inline {
    display: flex;

    .right, .left {
      flex: 1;
    }
  }
}

.list {
  border-bottom: 1px dashed #DCDFE6;
  padding: 10px 0;
  display: flex;
  align-items: center;
  font-size: 0.07rem;

  .item-name {
    width: 80px;
    color: #303133;

    &:after {
      content: ':';
      margin-left: 4px;
    }
  }

  .item-list {
    display: flex;

    .my-input {
      width: auto;
      margin-left: 10px;
    }

    .type {
      margin-right: 20px;
      cursor: pointer;
    }

    .item-box {
      label {
        color: #606266;

        &:after {
          content: ':';
          margin-left: 4px;
        }
      }

      &:nth-child(n+2) {
        margin-left: 20px;
      }
    }

    .search-btn {
      background-color: #8693f3;
      padding: 2px 22px;
      border-radius: 4px;
      color: #fff;
      margin-left: 20px;
      cursor: pointer;
      position: relative;
      top: 2px;
      height: 16px !important;
      line-height: 15px;
    }
  }
}
</style>
