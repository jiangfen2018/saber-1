<template>
  <div class="wrapper">
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
    <el-radio v-model="radio" label="3">备选项</el-radio>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: function () {
        return [{}]
      }
    },
  },
  data() {
    return {
      radio: undefined
    };
  },
  components: {

  },
  computed: {},
  created() {

  },
  methods: {

  }
};
</script>

<style lang="stylus" scoped></style>
