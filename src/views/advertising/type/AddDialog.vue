<template>
  <el-dialog :title="dialog.title"
             :visible.sync="dialog.show"
             width="400px"
             :before-close="onClose">
    <el-form :model="form.data"
             :rules="form.rules"
             label-width="50px"
             class="ml40"
             label-position="left"
             ref="form">
      <el-form-item label="名称"
                    prop="name">
        <el-input v-model="form.data.name"
                  placeholder="请输入名称"
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
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          this.dialog.type === 'add' ? this.addAdvantageCategory() : this.updateByIdAdvantageCategory()
        }
      })
    },
    // 新增
    addAdvantageCategory () {
      const params = {
        ...this.form.data
      }
      this.$api.addAdvantageCategory(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.$message.success('新增成功')
        this.$emit('getTableData')
        this.onClose()
      })
    },
    // 编辑
    updateByIdAdvantageCategory () {
      const params = {
        ...this.form.data
      }
      this.$api.updateByIdAdvantageCategory(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.$message.success('编辑成功')
        this.$emit('getTableData')
        this.onClose()
      })
    },
    // 打开弹窗
    show (type, data) {
      if (type === 'edit') {
        const { id, name } = data
        this.form.data = { id, name }
      }
      this.dialog = {
        show: true,
        title: type === 'add' ? '新增类别' : '编辑类别',
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
          name: ''
        },
        rules: Object.freeze({
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ]
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