<template>
  <div class="tinymce-box">
    <editor v-model="myValue" :init="init" :disabled="disabled" @onClick="onClick" />
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce' // tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/themes/silver'
import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件
// 语言包的路径
import '@/assets/js/zh_CN.js'
// css
import '@/assets/tinymce/skins/ui/oxide/skin.css'
export default {
  name: 'Tinymce',
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image media table wordcount'
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
    }
  },
  data() {
    return {
      init: {
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        // skin_url: 'tinymce/skins/ui/oxide-dark',//暗色系
        height: 700,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: true, // 菜单栏
        // 图片上传三个参数，图片数据，成功时的回调函数，失败时的回调函数
        images_upload_handler: (blobInfo, success, failure) => {
          const formData = new FormData()
          // 服务端接收文件的参数名，文件数据，文件名
          formData.append('file', blobInfo.blob())
          // 将图片上传到服务器.
          this.$store.dispatch('uploadImg', formData).then(response => {
            // 反写返回的图片链接
            success(response.result)
          }).catch(() => {
            failure('上传失败')
          })
        }
      },
      myValue: this.value
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick(e) {
      this.$emit('onClick', e, tinymce)
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = ''
    }
  }
}
</script>
