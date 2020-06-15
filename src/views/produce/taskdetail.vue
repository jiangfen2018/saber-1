<template>

  <div>
    <div class="container"
         v-if="isLoad">
      <div class="introduce">
        <div class="item">
          <div class="title">客户</div>
          <div class="text">
            <div class="href"
                 @click="goToCustomer(projectInfo.customerName)">{{projectInfo.customerName}}</div>
          </div>
        </div>
        <div class="item">
          <div class="title">项目</div>
          <div class="text">
            <div class="href"
                 @click="goToProject(projectInfo.projectName)">{{projectInfo.projectName}}</div>
          </div>
        </div>
        <div class="item">
          <div class="title">合同号</div>
          <div class="text">
            <div class="href">{{projectInfo.contractNo}}</div>
          </div>
        </div>
        <div class="item">
          <div class="title">项目类型</div>
          <div class="text">{{projectInfo.typeName}}</div>
        </div>
        <div class="item">
          <div class="title">任务单时间</div>
          <div class="text">{{projectInfo.jobCreateTime|timeFilter }}</div>
        </div>
        <div class="item">
          <div class="title">交付时间</div>
          <div class="text">{{projectInfo.payTime|timeFilter}}</div>
        </div>
        <div class="item">
          <div class="title">机型</div>
          <div class="text">{{projectInfo.model}}</div>
        </div>
        <div class="item">
          <div class="title">弧度半径</div>
          <div class="text">{{projectInfo.radiusGyration}}</div>
        </div>
        <div class="item">
          <div class="title">铸机流数</div>
          <div class="text">{{projectInfo.flow}}</div>
        </div>
        <div class="item">
          <div class="title">浇筑钢种</div>
          <div class="text">{{projectInfo.steelGrade}}</div>
        </div>
        <div class="item">
          <div class="title">浇筑断面</div>
          <div class="text">{{projectInfo.section}}</div>
        </div>
        <div class="item">
          <div class="title">定尺长度</div>
          <div class="text">{{projectInfo.fixed}}</div>
        </div>
      </div>

    <div  style="padding-top:10px"></div>
   


      <el-dialog title="图纸目录" :visible.sync="paperVisible" width="60%">
            <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
          </el-input>
          <el-tree
            class="filter-tree"
            :data="catalogData"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            ref="tree">
          </el-tree>
           <div slot="footer"
           class="dialog-footer">
        <el-button size="small"
                   @click="closeDialog()">取消</el-button>
        <el-button size="small"
                   type="primary"
                   :loading="loading"
                   @click="submitForm1('form')">同步</el-button>
      </div>
      </el-dialog>




      <!-- <div style="margin:10px 0;color:red">请填写完当面，点击更新进行保存！</div> -->
 
      <div class="table-box">
        <div class="item"
             v-for="(item,i) in data_part"
             :key="item.id">
          <div>
            <el-row type="flex" style="padding-top:20px;padding-bottom:5px;">
        
            </el-row>
            <el-row type="flex">
               <el-col :span="18"  >
                 <div class="title">(编号：{{item.id}}) &nbsp;  &nbsp; {{item.equipment}}({{item.name}})  
                   <cbutton class="btn"
                     title="添加配件"
                     @clickButton="addPartDialog(item)"></cbutton>
                      <span  style="padding-left:50px" ></span>
                      <el-button type="primary"
                          size="mini" v-if="projectInfo.type!=2 && projectInfo.type!=4"
                          @click.native.prevent="showCatalog(item.id,item.equipment,item.name)"
                          class="login-submit"
                          style="margin-left:10px;width:200px;">图纸目录一览</el-button>
                      <span  style="padding-left:50px" ></span>
                          <el-button class="ml10" type="text" size="medium"
                            v-clipboard:copy="item.paperUrl"  
                            v-clipboard:success="onCopy"
                            v-clipboard:error="onError">点击复制图纸地址</el-button>

                            <span  style="padding-left:50px" ></span> <el-button type="primary" size="mini"  @click.native.prevent="updateOneData(item,i)">保存</el-button>
                          </div>
             </el-col>
      
            </el-row>
        
           
          </div>
          <div class="main-box">
            <div class="input-box">
              <div class="input-list">
                <el-form ref="form"
                         :model="form"
                         label-width="86px">
                  <el-form-item label="图号">
                    <el-input size="mini"
                              v-model="item.chart"></el-input>
                              <!-- <el-input size="mini"
                              v-model="formChartArr[i]"></el-input> -->
                  </el-form-item>
                </el-form>
              </div>
              <div class="input-list">
                <el-form ref="form"
                         :model="form"
                         label-width="86px">
                  <el-form-item label="工程师">
                    <el-select v-model="item.engineer"
                               size="mini"
                               style="width:auto; padding-right:10px">
                      <el-option v-for="item in engineerArr"
                                 :key="item.id"
                                 :label="item.realName"
                                 :value="item.id"></el-option>
                                   <!-- <el-select v-model="formEngineerArr[i]"
                               size="mini"
                               style="width:auto; padding-right:10px">
                      <el-option v-for="item in engineerArr"
                                 :key="item.id"
                                 :label="item.realName"
                                 :value="item.id"></el-option> -->
                    </el-select>
                    <el-button type="primary" size="mini"   @click.native.prevent="upload(item)"   >上传</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="input-list-fix">
                <el-form ref="form"
                         :model="form"
                         label-width="86px">
                  <el-form-item label="数量">{{item.num}}</el-form-item>
                </el-form>
              </div>
              <div class="input-list">
                <el-form ref="form"
                         :model="form"
                         label-width="86px">
                  <el-form-item label="状态">
                    <el-select v-model="item.jobStatus"
                               size="mini" @change="changeStatus(item)"
                               style="width:auto;">
                      <el-option v-for="item in statusArr"
                                 :key="item.dictKey"
                                 :label="item.dictValue"
                                 :value="item.dictKey"></el-option>
                    </el-select>
                    <!-- <el-select v-model="formJobStatusArr[i]"
                               size="mini"
                               style="width:auto;">
                      <el-option v-for="item in statusArr"
                                 :key="item.dictKey"
                                 :label="item.dictValue"
                                 :value="item.dictKey"></el-option>
                    </el-select> -->
                  </el-form-item>
                </el-form>
              </div>
              <div class="input-list">
                <el-form ref="form"
                         :model="form"
                         label-width="86px">
                  <el-form-item label="备注">
                    <el-input size="mini"
                              v-model="item.remark"></el-input>
                              <!-- <el-input size="mini"
                              v-model="formRemarkArr[i]"></el-input> -->
                  </el-form-item>
                </el-form>
              </div>
            </div>

            <div class="input-box">
              <!-- <div class="input-list">
                <el-form ref="form"
                         :model="form"
                         label-width="86px">
                  <el-form-item label="规格">
                    <el-input size="mini"
                              v-model="formStandardsArr[i]"></el-input>
                  </el-form-item>
                </el-form>
              </div> -->
              <div class="input-list">
                <el-form ref="form"
                         :model="form"
                         label-width="86px">
                  <el-form-item label="标准号">
                    <el-input size="mini"
                              v-model="item.standard"></el-input> 
                    <!-- <el-input size="mini"
                              v-model="formStandardArr[i]"></el-input> -->
                  </el-form-item>
                </el-form>
              </div>
              <div class="input-list">
                <el-form ref="form"
                         :model="form"
                         label-width="86px">
                  <el-form-item label="单重/吨">
                    <el-input size="mini"
                              v-model="item.weight"></el-input>
                               <!-- <el-input size="mini"
                              v-model="formWeightArr[i]"></el-input> -->
                  </el-form-item>
                </el-form>
              </div>
              <div class="input-list-fix">
                <el-form ref="form"
                         :model="form"
                         label-width="86px">
                  <el-form-item label="单位">{{item.unit}}</el-form-item>
                </el-form>
              </div>
              <div class="input-list">
                <el-form ref="form"
                         :model="form"
                         label-width="86px">
                  <el-form-item label="完成时间">
                    <el-date-picker size="mini"
                                    v-model="item.completeTime"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    style="width:100%"
                                    type="date"
                                    placeholder="选择日期"></el-date-picker>

                                      <!-- <el-date-picker size="mini"
                                    v-model="formCompleteTimeArr[i]"
                                    format="yyyy-MM-dd"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    style="width:100%"
                                    type="date"
                                    placeholder="选择日期"></el-date-picker> -->
                  </el-form-item>
                </el-form>
              </div>
              <div class="input-list">
                <el-form ref="form"
                         :model="form"
                         label-width="86px">
                  <el-form-item label="参数">
                    <el-input size="mini"
                              v-model="item.param"></el-input>
                               <!-- <el-input size="mini"
                              v-model="formParamArr[i]"></el-input> -->
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div>
              <!-- 配件列表  @row-click="editRowDialog" -->

              <avue-crud :data="item.children" v-show="item.children.length>0" :key="item.id"
                     rowKey="id"      :option="option_part">
                <template slot="menu"
                          slot-scope="scope">
                  <el-button size="small"  
                             @click.stop="updateRowDialog(scope.row,scope.index,item.equipment)"
                             type="text"
                             plain>上传</el-button>  
                 <!-- <el-button size="small"
                            v-if="scope.row.paperName"
                             v-clipboard:copy="item.paperLocation" 
                             v-clipboard:success="onCopy"
                             v-clipboard:error="onError"
                             type="text"
                             plain>路径</el-button> -->
                  <el-button size="small"
                             @click.stop="editRowDialog(item,scope.row,scope.index)"
                             type="text"
                             icon="el-icon-edit"
                             plain>编辑</el-button>
                  <el-button size="small"
                             @click.stop="delRow(scope.row,scope.index)"
                             type="text"
                             icon="el-icon-delete"
                             plain>删除</el-button>
                </template>
              </avue-crud>
            </div>
          </div>
        </div>
        <cpagination v-bind:child-msg="page_part"
                     @callFather="callFather"></cpagination>
      </div>
    </div>


   <!-- 上传弹窗 -->
    <el-dialog title ="图纸上传"
               :visible.sync="updateFormVisible"
               width="60%">
      <div style="text-align:center;padding:30px">
        <span> (编号：{{uploadInfo.id}}) &nbsp; &nbsp;{{uploadInfo.equipment}}
          <span v-if="uploadInfo.status ==0">
            ({{uploadInfo.name}})
          </span>
           <span v-if="uploadInfo.status ==1 && uploadInfo.standards">
            ({{uploadInfo.standards}})
          </span>
          </span>
       <el-upload
              class="upload-demo"
                 ref="upload1"
                action
                :http-request="handleFile"
                :on-change="key_path_file"
                :multiple="false"
                :limit="1"
                :file-list="uploadInfo.fileName"
                :on-exceed="onExceed"
                :before-upload = "beforeAvatarUpload"
                accept=".dwg"
              drag>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传dwg文件，且不超过20M,<font color="red">并且文件名称要求以(两位数编号-图号 名称.dwg)格式，例如：01-LZR8.0(Ⅵ)QY-11.01 切前辊道.dwg</font></div>
      </el-upload>
        
      </div>  
        <div slot="footer"
           class="dialog-footer">
              <el-button size="small"
                        @click="closeUploadDialog()">取消</el-button>
              <el-button size="small"
                        type="primary"
                        @click="uploadSubmitForm('editform')">保存</el-button>
      </div>
    </el-dialog>



    <!-- 配件弹窗 -->
    <el-dialog title
               :visible.sync="selectFormVisible"
               width="30%">
      <div style="text-align:center;padding:30px">
        <el-button type="primary"
                   @click="goToSelectPart()">借&nbsp;&nbsp;&nbsp;&nbsp;用</el-button>
        <el-button type="primary"
                   @click="openAdd()">新&nbsp;&nbsp;&nbsp;&nbsp;增</el-button>
      </div>
    </el-dialog>

    <!-- 配件选择 -->
    <el-dialog title="配件选择"
               :key="selectPartFormVisible"
               :visible.sync="selectPartFormVisible"
               width="70%">
      <selectpart4 @selectedPost="selectedPost"
                   @closeSelectDialog="closeSelectDialog"></selectpart4>
    </el-dialog>

    <!-- 配件新增 -->
    <el-dialog title="配件新增"
               :visible.sync="addFormVisible"
               width="30%">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="80px">
        <el-form-item label="设备"
                      prop="equipment">
          <el-input size="mini"
                    v-model="deviceInfo.equipment"
                    :disabled="true"></el-input>
        </el-form-item>

       <el-form-item label="父级"
                      prop="parentItemEquipment">
          <el-input size="mini"
                    v-model="form.parentItemEquipment"
                    @focus="selectParent"  ></el-input>
        </el-form-item>


        <el-form-item label="配件"
                      prop="configId">
          <el-select size="mini"
                     style="width:100%"
                     v-model="form.configId"  filterable clearable
                     placeholder="请选择配件">
            <el-option v-for="item in partSelectData"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格"
                      prop="standards">
          <el-input size="mini"
                    v-model="form.standards"></el-input>
        </el-form-item>
        <el-form-item label="图号"
                      prop="chart">
          <el-input size="mini"
                    v-model="form.chart"></el-input>
        </el-form-item>
        <el-form-item label="标准号"
                      prop="standard">
          <el-input size="mini"
                    v-model="form.standard"></el-input>
        </el-form-item>
        <el-form-item label="重量/吨"
                      prop="weight">
          <el-input size="mini"
                    v-model="form.weight"></el-input>
        </el-form-item>
        <el-form-item label="参数"
                      prop="param">
          <el-input size="mini"
                    v-model="form.param"></el-input>
        </el-form-item>
        <el-form-item label="数量"
                      prop="num">
          <el-input size="mini"
                    v-model="form.num"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="small"
                   @click="closeDialog()">取消</el-button>
        <el-button size="small"
                   type="primary"
                   @click="addSubmitForm('form')">确定</el-button>
      </div>
    </el-dialog>

    <!-- 配件修改 -->
    <el-dialog title="配件修改"
               :visible.sync="editFormVisible"
               width="30%">
      <el-form ref="editform"
               :model="editform"
               :rules="rules"
               label-width="80px">
        <el-form-item label="设备"
                      prop="equipment">
          <el-input size="mini"
                    v-model="editform.equipment"
                    :disabled="true"></el-input>
        </el-form-item>

       <el-form-item label="父级"
                      prop="parentItemEquipment">
          <el-input size="mini"
                    v-model="editform.parentItemEquipment"
                    @focus="selectParent"  ></el-input>
        </el-form-item>

        <el-form-item label="配件"
                      prop="configId">
          <el-select size="mini"
                     style="width:100%" filterable clearable
                     v-model="editform.configId"
                     placeholder="请选择配件">
            <el-option v-for="item in partSelectData"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格"
                      prop="standards">
          <el-input size="mini"
                    v-model="editform.standards"></el-input>
        </el-form-item>
        <el-form-item label="图号"
                      prop="chart">
          <el-input size="mini"
                    v-model="editform.chart"></el-input>
        </el-form-item>
        <el-form-item label="标准号"
                      prop="standard">
          <el-input size="mini"
                    v-model="editform.standard"></el-input>
        </el-form-item>
        <el-form-item label="工程师"
                      prop="engineer">
          <el-select v-model="editform.engineer"
                     size="mini"
                     style="width:auto;">
            <el-option v-for="item in engineerArr"
                       :key="item.id"
                       :label="item.realName"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="重量/吨"
                      prop="weight">
          <el-input size="mini"
                    v-model="editform.weight"></el-input>
        </el-form-item>
        <el-form-item label="参数"
                      prop="param">
          <el-input size="mini"
                    v-model="editform.param"></el-input>
        </el-form-item>
        <el-form-item label="状态"
                      prop="deviceStatus">
           <span>{{editform.deviceStatus}}</span>
        </el-form-item>
        <!-- <el-form-item label="状态"
                      prop="jobStatus">
          <el-select v-model="editform.jobStatus"
                     size="mini"
                     style="width:auto;">
            <el-option v-for="item in statusArr"
                       :key="item.dictKey"
                       :label="item.dictValue"
                       :value="item.dictKey"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="完成时间"
                      prop="completeTime">
          <el-date-picker size="mini"
                          v-model="editform.completeTime"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          style="width:100%"
                          type="date"
                          placeholder="选择日期"></el-date-picker>
        </el-form-item> -->
        <el-form-item label="数量"
                      prop="num">
          <el-input size="mini"
                    v-model="editform.num"></el-input>
        </el-form-item>
          <el-form-item label="提示"
                      prop="tip">
          <span style="color:red"> 点击确定按钮后，请点击对应设备的保存按钮,进行信息的保存</span>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button size="small"
                   @click="closeDialog()">取消</el-button>
        <el-button size="small"
                   type="primary"
                   @click="editSubmitForm('editform')">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="配件父级选择"
               :visible.sync="parentFormVisible"
               width="30%">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterParentText">
          </el-input>

          <el-tree
            class="filter-tree"
            :data="parentList"
            :props="defaultParentProps"
             @node-click="selectedParent"
            default-expand-all
            :filter-node-method="filterNode1"
            ref="tree1">
          </el-tree>
  </el-dialog>

  </div>
</template>

<script>
import {mapGetters} from "vuex";
import table11 from "@/components/table11";
import selectpart4 from "@/views/device/selectpart4";
import { getListItem } from "@/api/system/dict";
import {
  getPartDetail,
  updateData,updateData2,
  getEngineerList,uploadPaper,listFolder,updatePaperData
} from "@/api/platform_device/projectjob";
import { getDetail } from "@/api/platform_device/project";
import cselectConect2 from "@/components/custom-ui/selectConect2";
import { getList as getList2 ,listAll} from "@/api/platform_device/typeconfig";
export default {
  data () {
    return {
      isLoad: true,
      loading: false,
      delIds: undefined,
      partSelectData: [],
      catalogData: [],
      data_part:[],
      obj: {},
      projectInfo: {},
      deviceInfo: {},
      query_part: {
        // 'projectId_equal': undefined
        jobId_equal: undefined
      },
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 1
      },
      page_part: {
        pageSize: 10,
        pages: 1,
        currentPage: 1
      },
      selectPartFormVisible: false,
      parentFormVisible:false,
      addFormVisible: false,
      selectFormVisible: false,
      editFormVisible: false,
      infoFormVisible: false,
      updateFormVisible: false,
      rules: {
        configId: [
          { required: true, message: "请选择配件", trigger: "change" }
        ],
        // typeId: [{ required: true, message: '请选择型号', trigger: 'change' }],
        // chart: [{ required: true, message: "请输入图号", trigger: "blur" }],
        // standard: [
        //   { required: true, message: "请输入标准号", trigger: "blur" }
        // ],
        standards: [
          { required: true, message: "请输入规格", trigger: "blur" }
        ],
        // weight: [{ required: true, message: "请输入重量", trigger: "blur" }],
        param: [{ required: true, message: "请输入参数", trigger: "blur" }],
        num: [{ required: true, message: "请输入数量", trigger: "blur" }]
      },
      form: {
        // customerId: undefined,
        // projectId: undefined,
        // jobType: 0,
      },
      uploadInfo:{},
      editform: {},
      formData: {
        projectJobDTO: undefined
      },
      jobId: undefined,
      rowdata: undefined,
      // rownum: undefined,
      engineerValue:0,
      statusArr: [],
      engineerArr: [],
      formChartArr: [],
      formEngineerArr: [],
      formJobStatusArr: [],
      formStandardArr: [],
      formStandardsArr: [],
      formWeightArr: [],
      formCompleteTimeArr: [],
      formParamArr: [],
      formRemarkArr: [],
      formDeviceArr: [],
      formPartArr: [],
      form_part: {
        customerId: undefined,
        projectId: undefined
      },
      child_form: {},
      edit: false,
      jobCreateTIme: this.$route.query.jobCreateIime,
      option_part: {
        width: "100%",
        tree: true,
        index: true,
        border: true,
        refreshBtn: false,
        page: false,
        header: false,
        align: "center",
        menu: true,
        delBtn: false,
        editBtn: false,
        stripe: true,
        column: [
          { label: "编号", prop: "id" },
          { label: "名称", prop: "equipment" },
          { label: "规格", prop: "standards" },
          { label: "标准号", prop: "standard" },
          { label: "图号", prop: "chart" },
          { label: "工程师", prop: "engineername" },
          { label: "数量", prop: "num" },
          { label: "状态", prop: "deviceStatus" },
          // { label: "状态", prop: "statusname" },
          // { label: "完成时间", prop: "completeTime" },
          { label: "参数", prop: "param" }
        ]
      },
      option: {
        width: "50%",
        index: true,
        border: true,
        refreshBtn: false,
        page: true,
        header: false,
        align: "center",
        addBtn: false,
        menu: false,
        stripe: true,
        column: [
          { label: "客户", prop: "customerName" },
          { label: "项目", prop: "projectName" },
          { label: "合同编号", prop: "contractNo" },
          { label: "销售", prop: "realName" },
          { label: "任务单添加人", prop: "userName" },
          { label: "任务单添加时间", prop: "createTime" },
          { label: "交付时间", prop: "payTime" },
          { label: "备注", prop: "remark" },
          { label: "状态", prop: "progress" }
        ]
      },

     filterText: '',
     filterParentText:'',
     data: [],
     jobEquipmentName:undefined,
     jobEquipmentId:undefined,
     parentItem:{},
     parentList:[],
     defaultProps: {
      children: 'children',
      label: 'label'
    },
    defaultParentProps: {
      children: 'children',
      label: 'equipment'
    },
    addIndex:0,
    paperVisible:false,

    };
  },
  computed: {
      ...mapGetters(["userInfo"]),
  },
  components: {
    cselectConect2,
    table11,
    selectpart4
  },
  beforeRouteUpdate (to, from, next) {
    getEngineerList().then(res => {
      this.engineerArr = res.data.data;
       if(this.engineerArr ){
        for(var i=0;i<this.engineerArr.length;i++){
          if( (this.engineerArr[i].id==(this.userInfo.userId))){
            this.engineerValue = this.userInfo.userId
          }
        }
        
      }else{
         this.engineerValue = 0
      }
    });
    getListItem("job_status").then(res => {
      this.statusArr = res.data.data;
    });
    this.jobId = to.query.id;
    this.projectId = to.query.projectId;
    if (this.projectId) {
      getDetail(this.projectId).then(res => {
        this.projectInfo = res.data.data;
        this.projectInfo["jobCreateTime"] = to.query.jobCreateTime;
        this.projectInfo["payTime"] = to.query.payTime;
    
        
      });

      if (this.projectId) {
        this.query_part.projectId_equal = this.projectId;
        this.onLoad_part(this.page_part);
      }
      getEngineerList().then(res => {
        this.engineerArr = res.data.data;
      });
    }
    next();
  },
  created () {
    this.initEngineer()
    getEngineerList().then(res => {
      this.engineerArr = res.data.data;
      if(this.engineerArr ){
        for(var i=0;i<this.engineerArr.length;i++){
          if( (this.engineerArr[i].id==(this.userInfo.userId))){
            this.engineerValue = this.userInfo.userId
          }
        }
        
      }else{
         this.engineerValue = 0
      }
    });
    getListItem("job_status").then(res => {
      this.statusArr = res.data.data;
    });

    this.jobId = this.$route.query.id;
    this.projectId = this.$route.query.projectId;
    if (this.projectId) {
      getDetail(this.projectId).then(res => {
        this.projectInfo = res.data.data;
        this.projectInfo.jobCreateTime = this.$route.query.jobCreateTime;
        this.projectInfo.payTime = this.$route.query.payTime;
      });

      if (this.projectId) {
        this.query_part.projectId_equal = this.projectId;
         var start = new Date().getTime();
         this.onLoad_part(this.page_part);
        
         
      }
    }
  },
  watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      filterParentText(val) {
        this.$refs.tree1.filter(val);
      }
    },

  methods: {
       dataFilter(val) {
        this.value = val;
        if (val) { //val存在
          this.options = this.optionsCopy.filter((item) => {
            if (!!~item.label.indexOf(val) || !!~item.label.toUpperCase().indexOf(val.toUpperCase())) {
              return true
            }
          })
        } else { //val为空时，还原数组
          this.options = this.optionsCopy;
        }
      },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
   filterNode1(value, data) {
      if (!value) return true;
      return data.equipment.indexOf(value) !== -1;
    },
    initEngineer(){
      console.log(this.userInfo)
    },
    callFather (param) {
      this.page_part.currentPage = param.currentPage;
      this.onLoad_part(this.page_part);
    },
    addSubmitForm (form) {
      // deviceInfo 点击添加的那条记录信息，data_part 是项目添加设备所有的的数据
      this.data_part.forEach(item => {
        if (item.id == this.deviceInfo.id) {
          const dataPart = {};
          for (var i = 0; i < this.partSelectData.length; i++) {
            if (this.partSelectData[i].id == this.form.configId)
              this.form.equipment = this.partSelectData[i].name;
          }
          //  for (var j = 0; j < this.statusArr.length; j++) {
          //   if (this.statusArr[j].dictKey == this.editform.jobStatus)
          //     this.form.statusname = this.statusArr[j].dictValue;
          // }
          this.form.status = 1;
          // this.form.id = item.id
          if(!this.form.engineer){
               this.form.engineer = this.userInfo.userId
               this.form.engineername = this.userInfo.userName
          }
          Object.assign(dataPart, this.form);
          dataPart['typeId'] = item.typeId
          dataPart['deviceStatus'] = '新增' 
          this.addItem(item,dataPart)
          console.log('data part:',this.data_part);
          dataPart.id ='0'
          dataPart.addIndex=this.addIndex++
          dataPart.children=[]
          this.data_part = JSON.parse(JSON.stringify(this.data_part))
        }
      });
      this.form = {};
      this.addFormVisible = false;
    },
    addItem(item,dataPart){
      if(item.id==dataPart.parentItemId){
         item.children.push(dataPart);
      }else{
        if(item.children.length>0){
          for(var i=0;i<item.children.length;i++){
            this.addItem(item.children[i],dataPart)
          }
        }
      }
    },

    editSubmitForm (form) {
      // editform 点击添加的那条记录信息，data_part 是项目添加设备所有的的数据
      this.data_part.forEach((item,index) => {
         const dataPart = {};
         debugger
          Object.assign(dataPart, this.editform);
        //  if(dataPart.parentId != this.parentItem.parentItemId){
        //     dataPart.parentId =  this.parentItem.parentItemId
        //     this.deleteItemForEdit(item,item,dataPart,index)
        //   }
          // this.deleteItemForEdit(item,item,dataPart,index)
          this.editItem(item,dataPart)


        // item.children.forEach(item2 => {
        //   if (item2.id == this.editform.id) {
        //     const dataPart = {};
        //     for (var i = 0; i < this.partSelectData.length; i++) {
        //       if (this.partSelectData[i].id == this.editform.configId)
        //         this.editform.equipment = this.partSelectData[i].name;
        //     }
        //     for (var k = 0; k < this.engineerArr.length; k++) {
        //       if (this.engineerArr[k].id == this.editform.engineer)
        //         this.editform.engineername = this.engineerArr[k].realName;
        //     }

        //     for (var j = 0; j < this.statusArr.length; j++) {
        //       if (this.statusArr[j].dictKey === this.editform.jobStatus)
        //         this.editform.statusname = this.statusArr[j].dictValue;
        //     }
        //     // Object.assign(dataPart, this.editform);

        //     if (this.rowdata.id) {
        //       dataPart.id = this.rowdata.id;
        //     }

        //     if (this.rowdata.deviceId) {
        //        dataPart.deviceId = this.rowdata.deviceId;
        //     }
        //     if(this.editform.parentItemId){
        //        dataPart.parentId = this.editform.parentItemId
        //     }
        //     this.editItem(item,dataPart)
        //     // this.$set(item.children, this.rowdata.$index, dataPart);
        //   }
        // })
      });
      console.log('this.data_part',this.data_part,' this.editform', this.editform);
      
      this.data_part = JSON.parse(JSON.stringify(this.data_part))
      this.editform = {};
      this.rownum = undefined;
      this.editFormVisible = false;
    },   
    editItem(item,dataPart){
      if(item.id==dataPart.parentItemId){
         item.children.push(dataPart);
      }else{
        if(item.children.length>0){
          for(var i=0;i<item.children.length;i++){
            this.editItem(item.children[i],dataPart)
          }
        }
      }
    },
    deleteItemForEdit(data,item,dataPart,index){
      if(item.id==dataPart.id){
         if(dataPart.id==0){
          if(dataPart.addIndex==item.addIndex){
            data.children.splice(index,1)
          }
       }else{
          data.children.splice(index,1)
       }
      }else{
        if(item.children.length>0){
          item.children.forEach((part,index1)=>{
            this.deleteItemForEdit(item,part,dataPart,index1)
          })
        }
      }
     
    },

    submitForm (form) {
      //将表头 客户-项目-交付时间赋值
      this.formData.projectJobDTO["projectJob"] = this.child_form;
      this.formData.projectJobDTO["jobEquipmentList"] = undefined;

      for (var i = 0; i < this.data_part.length; i++) {
        const part = this.data_part[i];
        const id = part.id;
        this.formData.projectJobDTO["jobEquipmentList"][i]["sequenceId"] = id;
        this.formData.projectJobDTO["jobEquipmentList"][i]["jobId"] = id;
        if (this.$refs["table" + id]) {
          this.$refs["table" + id].forEach((item, index, arr) => {
          });
        }
      }
    },
    updateOneData(item,index){
        // item.chart = this.formChartArr[index];
        // item.engineer = this.formEngineerArr[index];
        // item.jobStatus = this.formJobStatusArr[index];
        // item.standard = this.formStandardArr[index];
        // item.standards = this.formStandardsArr[index];
        // item.weight = this.formWeightArr[index];
        // item.completeTime = this.formCompleteTimeArr[index];
        // item.param = this.formParamArr[index];
        // item.remark = this.formRemarkArr[index];
        console.log(item,index,'99999');
        
        updateData2(item).then(res => {
            this.$message({ type: "success", message: "更新成功!" });
            this.onLoad_part(this.page_part);
        });
    },
    updateData () {
      //data 所有的任务单
      this.data_part.forEach((item, index) => {
        item.chart = this.formChartArr[index];
        item.engineer = this.formEngineerArr[index];
        item.jobStatus = this.formJobStatusArr[index];
        item.standard = this.formStandardArr[index];
        item.standards = this.formStandardsArr[index];
        item.weight = this.formWeightArr[index];
        item.completeTime = this.formCompleteTimeArr[index];
        item.param = this.formParamArr[index];
        item.remark = this.formRemarkArr[index];
        item.status = 0;
        item.id = item.deviceId;
      });
      var projectJobDTO = {
        projectJob: {
          id: this.jobId,
          projectId: this.projectInfo.id
        },
        deviceSequenceList: this.data_part
      };
      updateData(projectJobDTO).then(res => {
        this.$message({ type: "success", message: "更新成功!" });
        this.$router.go(0)
      });
    },
    goToCustomer (customerName) {
      this.$router.push({
        name: "客户列表",
        path: "/customer/customer",
        query: {
          customerName: customerName
        }
      });
    },
    goToProject (projectName) {
      this.$router.push({
        name: "项目列表",
        path: "/customer/project",
        query: {
          projectName: projectName
        }
      });
    },
    openAdd () {
      this.addFormVisible = true;
      this.selectFormVisible = false;
    },
    closeDialog () {
      this.selectFormVisible = false;
      this.addFormVisible = false;
      this.editFormVisible = false;
      this.paperVisible = false
    },

    onLoad_part (page, params = {}) {
      this.query_part["id_equal"] = this.jobId;
      getPartDetail(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query_part)
      ).then(res => {
        const data = res.data.data;
        this.page_part.pages = data.pages;
        this.data_part = data.records;
        //当填充过一次数据，第二次进来需要赋值
        this.data_part.forEach((item, index) => {
           if(item.engineer === 0 || !item.engineer){
             item.engineer = this.engineerValue
          }
          // this.formChartArr[index] = item.chart;
          // if(item.engineer === 0 || !item.engineer){
          //    this.formEngineerArr[index] = this.engineerValue
          // }else{
          //    this.formEngineerArr[index] = item.engineer;
          // }
         
          // this.formJobStatusArr[index] = item.jobStatus;
          // this.formStandardArr[index] = item.standard;
          // this.formStandardsArr[index] = item.standards;
          // this.formWeightArr[index] = item.weight;
          // if(item.completeTime){
          //    this.formCompleteTimeArr[index] = item.completeTime;
          // }else{
          //     this.formCompleteTimeArr[index] = this.formatter('YYYY-mm-dd HH:MM:SS',new Date())
          // }
         
          // this.formParamArr[index] = item.param;
          // this.formRemarkArr[index] = item.remark;
        });
      });
    },
    formatter(fmt,date){
    let ret;
      const opt = {
          "Y+": date.getFullYear().toString(),        // 年
          "m+": (date.getMonth() + 1).toString(),     // 月
          "d+": date.getDate().toString(),            // 日
          "H+": date.getHours().toString(),           // 时
          "M+": date.getMinutes().toString(),         // 分
          "S+": date.getSeconds().toString()          // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
          ret = new RegExp("(" + k + ")").exec(fmt);
          if (ret) {
              fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
          }
      }
      return fmt;
    },
    editRowDialog (item,row) {
       listAll(1, 2000).then(res => {
        this.partSelectData = res.data.data.records;
      });
      this.parentList=[]
      this.deviceInfo = item
      this.parentList.push(item)
      // getList2(1, 2000, { "a.typeId": row.parentTypeId }).then(res => {
      //   this.partSelectData = res.data.data.records;
      // });
      this.rowdata = row;
      this.rowdata.parentItemId=row.parentId
      this.parentList.forEach(item=>{
        this.selectParentItem(item,this.rowdata)
      })

      this.rownum = row.$index;
      this.editform = this.rowdata ;
      this.editFormVisible = true;
    },
    selectParentItem(parent,rowdata){
          if(String(parent.sequenceId)===rowdata.parentId){
            rowdata.parentItemEquipment=parent.equipment
         }else{
           if(parent.children && parent.children.length>0){
             parent.children.forEach(part=>{
                 this.selectParentItem(part,rowdata)
             })
           }
         }
    },
    delRow (row, index) {
      
      this.data_part.forEach((item,index1) => {
        //找到对应的类别下
        
        if (item.typeId == row.typeId || item.typeId == row.pid) {
           var updateData={}
          if(row.id){
            if(item['delIds']){
              item['delIds'].push(row.id);
            }else{
              item['delIds'] = []
              item['delIds'].push(row.id);
              item.children.splice(index, 1);
            }
           this.deleteItem(item,item,item,row,index1)
            // this.deleteItem(item,item,row,index1)
          }else{
               item.children.splice(index, 1);
          }
          //删除配件中的数据
          // item['delIds'] =  updateData['delIds']
          // item.children.splice(index, 1);
          
        }
      });
      this.data_part = JSON.parse(JSON.stringify(this.data_part))
      
    },
    deleteItem(updateData,data,item,row,index){
          
        if(item.id == row.id){
            if(item.id==0){
              if(item.addIndex==row.addIndex){
                 data.children.splice(index,1)
              }
            }else{
                  if(item.children.length>0){
                   //有子节点 一起删除
                     for(var i=0; i<item.children.length;i++){
                       var part = item.children[i];
                       updateData['delIds'].push(part.id);
                    }
                }
                data.children.splice(index,1)
                console.log('data',data,index);
            }
                
          }else{
            if(item.children.length>0){
               for(var i=0; i<item.children.length;i++){
                  this.deleteItem(updateData,item,item.children[i],row,i)
               }
            }
          }
    },
    addPartDialog (item) {
      listAll(1, 2000).then(res => {
        this.partSelectData = res.data.data.records;
      });
      // getList2(1, 100, { "a.typeId": item.parentTypeId }).then(res => {
      //   this.partSelectData = res.data.data.records;
      // });
      //由于需求变动
      // this.selectFormVisible = true;
      this.addFormVisible = true
      this.deviceInfo = item;
    },
    goToSelectPart () {
      if (this.deviceInfo.id) {
        this.selectPartFormVisible = true;
        // this.$router.push({
        //   name: '设备选择',
        //   path: '/device/selectpart2',
        //   query: {
        //     id: this.deviceInfo.id,
        //     deviceName: this.deviceInfo.equipment
        //   },
        // })
      }
    },
    selectedPost (selectParts) {
      this.data_part.forEach(item1 => {
        //判断当前需要加配件的设备
        if (item1.id == this.deviceInfo.id) {
          //通过选择框 选择到的设备列表遍历
          selectParts.forEach(item => {
            var insert = true;
            //pid的用来删除功能 使用
            //判断已存在该设备的进行更新，否则就新增
            item1.children.forEach(item2 => {
              //说明是同一个配件
              if (item.deviceId == item2.id) {
                //不需要插入 只要更新数量
                insert = false
                this.engineer = this.userInfo.userId
                this.engineername = this.userInfo.userName
                item2.num = item.num
                item2.deviceStatus = '借用'
              }
            })
            if (insert) {
              item1.children.push({
                typeId: item1.typeId,
                chart: item.chart,
                configId: item.configId,
                equipment: item.equipment,
                num: item.num,
                engineer : this.userInfo.userId,
                engineername : this.userInfo.userName,
                param: item.param,
                standard: item.standard,
                standards: item.standards,
                status: item.status,
                weight: item.weight,
                pid: item1.typeId,
                borrowProjectId:item.projectId,
                borrowSequenceId:item.sequenceId,
                deviceStatus :'借用',
                choose: 1
              });
            }


          });
        }
      });
      this.selectFormVisible = false;
      this.selectPartFormVisible = false;
    },
    closeSelectDialog () {
      this.selectFormVisible = false;
      this.selectPartFormVisible = false;
    },
    upload(item){
      if(!item.id){
        this.$message.error('请先对配件信息保存，再进行图纸上传!');
        return
      }
      console.log('upload',item);
      this.uploadInfo = item
      this.updateFormVisible = true
    },
    updateRowDialog(item,index,equipmentName){
      if(!item.id){
        this.$message.error('请先对配件信息保存，再进行图纸上传!');
        return
      }
      console.log('updateRowDialog',item);
      this.uploadInfo = item
      this.uploadInfo.equipmentName = equipmentName
      this.updateFormVisible = true
    },
     handleFile() {},
     key_path_file(file, fileList) {
       console.log(file,fileList);
       this.uploadInfo.fileName = fileList
    },
    onExceed(files, fileList){
      this.$message.error('图纸只能上传一个， 已存在!');
    },
    beforeAvatarUpload:function(file){
      var isPG =true
      if(!(file.name &&  file.name.substring(file.name.lastIndexOf(".")+1)==='dwg')){
          this.$message.error('上传图纸只能是dwg 格式!');
          isPG = false
          return false
      }
      // if(file.name){
      //   let fileNames = file.name.split('_')
      //   if(fileNames.length != 2){
      //      this.$message.error('上传图纸名称不符合要求 请核实!');
      //      return false
      //   }
      // }
      const isLt2M = file.size / 1024 / 1024 < 20;                         //限制图片大小
      // const isLt2M = file.size / 500 < 2;     
      if (!isLt2M) {
          this.$message.error('上传图纸大小不能超过 20MB!');
      }
        return isPG && isLt2M  
    },
    closeUploadDialog(){
      this.updateFormVisible = false
    },
    uploadSubmitForm(){
      if(!this.uploadInfo.id){
        this.$message.error('请先对配件信息保存，再进行图纸上传!');
        return
      }
      let formData = new FormData();
      formData.append("id",this.uploadInfo.id)
      formData.append("jobId",this.$route.query.id)
      formData.append("projectId",this.$route.query.projectId)
      formData.append("customerName",this.projectInfo.customerName)
      formData.append("sequenceId",this.uploadInfo.deviceId)
       formData.append("engineer",this.uploadInfo.engineer)
      formData.append("projectName",this.projectInfo.projectName)
      if(this.uploadInfo.status == 1){
        formData.append("equipmentName",this.uploadInfo.equipmentName+'('+this.uploadInfo.name+')')
          // formData.append("name",this.uploadInfo.equipmentName)
      }else{
         formData.append("equipmentName",this.uploadInfo.equipment+'('+this.uploadInfo.name+')')
        //  formData.append("name",this.uploadInfo.equipment)
      }
     
      
      formData.append("fileName",  this.uploadInfo.fileName[0] ? this.uploadInfo.fileName[0].raw : "")
      uploadPaper(formData).then(res=>{
            this.$message.success('上传图纸成功!');
            this.updateFormVisible = false
            this.onLoad_part(this.page_part);
      }).catch(error=>{
            this.$message.error('上传图纸失败 请联系管理员!');
      })
    },
    changeStatus(item){
     
      
        if(item.jobStatus==3){
          let date = new Date()
          item.completeTime = this.dateFormat('YYYY-mm-dd HH:MM:SS',date)
        }
         console.log('item : ',item);
    },
   dateFormat(fmt, date) {
        let ret;
        const opt = {
            "Y+": date.getFullYear().toString(),        // 年
            "m+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "M+": date.getMinutes().toString(),         // 分
            "S+": date.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt;
    },
    showCatalog(id,equipment,name){
      this.paperVisible = true
      this.jobEquipmentId = id
      this.jobEquipmentName = equipment
      var path =  equipment+'('+name+')'
      listFolder(this.$route.query.projectId,path).then(res=>{
        console.log(res);
        
        this.catalogData = res.data
      }).catch(error=>{
           this.$message.error('获得文件夹列表失败 请联系管理员!');
      })
    },
    submitForm1(){
      this.loading = true
      console.log( this.catalogData);
      // this.$route.query.id,
      var paperDTO ={}
      paperDTO.id = this.jobEquipmentId
      paperDTO.name = this.jobEquipmentName
      paperDTO.projectId = this.$route.query.projectId
      paperDTO.jobId = this.$route.query.id
      paperDTO.papers= this.catalogData
      updatePaperData(paperDTO).then(res=>{
        this.loading = false,
        this.paperVisible = false
       this.onLoad_part(this.page_part);
        this.$message.success('更新图纸成功!');
      }).catch(error=>{
        this.loading = false,
        this.$message.error('获得文件夹列表失败 请联系管理员!');
      })
    },
    selectParent(){
      this.parentFormVisible = true
       this.parentList=[]
      this.parentList.push(this.deviceInfo)
    },
    selectedParent(data,node,item){
      this.parentItem = data
      this.form.parentItemId = this.parentItem.id
      this.form.parentItemEquipment = this.parentItem.equipment
      this.editform.parentItemId = this.parentItem.id
      this.editform.parentItemEquipment = this.parentItem.equipment
      this.parentFormVisible = false
    },
       // 复制成功时的回调函数
    onCopy (e) {
      this.$message.success("共享盘地址已复制到剪切板！")
    },
    // 复制失败时的回调函数
    onError (e) {
      this.$message.error("抱歉，复制失败！")
    },
  }
};
</script>

<style  lang="stylus" scoped>
.container {
  margin: 20px 40px;
  width: auto;

  .table-box {
    margin-top: 20px;

    .btn-box {
      text-align: right;
      margin-bottom: 10px;
      padding-right: 10px;
    }
  }
}

.blank {
  height: 10px;
}

.namebtn {
  color: #fff;
  background-color: #FFA897;
  width: 170px;
  padding: 12px 0;
  text-align: center;
  cursor: pointer;
  margin-right: 2px;

  &.on {
    background-color: #ffa897;
  }
}

.table-box {
  font-size: 0.07rem;
  color: #515151;

  .item {
    .tip-box {
      display: flex;
      padding: 10px;
      justify-content: space-between;

      .btn {
        transform: scale(0.9);
      }
    }
  }
}

// 详情页样式
.el-form-item {
  margin-bottom: 10px;
}

.container {
  margin: 20px 40px;
  width: auto;

  .introduce {
    display: flex;

    .item {
      flex: 1;

      &:last-child {
        border-right: 1px solid #dcdfe6;
      }

      .title, .text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.07rem;
        text-align: center;
        height: 40px;
        line-height: 40px;
        border: 1px solid #dcdfe6;
        border-right: none;
      }

      .title {
        background-color: #ffa897;
        color: #ffffff;
        border-bottom: none;
      }

      .text {
        .href {
          color: #8693f3;
        }
      }
    }
  }

  .table-box {
    font-size: 0.07rem;
    color: #515151;

    .item {
      .tip-box {
        display: flex;
        justify-content: space-between;

        .btn {
          transform: scale(0.9);
        }
      }

      .main-box {
        border: 1px solid #89c3f8;
        padding: 10px 20px;

        .input-box {
          display: flex;

          .input-list {
            flex: 1;

            &.input-list-fix {
              width: 100px;
            }
          }
        }

        .list-box {
          display: inline-block;

          .list {
            padding: 0 10px;
            margin-top: 20px;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>