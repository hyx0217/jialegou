<template>
  <div>
    <div class="hot-mid">
      <scroll-view>
        <view v-for="(item, index) in list" :key="index" class="item-y">
          <van-cell-group>
            <van-card
              :thumb-link="'/pages/prodetails/main?id='+item.G_id"
              centered="true"
              :price="item.G_price"
              :title="item.G_name"
              :thumb="item.G_img"
            >
              <view slot="footer">
                <van-button type="danger" size="small" @click="delLike(item._id,index)">删除</van-button>
              </view>
            </van-card>
          </van-cell-group>
        </view>
      </scroll-view>
    </div>
    <van-dialog id="van-dialog"/>
  </div>
</template>

<script>
import sea from "@/components/Common/sea";
import Dialog from "../../../static/vant/dist/dialog/dialog";
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
    getLike() {
      var url = `${this.baseUrl}/likes/list`;
      this.$fly
        .post(url, {
          U_id: store.state.userId,
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
    delLike(id,index) {
      Dialog.confirm({
        message: "确定删除吗？"
      }).then(res=>{
        this.$fly
        .delete(`${this.baseUrl}/likes/${id}`)
        .then(res => {
          this.list.splice(index,1)
      });
      })
    }
  },
  onShow() {
    this.page = 1;
    this.list = [];
    this.getLike();
  },
  onReachBottom() {
    this.getLike();
  }
};
</script>

<style scoped>
.item-y {
  background: #ffffff;
  margin-bottom: 25rpx;
}
.right {
  display: inline-block;
  width: 65px;
  height: 100%;
  color: white;
  font-size: 15px;
  line-height: 44px;
  text-align: center;
  background-color: red;
}
</style>
