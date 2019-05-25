<template>
  <div id="cart">
    <van-cell-group>
      <van-cell
        :title="B_address.name+','+B_address.phone"
        :label="'收货地址:'+B_address.address+B_address.road"
        :border=" false "
      >
        <van-icon
          slot="right-icon"
          name="edit"
          class="van-cell__right-icon"
          size="40rpx"
          @click="show=true"
        />
      </van-cell>
    </van-cell-group>
    <van-dialog use-slot :show="show" show-cancel-button @cancel="show=false" @confirm="edit">
      <van-radio-group :value="radio" @change="onChange($event)">
        <van-radio v-for=" (item,index) in address" :key="index" :name="index">
          <p>收货人:{{item.name}}</p>
          <p>联系方式:{{item.phone}}</p>
          <p class="radio">收货地址:{{item.address}}</p>
        </van-radio>
      </van-radio-group>
    </van-dialog>
    <scroll-view scroll-y="true">
      <view v-for="(item, index) in product" :key="index" style="margin-top:30rpx;width:100%">
        <a class="cartCard">
          <van-card
            :num="item.num"
            :thumb-link="'/pages/prodetails/main?id='+item.id"
            centered="true"
            :price="item.price"
            :title="item.name"
            :thumb="item.img"
          ></van-card>
        </a>
      </view>
    </scroll-view>
    <van-submit-bar :price="total " button-text="确认订单" @submit="pushOrder"></van-submit-bar>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import store from "../../store";
import Toast from "../../../static/vant/dist/toast/toast";

export default {
  data() {
    return {
      show: false,
      product: "",
      total: "",
      address: [],
      radio: "0",
      B_address: "",
      temp: ""
    };
  },
  methods: {
    //关闭弹框时修改
    edit() {
      this.show = false;
      this.B_address = this.temp;
    },
    getAddress() {
      this.$fly.get(`${this.baseUrl}/user/${store.state.userId}`).then(res => {
        this.address = res.data.U_address;
        this.B_address = res.data.U_address[0];
      });
    },
    getOrder() {
      this.$fly
        .post(`${this.baseUrl}/order/listBy`, {
          U_id: store.state.userId,
          pay: false
        })
        .then(res => {
          this.product = res.data;
        });
    },
    onChange(ev) {
      this.radio = ev.mp.detail;
      this.temp = this.address[ev.mp.detail]; //先把地址临时存个变量，确认提交后再上传
    },
    pushOrder() {
      this.product.forEach(ele => {
        this.$fly
          .put(`${this.baseUrl}/order/${ele._id}`, {
            pay: true,
            //收货地址
            B_address: this.B_address
          })
          .then(res => {
            Toast.loading({
              mask: true,
              message: "提交订单中..."
            });
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              });
            }, 1000);
            //关闭页面返回上一页
          });
      });
    }
  },
  mounted() {
    this.getAddress();
    if (this.$root.$mp.query.id) {
      this.$fly
        .post(`${this.baseUrl}/order/listBy`, {
          _id: this.$root.$mp.query.id
        })
        .then(res => {
          this.product = res.data;
        });
    } else {
      console.log(2);
      this.getOrder();
    }
  }
};
</script>

<style>
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

.van-card {
  background: #ffffff !important;
}

page {
  width: 100%;
  height: 100%;
}

#cart {
  width: 100%;
  height: 100%;
}

#cart scroll-view {
  width: 94%;
  height: 90%;
  margin: 0 auto;
}
#cart p {
  font-size: 30rpx;
  line-height: 30rpx;
}
.radio {
  margin-bottom: 20rpx;
}
.cartCard {
  display: flex;
  align-items: center;
  width: 100%;
  background: #ffffff;
}

.cartCard van-card {
  width: 100%;
}
</style>
