<template>
  <div>
    <div v-if='show'>
      <van-search :value=" value " placeholder="请输入搜索关键词"/>
      <van-tabs :active="active">
        <van-tab title="出售中">
            <scroll-view scroll-y="true" style="height:1000rpx">
                <view v-for="(item, index) in goods" :key="index" >
                  <a>
                    <van-card
                      :thumb-link="'/pages/prodetails/main?id='+item._id"
                      centered="true"
                      :price="item.G_price"
                      :desc="'销量:'+item.G_sell"
                      :title="item.G_name"
                      :thumb="item.G_img[0]"
                    />
                  </a>
                </view>
              </scroll-view>
        </van-tab>
        <van-tab title="已售罄"></van-tab>
        <van-tab title="仓库"></van-tab>
      </van-tabs>
      <div style="position:fixed;bottom:0; width:100%">
        <van-button type="danger" size="large" @click="show=false">上架商品</van-button>
      </div>
    </div>
    <div v-else>
        <newgoods @showStore='showStore'></newgoods>
    </div>
  </div>
</template>

<script>
import newgoods from "@/components/newGoods.vue";
import store from '../../store.js'

export default {
  components: {
    newgoods
  },
  data() {
    return {
      active: 0,
      show:true,
      goods:[]
    };
  },
  methods:{
    //接收子组件传来的值
    showStore(data){
      this.show=data
    },
    getGoods(){
      this.$fly.get(`${this.baseUrl}/goods/listByStore/${store.state.storeId}`,
          ).then(res=>{
             if(res.data.status=='200'){
               this.goods=res.data.result;
               console.log(this.goods)
             }
          })
    }
  },
  mounted() {
    console.log(1)
    this.getGoods()
  },
  updated() {
    console.log(2)
  },
};
</script>

<style>
  page{ 
  height: 100%;
}
</style>
