<template>
  <div>
    <sea></sea>
    <div v-if="list.length==0">
      <p>对不起，没有该类商品，请重新搜索</p>
    </div>
    <div v-else class="hot-mid">
      <scroll-view scroll-y="true">
        <view v-for="(item, index) in list" :key="index" class="item-y">
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
    return {
      page: 1,
      list: []
    };
  },

  components: {
    sea
  },

  methods: {
    getList() {
      var url = `${this.baseUrl}/goods/list`;
      this.$fly
        .post(url, {
          G_type: this.$root.$mp.query.G_type,
          page: this.page,
          rows: 10
        })
        .then(res => {
          this.page = this.page + 1;
          for (var i = 0; i < res.data.length; i++) {
            this.list.push(res.data[i]);
          }
        });
    },
    searchList() {
      this.$fly
        .post(`${this.baseUrl}/goods/search/`, {
          name: this.$root.$mp.query.name,
          page: this.page,
          rows: 10
        })
        .then(res => {
          this.page = this.page + 1;
          for (var i = 0; i < res.data.length; i++) {
            this.list.push(res.data[i]);
          }
        });
    }
  },
  onShow() {
    this.page = 1;
    this.list = [];
    if (this.$root.$mp.query.name) {
      this.searchList();
    } else {
      this.getList();
    }
  },

  onReachBottom() {
    if (this.$root.$mp.query.name) {
      this.searchList();
    } else {
      this.getList();
    }
  }
};
</script>

<style scoped>
.item-y {
  background: #ffffff;
  margin-bottom: 25rpx;
}
</style>
