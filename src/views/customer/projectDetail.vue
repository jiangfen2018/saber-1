<template>
  <div class="container">
    <part02 :data="info"></part02>
    <cline></cline>
    <el-row>
      <cbutton
          title="添加设备"
          type="design"
          style="padding:5px;margin-left:15px;"
          @clickButton="goToSelectDevice"
        ></cbutton>

         <cbutton
          title="添加配件"
          type="design"
          style="padding:5px;margin-left:15px;"
          @clickButton="goToSelectPart"
        ></cbutton>

    </el-row>
    <ctabs @onTabs="onTabs" :option="option"></ctabs>
    <div class="tab-wrapper">
      <div v-if="tabShow===0">
        <!-- <cbutton title="已设计设备" style="padding:5px" @clickButton="goToSelectExistDevice"></cbutton> -->
        

        <table05 :data="data" @editInfo='editInfo'></table05>
        <cpagination v-bind:child-msg="page" @callFather="callFather"></cpagination>
      </div>
      <div v-if="tabShow===1">
        <!-- <cbutton title="已设计设备" style="padding:5px" @clickButton="goToSelectPart"></cbutton> -->
       
        <!-- <cbutton title='添加配件' @clickButton='goToSelectPart'></cbutton> -->
        <table06 :data="data_part" :option="option_deliver"  @editInfo='editInfo'></table06>
        <cpagination v-bind:child-msg="page_part" @callFather="callFather_part"></cpagination>
      </div>
    </div>


    <!-- 设备修改 -->
    <el-dialog title="修改信息"
               :visible.sync="formVisible"
               width="30%">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="80px">
        
        <el-form-item label="设备"
                      prop="equipment" v-if="form.status==0">
          <el-input size="mini"
                    v-model="form.equipment"
                    :disabled="true"></el-input>
        </el-form-item>
      <el-form-item label="型号"
                      prop="name"  v-if="form.status==0">
          <el-input size="mini"
                    v-model="form.name"
                    :disabled="true"></el-input>
        </el-form-item>


      <el-form-item label="设备"
                      prop="equipment" v-if="form.status==1">
          <el-input size="mini"
                    v-model="form.equipment2"
                    :disabled="true"></el-input>
        </el-form-item>
      <el-form-item label="型号"
                      prop="name"  v-if="form.status==1">
          <el-input size="mini"
                    v-model="form.equipment"
                    :disabled="true"></el-input>
        </el-form-item>

        <!-- <el-form-item label="配件"
                      prop="configId">
          <el-select size="mini"
                     style="width:100%"
                     v-model="form.configId"
                     placeholder="请选择配件">
            <el-option v-for="item in partSelectData"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="规格"
                      prop="standards">
          <el-input size="mini"
                    v-model="form.standards"></el-input>
        </el-form-item>
        <el-form-item label="图号"
                      prop="chart">
          <el-input size="mini"
                    v-model="form.chart"></el-input>
        </el-form-item>
        <el-form-item label="标准号"
                      prop="standard">
          <el-input size="mini"
                    v-model="form.standard"></el-input>
        </el-form-item>
        <el-form-item label="重量/吨"
                      prop="weight">
          <el-input size="mini"
                    v-model="form.weight"></el-input>
        </el-form-item>
        <el-form-item label="参数"
                      prop="param">
          <el-input size="mini"
                    v-model="form.param"></el-input>
        </el-form-item>
        <el-form-item label="数量"
                      prop="num">
          <el-input size="mini" :disabled="true"
                    v-model="form.num"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="small"
                   @click="closeDialog()">取消</el-button>
        <el-button size="small"
                   type="primary"  :loading='loading'
                   @click="submitForm('form')">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import part02 from "@/components/part02";
import table05 from "@/components/table05";
import table06 from "@/components/table06";
import { getDetail, getPartDetail, getPartDetail2 } from "@/api/platform_device/project";
import { update} from "@/api/platform_device/devicesequence";
export default {
  data() {
    return {
      query: {},
      loading:false,
      tabShow: 0,
      option: [
        // { title: "设备", id: 0 },
        // { title: "配件", id: 1 }
      ],
      option_deliver: {
        head: { isShow: false }, //头部
        button: [true, false, true], //按钮
        onbutton: false, //点击进入
        price: true, //价格
        column: [
          { label: "名称", value: "equipment" },
          { label: "规格", value: "standards" },
          { label: "标准号", value: "standard" },
          { label: "图号", value: "chart" },
          { label: "重量/吨", value: "weight" },
          { label: "数量", value: "num" },
          { label: "参数", value: "param" }
        ]
      },
      page: {
        pageSize: 30,
        pages: 1,
        currentPage: 1
      },
      page_part: {
        pageSize: 6,
        pages: 1,
        currentPage: 1
      },
      data: [],
      data_part: [],
      info: undefined,
      formVisible: false,
      deviceInfo:{},
      form:{},
      rules: {},
    };
  },
  computed: {},
  components: {
    part02,
    table05,
    table06
  },
  beforeRouteUpdate(to, from, next) {
    if (to.query.id) {
      getDetail(to.query.id).then(res => {
        this.info = res.data.data;
      });
      this.query['id_equal'] = to.query.id;
      this.onLoad(this.page);
      this.onLoad_part(this.page_part);
    }

    next();
  },
  created() {
    if (this.$route.query.id) {
      getDetail(this.$route.query.id).then(res => {
        this.info = res.data.data;
      });
      this.query['id_equal'] = this.$route.query.id;
      this.onLoad(this.page);
      this.onLoad_part(this.page_part);
    }
  },
  methods: {
    goToSelectExistDevice() {
      if (this.$route.query.id) {
        this.$router.push({
          name: "已设计完设备选择",
          path: "/device/selectdevice4",
          query: {
            status: 0,
            id: this.$route.query.id
          }
        });
      }
    },
    goToSelectDevice() {
      if (this.$route.query.id) {
        this.$router.push({
          name: "项目设备添加",
          path: "/device/selectdevice",
          query: {
            id: this.$route.query.id
          }
        });
      }
    },
    goToSelectPart() {
      if (this.$route.query.id) {
        // this.$router.push({
        //   name: "已设计完设备选择",
        //   path: "/device/selectdevice4",
        //   query: {
        //     status: 1,
        //     id: this.$route.query.id
        //   }
        // });

        this.$router.push({
          name: '项目配件添加',
          path: '/device/selectpart3',
          query: {
            id: this.$route.query.id
          },
        })
      }

      /*       this.editFormVisible = true */
      //选择配件
      // this.$message.success('暂未开放改功能！')
      // this.$router.push({
      //   name: '设备选择',
      //   path: '/device/selectpart2',
      //   query: {
      //     id: this.$route.query.id
      //   },
      // })
    },
    callFather(parm) {
      this.page.currentPage = parm.currentPage;
      this.onLoad(this.page);
    },
    callFather_part(parm) {
      this.page_part.currentPage = parm.currentPage;
      this.onLoad_part(this.page_part);
    },
    onLoad(page, params = {}) {
      getPartDetail(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.data = data.records;
        if(this.data.length>0){
          var arr = this.option
          var option =  { title: "设备", id: 0 }
           if(JSON.stringify(arr).indexOf(JSON.stringify(option))==-1){
                  this.tabShow = 0
                  this.option.push( option) 
          }
        }
      });
    },
    onLoad_part(page, params = {}) {
      getPartDetail2(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const data = res.data.data;
        this.page_part.pages = data.pages;
        this.data_part = data.records;
          if(this.data_part.length>0){
          var arr = this.option
          var option =  { title: "配件", id: 1 }
           if(JSON.stringify(arr).indexOf(JSON.stringify(option))==-1){
                  this.tabShow = 1
                  this.option.push( option) 
          }
        }
      });
    },
    onTabs(id) {
      this.tabShow = id;
    },
    editInfo(item){
      console.log('item',item);
      this.formVisible = true 
      this.form = item
    },
    closeDialog(){
      this.formVisible = false
      this.form= {}
    },
    submitForm(){
      console.log(this.form);
      this.loading = true
      var obj ={}
      obj.id = this.form.deviceId
      obj.standards = this.form.standards
      obj.standard = this.form.standard
      obj.chart = this.form.chart
      obj.weight = this.form.weight
      obj.param = this.form.param
     
     update(obj).then(res =>{
       this.$message.success('更新成功！')
       this.loading = false
       this.formVisible = false
       if(this.status==0){
        this.onLoad(this.page);
       }else{
          this.onLoad_part(this.page_part);
       }
     }).catch(error=>{
        this.$message.error('更新失败！')
       this.loading = false
     })
      
    }
  }
};
</script>

<style lang="stylus">
.table.style {
  width: 88%;
}

.table {
  width: 88%;
}
</style>
<style lang="stylus" scoped>
.container {
  margin: 20px;
  width: auto;

  .tab-wrapper {
    margin-top: 20px;
  }
}
</style>
