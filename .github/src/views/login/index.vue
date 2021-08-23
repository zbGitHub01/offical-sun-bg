<template>
  <div class="login-container">
    <div class='left-warp'>
      <div class="title">
          <img src="../../assets/Images/logo.png" />
        </div>
        <div class="remark">
          <img src="../../assets/Images/remark.png" />
        </div>
        <div class="left-img">
          <img src="../../assets/Images/left.png" />
        </div>
    </div>
    <div class='right-warp'>
      <web-login></web-login>
      <!--正常情况下可进行的两种登陆操作 -->
      <!-- <h1 style='margin:0px 0 48px 0'>东岸开发者平台</h1>
        <div class="login">
          <login-form :title="title" ></login-form>
          <div
            class="other"
            :style="style"
            @mouseenter="mouseover"
            @mouseleave="mouseLeave"
          >账号登录</div>
        </div> -->
    </div>
    </div>
</template>

<script>
// import LoginForm from "./components/login-from";
import WebLogin from './components/WebLogin.vue';
export default {
  name: "Login",
  components: {
    // LoginForm,
    WebLogin,
  },
  data() {
    return {
      style: "color:#909399",
      title: "登录",
    };
  },
  mounted() {},
  methods: {
    //鼠标划入事件改变登录方式的颜色
    mouseover() {
      this.style = "color:#267DFF";
    },
    //鼠标划出事件改变登录方式的颜色
    mouseLeave() {
      this.style = "color:#909399";
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  background-image: url("../../assets/Images/bc.png");
  background-position:100%;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  .left-warp{
    width: 60%;
    height: 100%;
  }
  .right-warp{
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;  
    
  }
  img {
    width: 100%;
    height: 100%;
  }
  .title {
    width: 208px;
    height: 56px;
    margin: 60px;
    margin-bottom: 32px;
  }
  .remark {
    width: 366px;
    height: 20px;
    margin:0 60px 32px 60px;
    margin-bottom: 32px;
  }
  .left-img{
    width: 100%;
    // height: 20px;
    padding:0 60px 32px 60px;
    margin-bottom: 32px;
  }
  .login {
    width: 360px;
    height: 401px;
    background: #ffffff;
    border-radius: 4px;
    margin: 0 auto;
    overflow: hidden;
    
    .other {
      width: 84px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #909399;
      line-height: 20px;
      text-align: center;
      margin: 0 auto;
    }
  }
}
</style>