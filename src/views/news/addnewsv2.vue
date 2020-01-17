<template>
  <div id="main" class="main">
    <el-form :inline="true" :model="newsform">
      <el-form-item label-width="800px">
        <el-input v-model="newsform.title" placeholder="文章标题..." style="width: 800px;">
          <template slot="prepend">文章标题</template>
        </el-input>
      </el-form-item>
      <el-select v-model="newsform.status" placeholder="status">
        <el-option :value="1" label="已发布" />
        <el-option :value="0" label="未发布" />
      </el-select>
      <el-button v-loading="but_loading" type="primary" @click="addNews">提交</el-button>
      <el-button v-loading="but_loading" @click="clear">清空</el-button>
      <el-button v-if="newsform.type==999" @click="addactivity">设为活动</el-button>
    </el-form>
    <div class="home">
      <tinymce ref="editor" v-model="newsform.content" :disabled="disabled"/>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" title="添加活动信息">
      <el-form :model="newsform.activityPo">
        <el-form-item :label-width="formLabelWidth" label="人数">
          <el-input v-model="newsform.activityPo.activityCount" auto-complete="off" placeholder="最多参与人数"/>
        </el-form-item>
        <el-form-item label="用户级别限制">
          <el-radio v-model="newsform.activityPo.userLevel" :label="10">普通</el-radio>
          <el-radio v-model="newsform.activityPo.userLevel" :label="20">VIP</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="报名开始">
          <el-date-picker v-model="newsform.activityPo.enrollStartDate" type="date" placeholder="报名开始时间" style="width: 100%;" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="报名结束">
          <el-date-picker v-model="newsform.activityPo.enrollEndDate" type="date" placeholder="报名结束时间" style="width: 100%;" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="活动开始">
          <el-date-picker v-model="newsform.activityPo.startDate" type="date" placeholder="活动开始时间" style="width: 100%;" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="活动结束">
          <el-date-picker v-model="newsform.activityPo.endDate" type="date" placeholder="活动结束时间" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="newsform.activityPo.gender" :label="1">男</el-radio>
          <el-radio v-model="newsform.activityPo.gender" :label="2">女</el-radio>
          <el-radio v-model="newsform.activityPo.gender" :label="0">全员</el-radio>
        </el-form-item>
        <el-form-item label="状态">
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
      formLabelWidth: '80px',
      buttonloading: false,
      form: [],
      newsform: {
        title: '',
        content: '',
        status: 0,
        type: 0,
        activityPo: {}
      },
      isClear: false
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
      console.log(this.newsform.content)
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
      this.newsform.type = 1
      this.newsform.activityPo = {
        activityCount: '',
        userLevel: '',
        enrollStartDate: '',
        enrollEndDate: '',
        startDate: '',
        endDate: '',
        gender: '',
        status: ''
      }
      this.dialogFormVisible = true
    },
    onSubmit() {
      this.buttonloading = true
      this.newsform.activityPo.articleId = parseInt(this.newsform.activityPo.articleId)
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
</style>
