<template>
  <div id="main" class="main">
    <el-form :inline="true" :model="newsform">
      <el-form-item label-width="800px">
        <el-input v-model="newsform.title" placeholder="文章标题...">
          <template slot="prepend">文章标题</template>
        </el-input>
      </el-form-item>
      <el-select v-model="newsform.status" placeholder="status">
        <el-option :value="1" label="已发布" />
        <el-option :value="0" label="未发布" />
      </el-select>
      <el-button v-loading="but_loading" type="primary" @click="addNews">提交</el-button>
    </el-form>
    <mavon-editor v-loading="loading" ref="md" :ishljs = "true" v-model="newsform.content" element-loading-text="图片上传中..." @imgAdd="$imgAdd" @imgDel="$imgDel"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      but_loading: false,
      newsform: {
        title: '',
        content: '',
        status: 0
      }
    }
  },
  methods: {
    message(msg, type) {
      this.$message({
        message: msg,
        type: type
      })
    },
    addNews() {
      this.but_loading = true
      this.tableData = []
      this.$store.dispatch('addNews', this.newsform).then(response => {
        this.but_loading = false
        this.message('文章提交成功', 'success')
      }).catch(() => {
        this.but_loading = false
        this.message('文章提交失败', 'error')
      })
    },
    $imgDel(pos) {
      delete this.img_file[pos]
    },
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', $file)
      this.$store.dispatch('uploadImg', formdata).then(response => {
        // 反写返回的图片链接
        this.$refs.md.$img2Url(pos, response.result)
        this.message('图片上传成功', 'success')
      }).catch(() => {
        this.message('图片上传失败', 'error')
      })
    }
  }
}
</script>
<style scoped>
    .main{
        margin: 10px;
    }
    .v-note-wrapper{
        min-height: 600px;
    }
    .el-form-item{
        width: 800px;
    }
    .el-input-group{
        width: 800px;
    }
</style>

