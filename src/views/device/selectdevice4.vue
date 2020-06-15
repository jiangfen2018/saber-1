<template>
  <div class="container">
    <div class="list">
      <div class="item-name">筛选</div>
      <div class="item-list">
        <span class="item-box">
          <label>名称</label>
          <el-input v-model="name" clearable class="my-input" size="mini"></el-input>
        </span>
        <span class="item-box" prop="customerId">
          <label>客戶</label>
          <el-select class="my-input" v-model="customerId" size="mini" @change="changeCustomer">
            <el-option
              v-for="item in selectDataCustomer"
              :key="item.id"
              :label="item.customerName"
              :value="item.id"
            ></el-option>
          </el-select>
        </span>
        <span class="item-box" prop="projectId">
          <label>项目</label>
          <el-select class="my-input" v-model="projectId" size="mini" @change="changeProject">
            <el-option
              v-for="item in selectDataProject"
              :key="item.id"
              :label="item.projectName"
              :value="item.id"
            ></el-option>
          </el-select>
        </span>

        <span class="search-btn" @click="searchInputFather">查询</span>
      </div>

      <!-- <el-form ref="form" :inline="true" label-width="80px">
        <el-form-item label="客户2: " prop="customerId" style="margin-top:15px;padding-left:35px">
          <el-select v-model="customerId" size="mini" @change="changeCustomer">
            <el-option
              v-for="item in selectDataCustomer"
              :key="item.id"
              :label="item.customerName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目: " prop="projectId" style="margin-top:15px;padding-left:35px">
          <el-select v-model="projectId" size="mini" @change="changeProject">
            <el-option
              v-for="item in selectDataProject"
              :key="item.id"
              :label="item.projectName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

       
      </el-form>-->
    </div>
    <!-- <searchStyle02 :data="searchInput" @searchInputFather="searchInputFather"></searchStyle02> -->
    <searchStyle01 :data="searchItem.machine" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.class" @searchFather="searchFather" name="dictValue"></searchStyle01>
    <searchStyle01 :data="searchItem.device" @searchFather="searchFather"></searchStyle01>

    <!-- <searchStyle01 :data='searchItem.machine'
                   @searchFather="searchFather"
                   name='dictValue'></searchStyle01>
    <searchStyle01 :data='searchItem.class'
                   @searchFather="searchFather"
                   name='dictValue'></searchStyle01>
    <searchStyle01 :data='searchItem.device'
                   @searchFather="searchFather"></searchStyle01>
    <searchStyle01 :data='searchItem.model'
    @searchFather="searchFather"></searchStyle01>-->

    <div class="part-box">
      <h3>已选中</h3>
      <div class="item" v-for="item in selectParts" :key="item.id">
        <div class="selectedlist">
          <div class="detail">
            <p>
              <span>{{item.equipment}}</span>
            </p>
            <p>
              <label>标准号</label>
              <span>{{item.standard}}</span>
            </p>
            <p>
              <label>图号</label>
              <span>{{item.chart}}</span>
            </p>
            <p>
              <label>重量（吨）</label>
              <span>{{item.weight}}</span>
            </p>
            <p class="setting">
              <label>参数</label>
              <span>{{item.param}}</span>
            </p>
            <p>
              <label>数量</label>
              <span>{{item.num}}</span>
            </p>
            <div class="close-button">
              <el-button size="mini" icon="el-icon-close" circle @click="deletePart(item)"></el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="part-box">
      <!--  :label="item.id" -->
      <h3>选择设备</h3>
      <!-- 单选框组件 -->
      <radioPart01 :data="data" :flag="flag"></radioPart01>
      <!-- <el-radio
        v-model="radio"
        v-for="item in data"
        :key="item.id"
        :label="item"
        @change="changeRadio"
      >
        <div class="list">
          <div class="detail">
            <p>
              <label>名称</label>
              <span>{{item.equipment}}</span>
            </p>
            <p>
              <label>标准号</label>
              <span>{{item.standard}}</span>
            </p>
            <p>
              <label>图号</label>
              <span>{{item.chart}}</span>
            </p>
            <p>
              <label>重量（吨）</label>
              <span>{{item.weight}}</span>
            </p>
            <p v-if="status==0">
              <label>数量</label>
              <span>{{item.num}}</span>
            </p>
            <p v-if="status==1">
              <label>数量</label>
              <span>
                <cinput v-model="num"></cinput>
              </span>
            </p>
            <p>
              <label>参数</label>
              <span>{{item.param}}</span>
            </p>
          </div>
        </div>
      </el-radio>-->
      <cpagination v-bind:child-msg="page" @callFather="callFather"></cpagination>
    </div>
    <div class="btn-box">
      <el-button type="primary" :loading="loading" @click="selectedsave">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import radioPart01 from "@/components/radioPart01";
import { getListItem } from "@/api/system/dict";
import {
  selectTypeList,
  selectModelList
} from "@/api/platform_device/devicetype";
import {
  getList,
  selected,
  tempsave,
  removetemp,
  selectedsave
} from "@/api/customer/orderequipmentlisttemp";
import {
  designDeviceSelectedSave,
  designedSelectList
} from "@/api/platform_device/project";
import {
  selectOrderProjectList,
  selectOrderCustomerList
} from "@/api/customer/customer";

export default {
  // props:['status'],
  data() {
    return {
      flag: 2,
      name: undefined,
      selectParts: [],
      radio: undefined,
      num: undefined,
      form: {},
      page: {
        pageSize: 50,
        pages: 1,
        currentPage: 1
      },
      data: [],
      searchInput: [{ name: "名称", value: "1", label: "name", type: "input" }],
      searchItem: {
        machine: { label: "项目", res: [] },
        class: { label: "类别", res: [] },
        device: { label: "设备", res: [] },
        model: { label: "型号", res: [] }
      },
      query: {
        "a.parentId_notlike": undefined,
        "a.job_status_equal": 3,
        "b.status_equal": this.$route.query.status
      },
      selectDataCustomer: [],
      selectDataProject: [],
      customerId: undefined,
      projectId: undefined,
      status: this.$route.query.status,
      ids: "",
      nums: "",
      loading: false
    };
  },
  computed: {},
  components: {
    radioPart01
  },
  beforeRouteUpdate(to, from, next) {
    if (to.query.id) {
      this.selected();
    }
    selectOrderProjectList().then(res => {
      this.selectDataProject = res.data.data;
    });
    this.getSelectCondition();
  },
  created() {
    // this.getSelect('machine')
    // this.getSelect('class')
    // this.getSelect('device')
    // this.getSelect('model')
    this.getSelectCondition();
    if (this.$route.query.id) {
      this.selected();
    }
    selectOrderCustomerList().then(res => {
      this.selectDataCustomer = res.data.data;
    });
  },

  methods: {
    selectedsave() {
      this.loading = true;
      if (this.$route.query.id && this.ids.length > 0) {
        designDeviceSelectedSave(
          this.typeIds,
          this.ids,
          this.nums,
          this.parentIds,
          this.$route.query.id
        ).then(res => {
          this.loading = false;
          this.$router.push({
            name: "项目详情",
            path: "/customer/projectDetail",
            query: {
              id: this.$route.query.id
            }
          }).catch(err =>{
              this.loading = false;
          });
        });
      } else {
        this.$message({ type: "error", message: "请至少选中一个！!" });
      }

      // selectedsave(this.ids, this.nums, this.$route.query.id).then(res => {
      //   this.$router.push({
      //     path: '/customer/projectDetail',
      //     query: {
      //       id: this.$route.query.id
      //     }
      //   })
      // });
      //}
    },
    cancel() {
      this.$router.back();
    },
    deletePart(one) {
      var i = undefined;
      this.selectParts.forEach(function(item, index, arr) {
        if (item.id == one.id) {
          i = index;
        }
      });
      this.selectParts.splice(i, 1);
      this.selected();
      // removetemp(item.id).then(res => {
      //   this.selected()
      // });
    },
    changeRadio(item, num) {
      this.num = num;
      if (this.$route.query.id) {
        if (this.$route.query.status == 1 && this.num) {
          this.$message({ type: "error", message: "请填写数量!" });
          this.radio = undefined;
          return;
        } else if (this.$route.query.status == 1 && !this.num) {
          item.num = this.num;
        } else {
          this.num = item.num;
        }
        this.selectParts.push(item);
        this.selected();
        this.num = undefined;
        // tempsave({
        //   number: this.num,
        //   sequenceId: val,
        //   projectId: this.$route.query.id
        // }).then(res => {
        //   this.selected()
        //   this.num = undefined
        //   this.query['a.id_notin'] = this.ids
        //   this.onLoad(this.page)
        // });
      }
    },
    selected() {
      // selected({ projectId: this.$route.query.id, status: 1 }).then(res => {
      //   this.selectParts = res.data.data
      //   this.ids = ''
      //   this.nums = ''
      //   this.selectParts.forEach(element => {
      //     this.ids = this.ids + element.sequenceId + ','
      //     this.nums = this.nums + element.number + ','
      //   });

      this.ids = "";
      this.nums = "";

      this.selectParts.forEach(element => {
        // this.typeIds = this.typeIds + element.typeId + ','
        this.ids = this.ids + element.id + ",";
        // this.parentIds = this.parentIds + element.id + ','
        this.nums = this.nums + element.num + ",";
      });

      // this.query["h.id_notin"] = this.ids; 由于需求原因不进行过滤
      this.onLoad(this.page);
      this.radio = undefined;

      // });
    },
    changeCustomer() {
      selectOrderProjectList(this.customerId).then(res => {
        this.selectDataProject = res.data.data;
      });
    },
    changeProject() {
      //当变化项目的时候 刷新下方设备 显示对应项目的设备列表
      if (this.projectId) {
        this.query["g.projectId_equal"] = this.projectId;
      }

      this.onLoad(this.page);
    },
    getSelectCondition() {
      selectTypeList().then(res => {
        this.searchItem["device"].res = res.data.data;
      });
      selectModelList().then(res => {
        this.searchItem["model"].res = res.data.data;
      });
      getListItem("machine").then(res => {
        this.searchItem["machine"].res = res.data.data;
      });
      getListItem("class").then(res => {
        this.searchItem["class"].res = res.data.data;
      });
    },
    getSelect(item) {
      if (item === "device") {
        selectTypeList().then(res => {
          this.searchItem[item].res = res.data.data;
        });
      }
      if (item === "model") {
        selectModelList().then(res => {
          this.searchItem[item].res = res.data.data;
        });
      } else {
        getListItem(item).then(res => {
          this.searchItem[item].res = res.data.data;
        });
      }
    },
    searchInputFather(inputValue) {
      if (this.status == 0) {
        this.query["d.name"] = this.name;
      }
      if (this.status == 1) {
        this.query["f.name"] = this.name;
      }

      this.onLoad(this.page);
    },
    callFather(parm) {
      this.page.currentPage = parm.currentPage;
      this.onLoad(this.page);
    },
    onLoad(page, params = {}) {
      designedSelectList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then(res => {
        const data = res.data.data;
        this.page.pages = data.pages;
        this.data = data.records;
        // console.log( this.data)
      });
    },
    searchFather(label, item) {
      switch (label) {
        case "项目":
          this.query["d.project_equal"] = item.dictKey;
          this.query["c.parentId_equal"] = undefined;
          this.query["a.typeId_equal"] = undefined;
          selectTypeList(item.dictKey, undefined).then(res => {
            this.searchItem["device"].res = res.data.data;
          });
          break;
        case "类别":
          this.query["d.type"] = item.dictKey;
          this.query["c.parentId_equal"] = undefined;
          this.query["a.typeId_equal"] = undefined;
          selectTypeList(undefined, item.dictKey).then(res => {
            this.searchItem["device"].res = res.data.data;
          });
          break;
        case "型号":
          this.query["a.typeId_equal"] = item.id;
          break;
        case "设备":
          this.query["c.parentId_equal"] = item.id;
          this.query["a.typeId_equal"] = undefined;
          selectModelList(item.id).then(res => {
            this.searchItem["model"].res = res.data.data;
          });
          break;
        default:
          break;
      }
      this.onLoad(this.page);
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
      display: flex;
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

.my-input {
  width: auto;
  margin-left: 10px;
  margin-right: 20px;
}

.list {
  border-bottom: 1px dashed #DCDFE6;
  padding: 10px 0;
  display: flex;
  align-items: center;
  font-size: 0.07rem;

  .item-name {
    width: 80px;
    color: #303133;

    &:after {
      content: ':';
      margin-left: 4px;
    }
  }

  .item-box {
    label {
      color: #606266;

      &:after {
        content: ':';
        margin-left: 4px;
      }
    }
  }

  .search-btn {
    background-color: #8693f3;
    padding: 2px 22px;
    border-radius: 4px;
    color: #fff;
    margin-left: 20px;
    cursor: pointer;
    position: relative;
    top: 2px;
    height: 16px !important;
    line-height: 15px;
  }

  .detail {
    border: 1px #ccc solid;
    border-radius: 5px;
    color: #303133;
    margin: 0 auto;
    background-color: #fff;
    font-size: 14px;
    padding: 10px 20px 5px 20px;
    margin: 5px 0;

    &:hover {
      transform: translateY(-3px);
      border: 1px #409EFF solid;
      box-shadow: 1px 1px 3px 3px #cccccc;
    }

    p {
      color: #909399;
      margin: 12px 0;

      label {
        display: inline-block;
        color: #303133;
        width: 90px;
        text-align-last: justify;

        &:after {
          content: ':';
          padding-right: 15px;
        }
      }

      span {
        white-space: pre-wrap;
        line-height: 20px;
      }
    }

    .price {
      font-size: 20px;
      color: #E6A23C;

      &:before {
        padding-right: 10px;
        content: '¥';
      }
    }
  }

  .btn-wrapper {
    display: flex;
    margin: 20px 20px 5px 20px;
    justify-content: space-between;

    .btn {
      width: 60px;
      font-size: 14px;
      padding: 2px 0;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
      background-color: #DCDFE6;
    }
  }
}

.selectedlist {
  width: 292px;
  margin: 2px 2px 0 2px;

  .setting {
    display: inline-block;
    color: #303133;

    label {
      width: 90px;
      display: inline-block;
      vertical-align: top;
    }

    span {
      width: 138px;
      margin: auto;
      text-align: left;
      display: inline-block;
    }
  }

  .detail {
    position: relative;
    color: #303133;
    margin: 0 auto;
    background-color: #3c8dc4;
    font-size: 14px;
    padding: 20px 30px 10px 30px;

    p {
      color: #fff;
      // margin: 12px 0;
      margin-top: 12px;

      label {
        display: inline-block;
        color: #fff;
        width: 90px;
        text-align-last: justify;

        &:after {
          content: ':';
          padding-right: 15px;
        }
      }
    }

    .price {
      font-size: 20px;
      color: #E6A23C;

      &:before {
        padding-right: 10px;
        content: '¥';
      }
    }

    .close-button {
      position: absolute;
      width: 10px;
      height: 10px;
      right: 25px;
      top: 10px;
      z-index: 100;
    }
  }

  .btn-wrapper {
    display: flex;
    margin: 20px 20px 5px 20px;
    justify-content: space-between;

    .btn {
      width: 60px;
      font-size: 14px;
      padding: 2px 0;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
      background-color: #DCDFE6;
    }
  }
}
</style>
