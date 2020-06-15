<template>
  <div class="container">
    <!-- <searchStyle02 :data='searchInput'
    @searchInputFather="searchInputFather"></searchStyle02>-->

    <div class="list">
      <div class="item-name">筛选</div>
      <div class="item-list">
        <span class="item-box">
          <label>客戶</label>
          <el-input v-model="customerName" clearable class="my-input" size="mini"></el-input>
        </span>
        <span class="item-box" style="float:left;margin-left: 20px">
          <label>时间</label>
          <el-date-picker
            v-model="createTime"
            class="my-input"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至" @change="changeTime"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          ></el-date-picker>
        </span>
        <span class="search-btn" @click="searchInputFather">查询</span>
      </div>
    </div>

    <searchStyle01 :data="searchItem.area" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.response" @searchFather="searchFather" name="username"></searchStyle01>

    <div class="main">
      <cbutton title="新增客户" @clickButton="clickButton"></cbutton>
      <table03 :data="data" @goToProject="goToProject"></table03>
      <cpagination v-bind:child-msg="page" @callFather="callFather"></cpagination>
    </div>

    <el-dialog title="新增" :visible.sync="editFormVisible" width="660px" height="830px">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <div class="form-inline">
          <div>
            <el-form-item label="客户名称" prop="customerName">
              <el-input size="mini" v-model="form.customerName" style="width:450px" maxlength="40"></el-input>
            </el-form-item>
            <el-form-item label="客户联系人" prop="contacts">
              <el-input size="mini" v-model="form.contacts" style="width:450px" maxlength="20"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="form-inline">
          <div>
            <el-form-item label="客户电话" prop="phone">
              <el-input size="mini" v-model="form.phone" style="width:450px" maxlength="12"></el-input>
            </el-form-item>
          </div>
        </div>

      <el-form-item label="营销负责人" prop="chargeId">
          <!-- <el-row> -->
          <el-select
            v-model="form.chargeId"
            placeholder="请选择"
            size="mini"
            style="width:450px"
          >
            <el-option
              v-for="item in chargeList"
              :key="item.id"
              :label="item.realName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="客户所在地址" prop="side">
          <!-- <el-row> -->
          <el-select
            v-model="form.side"
            @change="areaChange"
            placeholder="请选择"
            size="mini"
            style="width:450px"
          >
            <el-option
              v-for="item in searchItem.area.res"
              :key="item.id"
              :label="item.dictValue"
              :value="item.dictKey"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="sideDetail">
          <el-cascader
            v-if="form.side!=3"
            :key="form.side"
            :options="options"
            v-model="form.sideDetail"
            size="mini"
            style="width:450px"
          ></el-cascader>
        </el-form-item>

        <el-form-item prop="area">
          <el-input
            v-if="form.side==3"
            placeholder="请输入内容"
            size="mini"
            v-model="form.area"
            maxlength="100"
            style="width:450px"
          ></el-input>
        </el-form-item>

        <!-- </el-row> -->

        <el-form-item label="详细地址" prop="address">
          <el-input size="mini" v-model="form.address" style="width:450px" maxlength="100"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="remark">
          <el-input type="textarea" size="mini" v-model="form.remark" style="width:450px"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="fileName">
          <el-upload
            ref="upload1"
            action
            :http-request="handleFile"
            :on-change="key_path_file"
            :multiple="false"
            :limit="1"
            :file-list="form.fileName"
            :before-upload = "beforeAvatarUpload"
            accept=".jpg, .png"
          >
            <el-button size="small" type="primary" @click="clearUploadedImage('upload1')">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传.jpg,.png文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button size="small" @click="closeDialog()">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" @click="submitForm('form')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import searchStyle01 from "@/components/searchStyle01";
import searchStyle02 from "@/components/searchStyle02";
import table03 from "@/components/table03";
import { getListItem } from "@/api/system/dict";
import { getResponse, getList, save, areaList,selectSaleList } from "@/api/customer/customer";
export default {
  data() {
    return {
      rules: {
        customerName: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        contacts: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入电话", trigger: "blur" }],
        chargeId: [{ required: true, message: "请输入负责人", trigger: "blur" }],
        side: [
          {
            required: true,
            message: "请选择客户所在地址区域",
            trigger: "change"
          }
        ],
        sideDetail: [
          {
            required: true,
            message: "请选择客户所在地址",
            trigger: "change"
          }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        remark: [{ required: false, message: "请输入描述", trigger: "blur" }]
        // fileName: [{ required: true, message: '请选择图片', trigger: 'blur' }],
      },
      form: { sideDetail: [] },
      customerName: undefined,
      createTime: undefined,
      editFormVisible: false,
      query: {
        side_equal: undefined,
        "a.createUser_equal": undefined,
        customerName: undefined
      },
      page: {
        pageSize: 5,
        pages: 1,
        currentPage: 1
      },
      data: [],
      searchItem: {
        area: {
          label: "区域",
          res: []
        },
        sideDetail: { res: [] },
        response: {
          label: "负责人",
          res: []
        }
      },
      chargeList:[],
      options: [
        {
          value: "province",
          label: "省级",
          children: [
            {
              value: "city",
              label: "市级"
            }
          ]
        }
      ],
      optionProps: {
        label: "province",
        value: "value",
        children: "city"
      },
      loading: false

      // searchInput: [{
      //   name: '名称',
      //   value: '',
      //   label: 'customerName',
      //   type: 'input'
      // }, {
      //   name: '时间',
      //   value: '',
      //   label: 'createTime',
      //   type: 'date'
      // }],
    };
  },
  components: {
    table03,
    searchStyle01,
    searchStyle02
  },
  created() {
    if (this.$route.query.customerName) {
      this.query["customerName"] = this.$route.query.customerName;
      this.customerName = this.$route.query.customerName;
    }
    this.onLoad(this.page);
    this.getSelect("area");
    this.getSelect("response");
    this.getSelect("sale");
  },
  computed: {},
  beforeRouteUpdate(to, from, next) {
    this.customerName = to.query.customerName;
    this.searchInputFather();
    next();
  },
  methods: {
    beforeAvatarUpload:function(file){
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isPG = (isJPG || isPNG)                                       //限制图片格式为jpg / png
      const isLt2M = file.size / 1024 / 1024 < 2;                         //限制图片大小
      // const isLt2M = file.size / 500 < 2;     
      if (!isPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
      }
        return isPG && isLt2M  
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
          let formData = new FormData();
          formData.append("customerName", this.form.customerName);
          formData.append("contacts", this.form.contacts);
          formData.append("phone", this.form.phone);
          if (this.form.area != undefined) {
            formData.append("area", this.form.area);
          }

          formData.append("side", this.form.side);
           formData.append("chargeId", this.form.chargeId);
          formData.append("sideDetail", this.form.sideDetail[0]);
          if (this.form.sideDetail.length == 2) {
            if (this.form.sideDetail[1] != undefined)
              formData.append("sideDetail2", this.form.sideDetail[1]);
          }

          formData.append("address", this.form.address);
          if(this.form.remark){
               formData.append("remark", this.form.remark);  
          }
    
          if (this.form.fileName) {
            formData.append(
              "fileName",
              this.form.fileName[0] ? this.form.fileName[0].raw : ""
            );
          }
          save(formData).then(res => {
            this.loading = false;
            this.editFormVisible = false;
            this.form = {};
            this.onLoad(this.page);
          }).catch(err =>{
              this.loading = false;
          });
        }
      });
    },
    handleFile() {},
    goToProject(item) {
      this.$router.push({
        name: "项目列表",
        path: "/customer/project",
        params: {
          customerName: item.customerName,
          customerId: item.id
        },
        query: {
          customerName: item.customerName,
          customerId: item.id
        }
      });
    },
    clearUploadedImage() {
      this.$refs.upload1.clearFiles();
      this.form.fileName = [];
    },
    key_path_file(file, fileList) {
      this.form.fileName = fileList;
    },
    clickButton() {
      this.editFormVisible = true;
    },
    callFather(parm) {
      this.page.currentPage = parm.currentPage;
      this.onLoad(this.page);
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
    getSelect(item) {
      if (item === "response") {
        getResponse().then(res => {
          this.searchItem[item].res = res.data.data;
        });
      } else if(item === "sale"){
        selectSaleList('sale').then(res=>{
          this.chargeList = res.data.data
        })
      }else {
        getListItem("area").then(res => {
          this.searchItem[item].res = res.data.data;
        });
      }
    },
    areaChange(value) {
      this.form.sideDetail = undefined;
      areaList(value).then(res => {
        this.options = res.data.data;
      });
    },
    searchFather(label, item) {
      switch (label) {
        case "区域":
          this.query["side_equal"] = item.dictKey;
          break;
        case "负责人":
          this.query["a.chargeId_equal"] = item.id;
          break;
        default:
          break;
      }
      this.onLoad(this.page);
    },
     changeTime(value){
       if (value == null){
          this.query["a.createTime_datege"] = undefined
          this.query["a.createTime_datele"] = undefined
       }
    },
    searchInputFather(inputValue) {
      // console.log(this.createTime);

      this.query["customerName"] = this.customerName;
      if (this.createTime) {
        this.query["a.createTime_datege"] = this.createTime[0];
        this.query["a.createTime_datele"] = this.createTime[1].replace(
          "00:00:00",
          "24:60:60"
        );
      }
      this.onLoad(this.page);
    }
  }
}
</script>

<style lang="stylus">
.c-box .normal.add {
  background-size: 85% 85% !important;
}

.el-select-dropdown__item {
  height: 46px;
  line-height: 27px;
}

.el-select-dropdown__wrap .el-scrollbar__wrap {
  margin-bottom: -5px !important;
}
</style>
<style  lang="stylus" scoped>
.container .el-date-editor {
  top: 0px !important;
}

.container {
  margin: 20px 40px;
  width: auto;

  .el-input--mini .el-input__inner {
    width: 216px;
  }

  .list .item-name {
    font-size: 0.07rem;
  }

  .list .item-list .item-box label {
    font-size: 0.07rem;
    line-height: 32px;
  }

  .el-input--mini .el-input__inner {
    width: 200px;
  }

  .item-box {
    margin-left: 0px !important;

    &:nth-of-type(1) {
      margin-left: 20px !important;
    }
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

  .item-name {
    width: 80px;
    color: #303133;

    &:after {
      content: ':';
      margin-left: 4px;
    }
  }

  .item-list {
    flex: 1;

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
    }
  }
}
</style>


