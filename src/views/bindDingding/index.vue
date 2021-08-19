
<template>
  <div class="app-container message-container">
    <div class="warp">
      <div class="logo">
        <img src="../../assets/Images/dinglogo.png">
      </div>
      <div class="name">钉钉</div>
      <div class="code" />
      <div class="aplain">手机扫码绑定</div>
    </div>
    <!-- <div class="ding-warp">
                      <user-ding></user-ding>
                    </div> -->
    <div class="login-warp">
      <div class="img">
        <img src="../../assets/Images/dingding.png">
      </div>
      <div class="line" />
      <div class="login">
        <template  v-if='bindThirdStatus===false'>
            <ding-ding :type='1' />
        </template>
        <template v-else>
            <user-ding :avatar='avatar' :name='name' ></user-ding>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import UserDing from '@/components/userdingding/userdingding'
import DingDing from '../login/components/dingding'
import { mapGetters } from "vuex";
export default {
  name: 'BindDingding',
  components: {
    DingDing,
    UserDing
  },
  computed: {
    ...mapGetters(["avatar", "bindThirdStatus", "name"])
  },
  data() {
    return {
      data() {
        return {
        }
      },
    }
  },
  mounted(){
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
  
  }
}
</script>
<style lang="scss" scoped>

  .warp {
    width: 100%;
    height: 48px;
    margin: 32px 0 64px 44px;
    display: flex;
    justify-content: flex-start;
    flex-direction: inherit;
    align-items: center;
    .logo {
      height: 48px;
      line-height: 48px;
      margin-right: 16px;
    }
    .name {
      font-size: 28px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #267dff;
      line-height: 40px;
      margin-right: 10px;
    }
    .code {
      width: 4px;
      height: 4px;
      background: #267dff;
      margin-right: 10px;
    }
    .aplain {
      height: 33px;
      font-size: 24px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #267dff;
      line-height: 33px;
    }
  }
  .ding-warp{
    height: 524px;
    margin: 0 auto;
    padding-bottom: 44px;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .login-warp {
    height: 524px;
    margin: 0 auto;
    padding-left: 180px;
    padding-bottom: 44px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    .img {
      img {
        width: 100%;
        height: 420px;
      }
    }
    .line {
      width: 1px;
      height: 160px;
      background-color: #dcdfe6;
      margin-left: 160px;
    }
    .login{
      margin-left: 160px;
    }
  }

  .document-btn {
    flex-shrink: 0;
    display: block;
    cursor: pointer;
    background: black;
    color: white;
    height: 60px;
    padding: 0 16px;
    margin: 16px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;
  }
</style>
