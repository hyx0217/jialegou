<template>
    <div class='hot'>
        <div class='hot-top'>
            <ul>
                <li v-for="(item, index) in 8" :key="index">
                    <a>
                        <img src='../../../static/images/客服.png' style='width: 75rpx; height:75rpx'>
                        <span>音乐</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class='hot-mid'>
            <h1>热门产品</h1>
            <scroll-view scroll-x='true' class='hot-x'>
      
                    <view v-for="(item, index) in hotProduct" :key="index" class='hot-item'>
                        <img :src='item.img' style='width: 200rpx; height:200rpx'>
                        <p>{{item.name}}</p>
                    </view>
      
            </scroll-view>
        </div>
        <div class='hot-mid'>
                <h1>猜你喜欢</h1>
                <scroll-view scroll-y='true'>
                        <view v-for="(item, index) in hotProduct" :key="index">
                            <a :href="'/pages/prodetails/main?id='+item.id">
                                <img :src='item.img'>
                                <p>{{item.name}}</p>
                            </a>
                        </view>
                </scroll-view>
        </div>
      
    </div>
</template>
<script>
var Fly=require("flyio/dist/npm/wx") 
var fly=new Fly
export default {
    data(){
        return{
            hotProduct:[],
            page:1
        }
    },
    methods: {
      getHot(){
          var url='http://localhost:3000/product?_limit=8&_page='+this.page
          console.log(url)
          fly.get(url
          ).then(res=>{
            this.page=this.page+1;
            for(var i=0;i<res.data.length;i++){
                this.hotProduct.push(res.data[i])
            }
          })
      }
    },
    //到达底部刷新
    onReachBottom() {
        this.getHot();
    },
    created () {
       this.getHot()
    }
}
</script>
<style>
.hot-top {
    width: 94%;
    margin: 0 auto;
    margin-top:20rpx;
    background: #ffffff;
    border-radius: 5%;
}
.hot-top ul{
    display: flex;
    flex-wrap:wrap;
    flex-direction: row;
    justify-content:flex-end;
}
.hot-top  ul li{
    width: 25%
}
.hot-top li a{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size:30rpx;
}
.hot-mid{
    width: 94%;
    margin: 0 auto;
    margin-top:20rpx;
    background: #ffffff;
    border-radius: 5%;
}
.hot-x{
  height: 280rpx;
  white-space: nowrap;
  display: flex;
}
.hot-item{
  margin-right: 50rpx;
  display: inline-block;
}
</style>