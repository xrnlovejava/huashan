<template>
  <div class="main">
    <el-form :inline="true" :model="userinfo">
      <el-form-item label="ID">
        <el-input v-model="userinfo.id" placeholder="用户ID"/>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="userinfo.nickName" placeholder="昵称"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="userinfo.fullName" placeholder="姓名"/>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="userinfo.phone" placeholder="手机号"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="userinfo.status" placeholder="账号状态" clearable>
          <el-option :value="1" label="启用" />
          <el-option :value="0" label="停用" />
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="userinfo.userType" placeholder="用户类型" clearable>
          <el-option :value="0" label="普通用户" />
          <el-option :value="1" label="VIP用户" />
          <el-option :value="2" label="白金VIP用户" />
          <el-option :value="3" label="黄金VIP用户" />
          <el-option :value="4" label="铂金VIP用户" />
          <el-option :value="5" label="钻石用户" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUserList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" stripe border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" />
      <el-table-column label="UID" width="50">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="userNo" width="55">
        <template slot-scope="scope">{{ scope.row.userNo }}</template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">{{ scope.row.nickName }}</template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">{{ scope.row.fullName }}</template>
      </el-table-column>
      <el-table-column label="电话">
        <template slot-scope="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="简介">
        <template slot-scope="scope">{{ scope.row.introduction }}</template>
      </el-table-column>
      <el-table-column label="生日">
        <template slot-scope="scope">{{ scope.row.birthday }}</template>
      </el-table-column>
      <el-table-column label="性别" width="50">
        <template slot-scope="scope">
          <div v-if="scope.row.gender == 0">保密</div>
          <div v-if="scope.row.gender == 1">男</div>
          <div v-if="scope.row.gender == 2">女</div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2" active-color="#13ce66" inactive-color="#ff4949" @change="statusChange(scope.row)"/>
          {{ scope.row.status==1?"启用":"停用" }}
        </template>
      </el-table-column>
      <el-table-column label="用户类型">
        <template slot-scope="scope">
          <el-select v-model="scope.row.userType" placeholder="请选择" @change="usertypeChange(scope.row)">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="头像" width="77">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" class="circleImg" >
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
    <br><br><br>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button-group>
            <el-button plain icon="el-icon-delete" @click="deleteMany()">删除所选</el-button>
            <el-button plain icon="el-icon-plus" @click="handleAdd()">新增用户</el-button>
          </el-button-group>
        </div>
      </el-col>
      <el-col :span="5" :offset="12">
        <div class="grid-content bg-purple-light">
          <el-button-group>
            <el-button :disabled="userinfo.pageNum === 1?true:false" plain icon="el-icon-arrow-left" @click="page('up')">上一页</el-button>
            <el-button plain>{{ userinfo.pageNum }}</el-button>
            <el-button plain @click="page('down')">下一页<i class="el-icon-arrow-right el-icon--right" /></el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogFormVisible" :title="edittype">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="userNo">
          <el-input v-model="form.userNo" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="昵称">
          <el-input v-model="form.nickName" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码">
          <el-input v-model="form.loginPass" auto-complete="off" placeholder="如不需要修改请留空"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="姓名">
          <el-input v-model="form.fullName" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="电话">
          <el-input v-model="form.phone" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="简介">
          <el-input v-model="form.introduction" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="生日">
          <el-date-picker v-model="form.birthday" type="date" placeholder="birthday" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="form.gender" :label="1">男</el-radio>
          <el-radio v-model="form.gender" :label="2">女</el-radio>
          <el-radio v-model="form.gender" :label="0">保密</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="头像">
          <el-input v-model="form.avatar" auto-complete="off" placeholder="输入头像链接或直接上传"/>
          <img v-if="form.avatar" :src="form.avatar" class="circleImg" >
          <input ref="avatarInput" type="file" accept="image/*" @change="imgChange($event)" >
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
      userinfo: {
        nickName: '',
        operatorBut: 0,
        pageNum: 1,
        pageSize: 10,
        id: '',
        fullName: '',
        phone: '',
        status: '',
        userType: ''
      },
      edittype: '',
      buttonloading: false,
      formLabelWidth: '80px',
      options: [{
        value: 0,
        label: '普通用户'
      }, {
        value: 1,
        label: 'VIP用户'
      }, {
        value: 2,
        label: '白金VIP用户'
      }, {
        value: 3,
        label: '黄金VIP用户'
      }, {
        value: 4,
        label: '铂金VIP用户'
      }, {
        value: 5,
        label: '钻石用户'
      }]
    }
  },
  created: function() {
    this.getUserList()
  },
  methods: {
    message(msg, type) {
      this.$message({
        message: msg,
        type: type
      })
    },
    getUserList() {
      this.loading = true
      this.tableData = []
      this.$store.dispatch('getByParam', this.userinfo).then(response => {
        this.loading = false
        this.tableData = response.result.data
      }).catch(() => {
        this.loading = false
      })
    },
    page(type) {
      if (type === 'up') {
        if (this.userinfo.pageNum > 1) {
          this.userinfo.pageNum -= 1
        } else {
          this.message('没有上一页啦', 'warning')
        }
      } else {
        this.userinfo.pageNum += 1
      }
      this.getUserList()
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
    usertypeChange(row) {
      this.$store
        .dispatch('updateUserType', row)
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
    },
    imgChange(files) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', files.target.files[0])
      this.$store.dispatch('uploadImg', formdata).then(response => {
        // 反写返回的图片链接
        this.form.avatar = response.result
        this.message('图片上传成功', 'success')
      }).catch(() => {
        this.message('图片上传失败', 'error')
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
  border-radius: 30px;
  width:55px;
  height:55px;
}
</style>
