<template>
  <div>
    <div class="login">
      <p>请先登录</p>
      <van-button type="danger" @click="toLogin">登录/注册</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    toLogin() {
      wx.navigateTo({
        url: "/pages/login/main"
      });
    }
  },
  mounted(){
    console.log(this.$root)
  }
};
</script>

<style scoped>
.login {
  width: 200rpx;
  margin: 500rpx auto 0;
}
.login p {
  text-align: center;
  font-size: 32rpx;
  color: #cccccc;
}
</style>
