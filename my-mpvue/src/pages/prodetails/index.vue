<template>
  <div id="goods">
    <img :src="product.G_img">
    <van-cell-group>
      <van-cell :title="product.G_name" :value="'￥'+product.G_price"/>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="运费￥0.00-20.00" :value="'销量:'+product.G_sell"/>
    </van-cell-group>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服"/>
      <van-goods-action-icon icon="cart-o" @click='goCates' text="购物车"/>
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
            <p>剩余:{{product.G_num}}件</p>
          </van-col>
          <van-col span="8">
            <van-stepper :value="total" @change="onChangeTotal($event)"/>
          </van-col>
        </van-row>
        <van-goods-action-button text="确定" @click='addCates'/>
      </div>
    </van-popup>
  </div>
</template>
<script>
  import store from '../../store'
export default {
  data() {
    return {
      id: "",
      product: '',
      show: false,
      total:1,
    };
  },
  methods: {
    goCates(){
      mpvue.switchTab({
        url:'/pages/cates/main'
      })
    },
    getDetail() {
      var url = `${this.baseUrl}/goods/${this.id}`;
      this.$fly.get(url).then(res => {
        this.product = res.data;
      });
    },
    //添加到购物车
    addCates(){
      this.$fly.put(`${this.baseUrl}/user/cates/${store.state.userId}`,{
        U_cates:{
          id:this.product._id,
          S_id:this.product.G_parentId,
          name:this.product.G_name,
          price:this.product.G_price,
          img:this.product.G_img[0],
          ischeck:false,
          num:this.total
        }
      }).then(res=>{
        console.log(res)
      })
    },
    //弹出底部组件
    onShow() {
      this.total=1
      this.show = true;
    },
    onClose() {
   /*    fly.post(url,{this.product}) */
      this.show = false;
    },
    onChangeTotal(ev){
      console.log(ev)
      this.total=ev.mp.detail
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

