<template>
  <div class="main">
    <el-form :inline="true" :model="searchInfo">
      <el-form-item label="活动ID">
        <el-input v-model="searchInfo.activityId" placeholder="活动ID" clearable/>
      </el-form-item>
      <el-form-item label="用户ID">
        <el-input v-model="searchInfo.userId" placeholder="报名的用户ID" clearable/>
      </el-form-item>
      <el-form-item label="审批状态">
        <el-select v-model="searchInfo.status" placeholder="审批状态" clearable>
          <el-option :value="0" label="不同意" />
          <el-option :value="1" label="同意" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" stripe border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" />
      <el-table-column label="活动ID" width="100">
        <template slot-scope="scope">{{ scope.row.activityId }}</template>
      </el-table-column>
      <el-table-column label="报名的用户ID">
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column>
      <el-table-column label="审批状态">
        <template slot-scope="scope">{{ scope.row.status==0?"不同意":"同意" }}</template>
      </el-table-column>
      <el-table-column label="相关信息" width="110">
        <template slot-scope="scope">
          <el-button size="mini" @click="routerTo('文章列表', scope.row.activityId)">相关活动</el-button>
        </template>
      </el-table-column>
      <el-table-column label="主键ID">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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
            <el-button plain icon="el-icon-plus" @click="handleAdd()">新增报名</el-button>
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
        <el-form-item :label-width="formLabelWidth" label="活动">
          <el-select v-model="form.activityId" placeholder="请选择活动">
            <el-option v-for="item in newsTableData" :key="item.activityId" :label="item.title" :value="item.activityId"/>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="报名的用户ID">
          <el-input v-model="form.userId" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="审批状态">
          <el-radio v-model="form.status" :label="0">不同意</el-radio>
          <el-radio v-model="form.status" :label="1">同意</el-radio>
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
        userId: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogFormVisible: false,
      form: {},
      edittype: '',
      newsTableData: [],
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
      this.$store.dispatch('getAecByParam', this.searchInfo).then(response => {
        this.loading = false
        this.tableData = response.result.data
      }).catch(() => {
        this.loading = false
      })
    },
    getActivityList() {
      const data = {
        pageSize: 100,
        pageNum: 1,
        articleType: 1
      }
      this.$store.dispatch('getActivityList', data).then(response => {
        this.newsTableData = response.result.data
      }).catch((e) => {
        console.log(e)
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
    handleEdit(row) {
      this.edittype = '修改报名信息'
      this.form = row
      this.getActivityList()
      this.dialogFormVisible = true
    },
    handleDelete(id) {
      this.$store.dispatch('delAec', id).then(response => {
        const restype = response.code !== '000000' ? 'error' : 'success'
        this.message(response.message, restype)
        window.location.reload()
      }).catch(() => {
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
      this.edittype = '新增报名'
      this.form = {
        activityId: '',
        userId: '',
        status: ''
      }
      this.getActivityList()
      this.dialogFormVisible = true
    },
    onSubmit() {
      this.buttonloading = true
      this.form.userId = parseInt(this.form.userId)
      if (this.edittype === '修改报名信息') {
        this.$store.dispatch('editAec', this.form).then(response => {
          this.buttonloading = false
          const restype = response.code !== '000000' ? 'error' : 'success'
          this.message(response.message, restype)
          window.location.reload()
        }).catch(() => {
          this.buttonloading = false
        })
      } else {
        this.$store.dispatch('addAec', this.form).then(response => {
          this.buttonloading = false
          const restype = response.code !== '000000' ? 'error' : 'success'
          this.message(response.message, restype)
          window.location.reload()
        }).catch(() => {
          this.buttonloading = false
        })
      }
      this.buttonloading = false
    },
    routerTo(name, activityId) {
      this.$router.push({
        name: name,
        params: {
          activityId: activityId
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
