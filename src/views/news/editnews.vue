<template>
  <div id="main" class="main">
    <el-form :inline="true" :model="newsform">
      <el-form-item label-width="800px">
        <el-input v-model="newsform.title" placeholder="文章标题..." style="width: 800px;">
          <template slot="prepend">文章标题</template>
        </el-input>
      </el-form-item>
      <el-button v-loading="but_loading" type="primary" @click="addNews">提交</el-button>
      <el-button @click="clear">清空</el-button>
    </el-form>
    <div class="block">
      <el-select v-model="newsform.articleType" placeholder="文章类型">
        <el-option :value="0" label="咨询文章" />
        <el-option :value="1" label="活动" />
        <el-option :value="2" label="微信文章" />
      </el-select>
      <el-select v-model="newsform.articleStatus" placeholder="文章状态">
        <el-option :value="0" label="未发布" />
        <el-option :value="1" label="审核过，正常状态" />
        <el-option :value="2" label="关闭" />
      </el-select>
      <el-date-picker v-model="newsform.startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="文章开始时间" />
      <el-date-picker v-model="newsform.endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="文章结束时间" />
      <el-button v-if="newsform.articleType==1" @click="addactivity">填写活动信息</el-button>
    </div>
    <br>
    <el-form :inline="true" :model="newsform">
      <el-form-item label-width="800px">
        <el-input v-model="newsform.imageUrl" placeholder="文章头图的URL..." style="width: 700px;">
          <template slot="prepend">文章头图</template>
        </el-input>
      </el-form-item>
      <el-button size="mini"><input ref="imageUrl" type="file" accept="image/*" @change="uploadImg('imageUrl', $event)" ></el-button>
    </el-form>
    <el-form :inline="true" :model="newsform">
      <el-form-item label-width="800px">
        <el-input v-model="newsform.bannerUrl" placeholder="文章顶部大图的URL..." style="width: 700px;">
          <template slot="prepend">文章顶部大图</template>
        </el-input>
      </el-form-item>
      <el-button size="mini"><input ref="bannerUrl" type="file" accept="image/*" @change="uploadImg('bannerUrl', $event)" ></el-button>
    </el-form>
    <el-input v-model="newsform.desc" type="textarea" unlink-panels="false" placeholder="文章描述" maxlength="150" show-word-limit />
    <div class="home">
      <tinymce ref="editor" v-model="newsform.content" :disabled="disabled"/>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="添加活动信息">
      <el-form :model="newsform.activityPo">
        <el-form-item :label-width="formLabelWidth" label="人数">
          <el-input v-model="newsform.activityPo.activityCount" auto-complete="off" placeholder="最多参与人数"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="报名是否可以超出参与人数">
          <el-radio v-model="newsform.activityPo.userLevel" :label="0">是</el-radio>
          <el-radio v-model="newsform.activityPo.userLevel" :label="1">否</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="用户级别限制">
          <el-radio v-model="newsform.activityPo.userLevel" :label="10">普通</el-radio>
          <el-radio v-model="newsform.activityPo.userLevel" :label="20">VIP</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="报名开始">
          <el-date-picker v-model="newsform.activityPo.enrollStartDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="报名开始时间" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="报名结束">
          <el-date-picker v-model="newsform.activityPo.enrollEndDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="报名结束时间" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="活动开始">
          <el-date-picker v-model="newsform.activityPo.startDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="活动开始时间" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="活动结束">
          <el-date-picker v-model="newsform.activityPo.endDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="活动结束时间" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="性别">
          <el-radio v-model="newsform.activityPo.gender" :label="1">男</el-radio>
          <el-radio v-model="newsform.activityPo.gender" :label="2">女</el-radio>
          <el-radio v-model="newsform.activityPo.gender" :label="0">全员</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="状态">
          <el-radio v-model="newsform.activityPo.status" :label="1">开始报名</el-radio>
          <el-radio v-model="newsform.activityPo.status" :label="2">开始审核</el-radio>
          <el-radio v-model="newsform.activityPo.status" :label="3">活动中</el-radio>
          <el-radio v-model="newsform.activityPo.status" :label="4">结束</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button :loading="buttonloading" type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import tinymce from '@/components/TinymceText'
export default {
  components: {
    tinymce
  },
  data() {
    return {
      disabled: false,
      loading: false,
      but_loading: false,
      dialogFormVisible: false,
      formLabelWidth: '100px',
      buttonloading: false,
      form: [],
      newsform: {
        id: this.$route.params.id,
        title: '',
        author: this.$store.getters.nickname,
        desc: '',
        content: '',
        articleType: '',
        startTime: '',
        endTime: '',
        articleStatus: '',
        imageUrl: '',
        bannerUrl: '',
        activityPo: {}
      },
      isClear: false
    }
  },
  created() {
    this.getNewsById()
  },
  methods: {
    message(msg, type) {
      this.$message({
        message: msg,
        type: type
      })
    },
    getNewsById() {
      this.$store.dispatch('getNewsById', this.newsform.id).then(response => {
        console.log(response.result)
        this.newsform = response.result
      }).catch(() => {
        this.message('文章数据获取失败', 'error')
      })
    },
    addNews() {
      if (this.newsform.articleType === 1 && !this.newsform.activityPo.activityCount) {
        this.message('活动文章必须填写活动信息', 'error')
        return
      }
      this.but_loading = true
      this.$store.dispatch('addNews', this.newsform).then(response => {
        this.but_loading = false
        this.message('文章提交成功', 'success')
      }).catch(() => {
        this.but_loading = false
        this.message('文章提交失败', 'error')
      })
    },
    addactivity() {
      this.dialogFormVisible = true
    },
    onSubmit() {
      this.buttonloading = true
      this.newsform.activityPo.activityCount = parseInt(this.newsform.activityPo.activityCount)
      this.buttonloading = false
      this.dialogFormVisible = false
    },
    cancel() {
      this.dialogFormVisible = false
    },
    // 清空内容
    clear() {
      this.$refs.editor.clear()
    },
    uploadImg(name, files) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', files.target.files[0])
      let upname = ''
      if (name === 'imageUrl') {
        upname = 'uploadHeaderImage'
      } else {
        upname = 'uploadBannerImage'
      }
      this.$store.dispatch(upname, formdata).then(response => {
        this.imgChange(name, response.result)
        this.message('图片上传成功', 'success')
      }).catch(() => {
        this.message('图片上传失败', 'error')
      })
    },
    imgChange(name, url) {
      if (name === 'imageUrl') {
        this.newsform.imageUrl = url
      } else {
        this.newsform.bannerUrl = url
      }
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
    .home{
      margin-top: 10px;
    }
</style>
