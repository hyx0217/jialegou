<template>
  <div>
    <div v-if="show==1" class="login">
      <p>请先登录</p>
      <van-button type="danger" @click="toLogin">登录/注册</van-button>
    </div>
    <div v-else-if="show==2" class="login">
      <p>你还未开店铺</p>
      <van-button type="danger" @click="toBuild">开设店铺</van-button>
    </div>
    <div v-else-if="show==0">
      <home :storeInfo='storeInfo'></home>
    </div>
  </div>
</template>
<script>
import home from '@/components/home.vue'
import store from '../../store.js'
export default {
  components: {
    home
  },
  data() {
    return {
      show: "",
      storeInfo:''
    };
  },
  methods: {
    //跳到注册页
    toLogin() {
      mpvue.navigateTo({
        url: "/pages/login/main"
      });
    },
    //跳到开店页
    toBuild(){
      mpvue.navigateTo({
        url: "/pages/build/main"
      });
    }
  },
  mounted() {
    //判断是否登录id
    if(!store.state.userId){
        this.show = 1;
    }else{
      this.$fly.post(`${this.baseUrl}/store/find`,{
        S_boss:store.state.userId
      }).then(res=>{
        //判断用户是否拥有店铺
          if(res.data.status==200){
              this.show = 0;
              this.storeInfo=res.data.result
          }else{
              this.show=2
          }
      })
    }
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
