<template>
  <div class="app-container message-container">
    <div class="message-warp">
      <div class="style-container">
        <template v-for="(item,index) in lableData">
        <div
          class="item_warp"
          :key="index"
          @click="handlestatusClick(item.title)"
        >
          <div class="img_warp">
            <svg-icon :icon-class="item.icon" />
          </div>
          <div class="title_warp">{{item.title}}</div>
        </div>
        </template>
        
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="在职员工" name="first">
          <job ref="job" :option="option"  :positionList='positionList' :orgList="orgList" :roleList="roleList" />
        </el-tab-pane>
        <el-tab-pane label="离职员工" name="second">
          <leave ref="leave" :orgList="orgList" />
        </el-tab-pane>
      </el-tabs>
    </div>
     <!-- 批量导入 -->
    <el-dialog title="批量导入" :visible.sync="uploadShow" width="20%">
      <el-form ref="form" :model="form" :rules="rules" style="padding:20px"  label-width="120"> 
         <el-form-item label="入职机构:"  prop="orgId">
            <el-select  clearable  v-model="form.orgId" filterable  placeholder="请选择入职机构">
              <el-option
                v-for="item in orgList "
                :key="item.itemId"
                :label="item.itemText"
                :value="item.itemId"
              ></el-option>
            </el-select>
          </el-form-item>
         <el-form-item label="员工名录:" >
          <el-upload
            ref="upload"
            class="upload-demo"
            action="/mediateCenter/mediate/users/importCheck"
            :on-success = 'uploadsuccess'
            :multiple="true"
            :headers="tokens"
            :data = form
            :auto-upload="false"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">选择</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadShow = false">取 消</el-button>
        <el-button type="primary" @click="uploadUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 导入结果 -->
    <el-dialog title="导入结果" :visible.sync="successShow" style="padding:20px" width="20%">
        <div class="warning_warp">
        <svg-icon icon-class="success" style="font-size:40px" />
        <div>
          导入完成！
          <p >成功<span class="success">{{success}}</span>条数据 </p>
          <p >失败<span class="fail">{{fail}}</span>条数据 </p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="downloadFile">导出失败记录</el-button>
        <el-button type="primary" @click="successShow = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="Show" style="padding:20px" width="25%">
       <div class="warning_warp">
        <svg-icon icon-class="backwarning" style="font-size:40px" />
        <div>
          信息重复，是否继续创建？
          <p>{{tipsData.phoneErrorReason}}</p>
          <p>{{tipsData.idnoErrorReason}}</p>
          <p>{{tipsData.caseUserErrorReason}}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="skip">跳过</el-button>
          <el-button type="primary" @click="laststep">继 续</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { rolenopage } from "@/api/system";
import { selectList, gettextnum } from "@/api/comment";
import job from "./components/job.vue";
import leave from "./components/leave.vue";
import { getToken } from "@/utils/auth";
import { importCheck } from "@/api/mediateuser"
import { mapGetters } from "vuex";
var _ = require('lodash');
const token = getToken();
const defaultForm = {
  orgId: "",
};
export default {
  name: "orgemployee",
  components: {
    job,
    leave,
  },
  computed: {
    ...mapGetters(["productId"])
  },
  data() {
    return {
      activeName: "first",
      uploadShow: false,
      Show: false,
      successShow:false,
      option: [],
      roleList: [],
      positionList: [],
      orgList: [],
      fileList: [],
      tokens: {
        Authorization: token,
      },
      fail: 0,
      success: 0,
      form: Object.assign({}, defaultForm),
      rules: {
        orgId: [
          { required: true, message: "请选择入职机构", trigger: "change" },
        ],
      },
      lableData: [
        {
          title: "下载导入模板",
          icon: "download",
        },
        {
          title: "新增",
          icon: "add",
        },
        {
          title: "批量导入",
          icon: "export",
        },
      ],
      tipsData:"",
      type:0,
      info:[],
      uuid:"",
      downloadurl:"",
      errdata:[]
    };
  },

  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  mounted() {
    //初始化下拉框
    this.getSelect();
    this.$refs.job.getuser();
  },
  methods: {
    //tab切换
    handleClick(tab) {
      if (tab.name === "first") {
        this.$refs.job.getuser();
      } else {
        this.$refs.leave.getuser();
      }
    },
    //获取下拉框
    getSelect() {
      let paramst = {
        sysProductUuid: '0c933f65cf33310bb896e782c0861468454f8b17',
      };
      rolenopage(paramst).then((res) => {
        if (res.code === 200) {
          this.roleList = res.data;
        }
      });
      let params = {
        codes: "MEDIATE_ORG_LIST,ORG_POSITON_OPTION",
      };
      selectList(params).then((res) => {
        if (res.code === 200) {
          this.orgList = res.data.MEDIATE_ORG_LIST;
          this.positionList = res.data.ORG_POSITON_OPTION;
        }
      });
    },
    //操作
    handlestatusClick(item) {
      switch (item) {
        case "下载导入模板":
          this.download();
          break;
        case "新增":
          this.add();
          break;
        case "批量导入":
          this.AlldelUser();
          break;
        default:
          break;
      }
    },
    //增加
    add() {
      this.$refs.job.add();
    },
    //下载导入模板
    download() {
      let params = {
        codes: "EMPLOYEE_IMPORT_TEMPLATE",
      };
      gettextnum(params).then((res) => {
        if (res.code === 200) {
          let path = res.data.EMPLOYEE_IMPORT_TEMPLATE.replace(
            /^http:/,
            "https:"
          );
          let url = path;
          let a = document.createElement("a");
          a.href = url;
          a.download = "导入模板";
          a.click();
        }
      });
    },
    //批量导入操作
    AlldelUser() {
      this.uploadShow = true;
      this.$refs.form.resetFields();
      this.fileList = []
      
    },
    //检查导入
    uploadUser() {
      this.$refs.upload.submit();
      this.uploadShow = false  ;
    },
    //文件上传成功
    uploadsuccess(fileList) {
      this.info = fileList.data.sysOrgUserBatchVOList
      this.uuid = fileList.data.uuid
      let arr = []
      fileList.data.sysOrgUserBatchVOList.map(item=>{
        if(item.isFail === 1){
          arr.push(item)
          this.Show = true
        }
      })
      if(arr.length === 0){
        this.importCheck()
      }else{
        this.errdata = arr
        this.info = fileList.data.sysOrgUserBatchVOList
        _.pullAllWith(this.info, arr, _.isEqual);
        this.tipsData = this.errdata[this.type]
      }
    },
    //跳过
    skip(){
      if(this.type+1 === this.errdata.length){
        this.errdata[this.type]['isCreate'] = 0
        this.importCheck()
      }else {
        this.errdata[this.type]['isCreate'] = 0
        this.type +=1
        this.tipsData = this.errdata[this.type]
      }
    },
    //继续
    laststep(){
      if(this.type+1 === this.errdata.length){
        this.errdata[this.type]['isCreate'] = 1
        this.importCheck()
      }else {
        this.errdata[this.type]['isCreate'] = 1
        this.type +=1
        this.tipsData = this.errdata[this.type]
      }
    },
    //请求校验
    importCheck(){
      let params = {
          sysOrgUserBatchCheckResultList:this.info.concat( this.errdata),
          uuid:this.uuid
        }
        importCheck(params).then(res=>{
          if(res.code===200){
            this.Show = false
            this.downloadurl = res.data.downloadAddress
            this.fail =res.data.failCount
            this.success =res.data.successCount	
            this.successShow = true
          }
        })
    },
     //下载模板
    downloadFile() {
        this.downloadurl = this.downloadurl.replace(/^http:/, "https:");
        let url = this.downloadurl;
        let a = document.createElement("a");
        a.href = url;
        a.download = '导入失败数据';
        a.click();
        this.successShow=false
      },
    },
};
</script>

<style lang="scss"  scoped>
.style-container{
  border: none;
  margin: 0;
  box-shadow:0px 0px 0px 0px rgb(0 0 0)
}
.warning_warp {
  display: flex;
  padding: 20px;
  div {
    font-size: 16px;
    display: inline-block;
    padding: 10px;
    margin-left: 10px;
    span{
      display: inline-block;
      margin: 0 5px;
      font-size: 20px;
    }
    .fail{
      color: red;
    }
    .success{
      color: green;
    }
  }
}
</style>
