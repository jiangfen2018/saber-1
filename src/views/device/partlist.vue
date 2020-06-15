<template>
  <div class="container">
    <div class="filter-box">
      <searchStyle02 :data="searchInput" @searchInputFather="searchInputFather"></searchStyle02>
      <!-- <searchStyle01 :data='searchItem.class' btnlist='add' @add='addxh' @searchFather="searchFather" name='name'></searchStyle01> -->
    </div>

    <div class="table-box">
      <div class="main-btn">
        <el-tag style="margin-right:20px">{{$route.query.deviceName}}</el-tag>
        <el-button type="primary" size="mini" icon="el-icon-plus" circle @click="goTo"></el-button>
      </div>

      <div class="list-box">
        <div class="list" v-for="item in data" :key="item.id">
          <div class="detail">
            <p>
              <label>规格</label>
              <span>{{item.standards}}</span>
            </p>
            <p>
              <label>标准号</label>
              <span>{{item.standard}}</span>
            </p>
            <p>
              <label>图号</label>
              <span>{{item.chart}}</span>
            </p>
            <p>
              <label>重量/吨</label>
              <span>{{item.weight}}</span>
            </p>
            <p>
              <label>参数</label>
              <span>{{item.param}}</span>
            </p>
            <p class="price">{{item.price}}</p>
          </div>
          <div class="btn-wrapper">
            <div class="btn btn1" @click="goToPartDetail(item)">配置</div>
            <div class="btn btn2" @click="goToPrice(item)">价格</div>
            <div class="btn btn3" @click="goToDeviceDetail2(item)">查看</div>
          </div>
        </div>
      </div>
    </div>

    <cpagination v-bind:child-msg="page" @callFather="callFather"></cpagination>

    <!-- 添加型号 -->
    <el-dialog title="新增" :visible.sync="editFormVisible" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备" prop="customerName">
          <el-input size="mini" v-model="form.parent" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input size="mini" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input size="mini" v-model="form.unit"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog()">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('form')">保存</el-button>
      </div>
    </el-dialog>

    <!-- 添加设备 -->
    <el-dialog title="新增" :visible.sync="editFormVisible_Device" width="500px">
      <el-form ref="form_Device" :model="form_Device" :rules="rules_Device" label-width="80px">
        <el-form-item label="配件" prop="parent">
          <el-input size="mini" v-model="$route.query.deviceName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="standards">
          <el-input size="mini" v-model="form_Device.standards"></el-input>
        </el-form-item>
        <el-form-item label="标准号" prop="standard">
          <el-input size="mini" v-model="form_Device.standard"></el-input>
        </el-form-item>
        <el-form-item label="图号" prop="chart">
          <el-input size="mini" v-model="form_Device.chart"></el-input>
        </el-form-item>
        <el-form-item label="重量/吨" prop="weight">
          <el-input size="mini" v-model="form_Device.weight"></el-input>
        </el-form-item>
        <el-form-item label="参数" prop="param">
          <el-input size="mini" v-model="form_Device.param"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog()">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm_Device('form_Device')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList as getList1 } from "@/api/platform_device/devicetype";
import { getList as getList2 } from "@/api/platform_device/devicesequence";
import { add } from "@/api/platform_device/devicetype";
import { save } from "@/api/platform_device/devicesequence";
export default {
  data() {
    return {
      rules: {
        unit: [{ required: true, message: "请输入单位", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      rules_Device: {
        typeId: [{ required: true, message: "请选择型号", trigger: "change" }],
        standard: [
          { required: true, message: "请输入标准号", trigger: "blur" }
        ],
        standards: [{ required: true, message: "请输入规格", trigger: "blur" }],
        chart: [{ required: true, message: "请输入图号", trigger: "blur" }],
        weight: [{ required: true, message: "请输入重量", trigger: "blur" }],
        param: [{ required: true, message: "请输入参数", trigger: "blur" }]
      },
      form: {
        type: undefined,
        project: undefined,
        parent: undefined,
        parentId: undefined,
        name: undefined,
        unit: undefined,
        // typeId: this.$route.query.typeId,
        status: 0
      },
      form_Device: {
        parent: undefined,
        standard: undefined,
        chart: undefined,
        weight: undefined,
        param: undefined,
        parentId: undefined,
        status: 0, //设备0 配件1
        typeId: this.$route.query.typeId,
        configId: this.$route.query.id
      },
      editFormVisible: false,
      editFormVisible_Device: false,
      searchInput: [
        { name: "客户", value: "1", label: "name", type: "input" },
        { name: "标准号", value: "2", label: "standard", type: "input" },
        { name: "图号", value: "3", label: "chart", type: "input" }
      ],
      query: {
        name: undefined
      },
      queryClass: {
        name: undefined
      },
      page: {
        pageSize: 20,
        pages: 1,
        currentPage: 1
      },
      data: [],
      searchItem: {
        class: { label: "类别", res: [] }
      }
    };
  },
  computed: {},
  beforeRouteUpdate(to, from, next) {
    if (to.query.id) {
      this.query["a.configId"] = to.query.id;
      this.onLoad(this.page);
      this.onLoadClass({ pageSize: 100 }, { parentId: to.query.id });
    }
    if (to.query.status) {
      this.form.status = to.query.status;
      this.form_Device.status = to.query.status;
    }
    next();
  },

  created() {
    if (this.$route.query.id) {
      this.query["a.configId"] = this.$route.query.id;
      this.onLoad(this.page);
      this.onLoadClass({ pageSize: 100 }, { parentId: this.$route.query.id });
    }
    if (this.$route.query.status) {
      this.form.status = this.$route.query.status;
      this.form_Device.status = this.$route.query.status;
    }
  },
  methods: {
    goToPrice(item) {
      this.$router.push({
        name: "设备价格",
        path: "/device/deviceprice",
        query: {
          id: item.id
        }
        // params: {
        //   item: item
        // }
      });
    },
    rowSave_Device(row) {
      save(row).then(
        () => {
          this.$message({ type: "success", message: "操作成功!" });
          this.onLoad(this.page);
          this.editFormVisible_Device = false;
        },
        error => {
          console.log(error);
        }
      );
    },
    /*     rowSaveAdd(row) {
          add(row).then(() => {
            this.$message({ type: "success", message: "操作成功!" });
            this.editFormVisible = false
            if (this.$route.query.id) {
              this.onLoadClass({ pageSize: 100 }, { parentId: this.$route.query.id })
            }
          }, error => {
            console.log(error);
          });
        }, */
    submitForm_Device(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          this.rowSave_Device(this.form_Device);
        }
      });
    },
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          this.rowSave(this.form);
        }
      });
    },
    rowSave(row) {
      add(row).then(
        () => {
          this.onLoadClass(
            { pageSize: 100 },
            { parentId: this.$route.query.id }
          );
          this.$message({ type: "success", message: "操作成功!" });
        },
        error => {
          console.log(error);
        }
      );
    },
    closeDialog() {
      this.editFormVisible = false;
      this.editFormVisible_Device = false;
    },
    searchInputFather(inputValue) {
      this.query["f.customerName"] = inputValue.name;
      this.query["chart"] = inputValue.chart;
      this.query["standard"] = inputValue.standard;
      this.onLoad(this.page);
    },
    searchFather(label, item) {
      switch (label) {
        case "类别":
          this.query["typeId"] = item === -1 ? undefined : item.id;
          break;
        default:
          break;
      }
      this.onLoad(this.page);
    },
    goToPartDetail(item) {
      this.$router.push({
        name: "配件信息配置",
        path: "/device/partconfig2",
        query: {
          itemId: item.id,
          parentId: this.$route.query.id,
          deviceName: this.$route.query.deviceName
        }
      });
      /*    this.$router.push({
           name: '配件配置',
           path: '/device/partdetail',
           query: {
             parentId: this.$route.query.id,
             itemId: item.id,
             deviceName: this.$route.query.deviceName,
           }
         }) */
    },
    goToDeviceDetail2(item) {
      this.$router.push({
        name: "设备详情",
        path: "/device/devicedetail2",
        query: {
          id: item.id
        }
      });
    },
    onLoadClass(page, params = {}) {
      getList1(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.queryClass)
      ).then(res => {
        this.searchItem.class.res = res.data.data.records;
      });
    },
    addxh() {
      this.editFormVisible = true;
      if (this.$route.query.id) {
        this.form.parent = this.$route.query.deviceName;
        this.form.parentId = this.$route.query.id;
        this.form.project = this.$route.query.project; /* 多跟两个参数project，type */
        this.form.type = this.$route.query.type;
      }
    },
    see() {
      this.$router.push({
        path: "/device/classsee"
      });
    },
    callFather(parm) {
      this.page.currentPage = parm.currentPage;
      this.onLoad(this.page);
    },
    goTo() {
      this.editFormVisible_Device = true;
    },
    onLoad(page, params = {}) {
      getList2(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.data = data.records;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.container {
  margin: 20px 40px;
  width: auto;

  .filter-box {
    font-size: 14px;

    .list {
      border-bottom: 1px dashed #DCDFE6;
      padding: 10px 0;
      display: flex;

      .item-name {
        width: 80px;
        color: #909399;

        &:after {
          content: ':';
          margin-left: 4px;
        }
      }

      .item-list {
        margin-right: 10px;

        .add {
          display: inline-block;
          width: 27px;
          height: 27px;
          background: url('../../assets/img/more.png') no-repeat;
          vertical-align: middle;
          cursor: pointer;
        }

        .type {
          margin-right: 20px;
          cursor: pointer;
        }

        label {
          color: #909399;

          &:after {
            content: ':';
            margin-left: 4px;
          }
        }

        input {
          background: none;
          border: 1px solid #C0C4CC;
          margin-left: 10px;
          width: 200px;
        }

        .search-btn {
          background-color: #8693f3;
          padding: 2px 18px;
          border-radius: 4px;
          color: #fff;
          margin-left: 20px;
          cursor: pointer;
        }
      }
    }
  }

  .table-box {
    .main-btn {
      margin-top: 20px;
      margin-right: 10px;
      font-size: 16px;
      color: #89c3f8;

      .add {
        display: inline-block;
        background: url('../../assets/img/tianjia.png') no-repeat;
        background-position: right 50%;
        padding-right: 35px;
        height: 27px;
        line-height: 27px;
        cursor: pointer;
      }
    }

    .list-box {
      display: flex;
      flex-flow: wrap;

      .list {
        width: 292px;
        margin: 10px 10px 20px 10px;

        .detail {
          color: #303133;
          margin: 0 auto;
          background-color: #fff;
          font-size: 14px;
          padding: 20px 30px 10px 30px;

          p {
            color: #909399;
            margin: 12px 0;

            label {
              display: inline-block;
              color: #303133;
              width: 90px;
              text-align-last: justify;

              &:after {
                content: ':';
                padding-right: 15px;
              }
            }
          }

          .price {
            font-size: 20px;
            color: #E6A23C;

            &:before {
              padding-right: 10px;
              content: '¥';
            }
          }
        }

        .btn-wrapper {
          display: flex;
          margin: 20px 20px 5px 20px;
          justify-content: space-between;

          .btn {
            width: 60px;
            font-size: 14px;
            padding: 2px 0;
            border-radius: 4px;
            text-align: center;
            cursor: pointer;
            background-color: #DCDFE6;
          }
        }
      }
    }
  }

  .page-wrapper {
    margin-top: 30px;
    font-size: 14px;
    text-align: center;
    width: 1250px;

    span {
      margin: 0 5px;
      color: #909399;

      &:nth-child(n+2) {
        cursor: pointer;
      }
    }
  }
}
</style>
