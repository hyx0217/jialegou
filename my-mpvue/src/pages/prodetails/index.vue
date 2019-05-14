<template>
  <div id="goods">
    <img :src="product.G_img">
    <van-cell-group>
      <van-cell :title="product.name" :value="'￥'+product.G_price"/>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="运费￥0.00-20.00" :value="'销量:'+product.G_sell"/>
    </van-cell-group>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服"/>
      <van-goods-action-icon icon="cart-o" text="购物车" info="5"/>
      <van-goods-action-icon icon="shop-o" text="店铺"/>
      <van-goods-action-button text="加入购物车" type="warning" @click="onShow"/>
      <van-goods-action-button text="立即购买"/>
    </van-goods-action>
    <van-popup :show=" show" position="bottom" @close="onClose">
      <div class="modal-top">
        <van-row>
          <van-col span="4" offset="2">
            <div style="border: 1px solid #c3c3c3;width:100rpx;height:100rpx;">
              <img :src="product.G_img" style="width:100%;height:100%">
            </div>
          </van-col>
          <van-col span="16" offset="1">
            <p>{{product.G_name}}</p>
            <span class="price">￥{{product.G_price}}</span>
          </van-col>
        </van-row>
      </div>
      <div style="margin-top:15rpx;">
        <van-row style="margin-bottom:15rpx">
          <van-col span="15" offset="1" class="modal-left">
            <p>购买数量:</p>
            <p>剩余:{{product.G_sell}}件</p>
          </van-col>
          <van-col span="8">
            <van-stepper :value="1" @change="onChange"/>
          </van-col>
        </van-row>
        <van-goods-action-button text="确定"/>
      </div>
    </van-popup>
  </div>
</template>
<script>
var Fly = require("flyio/dist/npm/wx");
var fly = new Fly();
export default {
  data() {
    return {
      id: "",
      product: [],
      show: false,
      baseUrl:process.env.API_ROOT
    };
  },
  methods: {
    getDetail() {
      var url = `${this.baseUrl}/goods/${this.id}`;
      fly.get(url).then(res => {
        this.product = res.data;
      });
    },
    //弹出底部组件
    onShow() {
      this.show = true;
    },
    onClose() {
   /*    fly.post(url,{this.product}) */
      this.show = false;
    }
  },
  mounted() {
    this.id = this.$root.$mp.query.id;
    this.getDetail();
  }
};
</script>
<style>
#goods .value-class {
  color: red !important;
}
#goods img {
  width: 100%;
  height: 400rpx;
}
.modal-top {
  padding-bottom: 30rpx;
  border-bottom: 1px solid #cccccc;
}
.price {
  color: red;
  font-size: 32rpx;
}
.modal-left p {
  font-size: 30rpx;
}
.modal-left p:nth-of-type(2) {
  color: #cccccc;
}
</style>

