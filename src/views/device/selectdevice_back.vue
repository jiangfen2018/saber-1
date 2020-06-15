<template>
  <div class="container">
    <searchStyle02 :data='searchInput' @searchInputFather="searchInputFather"></searchStyle02>
    <searchStyle01 :data='searchItem.machine' @searchFather="searchFather" name='dictValue'></searchStyle01>
    <searchStyle01 :data='searchItem.class' @searchFather="searchFather" name='dictValue'></searchStyle01>
    <searchStyle01 :data='searchItem.device' @searchFather="searchFather"   ></searchStyle01>
    <searchStyle01 :data='searchItem.model'   @searchFather="searchFather"  ></searchStyle01>
  
    <div class="part-box">
      <h3>已选中</h3>
      <div class="item" v-for="item in selectParts" :key='item.id'>
           <div class="selectedlist">
                  <div class="detail" >
                     <p> <span>{{item.equipment}}</span></p>
                    <p><label>标准号</label><span>{{item.standard}}</span></p>
                    <p><label>图号</label><span>{{item.chart}}</span></p>
                    <p><label>数量</label><span>  {{item.number}} </span></p>
                    <div class="close-button">
                      <el-button size="mini" icon="el-icon-close" circle @click="deletePart(item)"></el-button>
                    </div>
                  </div>
                </div>
      </div>
    </div>

    <div class="part-box">
      <h3>选择设备</h3>
      <el-radio v-model="radio" v-for='item in data' :key='item.id' :label="item.id" @change="changeRadio">
                 <div class="list">
                  <div class="detail">
                    <p><label>标准号</label><span>{{item.standard}}</span></p>
                    <p><label>图号</label><span>{{item.chart}}</span></p>
                    <p><label>重量（吨）</label><span>{{item.weight}}</span></p>
                    <p><label>数量</label><span>  <cinput v-model="num" ></cinput> </span></p>
                    <p><label>参数</label><span>{{item.param}}</span></p>
                    
                  </div>
                </div>
        </el-radio>
      <cpagination v-bind:child-msg="page" @callFather='callFather'></cpagination>
    </div>
    <div class="btn-box">
      <el-button type="primary" @click="selectedsave">确定</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script>
import { getListItem } from "@/api/system/dict";
import { selectTypeList, selectModelList } from "@/api/platform_device/devicetype";
import { getList, selected, tempsave, removetemp, selectedsave } from "@/api/customer/orderequipmentlisttemp";

export default {
  data() {
    return {
      selectParts: [],
      radio: undefined,
      num: undefined,
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
        'a.parentId_notlike': undefined,
        'a.status': 0,
        'projectId': this.$route.query.id
      },
      ids: '',
      nums: ''
    }
  },
  computed: {
  },
  components: {

  },
  created() {
        
    // this.getSelect('machine')
    // this.getSelect('class')
    // this.getSelect('device')
    // this.getSelect('model')
    this.getSelectCondition()
    if (this.$route.query.id) {
      this.selected()
    }
  },

  methods: {
     
    selectedsave() {
      if (this.$route.query.id && this.ids.length > 0) {
        selectedsave(this.ids, this.nums, this.$route.query.id).then(res => {
          this.$router.push({
            name: '项目详情',
            path: '/customer/projectDetail',
            query: {
              id: this.$route.query.id
            }
          })
          });
      }else{
         this.$message({ type: "error", message: "请至少选中一个！!" });
      }
    },
    deletePart(item) {
      removetemp(item.id).then(res => {
        console.log(res);
        this.selected()
      });
    },
    changeRadio(val) {
      if (this.$route.query.id) {
        if(!this.num){
          this.$message({ type: "error", message: "请填写数量!" });
          this.radio = undefined
          return
        }
        tempsave({
          number:this.num,
          sequenceId: val,
          projectId: this.$route.query.id
        }).then(res => {
          console.log(res);
          this.num = undefined
          this.selected()
        
          // this.query['a.id_notin'] = this.ids
          // this.onLoad(this.page)
          
        });
      }
    },
    selected() {
    
      selected({ projectId: this.$route.query.id,status:0 }).then(res => {
         
        this.selectParts = res.data.data
        this.ids = ''
        this.nums= ''
        this.selectParts.forEach(element => {
          this.ids = this.ids + element.sequenceId + ','
          this.nums = this.nums + element.number + ','
        });
        // this.query['a.id_notin'] = this.ids 由于需求原因不进行过滤
        this.onLoad(this.page)
        this.radio = undefined
        // this.num=undefined
      });
    },
    getSelectCondition(){
      selectTypeList().then(res => {
           this.searchItem['device'].res = res.data.data
         });
      selectModelList().then(res => {
         this.searchItem['model'].res = res.data.data;
       });
       getListItem('machine').then(res => {
          this.searchItem['machine'].res = res.data.data
        });
       getListItem('class').then(res => {
          this.searchItem['class'].res = res.data.data
        });

    },
    getSelect(item) {
      if (item === 'device') {
          selectTypeList().then(res => {
           this.searchItem[item].res = res.data.data
         });
      } if(item === 'model'){
        selectModelList().then(res => {
         this.searchItem[item].res = res.data.data;
       });
      }else {
        getListItem(item).then(res => {
          this.searchItem[item].res = res.data.data
        });
      }
    },
    searchInputFather(inputValue) {
      this.query['name'] = inputValue.name
      this.onLoad(this.page)
    },
    callFather(parm) {
      this.page.currentPage = parm.currentPage
      this.onLoad(this.page)
    },
    onLoad(page, params = {}) {
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.data = data.records;
      });
    },
    searchFather(label, item) {
      switch (label) {
        case '项目':
          this.query['g.project_equal'] = item.dictKey
          break;
        case '类别':
          this.query['g.type'] = item.dictKey
          break;
        case '型号':
          this.query['a.typeId_equal'] = item.id
          break;
        case '设备':
          this.query['g.parentId_equal'] = item.id
          break;
        default:
          break;
      }
      this.onLoad(this.page)
    },
  }
};
</script>

<style lang="stylus" scoped>
.container
  margin: 20px 40px
  width: auto
  .part-box
    background-color: #ffffff
    padding: 10px 20px 20px 20px
    margin-top: 20px
    h3
      color: #606266
      font-size: 16px
      font-weight: normal
    .item
      display: flex
      align-items: center
      display: inline-block
      margin-right: 30px
      .name
        display: inline-block
        padding: 2px 0
        width: 150px
        height: 30px
        background: #8693f3
        color: #ffffff
        font-size: 14px
        text-align: center
        line-height: 30px
        margin-right: 10px
  .btn-box
    text-align: center
    margin-top: 20px


.list
  width: 292px
  margin: 2px 2px 0 2px
  .detail
    color: #303133
    margin: 0 auto
    background-color: #fff
    font-size: 14px
    padding: 10px 20px 5px 20px
    input 
      width 150px
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


.selectedlist
  width: 292px
  margin: 2px 2px 0 2px
  .detail
    position:relative
    color: #303133
    margin: 0 auto
    background-color: #3c8dc4
    font-size: 14px
    padding: 20px 30px 10px 30px
    p
      color: #fff
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
    .close-button
      position:absolute;
      width:10px;
      height:10px;
      right:25px;
      top:10px;
      z-index:100;
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
</style>
