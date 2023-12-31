<template>
  <div :class="{fullscreen:fullscreen}"
       class="tinymce-container"
       :style="{width:containerWidth}">
    <textarea :id="tinymceId"
              class="tinymce-textarea" />
    <!-- <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div> -->
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import editorImage from './components/EditorImage'
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'
import { Loading } from 'element-ui';

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN = 'https://fastly.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
// const tinymceCDN = 'https://cdn.bootcdn.net/ajax/libs/tinymce/5.8.2/jquery.tinymce.min.js'
import { getToken } from "@/utils/auth";
import axios from "axios";
export default {
  name: 'Tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String,
      default: function () {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data () {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN',
        'es': 'es_MX',
        'ja': 'ja'
      }
    }
  },
  computed: {
    containerWidth () {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value (val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    }
  },
  mounted () {
    this.init()
  },
  activated () {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated () {
    this.destroyTinymce()
  },
  destroyed () {
    this.destroyTinymce()
  },
  methods: {
    init () {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce () {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList['zh'],
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        images_upload_url: '/api/upload/upload',
        default_link_target: '_blank',
        link_title: false,
        content_style: "p {margin: 0px; border:0px ; padding: 0px;}",
        // lineheight_formats: '1 1.2 1.5 1.6 1.8 2 2.4',
        style_formats: [
          {
            title: "行高",
            items: [
              { title: '1', block: 'p', styles: { 'line-height': '1.0' } },
              { title: '1.2', block: 'p', styles: { 'line-height': '1.2' } },
              // {title: '3', block: 'p', styles: {'line-height': '3'} },
              { title: '1.5', block: 'p', styles: { 'line-height': '1.5' } },
              { title: '1.6', block: 'p', styles: { 'line-height': '1.6' } },
              { title: '1.8', block: 'p', styles: { 'line-height': '1.8' } },
              { title: '2', block: 'p', styles: { 'line-height': '2' } },
              { title: '3', block: 'p', styles: { 'line-height': '3' } },
              { title: '4', block: 'p', styles: { 'line-height': '4' } },
              { title: '5', block: 'p', styles: { 'line-height': '5' } },
            ]
          },
        ],
        style_formats_merge: true,
        style_formats_autohide: true,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup (editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        },
        // it will try to keep these URLs intact
        // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
        // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
        convert_urls: false,
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        images_upload_handler: function (blobInfo, success, failure) {
          let formData = new FormData()
          console.log(blobInfo.filename())
          formData.append('file', blobInfo.blob())
          // formData.append('header',{Authorization: getToken()})
          axios.post('/api/upload/upload', formData, {
            headers: {
              token: getToken()
            }
          })
            .then(response => {
              const res = response.data
              if (res.code === 200) {
                success(res.data)
              } else {
                failure('上传失败！')
              }
            })
        },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
        
        // 媒体上传
        file_picker_callback: (callback, value, meta) => {
          const _tath = this
          var filetype = '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4'
          var materialType = ''
          switch (meta.filetype) {
            case 'image':
              filetype = '.jpg, .jpeg, .png, .gif'
              materialType = '1'
              break
            case 'media':
              filetype = '.mp3, .mp4'
              break
            case 'file':
            default:
          } 
          var input = document.createElement('input')
          input.setAttribute('type', 'file')
          input.setAttribute('accept', filetype)
          input.click()
          input.onchange = function() {
            var file = this.files[0]
            if (file.type == 'video/mp4' || file.type.indexOf('video') != -1) {
              materialType = '3'
            } else if (file.type == 'audio/mpeg' || file.type == 'audio/mp3' || file.type.indexOf('audio') != -1) {
              materialType = '2'
            }
            if (materialType == '1') {
              // 图片上传
              const fileData = new FormData()
              fileData.append('file', file)
              axios.post('/api/upload/uploadFile', fileData, {
                headers: {
                  token: getToken()
                }
              })
              .then(response => {
                const res = response.data
                if (res.code === 200) {
                  callback(res.data)
                } else {
                  failure('上传失败！')
                }
              })
            } else {
              // 音频、视频上传
              // 上传loading
              const loading = _tath.$loading({
                lock: true,
                text: '上传中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
              document.getElementsByClassName('is-fullscreen')[0].style.zIndex = 65537
              const fileData = new FormData()
              fileData.append('file', file)
              fileData.append('materialType', materialType)
              axios.post('/api/upload/uploadFile', fileData, {
                headers: {
                  token: getToken()
                }
              })
              .then(response => {
                const res = response.data
                if (res.code === 200) {
                  loading.close();
                  callback(res.data)
                } else {
                  failure('上传失败！')
                }
              })
            }
        }
      }
      })
    },
    destroyTinymce () {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    clear () {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    setContent (value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    execCommand (value) {
      const tinymce = window.tinymce.get(this.tinymceId)
      tinymce.execCommand('mceInsertContent', true, value);
    },
    getContent () {
      return window.tinymce.get(this.tinymceId).getContent()
    },
    getCopy () {
      return window.tinymce.get(this.tinymceId).getContent({ 'format': 'text' });
    },
    //替换
    replace (val) {
      const tinymce = window.tinymce.get(this.tinymceId)
      tinymce.execCommand('mceReplaceContent', false, `<span style="color: #ff9921;">${val}</span>`)
      console.log(tinymce)
    },
    imageSuccessCBK (arr) {
      arr.forEach(v => window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`))
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
