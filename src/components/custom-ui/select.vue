<template>
  <!--下拉单选框-->
  <div class="base-select" @click="showDataList" v-bind:style="{width: widthData}">
    <div class="sub-selected-value">
      {{this.selectedValue.label}}
      <!--显示选择的值-->
      <div class="sub-select-list" v-bind:style="{width: widthData}" v-if="showData">
        <div class="sub-select-item" v-for="(item, index) in dataList" :key="item[defaultOption.value]" @click.stop="select(item, index)">
          {{item[defaultOption.label]}}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.base-select {
  position: relative;
  margin-left: 10px;
  top: 0px;
  float: right;
  height: 23px;
  border: 1px solid #c0c4cc;
  width: 200px;
  &:after {
    position: absolute;
    top: 50%;
    right: 2px;
    transform: translateY(-50%);
    content: "";
    width: 0;
    border-top: 5px solid black;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    height: 0;
  }
  .sub-selected-value {
    .sub-select-list {
      position: absolute;
      top: 33px;
      background: white;
      //width: 160px;
      box-shadow: 1px 1px 1px 1px #d9d9d9;
      z-index: 9;
      .sub-select-item {
        width: auto;
        line-height: 28px;
        position: relative;
        text-align: left;
        cursor: pointer;
        img {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(-0.1rem, -50%);
          width: 0.8125rem;
          height: 0.625rem;
        }
      }
    }
  }
}
</style>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      showData: false,
    }
  },
  props: {
    defaultOption: {
      type: Object,
      default: function () {
        return {
          value: 'value',
          label: 'label',
        }
      }
    },
    dataList: Array,
    selectedValue: Object,
    widthData: {
      type: String,
      default: "200px"
    }
  },
  methods: {
    showDataList() {
      this.showData = !this.showData
    },
    select(item) {
      this.showData = false;
      //this.selectedValue=item;
      //赋值的时候要分开写
      this.selectedValue.label = item[this.defaultOption.label];
      this.selectedValue.value = item[this.defaultOption.value];
      this.$emit('select');
    },
  },
  mounted() {
  }
}
</script>