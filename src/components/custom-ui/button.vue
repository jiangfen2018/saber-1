<template>
  <div class="c-box"
       v-bind:class="{'c-box-bg-white':bgtype==='bgwhite'}"
       @click="clickButton">
    <span class="title"
          v-if='title'>{{title}}</span>
    <span v-if="type==='normal'"
          class="normal add"></span>
    <span v-if="type==='edit'"
          class="normal2 edit"></span>
    <span v-if="type==='design'"
          class="normal design"></span>
  </div>
</template>

<script>
export default {
  props: {
    bgtype: {
      type: String,
      default: "normal"
    },
    type: {
      type: String,
      default: "normal"
    },
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    clickButton() {
      this.$emit("clickButton");
    }
  }
};
</script>
<style lang="stylus" scoped>
.c-box {
  display: inline-block;
  cursor: pointer;

  &.c-box-bg-white {
    width: 220px;
    padding: 6px 0;
    text-align: center;
    background-color: white;
  }

  .normal {
    display: inline-block;
    width: 27px;
    height: 27px;
    vertical-align: middle;

    &.add {
      background: url('../../assets/img/tianjia.png') no-repeat;
    }

    &.edit {
      background: url('../../assets/img/xiugai.png') no-repeat;
    }

    &.design {
      background: url('../../assets/img/sheji.png') no-repeat;
    }
  }

  .normal2 {
    display: inline-block;
    width: 22px;
    height: 22px;
    vertical-align: middle;

    &.add {
      background: url('../../assets/img/tianjia.png') no-repeat;
    }

    &.edit {
      background: url('../../assets/img/xiugai.png') no-repeat;
      background-size: 60% 75%;
    }

    &.design {
      background: url('../../assets/img/sheji.png') no-repeat;
    }
  }

  .title {
    font-size: 0.08rem;
    color: #89c3f8;
    line-height: 27px;
    margin-right: 6px;
  }
}
</style>
