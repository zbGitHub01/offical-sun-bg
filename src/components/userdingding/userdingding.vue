
<template>
  <div>
    <div class="aplain">已绑定钉钉账号</div>
    <div class="img">
      <img :src="avatar === ''? defalutImg: avatar"  />
    </div>
    <div class="name">{{name}}</div>
    <div class="btn">
      <el-button type="primary" plain @click="unBind">解除绑定</el-button>
    </div>
  </div>
</template>

<script>
import defalutImg from "@/assets/Images/bluelogo.png"
export default {
  props:['avatar','name'],
  data() {
    return{
      defalutImg:defalutImg
    }
  },
  watch: {

  },
  mounted() {
  },
  methods: {
    unBind() {
      this.$store.dispatch("user/unBind")
      .then(() => {
        this.$router.go()
      })
      .catch(() => {
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.aplain {
  height: 25px;
  text-align: center;
  font-size: 18px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #303133;
  line-height: 25px;
  margin-bottom: 16px;
}
.img {
  width: 142px;
  height: 142px;
  background: #f5f7fa;
  border-radius: 4px;
  margin: 0 auto;
  margin-bottom: 16px;
  img {
    width: 100%;
    height: 100%;
  }
}
.name {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #606266;
  line-height: 20px;
  margin: 0 auto;
  margin-bottom: 16px;
  text-align: center;
}
.btn {
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
</style>
