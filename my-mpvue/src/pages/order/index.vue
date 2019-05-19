<template>
  <div>
    <van-search :value=" value " placeholder="请输入搜索关键词" />
    <van-tabs :active="active">
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
              <van-button size="mini" @click='delOrder(item._id)'>取消订单</van-button>
              <van-button size="mini" @click='cfmOrder(item._id)'>确认订单</van-button>
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
              <van-button v-if='!item.receive' size="mini" @click='receive(item._id)'>确认收货</van-button>
              <p v-else>已收货</p>
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
              <van-button size="mini">去评价</van-button>
            </view>
          </van-card>
        </p>
      </van-tab>

    </van-tabs>
  </div>
</template>

<script>
// Use Vuex
import store from '../../store'
export default {
  data(){
    return{
      active: 0,
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
      this.$fly.get(`${this.baseUrl}/order/${store.state.userId}`).then(res=>{
        this.allOrder=res.data;
        this.payOrder=[];
        this.waitSendOrder=[];
        this.sendOrder=[];
        this.commentOrder=[]
        for(var value in res.data){
          if(!res.data[value].send && res.data[value].pay){
            this.waitSendOrder.push(res.data[value]);//未发货
          }else if(res.data[value].send){
            this.sendOrder.push(res.data[value]);//已发货
          } 
         if(!res.data[value].pay){
            this.payOrder.push(res.data[value]);//未付款的
          }else if(!res.data[value].comment && res.data[value].receive ){
            this.commentOrder.push(res.data[value]);//已确认收货评价
          }
        }
      })
    },
    //确认收货
    receive(id){
      this.$fly.put(`${this.baseUrl}/order/${id}`,{receive:true}).then(res=>{
        console.log(res)
        this.getAll()
      })
    },
    delOrder(id){
      this.$fly.delete(`${this.baseUrl}/order/${id}`).then(res=>{
        
      })
      this.getAll()
    },
    cfmOrder(id){
      this.$fly.put(`${this.baseUrl}/order/${id}`,{pay:true}).then(res=>{
        this.getAll()
      })
    }
  },
  mounted(){
    this.getAll()
      this.active=this.$root.$mp.query.active
 
  }
}
</script>

<style>
</style>
