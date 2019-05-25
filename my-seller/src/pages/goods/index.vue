<template>
  <div>
    <div v-if="show">
      <van-tabs :active="active">
        <van-tab title="出售中">
          <scroll-view scroll-y="true" style="height:1000rpx">
            <view v-for="(item, index) in goods" :key="index">
              <a>
                <van-card
                  :thumb-link="'/pages/goodsdetail/main?id='+item._id"
                  centered="true"
                  :price="item.G_price"
                  :desc="'销量:'+item.G_sell+'库存:'+item.G_num"
                  :title="item.G_name"
                  :thumb="item.G_img[0]"
                />
              </a>
            </view>
          </scroll-view>
        </van-tab>
        <van-tab title="已售罄">
          <scroll-view scroll-y="true" style="height:1000rpx">
            <view v-for="(item, index) in goods_none" :key="index">
              <a>
                <van-card
                  :thumb-link="'/pages/goodsdetail/main?id='+item._id"
                  centered="true"
                  :price="item.G_price"
                  :desc="'销量:'+item.G_sell+'库存:'+item.G_num"
                  :title="item.G_name"
                  :thumb="item.G_img[0]"
                />
              </a>
            </view>
          </scroll-view>
        </van-tab>
      </van-tabs>
      <div style="position:fixed;bottom:0; width:100%">
        <van-button type="danger" size="large" @click="show=false">上架商品</van-button>
      </div>
    </div>
    <div v-else>
      <newgoods @showStore="showStore"></newgoods>
    </div>
  </div>
</template>

<script>
import newgoods from "@/components/newGoods.vue";
import Notify from "../../../static/vant/dist/notify/notify";
import store from "../../store.js";

export default {
  components: {
    newgoods
  },
  data() {
    return {
      active: 0,
      show: true,
      goods: [],
      goods_none:[]
    };
  },
  methods: {
    //接收子组件传来的值
    showStore(data) {
      this.show = data;
    },
    getGoods() {
      this.$fly
        .get(`${this.baseUrl}/goods/listByStore/${store.state.storeId}`)
        .then(res => {
          if (res.data.status == "200") {
            this.goods = res.data.result;
          }
        });
    },
    getGoodsNone(){
      this.$fly
        .get(`${this.baseUrl}/goods/listByNone/${store.state.storeId}`)
        .then(res => {
          if (res.data.status == "200") {
            this.goods_none = res.data.result;
          }
        });
    }
    
  },
  onShow() {
    this.getGoods();
    this.getGoodsNone();
  },
  //监听show和路由来更新商品列表
  watch: {
    show: {
      handler: function() {
        this.getGoods();
        this.getGoodsNone();
      }
    }
  }
};
</script>

<style>
page {
  height: 100%;
}
</style>
