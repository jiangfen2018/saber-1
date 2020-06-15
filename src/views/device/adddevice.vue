<template>
  <div class="container">
    <div class="form-box">
      <div class="form-item">
        <div class="title">设备</div>
        <div class="content">{{form.parent}}</div>
      </div>

      <!--      <cfield type='select' label="型号" :options='selectData' :defaultOption='defaultOption'></cfield> -->
      <div class="form-item">
        <div class="title">型号</div>
        <div class="content">
          <cselect
            v-on:select="changeSelect"
            :selectedValue="projectName"
            :defaultOption="defaultOption"
            :dataList="list"
          ></cselect>
          <!--  <cselect v-model="form.xh" :options='selectData' :defaultOption='defaultOption'></cselect> -->
        </div>
      </div>

      <div class="form-item">
        <div class="title">标准号</div>
        <div class="content">
          <cinput v-model="form.standard"></cinput>
        </div>
      </div>

      <div class="form-item">
        <div class="title">图号</div>
        <div class="content">
          <cinput v-model="form.chart"></cinput>
        </div>
      </div>

      <div class="form-item">
        <div class="title">重量</div>
        <div class="content">
          <cinput v-model="form.weight"></cinput>
        </div>
      </div>

      <div class="form-item">
        <div class="title">参数</div>
        <div class="content">
          <cinput v-model="form.param"></cinput>
        </div>
      </div>

      <div class="sub-btn" @click="handleSubmit">添加</div>
    </div>
  </div>
</template>

<script>
import { save } from "@/api/platform_device/devicesequence";
/* import { getList } from "@/api/system/dict"; */
export default {
  data() {
    return {
      form: {
        parent: undefined,
        standard: undefined,
        chart: undefined,
        weight: undefined,
        param: undefined,
        parentId: undefined,
        status: 0 //设备0 配件1
      },
      selectData: [],

      list: [],
      projectName: {
        //子组件的选择值改变而改变的值
        value: "",
        label: ""
      },
      defaultOption: {
        value: "id",
        label: "name"
      }
    };
  },
  computed: {},
  created() {
    if (this.$route.params.info) {
      /*   this.form.typeId=this.$route.params.info.id */
      this.form.parent = this.$route.params.info.name;
    }
    if (this.$route.params.selectData) {
      this.list = this.$route.params.selectData;
    }
  },
  methods: {
    changeSelect() {
      this.form.typeId = this.projectName.value;
    },
    rowSave(row) {
      save(row).then(
        () => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        },
        error => {
          console.log(error);
        }
      );
    },
    handleSubmit() {
      this.rowSave(this.form);
    }
  }
};
</script>

<style lang="stylus" scoped>
.container {
  .form-box {
    margin: 100px 0 0 100px;

    .form-item {
      display: flex;
      color: #606266;
      font-size: 14px;
      margin: 24px 0;

      .title {
        padding-right: 20px;
        width: 50px;

        &:after {
          content: ':';
        }
      }
    }

    .sub-btn {
      background-color: #8693f3;
      width: 90px;
      text-align: center;
      font-size: 14px;
      color: #ffffff;
      padding: 4px 0;
      border-radius: 4px;
      margin-top: 40px;
      margin-left: 50px;
      cursor: pointer;
    }
  }
}
</style>
