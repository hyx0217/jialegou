<template>
  <div id="goods">
      <swiper
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
    >
      <block v-for="(item, index) in product.G_img" :key="index">
        <swiper-item>
          <img style="width:100%;height:100%" :src="item" class="slide-image">
        </swiper-item>
      </block>
    </swiper>
    <van-cell-group>
      <van-cell :title="product.G_name" :value="'￥'+product.G_price"/>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="运费￥0.00-20.00" :value="'销量:'+product.G_sell"/>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="宝贝评价" value="内容"/>
      <ul>
        <li v-for="(item,index) in comments" :key="index">
          <van-cell-group>
            <van-cell :title="item.U_name" :label="item.C_comment" :border="false"/>
          </van-cell-group>
        </li>
      </ul>
    </van-cell-group>
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" @click='goCates' text="购物车"/>
      <van-goods-action-icon icon="shop-o" @click='like' text="收藏"/>
      <van-goods-action-button text="加入购物车" type="warning" @click="onShow"/>
      <van-goods-action-button text="立即购买" @click="onShowBuy"/>
    </van-goods-action>
    <van-popup :show=" show" position="bottom" @close="onClose">
      <div class="modal-top">
        <van-row>
          <van-col span="4" offset="2">
            <div style="border: 1px solid #c3c3c3;width:100rpx;height:100rpx;">
              <span></span>
              <img :src="img" style="width:100%;height:100%">
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
    <van-popup :show="showBuy" position="bottom" @close="onClose">
      <div class="modal-top">
        <van-row>
          <van-col span="4" offset="2">
            <div style="border: 1px solid #c3c3c3;width:100rpx;height:100rpx;">
        
              <img :src="img" style="width:100%;height:100%">
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
            <van-stepper :value="total" @change="onChangeBuy($event)"/>
          </van-col>
        </van-row>
        <van-goods-action-button text="确定" @click='goBuy'/>
      </div>
    </van-popup>
        <van-notify id="custom-selector"/>

  </div>
</template>
<script>
  import store from '../../store'
  import Notify from "../../../static/vant/dist/notify/notify";
export default {
  data() {
    return {
      id: "",
      product: {},
      show: false,
      showBuy:false,
      total:1,
      totalBuy:1,
      comments:[],
       indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      img:'',
    };
  },
  methods: {
    //收藏
     like(){
      this.$fly.post(`${this.baseUrl}/likes`,{
        U_id:store.state.userId,
        G_id:this.product._id,
        G_name:this.product.G_name,
        G_price:this.product.G_price,
        G_img:this.product.G_img[0]
      }).then(res=>{
         Notify({
            text: "收藏成功",
            duration: 1000,
            selector: "#custom-selector",
            backgroundColor: "#1989fa"
          });
      })
    },
    //立即购买
    goBuy(){
      this.$fly.post(`${this.baseUrl}/order`, {
                U_id: store.state.userId,
                S_id: this.product.G_parentId,
                G_id:this.product._id,
                name:this.product.G_name,
                B_address:'',
                price: this.product.G_price,
                num: this.totalBuy,
                img: this.product.G_img[0],
                send: false,
                pay: false,
                comment: false,
                receive:false,
      }).then(res=>{
        //传送订单的id到确认界面获取该订单详细内容
        this.showBuy=false;
        mpvue.navigateTo({
              url: `/pages/confirm/main?id=${res.data._id}`
            });
      })
    },
    getComments() {
      this.$fly.get(`${this.baseUrl}/comments/list/${this.id}`).then(res => {
        console.log(res)
        this.comments = res.data.result;
      });
    },
    goCates(){
      mpvue.switchTab({
        url:'/pages/cates/main'
      })
    },
    getDetail() {
      var url = `${this.baseUrl}/goods/${this.id}`;
      this.$fly.get(url).then(res => {
        this.img=res.data.G_img[0];
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
          num:this.total,
          B_address:'',
        }
      }).then(res=>{
        Notify({
            text: "添加购物车成功",
            duration: 1000,
            selector: "#custom-selector",
            backgroundColor: "#1989fa"
          });
          this.show=false
      })
    },
    //弹出底部组件
    onShow() {
      this.total=1
      this.show = true;
    },
    onShowBuy(){
      this.totalBuy=1;
      this.showBuy=true;
    },
    onClose() {
   /*    fly.post(url,{this.product}) */
      this.show = false;
      this.showBuy=false;
    },
    onChangeTotal(ev){
      this.total=ev.mp.detail
    },
     onChangeBuy(ev){
      this.totalBuy=ev.mp.detail
    }
  },
  mounted() {
    this.id = this.$root.$mp.query.id;
    this.getDetail();
    this.getComments();
        console.log(this.id)

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

