<template>
  <div>
    <swiper
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
    >
      <block v-for="(item, index) in goods.G_img" :key="index">
        <swiper-item>
          <img style="width:100%" :src="item" class="slide-image">
        </swiper-item>
      </block>
    </swiper>
    <van-cell-group>
      <van-cell :title="goods.G_name" :value="'￥'+goods.G_price"/>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="运费￥0.00-20.00" :value="'销量:'+goods.G_sell" :label="'库存:'+goods.G_num"/>
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
    <div style="position:fixed;bottom:0; width:100%">
      <van-button type="primary" size="large" @click="editGoods">编辑</van-button>
      <van-button type="danger" size="large" @click="delGoods">删除</van-button>
    </div>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import Toast from "../../../static/vant/dist/toast/toast";

export default {
  data() {
    return {
      id: "",
      goods: [],
      comments: [],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000
    };
  },
  methods: {
    getDetail() {
      var url = `${this.baseUrl}/goods/${this.id}`;
      this.$fly.get(url).then(res => {
        this.goods = res.data;
      });
    },
    getComments() {
      this.$fly.get(`${this.baseUrl}/comments/list/${this.id}`).then(res => {
        this.comments = res.data.result;
      });
    },
    editGoods() {
      mpvue.navigateTo({
        url: `/pages/editdetail/main?id=${this.id}`
      });
    },
    delGoods() {
      this.$fly.delete(`${this.baseUrl}/goods/${this.id}`).then(res => {
        //删除成功跳转
        Toast.loading({
          mask: true,
          message: "删除中..."
        });
        setTimeout(function() {
          mpvue.redirectTo({
            url: "/pages/goods/main"
          });
        }, 2000);
      });
    }
  },
  onShow() {
    this.id = this.$root.$mp.query.id;
    this.getDetail();
    this.getComments();
  }
};
</script>

<style>
</style>
