<template>
  <el-dialog :title="dialog.title"
             :visible.sync="dialog.show"
             width="400px"
             :before-close="onClose">
    <el-form :model="form.data"
             :rules="form.rules"
             label-width="64px"
             label-position="left"
             ref="form">
      <el-form-item label="原密码"
                    prop="password">
        <el-input v-model="form.data.password"
                  placeholder="请输入原密码"
                  class="w200"></el-input>
      </el-form-item>
      <el-form-item label="新密码"
                    prop="confirmPassword">
        <el-input v-model="form.data.confirmPassword"
                  placeholder="请输入新密码"
                  class="w200"></el-input>
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
import { removeToken } from '@/utils/auth'
export default {
  name: 'ChangePassword',
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
          this.changePassword()
        }
      })
    },
    // 修改密码
    changePassword () {
      const params = {
        ...this.form.data
      }
      this.$api.changePassword(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.$message.success('修改密码成功')
        this.onClose()
        this.timer = setTimeout(() => {
          removeToken()
          this.$router.push({ path: "/login" })
        }, 1000);
      })
    },
    // 打开弹窗
    show () {
      this.dialog.show = true
    }
  },
  data () {
    return {
      timer: null,
      dialog: {
        show: false,
        title: '修改密码'
      },
      form: {
        data: {
          password: '',
          confirmPassword: ''
        },
        rules: Object.freeze({
          password: [
            { required: true, message: '请输入原密码', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
          ]
        })
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style lang='scss' scoped>
::v-deep .el-dialog__body {
  padding: 12px 66px 0 !important;
}
</style>