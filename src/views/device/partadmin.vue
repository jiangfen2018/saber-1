<template>
  <div class="container">
    <searchStyle02 :data='searchInput'
                   @searchInputFather="searchInputFather"></searchStyle02>
    <searchStyle01 :data='searchItem.machine'
                   @searchFather="searchFather"
                   name='dictValue'></searchStyle01>
    <searchStyle01 :data='searchItem.class'
                   @searchFather="searchFather"
                   name='dictValue'></searchStyle01>
    <searchStyle01 :data='searchItem.device'
                   @searchFather="searchFather"></searchStyle01>
    <div class="main">
      <!-- <cbutton title='添加配置' @clickButton='clickButton'></cbutton> -->
      <table08 :data='data'
               @onClickConfig='onClickConfig'
               @onClickSee='onClickSee'></table08>
      <cpagination v-bind:child-msg="page"
                   @callFather='callFather'></cpagination>
    </div>
  </div>
</template>

<script>
import table08 from '@/components/table08'
import searchStyle01 from '@/components/searchStyle01'
import searchStyle02 from '@/components/searchStyle02'
import { getListItem } from "@/api/system/dict";
import { selectTypeList } from "@/api/platform_device/devicetype";
import { getList } from "@/api/platform_device/typeconfig";
export default {
  data () {
    return {
      data: [],
      page: {
        pageSize: 42,
        pages: 1,
        currentPage: 1,
      },
      query: {},
      searchInput: [{ name: '名称', value: '1', label: 'name', type: 'input' }],
      searchItem: {
        machine: { label: '项目', res: [] },
        class: { label: '类别', res: [] },
        device: { label: '设备', res: [], },
      },
    };
  },
  computed: {},
  components: {
    table08, searchStyle02, searchStyle01
  },
  created () {
    this.getSelect('machine')
    this.getSelect('class')
    this.getSelect('device')
    this.onLoad(this.page)
  },
  methods: {

    callFather (parm) {
      this.page.currentPage = parm.currentPage
      this.onLoad(this.page)
    },
    clickButton () {
      /*       this.editFormVisible = true */
    },
    getSelect (item) {
      if (item === 'device') {
        selectTypeList().then(res => {
          this.searchItem[item].res = res.data.data
        });
      } else {
        getListItem(item).then(res => {
          this.searchItem[item].res = res.data.data
        });
      }
    },
    searchInputFather (inputValue) {
      this.query['a.name'] = inputValue.name
      this.onLoad(this.page)
    },
    searchFather (label, item) {
      switch (label) {
        case "项目":
          this.query["b.project_equal"] = item.dictKey;
          this.query["a.typeId_equal"] = undefined;
          selectTypeList(item.dictKey, undefined).then(res => {
            this.searchItem['device'].res = res.data.data;
          });
          break;
        case "类别":
          this.query["b.type"] = item.dictKey;
          this.query["a.typeId_equal"] = undefined;
          selectTypeList(undefined, item.dictKey).then(res => {
            this.searchItem['device'].res = res.data.data;
          });
          break;
        case '设备':
          this.query['a.typeId_equal'] = item.id
          break;
        default:
          break;
      }
      this.onLoad(this.page)
    },
    onClickConfig (item) {
      this.$router.push({
        name: '配件配置列表',
        path: '/device/partpart',
        query: {
          id: item.id,
          status: 1,
          deviceName: item.name
        },
        params: {
          info: item
        }
      })
    },
    onClickSee (item) {
      this.$router.push({
        name: '配件列表',
        path: '/device/partlist',
        query: {
          id: item.id,
          deviceName: item.name,
          type: item.type,
          status: 1,
          project: item.project
        },
        params: {
          info: item
        }
      })
    },
    onLoad (page, params = {}) {
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.data = data.records;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.container {
  margin: 20px 40px;
  width: auto;

  .main {
    margin-top: 20px;
    // width: 1250px;
  }
}
</style>
