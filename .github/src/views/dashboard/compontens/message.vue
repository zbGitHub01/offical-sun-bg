<template>
  <div class="app-container message-container">
    <div class="message-warp warp padding-16">
      <div class="user">
        <div class="user_company">{{departmentName}}</div>
        <h3>
          欢迎您，{{name}}
          <svg-icon v-if="bindThirdStatus===true"  style='width:24px ; height:24px' icon-class="activeDing" />
          <svg-icon v-else style='width:24px ; height:24px' icon-class="dinglogo" />
        </h3>
      </div>
      <div class="logo">
        <div class="logo_time">{{datetime}}</div>
        <div class="user_select">
          <!-- <router-link to="/profile/index">
            <el-button plain style="width: 100px; height: 36px; margin-right: 10px">修改密码</el-button>
          </router-link> -->
          <el-button
            plain
            style="width: 100px; height: 36px; margin-right: 10px"
            @click="logout"
          >退出登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["totalReductionAmount", "departmentName", "name" , 'bindThirdStatus'])
  },
  name: "Message",
  data() {
    return {
      timer: '',
      datetime: ''
    };
  },
  watch: {},
  mounted() {
    this.timer = setInterval(() => {
        this.datetime = this.dayjs().format("YYYY 年 MM 月 DD 日 HH:mm:ss")
      }, 1000)
  },
  beforeDestroy() {
      /* 离开页面前销毁定时器 */
    if(this.timer){
      clearInterval(this.timer);
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      //在绑定钉钉时跳转页面所加上的code必须去除，不然将导致登录时会直接获取code进行钉钉绑定登录
      window.location.search = "";
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.warp{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
}
  .user {
    .user_company {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #909399;
      margin-bottom: 20px;
    }
    h3 {
      margin-bottom: 20px;
    }
    img {
      display: inline-block;
      width: 24px;
      height: 24px;
      padding-top: 4px;
    }
  }
  .logo {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-start;
    .logo_time {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #909399;
      margin-bottom: 20px;
    }
    
  }
</style>
