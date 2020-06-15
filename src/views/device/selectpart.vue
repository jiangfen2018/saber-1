<template>
  <div class="container">
    <searchStyle02 :data="searchInput"
                   @searchInputFather="searchInputFather"></searchStyle02>
    <!-- <searchStyle01 :data="searchItem.machine"
                   @searchFather="searchFather"
                   name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.class"
                   @searchFather="searchFather"
                   name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.device"
                   @searchFather="searchFather"></searchStyle01> -->
    <div class="part-box">
      <h3>已选中</h3>
      <div class="item"
           v-for="item in selectParts"
           :key="item.id">
        <span class="name">{{item.name}}</span>
        <el-button size="mini"
                   icon="el-icon-close"
                   circle
                   @click="deletePart(item)"></el-button>
      </div>
    </div>

    <div class="part-box">
      <h3 style="padding-bottom:10px">选择配件</h3>
        <!-- 单选框组件 -->
       <radioPart02 :data="data"  :flag='flag'></radioPart02>
      <!-- <el-radio v-model="radio"
                v-for="item in data"
                :key="item.id"
                :label="item.id"
                @change="changeRadio">{{item.name}}</el-radio> -->
      <cpagination v-bind:child-msg="page"
                   @callFather="callFather"></cpagination>
    </div>
    <div class="btn-box">
      <el-button type="primary"
                 @click="selectedsave">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import radioPart02 from "@/components/radioPart02";
import { getListItem } from "@/api/system/dict";
import { selectTypeList } from "@/api/platform_device/devicetype";
import {
  getList,
  selected,
  updateTempTypeId,
  removetemp,
  selectedsave
} from "@/api/platform_device/typeconfig";

export default {
  data () {
    return {
      flag:true,
      selectParts: [],
      radio: undefined,
      page: {
        pageSize: 50,
        pages: 1,
        currentPage: 1
      },
      data: [],
      searchInput: [{ value: "1", label: "name", type: "input" }],
      searchItem: {
        machine: { label: "项目", res: [] },
        class: { label: "类别", res: [] },
        device: { label: "设备", res: [] }
      },
      query: {
        "a.typeId_notlike": undefined,
        'distinct':'false'
      },
      ids: ""

    };
  },
  computed: {},
  components: {
    radioPart02
  },
  created () {
    this.getSelect("machine");
    this.getSelect("class");
    this.getSelect("device");
    if (this.$route.query.id) {
      this.query["a.typeId_notlike"] = this.$route.query.id;
      this.selected();
    }
  },

  methods: {
    selectedsave () {
      if (this.$route.query.id && this.ids.length > 0) {
        selectedsave(this.ids, this.$route.query.id).then(res => {
          this.$router.push({
            name: "设备配置",
            path: "/device/devicepart",
            query: {
              id: this.$route.query.id,
              deviceName: this.$route.query.deviceName
            }
          });
        });
      }
    },
    cancel () {
      this.$router.back();
    },
    deletePart (one) {
      debugger
      // var i = undefined
      //   this.selectParts.forEach(function(item, index, arr) {
      //         if (item.index == one.index) {
      //           i = index;
      //         }
      //   });
           this.selectParts.splice(one.index, 1);
           this.selected();
     
      // removetemp(item.id).then(res => {
      //   this.selected();
      // });
    },
    changeRadio (item,val) {
      // val=item.id;
      if (this.$route.query.id) {
        // updateTempTypeId({
        //   id: val,
        //   typeId: this.$route.query.id
        // }).then(res => {
        //   this.selected();
        //   // this.query["a.id_notin"] = this.ids; 由于需求原因不进行过滤
        //   this.onLoad(this.page);
        // });
         item.index=  this.selectParts.length
         this.selectParts.push(item)
          // this.onLoad(this.page);
          this.selected();
      }
    },
    selected () {
      // selected({ typeId: this.$route.query.id }).then(res => {
        // this.selectParts = res.data.data;
        this.ids = "";
        this.selectParts.forEach(element => {
          this.ids = this.ids + element.id + ",";
        });
        // this.query["a.id_notin"] = this.ids; 由于需求原因不进行过滤
        this.onLoad(this.page);
        this.radio = undefined;
      // });
    },
    getSelect (item) {
      if (item === "device") {
        selectTypeList().then(res => {
          this.searchItem[item].res = res.data.data;
        });
      } else {
        getListItem(item).then(res => {
          this.searchItem[item].res = res.data.data;
        });
      }
    },
    searchInputFather (inputValue) {
      this.query["a.name"] = inputValue.name;
      this.onLoad(this.page);
    },
    callFather (parm) {
      this.page.currentPage = parm.currentPage;
      this.onLoad(this.page);
    },
    onLoad (page, params = {}) {
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.data = data.records;
      });
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
        case "设备":
          this.query["a.typeId_equal"] = item.id;
          break;
        default:
          break;
      }
      this.onLoad(this.page);
    },
    close () {
      alert();
      this.$store.commit("DEL_TAG");
    }
  }
};
</script>

<style lang="stylus" scoped>
.container {
  margin: 20px 40px;
  width: auto;

  .part-box {
    background-color: #ffffff;
    padding: 10px 20px 20px 20px;
    margin-top: 20px;

    h3 {
      color: #606266;
      font-size: 16px;
      font-weight: normal;
    }

    .item {
      align-items: center;
      display: inline-block;
      margin-right: 30px;

      .name {
        display: inline-block;
        padding: 2px 0;
        width: 150px;
        height: 30px;
        background: #8693f3;
        color: #ffffff;
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        margin-right: 10px;
      }
    }
  }

  .btn-box {
    text-align: center;
    margin-top: 20px;
  }
}
</style>
