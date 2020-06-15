<template>
  <!-- 废弃项目详情选择设备  与selectdevice4 使用同一个 用status 来区别设备 配件 -->
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
    <searchStyle01 :data='searchItem.device' v-show="isShow2"
                   @searchFather="searchFather"></searchStyle01>
    <searchStyle01 :data='searchItem.model' v-show="isShow"
                   @searchFather="searchFather"></searchStyle01>

    <div class="part-box">
      <h3>已选中</h3>
      <div class="item"
           v-for="item in selectParts"
           :key='item.id'>
        <div class="selectedlist">
          <div class="detail">
            <p><label>项目名称</label><span>{{item.customerName}}({{item.projectName}})</span></p>
            <p><label>型号</label><span>{{item.model}}-{{item.name}}</span></p>
            <p> <span>{{item.equipment}}</span><span v-show="item.standards && item.standards!=' '">({{item.standards}}) &nbsp;&nbsp;{{item.num}} </span></p>
            <p><label>标准号</label><span>{{item.standard}}</span></p>
            <p><label>图号</label><span>{{item.chart}}</span></p>
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
      <h3>选择设备</h3>
        <!-- 单选框组件 -->
       <radioPart04 :deviceData="deviceData"  :flag="flag"></radioPart04>
       <cpagination v-bind:child-msg="page"
                   @callFather='callFather'></cpagination>
    </div>
    <div class="btn-box">
      <el-button type="primary"
                 @click="selectedPost">确定</el-button>
      <el-button @click="closeSelectDialog">取消</el-button>
    </div>
  </div>
</template>

<script>
import radioPart04 from "@/components/radioPart04";
import { getListItem } from "@/api/system/dict";
import { selectTypeList, selectModelList } from "@/api/platform_device/devicetype";
import { getList, selected, tempsave, removetemp, selectedsave } from "@/api/customer/orderequipmentlisttemp";
import { partSelectedSave, designedSelectList, selectTypeList as selectTypeList1,selectModelList as selectModelList1 } from "@/api/platform_device/project";
import {  selectOrderCustomerList2} from "@/api/customer/customer";
export default {
  data () {
    return {
      flag:true,
      selectParts: [],
      selectDataCustomer:[],
      isShow: false,
      isShow2: false,
      radio: undefined,
      num: undefined,
      page: {
        pageSize: 50,
        pages: 1,
        currentPage: 1,
      },
      deviceData: [],
      searchInput: [{ name: '名称', value: '1', label: 'name', type: 'input' }],
      searchItem: {
        machine: { label: '项目', res: [] },
        class: { label: '类别', res: [] },
        device: { label: '设备', res: [], },
        model: { label: '型号', res: [], }
      },
      query: {
        'a.parentId_notlike': undefined,
        'b.status_equal': 1,
        // 'g.job_type_equal': 0,
      },
      projectId:undefined,
      typeIds: '',
      ids: '',
      nums: '',

    }
  },
  computed: {
  },
  components: {
radioPart04
  },
  created () {

    // this.getSelect('machine')
    // this.getSelect('class')
    // this.getSelect('device')
    // this.getSelect('model')
    this.getSelectCondition()
    this.selected()
    selectOrderCustomerList2().then(res => {
      this.selectDataCustomer = res.data.data;
    });

  },

  methods: {

    selectedPost () {
      if (this.ids.length > 0) {
        //将选择回调给父类接口
        this.$emit('selectedPost', this.selectParts)
      } else {
        this.$message({ type: "error", message: "请至少选中一个！!" });
      }

    },
    closeSelectDialog () {
      this.$emit('closeSelectDialog')
    },
    deletePart (one) {
      var i = undefined;
      this.selectParts.forEach(function (item, index, arr) {
        if (item.id == one.id) {
          i = index;
        }
      });
      this.selectParts.splice(i, 1);
      this.selected()

    },
    changeRadio (item,num) {
       this.num = num;
      if (!this.num) {
        this.$message({ type: "error", message: "请填写数量!" });
        this.radio = undefined
        return
      }
      item.num = this.num
      this.selectParts.push(item)
      this.selected()
      this.num = undefined
    },
    selected () {
      this.typeIds = ''
      this.ids = ''
      this.nums = ''
      this.selectParts.forEach(element => {
        this.typeIds = this.typeIds + element.typeId + ','
        this.ids = this.ids + element.id + ','
        this.nums = this.nums + element.num + ','
      });

      // this.query['a.id_notin'] = this.ids 由于需求原因不进行过滤
      this.onLoad(this.page)
      this.radio = undefined

      // });
    },
    getSelectCondition () {
      // selectTypeList().then(res => {
      //   this.searchItem['device'].res = res.data.data
      // });
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
      } 
      // if (item === 'model') {
      //   selectModelList().then(res => {
      //     this.searchItem[item].res = res.data.data;
      //   });
      // } 
      else {
        getListItem(item).then(res => {
          this.searchItem[item].res = res.data.data
        });
      }
    },
    searchInputFather (inputValue) {
      this.query['f.name'] = inputValue.name
      this.onLoad(this.page)
    },
    callFather (parm) {
      this.page.currentPage = parm.currentPage
      this.onLoad(this.page)
    },
    onLoad (page, params = {}) {
      this.$nextTick(() => {
        designedSelectList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.pages = data.pages;
          this.deviceData = data.records;
        });
      });

    },
    searchFather (label, item) {
      switch (label) {
        case '项目':
          this.query['d.project_equal'] = item.dictKey
          this.query['d.id_equal'] = undefined
          this.query['a.typeId_equal'] = undefined
          // selectTypeList(item.dictKey, undefined).then(res => {
          //   this.searchItem['device'].res = res.data.data;
          // });
          this.query["a.projectId_equal"] = undefined
          this.projectId = undefined
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
             this.isShow2 = false
          break;
        case '类别':
          this.query['d.type_equal'] = item.dictKey
          this.query['d.id_equal'] = undefined
          this.query['a.typeId_equal'] = undefined
            if (this.projectId && this.projectId.length>0) {
               selectTypeList1( this.projectId[1],undefined, item.dictKey,1).then(res => {
                this.searchItem['device'].res = res.data.data;
              });
            }
         
          break;
        case '型号':
          this.query['a.typeId_equal'] = item.id
          break;
        case '设备':
          this.query['d.id_equal'] = item.id
          this.query['a.typeId_equal'] = undefined
          if(item.id){
            this.isShow = true
             //过滤对应的型号
            
              if (this.projectId && this.projectId.length>0) {
                selectModelList1(this.projectId[1],item.id,1).then(res => {
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
      }
      this.onLoad(this.page)
    },
   changeProject() {
       this.query['a.typeId_equal'] = undefined
       this.query['d.id_equal'] = undefined
       this.query["a.projectId_equal"] = undefined
      //当变化项目的时候 刷新下方设备 显示对应项目的设备列表
      if (this.projectId && this.projectId.length>0) {
        //  this.query1["a.id_notin"] = this.ids1 由于需求原因不进行过滤
         this.query["a.projectId_equal"] = this.projectId[1]; 
       
         selectTypeList1(this.projectId[1], undefined,undefined,1).then(res => {
                this.searchItem["device"].res = res.data.data;
         });
         this.isShow2 = true
      }else{
        this.isShow2 = false
      }
      this.onLoad(this.page);
      this.isShow = false
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
  // width: 292px;
  margin: 2px 2px 0 2px;

  .detail {
       border: 1px #ccc solid;
    border-radius: 5px;
    color: #303133;
    margin: 0 auto;
    background-color: #fff;
    font-size: 14px;
    padding: 10px 20px 5px 20px;
     &:hover {
      transform: translateY(-3px);
      border: 1px #409EFF solid;
      box-shadow: 1px 1px 3px 3px #cccccc;
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
        // color: #303133;
        color:#fff;
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
