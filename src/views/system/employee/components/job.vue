  <template>
  <div>
    <form-comment @getuser='getuser' ref="formInline"  :orgList='orgList' :roleList="roleList" />
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
      <template v-for="(item, index) in lableData">
        <div
        class="item_warp"
        :key="index"
        @click="handleClick(item.title)"
      >
        <div class="img_warp">
          <svg-icon style="width: 20px; height: 20px" :icon-class="item.icon" />
        </div>
        <div class="title_warp">{{ item.title }}</div>
      </div>
      </template>
    </div>
    <div class="slecect-style">
      <span>选中项：{{ selectData.length }}</span>
      <el-button class="cancal" type="text" @click="toggleSelection()"
        >取消</el-button
      >
    </div>
    <div class="style-container style">
      <el-table
        border
        @selection-change="handleSelectionChange"
        ref="multipleTable"
        :data="tableData"
      >
        <el-table-column
          type="selection"
          align="center"
          fixed="left"
          width="50"
        />
        <template v-for="(item, index) in tableHead">
          <div :key="index">
            <el-table-column
              :property="item.key"
              :label="item.title"
              align="center"
              :width="item.width"
            />
          </div>
        </template>
        <el-table-column
          property="enable"
          align="center"
          label="操作"
          fixed="right"
          width="250px"
        >
          <template slot-scope="scope">
            <el-button  type="text" @click="handleeditClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-if="scope.row.userStatusText === '已启用' "
              type="text"
              @click="handledel(scope.row, '停用')"
              >停用</el-button
            >
            <el-button
              v-if="scope.row.userStatusText === '已停用'"
              type="text"
              @click="handledel(scope.row, '启用')"
              >启用</el-button
            >
            <el-button
              v-if="scope.row.isDing === 1"
              type="text"
              @click="handledel(scope.row, '钉钉解绑')"
              >钉钉解绑</el-button
            >
            <el-button  type="text" @click="handledel(scope.row, '离职')"
              >离职</el-button
            >
            <el-button  type="text" @click="handledel(scope.row,'删除')"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="searchParams.total"
        :page.sync="searchParams.page"
        :limit.sync="searchParams.pageSize"
        @pagination="getuser"
      />
    </div>
    <!-- 编辑 -->
    <el-dialog
      :before-close="close"
      :title="title"
      :visible.sync="modalShow"
      width="40%"
    >
      <em-model
        @close="close"
        @getuser="getuser"
        :id="id"
        :roleList="roleList"
        :positionList='positionList'
        :orgList="orgList"
        :destroy-on-close="true"
        ref="emmodel"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancalClick">取 消</el-button>
        <el-button type="primary" @click="OkClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  userlist,
  userdelete,
  userpositionStatus,
  userstatus,
  usercaseNum,
  userinfo
} from "@/api/mediateuser";
import { unDingding } from "@/api/system";
import FormComment from "./form.vue";
import EmModel from "./editmodel.vue";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
export default {
  name: "job",
  props: [ "roleList" , "orgList" ,"positionList"],
  components: { FormComment, Pagination, EmModel },
  data() {
    return {
      selectData: [], //选中的数据
      searchnum: 2, //搜索查询
      selectnum: 1, //选择项查询
      modalShow: false,
      title: "",
      caseNum:'',
      id: "",
      searchParams: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      tableHead: [
        {
          key: "orgTitle",
          title: "调解机构",
          width: 200,
        },
        {
          key: "username",
          title: "姓名",
          width: 200,
        },
        {
          key: "postName",
          title: "职位",
          width: 150,
        },
        {
          key: "userPhone",
          title: "手机号",
          width: 200,
        },
        {
          key: "userStatusText",
          title: "账号状态",
          width: 150,
        },
        {
          key: "sexText",
          title: "性别",
          width: 150,
        },
        {
          key: "jobNumber",
          title: "工号",
          width: 150,
        },
        {
          key: "joinTime",
          title: "入职日期",
          width: 200,
        },
        {
          key: "roleName",
          title: "角色权限",
          width: 150,
        },
        {
          key: "dingName",
          title: "钉钉",
          width: 150,
        },
        {
          key: "createName",
          title: "录入人",
          width: 150,
        },
        {
          key: "createTime",
          title: "录入时间",
          width: 200,
        },
        {
          key: "updateName",
          title: "修改人",
          width: 150,
        },
        {
          key: "updateTime",
          title: "修改时间",
          width: 200,
        },
      ],
      lableData: [
        {
          title: "批量停用",
          icon: "stop",
        },
        {
          title: "批量启用",
          icon: "ref",
        },
        {
          title: "批量删除",
          icon: "dellabel",
        },
      ],
      // 表格数据
      tableData: [],
      selectParams: {},
      handleparams: {
        userIdList:[],
        operateType: 1,
      },
      commandType:1
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
  methods: {
   
    //表格选择
    handleSelectionChange(val) {
      let arr = []
      val.map(item=>{
        arr.push(item.userId)
      })
      this.selectData = arr;
       this.handleparams = {
        userIdList: this.selectData,
        operateType: 1
      };
    },
    //取消选择
    toggleSelection(rows) {
      this.selectData = [];
      if (rows) {
        rows.forEach((row) => {
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
          userIdList: this.selectData,
          operateType: command,
        };
      } else {
        this.handleparams = {
          sysOrgUserSearchParam: Object.assign({}, this.selectParams),
          operateType: command,
        };
      }
    },
    //操作事件通过此函数整体过滤事件
    handleClick(item) {
      this.title = item;
      if ( this.selectData.length === 0 && this.handleparams.operateType===1) {
        this.$message.warning("请先选择操作对象!");
      } else {
        this.$confirm(`是否确认${item}？`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            switch (item) {
              case "批量停用":
                this.enableUser(0);
                break;
              case "批量启用":
                this.enableUser(1);
                break;
              case "批量删除":
                this.AlldelUser();
                break;
              default:
                break;
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    //编辑
    handleeditClick(item){
      this.modalShow=true
      let params = {
        userId: item.userId,
      };
      userinfo(params).then((res) => {
          if (res.code === 200) {
            let {mail, avatar,dingName ,orgId, userId,departmentId ,postId , idBack , idFront , idNumber , jobNumber , joinTime , roleId , sex , username ,userPhone} = res.data
            orgId === null ? this.$refs.emmodel.disabled = true : orgId === ""?this.$refs.emmodel.disabled = true:this.$refs.emmodel.disabled = false
            this.$refs.emmodel.form = {
              mail:mail,
              orgId:orgId,
              dingName:dingName,
              avatar: avatar,
              idBack: idBack,
              idFront: idFront,
              idNumber: idNumber,
              jobNumber: jobNumber,
              joinTime: joinTime,
              roleId: roleId,
              sex: sex,
              userPhone: userPhone,
              username: username,
              userId:userId,
              state:0
            };
          }
        });
    },
    //添加
    add(){
       this.modalShow=true 
    },
    //批量停用/启用
    enableUser(item) {
      let params = Object.assign({},this.handleparams)
      params['userStatus'] = item
      userstatus(params).then((res) => {
        if(res.code===200){
          this.$message.success(res.msg)
          this.getuser()
        }
      });
    },
    //批量删除
    AlldelUser() {
      let params = Object.assign({},this.handleparams)
      userdelete(params).then((res) => {
        if(res.code===200){
          this.$message.success(res.msg)
          this.getuser()
        }
      });
    },
    // 确认删除弹窗
    open(val, title) {
      this.$confirm(`是否确认${title}该员工账号？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          switch (title) {
            case "删除":
              this.delUser(val);
              break;
            case "启用":
              this.stopUser(val, title);
              break;
            case "停用":
              this.stopUser(val, title);
              break;
            case "离职":
              this.leaveUser(val, title);
              break;
            default:
              this.unDingding(val);
          }
        })
    },
    //删除员工
    delUser(val) {
      let arr = []
      arr.push( val.userId)
      let params = {
        userIdList:arr,
        operateType:1
      };
    userdelete(params).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.msg,
          });
          this.getuser();
        }
      });
    },
    //停用/启用员工
    stopUser(val, title) {
      let arr = []
      arr.push( val.userId)
      let params = {
        userIdList: arr,
        userStatus: "",
        operateType:1
      };
      params.userStatus = title === "启用" ? 1 : 0;
    userstatus(params).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message:res.msg,
          });
          this.getuser();
        } 
      });
    },
    //员工离职
    leaveUser(val) {
      let params = {
        userId: val.userId,
        userStatus: val.userStatus,
        positionStatus: 0,
      };
      userpositionStatus(params).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "离职成功!",
          });
          this.stopShow=false
          this.getuser();
        } 
      });
    },
    //钉钉解绑
    unDingding() {
      let params = {
        userId: val.userId,
        userStatus: val.userStatus,
        positionStatus: 0,
      };
      unDingding(params).then((res) => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "离职成功!",
          });
          this.getuser();
        } else {
          this.$message({
            type: "error",
            message: res.msg,
          });
        }
      });
    },
    //获取员工列表
    getuser() {
      let params = Object.assign({}, this.$refs.formInline.formInline);
      params["page"] = this.searchParams.page;
      params["pageSize"] = this.searchParams.pageSize;
      params["positionStatus"] = 1;
      this.selectParams = Object.assign({}, params);
      if(this.commandType===2){
        this.handleparams = {
          sysOrgUserSearchParam: Object.assign({},  params),
          operateType: 2
        }
      }
      userlist(params).then((res) => {
        if (res.code === 200) {
          this.tableData = res.data.data;
          this.searchParams["page"] = res.data.page;
          this.searchParams["total"] = res.data.total;
        }
      });
    },
    //取消
    cancalClick() {
      this.modalShow = false;
      this.$refs.emmodel.hanclear();
    },
    //确认
    OkClick() {
      this.$refs.emmodel.handlerOk();
      // this.modalShow=false
    },
    // 删除操作
    handledel(val, title) {
      this.open(val, title);
    },
    //关闭回调
    close() {
      //console.log("3746587346");
      this.modalShow = false;
      this.$refs.emmodel.hanclear();
    },
  },
};
</script>

<style lang="scss" >
.dis_warp{
  .el-dialog__body{
  padding: 30px 20px;
}
}
.el-icon-plus {
  margin-right: 5px;
}
</style>
