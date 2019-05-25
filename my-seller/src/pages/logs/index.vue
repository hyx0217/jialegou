<template>
  <div>
    <van-tabs :active="active">
      <van-tab title="未发货">
        <p v-for="(item,index) in waitSendOrder" :key="index" style="margin-top:20rpx">
          <van-card num="2" :price="item.price" desc="描述信息" :title="item.name" :thumb="item.img">
            <view slot="footer">
              <van-button  size="mini" @click="toSend(item._id)">发货</van-button>
            </view>
          </van-card>
        </p>
      </van-tab>
      <van-tab title="已发货">
         <p v-for="(item,index) in sendOrder" :key="index" style="margin-top:20rpx">
          <van-card num="2" :price="item.price" desc="描述信息" :title="item.name" :thumb="item.img">
            <view slot="footer">
              <p v-if="!item.receive">未收货</p>
              <p v-else>已收货</p>
            </view>
          </van-card>
        </p>
      </van-tab>
      <van-tab title="已完成">
        <p v-for="(item,index) in commentOrder" :key="index" style="margin-top:20rpx">
          <van-card num="2" :price="item.price" desc="描述信息" :title="item.name" :thumb="item.img">
            <view slot="footer">
              <p v-if="!item.comment">未评价</p>
              <p v-else>已评价</p>
            </view>
          </van-card>
        </p>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import store from "../../store";
export default {
  data() {
    return {
      active: 0,
      allOrder: [],
      waitSendOrder: [],//待发货
      sendOrder: [],//已发货
      commentOrder: []//已评价完成
    };
  },
  methods: {
    getAll() {
      //根据店铺ID获取
      this.$fly
        .post(`${this.baseUrl}/order/getorder`, { S_id: store.state.storeId })
        .then(res => {
          console.log(res)
          this.allOrder = res.data;
          this.sendOrder = [];
          this.waitSendOrder = [];
          this.commentOrder = [];
          for (var value in res.data) {
            if (!res.data[value].send && res.data[value].pay) {
              this.waitSendOrder.push(res.data[value]); //未发货
            } else if (res.data[value].send) {
              this.sendOrder.push(res.data[value]); //已发货
            }
            if (res.data[value].receive && res.data[value].comment) {
              this.commentOrder.push(res.data[value]); //已完成
            }
          }
        });
    },
    //发货
    toSend(id){
       this.$fly
        .put(`${this.baseUrl}/order/${id}`, { send: true })
        .then(res => {
          this.getAll();
        });
    }
  },
  onShow() {
    this.getAll();
  }
};
</script>

<style>
</style>
