<template>
  <div class="evidence">
    <div
      class="evidence_warp"
      v-for="(item, index) in evidenceData"
      :key="index"
    >
      <div class="evidence_title">
        <p>{{ item.value }}</p>
        <!-- <el-button plain>下载</el-button> -->
      </div>
      <div class="info_warp" v-for="(val, indexs) in item.list" :key="indexs">
        <span @click="handleWatch(val)">{{ val.name }}</span>
        <span
          v-if="val.type === 1"
          class="g-right"
          @click="handdle($event, index, indexs)"
        ></span>
      </div>
      <el-button
        v-if="$route.params.mediateStatus < 4"
        icon="el-icon-circle-plus-outline"
        type="text"
        @click="handleAdd(index)"
        >添加材料</el-button
      >
    </div>
    <!-- 证据材料 -->
    <el-dialog
      title="证据材料"
      :destroy-on-close="true"
      :visible.sync="evidenceShow"
      width="30%"
    >
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        border
        style="width: 100%"
        ref="tb"
      >
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="name" label="文档名"> </el-table-column>
        <el-table-column prop="path" width="100" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleSee(scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancal">取 消</el-button>
        <el-button type="primary" @click="handlerOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看大图 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import { exportMethod } from "@/utils/export";
import { updateMediateDetailCaseMsg } from "@/api/mediatedetail";
export default {
  props: ["agentList", "legalList", "otherList", "caseInfo", "agentImgData"],
  data() {
    return {
      evidenceData: [
        {
          value: "申请人身份证明：",
          list: [
            {
              name: "营业执照",
              path: this.caseInfo.businessLicenseUrl,
              type: 0,
            },
            {
              name: "法人代表身份证正面",
              path: this.caseInfo.legalPersonCardFrontUrl,
              type: 0,
            },
            {
              name: "法人代表身份证反面",
              path: this.caseInfo.legalPersonCardBackUrl,
              type: 0,
            },
            {
              name: "法人代表身份证明",
              path: this.caseInfo.legalCardProveUrl,
              type: 0,
            },
          ],
        },
        {
          value: "申请人代理人身份证明：",
          list: [
            {
              name: "代理人身份证正面",
              path: this.agentImgData.front,
              type: 0,
            },
            {
              name: "代理人身份证反面",
              path: this.agentImgData.back,
              type: 0,
            },
            // {
            //   name: "委托授权书.png",
            //   path:this.caseInfo.agentEntrustAuthorizationUrl,
            //   type:0,
            // },
          ],
        },
        {
          value: "被申请人身份证明：",
          list: [
            {
              name: "欠款人身份证正面",
              path: this.caseInfo.debtorCardFrontUrl,
              type: 1,
            },
            {
              name: "欠款人人身份证反面",
              path: this.caseInfo.debtorCardBackUrl,
              type: 1,
            },
          ],
        },
        {
          value: "证据材料：",
          list: [],
        },
      ],
      evidenceShow: false,
      fileList: [],
      tableData: [],
      index: null,
      selectData: [],
      agentData: [],
      legalData: [],
      applyData: [],
      otherData: [],
      dialogVisible: false,
      dialogImageUrl: null,
      imgData: ["bmp", "jpg", "png", "gif", "jpeg"],
    };
  },
  watch: {
    caseInfo: {
      handler: function (val) {
        if (val.debtorCardFrontUrl === null && val.debtorCardBackUrl === null) {
          this.evidenceData[2].list = [];
        } else if (val.debtorCardFrontUrl === null) {
          this.evidenceData[2].list.splice(0, 1);
        } else if (val.debtorCardBackUrl === null) {
          this.evidenceData[2].list.splice(1, 1);
        }
        this.evidenceData[0].list = this.evidenceData[0].list.concat(this.caseInfo.legalByOther === null ? [] :JSON.parse(this.caseInfo.legalByOther));
        this.evidenceData[1].list = this.evidenceData[1].list.concat(this.caseInfo.agentByOther === null ? [] :JSON.parse(this.caseInfo.agentByOther));
        this.evidenceData[2].list = this.evidenceData[2].list.concat(this.caseInfo.debtorOther === null ? [] :JSON.parse(this.caseInfo.debtorOther));
        this.evidenceData[3].list = this.evidenceData[3].list.concat(this.caseInfo.other === null ? [] :JSON.parse(this.caseInfo.other));
      },
      immediate: true,
    },
  },
  methods: {
    //添加材料
    handleAdd(index) {
      this.index = index;
      this.evidenceShow = true;
      this.tableData = []
      switch (index) {
        case 0:
          this.tableData =this.legalList
          break;
        case 1:
          this.tableData = this.agentList
          break;
        default:
          this.tableData = this.otherList;
          break;
      }
    },
    //确认添加
    handlerOk() {
      let arr = this.evidenceData[this.index].list;
      this.selectData.forEach((item) => {
        arr.push(item);
      });
      this.evidenceData[this.index].list = arr;
      let arrt = []
      switch (this.index) {
        case 0:
          arrt = this.evidenceData[0].list.slice(4)
          break;
        case 1:
          arrt = this.evidenceData[1].list.slice(2)
          break;
        case 2:
          arrt = this.evidenceData[2].list.slice()
          break;
        case 3:
          arrt = this.evidenceData[3].list.slice()
          break;
        default:
          break;
      }
      this.updateMediateDetailCaseMsg(arrt, this.index);
    },

    //取消
    cancal() {
      this.evidenceShow = false;
    },
    //选中项操作
    handleSelectionChange(val) {
      val.map((item) => {
        item["type"] = 1;
      });
      this.selectData = val;
    },
    //查看
    handleSee(item) {
      window.open(item.path);
    },
    //删除
    handdle(e, index, indexs) {
      e.stopPropagation();
      window.event.returnValue = false;
      this.evidenceData[index].list.splice(indexs, 1);
      let arr = [];
      switch (index) {
        case 0:
          arr = this.evidenceData[0].list.slice(4)
          break;
        case 1:
          arr = this.evidenceData[1].list.slice(2)
          break;
        case 2:
          arr = this.evidenceData[2].list.slice()
          break;
        case 3:
          arr = this.evidenceData[3].list.slice()
          break;
        default:
          break;
      }
      this.updateMediateDetailCaseMsg(arr, index);
    },
    //取消选择
    toggleSelection() {
      this.selectData = [];
      this.$refs.tb.clearSelection();
    },
    //获取资料
    handleGet() {
      //代理人其他资料筛选
      this.agentData = this.evidenceData[0].list.slice(
        3,
        this.evidenceData[0].list.length
      );
      this.agentData.map((item) => {
        delete item["type"];
      });
      this.agentData = JSON.stringify(this.agentData);
      //法人其他资料筛选
      this.legalData = this.evidenceData[1].list.slice(
        3,
        this.evidenceData[1].list.length
      );
      this.legalData.map((item) => {
        delete item["type"];
      });
      this.legalData = JSON.stringify(this.legalData);
      //申请人身份证其他资料筛选
      this.applyData = this.evidenceData[2].list.slice(
        2,
        this.evidenceData[2].list.length
      );
      this.applyData.map((item) => {
        delete item["type"];
      });
      this.applyData = JSON.stringify(this.applyData);
      //其他资料筛选
      this.otherData = this.evidenceData[3].list;
      this.otherData.map((item) => {
        delete item["type"];
      });
      this.otherData = JSON.stringify(this.otherData);
    },
    //查看默认项
    handleWatch(item) {
      let url = item.path.split(".")[item.path.split(".").length - 1];
      if (this.imgData.includes(url)) {
        (this.dialogImageUrl = item.path), (this.dialogVisible = true);
      } else {
         window.open(item.path);
      }
    },
    //编辑资料
    updateMediateDetailCaseMsg(arr,index) {
       let params = {}
        switch(index){
          case 0:
            params={
              legalByOther:JSON.stringify(arr)
            }
            break;
          case 1:
            params={
              agentByOther:JSON.stringify(arr)
            }
            break;
          case 2:
            params={
              debtorOther:JSON.stringify(arr)
            }
            break;
          case 3:
            params={
              other:JSON.stringify(arr)
            }
            break;
          default:
            break;
        }
        params["id"] = this.caseInfo.id;
        updateMediateDetailCaseMsg(params).then(res=>{
          if(res.code === 200){
            this.$message.success(res.msg)
            this.toggleSelection();
            this.evidenceShow = false;
          }
        })
    },
  },
};
</script>
<style lang="scss" scoped>
.evidence {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .evidence_warp {
    width: 24%;
    .info_warp {
      cursor: pointer;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 13px;
      color: #333333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #dddddd;
      .g-right {
        display: inline-block;
        width: 12px;
        height: 2px;
        background: #999;
        line-height: 0;
        font-size: 0;
        vertical-align: middle;
        -webkit-transform: rotate(45deg);
      }
      .g-right:after {
        content: "/";
        display: block;
        width: 12px;
        height: 2px;
        background: #999;
        -webkit-transform: rotate(-90deg);
      }
    }
    .evidence_title {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      p {
        line-height: 1;
        color: #aaaaaa;
      }
    }
  }
}
</style>