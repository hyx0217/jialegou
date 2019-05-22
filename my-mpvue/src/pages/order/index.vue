<template>
  <div>
    <van-tabs :active="active">
      <van-tab title="全部">
        <p v-for="(item,index) in allOrder" :key="index" style="margin-top:20rpx">
          <van-card num="2" :price="item.price" desc="描述信息" :title="item.name" :thumb="item.img" :thumb-link="'/pages/prodetails/main?id='+item.G_id">
            <view slot="footer">
              <div v-show="!item.pay">
                 <van-button size="mini" @click="delOrder(item._id)">取消订单</van-button>
                  <van-button size="mini" @click="cfmOrder(item._id)">确认订单</van-button>
              </div>
              <div v-show="(item.pay && !item.send) ">
                <van-button size="mini">提醒发货</van-button>
              </div>
              <div v-show="(item.send && !item.receive)">
                <van-button v-if="!item.receive" size="mini" @click="receive(item._id)">确认收货</van-button>
                <p v-else>已收货</p>
              </div>
              <div v-show="item.receive">
                    <van-button v-if="!item.comment" size="mini" @click="goComment(item._id,item.G_id)">评价</van-button>
                    <p v-else>已评价</p>
              </div>
            </view>
          </van-card>
        </p>
      </van-tab>
      <van-tab title="未付款">
        <p v-for="(item,index) in payOrder" :key="index" style="margin-top:20rpx">
          <van-card num="2" :price="item.price" desc="描述信息" :title="item.name" :thumb="item.img" :thumb-link="'/pages/prodetails/main?id='+item.G_id">
            <view slot="footer">
              <van-button size="mini" @click="delOrder(item._id)">取消订单</van-button>
              <van-button size="mini" @click="cfmOrder(item._id)">确认订单</van-button>
            </view>
          </van-card>
        </p>
      </van-tab>
      <van-tab title="待发货">
        <p v-for="(item,index) in waitSendOrder" :key="index" style="margin-top:20rpx">
          <van-card num="2" :price="item.price" desc="描述信息" :title="item.name" :thumb="item.img" :thumb-link="'/pages/prodetails/main?id='+item.G_id"></van-card>
          <van-button size="mini">提醒发货</van-button>
        </p>
      </van-tab>
      <van-tab title="已发货">
        <p v-for="(item,index) in sendOrder" :key="index" style="margin-top:20rpx">
          <van-card num="2" :price="item.price" desc="描述信息" :title="item.name" :thumb="item.img" :thumb-link="'/pages/prodetails/main?id='+item.G_id">
            <view slot="footer">
              <van-button v-if="!item.receive" size="mini" @click="receive(item._id)">确认收货</van-button>
              <p v-else>已收货</p>
            </view>
          </van-card>
        </p>
      </van-tab>
      <van-dialog
        use-slot
        :show="show"
        show-cancel-button
        @cancel="show=false"
        @confirm="pushComment()"
      >
        <van-cell-group>
          <van-field
            :value="comment "
            label="评价"
            type="textarea"
            placeholder="请输入评价"
            autosize
            :border="false"
            @change="onChangCm($event)"
          />
        </van-cell-group>
      </van-dialog>
      <van-tab title="评价">
        <p v-for="(item,index) in commentOrder" :key="index" style="margin-top:20rpx">
          <van-card num="2" :price="item.price" desc="描述信息" :title="item.name" :thumb="item.img">
            <view slot="footer">
              <van-button v-if="!item.comment" size="mini" @click="goComment(item._id,item.G_id)">评价</van-button>
              <p v-else>已评价</p>
            </view>
          </van-card>
        </p>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// Use Vuex
import store from "../../store";
export default {
  data() {
    return {
      show: false,
      active: 0,
      allOrder: [],
      payOrder: [],
      waitSendOrder: [],
      sendOrder: [],
      commentOrder: [],
      comment: "",
      G_id: "",
      O_id: "",
      temp: ""
    };
  },
  methods: {
    //评论
    goComment(id, G_id) {
      this.show = true;
      this.G_id = G_id; //商品id
      this.O_id = id; //订单id
    },
    onChangCm(ev) {
      this.temp = ev.mp.detail;
    },
    pushComment() {
      this.show = false;
      this.comment = this.temp;
      //评价
      this.$fly
        .post(`${this.baseUrl}/comments`, {
          U_id: store.state.userId,
          U_name: store.state.userName,
          G_id: this.G_id,
          C_comment: this.comment
        })
        .then(res => {
          //评论完修改评论状态
          this.$fly
            .put(`${this.baseUrl}/order/${this.O_id}`, { comment: true })
            .then(res => {
              this.getAll();
            });
        });
    },
    //获取全部订单
    getAll() {
      this.$fly
        .post(`${this.baseUrl}/order/getorder`, { U_id: store.state.userId })
        .then(res => {
          this.allOrder = res.data;
          this.payOrder = [];
          this.waitSendOrder = [];
          this.sendOrder = [];
          this.commentOrder = [];
          for (var value in res.data) {
            if (!res.data[value].send && res.data[value].pay) {
              this.waitSendOrder.push(res.data[value]); //未发货
            } else if (res.data[value].send) {
              this.sendOrder.push(res.data[value]); //已发货
            }
            if (!res.data[value].pay) {
              this.payOrder.push(res.data[value]); //未付款的
            } else if (res.data[value].receive) {
              this.commentOrder.push(res.data[value]); //已确认收货
            }
          }
        });
    },
    //确认收货
    receive(id) {
      this.$fly
        .put(`${this.baseUrl}/order/${id}`, { receive: true })
        .then(res => {
          this.getAll();
        });
    },
    //删除订单
    delOrder(id) {
      this.$fly.delete(`${this.baseUrl}/order/${id}`).then(res => {});
      this.getAll();
    },
    //确认订单
    cfmOrder(id) {
      this.$fly.put(`${this.baseUrl}/order/${id}`, { pay: true }).then(res => {
        this.getAll();
      });
    }
  },
  mounted() {
    this.getAll();
    this.active = this.$root.$mp.query.active;
  }
};
</script>

<style>
</style>
