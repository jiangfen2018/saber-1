<template>
  <div class="container">
    <!-- <searchStyle02 :data='searchInput'
                   @searchInputFather="searchInputFather"></searchStyle02> -->
    <searchStyle01 :data='searchItem.machine'
                   @searchFather="searchFather"
                   name='dictValue'></searchStyle01>

   <div class="search-list">
      <div class="item-name">客户</div>
        <div class="item-list">
            <span class="item-box" prop="customerId">
              <!-- <label>客戶</label> -->
                <el-cascader  size="mini"
                  v-model="projectId"
                  :options="selectDataCustomer"  placeholder="试试搜索：客户或项目名"
                  @change="changeProject" clearable filterable></el-cascader>
            </span>
          </div>
     </div>


    <searchStyle01 :data='searchItem.class'
                   @searchFather="searchFather"
                   name='dictValue'></searchStyle01>
    <searchStyle03 :data='searchItem.device'
                   @searchFather="searchFather"></searchStyle03>
    <searchStyle03 :data='searchItem.model'  v-if="isShow"
                   @searchFather="searchFather"></searchStyle03>

    <div class="part-box">
      <h3>已选中（选择方式：1.选中设备，出现型号 2.选中一个型号 3.填写对应配件数量 4.点击配件上的圆圈）</h3>
      <div class="item"
           v-for="item in selectedsAll"
           :key='item.id'>
        <div class="selectedlist">
          <div class="detail">
             <p><label>项目</label><span>{{item.projectName}}</span></p>
            <p><span>{{item.equipment}}({{item.model}})</span></p>
            <p><span>{{item.name}}  *   {{item.num}} </span></p>
            <div class="close-button">
              <el-button size="mini"
                         icon="el-icon-close"
                         circle
                         @click="deletePart(item)"></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="part-box">
      <!--  :label="item.id" -->
      <h3>选择设备</h3>
      <!-- <el-radio v-model="radio"
                v-for='item in data'
                :key='item.id'
                :label="item"
                @change="changeRadio">
        <div class="list">
          <div class="detail">
            <p><label>名称</label><span>{{item.name}}</span></p>
            <p><label>数量</label><span>
                <cinput v-model="num"></cinput>
              </span>
            </p>
          </div>
        </div>
      </el-radio> -->
     <radioPart01 :modleData="data" :flag="flag"></radioPart01>

      <cpagination v-bind:child-msg="page"
                   @callFather='callFather'></cpagination>
    </div>
    <div class="btn-box">
      <el-button type="primary"
                 @click="selectedsave">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { getListItem } from "@/api/system/dict";
import { selectTypeList, selectModelList } from "@/api/platform_device/devicetype";
// import { getList, selected, tempsave, removetemp, selectedsave } from "@/api/customer/orderequipmentlisttemp";
import {  getList,  selected,  updateTempTypeId,  removetemp,  selectedsave} from "@/api/platform_device/typeconfig";
import radioPart01 from "@/components/radioPart01";
import { partSelectedSave , designDeviceSelectedSave, designedSelectList, selectTypeList as selectTypeList1,selectModelList as selectModelList1} from "@/api/platform_device/project";
import {  selectOrderProjectList,  selectOrderCustomerList2} from "@/api/customer/customer";

export default {
  data () {
    return {
      flag:3,
      selectParts: [],
      projectId: undefined,
      radio: undefined,
      num: undefined,
      typeId: undefined,
      equipment:undefined,
      model:undefined,
      name:undefined,
      isShow: false,
      page: {
        pageSize: 50,
        pages: 1,
        currentPage: 1,
      },
      data: [],
      searchInput: [{ name: '名称', value: '1', label: 'name', type: 'input' }],
      searchItem: {
        machine: { label: '项目', res: [] },
        class: { label: '类别', res: [] },
        device: { label: '设备', res: [], },
        model: { label: '型号', res: [], }
      },
      query: {
      },
      query1: {
      },
      selectDataCustomer: [],
      selectDataProject: [],
      selectedsAll: [],
      selecteds: [],
      typeIds: '',
      ids: '',
      nums: '',
      selecteds1: [], //已有项目选择中的
      ids1: "",//已有项目选择中的
      nums1: "",//已有项目选择中的

    }
  },
  computed: {
  },
  components: {
    radioPart01
  },
  created () {

    // this.getSelect('machine')
    // this.getSelect('class')
    // this.getSelect('device')
    // this.getSelect('model')
    this.getSelectCondition()
    if (this.$route.query.id) {
      this.selected()
    }
    selectOrderCustomerList2().then(res => {
      this.selectDataCustomer = res.data.data;
    });


  },

  methods: {

    selectedsave () {
    
      if (this.$route.query.id && (this.ids.length > 0 || this.ids1.length > 0 ) ) {
        partSelectedSave(this.typeIds, this.ids, this.nums, this.$route.query.id).then(res => {


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

      } else {
        this.$message({ type: "error", message: "请至少选中一个！!" });
      }
      // selectedsave(this.ids, this.nums, this.$route.query.id).then(res => {
      //   this.$router.push({
      //     name: '项目详情',
      //     path: '/customer/projectDetail',
      //     query: {
      //       id: this.$route.query.id
      //     }
      //   })
      // });
      //}
    },
   cancel() {
      this.$router.back();
    },
    deletePart (one) {
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

      // this.selectParts.forEach(function (item, index, arr) {
      //   if (item.id == one.id) {
      //     i = index;
      //   }
      // });
      // this.selectParts.splice(i, 1);
      // this.selected()
      // removetemp(item.id).then(res => {
      //   this.selected()
      // });
    },
    changeCustomer() {
      selectOrderProjectList(this.customerId).then(res => {
        this.selectDataProject = res.data.data;
      });
    },
    changeProject() {
      //当变化项目的时候 刷新下方设备 显示对应项目的设备列表
      if (this.projectId && this.projectId.length>0) {
        //  this.query1["a.id_notin"] = this.ids1 由于需求原因不进行过滤
         this.query1["a.projectId_equal"] = this.projectId[1]; 
         this.onLoadExist(this.page);
         this.flag =5
         selectTypeList1(this.projectId[1], undefined,undefined,1).then(res => {
                this.searchItem["device"].res = res.data.data;
         });
         
      }else{
        this.flag = 3
        // this.query["a.id_notin"] =  this.ids 由于需求原因不进行过滤
        this.query["b.status_equal"] = undefined
        this.query["a.projectId_equal"]=  undefined
        this.onLoad(this.page)
        selectTypeList(undefined,undefined,1).then(res => {
                this.searchItem["device"].res = res.data.data;
         });
      }
      this.isShow = false
    },
    changeRadio (item,num) {
      if (this.$route.query.id) {
        this.num = num
        if (!this.num) {
          this.$message({ type: "error", message: "请填写数量!" });
          this.radio = undefined
          return
        }

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
          item.number = this.num;
          item.num = this.num;
          this.selecteds1.push(item);
          
        }else{
         
          if(!this.typeId){
            this.$message({ type: "error", message: "请至少选中一个型号！!" });
            this.radio = undefined
            return
          }
            var part = {};
            part.id = item.id
            part.name = item.name
            part.projectName = '新增'
            part.num = this.num
            part.typeId = this.typeId
            part.equipment = this.equipment
            part.model = this.model 
            // part.name = this.name
            this.selecteds.push(part)
        }
     
         

        this.selected()
        this.num = undefined
        // this.typeId = undefined
        // this.equipment = undefined
        // this.model = undefined
        // this.name = undefined
        // tempsave({
        //   number: this.num,
        //   sequenceId: val,
        //   projectId: this.$route.query.id
        // }).then(res => {
        //   this.selected()
        //   this.num = undefined
        //   this.query['a.id_notin'] = this.ids
        //   this.onLoad(this.page)
        // });
      }
    },
    selected () {

     if(this.projectId && this.projectId.length>0){
          this.ids1 = "";
          this.nums1 = "";
          this.selecteds1.forEach(element => {
            this.ids1 = this.ids1 + element.id + ",";
            this.nums1 = this.nums1 + element.number + ",";
          });
        //  this.query1["a.id_notin"] = this.ids1; 由于需求原因不进行过滤
         this.onLoadExist(this.page);
        //  this.selectedsAll = this.selectedsAll.concat(this.selecteds1)
      }else{
        //   this.ids = "";
        //   this.nums = "";
        //  this.selecteds.forEach(element => {
        //     this.ids = this.ids + element.id + ",";
        //     this.nums = this.nums + element.number + ",";
        //   });

          this.typeIds = ''
          this.ids = ''
          this.nums = ''
          this.selecteds.forEach(element => {
            this.typeIds = this.typeIds + element.typeId + ','
            this.ids = this.ids + element.id + ','
            this.nums = this.nums + element.num + ','
          });


        //  this.query["a.id_notin"] = undefined
        //   this.query["b.status_equal"] = undefined
        //  this.query["a.projectId_equal"]=  undefined
        //  this.query["c.id_notin"] = this.ids
        //  this.onLoad(this.page);

       
          // this.query['a.id_notin'] = this.ids 由于需求原因不进行过滤
          this.onLoad(this.page)

    //  this.selectedsAll = this.selectedsAll.concat(this.selecteds)



      } 
      this.selectedsAll =   []
      this.selectedsAll =   this.selectedsAll.concat(this.selecteds)
      this.selectedsAll =    this.selectedsAll.concat(this.selecteds1)
      this.radio = undefined;


      // });
    },
    getSelectCondition () {
      selectTypeList().then(res => {
        this.searchItem['device'].res = res.data.data
      });
      // selectModelList().then(res => {
      //   this.searchItem['model'].res = res.data.data;
      // });
      getListItem('machine').then(res => {
        this.searchItem['machine'].res = res.data.data
      });
      getListItem('class').then(res => {
        this.searchItem['class'].res = res.data.data
      });

    },
    getSelect (item) {
      if (item === 'device') {
        selectTypeList().then(res => {
          this.searchItem[item].res = res.data.data
        });
      } if (item === 'model') {
        selectModelList().then(res => {
          this.searchItem[item].res = res.data.data;
        });
      } else {
        getListItem(item).then(res => {
          this.searchItem[item].res = res.data.data
        });
      }
    },
    searchInputFather (inputValue) {
      this.query['a.name'] = inputValue.name
      this.onLoad(this.page)
    },
    callFather (parm) {
      this.page.currentPage = parm.currentPage
      this.onLoad(this.page)
    },
    onLoad (page, params = {}) {
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.data = data.records;
      });
    },
    onLoadExist(page, params = {}) {
      this.query1['b.status_equal'] = 1
      this.query1['a.typeId'] = undefined
      designedSelectList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query1)
      ).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.data = data.records;
      });
    },
    searchFather (label, item) {
      switch (label) {
        case '项目':
       
          // selectTypeList(item.dictKey, undefined).then(res => {
          //   this.searchItem['device'].res = res.data.data;
          // });
         if(this.projectId && this.projectId.length>0){
              this.query1["d.project_equal"] = item.dictKey;
              this.query1["c.parentId_equal"] = undefined;
              this.query1["a.typeId_equal"] = undefined;
            
              selectTypeList1(this.projectId[1], item.dictKey,undefined,1).then(res => {
                this.searchItem["device"].res = res.data.data;
              });
          }else{
          this.query['b.project_equal'] = item.dictKey
          // this.query['g.parentId_equal'] = undefined
          this.query['a.typeId'] = undefined
          this.name = undefined
          this.model = undefined
          this.equipment = undefined


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
        case '类别':
     
          // selectTypeList(undefined, item.dictKey).then(res => {
          //   this.searchItem['device'].res = res.data.data;
          // });
          if(this.projectId && this.projectId.length>0){
              this.query1["d.type_equal"] = item.dictKey;
              this.query1["c.parentId_equal"] = undefined;
              this.query1["a.typeId_equal"] = undefined;
            
              selectTypeList1(this.projectId[1],undefined, item.dictKey,1).then(res => {
                this.searchItem["device"].res = res.data.data;
              });
          }else{
             this.query['b.type'] = item.dictKey
              // this.query['g.parentId_equal'] = undefined
              this.query['a.typeId'] = undefined
              this.name = undefined,
              this.equipment = undefined

            selectTypeList(undefined, item.dictKey).then(res => {
              this.searchItem["device"].res = res.data.data;
            });
          }
          this.isShow = false
          break;
        case '型号':
          // this.query['b.typeId_equal'] = item.id
          this.typeId = item.id
          this.model = item.name
          if(this.projectId && this.projectId.length>0 && item.id){
            this.query1["c.id_equal"] = item.id;
          }
          break;
        case '设备':
          // this.query['g.parentId_equal'] = item.id
        
          //过滤对应的型号
          // selectModelList(item.id).then(res => {
          //   this.searchItem['model'].res = res.data.data;
          // });
          // if(item.id){
          //   this.isShow = true
          //    //过滤对应的型号
          //   selectModelList(item.id).then(res => {
          //     this.searchItem['model'].res = res.data.data;
          //   });
          // }else{
          //   this.isShow = false
          // }
        if(item.id){
            this.isShow = true
             //过滤对应的型号
              if(this.projectId && this.projectId.length>0){
                  this.query1["c.parentId_equal"] = item.id;
                  this.query1["a.typeId_equal"] = undefined;
        
                   selectModelList1(this.projectId[1],item.id,1).then(res => {
                    this.searchItem['model'].res = res.data.data;
                  });

              }else{
                  this.query['a.typeId'] =  item.id
                  this.equipment = item.name
                  this.model = undefined
                  this.name = undefined
                  this.typeId = undefined
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
      }
      // this.onLoad(this.page)
     if(this.projectId && this.projectId.length>0 ){
        // this.query1["a.id_notin"] = this.ids1 由于需求原因不进行过滤
        this.onLoadExist(this.page)
        return
      }
      // this.query["a.id_notin"] = this.ids 由于需求原因不进行过滤
      this.onLoad(this.page);

    },
  }
};
</script>

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
    color: #303133;
    margin: 0 auto;
    background-color: #fff;
    font-size: 14px;
    padding: 10px 20px 5px 20px;

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
