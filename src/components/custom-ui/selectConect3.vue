/* 先选客户（下拉），再选项目（下拉） */
<template>
  <div>
    <h3>基本信息</h3>
    <div class="base">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="80px"
               :inline="true">

        <el-form-item label="客户"
                      prop="customerId"
                      style="margin-top:15px">
          <el-select v-model="form.customerId"
                     size="mini"
                     @change='changeCustomer'
                     style="width:auto; ">
            <el-option v-for="item in selectDataCustomer"
                       :key="item.id"
                       :label="item.value"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="form.customerId"
                      label="项目"
                      prop="projectId"
                      style="margin-top:15px">
          <el-select v-model="form.projectId"
                     size="mini"
                     @change='changeProject'
                     style="width:auto;">
            <el-option v-for="item in selectDataProject"
                       :key="item.id"
                       :label="item.value"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="交付时间"
                      prop="payTime"
                      style="margin-top:15px">
          <el-date-picker size='mini'
                          v-model="form.payTime"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          style="width:100%;"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <!-- <el-form-item label="审核"
                      prop="sendType"
                      style="margin-top:15px">
          <el-select v-model="form.sendType"
                     size="mini"
                     style="width:auto;">
            <el-option v-for="item in selectDataType"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item> -->

      </el-form>
    </div>

  </div>
</template>

<script>
import { selectCustomerList, selectOrderProjectList } from "@/api/customer/customer";
export default {
  props: {

  },
  data () {
    return {
      rules: {
        customerId: [{ required: true, message: '请选择客户', trigger: 'blur' }],
        projectId: [{ required: true, message: '请选择项目', trigger: 'blur' }],
      },
      selectDataProject: [],
      selectDataCustomer: [],
      // selectDataType: [{ 'value': '', 'name': '默认' }, { 'value': 'finance', 'name': '财务' }, { 'value': 'manager', 'name': '总经理' }],
      form: {
        customerId: undefined,
        projectId: undefined,
        payTime: undefined,
        // sendType: ''
      }
    };
  },
  created () {
    selectCustomerList(undefined,'produce').then(res => {
      this.selectDataCustomer = res.data.data
    });
  },

  methods: {
    setValues (customerId, projectId) {

      this.form.customerId = customerId
      this.form.projectId = projectId
      if (this.form.customerId) {
        selectOrderProjectList(this.form.customerId,'produce').then(res => {
          this.selectDataProject = res.data.data
        });
        this.$emit("setDataFather", this.form);
      }
    },
    validateChild () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("setDataFather", this.form);
        }
      })
    },
    changeCustomer (value) {
      // selectOrderProjectList(value,'produce').then(res => {
      //   this.selectDataProject = res.data.data
      // });
      var customer ={};
      this.selectDataCustomer.forEach(customer1=>{
          if(customer1.id === value){
            customer = customer1
            return
          }
      })
      this.selectDataProject = customer['projects']
      
      this.form.projectId = undefined
      this.$emit("setDataFather", this.form);
    },
    changeProject (value) {
      this.form.projectId = value
      this.$emit("setDataFather", this.form);
    }
  }
};
</script>
<style lang="stylus" scoped>
.base {
  margin-top: 10px;
  border: 1px solid #89c3f8;
}
</style>
