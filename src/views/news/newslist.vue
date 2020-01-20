<template>
  <div class="main">
    <el-form :inline="true" :model="searchInfo">
      <el-form-item label="文章ID">
        <el-input v-model="searchInfo.id" placeholder="文章ID" clearable/>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="searchInfo.title" placeholder="文章标题" clearable/>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="searchInfo.author" placeholder="文章作者" clearable/>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchInfo.articleStatus" placeholder="文章状态" clearable>
          <el-option :value="1" label="审核过，正常状态" />
          <el-option :value="0" label="未发布" />
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="searchInfo.articleType" placeholder="文章类型" clearable>
          <el-option :value="0" label="咨询文章" />
          <el-option :value="1" label="活动" />
          <el-option :value="2" label="微信文章" />
        </el-select>
      </el-form-item>
      <el-form-item label="活动状态">
        <el-select v-model="searchInfo.status" placeholder="活动状态" clearable>
          <el-option :value="1" label="开始报名" />
          <el-option :value="2" label="开始审核" />
          <el-option :value="3" label="活动中" />
          <el-option :value="4" label="结束" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getNewsList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" stripe border @selection-change="handleSelectionChange">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="主键ID：">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="文章标题：">
              <span><a :href="props.row.link" target="_blank" title="点击新标签页打开">{{ props.row.title }}</a></span>
            </el-form-item>
            <el-form-item label="文章作者：">
              <span>{{ props.row.author }}</span>
            </el-form-item>
            <el-form-item label="文章描述：">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
            <el-form-item label="文章类型：">
              <span v-if="props.row.articleType == 0">咨询文章</span>
              <span v-if="props.row.articleType == 1">活动</span>
              <span v-if="props.row.articleType == 2">微信文章</span>
            </el-form-item>
            <el-form-item label="文章创建时间：">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>
            <el-form-item label="文章开始时间：">
              <span>{{ props.row.startTime }}</span>
            </el-form-item>
            <el-form-item label="文章结束时间：">
              <span>{{ props.row.endTime }}</span>
            </el-form-item>
            <el-form-item label="文章状态：">
              <span v-if="props.row.articleStatus == 0">未发布</span>
              <span v-if="props.row.articleStatus == 1">审核过，正常状态</span>
              <span v-if="props.row.articleStatus == 2">关闭</span>
            </el-form-item>
            <el-form-item label="文章头图：">
              <span><img :src="props.row.imageUrl" class="circleImg" ></span>
            </el-form-item>
            <el-form-item label="文章顶部大图：">
              <span><img :src="props.row.bannerUrl" class="circleImg" ></span>
            </el-form-item>
            <el-form-item label="文章链接：">
              <span>{{ props.row.link }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="45" />
      <el-table-column label="文章标题" >
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="作者" width="100">
        <template slot-scope="scope">{{ scope.row.author }}</template>
      </el-table-column>
      <el-table-column label="文章类型" width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.articleType == 0">咨询文章</span>
          <span v-if="scope.row.articleType == 2">微信文章</span>
          <div v-if="scope.row.articleType==1">
            <el-tooltip content="点击查看活动详情">
              <el-button size="mini" @click="showActivityMsg(scope.row)">活动</el-button>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="文章状态" width="200">
        <template slot-scope="scope">
          <el-select v-model="scope.row.articleStatus" placeholder="文章状态" @change="updateStatus(scope.row)">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24">
      <div class="el-table-add-row" style="width: 99.2%;" @click="handleAdd()">
        <span>+ 添加</span>
      </div>
    </el-col>
    <br><br><br>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button-group>
            <el-button plain icon="el-icon-delete" @click="deleteMany()">删除所选</el-button>
            <el-button plain icon="el-icon-plus" @click="handleAdd()">新增文章</el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="articleDialogVisible" title="活动详情" width="50%" center>
      <template>
        <el-form label-position="left" class="demo-table-expand">
          <el-form-item label="活动ID：">
            <span>{{ articleInfo.articleId }}</span>
          </el-form-item>
          <el-form-item label="最多参与人数：">
            <span>{{ articleInfo.activityCount }}</span>
          </el-form-item>
          <el-form-item label="报名是否可以超出参与人数：">
            {{ articleInfo.enrollStatus }}
            <span v-if="articleInfo.enrollStatus == 0">是</span>
            <span v-if="articleInfo.enrollStatus == 1">否</span>
          </el-form-item>
          <el-form-item label="用户级别限制：">
            <span v-if="articleInfo.userLevel == 10">普通</span>
            <span v-if="articleInfo.userLevel == 20">VIP</span>
          </el-form-item>
          <el-form-item label="报名开始时间：">
            <span>{{ articleInfo.enrollStartDate }}</span>
          </el-form-item>
          <el-form-item label="报名结束时间：">
            <span>{{ articleInfo.enrollEndDate }}</span>
          </el-form-item>
          <el-form-item label="活动开始时间：">
            <span>{{ articleInfo.startDate }}</span>
          </el-form-item>
          <el-form-item label="活动结束时间：">
            <span>{{ articleInfo.endDate }}</span>
          </el-form-item>
          <el-form-item label="性别：">
            <span v-if="articleInfo.gender == 0">全员</span>
            <span v-if="articleInfo.gender == 1">男</span>
            <span v-if="articleInfo.gender == 2">女</span>
          </el-form-item>
          <el-form-item label="活动状态：">
            <span v-if="articleInfo.status == 1">开始报名</span>
            <span v-if="articleInfo.status == 2">开始审核</span>
            <span v-if="articleInfo.status == 3">活动中</span>
            <span v-if="articleInfo.status == 4">结束</span>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      multipleSelection: [],
      articleDialogVisible: false,
      articleInfo: {},
      searchInfo: {
        id: '',
        author: '',
        title: '',
        articleType: '',
        articleStatus: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      },
      statusOptions: [{
        value: 0,
        label: '未发布'
      }, {
        value: 1,
        label: '审核过，正常状态'
      }, {
        value: 2,
        label: '关闭'
      }]
    }
  },
  created: function() {
    if (this.$route.params.id) {
      this.searchInfo.id = this.$route.params.id
    }
    this.getNewsList()
  },
  methods: {
    message(msg, type) {
      this.$message({
        message: msg,
        type: type
      })
    },
    handleEdit(id) {
      this.$router.push({
        path: `/news/editnews/${id}`
      })
    },
    handleAdd() {
      this.$router.push({
        path: `/news/addnews`
      })
    },
    getNewsList() {
      this.loading = true
      this.tableData = []
      this.$store.dispatch('getNewsByParam', this.searchInfo).then(response => {
        this.tableData = response.result.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteMany() {
      if (this.multipleSelection) {
        var ids = '-1'
        this.multipleSelection.forEach(row => {
          ids = ids + ',' + row.id
        })
        this.handleDelete(ids)
      }
    },
    handleDelete(id) {
      this.$store
        .dispatch('delNews', id)
        .then(response => {
          const restype = response.code !== '000000' ? 'error' : 'success'
          this.message(response.message, restype)
          window.location.reload()
        })
        .catch(() => {
          console.log(id)
        })
    },
    showActivityMsg(row) {
      console.log(row)
      this.articleDialogVisible = true
      this.articleInfo = row.activityPo
    },
    updateStatus(row) {
      const from = {
        articleStatus: row.articleStatus,
        id: row.id
      }
      this.$store.dispatch('updateStatus', from).then(response => {
        console.log(response)
        const restype = response.code !== '000000' ? 'error' : 'success'
        this.message(response.message, restype)
      }).catch(() => {
        this.buttonloading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main {
  padding: 20px;
}

.el-table-add-row {
  margin: 10px 0px;
  width: 100%;
  height: 34px;
  border: 1px dashed #c1c1cd;
  border-radius: 3px;
  cursor: pointer;
  justify-content: center;
  display: flex;
  line-height: 34px;
}

.circleImg{
  border-radius: 10px;
  height:55px;
}
</style>
