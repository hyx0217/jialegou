<template>
  <div>
    <div class="top">
      <h3>今日业绩</h3>
      <van-row>
        <van-col span="8">
          <p>支付订单数</p>
          <p>{{storeInfo.S_order}}</p>
        </van-col>
        <van-col span="8">
          <p>支付金额(元)</p>
          <p>{{storeInfo.S_income}}</p>
        </van-col>
        <van-col span="8">
          <p>店铺余额(元)</p>
          <p>{{storeInfo.S_money}}</p>
        </van-col>
      </van-row>
    </div>
    <div class="mid">
      <van-row>
        <van-col span="8" @click="toGoods()">
          <van-icon name="shop-o" size="70rpx"/>
          <p>商品管理</p>
        </van-col>
        <van-col span="8">
          <van-icon name="wap-home" size="70rpx"/>
          <p>店铺管理</p>
        </van-col>
        <van-col span="8">
          <van-icon name="paid" size="70rpx"/>
          <p>订单管理</p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ["storeInfo"],
  data() {
      return{

      }
  },
  methods: {
    toGoods() {
      mpvue.navigateTo({
        url: "/pages/goods/main"
      });
    }
  }
};
</script>

<style>
.top {
  background-color: rgb(255, 0, 0);
  width: 90%;
  margin: 0 auto;
  border-radius: 20rpx;
  height: 250rpx;
}
.top h3 {
  color: aliceblue;
  padding-top: 25rpx;
  margin-bottom: 35rpx;
}
.top p {
  color: aliceblue;
  font-size: 32rpx;
  text-align: center;
}
.mid {
  background-color: #d6d0d0;
  width: 90%;
  margin: 30rpx auto;
  border-radius: 20rpx;
  height: 250rpx;
  text-align: center;
  font-size: 30rpx;
}
</style>
