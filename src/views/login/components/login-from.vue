<template>
  <div>
    <h3 class="login-item">{{title}}</h3>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="form-login"
      auto-complete="off"
    >
      <!-- 账号绑定钉钉的账号后登陆 -->
      <template v-if="status===1">
        <el-form-item prop="userPhone">
          <el-input  clearable
            ref="userPhone"
            v-model="loginForm.userPhone"
            placeholder="请输入手机号"
            name="userPhone"
            type="text"
            tabindex="1"
          />
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input  clearable
            ref="captcha"
            v-model="loginForm.captcha"
            placeholder="请输入验证码"
            name="captcha"
            tabindex="2"
            @keyup.enter.native="handleLogin"
            style="width: 154px"
          />
          <el-button
            plain
            style="width: 102px; margin-left: 8px"
            :disabled="disabled"
            @click="handleSms"
          >{{smsTxt}}</el-button>
        </el-form-item>
      </template>
      <!-- 账号绑定钉钉 -->
      <template v-else>
        <el-form-item prop="userPhone">
          <el-input  clearable
            ref="userPhone"
            v-model="loginForm.userPhone"
            placeholder="请输入手机号"
            name="userPhone"
            type="text"
            tabindex="1"
          />
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input  clearable
            ref="captcha"
            v-model="loginForm.captcha"
            placeholder="请输入验证码"
            name="captcha"
            tabindex="2"
            @keyup.enter.native="handleLogin"
            style="width: 154px"
          />
          <el-button
            plain
            style="width: 102px; margin-left: 8px"
            :disabled="disabled"
            @click="handleSms"
          >{{smsTxt}}</el-button>
        </el-form-item>
      </template>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; height: 36px; margin-bottom: 40px"
        @click.native.prevent="handleLogin"
      >{{title}}</el-button>
    </el-form>
  </div>
</template>

<script>
import { getSmsCode } from "@/api/user";
 const validateUsername = (rule, value, callback) => {
      if (value.length === 11 ){
        callback();
      } else{
        callback(new Error("请输入11位手机号"));
      }
    };
const validateCode = (rule, value, callback) => {
  if (value.length === 6 ){
    callback();
  }else{
    callback(new Error("请输入6位验证码"));
  }
};
export default {
  name: "Login-from",
  props: ["title", "status" ,"openId"],
  data() {
    //账号，密码验证码校验
   
    return {
      loginForm: {
        userPhone: "",
        openId: this.openId,
        captcha: ""
      },
      loginRules: {
        userPhone: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        captcha: [{ required: true, trigger: "blur", validator: validateCode }]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      smsTxt: "获取验证码",
      disabled: false
    };
  },
  //通过观察路由的变化来实现路由跳转
  watch: {},
  methods: {
    //密码是否显示，现阶段不需要预留的口
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    //登录回调书写
      handleLogin() {
      if (this.loginForm.userPhone.length === 0) {
          this.$message.error('请输入手机号码')
      } else if (this.loginForm.captcha.length === 0) {
          this.$message.error('请输入验证码')
      }else{
        this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          //调用user模块红的login
          //console.log("点击登陆按钮");
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              //console.log("登录成功");
              this.$router.push({ path: this.redirect || "/dashboard" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
      }
      
    },
    //获取验证码
    handleSms() {
      if (this.loginForm.userPhone === "") {
        this.$message.error("请输入手机号码");
        return;
      }
      let params = {
        userPhone: this.loginForm.userPhone
      };
      let _this = this;
      if (_this.smsTxt != "获取验证码") {
        return;
      }
      getSmsCode(params).then(res => {
        if (res.code === 200) {
          _this.$message.success(
            "验证码已发送，请留意接收验证码的手机号【" +
              this.loginForm.userPhone +
              "】"
          );
          _this.disabled = true;
          //倒计时
          let min = 60;
          var t = setInterval(function() {
            _this.smsTxt = min-- + "秒后重新获取";
            if (min === 0) {
              _this.smsTxt = "获取验证码";
              _this.disabled = false;
              clearInterval(t);
            }
          }, 1000);
        } else {
          _this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.login-item {
  height: 25px;
  margin: 48px auto;
  margin-bottom: 24px;
  text-align: center;
}
.form-login {
  width: 264px;
  height: 252px;
  margin: 0 auto;
  .login-num {
    width: 264px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
  }
}
.el-button {
  padding: 12px 0px;
  font-size: 12px;
}
</style>