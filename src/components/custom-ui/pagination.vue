<template>
  <div class="page-wrapper">
    <span>第{{page.currentPage}}页/共{{page.pages}}页</span>
    <span @click="changePage('home')">首页</span>
    <span @click="changePage('pre')">上一页</span>
    <span @click="changePage('next')">下一页</span>
    <span @click="changePage('last')">尾页</span>
  </div>
</template>

<script>
export default {
  props: {
    childMsg: {
      type: Object,
      default: function () {
        return {
          pageSize: 25,
          pages: 0,
          currentPage: 1,
        }
      }
    }
  },
  watch: {
    childMsg: {
      handler(newValue) {
        this.page.pages=newValue.pages
      },
      deep: true
    }
  },
  data() {
    return {
      page: {
        pageSize: this.childMsg.pageSize,/* 每页数 */
        pages: this.childMsg.pages,/* 总页数 */
        currentPage: this.childMsg.currentPage,/* 当前页 */
      },
    }
  },
  methods: {
    changePage(type) {/* 仅改变当前页码操作 */
      switch (type) {
        case 'home':
          this.page.currentPage = 1
          break;
        case 'pre':
          if (this.page.currentPage > 1) {
            this.page.currentPage--
          }
          break;
        case 'next':
          if (this.page.currentPage < this.page.pages) {
            this.page.currentPage++
          }
          break;
        case 'last':
          this.page.currentPage = this.page.pages
          break;
        default:
          break;
      }
      this.$emit("callFather", this.page);
    }
  }
};
</script>
<style lang="stylus" scoped>
.page-wrapper
  margin-top: 30px
  font-size: 14px
  text-align: center
  margin-bottom 20px
  span
    margin: 0 5px
    color: #909399
    &:nth-child(n+2)
      cursor: pointer
</style>
