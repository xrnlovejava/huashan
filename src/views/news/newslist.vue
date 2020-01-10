<template>
  <div class="main">
    <el-form :inline="true" :model="newsinfo">
      <el-form-item label="文章ID">
        <el-input v-model="newsinfo.id" placeholder="id"/>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="newsinfo.title" placeholder="title"/>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="newsinfo.author" placeholder="author"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="newsinfo.status" placeholder="status" clearable>
          <el-option :value="1" label="已发布" />
          <el-option :value="0" label="未发布" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getNewsList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" stripe border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" />
      <el-table-column label="文章标题" >
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column label="作者" width="150">
        <template slot-scope="scope">{{ scope.row.author }}</template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">{{ scope.row.status==1?"已发布":"未发布" }}</template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.newsId)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.newsId)">删除</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      tableData: [],
      multipleSelection: [],
      form: {},
      newsinfo: {
        id: '',
        author: '',
        title: '',
        status: ''
      },
      buttonloading: false
    }
  },
  created: function() {
    this.getNewsList()
  },
  methods: {
    message(msg, type) {
      this.$message({
        message: msg,
        type: type
      })
    },
    handleEdit(newsId) {
      this.$router.push({
        path: `/news/editnews/${newsId}`
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
      this.$store.dispatch('getNewsByParam', this.newsinfo).then(response => {
        this.loading = false
        this.tableData = response.result.data
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
          ids = ids + ',' + row.newsId
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
