<template>
  <div class="container">
    <div class="form-box">
      <div class="form-item">
        <div class="title">设备</div>
        <div class="content">{{form.parent}}</div>
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
import { add } from "@/api/platform_device/devicetype";
/* import { getList } from "@/api/system/dict"; */
export default {
  data() {
    return {
      form: {
        type: undefined,
        project: undefined,
        parent: undefined,
        parentId: undefined,
        name: undefined,
        unit: undefined,
        status: 0
      }
    };
  },
  computed: {
  },
  created() {
    if (this.$route.params.info) {
      this.form.parent = this.$route.params.info.name
      this.form.parentId = this.$route.params.info.id
      this.form.project = this.$route.params.info.project/* 多跟两个参数project，type */
      this.form.type = this.$route.params.info.type
    }
  },
  methods: {
    rowSave(row) {
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
    }
  }
};
</script>

<style lang="stylus" scoped>
.container
  .form-box
    margin: 100px 0 0 100px
    .form-item
      display: flex
      color: #606266
      font-size: 14px
      margin: 24px 0
      .title
        padding-right: 20px
        &:after
          content: ':'
      .content
        input
          background: none
          border: 1px solid #C0C4CC
          margin-left: 10px
          width: 200px
          margin: 0
    .sub-btn
      background-color: #8693f3
      width: 90px
      text-align: center
      font-size: 14px
      color: #ffffff
      padding: 4px 0
      border-radius: 4px
      margin-top: 40px
      margin-left: 50px
      cursor: pointer
</style>
