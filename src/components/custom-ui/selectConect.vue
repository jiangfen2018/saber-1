/* 先选客户（下拉），再选项目（下拉） */
<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="客户" prop="customerId">
        <el-select v-model="form.customerId" size="mini" @change='changeCustomer' style="width:100%">
          <el-option v-for="item in selectDataCustomer" :key="item.id" :label="item.value" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.customerId" label="项目" prop="projectId">
        <el-select v-model="form.projectId" size="mini" style="width:100%">
          <el-option v-for="item in selectDataProject" :key="item.id" :label="item.projectName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { selectCustomerList, selectProjectList } from "@/api/customer/customer";
export default {
  props: {

  },
  data() {
    return {
      rules: {
        customerId: [{ required: true, message: '请选择客户', trigger: 'blur' }],
        projectId: [{ required: true, message: '请选择项目', trigger: 'blur' }],
      },
      selectDataProject: [],
      selectDataCustomer: [],
      form: {
        customerId: undefined,
        projectId: undefined,
      }
    };
  },
  created() {
    selectCustomerList('all',undefined).then(res => {
      this.selectDataCustomer = res.data.data
    });

  },
  methods: {
    validateChild() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("setDataFather", this.form);
        }
      })
    },
    changeCustomer(value) {
      selectProjectList(value).then(res => {
        this.selectDataProject = res.data.data
      });
      this.form.projectId = undefined
    }
  }
};
</script>
<style lang="stylus" scoped></style>
