<template>
  <el-dialog :title="dialog.title"
             :visible.sync="dialog.show"
             width="400px"
             :before-close="onClose">
    <el-form :model="form.data"
             :rules="form.rules"
             label-width="50px"
             label-position="left"
             ref="form">
      <el-form-item label="账号"
                    prop="username">
        <el-input v-model="form.data.username"
                  placeholder="请输入账号"
                  class="w200"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input v-model="form.data.password"
                  placeholder="请输入密码"
                  type="password"
                  class="w200"></el-input>
      </el-form-item>
      <el-form-item label="角色"
                    prop="role">
        <el-select v-model="form.data.role"
                   class="w200"
                   placeholder="请选择角色">
          <el-option v-for="item in roleOptions"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary"
                 @click="onConfirm">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
export default {
  name: 'AddDialog',
  methods: {
    // 关闭、取消
    onClose () {
      this.$refs.form.resetFields()
      this.dialog.show = false
    },
    // 确定
    onConfirm () {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          this.dialog.type === 'add' ? this.addUser() : this.updateByIdUser()
        }
      })
    },
    // 新增
    addUser () {
      const params = {
        ...this.form.data
      }
      this.$api.addUser(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.$message.success('新增成功')
        this.$emit('getTableData')
        this.onClose()
      })
    },
    // 编辑
    updateByIdUser () {
      const params = {
        ...this.form.data
      }
      this.$api.updateByIdUser(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.$message.success('编辑成功')
        this.$emit('getTableData')
        this.onClose()
      })
    },
    // 打开弹窗
    show (type, data) {
      if (type === 'edit') {
        const { id, username, password, role } = data
        this.form.data = { id, username, password, role }
      }
      this.dialog = {
        show: true,
        title: type === 'add' ? '新增用户' : '编辑用户',
        type,
      }
    }
  },
  data () {
    return {
      dialog: {
        show: false,
        title: '',
        type: '',
      },
      form: {
        data: {
          username: '',
          password: '',
          role: ''
        },
        rules: Object.freeze({
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          role: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ]
        })
      },
      roleOptions: Object.freeze([
        {
          id: 'CSD',
          name: '客服'
        },
        {
          id: 'admin',
          name: '管理员'
        },
        {
          id: 'superAdmin',
          name: '超级管理员'
        },
      ])
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep .el-dialog__body {
  padding: 12px 80px 0 !important;
}
</style>