<template>
  <div class="app-container message-container">
    <div class="message-warp">
      <div class="style-container">
        <template v-for="(item, index) in lableData">
          <div
            class="item_warp"
            :key="index"
            @click="handlestatusClick(item.title)"
          >
            <div class="img_warp">
              <svg-icon :icon-class="item.icon" />
            </div>
            <div class="title_warp">{{ item.title }}</div>
          </div>
        </template>
      </div>
      <form-comment
        @queryMyOrgMdOrder="queryMyOrgMdOrder"
        :selectdata="data"
        ref="formInline"
      />
      <table-comment
        @queryMyOrgMdOrder="queryMyOrgMdOrder"
        :tableData="tableData"
        :searchParams="searchParams"
        :selectParams="selectParams"
        ref="table"
      />
      <!-- 批量导入 -->
      <el-dialog title="批量导入" :visible.sync="uploadShow" width="20%">
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          style="padding: 20px"
          label-width="120"
        >
          <el-form-item label="工单:">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="/mediateCenter/mediate/list/updateODR"
              :on-success="uploadsuccess"
              :multiple="true"
              :headers="tokens"
              :data="form"
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
      <!-- 导出结果 -->
      <el-dialog title="导出结果" :visible.sync="resultShow" width="20%">
        <div class="result_warp">
          <p>成功解析案件：<span>{{resultData.matchingSuccess}}</span></p>
          <p>成功匹配工单：<span>{{resultData.resolveSuccess}}</span></p>
          <p>成功更新工单：<span>{{resultData.updateSuccess}}</span></p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resultShow = false">取 消</el-button>
          <el-button type="primary" @click="resultShow = false"
            >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import FormComment from "./components/form.vue";
import TableComment from "./components/table.vue";
import {queryCreditorList} from "@/api/mediateobsettings"
import { queryMyOrgMdOrder } from "@/api/mediationorders";
import { selectList } from "@/api/comment";
import { exportMethod} from "@/utils/export"
import { getToken } from "@/utils/auth";
const token = getToken();
export default {
  name: "mediationorders",
  components: {
    FormComment,
    TableComment,
  },
  data() {
    return {
      form:{
        type:101
      },
      resultShow: false,
      rules: {
        orgId: [
          { required: true, message: "请选择入职机构", trigger: "change" },
        ],
      },
      fileList: [],
      uploadShow: false,
      tokens: {
        Authorization: token,
      },
      tableData: [],
      searchParams: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      data: {
        medorgList: [],
        orgList: [], //处置机构
        creditorList:[],//债权方
      },
      selectParams: {},
      resultData: {
        matchingSuccess:null,
        resolveSuccess:null,
        updateSuccess:null,
      },
      lableData: [
        // {
        //   title: "下载导入模板",
        //   icon: "download",
        // },
        {
          title: "工单同步",
          icon: "export",
        },
      ],
    };
  },

  mounted() {
    //初始化下拉框
    this.getSelect();
    this.queryMyOrgMdOrder();
  },
  methods: {
    //操作
    handlestatusClick(item) {
      switch (item) {
        case "下载导入模板":
          let url = 'https://da-assets-public.oss-cn-hangzhou.aliyuncs.com/mediate/template/'
          exportMethod(url)
          break;
        case "批量导入":
          this.AlldelUser();
          break;
        default:
          break;
      }
    },
    //导入成功
    uploadsuccess(){
      this.$message(res.msg)
      this.resultData = Object.assign({},res.data) 
      this.resultShow = true
    },
    //批量导入操作
    AlldelUser() {
      this.uploadShow = true;
      this.fileList = [];
    },
    //检查导入
    uploadUser() {
      this.$refs.upload.submit();
      this.uploadShow = false;
    },
    //获取下拉框
    getSelect() {
      let params = {
        codes:
          "DUTY_ORG_LIST,MEDIATE_ORG_LIST",
      };
      selectList(params).then((res) => {
        if (res.code === 200) {
          this.data.orgList = res.data.DUTY_ORG_LIST;
          this.data.medorgList = res.data.MEDIATE_ORG_LIST;
        }
      });
      queryCreditorList().then(res=>{
        this.data.creditorList = res.data
      })
    },
    //获取调解工单列表
    queryMyOrgMdOrder() {
      let params = Object.assign({}, this.$refs.formInline.formInline);
      params["page"] = this.searchParams.page;
      params["pageSize"] = this.searchParams.pageSize;
      this.selectParams = Object.assign({}, params);
      if (this.$refs.table.commandType === 2) {
        this.$refs.table.handleparams = {
          caseSearchParam: Object.assign({}, params),
          operateType: 2,
        };
      }
      queryMyOrgMdOrder(params).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data;
          (this.searchParams["page"] = res.page),
            (this.searchParams["total"] = res.total);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.style-container {
  border: none;
  margin: 0;
  box-shadow: 0px 0px 0px 0px rgb(0 0 0);
}
.result_warp{
  span{
    display: inline-block;
    margin-left: 5px;
    color: #0099FF;
  }
}
</style>
