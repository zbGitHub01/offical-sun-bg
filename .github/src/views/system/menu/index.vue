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
              label="查找"
              perms="sys:menu:view"
              type="primary"
              @click="findTreeData()"
            />
          </el-form-item>
          <el-form-item>
            <kt-button
              icon="el-icon-plus"
              label="新增"
              perms="sys:menu:add"
              type="primary"
              @click="handleAdd"
            />
          </el-form-item>
        </el-form>
      </div>
      <!--表格树内容栏-->
      <el-table
        :data="tableTreeDdata"
        border
        size="mini"
        style="width: 100%"
        rowKey="permissionId"
        default-expand-allv-loading="loading"
        element-loading-text="$t('action.loading')"
      >
        <el-table-column
          prop="menuName"
          header-align="center"
          align="center"
          width="120"
          label="菜单名称"
        />
        <!-- <table-tree-column 
        prop="name" header-align="center" treeKey="id" width="150" label="名称">
      </table-tree-column> -->
        <el-table-column
          prop="menuCode"
          header-align="center"
          align="center"
          label="code"
        />
        <el-table-column
          prop="permissionType"
          header-align="center"
          align="center"
          label="类型"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.permissionType.desc }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          width="185"
          label="操作"
        >
          <template slot-scope="scope">
            <kt-button
              icon="fa fa-edit"
              label="编辑"
              perms="sys:menu:edit"
              @click="handleEdit(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="pageRequest.total"
        :page.sync="pageRequest.page"
        :limit.sync="pageRequest.pageSize"
        @pagination="findTreeData"
      />
      <!-- 新增修改界面 -->
      <el-dialog
        :title="!dataForm.id ? '新增' : '修改'"
        width="40%"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
      >
        <el-form
          :model="dataForm"
          :rules="dataRule"
          ref="dataForm"
          @keyup.enter.native="submitForm()"
          label-width="120px"
          :size="size"
          style="text-align: left"
        >
          <el-form-item label="菜单类型" prop="permissionType">
            <el-radio-group v-model="dataForm.permissionType">
              <el-radio :label="1">菜单</el-radio>
              <el-radio :label="2">按钮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="菜单名称" prop="menuName">
            <el-input
              v-model="dataForm.menuName"
              placeholder="请输入菜单名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="code" prop="menuCode">
            <el-input
              v-model="dataForm.menuCode"
              placeholder="请输入code"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="requiredShow"
            label="是否本菜单必选权限"
            prop="requiredPermission"
          >
            <el-radio-group v-model="dataForm.requiredPermission">
              <el-radio :label="1">必选</el-radio>
              <el-radio :label="0">非必选</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="产品" prop="name">
            <el-select
              v-model="dataForm.sysProductUuid"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in pageResult"
                :key="item.productUuid"
                :label="item.productName"
                :value="item.productUuid"
              >
                {{ item.productName }}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上级菜单" prop="parentMenuCode">
            <el-cascader
              v-model="dataForm.parentMenuCode"
              :options="tableTreeDdata"
              :props="popupTreeProps"
              clearable
              @change="handleTreeSelectChange"
              style="width: 100%"
            ></el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button :size="size" @click="dialogVisible = false">取消</el-button>
          <el-button :size="size" type="primary" @click="submitForm()">
           下一步
          </el-button>
        </span>
      </el-dialog>
      <!-- 下一步操作 -->
      <el-dialog
        title="添加操作"
        width="40%"
        :visible.sync="lastdialogVisible"
        :close-on-click-modal="false"
      >
        <el-form
          :model="lastdataForm"
          ref="lastdataForm"
          @keyup.enter.native="lastsubmitForm()"
          label-width="120px"
          :size="size"
          style="text-align: left"
        >
          <template v-for="(item, index) in lastdataForm">
            <div :key="index" class="style_warp">
              <div>
                <el-form-item
                  label="权限操作名称"
                  prop="permissionOperationName"
                >
                  <el-input
                    v-model="item.operationName"
                    placeholder="请输入权限操作名称"
                  ></el-input>
                </el-form-item>
                <el-form-item label="权限操作" prop="name">
                  <el-select
                    v-model="item.operationCode"
                    placeholder="请选择"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in CodeList"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="可操作url" prop="operationUrl">
                  <el-cascader
                    v-model="item.operationUrl"
                    :options="sysResult"
                    :props="lastpopupTreeProps"
                    clearable
                    style="width: 100%"
                    @change="handlelastTreeSelectChange"
                  ></el-cascader>
                </el-form-item>
              </div>
              <div>
                <kt-button
                  icon="fa fa-trash"
                  label="删除"
                  type="danger"
                  @click="handleDelete(index)"
                />
              </div>
            </div>
          </template>
          <kt-button
            icon="fa fa-plus"
            label="添加"
            type="primary"
            @click="handleAddoper"
          />
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button :size="size" @click="lastdialogVisible = false">
            取消
         </el-button>
          <el-button :size="size" type="primary" @click="lastsubmitForm()">确认</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import KtButton from "@/components/KtButton";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { findpermission , erver ,save , addOrUpdateoperation} from "@/api/menu"
import { findnoPage} from "@/api/product"
export default {
  components: {
    // PopupTreeInput,
    KtButton,
    // TableTreeColumn,
    // FaIconTooltip,
    Pagination,
  },
  data() {
    return {
      size: "small",
      loading: false,
      filters: {
        sysProductUuid: null,
      },
      requiredShow: false,
      tableTreeDdata: [],
      sysResult: [],
      pageRequest: { page: 1, pageSize: 10, total: 0 },
      dialogVisible: false,
      lastdialogVisible: false,
      dataForm: {
        menuCode: "",
        menuName: "",
        parentMenuCode: [],
        permissionType: "",
        requiredPermission: "",
        sysProductUuid: "",
      },
      CodeList: ["list", "update", "insert", "delete"],
      lastdataForm: [
        {
          operationName: "",
          operationCode: "",
          operationUrl: [],
        },
      ],
      popupTreeData: [],
      pageResult: [],
      permissionId: "",
      popupTreeProps: {
        label: "menuName",
        children: "children",
        value: "menuCode",
        checkStrictly: true,
      },
      lastpopupTreeProps: {
        label: "contentPath",
        children: "sysServerRelationMappings",
        value: "contentPath",
        checkStrictly: true,
      },
    };
  },
  methods: {
    // 获取数据
    findTreeData: function () {
      this.loading = true;
      let params = {
        page: this.pageRequest.page,
        pageSize: this.pageRequest.pageSize,
        sysProductUuid: this.filters.sysProductUuid,
      };
      findpermission(params).then((res) => {
        this.tableTreeDdata = res.data.data;
        this.pageRequest = {
          page: res.data.page === null ? 1 : res.data.page,
          pageSize: res.data.pageSize === null ? 10 : res.data.pageSize,
          total: res.data.total === null ? 10 : res.data.total,
        };
        // this.popupTreeData = this.getParentMenuTree(res.data);
        this.loading = false;
      });
    },
    // 获取产品
    findPage: function () {
      findnoPage().then((res) => {
        this.pageResult = res.data;
      });
    },
    erver: function () {
      erver().then((res) => {
        this.sysResult = res.data;
      });
    },
    // 获取上级菜单树
    // getParentMenuTree: function(tableTreeDdata) {
    //   let parent = {
    //     parentId: 0,
    //     name: "顶级菜单",
    //     children: tableTreeDdata
    //   };
    //   return [parent];
    // },
    // 显示新增界面
    handleAdd: function () {
      this.findPage();
      this.dialogVisible = true;
      this.requiredShow = true;
      this.dataForm = {
        id: null,
        menuCode: "",
        menuName: "",
        permissionType: "",
        requiredPermission: "",
        parentMenuCode: [],
        sysProductUuid: "",
      };
    },
    // 显示编辑界面
    handleEdit: function (row) {
      this.findPage();
      this.dialogVisible = true;
      this.requiredShow = false;
      let {
        menuCode,
        menuName,
        permissionType,
        permissionId,
        rolePermissionOperation,
        parentMenuCode,
        sysProductUuid,
      } = row;
      let arr = [];
      arr.push(parentMenuCode);
      this.dataForm = {
        menuCode: menuCode,
        menuName: menuName,
        permissionType: permissionType.type,
        id: permissionId,
        parentMenuCode: arr,
        sysProductUuid: sysProductUuid,
      };
      this.lastdataForm = rolePermissionOperation;
      this.lastdataForm.map((item) => {
        let arr = [];
        arr = item.operationCode.split(":");
        item.operationCode = arr[arr.length - 1];
      });
    },
    // 删除
    handleDelete(index) {
      this.lastdataForm.splice(index, 1);
    },
    //添加操作名称
    handleAddoper() {
      let params = {
        operationName: "",
        operationCode: "",
        operationUrl: [],
      };
      this.lastdataForm.push(params);
    },
    // 获取删除的包含子菜单的id列表
    getDeleteIds(ids, row) {
      ids.push({ id: row.id });
      if (row.children != null) {
        for (let i = 0, len = row.children.length; i < len; i++) {
          this.getDeleteIds(ids, row.children[i]);
        }
      }
      return ids;
    },
    // 菜单树选中
    handleTreeSelectChange(data) {
      // this.dataForm.parentMenuCode = data[length-1];
      console.log(data);
    },
    //url菜单树
    handlelastTreeSelectChange(data) {
      this.dataForm.operationUrl = data[length - 1];
    },
    // 表单提交
    submitForm() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let {
              menuCode,
              menuName,
              permissionType,
              id,
              parentMenuCode,
              sysProductUuid,
            } = this.dataForm;
            let parentMenu =
              parentMenuCode.length === 0
                ? "non"
                : parentMenuCode[parentMenuCode.length - 1];
            let params = {
              menuCode: menuCode,
              menuName: menuName,
              permissionType: permissionType,
              id: id,
              parentMenuCode: parentMenu,
              sysProductUuid: sysProductUuid,
            };
            if (this.requiredShow === true) {
              params["requiredPermission"] = this.dataForm.requiredPermission;
            }
            save(params).then((res) => {
              this.editLoading = false;
              if (res.code == 200) {
                this.permissionId = res.data;
                this.$message({ message: "操作成功", type: "success" });
                this.$refs["dataForm"].resetFields();
                this.erver();
                this.dialogVisible = false;
                this.lastdialogVisible = true;
              } else {
                this.$message({
                  message: "操作失败, " + res.msg,
                  type: "error",
                });
              }
            });
          });
        }
      });
    },
    //确认
    lastsubmitForm() {
      this.$refs["lastdataForm"].validate((valid) => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = {
              addOrUpdatePermissionOperationParam: this.lastdataForm,
              permissionId: this.permissionId,
            };

            addOrUpdateoperation(params).then((res) => {
              this.editLoading = false;
              if (res.code == 200) {
                this.$message({ message: "操作成功", type: "success" });
                this.lastdataForm = [];
                this.$refs["dataForm"].resetFields();
                this.lastdialogVisible = false;
              } else {
                this.$message({
                  message: "操作失败, " + res.msg,
                  type: "error",
                });
              }
              this.findTreeData();
            });
          });
        }
      });
    },
  },
  mounted() {
    this.findTreeData();
    this.findPage();
  },
};
</script>

<style scoped>
.style_warp {
  border: 1px dotted #ccc;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>