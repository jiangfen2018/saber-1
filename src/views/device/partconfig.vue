<template>
  <div class="container">
    <div class="main">
      <table07 :data='data_head'
               :option='option_head'></table07>
      <cline></cline>
      <ctabs @onTabs='onTabs'
             :option="option_tab"
             :isDialogBtn='true'
             @openAdd='openAdd'></ctabs>
      <table07 :data='data'
               :option='option'
               @onClickConfig='onClickConfig'
               @onClickSee='onClickSee'
               @onClickPrice='onClickPrice'></table07>
      <cpagination v-bind:child-msg="page"
                   @callFather='callFather'></cpagination>

      <el-dialog title=""
                 :visible.sync="editFormVisible"
                 width="30%">
        <div style="text-align:center;padding:30px">
          <el-button type="primary"
                     @click="goToSelectPart()">选&nbsp;&nbsp;&nbsp;&nbsp;择</el-button>
          <el-button type="primary"
                     @click="editFormVisible_Add=true">新&nbsp;&nbsp;&nbsp;&nbsp;增</el-button>
        </div>
      </el-dialog>
      <el-dialog title="配件新增"
                 :visible.sync="editFormVisible_Add"
                 width="30%">
        <el-form ref="form"
                 :model="form"
                 :rules="rules"
                 label-width="80px">
          <el-form-item label="设备"
                        prop="typeId">
            <el-input size='mini'
                      v-model="$route.query.deviceName"
                      :disabled="true"></el-input>
          </el-form-item>
          <!-- <el-form-item label="型号" prop="typeId">
            <el-select size='mini' style="width:100%" v-model="form.typeId" placeholder="请选择型号">
              <el-option v-for="item in searchItem.class.res" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="配件"
                        prop="configId">
            <el-select size='mini'
                       style="width:100%"
                       v-model="form.configId"
                       placeholder="请选择配件">
              <el-option v-for="item in partSelectData"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格"
                        prop="standards">
            <el-input size="mini"
                      v-model="form.standards"></el-input>
          </el-form-item>
          <el-form-item label="图号"
                        prop="chart">
            <el-input size='mini'
                      v-model="form.chart"></el-input>
          </el-form-item>
          <el-form-item label="标准号"
                        prop="standard">
            <el-input size='mini'
                      v-model="form.standard"></el-input>
          </el-form-item>
          <el-form-item label="重量"
                        prop="weight">
            <el-input size='mini'
                      v-model="form.weight"></el-input>
          </el-form-item>
          <el-form-item label="参数"
                        prop="param">
            <el-input size='mini'
                      v-model="form.param"></el-input>
          </el-form-item>
          <el-form-item label="数量"
                        prop="num">
            <el-input size='mini'
                      v-model="form.num"></el-input>
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
      <!-- <cbutton title='添加配置' @clickButton='clickButton'></cbutton>-->
    </div>
  </div>
</template>

<script>
import table07 from '@/components/table07'
import { getDetail, getPartList, save } from "@/api/platform_device/devicesequence";
import { getListItem } from "@/api/system/dict";
import { selectList2, getList as getList1 } from "@/api/platform_device/devicetype";
import { getList as getList2 } from "@/api/platform_device/typeconfig";
/* import searchStyle02 from '@/components/searchStyle02'
*/
export default {
  data () {
    return {
      partSelectData: [],
      searchItem: {
        class: { label: '类别', res: [] },
      },
      rules: {
        configId: [{ required: true, message: '请选择配件', trigger: 'change' }],
        standards: [
          { required: true, message: "请输入规格", trigger: "blur" }
        ],
        // typeId: [{ required: true, message: '请选择型号', trigger: 'change' }],
        chart: [{ required: true, message: '请输入图号', trigger: 'blur' }],
        standard: [{ required: true, message: '请输入标准号', trigger: 'blur' }],
        weight: [{ required: true, message: '请输入重量', trigger: 'blur' }],
        param: [{ required: true, message: '请输入参数', trigger: 'blur' }],
        num: [{ required: true, message: '请输入数量', trigger: 'blur' }],
      },
      form: {
        configId: undefined,
        typeId: undefined,
        chart: undefined,
        standard: undefined,
        weight: undefined,
        param: undefined,
        num: undefined,
        status: 1
      },
      editFormVisible: false,
      editFormVisible_Add: false,
      page: {
        pageSize: 8,
        pages: 1,
        currentPage: 1,
      },
      tabShow: 0,
      option_tab: [
        { title: '配件', id: 0, isDialogBtn: true },
      ],
      data_head: [],
      option_head: {
        head: false,//头部
        button: [false, false, false],//按钮
        onbutton: false,//点击进入
        price: true,//价格
        column: [
          { label: '名称', value: 'equipment' },

          { label: '标准号', value: 'standard' },
          { label: '图号', value: 'chart' },
          { label: '型号', value: 'model' },
          { label: '重量（吨）', value: 'weight' },
          { label: '参数', value: 'param' }
        ]
      },
      query: {},
      data: [],
      option: {
        head: false,//头部
        button: [true, true, true],//按钮
        onbutton: false,//点击进入
        price: true,//价格
        column: [
          { label: '名称', value: 'part' },
          { label: '规格', value: 'standards' },
          { label: '标准号', value: 'standard' },
          { label: '图号', value: 'chart' },
          { label: '重量（吨）', value: 'weight' },
          { label: '数量', value: 'num' },
          { label: '参数', value: 'param' }
        ]
      },
    }
  },
  components: {
    table07
  },
  computed: {

  },
  beforeRouteUpdate (to, from, next) {

    if (to.query.itemId) {
      this.data_head = []
      getDetail(to.query.itemId).then(res => {
        this.data_head.push(res.data.data)
      });
      this.query.parentId = to.query.itemId
      this.form.parentId = to.query.itemId
      this.onLoad(this.page)
      // this.onLoadClass({ pageSize: 100 }, { parentId: this.$route.query.parentId })
      selectList2(to.query.itemId, 0).then(res => {
        this.searchItem.class.res = res.data.data
      });
      getList2(1, 100, { "a.typeId_equal": to.query.parentId }).then(res => {
        this.partSelectData = res.data.data.records
      });
    }
    next();
  },
  created () {
    if (this.$route.query.itemId) {
      getDetail(this.$route.query.itemId).then(res => {
        this.data_head.push(res.data.data)
      });
      this.query.parentId = this.$route.query.itemId
      this.form.parentId = this.$route.query.itemId
      this.onLoad(this.page)
      // this.onLoadClass({ pageSize: 100 }, { parentId: this.$route.query.parentId })
      selectList2(this.$route.query.parentId, 0).then(res => {
        this.searchItem.class.res = res.data.data
      });
      getList2(1, 100, { "a.typeId_equal": this.$route.query.parentId }).then(res => {
        this.partSelectData = res.data.data.records
      });
    }
    /*     this.getSelect('class') */

  },
  methods: {
    openAdd () {
      this.editFormVisible = true
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
    submitForm (editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          this.rowSave(this.form)
        }
      })
    },
    closeDialog () {
      this.editFormVisible = false;
      this.editFormVisible_Add = false;
    },
    onLoadClass (page, params = {}) {
      getList1(page.currentPage, page.pageSize, Object.assign(params, this.queryClass)).then(res => {
        this.searchItem.class.res = res.data.data.records;
      });
    },
    getSelect (item) {
      getListItem(item).then(res => {
        this.searchItem[item].res = res.data.data
      });
    },
    onClickConfig (item) {
      this.$router.push({
        name: '配件配置',
        path: '/device/partconfig2',
        query: {
          itemId: item.id,
          parentId: this.$route.query.id,
          deviceName: this.$route.query.deviceName,
        }
      })
    },
    onClickPrice (item) {
      this.$router.push({
        name: '设备价格',
        path: '/device/deviceprice',
        query: {
          id: item.id
        }
        /*params: {
          item: item
        }*/
      })
    },
    onClickSee (item) {

      //查看使用过该配件的设备
      this.$router.push({
        name: '配置信息',
        path: '/device/partuse',
        query: {
          id: item.id
        }
      })
    },
    onLoad (page, params = {}) {
      getPartList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.data = data.records;
      });
    },
    callFather (parm) {
      this.page.currentPage = parm.currentPage
      this.onLoad(this.page)
    },
    onTabs (id) {
      this.tabShow = id
    },
    goToSelectPart () {
      if (this.$route.query.itemId) {
        this.$router.push({
          name: '设备选择',
          path: '/device/selectpart2',
          query: {
            id: this.$route.query.itemId,
            deviceName: this.$route.query.deviceName
          },
        })
      }
    },
  }
};
</script>

<style lang="stylus" scoped>
.container {
  margin: 20px 40px;
  width: auto;

  .main {
    margin-top: 20px;
    width: 1250px;
  }
}
</style>
