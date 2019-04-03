<template>
    <div id='mine'>
        <view class="mine-top">
            <view class="userinfo">
                <button v-if="!hasUserInfo && canIUse" open-type="getUserInfo" @click="getUserInfo"> 获取头像昵称 </button>
                <block v-else>
                    <image class="userinfo-avatar" :src="userImg" mode="cover"></image>
                    <text class="userinfo-nickname">{{userName}}</text>
                </block>
            </view>
        </view>
        <div style="margin-bottom:30rpx;">
            <van-cell title="我的订单" value='查看全部订单' is-link  url="/pages/order/main"/>
            <ul class='mine-pay'>
                <li>
                   
                    <van-icon name="pending-payment" />
                    <span>待付款</span>
                   
                </li>
                <li>
                   
                    <van-icon name="free-postage" />
                    <span>待发货</span>
                 
                </li>
                <li>
                    <van-icon name="logistics" />
                    <span>待收货</span>
                </li>
                <li>
                    
                    <van-icon name="comment-o" />
                    <span>待评价</span>
                   
                </li>
            </ul>
        </div>
        <van-cell title="收货地址" is-link url="/pages/address/main"/>
        <van-cell title="我的钱包" is-link/>
        <van-cell title="我的消息" is-link/>
        <van-cell title="我要开店" is-link/>
    </div>
</template>
<script>
export default {
    data(){
        return{
            userName:'',//用户昵称
            userImg:''//用户头像
        }
    },
    mounted(){
        let that=this;
        wx.getUserInfo({
        success:function(res){
            that.userImg= res.userInfo.avatarUrl;
            that.userName=res.userInfo.nickName;
            }   
        })
        }
}
</script>
<style>
.mine-top{
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
.mine-pay{
    padding:20rpx 0;
    background: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
}
.mine-pay li{
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.mine-pay li span{
    font-size: 26rpx;
}
</style>
