<template>
  <div class="main">
    <el-form :inline="true" :model="searchInfo">
      <el-form-item label="活动ID">
        <el-input v-model="searchInfo.articleId" placeholder="活动ID" clearable/>
      </el-form-item>
      <el-form-item label="人数">
        <el-input v-model="searchInfo.activityCount" placeholder="最多参与人数" clearable/>
      </el-form-item>
      <el-form-item label="级别">
        <el-input v-model="searchInfo.userLevel" placeholder="用户级别" clearable/>
      </el-form-item>
      <el-form-item label="报名开始">
        <el-date-picker v-model="searchInfo.enrollStartDate" type="date" placeholder="报名开始时间" style="width: 100%;" clearable/>
      </el-form-item>
      <el-form-item label="报名结束">
        <el-date-picker v-model="searchInfo.enrollEndDate" type="date" placeholder="报名结束时间" style="width: 100%;" clearable/>
      </el-form-item>
      <el-form-item label="活动开始">
        <el-date-picker v-model="searchInfo.startDate" type="date" placeholder="活动开始时间" style="width: 100%;" clearable/>
      </el-form-item>
      <el-form-item label="活动结束">
        <el-date-picker v-model="searchInfo.endDate" type="date" placeholder="活动结束时间" style="width: 100%;" clearable/>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="searchInfo.gender" placeholder="性别" clearable>
          <el-option :value="0" label="全员" />
          <el-option :value="1" label="男" />
          <el-option :value="2" label="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="searchInfo.status" placeholder="活动状态" clearable>
          <el-option :value="1" label="开始报名" />
          <el-option :value="2" label="开始审核" />
          <el-option :value="3" label="活动中" />
          <el-option :value="4" label="结束" />
        </el-select>
      </el-form-item>
      <el-form-item label="主键ID">
        <el-input v-model="searchInfo.id" placeholder="主键ID" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" stripe border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" />
      <el-table-column label="活动ID" width="200">
        <template slot-scope="scope">{{ scope.row.articleId }}</template>
      </el-table-column>
      <el-table-column label="用户级别限制" width="120">
        <template slot-scope="scope">{{ scope.row.userLevel==10?"普通":"VIP" }}</template>
      </el-table-column>
      <el-table-column label="报名开始时间" width="160">
        <template slot-scope="scope">{{ scope.row.enrollStartDate }}</template>
      </el-table-column>
      <el-table-column label="报名结束时间" width="160">
        <template slot-scope="scope">{{ scope.row.enrollEndDate }}</template>
      </el-table-column>
      <el-table-column label="活动开始时间" width="160">
        <template slot-scope="scope">{{ scope.row.startDate }}</template>
      </el-table-column>
      <el-table-column label="活动结束时间" width="160">
        <template slot-scope="scope">{{ scope.row.endDate }}</template>
      </el-table-column>
      <el-table-column label="性别" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.gender == 0">全员</div>
          <div v-if="scope.row.gender == 1">男</div>
          <div v-if="scope.row.gender == 2">女</div>
        </template>
      </el-table-column>
      <el-table-column label="活动状态" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.status == 1">开始报名</div>
          <div v-if="scope.row.status == 2">开始审核</div>
          <div v-if="scope.row.status == 3">活动中</div>
          <div v-if="scope.row.status == 4">结束</div>
        </template>
      </el-table-column>
      <el-table-column label="主键ID" width="100">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="对应文章" width="110">
        <template slot-scope="scope">
          <el-button size="mini" @click="routerTo(scope.row.articleId)">查看文章</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.articleId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button-group>
            <el-button plain icon="el-icon-delete" @click="deleteMany()">删除所选</el-button>
          </el-button-group>
        </div>
      </el-col>
      <el-col :span="5" :offset="12">
        <div class="grid-content bg-purple-light">
          <el-button-group>
            <el-button :disabled="searchInfo.pageNum === 1?true:false" plain icon="el-icon-arrow-left" @click="page('up')">上一页</el-button>
            <el-button plain>{{ searchInfo.pageNum }}</el-button>
            <el-button plain @click="page('down')">下一页<i class="el-icon-arrow-right el-icon--right" /></el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogFormVisible" :title="edittype">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="活动ID">
          <el-input :disabled="true" v-model="form.articleId" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="最多参与人数">
          <el-input v-model="form.activityCount" auto-complete="off" />
        </el-form-item>
        <el-form-item label="用户级别限制">
          <el-radio v-model="form.userLevel" :label="10">普通</el-radio>
          <el-radio v-model="form.userLevel" :label="20">VIP</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="报名开始时间">
          <el-date-picker v-model="form.enrollStartDate" type="date" placeholder="报名开始时间" style="width: 100%;" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="报名结束时间">
          <el-date-picker v-model="form.enrollEndDate" type="date" placeholder="报名结束时间" style="width: 100%;" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="活动开始时间">
          <el-date-picker v-model="form.startDate" type="date" placeholder="活动开始时间" style="width: 100%;" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="活动结束时间">
          <el-date-picker v-model="form.endDate" type="date" placeholder="活动结束时间" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="活动性别">
          <el-radio v-model="form.gender" :label="1">男</el-radio>
          <el-radio v-model="form.gender" :label="2">女</el-radio>
          <el-radio v-model="form.gender" :label="0">全员</el-radio>
        </el-form-item>
        <el-form-item label="活动状态">
          <el-radio v-model="form.status" :label="1">开始报名</el-radio>
          <el-radio v-model="form.status" :label="2">开始审核</el-radio>
          <el-radio v-model="form.status" :label="3">活动中</el-radio>
          <el-radio v-model="form.status" :label="4">结束</el-radio>
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
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      multipleSelection: [],
      searchInfo: {
        id: '',
        articleId: '',
        activityCount: '',
        userLevel: '',
        enrollStartDate: '',
        enrollEndDate: '',
        startDate: '',
        endDate: '',
        gender: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogFormVisible: false,
      form: {},
      edittype: '',
      buttonloading: false,
      formLabelWidth: '100px'
    }
  },
  created: function() {
    if (this.$route.params.articleId) {
      this.searchInfo.articleId = this.$route.params.articleId
    }
    this.getList()
  },
  methods: {
    message(msg, type) {
      this.$message({
        message: msg,
        type: type
      })
    },
    getList() {
      this.loading = true
      this.tableData = []
      this.$store.dispatch('getActivityByParam', this.searchInfo).then(response => {
        this.loading = false
        this.tableData = response.result.data
      }).catch(() => {
        this.loading = false
      })
    },
    page(type) {
      if (type === 'up') {
        if (this.searchInfo.pageNum > 1) {
          this.searchInfo.pageNum -= 1
        } else {
          this.message('没有上一页啦', 'warning')
        }
      } else {
        this.searchInfo.pageNum += 1
      }
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteMany() {
      if (this.multipleSelection) {
        var ids = '-1'
        this.multipleSelection.forEach(row => {
          ids = ids + ',' + row.articleId
        })
        this.handleDelete(ids)
      }
    },
    handleEdit(index, row) {
      this.edittype = '修改活动信息'
      this.form = this.tableData[index]
      this.currentIndex = index
      this.dialogFormVisible = true
    },
    handleDelete(id) {
      this.$store
        .dispatch('delActivity', id)
        .then(response => {
          const restype = response.code !== '000000' ? 'error' : 'success'
          this.message(response.message, restype)
          window.location.reload()
        })
        .catch(() => {
          console.log(id)
        })
    },
    errorHandler() {
      return true
    },
    cancel() {
      this.dialogFormVisible = false
    },
    handleAdd() {
      this.edittype = '新增活动'
      this.form = {
        articleId: '',
        activityCount: '',
        userLevel: '',
        enrollStartDate: '',
        enrollEndDate: '',
        introduction: '',
        startDate: '',
        endDate: '',
        gender: '',
        status: ''
      }
      this.dialogFormVisible = true
    },
    onSubmit() {
      this.buttonloading = true
      this.form.articleId = parseInt(this.form.articleId)
      this.form.activityCount = parseInt(this.form.activityCount)
      if (this.edittype === '修改活动信息') {
        this.$store
          .dispatch('editActivity', this.form)
          .then(response => {
            this.buttonloading = false
            const restype = response.code !== '000000' ? 'error' : 'success'
            this.message(response.message, restype)
            window.location.reload()
          })
          .catch(() => {
            this.buttonloading = false
          })
      } else {
        this.$store
          .dispatch('addActivity', this.form)
          .then(response => {
            this.buttonloading = false
            const restype = response.code !== '000000' ? 'error' : 'success'
            this.message(response.message, restype)
            window.location.reload()
          })
          .catch(() => {
            this.buttonloading = false
          })
      }
      this.buttonloading = false
    },
    routerTo(articleId) {
      this.$router.push({
        name: `文章列表`,
        params: {
          newsId: articleId
        }
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
</style>
