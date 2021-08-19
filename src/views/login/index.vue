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
      <!--正常情况下可进行的两种登陆操作 -->
      <h1 style='margin:0px 0 48px 0'>须弥平台(CPC)业务调解系统</h1>
      <template v-if="status === 1">
        <div class="login">
          <login-form :title="title" :openId ='openId' :status="status" v-if="type == 1"></login-form>
          <ding-ding :type="0" v-if="type == 2"></ding-ding>
          <div
            class="other"
            v-if="type == 1"
            @click="handleClick"
            :style="style"
            @mouseenter="mouseover"
            @mouseleave="mouseLeave"
          >钉钉扫码登录</div>
          <div
            class="other"
            v-if="type == 2"
            @click="handleClick"
            :style="style"
            @mouseenter="mouseover"
            @mouseleave="mouseLeave"
          >账号登录</div>
        </div>
      </template>
      <!--钉钉绑定回调所显示的页面 无token的情况-->
      <template v-if="status === 2">
        <div class="login">
          <login-form :title="title" :openId='openId'  :status="status"></login-form>
        </div>
      </template>
      <!--钉钉绑定回调所显示的页面 有token的情况 -->
      <template v-else>
        <div></div>
      </template>
    </div>
  </div>
</template>

<script>
import LoginForm from "./components/login-from";
import DingDing from "./components/dingding";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  computed: {
    ...mapGetters(["userId", "openId"])
  },
  components: {
    LoginForm,
    DingDing
  },
  data() {
    return {
      type: 2,
      status: 1,
      style: "color:#909399",
      title: "登录",
    };
  },
  mounted() {},
  created() {
    //检测登录方式
    if (window.location.search.split("=")[0].split("?")[1] ==='token') {
      let params = {
        uniqueCode:window.location.search.split("=")[1]
      }
      this.$store.dispatch("user/automatic", params)
      .then(() => {
        this.$router.push({ path: this.redirect || "/dashboard" });
      })
    }else if(window.location.search.split("=")[0].split("?")[1] ==='code'){
      let code = window.location.search.split("=")[1].split("&")[0];
      this.status = 3;
      let params = {
        code: code, 
        clientId: "调解中心管理",
        clientSecret: "调解中心管理",
        type:3 
      }
      this.$store.dispatch("user/thirdLogin", params)
      .then(() => {
        if(this.userId===0){
          this.status = 2;
          this.title = "绑定平台账号";
        }else{
          this.$router.push({ path: this.redirect || "/dashboard" });
        }
      })
    }else{
      this.type = 2;
    }
  },
  methods: {
    //点击切换登录方式
    handleClick() {
      if (this.type === 1) {
        this.type = 2;
        this.style = "color:#909399";
      } else {
        // location.reload();
        this.type = 1;
        this.style = "color:#909399";
      }
    },
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