<template>
  <div class="app-container message-container">
    <div class="message-warp">
      <div
        class="toolbar"
        style="float: left; padding-top: 10px; padding-left: 15px"
      >
        <el-form :inline="true" :model="filters" :size="size">
          <el-form-item label="角色名称">
            <el-input v-model="filters.roleName" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="产品名称">
            <el-select
              v-model="filters.sysProductUuid"
              placeholder="请选择产品"
              style="width: 100%"
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
          <el-form-item>
            <kt-button
              icon="el-icon-search"
              label="查询"
              type="primary"
              @click="getroleList"
            />
          </el-form-item>
          <el-form-item>
            <kt-button
              icon="el-icon-plus"
              label="新增"
              type="primary"
              @click="handleAdd('新增')"
            />
          </el-form-item>
        </el-form>
      </div>
      <!--角色列表内容栏-->
      <el-table
        v-loading="loading"
        :data="roleData"
        style="width: 100%; margin-top: 20px"
        row-key="departmentId"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          v-for="(item, index) in tableHead"
          :key="index"
          :prop="item.key"
          :label="item.title"
          align="center"
        />
        <el-table-column property="enable" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row, '编辑')"
              >编辑</el-button
            >
            <!-- <el-button  type="text" @click="handledel(scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination layout="total, prev, pager, next, jumper" @current-change="getroleList" 
        :current-page="searchParams.page" :page-size="searchParams.pageSize" :total="searchParams.total" style="float:right;">
      </el-pagination> -->
      <pagination
        :total="searchParams.total"
        :page.sync="searchParams.page"
        :limit.sync="searchParams.pageSize"
        @pagination="getroleList"
      />
      <!-- 新增修改界面 -->
      <el-dialog
        :title="title"
        width="40%"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
      >
        <el-form
          :model="form"
          :rules="dataRule"
          ref="form"
          @keyup.enter.native="submitForm()"
          label-width="120px"
          :size="size"
          style="text-align: left"
        >
          <el-form-item label="角色名称:" prop="roleName">
            <el-input
              v-model="form.roleName"
              placeholder="请输入角色名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色备注:" prop="roleNote">
            <el-input
              v-model="form.roleNote"
              placeholder="请输入角色备注"
            ></el-input>
          </el-form-item>
          <el-form-item label="产品:" prop="sysProductUuid">
            <el-select
              v-model="form.sysProductUuid"
              placeholder="请选择产品"
              @change="handleSelect"
              style="width: 100%"
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
          <el-form-item label="权限设置:" prop="permissionId">
            <el-tree
              :default-checked-keys="form.permissionId"
              :disabled="disabled"
              style="width: 100%"
              :data="parentList"
              default-expand-all
              node-key="permissionId"
              ref="tree"
              @check="handleTreeSelectChange"
              :props="popupTreeProps"
            >
            </el-tree>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button :size="size" @click="dialogVisible = false">取消</el-button>
          <el-button :size="size" type="primary" @click="submitForm()">确认</el-button>
        </span>
      </el-dialog>
    </div>
    <!--工具栏-->
  </div>
</template>
    
<script>
import KtButton from "@/components/KtButton";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { roleList, rolepermissionAssig, rolesave } from "@/api/role";
import { findnoPage } from "@/api/product";
export default {
  components: {
    KtButton,
    Pagination,
  },
  data() {
    return {
      size: "small",
      loading: false,
      searchParams: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      pageResult: [],
      // 表头数据
      tableHead: [
        {
          key: "roleName",
          title: "角色名称",
        },
        {
          key: "roleNote",
          title: "角色描述",
        },
        {
          key: "useCount",
          title: "使用人数",
        },
        {
          key: "addUsername",
          title: "录入人",
        },
        {
          key: "createTime",
          title: "录入时间",
        },
        {
          key: "updateUsername",
          title: "修改人",
        },
        {
          key: "updateTime",
          title: "修改时间",
        },
      ],
      filters: {
        roleName: null,
        sysProductUuid: null,
      },
      roleData: [],
      dialogVisible: false,
      form: {
        permissionId: [],
        roleName: "",
        roleNote: "",
      },
      dataRule: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
      parentList: [],
      disabled: true,
      popupTreeProps: {
        children: "children",
        label: "menuName",
        value: "permissionId",
      },
    };
  },
  methods: {
    // 获取数据
    getroleList: function () {
      this.loading = true;
      let params = {};
      params["page"] = this.searchParams.page;
      params["pageSize"] = this.searchParams.pageSize;
      params["roleName"] = this.filters.roleName;
      params["sysProductUuid"] = this.filters.sysProductUuid;
      roleList(params).then((res) => {
        this.roleData = res.data.data;
        this.loading = false;
        this.searchParams = {
          page: res.data.page === null ? 1 : res.data.page,
          pageSize: res.data.pageSize === null ? 10 : res.data.pageSize,
          total: res.data.total === null ? 10 : res.data.total,
        };
      });
    },
    // 获取上级菜单树
    getSelect: function (val) {
      let params = {
        sysProductUuid: val,
      };
      rolepermissionAssig(params).then((res) => {
        this.parentList = res.data;
      });
    },
    // 显示新增界面
    handleAdd: function (item) {
      this.dialogVisible = true;
      this.title = item;
      this.form = {
        sysProductUuid: "",
        permissionId: [],
        roleName: "",
        roleName: "",
      };
    },
    findPage: function () {
      findnoPage().then((res) => {
        this.pageResult = res.data;
      });
    },
    // 显示编辑界面
    handleEdit: function (row, title) {
      this.dialogVisible = true;
      this.title = title;
      let { roleName, roleNote, sysProductUuid, permissionId, roleId } = row;
      this.form = {
        sysProductUuid: sysProductUuid,
        permissionId: permissionId,
        roleName: roleName,
        roleNote: roleNote,
        roleId: roleId,
      };
      this.getSelect(sysProductUuid);
    },
    // 删除
    // handleDelete(row) {
    // //   this.$confirm("确认删除选中记录吗？", "提示", {
    // //     type: "warning"
    // //   }).then(() => {
    // //     let params = this.getDeleteIds([], row);
    // //     this.$api.menu.batchDelete(params).then(res => {
    // //       this.roleList();
    // //       this.$message({ message: "删除成功", type: "success" });
    // //     });
    // //   });
    // },
    // 获取删除的包含子菜单的id列表
    // getDeleteIds(ids, row) {
    //   ids.push({ id: row.id });
    //   if (row.children != null) {
    //     for (let i = 0, len = row.children.length; i < len; i++) {
    //       this.getDeleteIds(ids, row.children[i]);
    //     }
    //   }
    //   return ids;
    // },
    //获取角色
    handleSelect(val) {
      this.disabled = false;
      this.getSelect(val);
    },
    // 菜单树选中
    handleTreeSelectChange(data, checked, im) {
      this.form.permissionId = checked.checkedKeys;
    },
    // 表单提交
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let { roleName, roleNote, sysProductUuid, permissionId, roleId } =
              this.form;
            let params = {
              sysProductUuid: sysProductUuid,
              permissionId: permissionId,
              roleName: roleName,
              roleNote: roleNote,
              roleId: roleId,
            };
            rolesave(params).then((res) => {
              this.editLoading = false;
              if (res.code == 200) {
                this.$message({ message: "操作成功", type: "success" });
                this.$refs["form"].resetFields();
                this.dialogVisible = false;
              } else {
                this.$message({
                  message: "操作失败, " + res.msg,
                  type: "error",
                });
              }
              this.getroleList();
            });
          });
        }
      });
    },
  },
  mounted() {
    this.getroleList();
    this.findPage();
  },
};
</script>

<style scoped>
</style>