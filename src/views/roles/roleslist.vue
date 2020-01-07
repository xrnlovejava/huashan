<template>
  <div class="main">
    <el-form :inline="true" :model="roleinfo">
      <el-form-item label="角色ID">
        <el-input v-model="roleinfo.roleId" placeholder="角色ID"/>
      </el-form-item>
      <el-form-item label="角色名称">
        <el-input v-model="roleinfo.roleName" placeholder="角色名称"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getRoleList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" stripe border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" />
      <el-table-column label="ID" width="50">
        <template slot-scope="scope">{{ scope.row.roleId }}</template>
      </el-table-column>
      <el-table-column label="角色名称" width="100">
        <template slot-scope="scope">{{ scope.row.roleName }}</template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">{{ scope.row.descript }}</template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="修改时间">
        <template slot-scope="scope">{{ scope.row.updateTime }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(parseInt(scope.row['roleId']))">删除</el-button>
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
            <el-button plain icon="el-icon-plus" @click="handleAdd()">新增角色</el-button>
          </el-button-group>
        </div>
      </el-col>
      <el-col :span="5" :offset="12">
        <div class="grid-content bg-purple-light">
          <el-button-group>
            <el-button :disabled="roleinfo.pageNum === 1?true:false" plain icon="el-icon-arrow-left" @click="page('up')">上一页</el-button>
            <el-button plain>{{ roleinfo.pageNum }}</el-button>
            <el-button plain @click="page('down')">下一页<i class="el-icon-arrow-right el-icon--right" /></el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogFormVisible" :title="edittype">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="角色ID" style="display:none">
          <el-input :disabled="true" v-model="form.roleId" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="角色名称">
          <el-input v-model="form.roleName" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="描述">
          <el-input v-model="form.descript" auto-complete="off" />
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
      kw: '',
      select: '1',
      dialogFormVisible: false,
      form: {},
      roleinfo: {
        roleId: '',
        roleName: '',
        pageNum: 1,
        pageSize: 10
      },
      edittype: '',
      buttonloading: false,
      formLabelWidth: '80px'
    }
  },
  created: function() {
    this.getRoleList()
  },
  methods: {
    message(msg, type) {
      this.$message({
        message: msg,
        type: type
      })
    },
    getRoleList() {
      this.loading = true
      this.tableData = []
      this.$store.dispatch('getRoleByParam', this.roleinfo).then(response => {
        this.loading = false
        this.tableData = response.result.data
      }).catch(() => {
        this.loading = false
      })
    },
    page(type) {
      if (type === 'up') {
        if (this.roleinfo.pageNum > 1) {
          this.roleinfo.pageNum -= 1
        } else {
          this.message('没有上一页啦', 'warning')
        }
      } else {
        this.roleinfo.pageNum += 1
      }
      this.getRoleList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteMany() {
      if (this.multipleSelection) {
        var ids = '-1'
        this.multipleSelection.forEach(row => {
          ids = ids + ',' + parseInt(row['roleId'])
        })
        this.handleDelete(ids)
      }
    },
    handleEdit(index, row) {
      this.tableData[index].loginPass = ''
      this.edittype = '修改角色信息'
      this.form = this.tableData[index]
      this.currentIndex = index
      this.dialogFormVisible = true
    },
    handleDelete(id) {
      this.$store
        .dispatch('delRole', id)
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
      this.edittype = '新增角色'
      this.form = {
        roleId: '',
        roleName: '',
        descript: ''
      }
      this.dialogFormVisible = true
    },
    onSubmit() {
      this.buttonloading = true
      if (this.edittype === '修改角色信息') {
        this.$store
          .dispatch('editRole', this.form)
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
          .dispatch('addRole', this.form)
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
