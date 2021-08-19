<template>
  <div class="app-container message-container">
    <div class="message-warp">
      <div class="base_warp">
        <h4>
          <span style="font-weight: 500; color: #999999">邀约工单: </span
          >{{ caseInfo.inviteWorkNumber }}
        </h4>
        <h4>
          <span style="font-weight: 500; color: #999999">纠纷编号: </span
          >{{ caseInfo.disputeNumber }}
        </h4>
        <h4>
          <span style="font-weight: 500; color: #999999">调解机构：</span
          >{{ caseInfo.mediateOrganize }}
        </h4>
        <h4>
          <span style="font-weight: 500; color: #999999">调解员: </span>
          {{ caseInfo.mediator }}
        </h4>
      </div>
      <div class="base_warp">
        <div class="info_warp">
          <h4>案件欠款详情：</h4>
          <moneytable
            :caseInfo="caseInfo.caseInfo"
            :caseStayRepayMoney="caseInfo.caseStayRepayMoney"
            ref="moneytable"
          />
        </div>
        <div class="info_warp">
          <h4>基本信息：</h4>
          <div class="info">
            <h4>
              <span style="font-weight: 500; color: #999999">产品: </span>
              {{ caseInfo.productName }}
            </h4>
            <h4>
              <span style="font-weight: 500; color: #999999">姓名: </span
              >{{ caseInfo.caseUserName }}
            </h4>
            <h4>
              <span style="font-weight: 500; color: #999999">姓别: </span
              >{{ caseInfo.caseUserSex }}
            </h4>
            <h4
             :class="$route.params.mediateStatus < 4 ?'position_are':null"
            >
              <span style="font-weight: 500; color: #999999">住址: </span>
              {{ caseInfo.caseProvince }}/
              {{ caseInfo.caseCity }}/
              {{ caseInfo.caseArea }}
              {{ caseInfo.caseStreet === null ? null : ('/'+ caseInfo.caseStreet)}}
              <span  v-if="$route.params.mediateStatus < 4" @click="handleEditAdress('修改地址')">
                <svg-icon style="width: 25px; height: 25px" icon-class="edits"
              /></span>
            </h4>
            <h4
              :class="$route.params.mediateStatus < 4 ?'position_are':null"
            >
              <span style="font-weight: 500; color: #999999">详细住址: </span>
              {{ caseInfo.caseAddressDetail }}
              <span  v-if="$route.params.mediateStatus  < 4" @click="handleEditAdress('修改详细地址')">
                <svg-icon style="width: 25px; height: 25px" icon-class="edits"
              /></span>
            </h4>
            <h4>
              <span style="font-weight: 500; color: #999999">身份证号: </span
              >{{ caseInfo.caseUserIdNumber }}
            </h4>
            <h4
              :class="$route.params.mediateStatus < 4 ?'position_are':null"
            >
              <span style="font-weight: 500; color: #999999">在用手机号: </span
              >{{ caseInfo.casePhone }}
              <span  v-if="$route.params.mediateStatus  < 4" @click="handleEditAdress('修改在用手机号')">
                <svg-icon style="width: 25px; height: 25px" icon-class="edits"
              /></span>
            </h4>
          </div>
        </div>
      </div>
      <div>
        <h4>证据材料：</h4>
        <evidence
          :agentList="agentList"
          :agentImgData='agentImgData'
          :legalList="legalList"
          :otherList="otherList"
          :caseInfo='caseInfo'
          ref="evidence"
        />
      </div>
      <div class="base_warp">
        <div class="info_warp">
          <h4>纠纷简要：</h4>
          <dispute  :MdDisputelist="MdDisputelist" :caseInfo='caseInfo' ref="dispute" />
        </div>
        <div class="info_warp" v-if="$route.params.mediateStatus < 4">
          <h4>调解机构：</h4>
          <orgstructure
            @handleOk='handleeditOk'
            @handleChange="handleChange"
            :caseInfo="caseInfo"
            :agentInfo='agentInfo'
            :orgList='orgList'
            :agentList="agentallList"
            ref="orgstructure"
          />
        </div>
      </div>
      <div class="line"></div>
      <div class="base_warp">
        <div class="info_warp">
          <h4>文书材料：</h4>
          <documentmaterials
            :MdSchemelist="MdSchemelist"
            :caseInfo='caseInfo' 
            ref="documentmaterials"
          />
        </div>
      </div>
      <el-dialog :title="title" :visible.sync="editAdressShow">
        <el-form :model="form">
          <template v-if="title === '修改地址'">
            <el-form-item label="地址：" label-width="120">
              <span class="adress_text">
                {{ caseInfo.caseProvince }}{{ caseInfo.caseCity === null ? null : "/"
                }}{{ caseInfo.caseCity }}{{ caseInfo.caseArea === null ? null : "/"
                }}{{ caseInfo.caseArea }}{{ caseInfo.caseStreet === null ? null : ("/"+caseInfo.caseStreet)
                }}
              </span>
              <div class="adress_text adress">
                <el-tabs v-model="activeName" type="card">
                  <el-tab-pane label="省份" name="first">
                    <div class="title_warp">
                      <div
                        class="title"
                        :class="code === item.id ? 'title_active' : null"
                        v-for="item in provincesList"
                        :key="item.id"
                        @click="handlegetpv(item, 0)"
                      >
                        {{ item.name }}
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="城市" name="second">
                    <div class="title_warp">
                      <div
                        class="title"
                        :class="code === item.id ? 'title_active' : null"
                        v-for="item in cityList"
                        :key="item.id"
                        @click="handlegetpv(item, 1)"
                      >
                        {{ item.name }}
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="区县" name="third">
                    <div class="title_warp">
                      <div
                        class="title"
                        :class="code === item.id ? 'title_active' : null"
                        v-for="item in eartList"
                        :key="item.id"
                        @click="handlegetpv(item, 2)"
                      >
                        {{ item.name }}
                      </div>
                    </div>
                  </el-tab-pane>
                   <el-tab-pane label="街道" name="fourth">
                    <div class="title_warp">
                      <div
                        class="title"
                        :class="code === item.id ? 'title_active' : null"
                        v-for="item in streetList"
                        :key="item.id"
                        @click="handlegetpv(item, 3)"
                      >
                        {{ item.name }}
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-form-item>
          </template>
          <template v-else-if="title === '修改详细地址'">
            <el-form-item label="详细地址：" prop="caseAddressDetail">
              <el-input
                type="text"
                style="width: 200px"
                v-model="form.caseAddressDetail"
              ></el-input>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="在用手机号：" prop="phone">
              <el-input
                type="text"
                style="width: 200px"
                v-model="form.phone"
              ></el-input>
            </el-form-item>
          </template>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editAdressShow = false">取 消</el-button>
          <el-button type="primary" @click="handleOk">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import moneytable from "./components/moneytable";
import evidence from "./components/evidence";
import dispute from "./components/dispute";
import orgstructure from "./components/orgstructure";
import documentmaterials from "./components/documentmaterials";
import { usableList } from "@/api/mediateorg";
import {
  mediateDetail,
  updateMediateDeta,
  getOtherData,
  getProvinces,
  getCityList,
  updateMediateDetailCaseMsg
} from "@/api/mediatedetail";
import {
  queryLegal,
  mediatequeryconfigqueryMdDispute,
  mediatequeryconfigqueryMdScheme,
  configqueryAgent,
} from "@/api/mediateobsettings";
const defaultForm = {
  adress: null,
  phone: null,
  caseAddressDetail: null,
};
export default {
  name: "mediatedetail",
  components: {
    moneytable,
    evidence,
    dispute,
    orgstructure,
    documentmaterials,
  },
  data() {
    return {
      activeName: "first",
      caseInfo: null,
      MdDisputelist: null,
      MdSchemelist: null,
      agentList: null,
      legalList: null,
      otherList: null,
      agentallList: null,
      editAdressShow: false,
      form: Object.assign({}, defaultForm),
      title: null,
      provincesList: null,
      code: null,
      cityList: null,
      eartList: null,
      streetList:null,
      caseAddressCode: null,
      orgList:[],
      agentImgData:{},
      agentInfo:{}
    };
  },
  mounted() {
    //初始化
    this.configqueryAgent();
    this.mediateDetail();
    this.getOtherData();
    this.mediatequeryconfigqueryMdDispute();
    this.mediatequeryconfigqueryMdScheme();
    this.queryLegal();
  },
  methods: {
    //获取调解机构
    getOrgList(item){
      let params = Object.assign({},item)
      usableList(params).then((res) => {
        if (res.code === 200) {
          this.orgList = res.data;
        }
      });
    },
    //查询工单详情接口
    mediateDetail() {
      let params = {
        id: this.$route.params.id,
      };
      mediateDetail(params).then(res => {
        if (res.code === 200) {
          let params = {
            productId:res.data.productId,
            creditorsId:res.data.creditorsId,
            orgId:res.data.disposeOrganizeId,
          }
          this.getOrgList(params)
          res.data.caseInfo = JSON.parse(res.data.caseInfo);
          res.data.caseInfo.push({});
          this.caseInfo = res.data;
          this.$nextTick(() => {
            this.$refs.documentmaterials.value = this.caseInfo.mediateId;
            this.$refs.documentmaterials.type = this.caseInfo.repayType;
            this.$refs.dispute.value = this.caseInfo.disputeId;
            this.$refs.documentmaterials.value1 = this.caseInfo.repayTotalMoney
            this.$refs.documentmaterials.value2 = this.caseInfo.repayPeriods
            this.caseInfo.repayType === '0' ?this.$refs.documentmaterials.value4 = this.caseInfo.repayTime : this.$refs.documentmaterials.value3 = this.caseInfo.repayTime
            
          });
        }
      });
    },
    //获取用户其它资料信息
    getOtherData() {
      let params = {
        caseUserId: this.$route.params.caseUserId,
      };
      getOtherData(params).then(res => {
        if (res.code === 200) {
          this.otherList = res.data;
        }
      });
    },
    //获取纠纷模板
    mediatequeryconfigqueryMdDispute() {
      mediatequeryconfigqueryMdDispute().then(res => {
        if (res.code === 200) {
          this.MdDisputelist = res.data;
        }
      });
    },
    //获取调解模板
    mediatequeryconfigqueryMdScheme() {
      mediatequeryconfigqueryMdScheme().then(res => {
        if (res.code === 200) {
          this.MdSchemelist = res.data;
        }
      });
    },
    //获取代理人列表
    configqueryAgent() {
      let params = {
        creditorsId: this.$route.params.creditorsId,
      };
      configqueryAgent(params).then(res => {
        if (res.code === 200) {
          this.agentallList = res.data;
          this.handleChange(res.data[0])
        }
      });
    },
    //获取法人列表
    queryLegal() {
      let params = {
        creditorsId: this.$route.params.creditorsId,
      };
      queryLegal(params).then(res => {
        if (res.code === 200) {
          this.legalList = res.data.otherUrl === null ? [] : JSON.parse(res.data.otherUrl);
        }
      });
    },
    //切换
    handleChange(item) {
      this.agentList = item.otherUrl === null ? [] : JSON.parse(item.otherUrl);
      this.agentInfo = item
      this.agentImgData = {
        back:item.agentCardBackUrl,
        front:item.agentCardFrontUrl
      }
    },
    //调解申请
    handleeditOk(params) {
      this.$refs.dispute.handleeditOk()
      this.$refs.documentmaterials.handleeditOk()
      this.$refs.evidence.handleGet()
      let paramst = Object.assign({}, params);
      paramst["caseAddressCode"] = this.caseAddressCode;
      paramst["caseArea"] = this.caseInfo.caseArea;
      paramst["caseCity"] = this.caseInfo.caseCity;
      paramst["caseProvince"] = this.caseInfo.caseProvince;
      paramst["caseAddressDetail"] = this.caseInfo.caseAddressDetail;
      paramst["casePhone"] = this.caseInfo.casePhone;
      paramst["id"] = this.caseInfo.id;
      paramst['caseUserId'] = this.$route.params.caseUserId
      paramst["mediateMsg"] = this.$refs.documentmaterials.content;
      paramst["disputeMsgText"] = this.$refs.dispute.contentText;
      paramst["disputeMsg"] = this.$refs.dispute.content;
      paramst["mediateMsgText"] = this.$refs.documentmaterials.contentText;
      paramst["repayType"] =this.$refs.documentmaterials.type;
      paramst["mediateId"] = this.$refs.documentmaterials.value;
      // paramst["legalByOther"] = this.$refs.evidence.legalData;
      // paramst["agentByOther"] = this.$refs.evidence.agentData;
      // paramst["debtorOther"] = this.$refs.evidence.applyData;
      // paramst["other"] = this.$refs.evidence.otherData;
      updateMediateDeta(paramst).then(res=>{
        if(res.code === 200){
          this.$message.success(res.msg)
        }
      })

    },
    //修改地址
    handleEditAdress(item) {
      this.title = item;
      this.editAdressShow = true;
      if (item === "修改地址") {
        this.getProvinces();
      }
    },
    //获取省
    getProvinces() {
      getProvinces().then(res => {
        if (res.code === 200) {
          this.provincesList = res.data;
        }
      });
    },
    //获取市区
    getCityList(itme, type) {
      let params = {
        pid: itme,
      };
      getCityList(params).then(res => {
        if (res.code === 200) {
         if(type === 0){
            this.cityList = res.data
          }else if(type === 1){
            this.eartList = res.data
          }else{
            this.streetList = res.data
            res.data.length === 0 ?  this.caseInfo.caseStreet = null : this.streetList = res.data
          }
        }
      });
    },

    //切换
    handlegetpv(item, type) {
      this.code = item.id;
      console.log(item.id)
      switch (type) {
        case 0:
          this.activeName = "second";
          this.caseInfo.caseProvince = item.name;
          this.getCityList(item.id, type);
          break;
        case 1:
          this.activeName = "third";
          this.caseInfo.caseCity = item.name;
          this.getCityList(item.id, type);
          break;
        case 2:
          this.activeName = "fourth";
          this.caseInfo.caseArea = item.name;
          this.caseAddressCode = item.code;
          this.getCityList(item.id, type);
          break;
        default:
          this.caseInfo.caseStreet = item.name;
          this.caseAddressCode = item.code;
          break;
      }
    },
    //确认
    handleOk() {
      let params = {}
      if (this.title === "修改地址") {
        params["caseAddressCode"] = this.caseAddressCode;
        params["caseArea"] = this.caseInfo.caseArea;
        params["caseCity"] = this.caseInfo.caseCity;
        params["caseStreet"] = this.caseInfo.caseStreet
        params["caseProvince"] = this.caseInfo.caseProvince;     
        this.activeName = "first";
      } else if ("修改详细地址") {
        this.caseInfo.caseAddressDetail = this.form.caseAddressDetail;
        params["caseAddressDetail"] = this.caseInfo.caseAddressDetail;
      } else {
        this.caseInfo.casePhone = this.form.phone;
        params["casePhone"] = this.caseInfo.casePhone;
      }
      params["id"] = this.caseInfo.id;
      updateMediateDetailCaseMsg(params).then(res=>{
        if(res.code === 200){
          this.$message.success(res.msg)
          this.editAdressShow = false;
        }
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.base_warp {
  width: 100%;
  display: flex;
  justify-content:space-between;
  align-items: flex-start;
  h4 {
    width: 20%;
  }
  .info_warp {
    width: 47%;
    margin-right: 20px;
    .info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      h4 {
        width: 40%;
      }
    }
  }
}
.line {
  width: 100%;
  height: 1px;
  margin: 40px 0;
  background: #d2d2d2;
}
.adress_text {
  display: inline-block;
  width: 300px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-top: 5px;
}
.adress {
  width: 100%;
  height: 100%;
  margin-left: 50px;
  border: none;
  .title_warp {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    .title {
      width: 13%;
      text-align: center;
      cursor: pointer;
    }
    .title_active {
      color: #fff;
      border-radius: 4px;
      background: #409eff;
      border: 1px solid #409eff;
    }
  }
}
.position_are{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
