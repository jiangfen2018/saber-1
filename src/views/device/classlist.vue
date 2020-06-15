<template>
  <div class="container">
    <searchStyle02 :data="searchInput" @searchInputFather="searchInputFather"></searchStyle02>
    <searchStyle01 :data="searchItem.machine" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.class" @searchFather="searchFather" name="dictValue" v-if="query.project_equal ==1"></searchStyle01>
    
    <searchStyle01 :data="searchItem.electric1" @searchFather="searchFather" name="dictValue" v-if="query.project_equal ==2"></searchStyle01>
    <searchStyle01 :data="searchItem.electric2" @searchFather="searchFather" name="dictValue" btnlist='add' @add="add"  v-if="query.project_equal ==2"></searchStyle01>
    <div class="main">
      <cbutton title="新增设备" @clickButton="clickButton"></cbutton>

      <div class="list-box">
        <div class="list" v-for="item in data" :key="item.id">
          <div class="title">{{item.name}}</div>
          <div class="btn-wrapper">
            <div class="btn btn1" @click="goToPart(item)">配件</div>
            <div class="btn btn2" @click="see(item)">查看</div>
          </div>
        </div>
      </div>
    </div>

    <cpagination v-bind:child-msg="page" @callFather="callFather"></cpagination>


    <el-dialog title="新增" :visible.sync="editFormVisible" width="30%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="项目" prop="project">
          <el-select v-model="form.project" size="mini" style="width:100%">
            <el-option
              v-for="item in searchItem.machine.res"
              :key="item.id"
              :label="item.dictValue"
              :value="item.dictKey"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type"  v-if="form.project ==1">
          <el-select v-model="form.type" size="mini" style="width:100%">
            <el-option
              v-for="item in searchItem.class.res"
              :key="item.id"
              :label="item.dictValue"
              :value="item.dictKey"
            ></el-option>
          </el-select>
        </el-form-item>

      <el-form-item label="类型1" prop="type1" v-if="form.project ==2">
          <el-select v-model="form.type1" size="mini" style="width:100%"  @change="typeChange">
            <el-option
              v-for="item in searchItem.electric1.res"
              :key="item.id"
              :label="item.dictValue"
              :value="item.dictKey"
             
            ></el-option>
          </el-select>
        </el-form-item>

     <el-form-item label="类型2" prop="type2"  v-if="form.project ==2">
          <el-select v-model="form.type2" size="mini" style="width:100%">
            <el-option
              v-for="item in typeSelectList"
              :key="item.id"
              :label="item.dictValue"
              :value="item.dictKey"
            ></el-option>
          </el-select>
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
        <el-button size="small" type="primary" @click="submitForm('form')" :loading="loading">保存</el-button>
      </div>
    </el-dialog>

  <el-dialog title="新增" :visible.sync="addFormVisible" width="30%">
      <el-form ref="form" :model="form1" :rules="rules1" label-width="80px">
        <el-form-item label="类型1" prop="parentId" >
          <el-select v-model="form1.parentId" size="mini" style="width:100%">
            <el-option
              v-for="item in searchItem.electric1.res"
              :key="item.id"
              :label="item.dictValue"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型2" prop="name">
          <el-input size="mini" v-model="form1.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="submitForm1('form1')"  :loading="loading">保存</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
/* import { mapGetters } from "vuex"; */
import { getListItem,getListItem2 } from "@/api/system/dict";
import { getList } from "@/api/platform_device/devicetype";
import { add } from "@/api/platform_device/devicetype";
import {add as addDic} from "@/api/system/dict";
export default {
  data() {
    return {
      rules: {
        project: [{ required: true, message: "请选择项目", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "blur" }],
        type1: [{ required: true, message: "请选择类型1", trigger: "blur" }],
        // type2: [{ required: true, message: "请选择类型2", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        unit: [{ required: true, message: "请输入单位", trigger: "blur" }]
      },
      typeSelectList:[],
      form: {
        project: undefined,
        type: undefined,
        name: undefined,
        unit: undefined,
        status: 0
      },
      loading:false,
      parentId : undefined,
      addFormVisible:false,
      form1:{
        code :'electric2',
        
        remark:'电炉下选项'
      },
      rules1: { parentId: [{ required: true, message: "请选择，类型1", trigger: "blur" }], name: [{ required: true, message: "请输入名称", trigger: "blur" }],},
      editFormVisible: false,
      searchInput: [{ name: "名称", value: "1", label: "name", type: "input" }],
      query: {
        name: undefined,
        status: 0
      },
      page: {
        pageSize: 42,
        pages: 1,
        currentPage: 1
      },
      data: [],
      searchItem: {
        machine: { label: "项目", res: [] },
        class: { label: "类别", res: [] },
        electric1: { label: "类型1", res: [] },
        electric2: { label: "类型2", res: []  }
      }
    };
  },
  computed: {
    /* ...mapGetters(["permission"]),
      permissionList() {
       console.log(this.permission);
       return {
         devicedetail: this.vaildData(this.permission.devicedetail, false),
       };
     }, */
  },
  components: {},
  created() {
    this.onLoad(this.page);
    this.getSelect("class");
    this.getSelect("machine");
    this.getSelect("electric1");
    this.getSelect("electric2");
  },
  methods: {
    searchFather(label, item) {
      switch (label) {
        case "项目":
          this.query["project_equal"] = item === -1 ? undefined : item.dictKey;
          this.query["type1_equal"] =  undefined
            this.query["type2_equal"] =  undefined
            this.parentId = undefined
          break;
        case "类别":
          this.query["type_equal"] = item === -1 ? undefined : item.dictKey;
          this.query["type1_equal"] =  undefined
          this.query["type2_equal"] =  undefined
           this.parentId = undefined
          break;
        case "类型1":
          this.query["type1_equal"] = item === -1 ? undefined : item.dictKey;
          //筛选类型2
          if(item == -1){
             this.getSelect("electric2");
             this.parentId = undefined
          }else{
              this.parentId = item.id
              this.getSelect2('electric2',item.id)
          }
           this.query["type2_equal"] =  undefined
          break;
        case "类型2":
          this.query["type2_equal"] = item === -1 ? undefined : item.dictKey;
          break;      
        default:
          break;
      }
      this.onLoad(this.page);
    },
    add(){
      this.addFormVisible = true
    },
    typeChange(item){
      console.log('item',item);
      var id = undefined
      this.searchItem.electric1.res.forEach(ite =>{
        if(ite.dictKey ===  item){
          id = ite.id
        }
      })
        getListItem2("electric2",id).then(res => {
          console.log(res)
         this.typeSelectList= res.data.data;
       });
    },
    submitForm1(){
      //加入字典中
      if(!this.form1.parentId){
        this.$message({ type: "error", message: "请输入类型1!" });
        return
      }
      if(!this.form1.name){
        this.$message({ type: "error", message: "请输入类型2!" });
        return
      }
      this.loading = true
      this.form1.dictKey = this.searchItem.electric2.res.length+1
      this.form1.dictValue = this.form1.name
      this.form1.sort = this.searchItem.electric2.res.length+1 
      addDic(this.form1).then(res=>{
        this.loading = false
        if(this.parentId){
          this.getSelect2("electric2",this.parentId);
        }else{
          this.getSelect("electric2");
        }
        
         this.addFormVisible = false
      }).catch(error=>{
        this.loading = false
         this.$message({ type: "error", message: "添加失败!" });
      })
    },
    rowSave(row) {
      this.loading = true
      add(row).then(
        () => {
          this.loading = false
          this.$message({ type: "success", message: "操作成功!" });
          this.closeDialog();
          this.onLoad(this.page);
        },
        error => {
          this.loading = false
          this.$message({ type: "error", message: error.message});
        }
      );
    },
    closeDialog() {
      this.editFormVisible = false;
    },
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          this.rowSave(this.form);
        }
      });
    },
    clickButton() {
      this.editFormVisible = true;
    },
    searchInputFather(inputValue) {
      this.query["name"] = inputValue.name;
      this.onLoad(this.page);
    },
    goToPart(item) {
      this.$router.push({
        name: "设备配置",
        path: "/device/devicepart",
        query: {
          id: item.id,
          noModel: true,
          deviceName: item.name
        },
        params: {
          info: item
        }
      });
    },
    see(item) {
      this.$router.push({
        name: "设备列表",
        path: "/device/devicedetail",
        query: {
          id: item.id,
          deviceName: item.name,
          type: item.type,
          project: item.project
        },
        params: {
          info: item
        }
      });
    },
    callFather(parm) {
      this.page.currentPage = parm.currentPage;
      this.onLoad(this.page);
    },
    getSelect(item) {
      getListItem(item).then(res => {
        this.searchItem[item].res = res.data.data;
      });
    },
    getSelect2(item, parentId) {
      getListItem2(item,parentId).then(res => {
        this.searchItem[item].res = res.data.data;
      });
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
    }
  }
};
</script>

<style lang="stylus" scoped>
.container {
  margin: 20px 40px;
  width: auto;

  .main {
    margin-top: 20px;

    .main-btn {
      text-align: right;
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
          font-size: 0.07rem;
          text-align: center;
        }

        .btn-wrapper {
          display: flex;
          padding-top: 20px;
          justify-content: space-between;

          .btn {
            width: 60px;
            font-size: 0.07rem;
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
