<template>
  <div class="container">
    <!-- 客户 项目选择 -->
    <!-- <cselectConect3 ref="cselectConect2"
                      v-show="!edit"
    @setDataFather="setDataFather"></cselectConect3>-->
 
   <div class="bord">
      <el-row>
        <h1 class="font">基本信息：</h1>
      </el-row>
      <div class="introduce">
        <div class="item">
          <div class="title">客户</div>
          <div class="text">
            <div class="href">{{projectInfo.customerName}}</div>
          </div>
        </div>
        <div class="item">
          <div class="title">项目</div>
          <div class="text">
            <div class="href">{{projectInfo.projectName}}</div>
          </div>
        </div>
        <div class="item">
          <div class="title">设备</div>
          <div class="text">{{projectInfo.equipment}}</div>
        </div>
        <div class="item">
          <div class="title">图号</div>
          <div class="text">{{projectInfo.chart}}</div>
        </div>
        <div class="item">
          <div class="title">件数</div>
          <div class="text">{{projectInfo.num}}{{projectInfo.unit}}</div>
        </div>
        <div class="item">
          <div class="title">装配</div>
          <div class="text1">
            <el-row  :style="{'padding-top':assembleList.length>0?'':'10px'}">
              <el-popover width="300" v-model="visible">
                <el-row  > 
                  <el-col :span="12">
                    <el-input-number
                      v-model="completedNum"
                      :min="0"
                      :max="completedNumMax"
                      size="mini"
                    ></el-input-number>
                  </el-col>

                  <el-col :span="12">
                    <el-button type="primary" style size="mini"  :loading="loading" @click="assembleComplete()" plain>装配完成</el-button>
                  </el-col>
                </el-row>

                <span slot="reference">
                  <span
                    v-if="completedNumMax!=0"
                    @click="visible = !visible"
                  
                    style="color:red"
                  >{{completedNumMax+'件未完成' }}</span>
                </span>
              </el-popover>
            </el-row>

            <el-row   v-if="assembleList.length>0"  :style="{'padding-top':completedNumMax!=0?'':'10px'}">
              <el-popover trigger="hover" v-model="drawerVisible">
                <el-row v-for="assemble in assembleList" :key="assemble.id">
                  {{assemble.createTime}}(
                  <span
                    v-if="assemble.completedNum && assemble.completedNum!=0"
                    :style="{color:assemble.checked==1?'green':''}"
                  >完成{{assemble.completedNum}}件</span>
                  <span v-if="assemble.backNum && assemble.backNum!=0"  :style="{color:assemble.checked==1?'green':''}">检验退回{{assemble.backNum}}件</span>
                  )
                </el-row>
                <span
                  v-if="assembleList.length>0"
                  @click="drawerVisible = !drawerVisible"
                  slot="reference"
                  style="color:blue"
                >显示装配完成情况</span>
              </el-popover>
            </el-row>
          </div>
        </div>

        <div class="item">
          <div class="title">装配检验</div>
          <div class="text1">
            <el-row  :style="{'padding-top':assembleTestList.length>0?'':'10px'}">
            <el-popover width="300" v-model="visible1">
              <el-row v-for="(assemble,index) in assembleUnCheckList" :key="assemble.id">
                <el-row v-if="index==0">{{assemble.createTime}}</el-row>
                <el-row v-if="index==0">
                  <el-col :span="12">
                    <span>冷作检验{{assemble.completedNum}}个</span>
                  </el-col>

                  <el-col :span="12">
                    <el-button
                      type="primary"
                      size="mini"
                      :loading="loading"
                      @click="assembleCompleteTest(assemble)"
                      plain
                    >通过</el-button>
                    <el-button size="mini" @click="assembleBackTestShow(assemble)" plain>退回</el-button>
                  </el-col>
                </el-row>
              </el-row>

              <span slot="reference">
                <span
                  v-if="completedTestNum!=0"
                  @click="visible1 = !visible1"
                  :style="{color:completedTestNum==0?'blue':'red' }"
                >{{completedTestNum+'件未检验'}}</span>
              </span>
            </el-popover>
            </el-row>
            <!-- 记录显示 -->
            <el-row  :style="{'padding-top':completedTestNum!=0?'':'10px'}">
              <el-popover trigger="hover" v-model="drawerVisible1">
                <el-row v-for="assemble in assembleTestList" :key="assemble.id">
                  {{assemble.createTime}}(
                  <span 
                    v-if="assemble.completedTestNum && assemble.completedNum!=0"
                  >检验通过{{assemble.completedTestNum}}件</span>
                  <span v-if="assemble.backNum && assemble.backNum!=0"> 未通过{{assemble.backNum}}件</span>
                  )
                </el-row>
                <span
                  v-if="assembleTestList.length>0"
                  @click="drawerVisible1 = !drawerVisible1"
                  slot="reference"
                  style="color:blue"
                >显示装配完成情况</span>
              </el-popover>
            </el-row>

            <!-- 退回填写显示 -->

            <el-dialog title="退回" :visible.sync="visible2" width="30%">
              <el-row>
                退回数量：
                <el-input-number v-model="backNum" :min="0" :max="backInfo.completedNum" size="mini"></el-input-number>
              </el-row>
              <el-row style="padding-top:10px">
                <el-button type="primary"  :loading="loading"  @click="assembleBackTest" plain>确认退回</el-button>
                <el-button type="danger" @click="visible2=!visible2" plain>取消</el-button>
              </el-row>
            </el-dialog>
          </div>
        </div>
      </div>

      <div width="100%" v-if="partList.length>0">
        <span class="font">配件</span>：
        <el-scrollbar style="height:340px">
          <div class="list-box">
            <div class="list" v-for="item in partList" :key="item.id">
              <div class="detail">
                <p>
                  <label>配件</label>
                  <span>{{item.equipment}}</span>
                </p>
                <p>
                  <label>图号</label>
                  <span>{{item.chart}}</span>
                </p>
                <p>
                  <label>件数</label>
                  <span>{{item.num}}</span>
                </p>
                <p>
                  <el-button
                    type="primary"
                    style="float:right"
                    size="mini"
                    @click.stop="addList(item)"
                  >加入备料单</el-button>
                </p>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
   </div>
   

     <el-dialog title="变更到货时间"  :visible.sync="changeFormVisible" width="20%">
      <el-form ref="form" :model="changeForm" label-width="80px">

        <el-form-item label="原先时间"  prop="material">
          {{changeForm.createTime}}
        </el-form-item>
        <el-form-item label="变更时间"  prop="num">
           <el-date-picker
              style=" margin-left: 10px;"
              v-model="changeForm.changeTime"
              size="mini"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button  size="mini" type="primary"  :loading="loading"  @click="estimatedArrivalChangeComplete">变更</el-button>
          <el-button  size="mini"  @click="changeFormVisible = !changeFormVisible">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

<!--备料单   -->  

      <el-row>
        <span class="font">备料单：</span>
        <el-button type="primary" size="mini" @click="add()">新增</el-button>
        <el-button type="primary" size="mini" @click="importDialog()">导入</el-button>
      </el-row>
  <div class="bord1">
      <el-row style=" padding-bottom:20px">
      <ctabs @onTabs="changeTab" :option="tabList"></ctabs>
     </el-row>

   <div v-if="tab_index===0">
          <el-row style="margin-bottom:20px;font-size:15px">
             <el-button type="primary" size="mini" @click="blanking()">下料完成</el-button>
            <el-button type="primary" size="mini" @click="coldWork()">铆焊完成</el-button>
            <el-button type="primary" size="mini" @click="coldWorkTest()">冷作检验</el-button>
            <el-button type="primary" size="mini" @click="machineAdd()">机加完成</el-button>
            <el-button type="primary" size="mini" @click="machineAddTest()">机加检验</el-button>
          </el-row>
          <avue-crud
            :data="data_self"
            :option="option_self"
            v-model="obj_self"
            :page.sync="page_self"
            @on-load="getProjectProgressPartList"
            @selection-change="selectionSelfChange"
          >


      <!-- 下料 -->
           <template slot="blanking" slot-scope="scope" >
              <el-row>
                <el-popover width="300" >
                  <el-row>
                    <el-col :span="12">
                      <el-input-number
                        v-model="completedNumArr[scope.row.$index]"
                        :min="0"
                        :max="scope.row.num-scope.row.blankingTotal"
                        size="mini"
                      ></el-input-number>
                    </el-col>

                    <el-col :span="12">
                      <el-button type="primary" style size="mini" :loading="loading"  @click="blankingComplete(scope.row)" plain>下料完成</el-button>
                    </el-col>
                  </el-row>

                  <span slot="reference"   @click ="blankingCompleteShowAddContent($event,scope.row)">
                    <span
                      v-if="scope.row.num-scope.row.blankingTotal!=0"
                    
                      style="color:red;font-size:6px"
                    >{{(scope.row.num-scope.row.blankingTotal)+'件未下料' }}</span>
                  </span>
                </el-popover>
              </el-row>

              <el-row>
               
                  <el-row v-for="blanking in scope.row.blankingList" :key="blanking.id" style="font-size:6px">
                    {{blanking.createTime}}(
                    <span  :style="{color:blanking.checked==1?'green':''}"
                    
                      v-if="blanking.completedNum && blanking.completedNum!=0"
                    >下料{{blanking.completedNum}}件</span>
                    <!-- <span v-if="blanking.backNum && blanking.backNum!=0"  :style="{color:blanking.checked==1?'green':''}">检验退回{{blanking.backNum}}件</span> -->
                    )
                   </el-row>
         
              </el-row>
          </template>




          <!-- 冷作 -->
           <template slot="coldWork" slot-scope="scope" >
              <el-row>
                <el-popover width="300" >
                  <el-row>
                    <el-col :span="12">
                      <el-input-number
                        v-model="completedNumArr[scope.row.$index]"
                        :min="0"
                        :max="scope.row.num-scope.row.coldWorkTotal"
                        size="mini"
                      ></el-input-number>
                    </el-col>

                    <el-col :span="12">
                      <el-button type="primary" style size="mini" :loading="loading"  @click="coldWorkComplete(scope.row)" plain>铆焊完成</el-button>
                    </el-col>
                  </el-row>

                  <span slot="reference"      @click ="coldWorkCompleteShowAddContent($event,scope.row)">
                    <span
                      v-if="scope.row.num-scope.row.coldWorkTotal!=0"
                 
                      style="color:red;font-size:6px"
                    >{{(scope.row.num-scope.row.coldWorkTotal)+'件未完成' }}</span>
                  </span>
                </el-popover>
              </el-row>

              <el-row>
               
                  <el-row v-for="coldWork in scope.row.coldWorkList" :key="coldWork.id" style="font-size:6px">
                    {{coldWork.createTime}}(
                    <span  :style="{color:coldWork.checked==1?'green':''}"
                    
                      v-if="coldWork.completedNum && coldWork.completedNum!=0"
                    >完成{{coldWork.completedNum}}件</span>
                    <span v-if="coldWork.backNum && coldWork.backNum!=0"  :style="{color:coldWork.checked==1?'green':''}">检验退回{{coldWork.backNum}}件</span>
                    )
                   </el-row>
         
              </el-row>
          </template>
        <!-- 冷作检验 -->
           <template slot="coldWorkTest" slot-scope="scope" >

          <el-popover width="300" >
            <el-row v-for="(coldWork,index) in coldWorkUnCheckList" :key="coldWork.id">
              <el-row v-if="index==0">{{coldWork.createTime}}</el-row>
              <el-row v-if="index==0">
                <el-col :span="12">
                  <span>冷作检验{{coldWork.completedNum}}个</span>
                </el-col>

                <el-col :span="12">
                  <el-button
                    type="primary"
                    size="mini"
                    :loading="loading"
                    @click="coldWorkTestComplete(scope.row,coldWork)"
                    plain
                  >通过</el-button>
                  <el-button size="mini" @click="coldWorkTestBackShow(scope.row,coldWork)" plain>退回</el-button>
                </el-col>
              </el-row>
            </el-row>

            <span slot="reference" @click="coldWorkTestCompleteShowAddContent($event,scope.row)">
              <span
                v-if="scope.row.coldWorkTotal-scope.row.coldWorkTestTotal!=0"
               
                style="color:red;font-size:6px" 
              >{{(scope.row.coldWorkTotal-scope.row.coldWorkTestTotal)+'件未检验'}}</span>
            </span>
          </el-popover>

          <!-- 记录显示 --> 
          <el-row>
            <!-- <el-popover trigger="hover" v-model="coldWorkTestCompleteShowList[scope.row.$index]"> -->
              <el-row v-for="coldWork in scope.row.coldWorkTestList" :key="coldWork.id"  style="font-size:6px">
                {{coldWork.createTime}}(
                <span   
                  v-if="coldWork.completedNum && coldWork.completedNum!=0"
                >检验通过{{coldWork.completedNum}}件</span>
                <span v-if="coldWork.backNum && coldWork.backNum!=0" > 未通过{{coldWork.backNum}}件</span>
                )
              </el-row>
            <!--   <span
                v-if="scope.row.coldWorkTestList.length>0"
                 @click.stop="coldWorkTestCompleteShowListContent(scope.row)"
                slot="reference"
                style="color:blue"
              >显示检验完成情况</span>
            </el-popover> -->
          </el-row>

          </template>  

       <!--机加 -->
           <template slot="machineAdd" slot-scope="scope" >
              <el-row>
                <el-popover width="300" >
                  <el-row>
                    <el-col :span="12">
                      <el-input-number
                        v-model="completedNumArr1[scope.row.$index]"
                        :min="0"
                        :max="scope.row.num-scope.row.machineAddTotal"
                        size="mini"
                      ></el-input-number>  
                    </el-col>

                    <el-col :span="12">
                      <el-button type="primary" style size="mini"  :loading="loading" @click="machineAddComplete(scope.row)" plain>机加完成</el-button>
                    </el-col>
                  </el-row>

                  <span slot="reference"  @click ="machineAddCompleteShowAddContent($event,scope.row)">
                    <span
                      v-if="scope.row.num-scope.row.machineAddTotal!=0"
                     
                      style="color:red;font-size:6px" 
                    >{{(scope.row.num-scope.row.machineAddTotal)+'件未完成' }}</span>
                  </span>
                </el-popover>
              </el-row>

              <el-row>
                 
                <!-- <el-popover trigger="hover"  v-model="machineAddCompleteShowList[scope.row.$index]"> -->
               
                  <el-row v-for="machineAdd in scope.row.machineAddList" :key="machineAdd.id" style="font-size:6px">
                    {{machineAdd.createTime}}(
                    <span  :style="{color:machineAdd.checked==1?'green':''}" 
                      v-if="machineAdd.completedNum && machineAdd.completedNum!=0"
                    >完成{{machineAdd.completedNum}}件</span>
                    <span v-if="machineAdd.backNum && machineAdd.backNum!=0"  :style="{color:machineAdd.checked==1?'green':''}">检验退回{{machineAdd.backNum}}件</span>
                    )
                 </el-row>
                 <!--   <span
                    v-if="scope.row.machineAddList.length>0"
                    @click.stop="machineAddCompleteShowListContent(scope.row)"
                    slot="reference"
                    style="color:blue"
                  >显示机加完成情况</span>
                </el-popover> -->
              </el-row>
          </template>
        <!-- 机加检验 -->
           <template slot="machineAddTest" slot-scope="scope" >

          <el-popover width="300" >
            <el-row v-for="(machineAdd,index) in machineAddUnCheckList" :key="machineAdd.id">
              <el-row v-if="index==0">{{machineAdd.createTime}}</el-row>
              <el-row v-if="index==0">
                <el-col :span="12">
                  <span>冷作检验{{machineAdd.completedNum}}个</span>
                </el-col>

                <el-col :span="12">
                  <el-button
                    type="primary"
                    size="mini"
                    :loading="loading"
                    @click="machineAddTestComplete(scope.row,machineAdd)"
                    plain
                  >通过</el-button>
                  <el-button size="mini" @click="machineAddTestBackShow(scope.row,machineAdd)" plain>退回</el-button>
                </el-col>
              </el-row>
            </el-row>

            <span slot="reference"  @click="machineAddTestCompleteShowAddContent($event,scope.row)">
              <span
                v-if="scope.row.machineAddTotal-scope.row.machineAddTestTotal!=0"
              
                style="color:red;font-size:6px" 
              >{{(scope.row.machineAddTotal-scope.row.machineAddTestTotal)+'件未检验'}}</span>
            </span>
          </el-popover>

          <!-- 记录显示 -->
          <el-row>
            <!-- <el-popover trigger="hover" v-model="machineAddTestCompleteShowList[scope.row.$index]"> -->
              <el-row v-for="machineAdd in scope.row.machineAddTestList" :key="machineAdd.id" style="font-size:6px">
                {{machineAdd.createTime}}(
                <span 
                  v-if="machineAdd.completedNum && machineAdd.completedNum!=0"
                >检验通过{{machineAdd.completedNum}}件</span>
                <span v-if="machineAdd.backNum && machineAdd.backNum!=0"> 未通过{{machineAdd.backNum}}件</span>
                )
              </el-row>
             <!--  <span
                v-if="scope.row.machineAddTestList.length>0"
                 @click.stop="machineAddTestCompleteShowListContent(scope.row)"
                slot="reference"
                style="color:blue"
              >显示检验完成情况</span>
            </el-popover> -->
          </el-row>
          </template>  

        </avue-crud>
        <!-- </el-tab-pane> -->

      <!-- 冷作退回弹出框 -->
       <el-dialog title="退回" :visible.sync="visible4" width="20%">
            <el-row type="flex"  justify="center">
                   退回数量：
              <el-input-number
                v-model="backNum"
                :min="0"
                :max="backInfo.completedNum"
                size="mini"
              ></el-input-number>
             
           
            </el-row>
            <el-row style="padding-top:10px" type="flex"  justify="center">
              <el-button type="primary" @click="coldWorkTestBack" plain>确认退回</el-button>
              <el-button type="danger" @click="visible4=!visible4" plain>取消</el-button>
            </el-row>
          </el-dialog>


      <!-- 机加退回弹出框 -->
          <el-dialog title="退回" :visible.sync="visible5" width="20%">
            <el-row type="flex"  justify="center">
                   退回数量：
              <el-input-number
                v-model="backNum"
                :min="0"
                :max="backInfo.completedNum"
                size="mini"
              ></el-input-number>
             
           
            </el-row>
            <el-row style="padding-top:10px" type="flex"  justify="center">
              <el-button type="primary" @click="machineAddTestBack" plain>确认退回</el-button>
              <el-button type="danger" @click="visible5=!visible5" plain>取消</el-button>
            </el-row>
          </el-dialog>
      </div>
      <div v-if="tab_index===1">
        <!-- <el-tab-pane label="外购件"> -->
          <el-row style="margin-bottom:20px;font-size:15px">
            <el-button type="primary" size="mini" @click="estimatedArrival()">预计到货</el-button>
            <el-button type="primary" size="mini" @click="warehouse()">入库</el-button>
          </el-row>
          <avue-crud
            :data="data_buy"
            :option="option_buy"
            v-model="obj_buy"
            :page.sync="page_buy"
            @on-load="getProjectProgressPartList"
            @selection-change="selectionBuyChange"
          >

 <!-- 请购 -->
        <template slot="requisition" slot-scope="scope">
          <el-row     v-if="scope.row.num-scope.row.requisitionTotal!=0">
            <el-popover width="300"  >
              <el-row>
                <el-col :span="8">
                  <el-input-number
                    v-model="requisitionNumArr[scope.row.$index]"
                    :min="0"
                    :max="scope.row.num-scope.row.requisitionTotal"
                    size="mini"
                  ></el-input-number>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-date-picker
                    v-model="requisitionDateArr[scope.row.$index]"
                    type="date"
                    size="mini"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-button
                    type="primary"
                    style
                    size="mini"
                    :loading="loading"
                    @click="requisitionComplete(scope.row)"
                    plain
                  >确认</el-button>
                </el-col>
              </el-row>

              <span slot="reference"  @click="requisitionShowAddContent($event,scope.row)">
                <span
              
                 
                  style="color:red"
                >{{(scope.row.num-scope.row.requisitionTotal)+'件待请购' }}</span>
              </span>
            </el-popover>
          </el-row>

            <el-row
              v-for="(requisition,index) in scope.row.requisitionList"
              :key="requisition.id"
              style="font-size:6px">

           <el-row  >
                   <span  >
                      {{requisition.createTime}}(
                      <span
                        :style="{color:requisition.checked==1?'green':''}"
                        v-if="requisition.completedNum && requisition.completedNum!=0"
                      >请购{{requisition.completedNum}}件 </span>
                     
                    )
                    </span>
            </el-row>
          </el-row>
        </template>

    <!-- 物流已发货 -->
        <template slot="deliver" slot-scope="scope">
          <el-row     v-if="scope.row.num-scope.row.deliverTotal!=0">
            <el-popover width="300"  >
              <el-row>
                <el-col :span="8">
                  <el-input-number
                    v-model="deliverNumArr[scope.row.$index]"
                    :min="0"
                    :max="scope.row.num-scope.row.deliverTotal"
                    size="mini"
                  ></el-input-number>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-date-picker
                    v-model="deliverDateArr[scope.row.$index]"
                    type="date"
                    size="mini"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="4">
                  <el-button
                    type="primary"
                    style
                    size="mini"
                    :loading="loading"
                    @click="deliverComplete(scope.row)"
                    plain
                  >确认</el-button>
                </el-col>
              </el-row>

              <span slot="reference"  @click="deliverShowAddContent($event,scope.row)">
                <span
              
                 
                  style="color:red"
                >{{(scope.row.num-scope.row.deliverTotal)+'件待发货' }}</span>
              </span>
            </el-popover>
          </el-row>

            <el-row
              v-for="(deliver,index) in scope.row.deliverList"
              :key="deliver.id"
              style="font-size:6px">

           <el-row  >
                   <span  >
                      {{deliver.createTime}}(
                      <span
                        :style="{color:deliver.checked==1?'green':''}"
                        v-if="deliver.completedNum && deliver.completedNum!=0"
                      >发货{{deliver.completedNum}}件 </span>
                     
                    )
                    </span>
            </el-row>
          </el-row>
        </template>



           <!-- 预计到货 -->
           <template slot="estimatedArrival" slot-scope="scope" >
              <el-row>
                <el-popover width="300" >
                  <el-row>
                    <el-col :span="8">
                      <el-input-number
                        v-model="estimatedArrivalNumArr[scope.row.$index]"
                        :min="0"
                        :max="scope.row.num-scope.row.estimatedArrivalTotal"
                        size="mini"
                      ></el-input-number>
                    </el-col>
                  </el-row>
                <el-row>
                   
                    <el-col :span="8">
                         <el-date-picker
                          v-model="estimatedArrivalDateArr[scope.row.$index]"
                          type="date"   size="mini"
                          placeholder="选择日期">
                        </el-date-picker>
                    </el-col>

                  </el-row>
                  <el-row>
                   
                    <el-col :span="4">
                      <el-button type="primary" style size="mini" :loading="loading"  @click="estimatedArrivalComplete(scope.row)" plain>确认</el-button>
                    </el-col>
                  </el-row>

                  <span slot="reference"  @click="estimatedArrivalShowAddContent($event,scope.row)" >
                    <span 
                      v-if="scope.row.num-scope.row.estimatedArrivalTotal!=0"
                     
                      style="color:red;font-size:6px" 
                    >{{(scope.row.num-scope.row.estimatedArrivalTotal)+'件待确认' }}</span>
                  </span>
                </el-popover>
              </el-row>

              <el-row>
                 
                <!-- <el-popover trigger="hover"  v-model="estimatedArrivalCompleteShowList[scope.row.$index]"> -->
               
                  <el-row v-for="(estimatedArrival,index) in scope.row.estimatedArrivalList" :key="estimatedArrival.id" style="font-size:6px">
                    {{estimatedArrival.createTime}}( 
                    <span  :style="{color:estimatedArrival.checked==1?'green':''}"    @click="estimatedArrivalChangeShowContent(scope.row,index)" 
                      v-if="estimatedArrival.completedNum && estimatedArrival.completedNum!=0"
                    >预计到达{{estimatedArrival.completedNum}}件 <span v-for="change in estimatedArrival.changeList" :key="change.id" style="color:red">
                        ,变更：{{change.createTime}}到达
                     </span> </span>
                    
                    )
                  </el-row>
                  <!-- <span
                    v-if="scope.row.estimatedArrivalList.length>0"
                    @click="estimatedArrivalCompleteShowListContent(scope.row)"
                    slot="reference"
                    style="color:blue"
                  >显示预计到货情况</span>
                </el-popover> -->
              </el-row>
          </template>



        <!-- 入库 -->
           <template slot="warehouse" slot-scope="scope" >
              <el-row>
                <el-popover width="300" >
                  <el-row>
                    <el-col :span="8">
                      <el-input-number
                        v-model="warehouseNumArr[scope.row.$index]"
                        :min="0"
                        :max="scope.row.estimatedArrivalTotal-scope.row.warehouseTotal"
                        size="mini"
                      ></el-input-number>
                    </el-col>
                  </el-row>
                <el-row>
                   
                    <el-col :span="8">
                         <el-date-picker
                          v-model="warehouseDateArr[scope.row.$index]"
                          type="date"   size="mini"
                          placeholder="选择日期">
                        </el-date-picker>
                    </el-col>

                  </el-row>
                  <el-row>
                   
                    <el-col :span="4">
                      <el-button type="primary" style size="mini" :loading="loading"  @click="warehouseComplete(scope.row)" plain>确认</el-button>
                    </el-col>
                  </el-row>
 
                  <span slot="reference"   @click="warehouseShowAddContent($event,scope.row)">
                    <span 
                      v-if="scope.row.estimatedArrivalTotal-scope.row.warehouseTotal!=0"
                    
                    style="color:red;font-size:6px" 
                    >{{(scope.row.estimatedArrivalTotal-scope.row.warehouseTotal)+'件待确认' }}</span>
                  </span>
                </el-popover>
              </el-row>

              <el-row>
                 
                <!-- <el-popover trigger="hover"  v-model="warehouseShowList[scope.row.$index]"> -->
               
                  <el-row v-for="warehouse in scope.row.warehouseList" :key="warehouse.id" style="color:red;font-size:6px" >
                    {{warehouse.createTime}}(
                    <span  :style="{color:warehouse.checked==1?'green':''}" 
                      v-if="warehouse.completedNum && warehouse.completedNum!=0"
                    >入库{{warehouse.completedNum}}件</span>
                    <!-- <span v-if="estimatedArrival.backNum && estimatedArrival.backNum!=0"  :style="{color:estimatedArrival.checked==1?'green':''}">检验退回{{coldWork.backNum}}件</span> -->
                    )
                 </el-row>
                 <!--   <span
                    v-if="scope.row.warehouseList.length>0"
                    @click="warehouseShowListContent(scope.row)"
                    slot="reference"
                    style="color:blue"
                  >显示入库情况</span>
                </el-popover> -->
              </el-row>
          </template>

       </avue-crud>
      </div>
    </div>

    <!-- 添加设备 -->
    <el-dialog title="新增备料单" :key="timer" :visible.sync="addFormVisible" width="40%" :close-on-click-modal="modal" >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="类型"  prop="type"> 
          <el-select v-model="form.type" size="mini" style="width:auto;" @input="change($event)">
            <el-option
              v-for="item in selectList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="图号"  prop="chart">
          <el-input v-model="form.chart" @input="change($event)"></el-input>
        </el-form-item>

        <el-form-item label="名称"  prop="name">
          <el-input v-model="form.name"  @input="change($event)"></el-input>
        </el-form-item>
        <el-form-item label="材料"  prop="material">
          <el-input v-model="form.material"  @input="change($event)"></el-input>
        </el-form-item>
        <el-form-item label="数量"  prop="num">
          <el-input-number v-model="form.num"  @input="change($event)"></el-input-number>
        </el-form-item>
        <el-form-item label="规格"  prop="standards">
          <el-input v-model="form.standards"  @input="change($event)"></el-input>
        </el-form-item>
        <el-form-item label="备注"  prop="remark">
          <el-input v-model="form.remark"  @input="change($event)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认新增</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :key="timer" :visible.sync="importFormVisible" width="20%">
      <el-row>
        <el-col :span="12" style="text-align:center">
          <el-upload
            class="upload-demo"
            ref="upload1"
            action
            list-type="text"
            :limit="1"
            :multiple="false"
            :show-file-list="true"
            :before-upload="beforeUpload"
            :on-change="key_path_file"
            :file-list="form.fileName"
            :auto-upload="false"
            accept=".xls, .xlsx"
          >
            <!-- <el-button type="primary" @click="importXls()">导入模板</el-button> -->
            <el-button type="primary">导入模板</el-button>
          </el-upload>
        </el-col>
        <el-col :span="12" style="text-align:center">
          <el-button type="primary" @click="downLoadXls()">下载模板</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="uploadShow" :span="12" style="text-align:center">
          <el-button
            ref="importXlsBtn"
            class="importXlsBtn"
            type="success"
            @click="importXls()"
          >立即上传</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import cselectConect3 from "@/components/custom-ui/selectConect3";
import { getListItem } from "@/api/system/dict";
import {
  add,
  update,
  getDetail,
  getList,
  getDetailParent,
  getProduceProgressPartList,
  uploadFile,
  downLoadFile,updateBatch
} from "@/api/platform_device/progressequipmentlist";
import {
  sendProgress,
  getDeviceList,
  updateJobEquipmentList
} from "@/api/platform_device/projectjob";
export default {
  data() {
    return {
      loading : false,
      nameValue: "",
      modal:false,
      changeFormVisible:false,
      changeForm:{},
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      timer: undefined,
      importXlsVisible: false,
      drawerVisible: false,
      drawerVisible1: false,
      uploadShow:false,
      projectInfo: {},
      partList: [],
      goodsList: [],
      obj_buy: {},
      obj_self: {},
      data_buy: [],
      data_self: [],
      query_self: {},
      query_buy: {},
      tab_index: 0,
      addFormVisible: false,
      addFormVisible2: false,
      equipmentValue: "",
      chartValue: "",
      numValue: "",
      standardsValue: "",
      idValue: "",
      importFormVisible: false,
      form: {type:1,name:'',chart:'',material:'',num:'',standards:'',remark:''},
      page_self: {
        pageSize: 10,
        pages: 1,
        currentPage: 1,
        total:0
      },
      page_buy: {
        pageSize: 10,
        pages: 1,
        currentPage: 1,
        total:0
      },
      completedNum: 0,
      completedNumMax: 0,
      assembleList: [],
      assembleUnCheckList: [],
      coldWorkUnCheckList:[],
      completedTestNum: 0,
      completedTestNumMax: 0,
      backNum: 0,
      backNumMax: 0,
      backInfo: {},
      editRow:{},
      assembleTestList: [],
      parentInfo: undefined,
      selectList: [
        { id: 1, title: "自制件" },
        { id: 2, title: "外购件" }
      ],
      tabList: [
        { id: 0, title: "自制件" },
        { id: 1, title: "外购件" }
      ],
      selectionSelfList: [],
      selectionBuyList: [],
      completedNumArr:[],
      coldWorkCompleteShow:[],
      coldWorkCompleteShowList:[],
      coldWorkCompletedShow:[],
      requisitionShow:[],
      requisitionNumArr:[],
      requisitionDateArr:[],
      deliverShow:[],
      deliverNumArr:[],
      deliverDateArr:[],
      completedTestNumArr:[],
      coldWorkTestCompleteShow:[],
      coldWorkTestCompleteShowList:[],
      coldWorkTestCompletedShow:[], 
      completedNumArr1:[],
      machineAddCompleteShow:[], 
      machineAddCompleteShowList:[], 
      machineAddTestCompleteShow:[], 
      machineAddUnCheckList:[], 
      machineAddTestCompleteShowList:[], 
      option_self: {
        width: "100%",
        index: true,
        border: true,
        refreshBtn: false,
        page: true,
        header: false,
        align: "center",
        addBtn: false,
        menu: false,
        delBtn: false,
        cellBtn: false,
        editBtn: false,
        stripe: true,
        // showIndex: true,
        selection: true,
        num: 0,
        column: [
          {
            label: "图号",
            prop: "chart"
          },
          { label: "名称", prop: "name" },
          { label: "材料", prop: "material" },
          { label: "规格", prop: "standards" },
          {
            label: "数量",
            prop: "num"
          },
          { label: "备注", prop: "remark" },
         {
            label: "下料",
            prop: "blanking",
            slot:true,
            formatter(row, value, label, column) {
            }
          },
          {
            label: "铆焊",
            prop: "coldWork",
            slot:true,
            formatter(row, value, label, column) {
            }
          },
          {
            label: "冷作检验",
            prop: "coldWorkTest",
            slot:true,
            formatter(row, value, label, column) {}
          },
          {
            label: "机加",
            slot:true,
            prop: "machineAdd",
            formatter(row, value, label, column) {}
          },
          {
            label: "机加检验",
            slot:true,
            prop: "machineAddTest",
            formatter(row, value, label, column) {}
          }
        ]
      },
      estimatedArrivalShow:[],
      estimatedArrivalNumArr:[],
      estimatedArrivalDateArr:[],
      blankingCompleteShow:[], 
      blankingCompleteShowList:[], 
      estimatedArrivalCompleteShow:[], 
      estimatedArrivalCompleteShowList:[], 
      estimatedArrivalCompleteShow:[], 
      warehouseShow:[],
      warehouseShowList:[],
      warehouseNumArr:[],
      warehouseDateArr:[],
      warehouseCompleteShow:[], 
      warehouseCompleteShowList:[], 
      warehouseCompleteShow:[], 
      option_buy: {
        width: "100%",
        index: true,
        border: true,
        refreshBtn: false,
        page: true,
        header: false,
        align: "center",
        addBtn: false,
        menu: false,
        delBtn: false,
        cellBtn: false,
        editBtn: false,
        stripe: true,
        // showIndex: true,
        selection: true,
        column: [
          {
            label: "图号",
            prop: "chart"
          },
          { label: "名称", prop: "name" },
          { label: "材料", prop: "material" },
          { label: "规格", prop: "standards" },
          {
            label: "数量",
            prop: "num"
          },
           {
            label: "需求日期",
            prop: "requisition",
            slot:true,
            formatter(row, value, label, column) {}
          },
          { label: "备注", prop: "remark" },
         {
            label: "物流已发货",
            prop: "deliver",
            slot:true,
            formatter(row, value, label, column) {}
          },
          {
            label: "预计到货",
            prop: "estimatedArrival",
            slot:true,
            formatter(row, value, label, column) {}
          },
          {
            label: "入库",
            prop: "warehouse",
            slot:true,
            formatter(row, value, label, column) {}
          }
        ]
      }
    };
  },
  components: {},
  beforeRouteUpdate(to, from, next) {
    window.this = this;
    this.init(
      to.query.id,
      to.query.projectId,
      to.query.customer,
      to.query.project,
      to.query.equipment,
      to.query.chart,
      to.query.num,
      to.query.unit
    );
    next();
  },
  created() {
    window.this = this;
    this.init(
      this.$route.query.id,
      this.$route.query.projectId,
      this.$route.query.customer,
      this.$route.query.project,
      this.$route.query.equipment,
      this.$route.query.chart,
      this.$route.query.num,
      this.$route.query.unit
    );
  },
  computed: {},
  methods: {
    key_path_file(file, fileList) {
      console.log(file, fileList);
      this.form.fileName = fileList;

      if (fileList) {
        this.importXlsVisible = true;
        this.uploadShow = true

      }
    },
    // 上传文件之前的钩子
    beforeUpload(file) {
      console.log(file);
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "xls";
      const extension2 = testmsg === "xlsx";
      // const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 xls、xlsx格式!",
          type: "warning"
        });
      }

      // this.$refs.importXlsBtn.style.display = "block";

      // if(!isLt2M) {
      //     this.$message({
      //         message: '上传文件大小不能超过 10MB!',
      //         type: 'warning'
      //     });
      // }
      // return (extension || extension2) && isLt2M
      return extension || extension2;
    },
    init(id, projectId, customer, project, equipment,chart, num, unit) {
      this.num = parseInt(num);
      this.projectInfo.customerName = customer;
      this.projectInfo.projectName = project;
      this.projectInfo.equipment = equipment;
      this.projectInfo.chart = chart;
      this.projectInfo.num = this.num;
      this.projectInfo.unit = unit;

      this.initDetailParent(id);
      // 配件列表
      getProduceProgressPartList(projectId, id)
        .then(res => {
          this.partList = res.data.data;
        })
        .catch(error => {});

      this.query_self["type"] = 1;
      this.query_buy["type"] = 2;
      this.query_self["jobEquipmentListId"] = id;
      this.query_buy["jobEquipmentListId"] = id;
      this.getProjectProgressPartList();
    },
    initDetailParent(jobEquipmentListId) {
      this.completedNumMax = this.completedNum = 0;
      this.completedTestNum = this.completedTestNumMax = 0;
      this.assembleUnCheckList = [];
      getDetailParent(jobEquipmentListId)
        .then(res => {
          var info = res.data.data;
          this.parentInfo = info;
          var assembleCompleteAllNum = 0;
          //装配
          if (info.assemble) {
            this.assembleList = JSON.parse(info.assemble);

            this.assembleList.forEach(element => {
              this.completedNum += element.completedNum;
              if (element.backNum) {
                this.completedNum -= element.backNum;
              }
              if (!element.checked) {
                this.assembleUnCheckList.push(element);
              }
            });
            this.completedNumMax = this.num - this.completedNum;
          } else {
            this.completedNumMax = this.num;
          }
          assembleCompleteAllNum = this.completedNum;
          this.completedNum = this.completedNumMax;
          //装配检验
          if (info.assembleTest) {
            this.assembleTestList = JSON.parse(info.assembleTest);
            this.assembleTestList.forEach(element => {
              this.completedTestNum += element.completedTestNum;
            });
            this.completedTestNumMax =
              assembleCompleteAllNum - this.completedTestNum;
          } else {
            this.completedTestNumMax = assembleCompleteAllNum;
          }
          this.completedTestNum = this.completedTestNumMax;

          this.projectInfo.assemble = info.assemble;
          this.projectInfo.assembleTest = info.assembleTest;
        })
        .catch(error => {});
    },
    addList(item) {
      // this.goodsList.push(item);
      this.form ={}
      var obj={}
      Object.assign(obj,item);
      this.form.type =1
      this.form.sequenceId = obj.deviceId
      this.addFormVisible = true;
      this.form.name = obj.equipment;
      this.form.chart = obj.chart;
      if( obj.num){
          this.form.num = obj.num;
      }
    
      // this.form.standards = obj.standards;
      
    },
    changeTab(tab) {
      
      if ( tab==0) {
        this.tab_index = 0;
        this.query_self["type"] = 1;
      } else {
        this.tab_index = 1;
        this.query_buy["type"] = 2;
      }
      this.getProjectProgressPartList()
    },
    getProjectProgressPartList(params = {}) {
      this.coldWorkUnCheckList = []
      this.coldWorkCompleteShowList =[]
      this.coldWorkCompleteShow =[]
      this.blankingCompleteShowList =[]
      this.blankingCompleteShow =[]

      this.machineAddUnCheckList = []
      this.machineAddCompleteShowList =[]
      this.machineAddCompleteShow =[]
      this.obj_self.time = new Date()
      var query = {};
      var page = {};
      if (this.tab_index == 0) {
        query = this.query_self;
        page = this.page_self;
      } else {
        query = this.query_buy;
        page = this.page_buy;
      }

      getList(page.currentPage, page.pageSize, query)
        .then(res => {
          const data = res.data.data;
          if (this.tab_index == 0) {
            this.page_self.total = data.total;
            this.data_self = data.records;
          } else {
              
            this.page_buy.total = data.total;
            this.data_buy = data.records;
            console.log('---',this.page_buy.total , this.data_buy);
          }
        })
        .catch(error => {});
    },
    assembleComplete() {
     
      //不等空 说明不是第一次添加 取出对应字符串 格式化 加入
      if (this.parentInfo.id) {
        if (this.parentInfo.assemble) {
          var assembleList = JSON.parse(this.parentInfo.assemble);
          this.updateAssemble(assembleList.length + 1, assembleList);
        } else {
          var assembleList = [];
          this.updateAssemble(1, assembleList);
        }
      } else {
        this.parentInfo = {};
        this.parentInfo.parent = 1;
        this.parentInfo.jobEquipmentListId = this.$route.query.id;
        var assembleList = [];
        this.updateAssemble(1, assembleList);
        //没有存在说明第一次添加 则有开始创建时间
        // var jobEquipmentList ={}
        // jobEquipmentList.id =  this.$route.query.id
        // jobEquipmentList.jobStatus=4
        // jobEquipmentList.completeTime = this.$options.filters["timeFilter"](new Date(),'YYYY-MM-DD HH:mm:ss');
        // updateJobEquipmentList(jobEquipmentList).then(res=>{
        //   console.log('res : ',res);
        // }).catch(error=>{
        //   console.log(error);
        // })
      }
    },

    updateAssemble(id, assembleList) {
       this.loading = true
      var assemble = {};
      //将完成的数量加入
      assemble.id = id;
      assemble.completedNum = this.completedNum;
      assemble.createTime = this.$options.filters["timeFilter"](new Date());
      if(!this.judgeNull( assemble.completedNum)) return
      if(!this.judgeNull( assemble.createTime)) return
      assembleList.push(assemble);
      this.parentInfo.assemble = JSON.stringify(assembleList);
      update(this.parentInfo)
        .then(res => {
           this.loading = false
          this.initDetailParent(this.$route.query.id);
          this.$message.success("提交成功");
        })
        .catch(error => {
           this.loading = false
          this.$message.error("提交失败");
        });
      this.visible = false;
    },
    assembleCompleteTest(item) {
      if (this.parentInfo.id) {
        if (this.parentInfo.assembleTest) {
          var assembleTestList = JSON.parse(this.parentInfo.assembleTest);
          this.updateAssembleTest(
            assembleTestList.length + 1,
            item.id,
            item,
            assembleTestList
          );
        } else {
          var assembleTestList = [];
          this.updateAssembleTest(1, item.id, item, assembleTestList);
        }
      } else {
        this.parentInfo = {};
        this.parentInfo.parent = 1;
        this.parentInfo.jobEquipmentListId = this.$route.query.id;
        var assembleTestList = [];
        this.updateAssembleTest(1, item.id, item, assembleTestList);
      }
    },
    updateAssembleTest(id, pid, parent, assembleTestList) {
      this.loading = true
      var assembleTest = {};
      //将完成的数量加入
      assembleTest.id = id;
      assembleTest.pid = pid;
      parent.checked = 1;
      this.parentInfo.assemble = JSON.stringify(this.assembleList);
      assembleTest.completedTestNum = parent.completedNum;
      assembleTest.createTime = this.$options.filters["timeFilter"](new Date());
      if(!this.judgeNull( assembleTest.completedNum)) return
      if(!this.judgeNull( assembleTest.createTime)) return
      assembleTestList.push(assembleTest);
      this.parentInfo.assembleTest = JSON.stringify(assembleTestList);
      update(this.parentInfo)
        .then(res => {
          this.loading = false
          this.initDetailParent(this.$route.query.id);
          this.$message.success("提交成功");
        })
        .catch(error => {
          this.loading = false
          this.$message.error("提交失败");
        });
      this.visible1 = false;
      //检验通过时 需同步更新数量 跟 结束时间
        var jobEquipmentList ={}
        jobEquipmentList.id =  this.$route.query.id
        //得到所有的检验通过的数量 进行总数量对比 ，相等则同步完成时间
        var  assembleTestTotal = 0
        assembleTestList.forEach(item=>{
          assembleTestTotal +=item.completedTestNum
        })
        if(assembleTestTotal==this.$route.query.num){
           jobEquipmentList.completedTime = this.$options.filters["timeFilter"](new Date(),'YYYY-MM-DD HH:mm:ss');
        }
        jobEquipmentList.completeNum =  parent.completedNum
        jobEquipmentList.jobStatus=6
        updateJobEquipmentList(jobEquipmentList).then(res=>{
          console.log('res : ',res);
        }).catch(error=>{
          console.log(error);
        })


    },
    assembleBackTestShow(item) {
      this.backInfo = item;
      this.visible1 = false;
      this.visible2 = true;
    },
    assembleBackTest() {
      this.backInfo.backNum = this.backNum;
      if (this.backInfo.backNum) {
        if (this.parentInfo.id) {
          if (this.parentInfo.assembleTest) {
            var assembleTestList = JSON.parse(this.parentInfo.assembleTest);
            this.updateBackTest(
              assembleTestList.length + 1,
              this.parentInfo.id,
              assembleTestList
            );
          } else {
            var assembleTestList = [];
            this.updateBackTest(1, this.backInfo.id, assembleTestList);
          }
        } else {
          this.parentInfo = {};
          this.parentInfo.parent = 1;
          this.parentInfo.jobEquipmentListId = this.$route.query.id;
          var assembleTestList = [];
          this.updateBackTest(1, this.backInfo.id, assembleTestList);
        }
      } else {
        this.$message.error("请填写回退数量！");
      }
    },
    updateBackTest(id, pid, assembleBackList) {
      this.loading = true
      var assembleTest = {};
      assembleTest.id = id;
      assembleTest.pid = pid;
      //检验通过的数量
      assembleTest.completedTestNum =
        this.backInfo.completedNum - this.backInfo.backNum;
      //退回的数量
      assembleTest.backNum = this.backInfo.backNum;
      assembleTest.createTime = this.$options.filters["timeFilter"](new Date());
      if(!this.judgeNull(this.backNum)) return
      assembleBackList.push(assembleTest);
      this.parentInfo.assembleTest = JSON.stringify(assembleBackList);

      this.backInfo.checked = 1;
      this.parentInfo.assemble = JSON.stringify(this.assembleList);

      update(this.parentInfo)
        .then(res => {
           this.loading = false
          this.initDetailParent(this.$route.query.id);
          this.$message.success("提交成功");
        })
        .catch(error => {
           this.loading = false
          this.$message.error("提交失败");
        });
      this.visible2 = false;
    },
    add() {
      this.addFormVisible = true;
    },
    onSubmit() {
      this.form.jobEquipmentListId = this.$route.query.id;
      if(!this.form.num){
        this.$message.error("请填写数量");
        return
      }
      this.form.device = this.projectInfo.equipment
      add(this.form)
        .then(res => {
          this.$message.success("添加成功");
          this.addFormVisible = false;
          this.getProjectProgressPartList();
          getProduceProgressPartList(this.$route.query.projectId, this.$route.query.id)
          .then(res => {
            this.partList = res.data.data;
           })          .catch(error => {});
           })
        .catch(error => {
          this.$message.error("添加失败");
        });
    },
    onCancel() {
      this.addFormVisible = false;
    },
    onSubmit2() {
      this.form.jobEquipmentListId = this.$route.query.id;
      add(this.form)
        .then(res => {
          this.$message.success("添加成功");
          this.addFormVisible2 = false;
          this.getProjectProgressPartList();
        })
        .catch(error => {
          this.$message.error("添加失败");
        });
    },
    onCancel2() {
      this.addFormVisible2 = false;
    },
    importDialog() {
      this.importFormVisible = true;
    },
    importXls() {
      this.$refs.upload1.clearFiles();

      // this.form.fileName = [];
      // this.form.jobEquipmentListId = this.$route.query.id;
      let formData = new FormData();
      formData.append("jobEquipmentListId", this.$route.query.id);
       formData.append("device", this.projectInfo.equipment);
      if (!this.form.fileName) {
        return;
      }
      formData.append("fileName", this.form.fileName[0].raw);

      console.log(this.form.fileName);
      uploadFile(formData)
        .then(res => {
          // console.log(jobEquipmentListId, fileName);
          // this.loading = false;
          if (res.status != 200) {
            this.$message({ type: "error", message: "文件上传失败！" });
            return;
          }
          this.$message({ type: "success", message: "上传成功!" });
          this.importFormVisible = false;
          this.uploadShow =false

        getProduceProgressPartList(this.$route.query.projectId, this.$route.query.id)
        .then(res => {
          this.partList = res.data.data;
        })
        .catch(error => {});


        })
        .catch(error => {
          this.uploadShow =false
          // console.log("error:", error);
          // this.loading = false;
          // this.$message({ type: "error", message: error.msg });
        });
    },
    submitFn() {},
    // 下载文件
    download(res, fileName) {
      const content = res.data;
      const blob = new Blob([content]); // 构造一个blob对象来处理数据
      // fileName 导出文件名
      // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
      // IE10以上支持blob但是依然不支持download
      if ("download" in document.createElement("a")) {
        // 支持a标签download的浏览器
        const link = document.createElement("a"); // 创建a标签
        link.download = fileName; // a标签添加属性
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click(); // 执行下载
        URL.revokeObjectURL(link.href); // 释放url
        document.body.removeChild(link); // 释放标签
      } else {
        // 其他浏览器
        navigator.msSaveBlob(blob, fileName);
      }
    },
    downLoadXls() {
        
      downLoadFile( this.$route.query.projectId,this.$route.query.id)
        .then(res => {
          // this.loading = false;
          if (res.status != 200) {
            this.$message({ type: "error", message: "文件下载失败！" });
            return;
          }
          this.download(res, "上传模板.xls");
          // this.$message({ type: "success", message: "下载成功!" });
          // this.onLoad_part(this.page_part);
        })
        .catch(error => {
          // console.log("error:", error);
          // this.loading = false;
          // this.$message({ type: "error", message: error.msg });
        });
    },
      //下料批量
    blanking() {
      if( this.selectionSelfList.length==0){
        this.$message.error("请先选择列表条目");
        return
      }
       var list =[]
       this.selectionSelfList.forEach(item=>{
         var data ={}
         data.id = item.id
         data.completedNum = parseInt(item.num)- item.blankingTotal
         data.createTime =  this.$options.filters['timeFilter'](new Date())
         list.push(data)
      })
       var progressEquipmentListPO ={}
       progressEquipmentListPO.type =7
       progressEquipmentListPO.jobEquipmentListId = this.$route.query.id
       progressEquipmentListPO.list = list
       updateBatch(progressEquipmentListPO).then(res=>{
          this.getProjectProgressPartList();
           this.$message.success("提交成功");
        }).catch(error=>{
           this.$message.error("提交失败");
        })

    },
    //冷作批量
    coldWork() {
      if( this.selectionSelfList.length==0){
        this.$message.error("请先选择列表条目");
        return
      }
      console.log(' this.selectionSelfList :: ', this.selectionSelfList);
       var list =[]
       this.selectionSelfList.forEach(item=>{
         var data ={}
         data.id = item.id
         data.completedNum = parseInt(item.num)- item.coldWorkTotal
         data.createTime =  this.$options.filters['timeFilter'](new Date())
         list.push(data)
      })
       console.log(' this.selectionSelfList :: ', list);
       var progressEquipmentListPO ={}
       progressEquipmentListPO.type =1
       progressEquipmentListPO.jobEquipmentListId = this.$route.query.id
       progressEquipmentListPO.list = list
       updateBatch(progressEquipmentListPO).then(res=>{
          this.getProjectProgressPartList();
           this.$message.success("提交成功");
        }).catch(error=>{
           this.$message.error("提交失败");
        })

    },
    //冷作检验批量
    coldWorkTest() {
     if( this.selectionSelfList.length==0){
        this.$message.error("请先选择列表条目");
        return
      }
     console.log(' this.selectionSelfList :: ', this.selectionSelfList);
       var list =[]
       this.selectionSelfList.forEach(item=>{
         var data ={}
         data.id = item.id
        //  data.completedNum = parseInt(item.num)- item.coldWorkTotal
         data.createTime =  this.$options.filters['timeFilter'](new Date())
         list.push(data)
      })
       console.log(' this.selectionSelfList :: ', list);
       var progressEquipmentListPO ={}
       progressEquipmentListPO.type =2
       progressEquipmentListPO.jobEquipmentListId = this.$route.query.id
       progressEquipmentListPO.list = list
       updateBatch(progressEquipmentListPO).then(res=>{
          this.getProjectProgressPartList();
           this.$message.success("提交成功");
        }).catch(error=>{
           this.$message.error("提交失败");
        })
    },
    //机加批量
    machineAdd() {
      if( this.selectionSelfList.length==0){
        this.$message.error("请先选择列表条目");
        return
      }
       console.log(' this.selectionSelfList :: ', this.selectionSelfList);
       var list =[]
       this.selectionSelfList.forEach(item=>{
         var data ={}
         data.id = item.id
         data.completedNum = parseInt(item.num)- item.machineAddTotal
         data.createTime =  this.$options.filters['timeFilter'](new Date())
         list.push(data)
      })
       console.log(' this.selectionSelfList :: ', list);
       var progressEquipmentListPO ={}
       progressEquipmentListPO.type =3
       progressEquipmentListPO.jobEquipmentListId = this.$route.query.id
       progressEquipmentListPO.list = list
       updateBatch(progressEquipmentListPO).then(res=>{
          this.getProjectProgressPartList();
           this.$message.success("提交成功");
        }).catch(error=>{
           this.$message.error("提交失败");
        })
    },
    //机加检验批量
    machineAddTest() {
      if( this.selectionSelfList.length==0){
        this.$message.error("请先选择列表条目");
        return
      }
      var list =[]
       this.selectionSelfList.forEach(item=>{
         var data ={}
         data.id = item.id
        //  data.completedNum = parseInt(item.num)- item.coldWorkTotal
         data.createTime =  this.$options.filters['timeFilter'](new Date())
         list.push(data)
      })
       console.log(' this.selectionSelfList :: ', list);
       var progressEquipmentListPO ={}
       progressEquipmentListPO.type =4
       progressEquipmentListPO.jobEquipmentListId = this.$route.query.id
       progressEquipmentListPO.list = list
       updateBatch(progressEquipmentListPO).then(res=>{
          this.getProjectProgressPartList();
           this.$message.success("提交成功");
        }).catch(error=>{
           this.$message.error("提交失败");
        })
    },
    //预计到货批量
    estimatedArrival() {
      if( this.selectionSelfList.length==0){
        this.$message.error("请先选择列表条目");
        return
      }
       var list =[]   
       this.selectionSelfList.forEach(item=>{
         var data ={}
         data.id = item.id
         data.completedNum = parseInt(item.num)- item.estimatedArrivalTotal
         data.createTime =  this.$options.filters['timeFilter'](new Date())
         list.push(data)
      })
       console.log(' this.selectionSelfList :: ', list);
       var progressEquipmentListPO ={}
       progressEquipmentListPO.type =5
       progressEquipmentListPO.jobEquipmentListId = this.$route.query.id
       progressEquipmentListPO.list = list
       updateBatch(progressEquipmentListPO).then(res=>{
          this.getProjectProgressPartList();
           this.$message.success("提交成功");
        }).catch(error=>{
           this.$message.error("提交失败");
        })
    },
    //入库批量
    warehouse() {
      var list =[]
      if( this.selectionSelfList.length==0){
        this.$message.error("请先选择列表条目");
        return
      }
       this.selectionSelfList.forEach(item=>{
         var data ={}
         data.id = item.id
         data.completedNum = parseInt(item.estimatedArrivalTotal)- item.warehouseTotal
         data.createTime =  this.$options.filters['timeFilter'](new Date())
         list.push(data)
      })
       console.log(' this.selectionSelfList :: ', list);
       var progressEquipmentListPO ={}
       progressEquipmentListPO.type =5
       progressEquipmentListPO.jobEquipmentListId = this.$route.query.id
       progressEquipmentListPO.list = list
       updateBatch(progressEquipmentListPO).then(res=>{
          this.getProjectProgressPartList();
           this.$message.success("提交成功");
        }).catch(error=>{
           this.$message.error("提交失败");
        })
    },
    selectionSelfChange(selection) {
      console.log("selection ", selection);
      this.selectionSelfList = selection;
    },
    selectionBuyChange(selection) {
      console.log("selection ", selection);
      this.selectionBuyList = selection;
    },
    // 下料
    updateBlanking(id,nid,num,blankingList){
       this.loading = true
        var info  = {}
        info.id = id
        var item = {}
        item.id = nid
        item.completedNum =  num
        item.createTime= this.$options.filters['timeFilter'](new Date())
       if(!this.judgeNull( item.completedNum)) return
        blankingList.push(item)
        info.blanking = JSON.stringify(blankingList)
       update(info).then(res=>{
          //刷新表格
           this.loading = false
           this.getProjectProgressPartList();
           this.$message.success("提交成功");
        }).catch(error=>{
           this.loading = false
           this.$message.error("提交失败");
        })
    },
   blankingCompleteShowAddContent(e,row){
      // this.completedNum = row.num-row.blankingTotal
      this.$set(this.completedNumArr,row.$index,row.num-row.blankingTotal)
      // this.completedNumArr[row.$index] =  row.num-row.blankingTotal
      // this.$set(this.blankingCompleteShow,row.$index, true)
      // this.coldWorkCompleteShow[row.$index] = true
       const popoverEl = e.target.parentNode.parentNode
      this.$set(popoverEl,'showPopper' ,true)
    }, 
    blankingComplete(row){
      this.$set(this.blankingCompleteShow,row.$index, true)
      // this.coldWorkCompleteShow[row.$index] = false
      this.updateBlanking(row.id, row.blankingList.length,this.completedNumArr[row.$index], row.blankingList)
    },

    // 冷作
    updateColdWork(id,nid,num,coldWorkList){
       this.loading = true
        var info  = {}
        info.id = id
        var item = {}
        item.id = nid
        item.completedNum =  num
        item.createTime= this.$options.filters['timeFilter'](new Date())
       if(!this.judgeNull( item.completedNum)) return
        coldWorkList.push(item)
        info.coldWork = JSON.stringify(coldWorkList)
       update(info).then(res=>{
          //刷新表格
           this.loading = false
           this.getProjectProgressPartList();
           this.$message.success("提交成功");
        }).catch(error=>{
           this.loading = false
           this.$message.error("提交失败");
        })
    },
    coldWorkCompleteShowAddContent(e,row){
      // console.log('row : ',row.$index,row, this.coldWorkCompleteShow);
      // this.completedNum = row.num-row.coldWorkTestTotal
      this.$set(this.completedNumArr,row.$index,row.num-row.coldWorkTestTotal)
      // this.completedNumArr[row.$index] =  row.num-row.coldWorkTestTotal
      // this.$set(this.coldWorkCompleteShow,row.$index, true)
      // this.coldWorkCompleteShow[row.$index] = true
      const popoverEl = e.target.parentNode.parentNode
      this.$set(popoverEl,'showPopper' ,true)
    }, 
    coldWorkCompleteShowListContent(row){
       this.$set(this.coldWorkCompleteShowList,row.$index, true)
      //  this.coldWorkCompleteShowList[row.$index]=true
    },
    coldWorkComplete(row){
      this.$set(this.coldWorkCompleteShow,row.$index, true)
      // this.coldWorkCompleteShow[row.$index] = false
      this.updateColdWork(row.id, row.coldWorkList.length,this.completedNumArr[row.$index], row.coldWorkList)
    },
    coldWorkTestCompleteShowAddContent(e,row){
      this.coldWorkUnCheckList = []
      row.coldWorkList.forEach(item=>{
        if(item.checked!=1){
          this.coldWorkUnCheckList.push(item)
        }
      })
      //  this.$set(this.coldWorkTestCompleteShow,row.$index, true)
       const popoverEl = e.target.parentNode.parentNode
      this.$set(popoverEl,'showPopper' ,true)
      // this.coldWorkTestCompleteShow[row.$index] = true
    },
    coldWorkTestCompleteShowListContent(row){
         this.$set(this.coldWorkTestCompleteShowList,row.$index, true)
        // this.coldWorkTestCompleteShowList[row.$index] = true
    },
    coldWorkTestBackShow(row,item){
      this.backNum = 0
      this.editRow = row
      this.backInfo = item 
      this.visible4 = true
    },
    coldWorkTestComplete(row,item){
      this.$set(this.coldWorkTestCompleteShow,row.$index, true)
      // this.coldWorkTestCompleteShow[row.$index] = false
      this.updateColdWorkTest(row.id, row.coldWorkTestList.length,item.completedNum,item,row, row.coldWorkTestList)
    },
    updateColdWorkTest(id,nid,num,item1,row,coldWorkTestList){
       this.loading = true
        var info  = {}
        info.id = id
        var item = {}
        item.id = nid
        item.pid = item1.id 
        item.completedNum =  num
        item.createTime= this.$options.filters['timeFilter'](new Date())
        if(!this.judgeNull( item.completedNum)) return
        if(!this.judgeNull( item.createTime)) return
        coldWorkTestList.push(item)
        info.coldWorkTest = JSON.stringify(coldWorkTestList)
        item1.checked =1
        info.coldWork = JSON.stringify(row.coldWorkList)
       update(info).then(res=>{
          //刷新表格
           this.loading = false
           this.getProjectProgressPartList();
           this.$message.success("提交成功");
        }).catch(error=>{
           this.loading = false
           this.$message.error("提交失败");
        })
    },
    coldWorkTestBack(){
      this.backInfo.backNum = this.backNum
      if (this.backInfo.backNum) {
          if (this.editRow.coldWorkTest) {
            var coldWorkTestList = this.editRow.coldWorkTestList
            this.updateColdWorkBackTest(
              coldWorkTestList.length + 1,
              this.editRow.id,
              coldWorkTestList
            );
          } else {
            var coldWorkTestList = [];
            this.updateColdWorkBackTest(1, this.editRow.id, coldWorkTestList);
          }
        
      } else {
        this.$message.error("请填写回退数量！");
      }
    },
    updateColdWorkBackTest(id, pid, coldWorkBackList) {
      var assembleTest = {};
      assembleTest.id = id;
      assembleTest.pid = pid;
      //检验通过的数量
      assembleTest.completedNum =
        this.backInfo.completedNum - this.backInfo.backNum;
      //退回的数量
      assembleTest.backNum = this.backInfo.backNum;
      assembleTest.createTime = this.$options.filters["timeFilter"](new Date());
      coldWorkBackList.push(assembleTest);
      this.editRow.coldWorkTest = JSON.stringify(coldWorkBackList);

      this.backInfo.checked = 1;
      this.editRow.coldWork = JSON.stringify(this.editRow.coldWorkList);

      update(this.editRow)
        .then(res => {
          this.getProjectProgressPartList()
          this.visible4 = false;
          this.$message.success("提交成功");
        })
        .catch(error => {
          this.visible4 = false;
          this.$message.error("提交失败");
        });
     
    },
// 机加
    updateMachineAdd(id,nid,num,machineAddList){
       this.loading = true
        var info  = {}
        info.id = id
        var item = {}
        item.id = nid
        item.completedNum =  num
        item.createTime= this.$options.filters['timeFilter'](new Date())
        if(!this.judgeNull( item.completedNum)) return
        if(!this.judgeNull( item.createTime)) return
        machineAddList.push(item)
        info.machineAdd = JSON.stringify(machineAddList)
       update(info).then(res=>{
          //刷新表格
           this.loading = false
           this.getProjectProgressPartList();
           this.$message.success("提交成功");
        }).catch(error=>{
           this.loading = false
           this.$message.error("提交失败");
        })
    },
    machineAddCompleteShowAddContent(e,row){
      // this.completedNum = row.num-row.machineAddTestTotal
      this.$set(this.completedNumArr1,row.$index,row.num-row.machineAddTestTotal)
      this.completedNumArr1[row.$index] =  row.num-row.machineAddTestTotal
       const popoverEl = e.target.parentNode.parentNode
      this.$set(popoverEl,'showPopper' ,true)
      // this.$set(this.machineAddCompleteShow,row.$index, true)
      // this.machineAddCompleteShow[row.$index] = true
    }, 
    machineAddCompleteShowListContent(row){
       this.$set(this.machineAddCompleteShowList,row.$index, true)
      //  this.machineAddCompleteShowList[row.$index]=true
    },
    machineAddComplete(row){
       this.$set(this.machineAddCompleteShow,row.$index, true)
      // this.machineAddCompleteShow[row.$index] = false
      this.updateMachineAdd(row.id, row.machineAddList.length,this.completedNumArr1[row.$index], row.machineAddList)
    },
    machineAddTestCompleteShowAddContent(e,row){
      this.machineAddUnCheckList = []
      row.machineAddList.forEach(item=>{
        if(item.checked!=1){
          this.machineAddUnCheckList.push(item)
        }
      })
      //  this.$set(this.machineAddTestCompleteShow,row.$index, true)
       const popoverEl = e.target.parentNode.parentNode
      this.$set(popoverEl,'showPopper' ,true)
      // this.machineAddTestCompleteShow[row.$index] = true
    },
    machineAddTestCompleteShowListContent(row){
       this.$set(this.machineAddTestCompleteShowList,row.$index, true)
        // this.machineAddTestCompleteShowList[row.$index] = true
    },
    machineAddTestBackShow(row,item){
      this.backNum = 0
      this.editRow = row
      this.backInfo = item 
      this.visible5 = true
    },
    machineAddTestComplete(row,item){
       this.$set(this.machineAddTestCompleteShow,row.$index, true)
      // this.machineAddTestCompleteShow[row.$index] = false
      this.updateMachineAddTest(row.id, row.machineAddTestList.length,item.completedNum,item,row, row.machineAddTestList)
    },
    updateMachineAddTest(id,nid,num,item1,row,machineAddTestList){
       this.loading = true
        var info  = {}
        info.id = id
        var item = {}
        item.id = nid
        item.pid = item1.id 
        item.completedNum =  num
        item.createTime= this.$options.filters['timeFilter'](new Date())
        if(!this.judgeNull( item.completedNum)) return
        if(!this.judgeNull( item.createTime)) return
        machineAddTestList.push(item)
        info.machineAddTest = JSON.stringify(machineAddTestList)
        item1.checked =1
        info.machineAdd = JSON.stringify(row.machineAddList)
       update(info).then(res=>{
          //刷新表格
           this.loading = false
           this.getProjectProgressPartList();
           this.$message.success("提交成功");
        }).catch(error=>{
           this.loading = false
           this.$message.error("提交失败");
        })
    },
    machineAddTestBack(){
      this.backInfo.backNum = this.backNum
      if (this.backInfo.backNum) {
          if (this.editRow.machineAddTest) {
            var machineAddTestList = this.editRow.machineAddTestList
            this.updateMachineAddBackTest(
              machineAddTestList.length + 1,
              this.editRow.id,
              machineAddTestList
            );
          } else {
            var machineAddTestList = [];
            this.updateMachineAddBackTest(1, this.editRow.id, machineAddTestList);
          }
        
      } else {
        this.$message.error("请填写回退数量！");
      }
    },
    updateMachineAddBackTest(id, pid, machineAddBackList) {
      var assembleTest = {};
      assembleTest.id = id;
      assembleTest.pid = pid;
      //检验通过的数量
      assembleTest.completedNum =
        this.backInfo.completedNum - this.backInfo.backNum;
      //退回的数量
      assembleTest.backNum = this.backInfo.backNum;
      assembleTest.createTime = this.$options.filters["timeFilter"](new Date());
      machineAddBackList.push(assembleTest);
      this.editRow.machineAddTest = JSON.stringify(machineAddBackList);

      this.backInfo.checked = 1;
      this.editRow.machineAdd = JSON.stringify(this.editRow.machineAddList);
      update(this.editRow)
        .then(res => {
          this.visible5 = false;
          this.getProjectProgressPartList()
          this.$message.success("提交成功");
        })
        .catch(error => {
          this.visible5 = false;
          this.$message.error("提交失败");
        });

    },

   estimatedArrivalShowAddContent(e,row){
      // this.completedNum = row.num-rowestimatedArrivalTotal
      this.estimatedArrivalNumArr[row.$index] =  row.num-row.estimatedArrivalTotal
      this.$set(this.estimatedArrivalNumArr,row.$index,row.num-row.estimatedArrivalTotal)
       const popoverEl = e.target.parentNode.parentNode
      this.$set(popoverEl,'showPopper' ,true)
      // this.estimatedArrivalShow[row.$index] = true
      // this.$set(this.estimatedArrivalShow,row.$index, true)
      // console.log(' this.estimatedArrivalShow[row.$index]  :',row.$index, this.estimatedArrivalShow[row.$index] );
      
    }, 
  estimatedArrivalComplete(row){
     this.loading = true
        var info  = {}
        info.id = row.id
        var item = {}
        
        item.completedNum =  this.estimatedArrivalNumArr[row.$index]
        item.createTime=this.$options.filters["timeFilter"]( this.estimatedArrivalDateArr[row.$index])
        if(!this.judgeNull( item.completedNum)) return
        if(!this.judgeNull( item.createTime)) return
        row.estimatedArrivalList.push(item)
        info.estimatedArrival = JSON.stringify( row.estimatedArrivalList)
        update(info).then(res=>{
          //刷新表格
           this.loading = false
           this.getProjectProgressPartList();
           this.$message.success("提交成功");
        }).catch(error=>{
           this.loading = false
           this.$message.error("提交失败");
        })
        this.$set(this.estimatedArrivalShow,row.$index, false)
  },
  estimatedArrivalCompleteShowListContent(row){
    // estimatedArrivalCompleteShowList
    this.$set(this.estimatedArrivalCompleteShowList,row.$index, false)
  },
   warehouseShowAddContent(e,row){
      // this.completedNum = row.num-rowestimatedArrivalTotal
      this.warehouseNumArr[row.$index] =  row.estimatedArrivalTotal-row.warehouseTotal
      this.$set( this.warehouseNumArr,row.$index,row.estimatedArrivalTotal-row.warehouseTotal)
      // this.estimatedArrivalShow[row.$index] = true
      // this.$set(this.warehouseShow,row.$index, true)
       const popoverEl = e.target.parentNode.parentNode
      this.$set(popoverEl,'showPopper' ,true)
 
      
    }, 
  warehouseComplete(row){
     this.loading = true
        var info  = {}
        info.id = row.id
        var item = {}
        item.completedNum =  this.warehouseNumArr[row.$index]
        item.createTime=this.$options.filters["timeFilter"]( this.warehouseDateArr[row.$index])
        if(!this.judgeNull( item.completedNum)) return
        if(!this.judgeNull( item.createTime)) return
        row.warehouseList.push(item)
        info.warehouse = JSON.stringify( row.warehouseList)
        update(info).then(res=>{
          //刷新表格
           this.loading = false
           this.getProjectProgressPartList();
           this.$message.success("提交成功");
        }).catch(error=>{
           this.loading = false
           this.$message.error("提交失败");
        })
        this.$set(this.warehouseShow,row.$index, false)
  },
  estimatedArrivalCompleteShowListContent(row){
    // estimatedArrivalCompleteShowList
    this.$set(this.estimatedArrivalCompleteShowList,row.$index, false)
  },
  change(e){
    this.$forceUpdate()
  },
  estimatedArrivalChangeComplete(row) {
     this.loading = true
      var info = {};
      info.id =  this.changeForm.id;
    
      if(this.changeForm.changeTime){
        var  index = this.changeForm.arrIndex
        // var changeList =  this.form.estimatedArrivalList[index].changeList
        var change = {}
        change.id = this.changeForm.estimatedArrivalList[index].changeList.length+1
        change.createTime =  this.$options.filters["timeFilter"](this.changeForm.changeTime )
        if(!this.judgeNull( this.changeForm.changeTime )) return
        this.changeForm.estimatedArrivalList[index]['changeList'].push(change) 
        info.estimatedArrival =  JSON.stringify(this.changeForm.estimatedArrivalList);
      }else{
         this.$message.error("请填写变更时间！");
      }
      update(info)
        .then(res => {
          //刷新表格
           this.loading = false
           this.changeFormVisible =false
          this.$message.success("提交成功");
          this.getProjectProgressPartList();
         
        })
        .catch(error => {
           this.loading = false
          console.log(error)
          this.changeFormVisible =false
          this.$message.error("提交失败");
        });
    },
  estimatedArrivalChangeShowContent(row,index) {
      // this.completedNum = row.num-rowestimatedArrivalTotal
      // this.estimatedArrivalChangeDateArr[row.$index] =
      this.changeForm = row
      this.changeForm.arrIndex = index
      this.changeForm.createTime = row.estimatedArrivalList[index].createTime
      // this.estimatedArrivalShow[row.$index] = true
      this.changeFormVisible = true
      // this.$set(this.estimatedArrivalChangeShow[row.$index], index, true);
    },
   requisitionChangeShowContent(row,index) {
      // this.completedNum = row.num-rowestimatedArrivalTotal
      // this.estimatedArrivalChangeDateArr[row.$index] =
      this.form = row
      this.form.arrIndex = index
      this.form.createTime = row.requisitionList[index].createTime
      // this.estimatedArrivalShow[row.$index] = true
      this.changeFormVisible = true
      // this.$set(this.estimatedArrivalChangeShow[row.$index], index, true);
    },

    requisitionComplete(row) {
       this.loading = true
      var info = {};
      info.id = row.id;
      var item = {};

      item.completedNum = this.requisitionNumArr[row.$index];
      item.createTime = this.$options.filters["timeFilter"](
        this.requisitionDateArr[row.$index]
      );
         if(!this.judgeNull( item.completedNum)) return
      if(!this.judgeNull( item.createTime)) return
      row.requisitionList.push(item);
      info.requisition = JSON.stringify(row.requisitionList);
      update(info)
        .then(res => {
          //刷新表格
           this.loading = false
         this.getProjectProgressPartList();
          this.$message.success("提交成功");
        })
        .catch(error => {
           this.loading = false
          this.$message.error("提交失败");
        });
      this.$set(this.estimatedArrivalShow, row.$index, false);
    },
     requisitionShowAddContent(e,row) {
      // this.completedNum = row.num-rowestimatedArrivalTotal
      this.$set(this.requisitionNumArr,row.$index, row.num - row.requisitionTotal)
      // this.requisitionNumArr[row.$index] =
        // row.num - row.requisitionTotal;
      // this.estimatedArrivalShow[row.$index] = true
      // this.$set(this.requisitionShow, row.$index, true);
       const popoverEl = e.target.parentNode.parentNode
      this.$set(popoverEl,'showPopper' ,true)
    },

   requisitionChangeComplete(row) {
      var info = {};
      info.id =  this.form.id;
    
      if(this.form.changeTime){
        var  index = this.form.arrIndex
        // var changeList =  this.form.estimatedArrivalList[index].changeList
        var change = {}
        change.id = this.form.estimatedArrivalList[index].changeList.length+1
        change.createTime =  this.$options.filters["timeFilter"](this.form.changeTime )
        console.log(this.form.changeTime,change);
        
        this.form.requisitionList[index]['changeList'].push(change) 
        info.requisition =  JSON.stringify(this.form.requisitionList);
      }else{
         this.$message.error("请填写变更时间！");
      }
      update(info)
        .then(res => {
          //刷新表格
         this.getProjectProgressPartList();
          this.changeFormVisible =false
          this.$message.success("提交成功");
        })
        .catch(error => {
          this.changeFormVisible =false
          this.$message.error("提交失败");
        });
    },
   requisitionChangeShowContent(row,index) {
      // this.completedNum = row.num-rowestimatedArrivalTotal
      // this.estimatedArrivalChangeDateArr[row.$index] =
      this.form = row
      this.form.arrIndex = index
      this.form.createTime = row.requisitionList[index].createTime
      // this.estimatedArrivalShow[row.$index] = true
      this.changeFormVisible = true
      // this.$set(this.estimatedArrivalChangeShow[row.$index], index, true);
    },
    judgeNull(val){
      if( !val ){
         this.loading = false
         this.$message.error("请确认是否漏填！");
        return false
      }
      return true
    },
      deliverChangeShowContent(row,index) {
      // this.completedNum = row.num-rowestimatedArrivalTotal
      // this.estimatedArrivalChangeDateArr[row.$index] =
      this.form = row
      this.form.arrIndex = index
      this.form.createTime = row.deliverList[index].createTime
      // this.estimatedArrivalShow[row.$index] = true
      this.changeFormVisible = true
      // this.$set(this.estimatedArrivalChangeShow[row.$index], index, true);
    },

    deliverComplete(row) {
      this.loading = true
      var info = {};
      info.id = row.id;
      var item = {};

      item.completedNum = this.deliverNumArr[row.$index];
      item.createTime = this.$options.filters["timeFilter"](
        this.deliverDateArr[row.$index]
      );

      if(!this.judgeNull( item.completedNum)) return
      if(!this.judgeNull( item.createTime)) return
      row.deliverList.push(item);
      info.deliver = JSON.stringify(row.deliverList);
      update(info)
        .then(res => {
          //刷新表格
          this.loading = false
          this.$set(this.deliverShow, row.$index, false);
          this.onLoad(this.page);
     
          this.$message.success("提交成功");
        })
        .catch(error => {
           this.loading = false
          this.$message.error("提交失败");
        });
     
    },
   deliverShowAddContent(e,row) {
      // this.completedNum = row.num-rowestimatedArrivalTotal
      this.$set(this.deliverNumArr,row.$index, row.num - row.deliverTotal)
      // this.deliverNumArr[row.$index] =
        // row.num - row.deliverTotal;
      // this.estimatedArrivalShow[row.$index] = true
      // this.$set(this.deliverShow, row.$index, true);
       const popoverEl = e.target.parentNode.parentNode
      this.$set(popoverEl,'showPopper' ,true)
    },

   deliverChangeComplete(row) {
      var info = {};
      info.id =  this.form.id;
    
      if(this.form.changeTime){
        var  index = this.form.arrIndex
        // var changeList =  this.form.estimatedArrivalList[index].changeList
        var change = {}
        change.id = this.form.deliverList[index].changeList.length+1
        change.createTime =  this.$options.filters["timeFilter"](this.form.changeTime )
        console.log(this.form.changeTime,change);
        
        this.form.deliverList[index]['changeList'].push(change) 
        info.deliver =  JSON.stringify(this.form.deliverList);
      }else{
         this.$message.error("请填写变更时间！");
      }
      update(info)
        .then(res => {
          //刷新表格
          this.onLoad(this.page);
          this.changeFormVisible =false
          this.$message.success("提交成功");
        })
        .catch(error => {
          this.changeFormVisible =false
          this.$message.error("提交失败");
        });
    },
   deliverChangeShowContent(row,index) {
      // this.completedNum = row.num-rowestimatedArrivalTotal
      // this.estimatedArrivalChangeDateArr[row.$index] =
      this.form = row
      this.form.arrIndex = index
      this.form.createTime = row.deliverList[index].createTime
      // this.estimatedArrivalShow[row.$index] = true
      this.changeFormVisible = true
      // this.$set(this.estimatedArrivalChangeShow[row.$index], index, true);
    },

  }
};
</script>

<style lang="stylus">
.el-table {
  font-size: 0.07rem;
}

.el-table .cell {
  font-size: 0.07rem;
}

.el-form-item__label {
  font-size: 0.07rem;
}

.el-button--mini, .el-button--small {
  font-size: 0.07rem;
}
</style>
<style  lang="stylus" scoped>
.container {
  margin: 20px 40px;
  width: auto;
 
  .table-box {
    background-color: #ffffff;

    .btn-box {
      text-align: right;
      margin-bottom: 10px;
      padding-right: 10px;
      padding-bottom: 10px;
    }
  }
}
.bord{
 border: 1px solid #89c3f8;
 padding: 10px;
 margin-bottom: 10px;
}
.bord1{
 border: 1px solid #89c3f8;
 padding: 10px;
 margin-top: 10px;
}
.btn-box {
  text-align: center;
  margin-top: 20px;
}

.form-box {
  border: 1px solid #89c3f8;
  padding: 0 10px;
  margin-top: 20px;

  .in-form-box {
    width: 400px;
    padding-top: 20px;
  }
}

.tab-btn {
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;

  .btn {
    color: #fff;
    background-color: #FFA897;
    width: 170px;
    height: 30px;
    padding-top: 8px;
    text-align: center;
    cursor: pointer;
    margin-right: 2px;

    &.on {
      background-color: #ffa897;
    }
  }
}

.table-box {
  font-size: 0.07rem;
  color: #515151;
  padding-top: 10px;
  padding-bottom: 10px;

  .item {
    .tip-box {
      display: flex;
      justify-content: space-between;

      .title {
        padding: 10px 30px;
        margin-left: 8px;
        background-color: #FFA897;
      }

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

    .text1 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.07rem;
      height: 40px;
      text-align: center;
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

.font {
  font-size: 20px;
  padding-top: 10px;
  padding-buttom: 10px;
}

.list-box {
  display: flex;
  flex-flow: wrap;

  .list {
    width: 292px;
    margin: 10px 10px 20px 10px;

    .detail {
      color: #303133;
      margin: 0 auto;
      background-color: #fff;
      font-size: 14px;
      padding: 5px 5px 5px 5px;
      height: 145px;

      p {
        color: #909399;
        margin: 12px 0;

        label {
          display: inline-block;
          color: #303133;
          width: 80px;
          text-align-last: justify;

          &:after {
            content: ':';
            padding-right: 15px;
          }
        }
      }
    }
  }
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>