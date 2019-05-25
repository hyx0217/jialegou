<template>
  <div>
    <div v-if="show==1" class="login">
      <p>请先登录</p>
      <van-button type="danger" @click="toLogin">登录/注册</van-button>
    </div>
    <div v-else-if="show==2" class="login">
      <p>你还未开店铺</p>
      <van-button type="danger" @click="toBuild">开设店铺</van-button>
    </div>
    <div v-else-if="show==0">
      <!-- <home :storeInfo='storeInfo'></home> -->
      <div v-if="isStore">
        <van-search :value=" value " placeholder="请输入搜索关键词" />
        <van-tabs :active="active">
          <van-tab title="出售中">
            <scroll-view scroll-y="true" style="height:1100rpx">
              <view v-for="(item, index) in goods" :key="index">
                <a>
                  <van-card :thumb-link="'/pages/goodsdetail/main?id='+item._id" centered="true" :price="item.G_price"
                    :desc="'销量:'+item.G_sell+'库存:'+item.G_num" :title="item.G_name" :thumb="item.G_img[0]" />
                </a>
              </view>
            </scroll-view>
          </van-tab>
          <van-tab title="已售罄">
            <scroll-view scroll-y="true" style="height:1000rpx">
              <view v-for="(item, index) in goods_none" :key="index">
                <a>
                  <van-card :thumb-link="'/pages/goodsdetail/main?id='+item._id" centered="true" :price="item.G_price"
                    :desc="'销量:'+item.G_sell+'库存:'+item.G_num" :title="item.G_name" :thumb="item.G_img[0]" />
                </a>
              </view>
            </scroll-view>
          </van-tab>
        </van-tabs>
        <div style="position:fixed;bottom:0; width:100%">
          <van-button type="danger" size="large" @click="isStore=false">上架商品</van-button>
        </div>
      </div>
      <div v-else>
          <newgoods @showStore="showStore"></newgoods>
        </div>
    </div>
  </div>
</template>
<script>
  import home from '@/components/home.vue'
  import store from '../../store.js'
  import newgoods from "@/components/newGoods.vue";

  export default {
    components: {
      home,
      newgoods
    },
    data() {
      return {
        show: "",
        storeInfo: '',
        active: 0,
        isStore: true,
        goods: [],
        goods_none: []
      };
    },
    methods: {
      //跳到注册页
      toLogin() {
        mpvue.navigateTo({
          url: "/pages/login/main"
        });
      },
      //跳到开店页
      toBuild() {
        mpvue.navigateTo({
          url: "/pages/build/main"
        });
      },
      showStore(data) {
        this.isStore = data;
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
      getGoodsNone() {
        this.$fly
          .get(`${this.baseUrl}/goods/listByNone/${store.state.storeId}`)
          .then(res => {
            if (res.data.status == "200") {
              this.goods_none = res.data.result;
            }
          });
      },
      //根据条件决定显示什么
      showOne(){
        //判断是否登录id
        
      if (!store.state.userId) {
        this.show = 1;
      } else {
        this.$fly.post(`${this.baseUrl}/store/find`, {
          S_boss: store.state.userId
        }).then(res => {
          //判断用户是否拥有店铺
          if (res.data.status == 200) {
            this.show = 0;
            this.storeInfo = res.data.result;
            store.commit('keepStore', res.data.result._id);
            //获取商品
            this.getGoods();
            this.getGoodsNone();
          } else {
            this.show = 2
          }
        })
      }
      }
    },
    created(){
      this.getGoods();

      let that=this;
       wx.getStorage({
                key: "_id",
                success:function(res){
                  store.commit('login',res.data)
                  that.show=0
                  that.getGoods();
                }
              });
    },
    onShow() {
      this.getGoods();
      this.showOne()
      this.getGoods();
      this.getGoodsNone();
    },
    //监听show和路由来更新商品列表
    watch: {
      isStore: {
        handler: function () {
          this.getGoods();
          this.getGoodsNone();
        }
      }
    }

  };

</script>

<style scoped>
  .login {
    width: 200rpx;
    margin: 500rpx auto 0;
  }

  .login p {
    text-align: center;
    font-size: 32rpx;
    color: #cccccc;
  }

</style>
