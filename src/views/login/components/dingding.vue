
<template>
  <div>
    <h3 class="title">
      打开
      <P>钉钉手机App</P>
    </h3>
    <div class="aplain">在「消息」页面，右上角打开扫一扫</div>
    <div id="login_container"></div>
  </div>
</template>

<script>
let url = process.env.VUE_APP_BASE_DING;
let goto = encodeURIComponent(
  `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${process.env.VUE_APP_BASE_APPID}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}`  
);
import { removeToken } from "@/utils/auth";
export default {
  name: "dingding",
  props: ["type"],
  data() {
    return {
      style: ""
    };
  },
  created() {
    let hanndleMessage = function(event) {
      var origin = event.origin;
      if (origin == "https://login.dingtalk.com") {
        //判断是否来自ddLogin扫码事件。
        var loginTmpCode = event.data;
        //获取到loginTmpCode后就可以在这里构造跳转链接进行跳转了
        //window.parent.postMessage(loginTmpCode,'*');
        removeToken();
        window.location.href = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${process.env.VUE_APP_BASE_APPID}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}&loginTmpCode=${loginTmpCode}`;
      }
    };
    if (window.addEventListener != "undefined") {
      window.addEventListener("message", hanndleMessage, false);
    } else if (typeof window.attachEvent != "undefined") {
      window.attachEvent("onmessage", hanndleMessage);
    }
  },
  mounted() {
     setTimeout(function () {
      //调节页面样式
      //二维码的样式必须写在mounted中，因为dom构建完后才能去构建钉钉的二维码链接
      this.type === 1
        ? (this.style =
            "border:none;background-color:#FFFFFF;margin:-40px auto")
        : (this.style =
            "border:none;background-color:#FFFFFF;margin:-40px 0 0 60px");
      DDLogin({
        id: "login_container", //这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
        goto: goto, //请参考注释里的方式
        style: this.style,
        width: "300",
        height: "250",
      });
    }, 10);
  },
};
</script>



<style lang="scss" scoped>
#login_container {
  img {
    display: inline-block;
    height: 142px;
    width: 142px;
    margin: 0 auto;
  }
}
.title {
  width: 154px;
  height: 25px;
  color: #303133;
  line-height: 25px;
  margin: 48px auto;
  margin-bottom: 8px;
  p {
    display: inline;
    color: #267dff;
  }
}
.aplain {
  width: 224px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #909399;
  line-height: 20px;
  margin: 0 auto;
  margin-bottom: 16px;
}
.scan {
  width: 142px;
  height: 142px;
  background: #f5f7fa;
  border-radius: 4px;
  margin: 0 auto;
  margin-bottom: 90px;
}
</style>
