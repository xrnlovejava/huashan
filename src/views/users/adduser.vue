<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="userNo">
        <el-input v-model="form.userNo" />
      </el-form-item>
      <el-form-item label="nickName">
        <el-input v-model="form.nickName" />
      </el-form-item>
      <el-form-item label="loginPass">
        <el-input v-model="form.loginPass" />
      </el-form-item>
      <el-form-item label="fullName">
        <el-input v-model="form.fullName" />
      </el-form-item>
      <el-form-item label="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="introduction">
        <el-input v-model="form.introduction" />
      </el-form-item>
      <el-form-item label="birthday">
        <el-date-picker v-model="form.birthday" type="date" placeholder="birthday" value-format="yyyy-MM-dd" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="gender">
        <el-radio v-model="form.gender" :label="1">男</el-radio>
        <el-radio v-model="form.gender" :label="2">女</el-radio>
        <el-radio v-model="form.gender" :label="0">保密</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        userNo: '',
        nickName: '',
        loginPass: '',
        fullName: '',
        phone: '',
        introduction: '',
        birthday: '',
        gender: '0'
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
          this.$store.dispatch('addUser', this.form).then(response => {
            this.loading = false
            const restype = response.code !== '000000' ? 'error' : 'success'
            this.message(response.message, restype)
            this.$router.push({
              path: this.redirect || '/users/adduser'
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.message('数据为空？', 'error')
          console.log('error submit!!')
          return false
        }
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
