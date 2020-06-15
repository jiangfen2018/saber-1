<template>
  <div class="filter-box">
    <div class="list">
      <div class="item-name">筛选</div>
      <div class="item-list" style="">
        <span class="item-box" v-for='item in data' :key="item.value" style="display:inline-block;margin-right:20px">
          <label>{{item.name}}</label>
          <el-input v-if="item.type==='input'" v-model="inputValue[item.label]" clearable class="my-input" size='mini'></el-input>
          <el-date-picker v-if="item.type==='daterange'" v-model="inputValue[item.label]" class="my-input"  type="daterange"   range-separator="至"
                          start-placeholder="开始日期"   value-format="yyyy-MM-dd HH:mm:ss"
                          end-placeholder="结束日期" size='mini' style=" margin-top:5px">  </el-date-picker>
        </span>
        <span class="search-btn" @click="searchFather">查询</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "input"
    },
    data: {
      type: Array,
      default: function() {
        return [
          {
            name: "名称",
            value: "1"
          },
          {
            name: "项目",
            value: "2"
          }
        ];
      }
    }
  },
  data() {
    return {
      inputValue: {}
    };
  },
  computed: {},
  created() {},
  methods: {
    searchFather() {
      this.$emit("searchInputFather", this.inputValue);
    }
  }
};
</script>

<style lang="stylus" scoped>
.filter-box {
  font-size: 0.07rem;

  .list {
    border-bottom: 1px dashed #DCDFE6;
    padding: 10px 0;
    display: flex;

    // align-items: center;
    .item-name {
      width: 80px;
      margin-top: 10px;
      color: #303133;

      &:after {
        content: ':';
        margin-left: 4px;
      }
    }

    .item-list {
      flex: 1;

      .my-input {
        width: auto;
        margin-left: 10px;
      }

      .type {
        margin-right: 20px;
        cursor: pointer;
      }

      .item-box {
        label {
          color: #606266;

          &:after {
            margin-left: 4px;
          }
        }

        &:nth-child(n+2) {
          margin-right: 20px;
        }
      }

      .search-btn {
        background-color: #8693f3;
        padding: 2px 22px;
        border-radius: 4px;
        color: #fff;
        // margin-left: 20px;
        cursor: pointer;
        height: 18px !important;
        line-height: 15px;
      }
    }
  }
}
</style>
