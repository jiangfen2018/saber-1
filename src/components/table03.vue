/* 客户列表 */
<template>
  <div class="wrapper">
    <div class="list" v-for="item in data" :key="item.id">
      <div class="left">
        <img v-if="item.url" :src="item.url" alt />
        <img v-else src="../assets/img/tupian.png" alt />
      </div>
      <div class="middle">
        <div class="project">{{item.customerName}}</div>
        <div class="line">
          <span>联系人：{{item.contacts}}</span>
          <span class="text">电话：{{item.phone}}</span>
        </div>
        <div class="line">{{item.remark}}</div>
        <div class="line">
          <span class="area">
            <img src="../assets/img/map.png" alt />
          </span>
          {{item.sideDetail}} {{item.sideDetail2}} {{item.area}} {{item.address}}
        </div>
        <div class="line">
          <span>负责人：{{item.username}}</span>
          <span class="text">录入时间：{{item.createTime | timeFilter}}</span>
        </div>
      </div>
      <div class="right" @click="goTo(item)">
        <div class="right-box">
          <p>项目</p>
          <h1>{{item.num}}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {
    goTo(item) {
      this.$emit("goToProject", item);
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  .list {
    display: flex;
    margin-bottom: 10px;
    margin-top: 10px;

    .left {
      background-color: #ffffff;
      padding: 0 40px;
      width: 200px;
      display: flex;
      align-items: center;

      img {
        width: 100%;
        height: 80px;
      }
    }

    .middle {
      flex: 1;
      background-color: #ffffff;
      padding: 10px 0;

      .project {
        color: #8693f3;
        font-size: 24px;
      }

      .line {
        font-size: 14px;
        color: #909399;
        line-height: 24px;

        img {
          width: 100%;
          height: 100%;
        }

        .text {
          margin-left: 40px;
        }

        .area {
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-right: 10px;
        }
      }
    }

    .right {
      background-color: #89c3f8;
      color: #ffffff;
      width: 150px;
      text-align: center;
      display: flex;
      cursor: pointer;
      align-items: center;

      .right-box {
        flex: 1;

        p {
          font-size: 24px;
        }

        h1 {
          font-size: 24px;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
