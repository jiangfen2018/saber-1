<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <h3>基本信息</h3>
      <div class="form-box">
        <div class="in-form-box">
          <cselectConect ref="cselectConect" @setDataFather="setDataFather"></cselectConect>
          <el-form-item label="签约时间" prop="signTime">
            <el-date-picker
              size="mini"
              v-model="form.signTime"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width:100%"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
            <el-form-item label="合同编号" prop="contractNo">
            <el-input size="mini" v-model="form.contractNo"></el-input>
          </el-form-item>
        <el-form-item label="交货时间" prop="contractDeliveryTime">
            <el-date-picker
              size="mini"
              v-model="form.contractDeliveryTime"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width:100%"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>

        </div>
      </div>
      <h3>金额情况</h3>
      <div class="form-box">
        <div class="in-form-box">
          <el-form-item label="合同金额" prop="contractAmount">
            <el-input size="mini" v-model.number="form.contractAmount"></el-input>
          </el-form-item>
          <span  class="form-span" v-if="form.contractAmount/10000>0">{{form.contractAmount/10000}}万</span>
          <span  class="form-span" v-else>{{form.contractAmount}}</span>
          <el-form-item label="预付款" prop="prepayAmount">
            <el-input size="mini" v-model.number="form.prepayAmount"></el-input>
          </el-form-item>
            <span  class="form-span2" v-if="form.prepayAmount/10000>0">{{form.prepayAmount/10000}}万</span>
          <span  class="form-span2" v-else>{{form.prepayAmount}}</span>
          <el-form-item label="提货款" prop="takeAmount">
            <el-input size="mini" v-model.number="form.takeAmount"></el-input>
          </el-form-item>
             <span  class="form-span3" v-if="form.takeAmount/10000>0">{{form.takeAmount/10000}}万</span>
          <span  class="form-span3" v-else>{{form.takeAmount}}</span>
          <el-form-item label="质保金" prop="premium">
            <el-input size="mini" v-model.number="form.premium"></el-input>
          </el-form-item>
            <span  class="form-span4" v-if="form.premium/10000>0">{{form.premium/10000}}万</span>
          <span  class="form-span4" v-else>{{form.premium}}</span>
          <el-form-item label="安装费" prop="debuggerPrice">
            <el-input size="mini" v-model.number="form.debuggerPrice"></el-input>
          </el-form-item>
             <span  class="form-span5" v-if="form.debuggerPrice/10000>0">{{form.debuggerPrice/10000}}万</span>
          <span  class="form-span5" v-else>{{form.debuggerPrice}}</span>
          <el-form-item label="运费" prop="freightPrice">
            <el-input size="mini" v-model.number="form.freightPrice"></el-input>
          </el-form-item>
            <span  class="form-span6" v-if="form.freightPrice/10000>0">{{form.freightPrice/10000}}万</span>
          <span  class="form-span6" v-else>{{form.freightPrice}}</span>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea"  :rows="2"  placeholder="请输入备注" size="mini" v-model="form.remark"></el-input>
          </el-form-item>

        </div>
      </div>
      <el-form-item style="margin-top:20px">
        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { save } from "@/api/platform_device/contract";
export default {
  data() {
    return {
      // text: '',
      //   unit: new Array("仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"),
      selectDataProject: [],
      selectDataCustomer: [],
      rules: {
        signTime: [
          { required: true, message: "请选择签约时间", trigger: "blur" }
        ],
         contractNo: [
          { required: true, message: "请输入合同编号", trigger: "blur" }
        ],
         contractDeliveryTime: [
          { required: true, message: "请选择交货时间", trigger: "blur" }
        ],
        contractAmount: [
          {
            required: true,
            message: "请输入合同金额",
            trigger: "blur",
            type: "number"
          }
        ],
        prepayAmount: [
          {
            required: true,
            message: "请输入预付款",
            trigger: "blur",
            type: "number"
          }
        ],
        premium: [
          {
            required: true,
            message: "请输入质保金",
            trigger: "blur",
            type: "number"
          }
        ],
        takeAmount: [
          {
            required: true,
            message: "请输入提货款",
            trigger: "blur",
            type: "number"
          }
        ],
        debuggerPrice: [
          {
            required: true,
            message: "请输入调试费",
            trigger: "blur",
            type: "number"
          }
        ],
        freightPrice: [
          {
            required: true,
            message: "请输入运费",
            trigger: "blur",
            type: "number"
          }
        ]
      },
      form: {},
      child_form: undefined,
    };
  },
  computed: {},
  created() {
   
  },
  methods: {
        // 转换算法主函数
      NumberToChinese(m){
        m *= 100;
        m += "";
        var length = m.length;
 
        var result = "";
        for (var i = 0; i < length; i++) {
          if (i == 2) {
            result = "元" + result;
          } else if (i == 6) {
            result = "万" + result;
          }
          if (m.charAt(length - i - 1) == 0) {
            if (i != 0 && i != 1) {
              if (result.charAt(0) != '零' && result.charAt(0) != '元' && result.charAt(0) != '万') {
                result = "零" + result;
              }
            }
            continue;
          }
          result = this.toDx(m.charAt(length - i - 1)) + this.unit[this.unit.length - i - 1] + result;
        }
        result += result.charAt(result.length - 1) == '元' ? "整" : "";
        this.text=result;
      },
    setDataFather(form) {
      this.child_form = form;
      this.$refs.form.validate(valid => {
        if (valid) {

            if(this.form.contractAmount > (this.form.prepayAmount+this.form.takeAmount+this.form.premium+this.form.debuggerPrice+this.form.freightPrice)){
                  this.$message({ type: "error", message: "合同金额大于其他金额总和不符合，请核对!" });
                return
            }
           if(this.form.contractAmount < (this.form.prepayAmount+this.form.takeAmount+this.form.premium+this.form.debuggerPrice+this.form.freightPrice)){
                  this.$message({ type: "error", message: "合同金额小于其他金额总和不符合，请核对!" });
                return
            }




          this.form.customerId = this.child_form.customerId;
          this.form.projectId = this.child_form.projectId;
          save(this.form).then(res => {
            this.$message({ type: "success", message: "操作成功!" });
            this.$router.push({ path: "./contractList" });
          });
          
        }
      });
    },
    submitForm() {
      this.$refs.cselectConect.validateChild();
    }
    /*   rowSave(row) {
        add(row).then(() => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          console.log(error);
        });
      },
      handleSubmit() {
        this.rowSave(this.form)
      } */
  }
};
</script>

<style lang="stylus" scoped>
.container {
  margin: 20px 40px;
  width: auto;

  h3 {
    color: #606266;
    font-size: 14px;
    font-weight: normal;
  }

  .form-box {
    border: 1px solid #89c3f8;
    padding: 0 10px;
    margin-top: 20px;
    position: relative;

    .in-form-box {
      width: 400px;
      padding-top: 20px;

      .form-span {
    position: absolute;
    left: 420px;
    top: 31px;
      }
       .form-span2 {
   position: absolute;
    left: 420px;
    top: 93px;
      }
           .form-span3 {
   position: absolute;
    left: 420px;
    top: 155px;
      }
        .form-span4 {
   position: absolute;
    left: 420px;
    top: 216px;
      }
        .form-span5 {
   position: absolute;
    left: 420px;
    top: 276px;
      }
      .form-span6 {
   position: absolute;
    left: 420px;
    top: 340px;
      }
    }
  }
}
</style>
