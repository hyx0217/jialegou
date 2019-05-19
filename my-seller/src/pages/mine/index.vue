<template>
  <div id='mine'>
    <view class="mine-top">
      <view class="userinfo">
        <button v-if="!hasUserInfo && canIUse" open-type="getUserInfo" @click="getUserInfo"> 获取头像昵称 </button>
        <block v-else>
          <img class="userinfo-avatar" :src="userinfo.U_img" mode="cover">
          <text class="userinfo-nickname">{{userinfo.U_phone}}</text>
        </block>
      </view>
    </view>
    <div style="margin-bottom:30rpx;">
      <van-cell title="我的订单" value='查看全部订单' is-link url="/pages/order/main?active=0" />
      <ul class='mine-pay'>
        <li>
          <a href="../order/main?active=1">
            <van-icon name="pending-payment" />
            <span>待付款</span>
          </a>
        </li>
        <li>
          <a href="../order/main?active=2">
            <van-icon name="free-postage" />
            <span>待发货</span>
          </a>
        </li>
        <li>
          <a href="../order/main?active=3">
            <van-icon name="logistics" />
            <span>待收货</span>
          </a>
        </li>
        <li>
          <a href="../order/main?active=4">
            <van-icon name="comment-o" />
            <span>待评价</span>
          </a>
        </li>
      </ul>
    </div>
    <van-cell title="收货地址" is-link url="/pages/address/main" />
    <van-cell title="我的钱包" is-link />
    <van-cell title="我的消息" is-link />
    <van-cell title="我要开店" is-link />
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
