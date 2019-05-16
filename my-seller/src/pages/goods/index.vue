<template>
  <div>
    <div v-if='show'>
      <van-search :value=" value " placeholder="请输入搜索关键词"/>
      <van-tabs :active="active">
        <van-tab title="出售中"></van-tab>
        <van-tab title="已售罄"></van-tab>
        <van-tab title="仓库"></van-tab>
      </van-tabs>
      <div style="position:absolute;bottom:0; width:100%">
        <van-button type="danger" size="large" @click="show=false">上架商品</van-button>
      </div>
    </div>
    <div v-else>
        <newgoods></newgoods>
    </div>
  </div>
</template>

<script>
import newgoods from "@/components/newGoods.vue";

export default {
  components: {
    newgoods
  },
  data() {
    return {
      active: 0,
      show:true
    };
  }
};
</script>

<style>
</style>
