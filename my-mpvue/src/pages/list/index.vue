<template>
  <div>
    <sea></sea>
    <div class="hot-mid">
      <scroll-view scroll-y="true">
        <view v-for="(item, index) in hotProduct" :key="index" class="item-y">
          <a>
            <van-card
              :thumb-link="'/pages/prodetails/main?id='+item._id"
              centered="true"
              :price="item.G_price"
              :desc="'销量:'+item.G_sell"
              :title="item.G_name"
              :thumb="item.G_img "
            />
          </a>
        </view>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import sea from "@/components/Common/sea";
import store from "../../store";
export default {
  data() {
    return {};
  },

  components: {
    sea
  },

  methods: {
    getHot() {
      var url = `${this.baseUrl}/goods/list`;
      this.$fly
        .post(url, {
          page: this.page,
          rows: 5
        })
        .then(res => {
          console.log(res);
          this.page = this.page + 1;
          for (var i = 0; i < res.data.length; i++) {
            this.hotProduct.push(res.data[i]);
          }
        });
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
.item-y {
  background: #ffffff;
  margin-bottom: 25rpx;
}
</style>
