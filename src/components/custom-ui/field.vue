 <template>
  <div class="c-box">
  <!--   <div v-if="type==='select'" class="form-item">
      <div class="title">{{label}}</div>
      <div class="content">
        <cselect :options='options' :defaultOption='defaultOption'></cselect>
      </div>
    </div>

    <div v-if="type==='input'" class="form-item">
      <div class="title"></div>
      <div class="content">
        <cinput v-if="type==='type'" v-model="value"></cinput>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
 /* props: {
    label: [String],
    type: [String],
    value: [String],
    options: {
      type: Array,
      default: []
    },
    defaultOption: {
      type: Object,
      default: function () {
        return {
          value: 'value',
          label: 'lael',
        }
      }
    }
  },*/
}; 
</script>
<style lang="stylus" scoped>
.form-item
  display: flex
  color: #606266
  font-size: 14px
  margin: 24px 0
  .content
    padding-left: 10px
  .title
    padding-right: 20px
    width: 50px
    &:after
      content: ':'
</style>
