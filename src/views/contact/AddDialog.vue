<template>
  <el-dialog :title="dialog.title"
             :visible.sync="dialog.show"
             width="456px"
             :before-close="onClose">
    <el-form :model="form.data"
             :rules="form.rules"
             label-width="80px"
             class="ml40"
             label-position="left"
             ref="form">
      <el-form-item label="姓名"
                    prop="name">
        <el-input v-model="form.data.name"
                  placeholder="请输入姓名"
                  class="w240"></el-input>
      </el-form-item>
      <el-form-item label="职位"
                    prop="post">
        <el-input v-model="form.data.post"
                  placeholder="请输入职位"
                  class="w240"></el-input>
      </el-form-item>
      <el-form-item label="电话"
                    prop="phone">
        <el-input v-model="form.data.phone"
                  placeholder="请输入电话"
                  class="w240"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"
                    prop="email">
        <el-input v-model="form.data.email"
                  placeholder="请输入邮箱"
                  class="w240"></el-input>
      </el-form-item>
      <el-form-item label="公司名称"
                    prop="company">
        <el-input v-model="form.data.company"
                  placeholder="请输入公司名称"
                  class="w240"></el-input>
      </el-form-item>
      <el-form-item label="问题描述"
                    prop="remark">
        <el-input v-model="form.data.remark"
                  type="textarea"
                  :rows="4"
                  placeholder="请填写您需要了解和解决的问题"
                  class="w240"></el-input>
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
    // 关闭取消
    onClose () {
      this.$refs.form.resetFields()
      this.dialog.show = false
    },
    // 确定
    onConfirm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.contactUsAdd()
        }
      })
    },
    // 新增
    contactUsAdd () {
      const params = {
        ...this.form.data
      }
      this.$api.contactUsAdd(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.successTip(`${this.dialog.type === 'add' ? '新增' : '编辑'}成功`)
      })
    },

    successTip (tip) {
      this.$message.success(tip)
      this.$emit('getTableData')
      this.onClose()
    },
    // 打开弹窗
    show (type, data) {
      if (type === 'edit') {
        const { id, name, post, phone, email, company, remark } = data
        this.form.data = { id, name, post, phone, email, company, remark }
      }
      this.dialog = {
        show: true,
        title: type === 'add' ? '新增留言' : '编辑留言',
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
          name: '',
          post: '',
          phone: '',
          email: '',
          company: '',
          remark: '',
        },
        rules: Object.freeze({
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          post: [
            { required: true, message: '请输入职位', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入电话', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' }
          ],
          company: [
            { required: true, message: '请输入公司名称', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请填写您需要了解和解决的问题', trigger: 'blur' }
          ],
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep .el-dialog__body {
  padding: 12px 56px 0 !important;
}
</style>