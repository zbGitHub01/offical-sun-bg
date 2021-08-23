<template>
  <div>
    <div class="style-container">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{handleparams.operateType===1?'对选中项操作' : '对查询结果操作'}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="searchnum">对查询结果操作</el-dropdown-item>
          <el-dropdown-item :command="selectnum">对选中项操作</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <template v-for="(item,index) in lableData">
        <div
        class="item_warp"
        :key="index"
        @click="handleClick(item.title)">
        <div class="img_warp">
          <svg-icon style="width:20px;height:20px" :icon-class="item.icon" />
        </div>
        <div class="title_warp">{{item.title}}</div>
      </div>
      </template>
    </div>
    <div class="slecect-style">
      <span>选中项：{{selectData.length}}</span>
      <el-button class="cancal" type="text" @click="toggleSelection()">取消</el-button>
    </div>
    <div class="style-container style">
      <el-table
        ref="multipleTable"
        :data="tableData"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column type="selection" fixed align="center" width="55"></el-table-column>
        <el-table-column property="caseNo" fixed align="center" label="邀约工单号" width="230">
          <template slot-scope="scope">
            <div>
              <status :row='scope.row' />
            </div>
          </template>
        </el-table-column>
        <template v-for="(item,index) in tableHead">
          <div :key="index">
            <el-table-column
              v-if="item.type===0"
              :property="item.key"
              :label="item.title"
              :width="item.width  "
              align="center"
            />
            <el-table-column
              v-if="item.type === 1"
              :property="item.key"
              :label="item.title"
              width="150"
              fixed="right"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{scope.row.repayType === '0' ? '全额还款' : '分期还款'}}</span>
              </template>
            </el-table-column>
             <el-table-column
              v-if="item.type===3"
              :property="item.key"
              :label="item.title"
              width="150"
              fixed="right"
              align="center"
            />
               <el-table-column
              v-if="item.type === 4"
              :property="item.key"
              :label="item.title"
              width="150"
              fixed="right"
              align="center"
            >
              <template slot-scope="scope">
                <el-tooltip
                  effect="dark"
                  placement="left-start"
                >
                    <div slot="content" style="width:300px">{{scope.row.disputeMsgText}}</div>
                  <div class="shengnue">
                    {{ scope.row.disputeMsgText }}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              v-if="item.type === 5"
              :property="item.key"
              :label="item.title"
              width="150"
              fixed="right"
              align="center"
            >
              <template slot-scope="scope">
                <el-tooltip
                  effect="dark"
                  placement="left-start"
                >
                 <div slot="content" style="width:300px">{{scope.row.mediateMsgText}}</div>
                  <div class="shengnue">
                    {{ scope.row.mediateMsgText }}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
          </div>
        </template>
      </el-table>
      <pagination
        :total="searchParams.total"
        :page.sync="searchParams.page"
        :limit.sync="searchParams.pageSize"
        @pagination="allOrderList"
      />
    </div>
    <el-dialog
      title="导出工单"
      :visible.sync="exportShow"
      width="50%"
      :destroy-on-close="true"
    >
        <export-comment  :titleData='exportData'  ref="export"></export-comment>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancalClick">取 消</el-button>
        <el-button type="primary" @click="handlerexportOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import ExportComment from "@/components/PerExport/index";
import Status from "@/components/mediatestatus"
import { exportTitle , exportOrder} from "@/api/mediationorders"
import { exportMethod } from "@/utils/export";
export default {
  components: { Pagination,Status  , ExportComment },
  props: ["tableData", "searchParams", "selectParams", "labelList"],
  data() {
    return {
      selectData: [], //选中的数据
      exportShow: false,
      searchnum: 2, //搜索查询
      selectnum: 1, //选择项查询,
      handleparams:{
          caseIdList: [],
          operateType: 1
      },
      // 表头数据
      tableHead: [
        {
          key: "createTime",
          title: "创建时间",
          width: 180,
          type: 0
        },
        {
          key: "disposeOrganize",
          title: "处置机构",
          width: 250,
          type: 0
        },
        {
          key: "creditorsName",
          title: "债权方",
          width: 260,
          type: 0
        },
         {
          key: "inviteesName",
          title: "邀约员/CPE",
          width: 150,
          type: 0
        },
        {
          key: "createByName",
          title: "邀约发起人",
          width: 150,
          type: 0
        },
        {
          key: "disputeNumber",
          title: "纠纷编号",
          width: 200,
          type: 0
        },
        {
          key: "caseUserName",
          title: "被申请人",
          width: 180,
          type: 0
        },
        {
          key: "agentByName",
          title: "申请人代理人",
          width: 200,
          type: 0
        },
         {
          key: "mediateStatusText",
          title: "调解状态",
          width: 150,
          type: 3
        },
        {
          key: "disputeMsgText",
          title: "纠纷描述",
          width: 200,
          type: 4,
        },
        {
          key: "mediateMsgText",
          title: "调解方案",
          width: 200,
          type: 5,
        },
        {
          key: "mediateCenterName",
          title: "调解机构",
          width: 200,
          type: 0
        },
        {
          key: "mediator",
          title: "调解员",
          width: 200,
          type: 0
        },
        
        {
          key: "repayTypeText",
          title: "还款方式",
          width: 200,
          type: 0
        },
        {
          key: "repayStatus",
          title: "还款状态",
          width: 150,
          type: 0
        },
       
        {
          key: "updateTime",
          title: "更新时间",
          width: 200,
          type: 0
        },
        {
          key: "updateBy",
          title: "更新人",
          width: 150,
          type: 0
        },
      ],
      lableData: [
        {
          title: "工单导出",
          icon: "export",
        },
      ],
      commandType:1,
      exportData:[]
    };
  },
  methods: {
    //分页刷新页面
    allOrderList() {
     let that = this
      setTimeout(function(){ that.$emit("allOrderList") },1000);
      this.handleparams={
        caseIdList:[],
        operateType: 1
      },
      this.selectData= []
    },
    //表格选择
    handleSelectionChange(val) {
      let arr = []
      val.map(item=>{
        arr.push(item.caseId)
      })
      this.selectData = arr;
       this.handleparams = {
        caseIdList: this.selectData,
        operateType: 1
      };
    },
    //取消选择
    toggleSelection(rows) {
      this.selectData = [];
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //选择项操作
    handleCommand(command) {
      this.commandType = command
      if (command === 1) {
        this.handleparams = {
          caseIdList: this.selectData,
          operateType: command
        };
      } else {
        this.handleparams = {
          caseSearchParam: Object.assign({}, this.selectParams),
          operateType: command
        };
      }
    },
    //通过此函数整体过滤事件
    handleClick(item) {
      if ( this.selectData.length === 0 && this.handleparams.operateType===1) {
        this.$message.warning("请先选择操作对象!");
      } else {
        switch (item) {
          case "工单导出":
            this.exportModel();
            break;
          default:
            break;
        }
      }
    },
    //导出确认
    handlerexportOk(){
      let params = Object.assign({},this.handleparams)
      params['fieldsArr'] = this.$refs.export.checketitle
      exportOrder(params).then(res=>{
        if(res.code === 200){
          this.exportShow = false;
          this.$message.success(res.msg)
          this.allOrderList()
          exportMethod(res.data.url)
        }
      })
    },
     //导出弹窗
    exportModel() {
      exportTitle().then(res=>{
        if(res.code===0){
          this.exportShow = true;
          this.exportData = res.data.fieldArr
        }
      })
    },
    //导出取消
    cancalClick(){
      this.exportShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.shengnue {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>