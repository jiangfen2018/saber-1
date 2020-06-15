<template>
  <div class="filter-box">
    <div class="list">
      <div class="item-name">{{data.label}}</div>
      <div class="item-list">
        <span class="type"
              :class="{'on':!curValue}"
              @click="searchFather(data.label,-1)">不限</span>
        <span class="type"
              :class="{'on':curValue===item.id}"
              @click="searchFather(data.label,item)"
              v-for="item in data.res"
              :key="item.id">{{item[name]}}</span>
        <span class="type add-btn"
              v-show="btnlist==='add'"
              @click="add"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          label: "",
          res: []
        };
      }
    },
    btnlist: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: "name"
    }
  },
  data () {
    return {
      curValue: undefined
    };
  },
  computed: {},
  created () { },
  methods: {
    add () {
      this.$emit("add");
    },
    searchFather (label, item) {
      this.curValue = item === -1 ? undefined : item.id;
      this.$emit("searchFather", label, item);
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

    .item-name {
      width: 80px;
      // color: #909399;
      color: #303133;

      &:after {
        content: ':';
        margin-left: 4px;
      }
    }

    .item-list {
      position: relative;
      flex: 1;

      .type {
        margin-right: 20px;
        cursor: pointer;
        color: #606266;

        &.on {
          color: #89c3f8;
        }

        &.add-btn {
          display: inline-block;
          width: 27px;
          height: 27px;
          background: url('../assets/img/more.png') no-repeat;
          vertical-align: middle;
          cursor: pointer;
        }
      }

      label {
        color: #606266;
        font-size: 0.07rem;

        &:after {
          content: ':';
          margin-left: 4px;
        }
      }

      .search-btn {
        background-color: #8693f3;
        padding: 2px 18px;
        border-radius: 4px;
        color: #fff;
        margin-left: 20px;
        cursor: pointer;
        position: relative !important;
        top: 10px !important;
      }
    }
  }
}
</style>
