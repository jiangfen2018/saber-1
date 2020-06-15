<template>
  <div class="container">
    <div class="form-box">
      <div class="form-item">
        <div class="title">项目</div>
        <div class="content">
          <cselect
            v-on:select="changeSelect"
            :selectedValue="projectName"
            :defaultOption="defaultOption"
            :dataList="list"
          ></cselect>
        </div>
      </div>

      <div class="form-item">
        <div class="title">类型</div>
        <div class="content">
          <cselect
            v-on:select="changeSelect2"
            :selectedValue="projectName2"
            :defaultOption="defaultOption2"
            :dataList="list2"
          ></cselect>
        </div>
      </div>

      <div class="form-item">
        <div class="title">名称</div>
        <div class="content">
          <cinput v-model="form.name"></cinput>
        </div>
      </div>

      <div class="form-item">
        <div class="title">单位</div>
        <div class="content">
          <cinput v-model="form.unit"></cinput>
        </div>
      </div>

      <div class="sub-btn" @click="handleSubmit">添加</div>
    </div>
  </div>
</template>

<script>
import { getListItem } from "@/api/system/dict";
import { add } from "@/api/platform_device/devicetype";
export default {
  data() {
    return {
      form: {
        project: undefined,
        type: undefined,
        name: undefined,
        unit: undefined,
        status: 0
      },

      list: [],
      projectName: {
        //子组件的选择值改变而改变的值
        value: "",
        label: ""
      },
      defaultOption: {
        value: "dictKey",
        label: "dictValue"
      },

      list2: [],
      projectName2: {
        //子组件的选择值改变而改变的值
        value: "",
        label: ""
      },
      defaultOption2: {
        value: "dictKey",
        label: "dictValue"
      }
    };
  },
  computed: {},
  created() {
    getListItem("machine").then(res => {
      this.list = res.data.data;
    });
    getListItem("class").then(res => {
      this.list2 = res.data.data;
    });
  },
  methods: {
    changeSelect() {
      this.form.project = this.projectName.value;
    },
    changeSelect2() {
      this.form.type = this.projectName2.value;
    },
    rowSave(row) {
      add(row).then(
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
