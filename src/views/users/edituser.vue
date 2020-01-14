<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="userNo">
        <el-input v-model="form.userNo" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickName" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.fullName" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="form.introduction" />
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker v-model="form.birthday" type="date" value-format="yyyy-MM-dd" placeholder="birthday" style="width: 100%;" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.gender" :label="1">男</el-radio>
        <el-radio v-model="form.gender" :label="2">女</el-radio>
        <el-radio v-model="form.gender" :label="0">保密</el-radio>
      </el-form-item>
      <el-form-item label="头像">
        <el-input v-model="form.avatar" auto-complete="off" placeholder="输入头像链接或直接上传"/>
        <img v-if="form.avatar" :src="form.avatar" class="circleImg" >
        <input ref="avatarInput" type="file" accept="image/*" @change="imgChange($event)" >
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
        id: sessionStorage.getItem('uid'),
        userNo: this.$store.getters.userno,
        nickName: this.$store.getters.nickname,
        fullName: this.$store.getters.fullname,
        phone: this.$store.getters.phone,
        introduction: this.$store.getters.introduction,
        birthday: this.$store.getters.birthday,
        gender: this.$store.getters.gender,
        avatar: this.$store.getters.avatar
      }
    }
  },
  created: function() {},
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
          this.$store.dispatch('editUser', this.form).then(response => {
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
      })
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

<style scoped>
  .line {
    text-align: center;
  }

</style>
