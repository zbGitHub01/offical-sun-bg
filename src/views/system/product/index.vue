<template>
  <div class="app-container message-container">
	<div class="message-warp">
        <!--工具栏-->
	<div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
		<el-form :inline="true" :model="filters" :size="size">
			<el-form-item>
				<kt-button icon="el-icon-plus" label="新增" type="primary" @click="handleAdd" />
			</el-form-item>
		</el-form>
	</div>
	<!--表格内容栏-->
	<kt-table :height="350" 
		:data="pageResult" :columns="filterColumns"
		@findPage="findPage" :pageRequest='pageRequest' @handleEdit="handleEdit" >
	</kt-table>
	<!--新增编辑界面-->
	<el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
		<el-form :model="dataForm" label-width="120px" :rules="dataFormRules" ref="dataForm" :size="size"
			label-position="right">
			<!-- <el-form-item label="ID" prop="id" v-if="false">
				<el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
			</el-form-item> -->
			<el-form-item label="产品名称" prop="productName">
				<el-input v-model="dataForm.productName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="产品Url" prop="productUrl">
				<el-input v-model="dataForm.productUrl" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="产品IP白名单" prop="productIp">
				<el-input v-model="dataForm.productIp" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="产品描述" prop="productDesc">
				<el-input v-model="dataForm.productDesc" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="是否单机" prop="signLogin">
				<el-switch v-model="dataForm.singleLogin">
				</el-switch>
			</el-form-item>
			<!-- <el-form-item label="机构" prop="deptName">
				<popup-tree-input 
					:data="deptData" 
					:props="deptTreeProps" 
					:prop="dataForm.deptName" 
					:nodeKey="''+dataForm.deptId" 
					:currentChangeHandle="deptTreeCurrentChangeHandle">
				</popup-tree-input>
			</el-form-item> -->
			
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button :size="size" @click.native="dialogVisible = false">取消</el-button>
			<el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">确认</el-button>
		</div>
	</el-dialog>
    </div>
  </div>
</template>

<script>
import PopupTreeInput from "@/components/PopupTreeInput"
import KtTable from "@/components/KtTable"
import KtButton from "@/components/KtButton"
import TableColumnFilterDialog from "@/components/TableColumnFilterDialog"
import { findPage , save} from "@/api/product"
export default {
	components:{
		PopupTreeInput,
		KtTable,
		KtButton,
		TableColumnFilterDialog
	},
	data() {
		return {
			size: 'small',
			filters: {
				name: ''
			},
			columns: [],
			filterColumns: [],
			pageRequest: { page: 1, pageSize: 10,total:0 },
			pageResult: {},
			operation: false, // true:新增, false:编辑
			dialogVisible: false, // 新增编辑界面是否显示
			editLoading: false,
			dataFormRules: {
				name: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				]
			},
			// 新增编辑界面数据
			dataForm: {
				productDesc: '',
				productIp: '',
				productName: '',
				productUrl: '',
				signLogin: false,
			},
			// deptData: [],
			deptTreeProps: {
				label: 'name',
				children: 'children'
			},
			// roles: []
		}
	},
	methods: {
		// 获取分页数据
		findPage: function () {
            let params = {
                page:this.pageRequest.page,
                pageSize:this.pageRequest.pageSize
            }
            findPage(params).then(res=>{
                if(res.code === 200){
                    this.pageResult = res.data
                    this.pageRequest.page = res.data.page
                    this.pageRequest.total = res.data.total
                }
            }).then(data!=null?data.callback:'')
		},
		// 加载用户角色信息
		// findUserRoles: function () {
		// 	this.$api.role.findAll().then((res) => {
		// 		// 加载角色集合
		// 		this.roles = res.data	
		// 	})
		// },
		// 批量删除
		// handleDelete: function (data) {
		// 	this.$api.product.batchDelete(data.params).then(data!=null?data.callback:'')
		// },
		// 显示新增界面
		handleAdd: function () {
			this.dialogVisible = true
			this.operation = true
			this.dataForm = {
				productDesc: '',
				productIp: '',
				productName: '',
				productUrl: '',
				signLogin: false,
			}
		},
		// 显示编辑界面
		handleEdit: function (params) {
			this.dialogVisible = true
			this.operation = false
			this.dataForm = Object.assign({}, params.row)
			this.dataForm.signLogin = params.row.signLogin
			this.dataForm['sysProductUuid'] = params.row.productUuid
		},
		// 编辑
		submitForm: function () {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true
						let params = Object.assign({}, this.dataForm)
						save(params).then((res) => {
							this.editLoading = false
							if(res.code == 200) {
								this.$message({ message: '操作成功', type: 'success' })
								this.dialogVisible = false
								this.$refs['dataForm'].resetFields()
							}
							this.findPage(null)
						})
					})
				}
			})
		},
		// // 获取部门列表
		// findDeptTree: function () {
		// 	this.$api.dept.findDeptTree().then((res) => {
		// 		this.deptData = res.data
		// 	})
		// },
		// 菜单树选中
      	deptTreeCurrentChangeHandle (data, node) {
        	this.dataForm.deptId = data.id
        	this.dataForm.deptName = data.name
		},
		// 处理表格列过滤显示
      	displayFilterColumnsDialog: function () {
			this.$refs.tableColumnFilterDialog.setDialogVisible(true)
      	},
		// 处理表格列过滤显示
      	handleFilterColumns: function (data) {
			this.filterColumns = data.filterColumns
			this.$refs.tableColumnFilterDialog.setDialogVisible(false)
      	},
		// 处理表格列过滤显示
      	initColumns: function () {
			this.columns = [
				{prop:"productName", label:"产品名称", minWidth:120},
				{prop:"productUrl", label:"产品url", minWidth:120},
				{prop:"productUuid", label:"产品唯一Id", minWidth:120},
				{prop:"addTime", label:"添加时间", minWidth:100},
				{prop:"singleLogin", label:"是否单机登录", minWidth:120},
				{prop:"productIp", label:"产品Ip", minWidth:120},
				{prop:"productDesc", label:"产品说明", minWidth:120},
			]
			this.filterColumns = JSON.parse(JSON.stringify(this.columns));
      	}
	},
	mounted() {
		// this.findDeptTree()
		this.initColumns()
	}
}
</script>

<style scoped>

</style>