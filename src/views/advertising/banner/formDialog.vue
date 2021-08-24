<template>
  <el-dialog :title="dialog.title"
             :visible.sync="dialog.show"
             width="600px"
             :before-close="onClose">
    <el-form :model="form.data"
             :rules="form.rules"
             label-width="78px"
             label-position="left"
             ref="form">
      <el-form-item label="标题"
                    prop="title">
        <el-input v-model="form.data.title"
                  placeholder="请输入标题"
                  class="w240"></el-input>
      </el-form-item>
      <el-form-item label="类别"
                    prop="cid">
        <el-select v-model="form.data.cid"
                   class="w240"
                   placeholder="请选择类别">
          <el-option v-for="item in cidOptions"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="广告图片"
                    prop="picture">
        <el-upload class="upload-wrap"
                   :before-upload="beforeHandleUpload"
                   accept=".jpeg,.png,.jpg,.bmp"
                   :http-request="reqUpload"
                   :show-file-list="false"
                   drag
                   action="">
          <el-image v-if="form.data.picture"
                    :src="form.data.picture"
                    class="upload-img">
          </el-image>
          <div v-else>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将图片拖到此处，或<em> 点击上传</em></div>
            <div class="el-upload__text">建议图片尺寸大小：1920 * 600px</div>
          </div>
          <div class="update-img center ft12"
               v-if="form.data.picture">修改图片</div>
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
        this.form.data.picture = res
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
          this.dialog.type === 'add' ? this.addAdvantage() : this.updateByIdAdvantage()
        }
      })
    },
    // 新增
    addAdvantage () {
      const params = {
        ...this.form.data
      }
      this.$api.addAdvantage(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.$message.success('新增成功')
        this.$emit('getTableData')
        this.onClose()
      })
    },
    // 编辑
    updateByIdAdvantage () {
      const params = {
        ...this.form.data
      }
      this.$api.updateByIdAdvantage(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.$message.success('编辑成功')
        this.$emit('getTableData')
        this.onClose()
      })
    },
    // 打开弹窗
    show (type, data) {
      type === 'edit' && this.findByIdAdvantage(data.id)
      this.dialog = {
        show: true,
        title: type === 'add' ? '新增广告图' : '编辑广告图',
        type,
      }
    },
    // 根据广告id查广告
    findByIdAdvantage (id) {
      this.$api.findByIdAdvantage({ id }).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        const { cid, id, picture, title } = res?.data ?? {}
        this.form.data = { cid, id, picture, title }
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
          title: '',
          cid: '',
          picture: ''
        },
        rules: Object.freeze({
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          cid: [
            { required: true, message: '请选择类别', trigger: 'change' }
          ],
          picture: [
            { required: true, message: '请上传图片', trigger: 'change' }
          ]
        })
      },
    }
  },
  props: {
    cidOptions: Array
  }
}
</script>

<style lang='scss' scoped>
::v-deep .el-dialog__body {
  padding: 12px 80px 0 !important;
}
::v-deep .upload-wrap {
  width: 362px;
  height: 114.5px;
  position: relative;
  .upload-img {
    width: 362px;
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
    width: 362px;
    height: 114.5px;
    .el-icon-upload {
      margin: 8px 0;
      display: block;
    }
    .el-upload__text {
      line-height: 1.5;
    }
  }
}
</style>