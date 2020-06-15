<template>
  <div>
    <div class="wrapper-radio">
      <div v-if="flag">
        <div class="list" v-for="item in deviceData" :key="item.id">
          <div class="radio-input-inner" @click="change(item)"></div>
          <div class="detail">
            <p>
              <label>项目名称</label>
              <span>{{item.customerName}}</span>
            </p>
            <p>
              <label>客户名称</label>
              <span>{{item.projectName}}</span>
            </p>
            <p class="setting">
              <label>名称</label>
              <span>{{item.equipment}}({{item.model}}-{{item.name}})</span>
            </p>
            <p>
              <label>标准号</label>
              <span>{{item.standard}}</span>
            </p>
            <p>
              <label>图号</label>
              <span>{{item.chart}}</span>
            </p>
            <p>
              <label>重量（吨）</label>
              <span>{{item.weight}}</span>
            </p>
            <p>
              <label>数量</label>
              <span>
                <cinput v-model="nums[item.id]"></cinput>
              </span>
            </p>
            <p class="setting">
              <label>参数</label>
              <span>{{item.param}}</span>
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="list2" v-for="item2 in modleData" :key="item2.id">
          <div class="radio-input-inner" @click="change(item2)"></div>
          <div class="detail2">
            <p>
              <label>设备</label>
              <span>{{item2.equipment}}</span>
            </p>
            <p>
              <label>型号</label>
              <span>{{item2.name}}</span>
            </p>
            <p>
              <label>标准号</label>
              <span>{{item2.standard}}</span>
            </p>
            <p>
              <label>图号</label>
              <span>{{item2.chart}}</span>
            </p>
            <p class="setting">
              <label>参数</label>
              <span>{{item2.param}}</span>
            </p>
            <p>
              <label>备注</label>
              <span>{{item2.remark}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["deviceData", "modleData", "status", "flag"],
  data() {
    return {
      nums: []
      //   status:""
    };
  },
  components: {},
  methods: {
    change(item) {
      this.$parent.changeRadio(item, this.nums[item.id]);
      //    this.status=this.$parent.status;
    }
  }
};
</script>

<style lang="stylus" scoped>
.radio-input {
  white-space: nowrap;
  cursor: pointer;
  outline: 0;
  line-height: 1;
  vertical-align: middle;
}

.radio-input-inner {
  border: 1px solid #409EFF;
  border-radius: 100%;
  width: 14px;
  height: 14px;
  background-color: #FFF;
  cursor: pointer;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 100;

  &:hover {
    background-color: #409EFF;
  }
}

.setting {
  display: inline-block;
  color: #303133;

  label {
    width: 90px;
    display: inline-block;
    vertical-align: top;
  }

  span {
    width: 155px;
    margin: auto;
    text-align: left;
    display: inline-block;
  }
}

.list {
  width: 292px;
  margin: 2px 2px 0 2px;
  display: inline-block;
  margin-right: 30px;
  position: relative;

  .detail {
    border: 1px #ccc solid;
    border-radius: 5px;
    color: #303133;
    margin: 0 auto;
    background-color: #fff;
    font-size: 14px;
    padding: 10px 20px 5px 20px;
    margin-bottom: 5px;
    margin-top: 5px;

    &:hover {
      transform: translateY(-3px);
      border: 1px #409EFF solid;
      box-shadow: 1px 1px 3px 3px #cccccc;
    }

    input {
      width: 150px !important;
    }

    p {
      color: #909399;
      // margin: 12px 0;
      margin-top: 12px;

      label {
        display: inline-block;
        color: #303133;
        width: 90px;
        text-align-last: justify;

        &:after {
          content: ':';
          padding-right: 15px;
        }
      }

      span {
        width: 155px;
        display: inline-block;
      }
    }

    .price {
      font-size: 20px;
      color: #E6A23C;

      &:before {
        padding-right: 10px;
        content: '¥';
      }
    }
  }
}

.list2 {
  width: 292px;
  margin: 10px 2px 0 0;
  display: inline-block;
  margin-right: 30px;
  position: relative;

  .detail2 {
    color: #303133;
    margin: 0 auto;
    background-color: #f1f1f1;
    border-radius: 5px;
    font-size: 14px;
    padding: 10px 20px 5px 20px;

    &:hover {
      transform: translateY(-3px);
      border: 1px #409EFF solid;
      box-shadow: 1px 1px 3px 3px #cccccc;
    }

    input {
      width: 150px;
    }

    p {
      color: #909399;
      margin: 12px 0;

      label {
        display: inline-block;
        color: #303133;
        width: 90px;
        text-align-last: justify;

        &:after {
          content: ':';
          padding-right: 15px;
        }
      }
    }

    .price {
      font-size: 20px;
      color: #E6A23C;

      &:before {
        padding-right: 10px;
        content: '¥';
      }
    }
  }
}

.btn-wrapper {
  display: flex;
  margin: 20px 20px 5px 20px;
  justify-content: space-between;

  .btn {
    width: 60px;
    font-size: 14px;
    padding: 2px 0;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    background-color: #DCDFE6;
  }
}
</style>