<template>
  <div class="main">
    <el-form :inline="true" :model="powerinfo">
      <el-form-item label="权限ID">
        <el-input v-model="powerinfo.powerId" placeholder="权限ID"/>
      </el-form-item>
      <el-form-item label="权限名称">
        <el-input v-model="powerinfo.powerName" placeholder="权限名称"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getPowerList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData" style="width: 100%" stripe border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" />
      <el-table-column label="ID" width="50">
        <template slot-scope="scope">{{ scope.row.powerId }}</template>
      </el-table-column>
      <el-table-column label="权限名称" width="100">
        <template slot-scope="scope">{{ scope.row.powerName }}</template>
      </el-table-column>
      <el-table-column label="等级" width="60">
        <template slot-scope="scope">{{ scope.row.elevel }}</template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column label="修改时间">
        <template slot-scope="scope">{{ scope.row.updateTime }}</template>
      </el-table-column>
      <el-table-column label="父节点ID" width="60">
        <template slot-scope="scope">{{ scope.row.parentId }}</template>
      </el-table-column>
      <el-table-column label="父节点名称">
        <template slot-scope="scope">{{ scope.row.parentName }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(parseInt(scope.row['powerId']))">删除</el-button>
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
            <el-button plain icon="el-icon-plus" @click="handleAdd()">新增权限</el-button>
          </el-button-group>
        </div>
      </el-col>
      <el-col :span="5" :offset="12">
        <div class="grid-content bg-purple-light">
          <el-button-group>
            <el-button :disabled="powerinfo.pageNum === 1?true:false" plain icon="el-icon-arrow-left" @click="page('up')">上一页</el-button>
            <el-button plain>{{ powerinfo.pageNum }}</el-button>
            <el-button plain @click="page('down')">下一页<i class="el-icon-arrow-right el-icon--right" /></el-button>
          </el-button-group>
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogFormVisible" :title="edittype">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="权限ID" style="display:none">
          <el-input :disabled="true" v-model="form.roleId" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="权限名称">
          <el-input v-model="form.powerName" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="权限等级">
          <el-radio v-model="form.elevel" :label="1">等级一</el-radio>
          <el-radio v-model="form.elevel" :label="2">等级二</el-radio>
          <el-radio v-model="form.elevel" :label="3">等级三</el-radio>
          <el-radio v-model="form.elevel" :label="4">等级四</el-radio>
          <el-radio v-model="form.elevel" :label="5">等级五</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="权限对应路径">
          <el-input v-model="form.url" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="权限功能描述">
          <el-input v-model="form.descript" auto-complete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="操作按钮">
          <el-checkbox-group v-model="form.operate">
            <el-checkbox label="1">新增</el-checkbox>
            <el-checkbox label="2">修改</el-checkbox>
            <el-checkbox label="3">删除</el-checkbox>
            <el-checkbox label="4">失效</el-checkbox>
            <el-checkbox label="5">生效</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="父节点">
          <el-select v-model="form.parentId" placeholder="请选择">
            <el-option v-for="item in tableData" :key="item.powerId" :label="item.powerName" :value="item.powerId"/>
          </el-select>
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
      dialogFormVisible: false,
      form: {},
      powerinfo: {
        powerId: '',
        powerName: '',
        pageNum: 1,
        pageSize: 10
      },
      edittype: '',
      buttonloading: false,
      formLabelWidth: '80px'
    }
  },
  created: function() {
    this.getPowerList()
  },
  methods: {
    message(msg, type) {
      this.$message({
        message: msg,
        type: type
      })
    },
    getPowerList() {
      this.loading = true
      this.tableData = []
      this.$store.dispatch('getPowerByParam', this.powerinfo).then(response => {
        this.loading = false
        this.tableData = response.result.data
      }).catch(() => {
        this.loading = false
      })
    },
    page(type) {
      if (type === 'up') {
        if (this.powerinfo.pageNum > 1) {
          this.powerinfo.pageNum -= 1
        } else {
          this.message('没有上一页啦', 'warning')
        }
      } else {
        this.powerinfo.pageNum += 1
      }
      this.getPowerList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteMany() {
      if (this.multipleSelection) {
        var ids = '-1'
        this.multipleSelection.forEach(row => {
          ids = ids + ',' + parseInt(row['powerId'])
        })
        this.handleDelete(ids)
      }
    },
    handleEdit(index, row) {
      this.edittype = '修改权限信息'
      this.form = this.tableData[index]
      if (this.form.operate) {
        this.form.operate = this.form.operate.split('')
      }
      this.currentIndex = index
      this.dialogFormVisible = true
    },
    handleDelete(id) {
      this.$store
        .dispatch('delPower', id)
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
      this.edittype = '新增权限'
      this.form = {
        powerName: '',
        elevel: '',
        parentId: '',
        parentName: '',
        operate: [],
        url: '',
        descript: ''
      }
      this.dialogFormVisible = true
    },
    onSubmit() {
      this.buttonloading = true
      this.form.operate = this.form.operate.join(',')
      console.log(this.form)
      if (this.edittype === '修改权限信息') {
        this.$store
          .dispatch('editPower', this.form)
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
          .dispatch('addPower', this.form)
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
