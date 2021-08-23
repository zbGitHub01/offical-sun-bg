<template>
  <el-dialog :title="dialog.title"
             :visible.sync="dialog.show"
             width="400px"
             :before-close="onClose">
    <div style="text-align:center"
         class="padding-c20">
      <span>名称</span>
      <el-input v-model="formData.name"
                class="w200 ml8"
                placeholder="请输入名称"></el-input>
    </div>
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
    onClose () {
      this.formData = {
        name: ''
      }
      this.dialog.show = false
    },
    onConfirm () {
      if (this.formData.name === '') return this.$message.warning('请输入名称')
      this.addAdvantageCategory()
    },
    addAdvantageCategory () {

    },
    show (type) {
      this.dialog.show = true
      this.dialog.title = type === 'add' ? '新增类别' : '编辑类别'
    }
  },
  data () {
    return {
      dialog: {
        show: false,
        title: ''
      },
      formData: {
        name: ''
      }

    }
  }
}
</script>

<style lang='scss' scoped>
::v-deep .el-dialog__body {
  padding: 0 40px !important;
}
</style>