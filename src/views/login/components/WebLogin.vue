<template>
  <div class="web-wrap">
    <h1 style='margin:0px 0 48px 0'>东岸科技官网后台管理系统</h1>
    <div class="login-wrap">
      <h3 class="login-title">{{title}}</h3>
      <el-form ref="form"
               class="form-wrap"
               :rules="form.rules"
               :model="form.data">
        <el-form-item prop="username">
          <el-input v-model="form.data.username"
                    placeholder="请输入用户账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.data.password"
                    type="password"
                    placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button :loading="loading"
                   type="primary"
                   style="width: 100%; height: 36px"
                   @click.native.prevent="onLogin">{{title}}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WebLogin',
  methods: {
    onLogin () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.adminLogin()
        }
      })
    },
    adminLogin () {
      const params = {
        ...this.form.data
      }
      const callback1 = () => {
        this.$router.push({ path: "/dashboard" });
      }
      const callback2 = () => {
        this.loading = false;
      }
      this.$store.dispatch("user/login", { params, callback1, callback2 })
    },

  },
  data () {
    return {
      title: '登录',
      loading: false,
      form: {
        rules: Object.freeze({
          username: [
            { required: true, message: '请输入用户账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }),
        data: {
          username: '',
          password: ''
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.login-wrap {
  padding: 0 48px;
  width: 360px;
  height: 400px;
  background: #ffffff;
  border-radius: 4px;
  margin: 0 auto;
  overflow: hidden;
  .login-title {
    margin: 48px auto 24px;
    text-align: center;
  }
}
</style>