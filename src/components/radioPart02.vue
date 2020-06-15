<template>
  <div>
    <div class v-for="item in data" :key="item.id" :class="flag?'wrapper-radio1':'wrapper-radio2'">
      <!-- <div class="wrapper-radio1" v-for="item in data" :key="item.id"> -->

      <div class="list1" v-if="flag">
        <div class="radio-input-inner1" @click="change1(item)"></div>
        <p>{{item.name}}</p>
      </div>
      <div class="list2" v-else>
        <div class="radio-input-inner2" @click="change(item)"></div>
        <div class="detail">
          <p>
            <label>标准号</label>
            <span>{{item.model}}</span>
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
  </div>
</template>

<script>
export default {
  props: ["data", "status", "flag"],
  data() {
    return {
      nums: []
    };
  },
  components: {},
  methods: {
    change1(item) {
      this.$parent.changeRadio(item);
      console.log(1, this.$parent.flag);
      console.log(2, status);
    },
    change(item) {
      this.$parent.changeRadio(item, this.nums[item.id]);
      //    console.log(item.id)
      console.log(1, status);
      console.log(2, this.num);
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper-radio1 {
  display: inline-block;
  width: 190px;
}

.wrapper-radio2 {
  display: inline-block;
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

.list1 {
  margin: 2px 2px 0 2px;
  margin-right: 8px;
  display: flex;

  p {
    font-size: 14px;
    padding-left: 10px;
    color: #606266;
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
    white-space: nowrap;
    outline: 0;
    margin-right: 30px;
  }
}

.radio-input {
  white-space: nowrap;
  cursor: pointer;
  outline: 0;
  line-height: 1;
  vertical-align: middle;
}

.radio-input-inner1 {
  border: 1px solid #409EFF;
  border-radius: 100%;
  width: 14px;
  height: 14px;
  background-color: #FFF;
  cursor: pointer;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  right: 10px;
  top: 10px;
  z-index: 100;

  &:hover {
    background-color: #409EFF;
  }
}

.radio-input-inner2 {
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

.list2 {
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
}
</style>