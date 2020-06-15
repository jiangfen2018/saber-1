<template>
  <div>
    <div class="container">
      <div class="list">
        <!-- <div class="item-name">筛选</div> -->
        <div class="item-list">
          <span class="item-box">
            <label>客戶</label>
            <el-select
              v-model="customerName"
              filterable
              size="mini"
              style="width: 220px; margin-left: 10px;"
            >
              <el-option
                v-for="item in customerselectData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </span>
          <span class="item-box" style="float:left">
            <label>供应商</label>
            <el-input v-model="supplier" clearable class="my-input" size="mini"></el-input>
          </span>
          <span class="item-box">
            <label>名称</label>
            <el-select
              v-model="equipmentName"
              filterable
              size="mini"
              style="width: auto; margin-left: 10px;"
            >
              <el-option
                v-for="item in equipmentselectData"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </span>
          <!-- <span class="item-box" style="float:left">
            <label>到货时间</label>
            <el-date-picker
              style=" margin-left: 10px;"
              v-model="arrivalTime"
              size="mini"
              type="date"
              placeholder="选择日期"
              @change="changeTime"
            ></el-date-picker>
          </span>-->
          <span class="search-btn" @click="searchInputFather()">查询</span>
          <span class="search-btn" @click="resetForm()">重置</span>
           <span class="search-btn" @click="addFormVisible = true" style="margin-left: 40px">添加常用件</span>
        </div>
         
         
      </div>


     <el-dialog title="变更时间"  :visible.sync="changeFormVisible" width="20%">
      <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="原先时间"  prop="material">
          {{form.createTime}}
        </el-form-item>
        <el-form-item label="变更时间"  prop="num">
           <el-date-picker
              style=" margin-left: 10px;"
              v-model="form.changeTime"
              size="mini"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button  size="mini" type="primary" @click="estimatedArrivalChangeComplete">变更</el-button>
          <el-button  size="mini"  @click="changeFormVisible = !changeFormVisible">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

      <avue-crud
        :data="data"
        :option="option"
        :page.sync="page"
        v-model="obj"
        @row-update="editRow"
        @on-load="onLoad"
      >



       <!-- 请购 -->
        <template slot="requisition" slot-scope="scope">
          <el-row     v-if="scope.row.num-scope.row.requisitionTotal!=0">
            <el-popover width="300"   :ref="`popover-${scope.row.id}-${scope.row.$index}`" >
              <el-row>
               {{requisitionNumArr[scope.row.$index]}}
                <el-col :span="8">
                  <el-input-number
                    v-model="requisitionNumArr[scope.row.$index]"
                    :min="0"
                    :max="scope.row.num-scope.row.requisitionTotal"
                    size="mini"
                  ></el-input-number>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-date-picker
                    v-model="requisitionDateArr[scope.row.$index]"
                    type="date"
                    size="mini"
                    placeholder="选择日期"
                  ></el-date-picker> 
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-button
                    type="primary"
                    style
                    size="mini"
                    :loading="loading"
                    @click="requisitionComplete(scope.row)"
                    plain
                  >确认 </el-button>
                </el-col>
              </el-row>

              <span slot="reference"   @click="requisitionShowAddContent($event,scope.row)" >
                <span
                  
                
                  style="color:red"
                >{{(scope.row.num-scope.row.requisitionTotal)+'件待请购' }}</span>
              </span>
            </el-popover>
          </el-row>

            <el-row
              v-for="(requisition,index) in scope.row.requisitionList"
              :key="requisition.id"
              style="font-size:6px">

           <el-row  >
                   <span  >
                      {{requisition.createTime}}(
                      <span
                        :style="{color:requisition.checked==1?'green':''}"
                        v-if="requisition.completedNum && requisition.completedNum!=0"
                      >请购{{requisition.completedNum}}件 </span>
                     
                    )
                    </span>
            </el-row>
          </el-row>
        </template>


     <!-- 物流已发货 -->
        <template slot="deliver" slot-scope="scope">
          <el-row     v-if="scope.row.num-scope.row.deliverTotal!=0">
            <el-popover width="300"  >
              <el-row>
                <el-col :span="8">
                  <el-input-number
                    v-model="deliverNumArr[scope.row.$index]"
                    :min="0"
                    :max="scope.row.num-scope.row.deliverTotal"
                    size="mini"
                  ></el-input-number>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-date-picker
                    v-model="deliverDateArr[scope.row.$index]"
                    type="date"
                    size="mini"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-button
                    type="primary"
                    style
                    size="mini"
                    :loading="loading"
                    @click="deliverComplete(scope.row)"
                    plain
                  >确认</el-button>
                </el-col>
              </el-row>

              <span slot="reference"   @click="deliverShowAddContent($event,scope.row)">
                <span
              
                
                  style="color:red"
                >{{(scope.row.num-scope.row.deliverTotal)+'件待发货' }}</span>
              </span>
            </el-popover>
          </el-row>

            <el-row
              v-for="(deliver,index) in scope.row.deliverList"
              :key="deliver.id"
              style="font-size:6px">

           <el-row  >
                   <span  >
                      {{deliver.createTime}}(
                      <span
                        :style="{color:deliver.checked==1?'green':''}"
                        v-if="deliver.completedNum && deliver.completedNum!=0"
                      >发货{{deliver.completedNum}}件 </span>
                    )
                    </span>
            </el-row>
          </el-row>
        </template>





        <!-- 预计到货 -->
        <template slot="estimatedArrival" slot-scope="scope">
          <el-row     v-if="scope.row.num-scope.row.estimatedArrivalTotal!=0">
            <el-popover width="300" v-model="estimatedArrivalShow[scope.row.$index]" >
              <el-row>
                <el-col :span="8">
                  <el-input-number
                    v-model="estimatedArrivalNumArr[scope.row.$index]"
                    :min="0"
                    :max="scope.row.num-scope.row.estimatedArrivalTotal"
                    size="mini"
                  ></el-input-number>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-date-picker
                    v-model="estimatedArrivalDateArr[scope.row.$index]"
                    type="date"
                    size="mini"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-button
                    type="primary"
                    style
                    size="mini"
                    @click="estimatedArrivalComplete(scope.row)"
                    plain
                   :loading="loading"
                  >确认</el-button>
                </el-col>
              </el-row>

              <span slot="reference"  @click="estimatedArrivalShowAddContent($event,scope.row)">
                <span
              
                 
                  style="color:red"
                >{{(scope.row.num-scope.row.estimatedArrivalTotal)+'件待确认' }}</span>
              </span>
            </el-popover>
          </el-row>

            <el-row
              v-for="(estimatedArrival,index) in scope.row.estimatedArrivalList"
              :key="estimatedArrival.id"
              style="font-size:6px">

           <el-row  >
                   <span   @click="estimatedArrivalChangeShowContent(scope.row,index)">
                      {{estimatedArrival.createTime}}(
                      <span
                        :style="{color:estimatedArrival.checked==1?'green':''}"
                        v-if="estimatedArrival.completedNum && estimatedArrival.completedNum!=0"
                      >预计到达{{estimatedArrival.completedNum}}件 </span>
                      <span v-for="change in estimatedArrival.changeList" :key="change.id" style="color:red">
                        ,变更：{{change.createTime}}到达
                     </span>
                    )
                    </span>
            </el-row>
          </el-row>
        </template>






        <!-- 入库 -->
        <template slot="warehouse" slot-scope="scope">
          <el-row     v-if="scope.row.estimatedArrivalTotal-scope.row.warehouseTotal!=0">
            <el-popover width="300" v-model="warehouseShow[scope.row.$index]"  >
              <el-row>
                <el-col :span="8">
                  <el-input-number
                    v-model="warehouseNumArr[scope.row.$index]"
                    :min="0"
                    :max="scope.row.estimatedArrivalTotal-scope.row.warehouseTotal"
                    size="mini"
                  ></el-input-number>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-date-picker
                    v-model="warehouseDateArr[scope.row.$index]"
                    type="date"
                    size="mini"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-button
                    type="primary"
                    style
                    size="mini"
                    @click="warehouseComplete(scope.row)"
                    plain
                    :loading="loading" 
                  >确认</el-button>
                </el-col>
              </el-row>

              <span slot="reference"  @click="warehouseShowAddContent($event,scope.row)">
                <span
              
                 
                  style="color:red"
                >{{(scope.row.estimatedArrivalTotal-scope.row.warehouseTotal)+'件待确认' }}</span>
              </span>
            </el-popover>
          </el-row>

            <el-row v-for="warehouse in scope.row.warehouseList" :key="warehouse.id">
              {{warehouse.createTime}}(
              <span
                :style="{color:warehouse.checked==1?'green':''}"
                v-if="warehouse.completedNum && warehouse.completedNum!=0"
              >入库{{warehouse.completedNum}}件</span>
              )
            </el-row>
        </template>
      </avue-crud>
    </div>



  <!-- 添加设备 -->
    <el-dialog title="新增常用件"  :visible.sync="addFormVisible" width="40%"   >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="类型"  prop="type"> 
          <el-select v-model="form.type" size="mini" style="width:auto;" disabled  >
            <el-option
              v-for="item in selectList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="图号"  prop="chart">
          <el-input v-model="form.chart" @input="change($event)"></el-input>
        </el-form-item> -->

        <el-form-item label="名称"  prop="name">
          <el-input v-model="form.name"  @input="change($event)"></el-input>
        </el-form-item>
        <el-form-item label="材料"  prop="material">
          <el-input v-model="form.material"  @input="change($event)"></el-input>
        </el-form-item>
        <el-form-item label="数量"  prop="num">
          <el-input-number v-model="form.num"  @input="change($event)"></el-input-number>
        </el-form-item>
        <el-form-item label="规格"  prop="standards">
          <el-input v-model="form.standards"  @input="change($event)"></el-input>
        </el-form-item>
        <el-form-item label="备注"  prop="remark">
          <el-input v-model="form.remark"  @input="change($event)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认新增</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>




  </div>
</template>

<script>
import {
  add,
  update,
  purchaselist,
  customerSelect,
  equipmentSelect
} from "@/api/platform_device/progressequipmentlist";
// import { updateJobEquipmentList } from "@/api/platform_device/projectjob";
export default {
  data() {
    return {
      customerName: "",
      equipmentName: "",
      loading:false,
      form:{},
      selectList: [],
      rules: {
        supplier: [{ required: true, message: "请输入供应商", trigger: "blur" }]
      },
      supplier: "",
      arrivalTime: "",
      data: [],
      obj: {},
      page: {
        pageSize: 10,
        pages: 1,
        currentPage: 1,
        total: 0
      },
      addFormVisible : false,
      form: {type:3,name:'',chart:'',material:'',num:'',standards:'',remark:''},
      selectList: [
        { id: 1, title: "自制件" },
        { id: 2, title: "外购件" },
        { id: 3, title: "常用件" }
      ],
      customerselectData: [],
      equipmentselectData: [],
      customerNames: [],
      query_part: {},
      query: {},
      estimatedArrivalShow: [],
      estimatedArrivalNumArr: [],
      estimatedArrivalDateArr: [],
      estimatedArrivalCompleteShow: [],
      estimatedArrivalCompleteShowList: [],
      estimatedArrivalCompleteShow: [],
      estimatedArrivalChangeShow:[],
      estimatedArrivalChangeDateArr:[],
      requisitionShow:[false,false,false,false,false,false,false,false,false,false],
      requisitionNumArr:[],
      requisitionDateArr:[],
      deliverShow:[],
      deliverNumArr:[],
      deliverDateArr:[],
      warehouseShow: [],
      warehouseShowList: [],
      warehouseNumArr: [],
      warehouseDateArr: [],
      warehouseCompleteShow: [],
      warehouseCompleteShowList: [],
      warehouseCompleteShow: [],
      changeFormVisible:false,
      option: {
        width: "100%",
        index: true,
        border: true,
        refreshBtn: false,
        page: true,
        header: false,
        align: "center",
        menu: true,
        delBtn: false,
        cellBtn: true,
        editBtn: false,
        stripe: true,
        column: [
          { label: "客户", prop: "customerName",
          formatter(row, value, label, column) {
            if(row.jobEquipmentListId==-2){
              return '通用'
            }
            return value
          } },
          { label: "项目", prop: "projectName",formatter(row, value, label, column) {
               if(row.jobEquipmentListId==-2){
                  return '通用'
                }
                 return value
          } },
          { label: "设备", prop: "device" ,formatter(row, value, label, column) {
              if(row.jobEquipmentListId==-2){
                return '常用件'
              }
               return value
          }},
           { label: "名称", prop: "name" },
          { label: "材料", prop: "material" },
          { label: "型号/规格", prop: "standards" },
          { label: "数量", prop: "num" },
             {
            label: "需求日期",
            prop: "requisition",
            slot: true,
            formatter(row, value, label, column) {}
          },
         
          { label: "供应商", prop: "supplier", cell: true },
          { label: "备注", prop: "remark", cell: true },
          {
            label: "物流已发货",
            prop: "deliver",
            slot: true,
            formatter(row, value, label, column) {}
          },
          {
            label: "预计到货",
            prop: "estimatedArrival",
            slot: true,
            formatter(row, value, label, column) {}
          },
          {
            label: "入库",
            prop: "warehouse",
            slot: true,
            formatter(row, value, label, column) {}
          }
        ]
      }
    };
  },
  created() {
    this.onLoad(this.page);
    this.customerSelectFn();
    this.equipmentSelectFn();
  },
  methods: {
    customerSelectFn() {
      customerSelect().then(res => {
        this.customerselectData = res.data.data;
      });
    },
    equipmentSelectFn(params = {}) {
      this.query["a.name"] = undefined;
      this.query["e.name"] = undefined;
      equipmentSelect(Object.assign(params, this.query)).then(res => {
        this.equipmentselectData = res.data.data;
      });
    },
    onLoad(page, params = {}) {
      this.query_part["a.type_gt"] = 1;
      purchaselist(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query_part)
      ).then(res => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
      });
    },
    changeTime(value) {
      //    if (value == null){
      //       this.query_part["a.createTime_datege"] = undefined
      //       this.query_part["a.createTime_datele"] = undefined
      //    }
    },
    searchInputFather(inputValue) {
      this.query_part["e.id"] = this.customerName;
      this.query_part["a.name"] = this.equipmentName;
      this.query_part["supplier"] = this.supplier;

      //   if (this.arrivalTime) {
      //     this.query_part["a.createTime_datege"] = this.arrivalTime[0];
      //     this.query_part["a.createTime_datele"] = this.arrivalTime[1].replace(
      //       "00:00:00",
      //       "24:60:60"
      //     );
      //   }
      this.onLoad(this.page);
    },
    resetForm() {
      this.query_part["e.id"] = this.customerName = undefined;
      this.query_part["a.name"] = this.equipmentName = undefined;
      this.query_part["supplier"] = this.supplier = undefined;
    },
    editRow(form, index, done, loading) {
      loading();
      //提交修改
      var data = {};
      data.id = form.id;
      data.supplier = form.supplier;
      data.remark = form.remark;
      update(data)
        .then(res => {
          this.$message({ type: "success", message: "更新成功!" });
          done();
        })
        .catch(error => {
          this.$message({ type: "error", message: "更新失败 请联系管理员!" });
          done();
        });
      //   }
    },
    estimatedArrivalComplete(row) {
      this.loading = true
      var info = {};
      info.id = row.id;
      var item = {};
    
      item.completedNum = this.estimatedArrivalNumArr[row.$index];
      item.createTime = this.$options.filters["timeFilter"](
        this.estimatedArrivalDateArr[row.$index]
      );
    if(!this.judgeNull( item.completedNum)) return
      if(!this.judgeNull( item.createTime)) return

      row.estimatedArrivalList.push(item);
      info.estimatedArrival = JSON.stringify(row.estimatedArrivalList);
      update(info)
        .then(res => {
          //刷新表格
          this.onLoad(this.page);
           this.loading = false
          this.$message.success("提交成功");
        })
        .catch(error => {
           this.loading = false
          this.$message.error("提交失败");
        });
      this.$set(this.estimatedArrivalShow, row.$index, false);
    },
    estimatedArrivalShowAddContent(e,row) {
      // this.completedNum = row.num-rowestimatedArrivalTotal
      this.$set( this.estimatedArrivalNumArr,row.$index,row.num - row.estimatedArrivalTotal)
      // this.estimatedArrivalNumArr[row.$index] =
        // row.num - row.estimatedArrivalTotal;
      // this.estimatedArrivalShow[row.$index] = true
      // this.$set(this.estimatedArrivalShow, row.$index, true);
       const popoverEl = e.target.parentNode.parentNode
      this.$set(popoverEl,'showPopper' ,true)
    },
    warehouseShowAddContent(e,row) {
      // this.completedNum = row.num-rowestimatedArrivalTotal
      this.$set( this.warehouseNumArr,row.$index, row.estimatedArrivalTotal - row.warehouseTotal)
      // this.warehouseNumArr[row.$index] =
        // row.estimatedArrivalTotal - row.warehouseTotal;
      // this.estimatedArrivalShow[row.$index] = true
      // this.$set(this.warehouseShow, row.$index, true);
       const popoverEl = e.target.parentNode.parentNode
      this.$set(popoverEl,'showPopper' ,true)
    },
   warehouseComplete(row){
      this.loading = true
        var info  = {}
        info.id = row.id
        var item = {}
        item.completedNum =  this.warehouseNumArr[row.$index]
        item.createTime=this.$options.filters["timeFilter"]( this.warehouseDateArr[row.$index])
        if(!this.judgeNull( item.completedNum)) return
      if(!this.judgeNull( item.createTime)) return

        row.warehouseList.push(item)
        info.warehouse = JSON.stringify( row.warehouseList)
        update(info).then(res=>{
          //刷新表格
           this.onLoad(this.page);
            this.loading = false
           this.$message.success("提交成功");
        }).catch(error=>{
           this.loading = false
           this.$message.error("提交失败");
        })
        this.$set(this.warehouseShow,row.$index, false)
  },

  estimatedArrivalChangeComplete(row) {
      var info = {};
      info.id =  this.form.id;
    
      if(this.form.changeTime){
        var  index = this.form.arrIndex
        // var changeList =  this.form.estimatedArrivalList[index].changeList
        var change = {}
        change.id = this.form.estimatedArrivalList[index].changeList.length+1
        change.createTime =  this.$options.filters["timeFilter"](this.form.changeTime )
        console.log(this.form.changeTime,change);
        
        this.form.estimatedArrivalList[index]['changeList'].push(change) 
        info.estimatedArrival =  JSON.stringify(this.form.estimatedArrivalList);
      }else{
         this.$message.error("请填写变更时间！");
      }
      update(info)
        .then(res => {
          //刷新表格
          this.onLoad(this.page);
          this.changeFormVisible =false
          this.$message.success("提交成功");
        })
        .catch(error => {
          this.changeFormVisible =false
          this.$message.error("提交失败");
        });
    },
   requisitionChangeShowContent(row,index) {
      // this.completedNum = row.num-rowestimatedArrivalTotal
      // this.estimatedArrivalChangeDateArr[row.$index] =
      this.form = row
      this.form.arrIndex = index
      this.form.createTime = row.requisitionList[index].createTime
      // this.estimatedArrivalShow[row.$index] = true
      this.changeFormVisible = true
      // this.$set(this.estimatedArrivalChangeShow[row.$index], index, true);
    },

    requisitionComplete(row) {
      this.loading = true
      var info = {};
      info.id = row.id;
      var item = {};

      item.completedNum = this.requisitionNumArr[row.$index];
      item.createTime = this.$options.filters["timeFilter"](
        this.requisitionDateArr[row.$index]
      );

      if(!this.judgeNull( item.completedNum)) return
      if(!this.judgeNull( item.createTime)) return
      row.requisitionList.push(item);
      info.requisition = JSON.stringify(row.requisitionList);
      update(info)
        .then(res => {
          //刷新表格
          this.loading = false
          this.$set(this.estimatedArrivalShow, row.$index, false);
          this.onLoad(this.page);
     
          this.$message.success("提交成功");
        })
        .catch(error => {
           this.loading = false
          this.$message.error("提交失败");
        });
     
    },
     requisitionShowAddContent(e,row) {
      // this.completedNum = row.num-rowestimatedArrivalTotal
      this.$set(this.requisitionNumArr,row.$index,row.num - row.requisitionTotal)
      // this.requisitionNumArr[row.$index] =
        // row.num - row.requisitionTotal;
      // this.estimatedArrivalShow[row.$index] = true
      // this.$set(this.requisitionShow, row.$index, true);
        // this.$refs['popover-'+row.id+'-' +row.$index].doShow() 
      const popoverEl = e.target.parentNode.parentNode
      this.$set(popoverEl,'showPopper' ,true)
    },

   requisitionChangeComplete(row) {
      var info = {};
      info.id =  this.form.id;
    
      if(this.form.changeTime){
        var  index = this.form.arrIndex
        // var changeList =  this.form.estimatedArrivalList[index].changeList
        var change = {}
        change.id = this.form.estimatedArrivalList[index].changeList.length+1
        change.createTime =  this.$options.filters["timeFilter"](this.form.changeTime )
        
        this.form.requisitionList[index]['changeList'].push(change) 
        info.requisition =  JSON.stringify(this.form.requisitionList);
      }else{
         this.$message.error("请填写变更时间！");
      }
      update(info)
        .then(res => {
          //刷新表格
          this.onLoad(this.page);
          this.changeFormVisible =false
          this.$message.success("提交成功");
        })
        .catch(error => {
          this.changeFormVisible =false
          this.$message.error("提交失败");
        });
    },
   requisitionChangeShowContent(row,index) {
      // this.completedNum = row.num-rowestimatedArrivalTotal
      // this.estimatedArrivalChangeDateArr[row.$index] =
      this.form = row
      this.form.arrIndex = index
      this.form.createTime = row.requisitionList[index].createTime
      // this.estimatedArrivalShow[row.$index] = true
      this.changeFormVisible = true
      // this.$set(this.estimatedArrivalChangeShow[row.$index], index, true);
    },
    judgeNull(val){
      if( !val ){
         this.loading = false
         this.$message.error("请确认是否漏填！");
        return false
      }
      return true
    },
  deliverChangeShowContent(row,index) {
      // this.completedNum = row.num-rowestimatedArrivalTotal
      // this.estimatedArrivalChangeDateArr[row.$index] =
      this.form = row
      this.form.arrIndex = index
      this.form.createTime = row.deliverList[index].createTime
      // this.estimatedArrivalShow[row.$index] = true
      this.changeFormVisible = true
      // this.$set(this.estimatedArrivalChangeShow[row.$index], index, true);
    },

    deliverComplete(row) {
      this.loading = true
      var info = {};
      info.id = row.id;
      var item = {};

      item.completedNum = this.deliverNumArr[row.$index];
      item.createTime = this.$options.filters["timeFilter"](
        this.deliverDateArr[row.$index]
      );

      if(!this.judgeNull( item.completedNum)) return
      if(!this.judgeNull( item.createTime)) return
      row.deliverList.push(item);
      info.deliver = JSON.stringify(row.deliverList);
      update(info)
        .then(res => {
          //刷新表格
          this.loading = false
          this.$set(this.deliverShow, row.$index, false);
          this.onLoad(this.page);
     
          this.$message.success("提交成功");
        })
        .catch(error => {
           this.loading = false
          this.$message.error("提交失败");
        });
     
    },
   deliverShowAddContent(e,row) {
      // this.completedNum = row.num-rowestimatedArrivalTotal
      this.$set(this.deliverNumArr,row.$index,  row.num - row.deliverTotal)
      // this.deliverNumArr[row.$index] =
        // row.num - row.deliverTotal;
      // this.estimatedArrivalShow[row.$index] = true
      // this.$set(this.deliverShow, row.$index, true);
       const popoverEl = e.target.parentNode.parentNode
      this.$set(popoverEl,'showPopper' ,true)
    },

   deliverChangeComplete(row) {
      var info = {};
      info.id =  this.form.id;
    
      if(this.form.changeTime){
        var  index = this.form.arrIndex
        // var changeList =  this.form.estimatedArrivalList[index].changeList
        var change = {}
        change.id = this.form.deliverList[index].changeList.length+1
        change.createTime =  this.$options.filters["timeFilter"](this.form.changeTime )
        console.log(this.form.changeTime,change);
        
        this.form.deliverList[index]['changeList'].push(change) 
        info.deliver =  JSON.stringify(this.form.deliverList);
      }else{
         this.$message.error("请填写变更时间！");
      }
      update(info)
        .then(res => {
          //刷新表格
          this.onLoad(this.page);
          this.changeFormVisible =false
          this.$message.success("提交成功");
        })
        .catch(error => {
          this.changeFormVisible =false
          this.$message.error("提交失败");
        });
    },
   deliverChangeShowContent(row,index) {
      // this.completedNum = row.num-rowestimatedArrivalTotal
      // this.estimatedArrivalChangeDateArr[row.$index] =
      this.form = row
      this.form.arrIndex = index
      this.form.createTime = row.deliverList[index].createTime
      // this.estimatedArrivalShow[row.$index] = true
      this.changeFormVisible = true
      // this.$set(this.estimatedArrivalChangeShow[row.$index], index, true);
    },
   change(e){
    this.$forceUpdate()
   },
   onSubmit() {
      this.form.jobEquipmentListId = -2;
      if(!this.form.num){
        this.$message.error("请填写数量");
        return
      }
      
      add(this.form)
        .then(res => {
          this.$message.success("添加成功");
          this.addFormVisible = false;
          this.onLoad(this.page);
           })
        .catch(error => {
          this.$message.error("添加失败");
        });
    },
    onCancel() {
      this.addFormVisible = false;
    },
  }
};
</script>

<style lang="stylus" scoped>
.container {
  margin: 20px;
  width: auto;

  .list {
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

    .item-list {
      display: flex;

      .my-input {
        width: auto;
        margin-left: 10px;
      }

      .type {
        margin-right: 20px;
        cursor: pointer;
      }

      .item-box {
        label {
          color: #606266;

          &:after {
            content: ':';
            margin-left: 4px;
          }
        }

        &:nth-child(n+2) {
          margin-left: 20px;
        }
      }

      .search-btn {
        background-color: #8693f3;
        padding: 2px 22px;
        border-radius: 4px;
        color: #fff;
        margin-left: 20px;
        cursor: pointer;
        position: relative;
        top: 2px;
        height: 16px !important;
        line-height: 15px;
      }
    }
  }
}
</style>