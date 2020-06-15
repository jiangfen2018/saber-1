<template>
  <div class="container">
    <searchStyle02 :data='searchInput'
                   @searchInputFather="searchInputFather"></searchStyle02>

    <div class="table-box">
      <div class="main-btn">
        <el-tag style="margin-right:20px">{{$route.query.deviceName}}</el-tag>
        <!-- <el-button type="primary" size='mini' icon="el-icon-plus" @click="goToSelectPart()">配件选择</el-button>
        <el-button type="primary" size='mini' icon="el-icon-plus" @click="goTo">配件新增</el-button> -->
      </div>
      <div class="list-box">
        <div class="list"
             v-for="item in data"
             :key="item.id">
          <div class="title">{{item.name}}</div>
          <div class="btn-wrapper">
            <div class="btn btn1"
                 @click="goToDetail(item)">配置</div>
            <div class="btn btn2"
                 @click="see(item)">查看</div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-wrapper">
      <span>第{{page.currentPage}}页/第{{page.pages}}页</span>
      <span @click="pageFirst">首页</span>
      <span @click="pagePre">上一页</span>
      <span @click="pageNext">下一页</span>
      <span @click="pageLast">尾页</span>
    </div>

    <el-dialog title="添加"
               :visible.sync="editFormVisible"
               width="500px">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="80px">
        <el-form-item label="设备"
                      prop="parent">
          <el-input size='mini'
                    v-model="$route.query.deviceName"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="单位"
                      prop="unit">
          <el-input size='mini'
                    v-model="form.unit"></el-input>
        </el-form-item>
        <el-form-item label="名称"
                      prop="name">
          <el-input size='mini'
                    v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="small"
                   @click="closeDialog()">取消</el-button>
        <el-button size="small"
                   type="primary"
                   @click="submitForm('form')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from "@/api/platform_device/typeconfig";
import { save } from "@/api/platform_device/typeconfig";
export default {
  data () {
    return {
      editFormVisible: false,
      form: {
        type: undefined,
        project: undefined,
        parent: undefined,
        parentId: undefined,
        name: undefined,
        unit: undefined,
        status: 0
      },
      rules: {
        unit: [{ required: true, message: '请输入单位', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      },
      searchInput: [{ name: '名称', value: '1', label: 'name', type: 'input' }],
      query: {
        name: undefined
      },
      page: {
        pageSize: 25,
        pages: 1,
        currentPage: 1,
        total: 0
      },
      isChild: undefined,
      data: [],
    };
  },
  computed: {},
  beforeRouteUpdate (to, from, next) {
    if (to.query.id) {
      this.query['a.typeId_equal'] = to.query.id
      this.form.typeId = to.query.id
      this.onLoad(this.page)

    }
    if (to.query.status) {
      this.form.status = to.query.status
    }
    if (to.query.parentId) {
      this.query['a.typeId_equal'] = to.query.parentId
      this.form.typeId = to.query.parentId
      this.onLoad(this.page)
    }
    next();
  },
  created () {
    if (this.$route.query.id) {
      this.query['a.typeId_equal'] = this.$route.query.id
      this.form.typeId = this.$route.query.id
      this.onLoad(this.page)
    }

    if (this.$route.query.status) {
      this.form.status = this.$route.query.status
    }
  },
  methods: {
    closeDialog () {
      this.editFormVisible = false;
    },
    submitForm (editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          this.rowSave(this.form)
        }
      })
    },
    selectFirstLevel () {
      if (this.$route.query.id) {
        this.query['a.typeId_equal'] = this.$route.query.id
        this.form.typeId = this.$route.query.id
        this.onLoad(this.page)
      }
    },
    selectSecondLevel () {
      if (this.$route.query.id) {
        this.query['a.typeId_equal'] = this.$route.query.id
        this.form.typeId = this.$route.query.id
        this.onLoad(this.page)
      }
    },

    rowSave (row) {
      save(row).then(() => {
        this.$message({ type: "success", message: "操作成功!" });
        this.closeDialog()
        this.onLoad(this.page)
      }, error => {
        console.log(error);
      });
    },
    goToSelectPart () {
      if (this.$route.query.id) {
        this.$router.push({
          name: '配件选择',
          path: '/device/selectpart',
          query: {
            id: this.$route.query.id,
            status: this.form.status,
            deviceName: this.$route.query.deviceName
          },
        })
      }

      if (this.$route.query.parentId) {
        this.$router.push({
          name: '配件选择',
          path: '/device/selectpart',
          query: {
            id: this.$route.query.parentId,
            status: this.form.status,
            deviceName: this.$route.query.deviceName
          },
        })
      }

    },
    searchInputFather (inputValue) {
      this.query['b.name'] = inputValue.name
      this.onLoad(this.page)
    },
    goToDetail (item) {
      console.log(item);
      this.$router.push({
        name: '配件配置列表',
        path: '/device/partpart',
        query: {
          parentId: item.id,
          deviceName: item.name
        },
        params: {
          info: item
        }
      })


      /*   this.query.name = undefined
        this.query.parentId = item.id
        this.isChild = item
        this.onLoad(this.page) */
    },
    see (item) {
      this.$router.push({
        name: '设备列表',
        path: '/device/devicedetail',
        query: {
          id: item.id,
          status: this.form.status,
          noModel: true,
          deviceName: this.$route.query.deviceName
        },
        params: {
          info: item
        }
      })
    },


    pagePre () {
      if (this.page.currentPage > 1) {
        this.page.currentPage--
        this.onLoad(this.page)
      }
    },
    pageNext () {
      if (this.page.currentPage < this.page.pages) {
        this.page.currentPage++
        this.onLoad(this.page)
      }
    },
    pageFirst () {
      this.page.currentPage = 1
      this.onLoad(this.page)
    },
    pageLast () {
      this.page.currentPage = this.page.pages
      this.onLoad(this.page)
    },
    goTo () {
      this.editFormVisible = true;
    },
    onLoad (page, params = {}) {

      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
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

  .table-box {
    width: 1250px;

    .main-btn {
      margin-top: 30px;
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
        background-color: #fff;
        padding: 15px 20px;
        width: 190px;
        margin: 10px;

        .title {
          color: #303133;
          font-size: 16px;
          text-align: center;
        }

        .btn-wrapper {
          display: flex;
          padding-top: 20px;
          justify-content: space-between;

          .btn {
            width: 60px;
            font-size: 14px;
            padding: 2px 0;
            border-radius: 4px;
            text-align: center;
            color: #fff;
            cursor: pointer;

            &.btn1 {
              background-color: #8693f3;
            }

            &.btn2 {
              background-color: #89c3f8;
            }
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
