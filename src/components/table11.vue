/* 配置详情 */
<template>
  <div class="wrapper">
    <el-form ref="form" :model="form">
      <div class="detail">
        <div class="title" v-if="option.head.title">
          {{item[option.head.label]}}{{option.head.title}}
          <div class="edit" v-if="option.head.isShow">
            <cbutton title="修改" type="edit" @clickButton="callEditFather(item,option.head.colkey)"></cbutton>
          </div>
        </div>

        <div class="line" v-for="line in option.column" :key="line.value">
          <div
            :class="lineLength>7?'overLineheight':(lineLength<6?'lowerLineheight2':'')"
            v-if="line.label!=''"
          >
            <span class="tip" v-if="line.value!=''&&!line.input">{{line.label}}</span>
            <span class="tip" v-else>{{line.label}}</span>
            <span
              class="text"
              :class="{'price':line.style==='price'}&&lineLength>7?'overText':'lowerText'"
            >
              {{item[line.value] | timeFilter}}
              <el-form-item>
                <el-input v-if="line.input" size="mini" v-model="formArr[item.id]" :inline="true"></el-input>
              </el-form-item>
            </span>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      // type: Array,
      // default: function () {
      //   return []
      // }
    },
    option: {
      type: Object,
      default: function() {
        return {
          head: { isShow: true, label: "", title: "" }, //头部
          button: [true, true, true], //按钮
          onbutton: true, //点击进入
          price: true, //价格
          column: [
            /*    { label: '客户', value: 'a'， style: "price"  }, */
          ]
        };
      }
    }
  },
  data() {
    return {
      form: {
        num: undefined
      },
      formArr: [],
      lineLength: this.option.column.length
    };
  },
  computed: {},
  created() {
    // console.log(1, this.lineLength);
    console.log(this.option.column.length);
  },
  methods: {
    callback(id, val) {
      console.log(id);
      console.log(val);
      this.$emit("setNumData", id, val);
    },
    setNumData() {
      console.log("123123");
      return 123;
    },
    callEditFather(item, key) {
      this.$emit("callEditFather", item, key);
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  display: inline-block;
  margin-right: 32px;
  margin-buttom: 10px;
  vertical-align: top;

  &:last-child {
    margin-right: 0;
  }
}

.list {
  display: inline-block;
  width: 280px;
  // height:auto;
  color: #303133;
  font-size: 14px;
  margin-right: 32px;
  margin-top: 20px;
  padding-bottom: 10px;

  &:last-child {
    margin-right: 0;
  }

  h3 {
    font-size: 16px;
    font-weight: normal;
    text-align: center;
    background-color: #fff;
    border-bottom: 1px solid #DCDFE6;
    line-height: 40px;
    margin-bottom: 0;
    margin-top: 0;
  }

  .detail {
    background-color: #fff;
    padding: 10px 0;
    height: 350px;

    // border: 1px solid #95a5b4;
    .title {
      font-size: 16px;
      font-weight: normal;
      text-align: center;
      background-color: #fff;
      border-bottom: 1px solid #DCDFE6;
      line-height: 40px;
      margin-bottom: 0;
      margin-top: 0;
    }

    .edit {
      float: right;
    }

    // 
    .overLineheight {
      line-height: 33px;
    }

    .lowerLineheight {
      line-height: 40px;
    }

    .lowerLineheight2 {
      line-height: 55px;
    }

    .line {
      line-height: 42px;
      padding: 0 30px;

      .price {
        font-size: 20px;
        color: #E6A23C;

        &:before {
          padding-right: 10px;
          content: '¥';
        }
      }

      .tip, .tip-null {
        width: 90px;
        display: inline-block;
        text-align: justify;
        text-align-last: justify;
        margin-right: 20px;
      }

      .tip-null {
        color: #8693f3;
      }

      .tip {
        &:after {
          content: '';
        }
      }

      .overText {
        // height: 30px;
        line-height: 28px;
      }

      .lowerText {
        line-height: 23px;
      }

      .text {
        color: #606266;
        display: inline-block;
        width: 112px;
        height: 28px;
        vertical-align: middle;
        white-space: nowrap;
        overflow: hidden;
        word-break: keep-all;
        text-overflow: ellipsis;

        &.price {
          font-size: 20px;
          color: #E6A23C;
        }
      }
    }

    .btn {
      width: 80px;
      margin: 10px auto 0 auto;
      padding: 2px 0;
      border-radius: 2px;
      color: #fff;
      text-align: center;
      background-color: #8693f3;
      cursor: pointer;
    }
  }

  .btn-wrapper {
    display: flex;
    margin: 20px 20px 5px 20px;
    justify-content: space-around;

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
