<template>
  <div>
    <van-search :value=" value " placeholder="请输入搜索关键词" />
    <van-tabs :active="active" @change="onChange">
      <van-tab title="全部">
        <p v-for='(item,index) in allOrder' :key='index' style='margin-top:20rpx'>
           <van-card
            num="2"
            :price="item.price"
            desc="描述信息"
            :title="item.name"
            :thumb="item.img"
          >
            <view slot="footer">
              <van-button size="mini">取消订单</van-button>
              <van-button size="mini">确认订单</van-button>
            </view>
          </van-card>
        </p>
         
      </van-tab>
      <van-tab title="未付款">
        <p v-for='(item,index) in payOrder' :key='index' style='margin-top:20rpx'>
           <van-card
            num="2"
            :price="item.price"
            desc="描述信息"
            :title="item.name"
            :thumb="item.img"
          >
            <view slot="footer">
              <van-button size="mini">取消订单</van-button>
              <van-button size="mini">确认订单</van-button>
            </view>
          </van-card>
        </p>
      </van-tab>
      <van-tab title="待发货">
        <p v-for='(item,index) in waitSendOrder' :key='index' style='margin-top:20rpx'>
           <van-card
            num="2"
            :price="item.price"
            desc="描述信息"
            :title="item.name"
            :thumb="item.img"
          >
            <view slot="footer">
              <van-button size="mini">取消订单</van-button>
              <van-button size="mini">确认订单</van-button>
            </view>
          </van-card>
        </p>
      </van-tab>
      <van-tab title="已发货">
         <p v-for='(item,index) in sendOrder' :key='index' style='margin-top:20rpx'>
           <van-card
            num="2"
            :price="item.price"
            desc="描述信息"
            :title="item.name"
            :thumb="item.img"
          >
            <view slot="footer">
              <van-button size="mini">取消订单</van-button>
              <van-button size="mini">确认订单</van-button>
            </view>
          </van-card>
        </p>
      </van-tab>
      <van-tab title="待评价">
          <p v-for='(item,index) in commentOrder' :key='index' style='margin-top:20rpx'>
           <van-card
            num="2"
            :price="item.price"
            desc="描述信息"
            :title="item.name"
            :thumb="item.img"
          >
            <view slot="footer">
              <van-button size="mini">取消订单</van-button>
              <van-button size="mini">确认订单</van-button>
            </view>
          </van-card>
        </p>
      </van-tab>

    </van-tabs>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
var Fly=require("flyio/dist/npm/wx") 
var fly=new Fly
export default {
  data(){
    return{
      active: 0,
      url:'http://localhost:3000/order',
      allOrder:[],
      payOrder:[],
      waitSendOrder:[],
      sendOrder:[],
      commentOrder:[],
    }
  },
  methods:{
    //获取全部订单
    getAll(){
      fly.get(this.url).then(res=>{
        this.allOrder=res.data
        for(var value in res.data){
          if(!res.data[value].pay){
            this.payOrder.push(res.data[value])//未付款的
          }else if(!res.data[value].comment){
            this.commentOrder.push(res.data[value])//待评价
          }else if(!res.data[value].send){
            this.waitSendOrder.push(res.data[value])//未发货
          }else if(res.data[value].send){
            this.sendOrder.push(res.data[value])//已发货
          }
        }
      })
    },
    onChange(event) {
      wx.showToast({
        title: `切换到标签 ${event.detail.index + 1}`,
        icon: 'none'
      });
    }
  },
  mounted(){
    this.getAll()
  }
}
</script>

<style>
</style>
