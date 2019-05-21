<template>
  <div class="hot">
    <div class="hot-top">
      <ul>
        <li>
          <a href="/pages/list/main?G_type=电脑">
            <img src="/static/images/computer.png">
            <span>电脑</span>
          </a>
        </li>
        <li>
          <a href="/pages/list/main?G_type=智能手机">
            <img src="/static/images/智能手机.png">
            <span>智能手机</span>
          </a>
        </li>
        <li>
          <a href="/pages/list/main?G_type=T桖">
            <img src="/static/images/cloth.png">
            <span>T桖</span>
          </a>
        </li>
        <li>
          <a href="/pages/list/main?G_type=牛仔裤">
            <img src="/static/images/牛仔裤.png">
            <span>牛仔裤</span>
          </a>
        </li>
        <li>
          <a href="/pages/list/main?G_type=裙子">
            <img src="/static/images/裙子.png">
            <span>裙子</span>
          </a>
        </li>
        <li>
          <a href="/pages/list/main?G_type=球鞋">
            <img src="/static/images/球鞋.png">
            <span>球鞋</span>
          </a>
        </li>
        <li>
          <a href="/pages/list/main?G_type=相机">
            <img src="/static/images/相机.png">
            <span>相机</span>
          </a>
        </li>
        <li>
          <a @click='toClassify'>
            <img src="/static/images/fenlei.png">
            <span>全部分类</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="hot-mid">
      <h3>
        <van-icon name="hot" color="red" size="36rpx"/>热门产品
      </h3>
      <scroll-view scroll-x="true" class="hot-x">
        <view v-for="(item, index) in hotProduct" :key="index" class="hot-item">
          <img :src="item.G_img" style="width: 200rpx; height:200rpx">
          <p>{{item.G_name}}</p>
        </view>
      </scroll-view>
    </div>
    <div class="hot-mid">
      <h3>
        <van-icon name="like" color="red" size="36rpx"/>猜你喜欢
      </h3>
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
export default {
    data(){
        return{
            hotProduct:[],
            page:1,
           
        }
    },
    methods: {
      toClassify(){
        mpvue.switchTab({
          url:'/pages/classify/main'
        })
      },
      getHot(){
          const baseUrl=process.env.API_ROOT
          var url=`${baseUrl}/goods/list`
          this.$fly.post(url,
          {
              page:this.page,
              rows:5
          }
          ).then(res=>{
              console.log(res)
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
       this.getHot();
    }
}
</script>
<style>
.hot-top {
  width: 94%;
  margin: 0 auto;
  margin-top: 20rpx;
  background: #ffffff;
  border-radius: 5%;
}
.hot-top ul {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-end;
}
.hot-top ul li {
  width: 25%;
  padding-top: 20rpx;
  padding-bottom: 20rpx;
}
.hot-top li a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
}
.hot-top li img {
  height: 75rpx;
  width: 75rpx;
}
.hot-top li span {
  padding-top: 10rpx;
}
.hot-mid {
  width: 94%;
  margin: 0 auto;
  margin-top: 20rpx;
}
.hot-mid h3 {
  height: 56rpx;
}
.title-class {
  color: red;
}
.van-card {
  background: #ffffff !important;
}
.item-y {
  background: #ffffff;
  margin-bottom: 25rpx;
}
.hot-x {
  height: 300rpx;
  white-space: nowrap;
  display: flex;
  background: #ffffff;
  border-radius: 5%;
}
.hot-item {
  margin: 20rpx 50rpx 0 20rpx;
  display: inline-block;
}
</style>