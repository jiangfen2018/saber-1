<template>
  <div class="container">
       <searchStyle01 :data="searchItem.machine" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <!-- <searchStyle02 :data="searchInput" @searchInputFather="searchInputFather"></searchStyle02> -->
     <div class="search-list">
      <div class="item-name">客户</div>
        <div class="item-list">
            <span class="item-box" prop="customerId">
              <!-- <label>客戶</label> -->
                <el-cascader  size="mini"  
                  v-model="projectId"  style="width:300px"
                  :options="selectDataCustomer"  placeholder="试试搜索：客户或项目名"
                  @change="changeProject" clearable filterable></el-cascader>
            </span>
          </div>
     </div>

    <searchStyle01 :data="searchItem.class" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle03 :data="searchItem.device" @searchFather="searchFather" ></searchStyle03>
    <searchStyle03 :data='searchItem.model' v-if="isShow"    @searchFather="searchFather"></searchStyle03>
    <!-- <searchStyle01 :data='searchItem.model'   @searchFather="searchFather"  ></searchStyle01> -->

    <div class="part-box">
      <h3>已选中</h3>
      <div class="item" v-for="item in selectedsAll" :key="item.id">
        <div class="selectedlist">
          <div class="detail">
             <p>
              <label>项目</label>
              <span>{{item.projectName}}</span>
            </p>
              <p>
              <span>{{item.equipment}}({{item.model}}) *  {{item.number}}</span>
            </p>
            <!-- <p>
              <label>设备</label>
              <span>{{item.equipment}}</span>
            </p>
            <p>
              <label>型号</label>
              <span>{{item.model}}</span>
            </p>
            <p>
              <label>数量</label>
              <span>{{item.number}}</span>
            </p> -->

            <div class="close-button">
              <el-button size="mini" icon="el-icon-close" circle @click="deletePart(item)"></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="part-box">
      <h3>选择设备</h3>
      <!-- 单选框组件 -->
      <radioPart01 :modleData="modleData" :flag="flag"></radioPart01>

      <cpagination v-bind:child-msg="page" @callFather="callFather"></cpagination>
    </div>
    <div class="btn-box">
      <el-button type="primary" :loading="loading" @click="selectedsave">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import radioPart01 from "@/components/radioPart01";
import { getListItem } from "@/api/system/dict";
import { selectTypeList,  selectModelList } from "@/api/platform_device/devicetype";
import { getModelList } from "@/api/platform_device/devicesequence";
// import { selected, tempsave, removetemp, selectedsave } from "@/api/customer/orderequipmentlisttemp";
import {  designDeviceSelectedSave,  designedSelectList,selectTypeList as selectTypeList1,selectModelList as selectModelList1,modelSelectedSave} from "@/api/platform_device/project";
import {  selectOrderProjectList,  selectOrderCustomerList2} from "@/api/customer/customer";

export default {
  data() {
    return {
      flag: 1,
      isShow: false,
      customerId: undefined,
      projectId: undefined,
      selectDataCustomer: [],
      selectDataProject: [],
      selecteds: [],
      radio: undefined,
      num: undefined,
      page: {
        pageSize: 50,
        pages: 1,
        currentPage: 1
      },
      modleData: [],
      searchInput: [{ name: "名称", value: "1", label: "name", type: "input" }],
      searchItem: {
        machine: { label: "项目", res: [] },
        class: { label: "类别", res: [] },
        device: { label: "设备", res: [] },
        model: { label: '型号', res: [], }
      },
      query: {
        "a.parentId_notlike": undefined
      },
      selectedsAll: [],
      selecteds: [],
      ids: "",
      nums: "",
      selecteds1: [], //已有项目选择中的
      ids1: "",//已有项目选择中的
      nums1: "",//已有项目选择中的
      loading: false
    };
  },
  computed: {},
  components: {
    radioPart01
  },
  beforeRouteUpdate(to, from, next) {
    if (to.query.id) {
      this.selected();
    }
    selectOrderCustomerList2().then(res => {
      this.selectDataCustomer = res.data.data;
    });
    selectOrderProjectList().then(res => {
      this.selectDataProject = res.data.data;
    });

    this.getSelectCondition();
  },
  created() {
     selectOrderCustomerList2().then(res => {
      this.selectDataCustomer = res.data.data;
    });
    this.getSelectCondition();
    this.onLoad(this.page);
  },

  methods: {
    selectedsave() {
      this.loading = true;
      if (this.$route.query.id && (this.ids.length > 0 ||this.ids1.length > 0) ) {
        modelSelectedSave(this.ids, this.nums, this.$route.query.id).then(
          res => {
               designDeviceSelectedSave(
                  '',
                  this.ids1,
                  this.nums1,
                  '',
                  this.$route.query.id
                ).then(res => {
                  this.loading = false;
                  this.$router.push({
                    name: "项目详情",
                    path: "/customer/projectDetail",
                    query: {
                      id: this.$route.query.id
                    }
                  })
                }).catch(err =>{
                      this.loading = false;
                  })

            }).catch(err =>{
              this.loading = false;
            })
          
         
      }else {
        this.$message({ type: "error", message: "请至少选中一个！!" });
        this.loading = false;
      }
    },
    cancel() {
      this.$router.back();
    },
    deletePart(one) {
      var i = undefined;
      if(one.projectName=='新增'){
         this.selecteds.forEach(function(item, index, arr) {
            if (item.id == one.id) {
              i = index;
            }
          });
          this.selecteds.splice(i, 1);
      }else{
        this.selecteds1.forEach(function(item, index, arr) {
          if (item.id == one.id) {
            i = index;
          }
        });
        this.selecteds1.splice(i, 1);
      }
     this.selected()
    },
    changeRadio(item, num) {
      this.num = num;
      if (this.$route.query.id) {
        if (!this.num) {
          this.$message({ type: "error", message: "请填写数量!" });
          this.radio = undefined;
          return;
        }
        item.number = this.num;
        if(this.projectId && this.projectId.length>0){
          for(var i=0;i<this.selectDataCustomer.length;i++){
            var customer =  this.selectDataCustomer[i]
            if(customer.value ===this.projectId[0] ){
              customer.children.forEach((item,index)=>{
                if(item.value === this.projectId[1])
                item.projectName = item.label
              })
            }
          }
       
          this.selecteds1.push(item);
        }else{
          item.projectName = '新增'
          this.selecteds.push(item);
        }
        this.selected();
      }
     this.num = undefined;
    },
    
    selected() {
  
     if(this.projectId && this.projectId.length>0){
          this.ids1 = "";
         this.nums1 = "";
          this.selecteds1.forEach(element => {
            this.ids1 = this.ids1 + element.id + ",";
            this.nums1 = this.nums1 + element.number + ",";
          });
        //  this.query["c.id_notin"] = undefined 由于需求原因不进行过滤
        //  this.query["a.id_notin"] = this.ids1; 由于需求原因不进行过滤
         this.onLoadExist(this.page);
         this.selectedsAll = this.selectedsAll.concat(this.selecteds1)
      }else{
          this.ids = "";
          this.nums = "";
         this.selecteds.forEach(element => {
            this.ids = this.ids + element.id + ",";
            this.nums = this.nums + element.number + ",";
          });
        //  this.query["a.id_notin"] = undefined 由于需求原因不进行过滤
        this.query["b.status_equal"] = undefined
         this.query["a.projectId_equal"]=  undefined
        //  this.query["c.id_notin"] = this.ids 由于需求原因不进行过滤
         this.onLoad(this.page);
          this.selectedsAll = this.selectedsAll.concat(this.selecteds)
      }
      this.selectedsAll =   []
      this.selectedsAll =   this.selectedsAll.concat(this.selecteds)
      this.selectedsAll =    this.selectedsAll.concat(this.selecteds1)
      this.radio = undefined;
    },
    changeCustomer() {
      selectOrderProjectList(this.customerId).then(res => {
        this.selectDataProject = res.data.data;
      });
    },
    changeProject() {
      //当变化项目的时候 刷新下方设备 显示对应项目的设备列表
      if (this.projectId && this.projectId.length>0) {
        // this.query["c.id_notin"] = undefined 由于需求原因不进行过滤
        //  this.query["a.id_notin"] = this.ids1 由于需求原因不进行过滤
        this.query["a.projectId_equal"] = this.projectId[1]; 
         this.onLoadExist(this.page);

         selectTypeList1(this.projectId[1], undefined,undefined,0).then(res => {
                this.searchItem["device"].res = res.data.data;
         });
         
      }else{
        // this.query["a.id_notin"] = undefined 由于需求原因不进行过滤
        //  this.query["c.id_notin"] =  this.ids 由于需求原因不进行过滤
        this.query["b.status_equal"] = undefined
        this.query["a.projectId_equal"]=  undefined
        this.onLoad(this.page)
        selectTypeList(undefined,undefined).then(res => {
                this.searchItem["device"].res = res.data.data;
         });
      }
      this.isShow = false
    },
    getSelectCondition() {
      selectTypeList().then(res => {
        this.searchItem["device"].res = res.data.data;
      });
      // selectModelList().then(res => {
      //   this.searchItem['model'].res = res.data.data;
      // });
      getListItem("machine").then(res => {
        this.searchItem["machine"].res = res.data.data;
      });
      getListItem("class").then(res => {
        this.searchItem["class"].res = res.data.data;
      });
    },
    getSelect(item) {
      if (item === "device") {
        selectTypeList().then(res => {
          this.searchItem[item].res = res.data.data;
        });
      }
      if (item === "model") {
        // selectModelList().then(res => {
        //   this.searchItem[item].res = res.data.data;
        // });
      } else {
        getListItem(item).then(res => {
          this.searchItem[item].res = res.data.data;
        });
      }
    },
    searchInputFather(inputValue) {
      this.query["b.name"] = inputValue.name;
      this.onLoad(this.page);
    },
    callFather(parm) {
      this.page.currentPage = parm.currentPage;
      this.onLoad(this.page);
    },
    onLoadExist(page, params = {}) {
      this.query['b.status_equal'] = 0
      designedSelectList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.modleData = data.records;
      });
    },
    onLoad(page, params = {}) {
      getModelList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.modleData = data.records;
      });
    },
    searchFather(label, item) {
      switch (label) {

        case "项目":
          this.query["d.project_equal"] = item.dictKey;
          this.query["c.parentId_equal"] = undefined;
          this.query["c.id_equal"] = undefined;
          if(this.projectId && this.projectId.length>0){
              selectTypeList1(this.projectId[1], item.dictKey,undefined,0).then(res => {
                this.searchItem["device"].res = res.data.data;
              });
          }else{
            selectTypeList(item.dictKey, undefined).then(res => {
              this.searchItem["device"].res = res.data.data;
            });

          }
          var type = undefined
          if(item.dictKey==1){
            type = '1,2'
          }
          if(item.dictKey==2){
            type = '3,4'
          }
          if(item.dictKey==3){
            type = '5'
          }
             selectOrderCustomerList2(type).then(res => {
              this.selectDataCustomer = res.data.data;
            });
            this.isShow = false
          break;
        case "类别":
          this.query["d.type_equal"] = item.dictKey;
          this.query["c.parentId_equal"] = undefined;
          this.query["c.id_equal"] = undefined;
          if(this.projectId && this.projectId.length>0){
              selectTypeList1(this.projectId[1],undefined, item.dictKey,0).then(res => {
                this.searchItem["device"].res = res.data.data;
              });
          }else{
            selectTypeList(undefined, item.dictKey).then(res => {
              this.searchItem["device"].res = res.data.data;
            });
          }
          this.isShow = false
          break;
        case "型号":
          this.query["c.id_equal"] = item.id;
          break;
        case "设备":
          this.query["c.parentId_equal"] = item.id;
          this.query["c.id_equal"] = undefined;
         if(item.id){
            this.isShow = true
             //过滤对应的型号
              if(this.projectId && this.projectId.length>0){
                   selectModelList1(this.projectId[1],item.id,0).then(res => {
                    this.searchItem['model'].res = res.data.data;
                  });

              }else{
                selectModelList(item.id).then(res => {
                    this.searchItem['model'].res = res.data.data;
                  });
              }
           
          }else{
            this.isShow = false
          }
          break;
        default:
          break;

        // case "项目":
        //   this.query["a.project_equal"] = item.dictKey;
        //   this.query["a.parentId_equal"] = undefined;
        //   selectTypeList(item.dictKey, undefined).then(res => {
        //     this.searchItem["device"].res = res.data.data;
        //   });
        //   break;
        // case "类别":
        //   this.query["a.type"] = item.dictKey;
        //   this.query["a.parentId_equal"] = undefined;
        //   selectTypeList(undefined, item.dictKey).then(res => {
        //     this.searchItem["device"].res = res.data.data;
        //   });
        //   break;
        // case '型号':
        //   this.query['a.typeId_equal'] = item.id
        //   break;
        // case "设备":
        //   this.query["a.parentId_equal"] = item.id;
        //   this.query['a.typeId_equal'] = undefined
        //   if(item.id){
        //     this.isShow = true
        //      //过滤对应的型号
        //     selectModelList(item.id).then(res => {
        //       this.searchItem['model'].res = res.data.data;
        //     });
        //   }else{
        //     this.isShow = false
        //   }


        //   break;
        // default:
        //   break;
      }
      if(this.projectId && this.projectId.length>0 ){
        // this.query["c.id_notin"] = undefined 由于需求原因不进行过滤
        // this.query["a.id_notin"] = this.ids1 由于需求原因不进行过滤
        this.onLoadExist(this.page)
        return
      }
      // this.query["a.id_notin"] = undefined 由于需求原因不进行过滤
      // this.query["c.id_notin"] = this.ids 由于需求原因不进行过滤
      this.query["b.status_equal"] = undefined
      this.query["a.projectId_equal"]=  undefined
      this.onLoad(this.page);
    }
  }
};
</script>
<style>
.c-box input {
  width: 80px !important;
  margin-left: 0 !important;
}
</style>
<style lang="stylus" scoped>

.search-list {
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

  .item-box {
    label {
      color: #606266;

      &:after {
        content: ':';
        margin-left: 4px;
      }
    }
  }

}
.container {
  margin: 20px 40px;
  width: auto;

  .part-box {
    background-color: #ffffff;
    padding: 10px 20px 20px 20px;
    margin-top: 20px;

    h3 {
      color: #606266;
      font-size: 16px;
      font-weight: normal;
    }

    .item {
      display: flex;
      align-items: center;
      display: inline-block;
      margin-right: 30px;

      .name {
        display: inline-block;
        padding: 2px 0;
        width: 150px;
        height: 30px;
        background: #8693f3;
        color: #ffffff;
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        margin-right: 10px;
      }
    }
  }

  .btn-box {
    text-align: center;
    margin-top: 20px;
  }
}

.list {
  width: 292px;
  margin: 2px 2px 0 2px;

  .detail {
    border: 1px #ccc solid;
    border-radius: 5px;
    color: #303133;
    margin: 0 auto;
    background-color: #fff;
    font-size: 14px;
    padding: 10px 20px 5px 20px;
    margin-bottom: 5px;

    &:hover {
      transform: translateY(-3px);
      border: 1px #409EFF solid;
      box-shadow: 1px 1px 3px 3px #cccccc;
    }

    input {
      width: 150px;
    }

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

.selectedlist {
  width: 292px;
  margin: 2px 2px 0 2px;

  .detail {
    position: relative;
    color: #303133;
    margin: 0 auto;
    background-color: #3c8dc4;
    font-size: 14px;
    padding: 20px 30px 10px 30px;

    p {
      color: #fff;
      margin: 12px 0;

      label {
        display: inline-block;
        color: #fff;
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

    .close-button {
      position: absolute;
      width: 10px;
      height: 10px;
      right: 25px;
      top: 10px;
      z-index: 100;
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
</style>
