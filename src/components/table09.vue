<template>
  <div class="wrapper">
    <!-- <div class="list-box" v-for='device in data' :key="device.id"> -->
    <!--  <h3>{{device.name}}</h3> -->
    <div class="list-box">
      <!-- <div class="container">
        <cbutton class="btn-left-box" title='添加合同' @clickButton='addContract'></cbutton>  
      </div>-->
      <div class="list" v-for="item in data" :key="item.id">
        <table11 :item="item" :option="option_project" @callEditFather="callEditFather"></table11>
        <table11 :item="item" :option="option_price" @callEditFather="callEditFather"></table11>
        <table11 :item="item" :option="option_in" @callEditFather="callEditFather"></table11>
        <table11 :item="item" :option="option_time" @callEditFather="callEditFather"></table11>
      </div>
    </div>

    <!--   </div> -->
    <!-- 合同金额修改 -->
    <el-dialog title="合同金额修改" :visible.sync="editFormVisible1" width="50%">
      <el-form ref="form" :model="form" :rules="rules1" label-width="80px">
        <!-- <h3>金额情况</h3> -->
        <div class="form-box">
          <div class="in-form-box">
            <el-form-item label="合同金额" prop="contractAmount">
              <el-input size="mini" v-model="form.contractAmount"></el-input>
            </el-form-item>
            <el-form-item label="预付款" prop="prepayAmount">
              <el-input size="mini" v-model="form.prepayAmount"></el-input>
            </el-form-item>
            <el-form-item label="提货款" prop="takeAmount">
              <el-input size="mini" v-model="form.takeAmount"></el-input>
            </el-form-item>
            <el-form-item label="质保金" prop="premium">
              <el-input size="mini" v-model="form.premium"></el-input>
            </el-form-item>
            <el-form-item label="安装费" prop="debuggerPrice">
              <el-input size="mini" v-model="form.debuggerPrice"></el-input>
            </el-form-item>
            <el-form-item label="运费" prop="freightPrice">
              <el-input size="mini" v-model="form.freightPrice"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="contractRemark">
              <el-input size="mini" v-model="form.contractRemark"></el-input>
            </el-form-item>
          </div>
        </div>
        <el-form-item style="margin-top:20px">
          <el-button type="primary" @click="submitForm('form')">确定</el-button>
          <el-button type="info" @click="cancel('price')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 收款情况修改 -->
    <el-dialog title="收款情况修改" :visible.sync="editFormVisible2" width="50%">
      <el-form ref="form" :model="form" :rules="rules2" label-width="80px">
        <!-- <h3>金额情况</h3> -->
        <div class="form-box">
          <div class="in-form-box">
            <!-- <el-form-item label="已收金额" prop="receivedAmount">
            <el-input size='mini' v-model="form.receivedAmount"></el-input>
            </el-form-item>-->
            <el-form-item label="预付款" prop="prepayAmountR">
              <el-input size="mini" v-model="form.prepayAmountR"></el-input>
            </el-form-item>
            <el-form-item label="提货款" prop="takeAmountR">
              <el-input size="mini" v-model="form.takeAmountR"></el-input>
            </el-form-item>
            <el-form-item label="质保金" prop="premiumR">
              <el-input size="mini" v-model="form.premiumR"></el-input>
            </el-form-item>
            <el-form-item label="安装费" prop="debuggerPriceR">
              <el-input size="mini" v-model="form.debuggerPriceR"></el-input>
            </el-form-item>
            <el-form-item label="运费" prop="freightPriceR">
              <el-input size="mini" v-model="form.freightPriceR"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="recieveRemark">
              <el-input size="mini" v-model="form.recieveRemark"></el-input>
            </el-form-item>
          </div>
        </div>
        <el-form-item style="margin-top:20px">
          <el-button type="primary" @click="submitForm('form')">确定</el-button>
          <el-button type="info" @click="cancel('in')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 时间管理修改 -->
    <el-dialog title="时间管理修改" :visible.sync="editFormVisible3" width="50%">
      <el-form ref="form" :model="form" :rules="rules3" label-width="80px">
        <!-- <h3>金额情况</h3> -->
        <div class="form-box">
          <div class="in-form-box">
            <span>发货时间</span>
            <el-form-item label="开始时间" prop="deliveryTimeBegin">
              <el-date-picker
                size="mini"
                v-model="form.deliveryTimeBegin"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:100%"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="deliveryTimeEnd">
              <el-date-picker
                size="mini"
                v-model="form.deliveryTimeEnd"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:100%"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <span>调试时间</span>
            <el-form-item label="开始时间" prop="debuggerTimeBegin">
              <el-date-picker
                size="mini"
                v-model="form.debuggerTimeBegin"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:100%"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="debuggerTimeEnd">
              <el-date-picker
                size="mini"
                v-model="form.debuggerTimeEnd"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:100%"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>

            <span>质保时间</span>
            <el-form-item label="质保时长" prop="premiumCycle">
              <el-input size="mini" v-model="form.premiumCycle"></el-input>
            </el-form-item>
            <el-form-item label="启动时间" prop="premiumTimeBegin">
              <el-date-picker
                size="mini"
                v-model="form.premiumTimeBegin"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:100%"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </div>
        </div>
        <el-form-item style="margin-top:10px">
          <el-button type="primary" @click="submitForm('form')">确定</el-button>
          <el-button type="info" @click="cancel('time')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import table11 from "@/components/table11";
import { update } from "@/api/platform_device/contract";
// import { log } from 'util';
export default {
  props: {
    data: {
      type: Array,
      default: function() {
        return [{}];
      }
    }
  },
  data() {
    return {
      editFormVisible1: false,
      editFormVisible2: false,
      editFormVisible3: false,
      form: {},
      rules1: {
        signTime: [
          { required: true, message: "请选择签约时间", trigger: "blur" }
        ],
        contractAmount: [
          { required: true, message: "请输入合同金额", trigger: "blur" }
        ],
        prepayAmount: [
          { required: true, message: "请输入预付款", trigger: "blur" }
        ],
        premium: [{ required: true, message: "请输入质保金", trigger: "blur" }],
        takeAmount: [
          { required: true, message: "请输入提货款", trigger: "blur" }
        ],
        debuggerPrice: [
          { required: true, message: "请输入调试费", trigger: "blur" }
        ],
        freightPrice: [
          { required: true, message: "请输入运费", trigger: "blur" }
        ]
      },
      rules2: {
        // receivedAmount: [
        //   { required: true, message: "请输入已收款金额", trigger: "blur" }
        // ],
        prepayAmountR: [
          { required: true, message: "请输入预付款", trigger: "blur" }
        ],
        premiumR: [
          { required: true, message: "请输入质保金", trigger: "blur" }
        ],
        takeAmountR: [
          { required: true, message: "请输入提货款", trigger: "blur" }
        ],
        debuggerPriceR: [
          { required: true, message: "请输入调试费", trigger: "blur" }
        ],
        freightPriceR: [
          { required: true, message: "请输入运费", trigger: "blur" }
        ]
      },
      rules3: {},
      option_project: {
        head: { title: "项目信息" }, //头部
        button: [false, false, false], //按钮
        onbutton: false, //点击进入
        price: false, //价格
        column: [
          { label: "客户:", value: "customerName" },
          { label: "项目:", value: "projectName" },
          { label: "签约时间:", value: "signTime" },
          { label: "合同编号:", value: "contractNo" },
          { label: "负责人:", value: "saleName" }
          // { label: "", value: "" },
          // { label: "", value: "" },
          // { label: "", value: "" },
          // { label: "", value: "" }
        ]
      },
      option_price: {
        head: { isShow: true, title: "合同金额", colkey: "price" }, //头部
        button: [false, false, false], //按钮
        onbutton: false, //点击进入
        price: false, //价格
        column: [
          { label: "合同金额:", value: "contractAmount" },
          { label: "预付款:", value: "prepayAmount" },
          { label: "提货款:", value: "takeAmount" },
          { label: "保证金:", value: "premium" },
          { label: "安装费:", value: "debuggerPrice" },
          { label: "运费:", value: "freightPrice" },
          { label: "备注:", value: "contractRemark" }
          // { label: "", value: "" },
          // { label: "", value: "" }
        ]
      },
      option_in: {
        head: { isShow: true, title: "收款情况", colkey: "in" }, //头部
        button: [false, false, false], //按钮
        onbutton: false, //点击进入
        price: false, //价格
        column: [
          { label: "已收到金额:", value: "receivedAmount" },
          { label: "预付款:", value: "prepayAmountR" },
          { label: "提货款:", value: "takeAmountR" },
          { label: "安装费:", value: "debuggerPriceR" },
          { label: "运费:", value: "freightPriceR" },
          { label: "质保金:", value: "premiumR" },
          { label: "备注:", value: "recieveRemark" }
          // { label: "", value: "" },
          // { label: "", value: "" }
        ]
      },
      option_time: {
        head: { isShow: true, title: "时间管理", colkey: "time" }, //头部
        button: [false, false, false], //按钮
        onbutton: false, //点击进入
        price: false, //价格
        column: [
          { label: "发货时间:", value: "" },
          { label: "开始时间:", value: "deliveryTimeBegin" },
          { label: "结束时间:", value: "deliveryTimeEnd" },
          { label: "安装调试时间:", value: "" },
          { label: "开始时间:", value: "debuggerTimeBegin" },
          { label: "结束时间:", value: "debuggerTimeEnd" },
          { label: "质保时间:", value: "" },
          { label: "质保时长/年:", value: "premiumCycle" },
          { label: "质保启动时间:", value: "premiumTimeBegin" }
        ]
      }
    };
  },
  components: {
    table11
  },
  computed: {},
  created() {},
  methods: {
    addContract() {
      this.$router.push({
        name: "合同新增",
        path: "/contract/addcontract",
        query: {}
      });
    },
    //  setDataFather(form) {
    //     this.child_form = form
    //     this.$refs.form.validate(valid => {
    //       if (valid) {
    //         update(this.form).then(res => {
    //           this.$message({ type: "success", message: "操作成功!" });
    //         });
    //       }
    //     })
    //   },
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          console.log(this.form);
          this.form.receivedAmount = 0;
          if (this.form.prepayAmountR != -1) {
            this.form.receivedAmount += parseFloat(this.form.prepayAmountR);
          }
          if (this.form.takeAmountR != -1) {
            this.form.receivedAmount += parseFloat(this.form.takeAmountR);
          }
          if (this.form.debuggerPriceR != -1) {
            this.form.receivedAmount += parseFloat(this.form.debuggerPriceR);
          }
          if (this.form.freightPriceR != -1) {
            this.form.receivedAmount += parseFloat(this.form.freightPriceR);
          }
          if (this.form.premiumR != -1) {
            this.form.receivedAmount += parseFloat(this.form.premiumR);
          }
          update(this.form).then(res => {
            console.log(res);
            this.editFormVisible1 = false;
            this.editFormVisible2 = false;
            this.editFormVisible3 = false;
            this.$message({ type: "success", message: "操作成功!" });
            this.$emit("callFather", 1);
          });
        }
      });
    },
    cancel(key) {
      if (key === "price") {
        this.editFormVisible1 = false;
      }
      if (key === "in") {
        this.editFormVisible2 = false;
      }
      if (key === "time") {
        this.editFormVisible3 = false;
      }
    },

    callEditFather(item, key) {
      this.form = item;
      if (key === "price") {
        this.editFormVisible1 = true;
      }
      if (key === "in") {
        this.editFormVisible2 = true;
      }
      if (key === "time") {
        this.editFormVisible3 = true;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.in-form-box {
  text-align: center;
  color: #89c3f8;
}

.wrapper {
  margin-top: 20px;

  .btn-right-box {
    float: right;
  }

  .btn-left-box {
    float: left;
  }

  .list-box {
    display: inline-block;

    // width: 1238px;
    .list {
      border: 1px solid #89c3f8;
      padding: 0 10px 20px 10px;
      margin-top: 20px;
      display: inline-block;
      color: #303133;
      font-size: 14px;
      margin-right: 32px;
      margin-bottom: 40px;
    }
  }
}
</style>
