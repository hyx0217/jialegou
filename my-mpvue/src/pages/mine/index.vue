<template>
  <div id='mine'>
    <view class="mine-top">
      <view class="userinfo">
        <button v-if="!hasUserInfo && canIUse" open-type="getUserInfo" @click="getUserInfo"> 登录 </button>
        <block v-else>
          <image class="userinfo-avatar" :src="userImg" mode="cover"></image>
          <text class="userinfo-nickname">{{userName}}</text>
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
    <van-cell title="我的收藏" is-link url="/pages/likes/main"/>
    <van-cell title="我要开店" is-link @click="goSeller()"/>
  </div>
</template>
<script>
  import store from '../../store'
  export default {
    data() {
      return {
        userName: '', //用户昵称
        userImg: '', //用户头像
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
      }
    },
    methods: {
      goSeller(){
        wx.navigateToMiniProgram({
          appId: 'wx8acbded62e655630',
          envVersion: 'develop',
          success(res) {
            console.log(res)
            // 打开成功
          }
        })
      },
      getUserInfo() {
        let that = this;
        wx.getUserInfo({
          success: function (res) {
            //登陆成功，在数据库创建
            that.$fly.post(`${that.baseUrl}/user`, {
              U_name: res.userInfo.nickName,
              U_img: res.userInfo.avatarUrl
            }).then(res => {
              //将用户Id存入cookie并且存入仓库
              store.commit('login', res.data._id)
              store.commit('name', res.data.U_name)
              wx.setStorage({
                key: "_id",
                data: res.data._id
              });
              wx.setStorage({
                key: "username",
                data: res.data.U_name
              });
            })
            that.userImg = res.userInfo.avatarUrl;
            that.userName = res.userInfo.nickName;
            that.hasUserInfo = true;
          }
        })
      },
    },
    mounted() {
      //存在用户获取
      const that=this
      if(store.state.userId){
        wx.getUserInfo({
          success:function(res){
            that.userImg = res.userInfo.avatarUrl;
            that.userName = res.userInfo.nickName;
            that.hasUserInfo = true;
          }
        })
      }
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
