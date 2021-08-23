<template>
  <div class="app-container message-container">
    <div class="message-warp">
      <!--工具栏-->
    <div
      class="toolbar"
      style="float: left; padding-top: 10px; padding-left: 15px"
    >
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-model="filters.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <kt-button
            icon="el-icon-search"
            label="查询"
            type="primary"
            @click="findPage()"
          />
        </el-form-item>
        <el-form-item>
          <kt-button
            icon="el-icon-plus"
            label="新增"
            type="primary"
            @click="handleAdd"
          />
        </el-form-item>
      </el-form>
    </div>
      <!--表格显示列界面-->
      <el-table
        :data="tableData" border style="width: 100%;' }">
        <el-table-column
          v-for="(item, index) in tableHead"
          :key="index"
          :prop="item.key"
          :label="item.title"
          align="center"
        />
         <el-table-column property="singleLogin" align="center" label="是否启用">
          <template slot-scope="scope">
             <el-switch v-model="scope.row.singleLogin"  @change ='changeStatus(scope.row)'></el-switch>
          </template>
        </el-table-column>
        <el-table-column property="enable" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope, '编辑')"
              >编辑</el-button
            >
            <el-button type="text" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="searchParams.total"
        :page.sync="searchParams.page"
        :limit.sync="searchParams.pageSize"
        @pagination="findPage"
      />
    <!--新增编辑界面-->
    <el-dialog
      :title="operation ? '新增' : '编辑'"
      width="40%"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
    >
      <el-form
        :model="dataForm"
        label-width="80px"
        :rules="dataFormRules"
        ref="dataForm"
        :size="size"
        label-position="right"
      >
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="dataForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobilePhone">
          <el-input placeholder="请输入手机号" v-model="dataForm.mobilePhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户头像" prop="username">
          <el-upload
            class="avatar-uploader"
            action="/other/file/upload"
            :headers="tokens"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img
              style="width: 150px;height:150px;"
              v-if="dataForm.avatar"
              :src="dataForm.avatar"
              class="avatar"
            />
            <div style="width: 150px;height:150px; padding-top: 40px" v-else>
              <i class="el-icon-camera-solid"></i>
              <p>点击上传头像</p>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="产品" prop="sysProductUuid">
         <el-select
            v-model="dataForm.sysProductUuid"
            placeholder="请选择产品"
            style="width: 100%"
            @change="handleSelect"
          >
            <el-option
              v-for="item in pageResult"
              :key="item.productUuid"
              :label="item.productName"
              :value="item.productUuid"
            >
            </el-option>
             </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select
            v-model="dataForm.roleId"
            placeholder="请选择角色"
            :disabled='disabled'
            style="width: 100%"
          >
            <el-option
              v-for="item in roles"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="operation" label="密码" prop="password" >
          <el-input placeholder="请输入密码" v-model="dataForm.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="dialogVisible = false">取消</el-button>
        <el-button
          :size="size"
          type="primary"
          @click.native="submitForm"
          :loading="editLoading"
          >确认</el-button
        >
      </div>
    </el-dialog>
    </div>
    
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import KtTable from "@/components/KtTable";
import KtButton from "@/components/KtButton";
import TableColumnFilterDialog from "@/components/TableColumnFilterDialog";
import { batchDelete , enable , addAuthUserInfo , userList } from "@/api/user"
import {  rolenopageList} from "@/api/role"
import { findnoPage } from "@/api/product"
import { getToken } from "@/utils/auth";
const token = getToken();
export default {
  components: {
    KtTable,
    KtButton,
    TableColumnFilterDialog,
    Pagination
  },
  data() {
    return {
      size: "small",
      filters: {
        username: null,
      },
      tokens: {
        Authorization: token
      },
      searchParams: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      // 表头数据
      tableHead: [
        {
          key: "username",
          title: "用户名称",
        },
        {
          key: "serviceSysName",
          title: "系统名称",
        },
        {
          key: "mobilePhone",
          title: "角色名称",
        },
        {
          key: "sysProductName",
          title: "产品名称",
        },
        {
          key: "mobilePhone",
          title: "手机号",
        },
      ],
      tableData: [],
      pageResult:[],
      operation: false, // true:新增, false:编辑
      dialogVisible: false, // 新增编辑界面是否显示
      editLoading: false,
      disabled:true,
      dataFormRules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        mobilePhone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        sysProductUuid: [{ required: true, message: "请选择产品", trigger: "change'" }],
        roleId: [{ required: true, message: "请选择角色", trigger: "change'" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      // 新增编辑界面数据
      dataForm: {
        avatar:null,
        username: null,
        mobilePhone: null,
        password: null,
        sysProductUuid: null,
        roleId: null,
      },
      roles: [],
    };
  },
  methods: {
    // 获取分页数据
    findPage: function () {
      let params = {}
      params["page"] = this.searchParams.page;
      params["pageSize"] = this.searchParams.pageSize;
      params['username'] = this.filters.username
      userList(params)
        .then(res => {
          this.tableData = res.data.data;
          this.loading = false;
          this.searchParams = {
                page: res.data.page===null ? 1 : res.data.page ,
                pageSize: res.data.pageSize ===null ? 10 :  res.data.pageSize  ,
                total:  res.data.total ===null ? 10 :  res.data.total  
            };
        })
    },
    // 获取产品
		peoductPage: function () {
			findnoPage().then((res) => {
				this.pageResult = res.data
			})
		},
    // 批量删除
    handleDelete: function (item) {
      this.$confirm("是否确认删除该用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            sysProductUuid : item.sysProductUuid,
            userGlobalUuid : item.globalUserUuid,
          }
         batchDelete(params).then(res=>{
              if(res.code===200){
                this.$message.success('删除成功')
                this.findPage();
              }
            });
        })
      
    },
    // 显示新增界面
    handleAdd: function () {
      this.dialogVisible = true;
      this.operation = true;
      this.dataForm = {
        avatar:null,
        username: null,
        mobilePhone: null,
        sysProductUuid: null,
        roleId:  null,
        password: null
      };
    },
    // 显示编辑界面
    handleEdit: function (params) {
      this.dialogVisible = true;
      this.operation = false;
      let { avatar ,roleId , mobilePhone , globalUserUuid , sysProductUuid  , username} = params.row
      this.dataForm = {
        avatar :avatar,
        mobilePhone:mobilePhone,
        userGlobalUuid:globalUserUuid,
        sysProductUuid:sysProductUuid,
        roleId:roleId,
        username:username
      }
      this.getroleList(sysProductUuid)
    },
    //获取头像
    handleAvatarSuccess(res, file) {
      this.dataForm.avatar = res.data.fileUrl;
    },
    changeStatus(item){
      let params = {
        singleLogin : item.singleLogin,
        sysProductUuid: item.sysProductUuid,
        userGlobalUuid: item.globalUserUuid
      } 
      enable(params).then(res=>{
          if(res.code===200){
            this.findPage()
            this.$message.success('修改成功')
          }
        });
    },
    // 编辑
    submitForm: function () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = Object.assign({}, this.dataForm);
            addAuthUserInfo(params).then((res) => {
              this.editLoading = false;
              if (res.code == 200) {
                this.$message({ message: "操作成功", type: "success" });
                this.dialogVisible = false;
                this.$refs["dataForm"].resetFields();
              }
              this.findPage();
            });
          });
        }
      });
    },
    //获取角色
    handleSelect(val){
      this.disabled = false
      this.getroleList(val)
    },
    //获取角色列表
    getroleList(val){
      let params = {
        sysProductUuid: val
      }
      rolenopageList(params).then(res => {
        this.roles = res.data;
      });
    },
  },
  mounted() {
    this.findPage()
    this.peoductPage()
    // this.findDeptTree();
  },
};
</script>

<style >
.page-container{
  width: 100%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  -align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-icon-camera-solid {
  font-size: 30px;
}
</style>