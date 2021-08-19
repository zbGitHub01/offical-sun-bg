<template>
  <div>
    <form-comment @getuser='getuser' ref="formInline" :orgList="orgList"  />
    <el-table style="width: 100%;margin-top:20px" border :data="tableData">
      <el-table-column
        
        v-for="(item,index) in tableHead"
        :key="index"
        :property="item.key"
        :label="item.title"
        align="center"
        :width="item.width"
      />
      <el-table-column property="enable" align="center" label="操作" fixed="right" width="250px">
        <template slot-scope="scope">
          <el-button type="text" @click="handledel(scope.row,'恢复')">恢复</el-button>
          <el-button type="text" @click="handledel(scope.row,'删除')">删除</el-button>
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
</template>
<script>
import {
  userlist,
  userdelete,
  userpositionStatus
} from "@/api/mediateuser";
import FormComment from "./leaveform.vue";
import EmModel from "./editmodel.vue";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
export default {
  name: "leave",
  props: ["orgList"],
  components: { FormComment, Pagination, EmModel },
  data() {
    return {
      
      searchParams: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      tableHead: [
        {
          key: "orgTitle",
          title: "所属机构",
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
          key: "leftTime",
          title: "离职日期",
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
      // 表格数据
      tableData: []
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    //获取员工列表
    getuser() {
      let params = Object.assign({}, this.$refs.formInline.formInline);
      params["page"] = this.searchParams.page;
      params["pageSize"] = this.searchParams.pageSize;
      params["positionStatus"] = 0;
      userlist(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.data;
          this.searchParams["page"] = res.data.page,
          this.searchParams["total"] = res.data.total 
        }
      });
    },
    // 删除操作
    handledel(val, title) {
      this.open(val, title);
    },
    // 确认删除弹窗
    open(val, title) {
      this.$confirm(`是否确认${title}该员工账号？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          switch (title) {
            case "删除":
              this.userdelete(val);
              break;
            default:
              this.resetUser(val);
          }
        })
    },
    //删除员工
    userdelete(val) {
      let arr = []
      arr.push( val.userId)
      let params = {
        userIdList:arr,
        operateType:1
      };
      userdelete(params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getuser();
        }
      });
    },
    //员工恢复
    resetUser(val) {
      let params = {
        userId: val.userId,
        userStatus: val.userStatus,
        positionStatus: 1
      };
      userpositionStatus(params).then(res => {
        if (res.code === 200) {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.getuser();
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.el-icon-plus {
  margin-right: 5px;
}
</style>
