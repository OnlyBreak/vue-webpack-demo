<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       欢迎登录
      </span>
      <el-row>
        <el-input
          v-model="account"
          placeholder="账号"
          type="text">
        </el-input>
        <el-input
          v-model="password"
          placeholder="密码"
          type="password">
        </el-input>
        <el-button type="primary" v-on:click="login">登录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },

  methods: {
    login () {
      let data = {
        name: this.account,
        password: this.password
      }

      this.$http.post('/auth/user', data).then((res) => {
        console.log('--res', res)
        if (res.data.success) {
          sessionStorage.setItem('demo-token', res.data.token)
          this.$message({
            type: 'success',
            message: '登录成功！'
          })
          this.$router.push('/todolist')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-row {
    .content {
      padding: 16px;
    }
  }
  .title {
    font-size: 28px;
  }
  .el-input {
    margin: 12px 0;
  }
  .el-button {
    width: 100%;
    margin-top: 12px;
  }
</style>
