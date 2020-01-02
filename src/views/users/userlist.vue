<template>
  <div class="main">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-input v-model="kw" placeholder="请输入内容" class="input-with-select">
            <el-select slot="prepend" v-model="select" placeholder="请选择">
              <el-option label="姓名" value="1" />
              <el-option label="手机号" value="2" />
            </el-select>
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </div>
      </el-col>
      <el-col :span="10" :offset="6">
        <div class="grid-content bg-purple-light">
          <el-button-group>
            <el-button plain icon="el-icon-delete" @click="deleteMany()">删除所选</el-button>
            <el-button plain icon="el-icon-delete">保留按钮</el-button>
          </el-button-group>
          <el-button-group>
            <el-button plain icon="el-icon-arrow-left">上一页</el-button>
            <el-button plain>
              下一页
              <i class="el-icon-arrow-right el-icon--right" />
            </el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>
    <br >
    <el-table v-loading="loading" :data="tableData" style="width: 100%" stripe border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" />
      <el-table-column label="UID" width="50">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="userNo" width="55">
        <template slot-scope="scope">{{ scope.row.userNo }}</template>
      </el-table-column>
      <el-table-column label="nickName">
        <template slot-scope="scope">{{ scope.row.nickName }}</template>
      </el-table-column>
      <el-table-column label="fullName">
        <template slot-scope="scope">{{ scope.row.fullName }}</template>
      </el-table-column>
      <el-table-column label="phone">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="introduction">
        <template slot-scope="scope">{{ scope.row.introduction }}</template>
      </el-table-column>
      <el-table-column label="birthday">
        <template slot-scope="scope">{{ scope.row.birthday }}</template>
      </el-table-column>
      <el-table-column label="gender">
        <template slot-scope="scope">{{ scope.row.gender }}</template>
      </el-table-column>
      <el-table-column label="status">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" active-color="#13ce66" inactive-color="#ff4949" @change="statusChange(scope.row)"/>
          {{ scope.row.status==1?"启用":"停用" }}
        </template>
      </el-table-column>
      <el-table-column label="userType">
        <template slot-scope="scope">{{ scope.row.userType }}</template>
      </el-table-column>
      <el-table-column label="avatar">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:60px;" >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(parseInt(scope.row['id']))">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24">
      <div class="el-table-add-row" style="width: 99.2%;" @click="handleAdd()">
        <span>+ 添加</span>
      </div>
    </el-col>
    <el-dialog :visible.sync="dialogFormVisible" :title="edittype">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="userNo">
          <el-input v-model="form.userNo" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="nickName">
          <el-input v-model="form.nickName" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="loginPass">
          <el-input v-model="form.loginPass" auto-complete="off" placeholder="如不需要修改请留空"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="fullName">
          <el-input v-model="form.fullName" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="phone">
          <el-input v-model="form.phone" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="introduction">
          <el-input v-model="form.introduction" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="birthday">
          <el-date-picker v-model="form.birthday" type="date" placeholder="birthday" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="gender">
          <el-radio v-model="form.gender" :label="1">男</el-radio>
          <el-radio v-model="form.gender" :label="2">女</el-radio>
          <el-radio v-model="form.gender" :label="0">保密</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="avatar">
          <el-input v-model="form.avatar" auto-complete="off" />
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
      nickName: '',
      operatorBut: 0,
      pageNum: 1,
      pageSize: 10,
      id: '',
      fullName: '',
      phone: '',
      status: '',
      userType: '',
      loading: true,
      tableData: [],
      multipleSelection: [],
      kw: '',
      select: '1',
      dialogFormVisible: false,
      form: {},
      edittype: '',
      buttonloading: false,
      formLabelWidth: '80px'
    }
  },
  created: function() {
    const userinfo = {
      nickName: '',
      operatorBut: 0,
      pageNum: 1,
      pageSize: 10,
      id: '',
      fullName: '',
      phone: '',
      status: '',
      userType: ''
    }
    this.$store
      .dispatch('getByParam', userinfo)
      .then(response => {
        this.loading = false
        this.tableData = response.result.data
      })
      .catch(() => {
        this.loading = false
      })
  },
  methods: {
    message(msg, type) {
      this.$message({
        message: msg,
        type: type
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteMany() {
      if (this.multipleSelection) {
        var ids = '-1'
        this.multipleSelection.forEach(row => {
          ids = ids + ',' + parseInt(row['id'])
        })
        this.handleDelete(ids)
      }
    },
    handleEdit(index, row) {
      this.tableData[index].loginPass = ''
      this.edittype = '修改用户信息'
      this.form = this.tableData[index]
      this.currentIndex = index
      this.dialogFormVisible = true
    },
    statusChange(row) {
      this.$store
        .dispatch('updateStatus', row)
        .then(response => {
          this.buttonloading = false
          const restype = response.code !== '000000' ? 'error' : 'success'
          this.message(response.message, restype)
        })
        .catch(() => {
          this.buttonloading = false
        })
    },
    handleDelete(id) {
      this.$store
        .dispatch('delUser', id)
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
      this.edittype = '新增用户'
      this.form = {
        userNo: '',
        nickName: '',
        loginPass: '',
        fullName: '',
        phone: '',
        introduction: '',
        birthday: '',
        gender: 0,
        avatar: ''
      }
      this.dialogFormVisible = true
    },
    onSubmit() {
      this.buttonloading = true
      if (this.edittype === '修改用户信息') {
        if (this.form['loginPass'] === '') {
          delete this.form['loginPass']
        }
        this.$store
          .dispatch('editUser', this.form)
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
          .dispatch('addUser', this.form)
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
  margin-top: 10px;
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
