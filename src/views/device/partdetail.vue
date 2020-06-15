<template>
  <div class="container">

    <searchStyle02 :data='searchInput' @searchInputFather="searchInputFather"></searchStyle02>

    <div class="table-box">
      <div class="main-btn">
        <el-tag style="margin-right:20px">{{$route.query.deviceName}}</el-tag>
        <!-- <el-button type="primary" size="mini" icon="el-icon-plus" circle @click="goTo"></el-button> -->
      </div>
      <!--   <div class="main-btn">
        <div class="add" @click="goTo">添加配件</div>
      </div> -->
      <div class="list-box">
        <div class="list" v-for="item in data" :key="item.id">
          <div class="detail">
            <p><label>名称</label><span>{{item.standard}}</span></p>
            <p><label>标准号</label><span>{{item.standard}}</span></p>
            <p><label>图号</label><span>{{item.chart}}</span></p>
            <p><label>重量（吨）</label><span>{{item.weight}}</span></p>
            <p><label>参数</label><span>{{item.param}}</span></p>
            <p class="price">{{item.price}}</p>
          </div>
          <div class="btn-wrapper">
            <div class="btn btn1">配置</div>
            <div class="btn btn2">价格</div>
            <div class="btn btn3" @click="goToDeviceDetail2(item)">查看</div>
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

    <!-- 添加设备 -->
    <el-dialog title="添加" :visible.sync="editFormVisible" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备" prop="parent">
          <el-input size='mini' v-model="$route.query.deviceName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="配件" prop="configId">
          <el-select size='mini' style="width:100%" v-model="form.configId" placeholder="请选择配件">
            <el-option v-for="item in selectData_Part" :key="item.id" :label="item.dictValue" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="型号" prop="typeId">
          <el-select size='mini' style="width:100%" v-model="form.typeId" placeholder="请选择型号">
            <el-option v-for="item in selectData_Xh" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标准号" prop="standard">
          <el-input size='mini' v-model="form.standard"></el-input>
        </el-form-item>
        <el-form-item label="图号" prop="chart">
          <el-input size='mini' v-model="form.chart"></el-input>
        </el-form-item>
        <el-form-item label="重量" prop="weight">
          <el-input size='mini' v-model="form.weight"></el-input>
        </el-form-item>
        <el-form-item label="参数" prop="param">
          <el-input size='mini' v-model="form.param"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog()">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm('form')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { save, getList as getList2 } from "@/api/platform_device/devicesequence";
import { getListItem } from "@/api/system/dict";
import { selectList } from "@/api/platform_device/devicetype";
export default {
  data() {
    return {
      selectData_Part: [],
      selectData_Xh: [],
      rules: {
        configId: [{ required: true, message: '请选择配件', trigger: 'change' }],
        typeId: [{ required: true, message: '请选择型号', trigger: 'change' }],
        standard: [{ required: true, message: '请输入标准号', trigger: 'blur' }],
        chart: [{ required: true, message: '请输入图号', trigger: 'blur' }],
        weight: [{ required: true, message: '请输入重量', trigger: 'blur' }],
        param: [{ required: true, message: '请输入参数', trigger: 'blur' }],
      },
      editFormVisible: false,
      form: {
        parent: undefined,
        standard: undefined,
        chart: undefined,
        weight: undefined,
        param: undefined,
        parentId: undefined,
        status: 0,//设备0 配件1
      },
      searchInput: [
        { name: '名称', value: '1', label: 'name', type: 'input' },
        { name: '标准号', value: '2', label: 'standard', type: 'input' },
        { name: '图号', value: '3', label: 'chart', type: 'input' },
      ],
      query: {
        name: undefined
      },
      page: {
        pageSize: 25,
        pages: 1,
        currentPage: 1,
        total: 0
      },
      data: [],
      selectData: undefined
    };
  },
  computed: {},
  created() {
    this.getSelect('class')
    if (this.$route.query.parentId) {
      selectList(this.$route.query.parentId).then(res => {
        this.selectData_Xh = res.data.data
      })
      this.form.parentId = this.$route.query.itemId
      this.query['a.parentId'] = this.$route.query.itemId
      this.onLoad(this.page)
    }
  },
  methods: {
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          this.rowSave(this.form)
        }
      })
    },
    rowSave(row) {
      save(row).then(() => {
        this.$message({ type: "success", message: "操作成功!" });
        this.onLoad(this.page)
        this.closeDialog()
      }, error => {
        console.log(error);
      });
    },
    closeDialog() {
      this.editFormVisible = false;
    },
    getSelect(item) {
      getListItem(item).then(res => {
        this.selectData_Part = res.data.data
      });
    },
    searchInputFather(inputValue) {
      this.query['name'] = inputValue.name
      this.query['standard'] = inputValue.standard
      this.query['chart'] = inputValue.chart
      this.onLoad(this.page)
    },
    goToDeviceDetail2(item) {
      this.$router.push({
        name: '设备详情2',
        path: '/device/devicedetail2',
        params: {
          info: item
        }
      })
    },
    addxh() {
      this.$router.push({
        name: '型号添加',
        path: '/device/addxh',
        params: {
          info: this.$route.params.parentInfo
        }
      })
    },
    see() {
      this.$router.push({
        path: '/device/classsee',
      })
    },
    searchClass(id) {
      this.query.type_equal = id
      this.page.currentPage = 1
      this.onLoad(this.page)
    },
    pagePre() {
      if (this.page.currentPage > 1) {
        this.page.currentPage--
        this.onLoad(this.page)
      }
    },
    pageNext() {
      if (this.page.currentPage < this.page.pages) {
        this.page.currentPage++
        this.onLoad(this.page)
      }

    },
    pageFirst() {
      this.page.currentPage = 1
      this.onLoad(this.page)
    },
    pageLast() {
      this.page.currentPage = this.page.pages
      this.onLoad(this.page)
    },
    goTo() {
      this.editFormVisible = true
    },
    onLoad(page, params = {}) {
      getList2(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.page.total = data.pages;
        this.data = data.records;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.container
  margin: 20px 40px
  width: auto
  .filter-box
    font-size: 14px
    .list
      border-bottom: 1px dashed #DCDFE6
      padding: 10px 0
      display: flex
      .item-name
        width: 80px
        color: #909399
        &:after
          content: ':'
          margin-left: 4px
      .item-list
        margin-right: 10px
        .add
          display: inline-block
          width: 27px
          height: 27px
          background: url('../../assets/img/more.png') no-repeat
          vertical-align: middle
          cursor: pointer
        .type
          margin-right: 20px
          cursor: pointer
        label
          color: #909399
          &:after
            content: ':'
            margin-left: 4px
        input
          background: none
          border: 1px solid #C0C4CC
          margin-left: 10px
          width: 200px
        .search-btn
          background-color: #8693f3
          padding: 2px 18px
          border-radius: 4px
          color: #fff
          margin-left: 20px
          cursor: pointer
  .table-box
    width: 1250px
    .main-btn
      margin-top: 30px
      margin-right: 10px
      font-size: 16px
      color: #89c3f8
      .add
        display: inline-block
        background: url('../../assets/img/tianjia.png') no-repeat
        background-position: right 50%
        padding-right: 35px
        height: 27px
        line-height: 27px
        cursor: pointer
    .list-box
      display: flex
      flex-flow: wrap
      .list
        width: 292px
        margin: 10px 10px 20px 10px
        .detail
          color: #303133
          margin: 0 auto
          background-color: #fff
          font-size: 14px
          padding: 20px 30px 10px 30px
          p
            color: #909399
            margin: 12px 0
            label
              display: inline-block
              color: #303133
              width: 90px
              text-align-last: justify
              &:after
                content: ':'
                padding-right: 15px
          .price
            font-size: 20px
            color: #E6A23C
            &:before
              padding-right: 10px
              content: '¥'
        .btn-wrapper
          display: flex
          margin: 20px 20px 5px 20px
          justify-content: space-between
          .btn
            width: 60px
            font-size: 14px
            padding: 2px 0
            border-radius: 4px
            text-align: center
            cursor: pointer
            background-color: #DCDFE6
  .page-wrapper
    margin-top: 30px
    font-size: 14px
    text-align: center
    width: 1250px
    span
      margin: 0 5px
      color: #909399
      &:nth-child(n+2)
        cursor: pointer
</style>
