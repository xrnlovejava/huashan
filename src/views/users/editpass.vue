<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div class="grid-content bg-purple">
          <el-form ref="form" :model="form">
            <el-form-item label="旧密码">
              <el-input v-model="form.oldPwd" />
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="form.newPwd" />
            </el-form-item>
            <el-form-item label="再次输入新密码">
              <el-input v-model="form.newPwdagern" />
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" type="primary" @click="onSubmit">Submit</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        id: sessionStorage.getItem('uid'),
        oldPwd: '',
        newPwd: '',
        newPwdagern: ''
      }
    }
  },
  methods: {
    message(msg, type) {
      this.$message({
        message: msg,
        type: type
      })
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.newPwd !== this.newPwdagern) {
            this.message('新密码两次输入不一致', 'error')
            this.loading = false
            return
          }
          this.$store.dispatch('updatePwd', this.form).then(response => {
            this.loading = false
            const restype = response.code !== '000000' ? 'error' : 'success'
            this.message(response.message, restype)
            this.$router.push({
              path: this.redirect || '/'
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.message('数据为空？', 'error')
          console.log('error submit!!')
          return false
        }
        this.loading = false
      })
    }
  }
}

</script>

<style scoped>
  .line {
    text-align: center;
  }

</style>
