<template>
  <div class="app-container message-container published-wrap">
    <div class="bold">发表文章</div>
    <el-form :model="form.data"
             :rules="form.rules"
             label-width="50px"
             label-position="left"
             class="form-wrap"
             ref="form">
      <el-form-item label="标题"
                    prop="title">
        <el-input v-model="form.data.title"
                  placeholder="请输入标题"
                  maxlength="50"
                  show-word-limit
                  class="w480"></el-input>
      </el-form-item>
      <el-form-item label="描述"
                    prop="intro">
        <el-input v-model="form.data.intro"
                  placeholder="请输入描述"
                  type="textarea"
                  rows="4"
                  maxlength="100"
                  show-word-limit
                  class="w480">
        </el-input>
      </el-form-item>
      <el-form-item label="图片"
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
            <div class="el-upload__text">建议图片尺寸大小：280 * 170px</div>
          </div>
          <div class="update-img center ft12"
               v-if="form.data.picture">修改图片</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容"
                    prop="html">
        <tinymce-comment ref="editor"
                         v-model="form.data.html"
                         :height="300" />
      </el-form-item>
    </el-form>
    <div style="text-align:center">
      <el-button type="primary"
                 @click="onConfirm">确 定</el-button>
      <el-button class="ml16"
                 @click="onClose">取 消</el-button>
    </div>
  </div>
</template>

<script>
import TinymceComment from '@/components/Tinymce'
export default {
  name: 'Published',
  components: { TinymceComment },
  methods: {
    // 上传前判断
    beforeHandleUpload (file) {
      const whiteList = ['image/jpeg', 'image/png', 'image/bmp', 'image/jpg']
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!whiteList.includes(file.type)) {
        this.$message.error('上传图片只能是  png / jpeg / jpg 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
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
      this.$router.push({ name: 'List' })
    },
    // 确定
    onConfirm () {
      this.$refs.form.validate((vaild) => {
        if (vaild) {
          this.$route.query.id ? this.updateByIdArticle() : this.addArticle()
        }
      })
    },
    // 新增
    addArticle () {
      const params = {
        ...this.form.data
      }
      this.$api.addArticle(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.successTip('新增成功')
      })
    },
    // 编辑
    updateByIdArticle () {
      const params = {
        ...this.form.data
      }
      this.$api.updateByIdArticle(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.successTip('编辑成功')
      })
    },
    successTip (tip) {
      this.$message.success(tip)
      this.onClose()
    },
    // 新闻资讯id查新闻资讯
    findByIdArticle (id) {
      this.$api.findByIdArticle({ id }).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        const { title, id, picture, intro, html } = res?.data ?? {}
        this.form.data = { title, id, picture, intro, html }
      })
    }

  },
  data () {
    return {
      cidOptions: [],
      form: {
        data: {
          title: '',
          intro: '',
          picture: '',
          html: ''
        },
        rules: Object.freeze({
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' }
          ],
          intro: [
            { required: true, message: '请输入文章描述', trigger: 'blur' }
          ],
          picture: [
            { required: true, message: '请上传文章图片', trigger: 'change' }
          ],
          html: [
            { required: true, message: '请填写文章内容', trigger: 'change' }
          ]
        })
      },

    }
  },
  created () {
    const id = this.$route.query.id
    id && this.findByIdArticle(id)
  }
}
</script>

<style lang='scss' scoped>
.w480 {
  width: 480px;
}
.style-container {
  border: none;
  margin: 0;
  box-shadow: 0px 0px 0px 0px rgb(0 0 0);
  flex-direction: row;
  .item_warp {
    margin: 0 10px 0 0;
    .img_warp {
      line-height: 20px;
    }
  }
}
.published-wrap {
  flex-direction: column;
  .form-wrap {
    margin: 60px auto 0;
  }
}
::v-deep .upload-wrap {
  width: 282px;
  height: 172px;
  position: relative;
  .upload-img {
    width: 100%;
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
    width: 282px;
    height: 172px;
    .el-icon-upload {
      margin: 28px 0 20px;
      display: block;
    }
    .el-upload__text {
      line-height: 1.5;
    }
  }
}
::v-deep .el-form {
  .el-textarea .el-input__count {
    line-height: 1.5;
  }
  .el-input .el-input__inner {
    padding: 0 45px 0 15px;
  }
}
</style>