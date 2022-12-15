<template>
  <el-dialog title="视频相关配置"
             :close-on-click-modal="false"
             :visible.sync="dialog.show"
             width="600px"
             :before-close="onClose">
    <el-form :model="form.data"
             :rules="form.rules"
             label-width="150px"
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
      <el-form-item label="PC视频封面图片"
                    prop="picture">
        <el-upload class="upload-wrap"
                   :before-upload="beforeHandleUpload"
                   accept=".jpeg,.png,.jpg,.bmp"
                   :http-request="reqPCUpload"
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
               v-if="form.picture">修改图片</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="H5视频封面图片"
                    prop="phonePicture">
        <el-upload class="upload-wrap"
                   :before-upload="beforeHandleUpload"
                   accept=".jpeg,.png,.jpg,.bmp"
                   :http-request="reqHUpload"

                   :show-file-list="false"
                   drag
                   action="">
          <el-image v-if="form.data.phonePicture"
                    :src="form.data.phonePicture"
                    class="upload-img">
          </el-image>
          <div v-else>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将图片拖到此处，或<em> 点击上传</em></div>
            <div class="el-upload__text">建议图片尺寸大小：1920 * 600px</div>
          </div>
          <div class="update-img center ft12"
               v-if="form.phonePicture">修改图片</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="首页宣传视频"
                    prop="videoUrl">
        <el-upload class="upload-wrap"
                   v-loading="loading"
                   :element-loading-text="loadingText"
                   :before-upload="beforeHandleVideoUpload"
                   accept=".mp4,.webm,.ogg"
                   :http-request="reqVideoUpload"

                   :show-file-list="false"
                   drag
                   action="">
          <video v-if="form.data.videoUrl"
                    height="180px"
                    :src="form.data.videoUrl"
                    preload="auto"
                    class="upload-img">
          </video>
          <div v-else>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将视频拖到此处，或<em> 点击上传</em></div>
            <div class="el-upload__text">建议视频大小不超过200MB</div>
          </div>
          <div class="update-img center ft12"
               v-if="form.data.videoUrl">修改视频</div>
        </el-upload>
        <div>
          <el-progress v-show="![0,100].includes(progressBar)" :percentage="progressBar"></el-progress>
          <div class="cancelBtn" v-show="loading"><el-button @click="handleCancelUpload">取消上传</el-button></div>
        </div>
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
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken, removeToken, removeRole } from "@/utils/auth";

// 中断axios请求
const CancelToken = axios.CancelToken;
let source = CancelToken.source();

export default {
  name: 'AddDialog',
  data () {
    return {
      dialog: {
        show: false,
        title: '',
        type: '',
      },
      cidOptions: [{id: '12', name: '首页视频'}] ,
      form: {
        data: {
          picture: '',
          phonePicture: '',
          videoUrl: '',
          title: '',
          cid: '',
          id: '',
        },
        rules: Object.freeze({
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          cid: [
            { required: true, message: '请选择类别', trigger: 'change' }
          ],
        })
      },
      progressBar: 0 ,// 记录上传进度的变量
      loading: false,
      currentType: '', // 当前上传的类别
    }
  },
  created() {
    this.createNewSource();
  },
  computed: {
    loadingText () {
      return this.progressBar < 99 ? '上传中...':'解析中,请稍等...';
    },
  },
  methods: {
    createNewSource () {
      source = CancelToken.source();
    },
    // 取消上传视频
    handleCancelUpload() {
      console.log(333)
      source.cancel('Upload canceled by the current user.');
      // 重新生成source
      this.createNewSource();
    },
    // 图片上传前判断
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
    // 视频上传前判断
    beforeHandleVideoUpload (file) {
      const whiteList = ['video/mp4', 'video/webm', 'video/ogg']
      const isLt2M = file.size / 1024 / 1024 < 200
      if (!whiteList.includes(file.type)) {
        this.$message.error('上传视频只能是  mp4 / webm / ogg 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传视频大小不能超过 200MB!')
      }
      return whiteList.includes(file.type) && isLt2M
    },
    // h5图片上传
    reqHUpload (e) {
      this.$api.uploadFile({file: e.file}).then(res => {
        if (res.isError) return
        this.form.data.phonePicture = res
      })
    },
    // PC图片上传
    reqPCUpload (e) {
      this.$api.uploadFile({file: e.file}).then(res => {
        if (res.isError) return
        this.form.data.picture = res
      })
    },
    // 视频上传
    reqVideoUpload (e) {
      this.loading = true
      const temConfig = {
        headers: {
          token: getToken()
        },
        onUploadProgress: progressEvent =>{
          if (progressEvent.lengthComputable) {   //是否存在进度
            this.progressBar = Math.round( (progressEvent.loaded * 100) / progressEvent.total ) - 1;
          }
        },
        cancelToken: source.token
      }
      const formData = new FormData()
      formData.append('file', e.file)
      const url = '/api/upload/uploadFile'
      axios.post(url, formData, temConfig).then(res => {
        const resData = res.data
        if (res.status === 200) {
          if (resData.code === 103) {
            MessageBox.confirm(
              '您的登录已过期，请重新登录', {
                confirmButtonText: '重新登录',
                showClose: false,
                center: true,
                showCancelButton: false,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                type: 'warning'
              }
              ).then(() => {
                removeToken()
                removeRole()
                router.push({ path: '/login' })
            })
            return
          }
          if (resData.code === 200) {
            this.progressBar = 100
            this.loading = false
            this.form.data.videoUrl = resData.data
          } else {
            Message.error('资源上传失败，请稍后重新上传')
          }
        } else {
          Message.error('资源上传失败，请稍后重新上传')
        }
      }).catch(thrown => {
        console.log(thrown)
        console.log(axios.isCancel())
        console.log(axios.isCancel(thrown))
        // 取消视频上传
        if (axios.isCancel(thrown)) {
          this.progressBar = 0
          this.loading = false
          console.log('Request canceled', thrown.message);
        } else {
          console.log('中断请求出错，请联系管理员。')
        }
      });
    },
    // 关闭、取消
    onClose () {
      this.$refs.form.resetFields()
      this.dialog.show = false
    },
    // 确定
    onConfirm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.dialog.type === 'add' ? this.addAdvantage() : this.updateByIdAdvantage()
        }
      })
    },
    // 新增
    addAdvantage () {
      const params = {
        ...this.form.data,
      }
      this.$api.addAdvantage(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.successTip('添加成功')
      })
    },
    // 编辑
    updateByIdAdvantage () {
      const params = {
        ...this.form.data
      }
      this.$api.updateByIdAdvantage(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.successTip('编辑成功')
      })
    },
    successTip (tip) {
      this.$message.success(tip)
      this.$emit('getTableData')
      this.handleCancelUpload()
      this.onClose()
    },
    // 打开弹窗
    show (isHaveData,data) {
      const { picture, phonePicture, videoUrl, title, cid, id } = data;
      const dataObj = {
        picture,
        phonePicture,
        videoUrl,
        title,
        id,
        cid,
      }
      this.form.data = Object.assign(this.form.data, dataObj)
      this.dialog = {
        show: true,
        type: !isHaveData?'add':'edit',
      }
    },
  },
}
</script>

<style lang='scss' scoped>
::v-deep .el-form-item__content {
  display: block !important;
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
  .el-loading-spinner {
    margin-top: -40px;
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
.cancelBtn {
  margin-top: 30px;
  width: 87%;
  text-align: center;
}
</style>