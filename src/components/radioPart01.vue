<template>
  <div>
    <div class="wrapper-radio">
      <div v-if="flag==1">
        <div class="list" v-for="item in modleData" :key="item.id">
          <div class="radio-input-inner" @click="change(item)"></div>
          <!--  -->
          <div class="detail">
            <p>
              <label>设备</label>
              <span>{{item.equipment}}</span>
            </p>
            <p>
              <label>型号</label>
              <span>{{item.model}}</span>
            </p>
            <p>
              <label>数量</label>
              <span>
                <cinput v-model="nums[item.id]"></cinput>
              </span>
            </p>
          </div>
        </div>
      </div>

      <!--  -->
      <div v-if="flag==2">
        <div class="list" v-for="item2 in data" :key="item2.id">
          <div class="radio-input-inner" @click="change2(item2)"></div>
          <div class="detail">
            <p>
              <label>名称</label>
              <span>{{item2.equipment}}</span>
            </p>
            <p>
              <label>标准号</label>
              <span>{{item2.standard}}</span>
            </p>
            <p>
              <label>图号</label>
              <span>{{item2.chart}}</span>
            </p>
            <p>
              <label>重量（吨）</label>
              <span>{{item2.weight}}</span>
            </p>
            <p v-if="status==0">
              <label>数量</label>
              <span>{{item2.num}}</span>
            </p>
            <p v-if="status==1">
              <label>数量</label>
              <span>
                <cinput v-model="nums[item.id]"></cinput>
              </span>
            </p>
            <p class="setting">
              <label>参数</label>
              <span>{{item2.param}}</span>
            </p>
          </div>
        </div>
      </div>

       <div v-if="flag==3">
        <div class="list" v-for="item in modleData" :key="item.id">
          <div class="radio-input-inner" @click="change(item)"></div>
          <!--  -->
          <div class="detail">
            <p>
              <label>名称</label>
              <span>{{item.name}}</span>
            </p>
            <p>
              <label>数量</label>
              <span>
                <cinput v-model="nums[item.id]"></cinput>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div v-if="flag==4">
        <div class="list" v-for="item in modleData" :key="item.id">
          <div class="radio-input-inner" @click="change(item)"></div>
          <!--  -->
          <div class="detail">
            <p>
              <label>名称</label>
              <span>{{item.equipment}}</span>
            </p>
            <p>
              <label>数量</label>
              <span>
                <cinput v-model="nums[item.id]"></cinput>
              </span>
            </p>
          </div>
        </div>
      </div>


      <div v-if="flag==5">
        <div class="list" v-for="item in modleData" :key="item.id">
          <div class="radio-input-inner" @click="change(item)"></div>
          <!--  -->
          <div class="detail">
            <p>
              <label>名称</label>
              <span>{{item.equipment}}</span>
            </p>
            <p>
              <label>规格</label>
              <span>{{item.standards}}</span>
            </p>
            <p>
              <label>数量</label>
              <span>
                <cinput v-model="nums[item.id]"></cinput>
              </span>
            </p>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  props: ["modleData", "data", "status", "flag"],
  data() {
    return {
      nums: []
    };
  },
  components: {},
  methods: {
    change(item) {
      this.$parent.changeRadio(item, this.nums[item.id]);
    },
    change2(item2) {
      this.$parent.changeRadio(item2, item[item.id]);
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
      width: 150px;
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