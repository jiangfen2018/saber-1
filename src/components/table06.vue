<template>
  <div class="wrapper">
    <div class="list-box"
         v-for='device in data'
         :key="device.id">
      <h3>{{device.equipment}}({{device.name}})</h3>
      <!-- <h3 v-if="device.status=='0'">{{device.equipment}}</h3>
      <h3 v-if="device.status=='1'">{{device.name}}</h3> -->
      <div class="list-scroll">
        <div v-if='device.parts.length>0'>
          <table07 :data='device.parts' :equipment='device.equipment' :name='device.name'
                   :option='option_deliver' @onClickConfig="editInfo"></table07>
        </div>
        <div v-else
             style="text-align:center">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import table07 from '@/components/table07'
export default {
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    option: {
      type: Object,
      default: function () {
        return {
          head: { isShow: true, label: '' },//头部
          button: [true, true, true],//按钮
          onbutton: true,//点击进入
          price: true,//价格
          column: []
        }
      }
    }
  },
  data () {
    return {
      option_deliver: {},
    };
  },
  components: {
    table07
  },
  computed: {},
  created () {
    this.option_deliver = this.option
  },
  methods: {
    editInfo(item){
      console.log('06 item',item);
      
      this.$parent.editInfo(item)
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  .list-box {
    border: 1px solid #89c3f8;
    margin: 10px 0;
    padding: 10px 20px;

    .list-scroll {
      height: 325px;
      overflow-y: scroll;
    }
  }

  h3 {
    color: #606266;
    font-size: 14px;
    font-weight: normal;
    margin-bottom: 0;
    padding-bottom: 10px;
  }
}
</style>
