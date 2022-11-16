<template>
  <el-dialog 
    :title="dialogTitle" 
    width="60%"
    :show-close="false"
    :close-on-click-modal="false" 
    :close-on-press-escape="false"
    :visible.sync="dialogFormVisible">
    <el-form :model="form.data"
              :rules="form.rules"
              label-width="80px"
              label-position="left"
              class="form-wrap"
              ref="form">
      <el-form-item label="工程类型"
                    label-width="110px"
                    prop="type">
        <el-radio-group v-model="form.data.type">
          <el-radio-button label="0">阳光工程活动</el-radio-button>
          <el-radio-button label="1">阳光工程案例</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否有报名"
                    label-width="110px"
                    v-show="Number(form.data.type)===0"
                    prop="isApply">
          <el-radio-group v-model="form.data.isApply">
            <el-radio-button label="1">有报名</el-radio-button>
            <el-radio-button label="0">无报名</el-radio-button>
          </el-radio-group>
        <!-- <el-radio v-model="form.data.isApply" label="1">有报名</el-radio>
        <el-radio v-model="form.data.isApply" label="0">无报名</el-radio> -->
      </el-form-item>
      <el-form-item label="活动名称"
                    prop="name">
        <el-input v-model="form.data.name"
                  placeholder="请输入标题"
                  maxlength="50"
                  show-word-limit
                  class="w480"></el-input>
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
                        v-if="dialogFormVisible" 
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
  </el-dialog>
</template>

<script>
import TinymceComment from '@/components/Tinymce'

const defaultFormValue = {
  type: "0",
  isApply: "1",
  name: '',
  picture: '',
  html: ''
}
export default {
  name: 'EditDialog',
  components: { TinymceComment },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
    dialogTitle: {
      type: String,
      default: '',
    },
    operationId: {  // 为null代表是新增
      type: Number,
      default: null,
    },
    defaultForm: {
      type: Object,
      default: {
        type: "0",
        isApply: "1",
        name: '',
        picture: '',
        html: ''
      },
    }
  },
  data () {
    return {
      cidOptions: [],
      form: {
        data: {
          type: "0",
          isApply: "1",
          name: '',
          picture: '',
          html: ''
        },
        rules: Object.freeze({
          type: [
            { required: true, message: '请选择工程类型', trigger: 'blur' }
          ],
          isApply: [
            { required: true, message: '请选择有无报名', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          intro: [
            { required: true, message: '请输入描述', trigger: 'blur' }
          ],
          picture: [
            { required: true, message: '请上传图片', trigger: 'change' }
          ],
          html: [
            { required: true, message: '请填写内容或链接', trigger: 'change' }
          ]
        })
      },

    }
  },
  watch: {
    // 'form.data.type': {
    //   handler (newVal,oldVal) {
    //     if(Number(newVal)===1) {
    //       this.form.data.isApply = null;
    //     }
    //   },
    //   immediate: true,
    //   deep: true,
    // },
    defaultForm: {
      handler (newVal,oldVal) {
        this.form.data = newVal;
      },
      immediate: true,
      deep: true,
    },
    dialogFormVisible: {
      handler(newVal,oldVal) {
        this.form.data = Object.assign({},defaultFormValue);
      },
      immediate: true,
    }
  },
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
      // 新增时但凡有一个不为空 则进行询问关闭dialog
      const curValues = {
        name: this.form.data.name,
        picture: this.form.data.picture,
        html: this.form.data.html,
      };
      let isNull = Object.values(curValues).some(item => item !=='' && item !==null )
      // 新增时
      if(isNull&&this.operationId===null) {
        this.$confirm('确定取消？当前所填内容将会清空！', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.resetFormFields();
        }).catch(() => {});
        return;
      }
      this.resetFormFields();
    },
    // 重置表单
    resetFormFields() {
      Object.assign(this.form.data,defaultFormValue);
      this.$refs.form.resetFields();
      !!this.$refs.editor? this.$refs.editor.setContent(""):'';
      this.$emit('onclose');
    },
    // 确定
    onConfirm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
         this.operationId !==null? this.updateByIdArticle() : this.addArticle()
        }
      })
    },
    // 新增
    addArticle () {
      const params = {
        ...this.form.data
      }
      this.$api.addAndEdit(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.successTip('新增成功')
      })
    },
    // 编辑
    updateByIdArticle () {
      const params = {
        ...this.form.data,
        id: this.operationId,
      }
      this.$api.addAndEdit(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.successTip('编辑成功')
      })
    },
    successTip (tip) {
      this.$message.success(tip);
      this.$emit('flushPage');
    },
  },
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