<template>
  <div class="home-wrap">
    <img :src="homeImage"
         alt="东岸科技" />
    <h2>
      {{username}}，欢迎登录东岸科技官网后台管理系统
    </h2>
  </div>
</template>

<script>
import homeImage from '@/assets/Images/home.png'
import { getUsername } from '@/utils/auth.js'
export default {
  data () {
    return {
      homeImage
    }
  },
  computed: {
    username () {
      return getUsername()
    }
  },
  methods: {
  }
}
</script>

<style lang='scss' scoped>
.home-wrap {
  text-align: center;
  width: 100%;
  margin-top: 80px;
  img {
    width: 636px;
    height: 556px;
    margin-bottom: 12px;
  }
}
</style>