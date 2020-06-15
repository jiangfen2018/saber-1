<template>
  <div class="container">
    <div class="form-box">
      <div class="form-item">
        <div class="title">项目</div>
        <div class="content">{{form.parent}}</div>
      </div>

      <div class="form-item">
        <div class="title">类型</div>
        <div class="content">
          <cselect v-on:select="changeSelect" :selectedValue='projectName' :defaultOption="defaultOption" :dataList="list"></cselect>
        </div>
      </div>

      <div class="form-item">
        <div class="title">设备</div>
        <div class="content">
          <cselect v-on:select="changeSelect" :selectedValue='projectName' :defaultOption="defaultOption" :dataList="list"></cselect>
        </div>
      </div>

      <div class="sub-btn" @click="handleSubmit">确定</div>
    </div>
    <div class="form-box">
      <div class="form-item">
        <div class="title">设备</div>
        <div class="content" style="margin-left:10px">{{rightForm.typeName}}</div>
      </div>

      <div class="form-item">
        <div class="title">名称</div>
        <div class="content">
          <cinput v-model="rightForm.name"></cinput>
        </div>
      </div>

      <div class="form-item">
        <div class="title">单位</div>
        <div class="content">
          <cinput v-model="rightForm.unit"></cinput>
        </div>
      </div>

      <div class="sub-btn" @click="handleSubmit('right')">添加</div>
    </div>
  </div>
</template>
<script>
import { save } from "@/api/platform_device/typeconfig";
import { getListItem } from "@/api/system/dict";
export default {
  data() {
    return {
      rightForm: {
        "createTime": "",
        "createUser": 0,
        "id": 0,
        "isDeleted": 0,
        "name": "",
        "parentId": "",
        "typeId": 0,
        "unit": "",
        "updateTime": "",
        "updateUser": 0
      },
      form: {
        parent: undefined,
        standard: undefined,
        chart: undefined,
        weight: undefined,
        param: undefined,
        parentId: undefined,
        status: 0,//设备0 配件1
      },
      selectData: {
        rightPart: undefined,
        rightXh: undefined,
      },
      list: [],
      projectName: {
        rightPart: {
          value: "",
          label: ""
        },
        rightXh: {
          value: "",
          label: ""
        }
      },
      defaultOption: {
        rightPart: {
          value: 'id',
          label: 'dictValue',
        },
        rightXh: {
          value: 'id',
          label: 'name',
        }
      },
    }
  },
  computed: {

  },
  created() {
    if (this.$route.params.info) {
      this.rightForm.typeName = this.$route.params.info.name
      this.rightForm.typeId = this.$route.params.info.id
    }
    if (this.$route.params.isChild) {
      this.rightForm.parentId = this.$route.params.isChild.id
    }
  },
  methods: {
    getSelect(item) {
      getListItem(item).then(res => {
        this.selectData.rightPart = res.data.data
      });
    },
    changeSelect(expression) {
      switch (expression) {
        case 'rightPart':
          this.rightForm.configId = this.projectName.rightPart.value
          break;
        case 'rightXh':
          this.rightForm.parentId = this.projectName.rightXh.value
          break;
        default:
      }
    },
    rowSave(row) {
      save(row).then(() => {
        this.$message({
          type: "success",
          message: "操作成功!"
        });
      }, error => {
        console.log(error);
      });
    },
    handleSubmit(key) {
      switch (key) {
        case 'right':
          console.log(this.rightForm);

          this.rowSave(this.rightForm)
          break;

        default:
          break;
      }

    }
  }
};
</script>

<style lang="stylus" scoped>
.container
  display: flex
.form-box
  margin: 100px 100px 0 100px
  .form-item
    display: flex
    color: #606266
    font-size: 14px
    margin: 24px 0
    .title
      padding-right: 20px
      width: 50px
      &:after
        content: ':'
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

