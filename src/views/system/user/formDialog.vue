<template>
  <el-dialog :title="dialog.title"
             :visible.sync="dialog.show"
             width="400px"
             :before-close="onClose">
    <el-form :model="form.data"
             :rules="form.rules"
             label-width="66px"
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
                   :disabled="form.data.role === 'superAdmin'"
                   placeholder="请选择角色">
          <el-option v-for="item in roleOptions"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号"
                    prop="phone">
        <el-input v-model="form.data.phone"
                  placeholder="请输入手机号"
                  class="w200"></el-input>
      </el-form-item>
      <el-form-item label="头像"
                    prop="avatarUrl">
        <el-upload class="upload-wrap"
                   :before-upload="beforeHandleUpload"
                   accept=".jpeg,.png,.jpg,.bmp"
                   :http-request="reqUpload"
                   :show-file-list="false"
                   drag
                   action="">
          <el-image v-if="form.data.avatarUrl"
                    :src="form.data.avatarUrl"
                    class="upload-img">
          </el-image>
          <div v-else
               class="ft24">
            <i class="el-icon-plus"></i>
          </div>
          <div class="update-img center ft12"
               v-if="form.data.avatarUrl">修改图片</div>
        </el-upload>
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
    // 上传前判断
    beforeHandleUpload (file) {
      const whiteList = ['image/jpeg', 'image/png', 'image/bmp', 'image/jpg']
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!whiteList.includes(file.type)) {
        this.$message.error('上传图片只能是  png / jpeg / jpg 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return whiteList.includes(file.type) && isLt2M
    },
    // 图片上传
    reqUpload (e) {
      const config = {
        file: e.file
      }
      this.$api.uploadFile(config).then(res => {
        if (res.isError) return
        this.form.data.avatarUrl = res
      })
    },
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
        this.successTip('新增成功')
      })
    },
    // 编辑
    updateByIdUser () {
      const params = {
        ...this.form.data
      }
      this.$api.updateByIdUser(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.successTip('编辑成功')
      })
    },
    successTip (tip) {
      this.$message.success(tip)
      this.$emit('getTableData')
      this.onClose()
    },
    // 打开弹窗
    show (type, data) {
      type === 'edit' && this.getUsers(data.id)
      this.dialog = {
        show: true,
        title: type === 'add' ? '新增用户' : '编辑用户',
        type,
      }
    },
    getUsers (id) {
      this.$api.getUsers({ id }).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        const { id, username, password, role, phone, avatarUrl } = res.data
        this.form.data = { id, username, password, role, phone, avatarUrl }
      })
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
          role: '',
          phone: '',
          avatarUrl: ''
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
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { pattern: /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/, message: '请输入正确的手机号', trigger: 'blur' }
          ],
          avatarUrl: [
            { required: true, message: '请上传头像', trigger: 'change' }
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
  padding: 12px 66px 0 !important;
}
::v-deep .upload-wrap {
  width: 122px;
  height: 122px;
  position: relative;
  .upload-img {
    width: 122px;
    height: 100%;
  }
  .update-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #00000090;
    color: #fff;
    line-height: 1.5;
    text-align: center;
  }
  .el-upload-dragger {
    width: 122px;
    height: 122px;
    .el-icon-plus {
      font-size: 40px;
      margin-top: 40px;
      color: #999;
    }
    .el-upload__text {
      line-height: 1.5;
    }
  }
}
</style>