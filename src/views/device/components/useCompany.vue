<template>
  <div class="wrapper">
    <h3>使用公司</h3>
    <div class="company-box">
      <div class="list"
           v-for="item in data"
           :key="item">{{item}}</div>
      <div class="more"
           v-if='data.length>13'>更多公司</div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Array,
      default: undefined
    }
  },
  data () {
    return {
    };
  },
  computed: {},
  created () {

  },
  methods: {

  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  h3 {
    font-size: 16px;
    font-weight: normal;
    margin-left: 10px;
  }

  .company-box {
    display: flex;
    flex-wrap: wrap;

    .list, .more {
      width: 150px;
      margin: 10px;
      padding: 10px;
      text-align: center;
    }

    .list {
      background: #8693f3;
      color: #fff;
    }

    .more {
      color: #409EFF;
      background: url('../../../assets/img/gengduo.png') no-repeat;
      background-position: 120px 50%;
      background-size: auto 60%;
    }
  }
}
</style>
