<template>
  <div id='mine'>
    <view class="mine-top">
      <view class="userinfo">
        <button v-if="!hasUserInfo && canIUse" open-type="getUserInfo" @click="getUserInfo"> 获取头像昵称 </button>
        <block v-else>
          <img class="userinfo-avatar" src="/static/images/user.png" mode="cover">
          <text class="userinfo-nickname">{{userinfo.U_phone}}</text>
        </block>
      </view>
    </view>
    <van-cell title="我的店铺" is-link url="/pages/home/main"/>
    <van-cell title="我的钱包" is-link />
    <van-cell title="我要购买"  @click="goBuy()" is-link />
    <div v-if="id">
        <van-button type='danger' size='large' @click='outUser'>退出登录</van-button>
    </div>
    <div v-else>
        <a href='/pages/login/main'><van-button type='danger' size='large'>登录</van-button></a>
    </div>
  </div>
</template>
<script>
  import store from '../../store'
  export default {
    data() {
      return {
        id:store.state.userId,
        userinfo: ''
      }
    },
    methods: {
      goBuy(){
        wx.navigateToMiniProgram({
          appId: 'wxe40708a721b67cba',
          envVersion: 'develop',
          success(res) {
            console.log(res)
            // 打开成功
          }
        })
      },
      getUser() {
        if (store.state.userId) {
          this.$fly.get(`${this.baseUrl}/seller/${store.state.userId}`).then(res => {
            this.userinfo = res.data.result
          })
        }else{
          this.id='';
          this.userinfo={};
        }
      },
      outUser() {
        var that=this;
        mpvue.removeStorage({
          key: '_id',
          success(res) {
            store.commit('login', '')
            that.getUser()
          }
        })
      }
    },
    onShow() {
      this.id=store.state.userId,
      this.getUser()
    }
  }

</script>
<style>
  .mine-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 100rpx 0;
    box-sizing: border-box;
  }

  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .userinfo-avatar {
    width: 128rpx;
    height: 128rpx;
    margin: 20rpx;
    border-radius: 50%;
  }

  .userinfo-nickname {
    color: #aaa;
  }

  .mine-pay {
    padding: 20rpx 0;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .mine-pay li {
    width: 20%;

  }

  .mine-pay li a {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mine-pay li span {
    font-size: 26rpx;
  }

</style>
