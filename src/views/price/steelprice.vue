<template>
  <div class="container">
    <div class="main">
      <div class="left">
        <div class="name">钢材</div>
        <div class="cur-price">当前价格</div>
        <div class="content">
          <span class="value">{{newest}}</span>
          <cbutton title='修改' type='edit' @clickButton="openDialog()"></cbutton>
        </div>
        <div class="tip">历史价格</div>
        <avue-crud :data="data" :option="option" :page="page" v-model="obj" @on-load="onLoad"></avue-crud>
      </div>
      <div class="right">
        <div id="echartContainer" style="width:100%; height:100%"></div>
      </div>
    </div>


  <el-dialog title="修改" :visible.sync="editFormVisible" width="30%">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
 
        <el-form-item label="价钱" prop="price">
          <el-input size='mini' v-model="form.price"></el-input>
        </el-form-item>

      <el-form-item label="备注" prop="remark">
          <el-input size='mini' v-model="form.remark"></el-input>
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
import { getList, newest, chart,add } from "@/api/platform_device/steelprice"
var echarts = require("echarts");
export default {
  data() {
    return {
      newest: undefined,
      form:{},
      rules:{
          price: [{ required: true, message: '请输入价钱', trigger: 'blur' }],        
      },
      chartData: {
        data: [],
        date: []
      },
      editFormVisible: false,
      data: [],
      obj: {},
      query: {
        sequenceId_equal: undefined
      },
      page: {
        pageSize: 5,
        currentPage: 1,
        total: 1,
      },
      option: {
        width: '50%',
        index: true,
        border: true,
        refreshBtn: false,
        page: true,
        header: false,
        align: 'center',
        addBtn: false,
        menu: false,
        stripe: true,
        column: [
          { label: '钢材价格', prop: 'price' },
          { label: '备注', prop: 'remark' },
          { label: '调整时间', prop: 'createTime' },
          { label: '调整人', prop: 'createUser' },
        ],
      }
    }
  },
  components: {
  },
  computed: {

  },
  mounted() {
     initChart()
  },
  created() {
    initNewest()
  },
  methods: {
    openDialog(){
      this.editFormVisible = true
    },
    closeDialog(){
      this.editFormVisible = false
    },
    onLoad(page, params = {}) {
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.data = data.records;
      });
    },
    initNewest(){
         newest().then(res => {
            this.form.id = res.data.data.id
            this.newest = res.data.data.price
          });
    },
    initChart(){
       var myChart = echarts.init(document.getElementById("echartContainer"));
            chart().then(res => {
                  this.chartData = res.data.data
                  // 绘制图表
                  myChart.setOption({
                    color: ['#3398DB'],
                    title: {
                      text: '月度关系',
                      left: 'center'
                    },
                    tooltip: {
                      trigger: 'axis',
                      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                      }
                    },
                    grid: {
                      bottom: 20
                    },
                    xAxis: [
                      {
                        name: '时间',
                        type: 'category',
                        data: this.chartData.date,
                        axisTick: {
                          alignWithLabel: true
                        }
                      }
                    ],
                    yAxis: [
                      { name: '价格', type: 'value' }
                    ],
                    series: [
                      {
                        name: '钢材价格',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.chartData.data
                      }
                    ]
                  });
                });
    },
    submitForm(editData){
        this.$refs[editData].validate(valid => {
        if (valid) {
          add(this.form).then(res => {
            initNewest()
            getList(this.page.currentPage, this.page.pageSize, {}).then(res => {
              const data = res.data.data;
              this.page.pages = data.pages;
              this.data = data.records;
            });

            initChart()
            this.editFormVisible = false
         
          });
        }
      })
    },
  }
};
</script>

<style lang="stylus" scoped>
.container
  margin: 20px 40px
  width: auto
  .main
    display: flex
    // position absolute
    border: 1px solid #89c3f8
    padding: 10px 20px
    background-color: #fff
    .left, .right
      flex: 1
    .left
      padding-right 20px
      .name
        font-size: 16px
        color: #303133
      .cur-price
        text-align: center
        font-size: 16px
      .content
        text-align: center
        margin: 10px 0 30px 0
        .value
          font-size: 30px
          color: #e6a23c
          margin-right: 20px
          &:before
            padding-right: 10px
            content: '¥'
      .tip
        color: #606266
        font-size: 14px
        margin: 0 10px 10px 10px
    .right
        padding-top 100px
      // postion:fixd;
      // bottom:0px
      // margin:0px
</style>
