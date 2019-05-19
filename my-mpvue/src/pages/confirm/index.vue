<template>
  <div id="cart">
    <van-popup :show="show" @close="onClose">内容</van-popup>
    <scroll-view scroll-y="true">
      <view v-for="(item, index) in product" :key="index" style="margin-top:30rpx;width:100%">
        <a class="cartCard">
          <van-card :num="item.num" :thumb-link="'/pages/prodetails/main?id='+item.id" centered="true"
            :price="item.price" :title="item.name" :thumb="item.img ">
            <view slot="footer">
              <van-stepper :value="item.num" @change="onChangeNum($event,index)" />
            </view>
          </van-card>
        </a>
      </view>
    </scroll-view>
    <van-submit-bar :price="total " button-text="确认订单" @submit="pushOrder">
    </van-submit-bar>
  </div>
</template>

<script>
  import store from '../../store'
  export default {
    data() {
      return {
        show:false,
        product: "",
        total: ''
      };
    },
    methods: {
      getOrder(){
        this.$fly.post(`${this.baseUrl}/order/listBy`,{
          U_id:store.state.userId,
          pay:false
        }).then(res=>{
          this.product=res.data
        })
      },
      pushOrder(){
        this.product.forEach(ele=>{
          this.$fly.put(`${this.baseUrl}/order/${ele._id}`,{
          pay:true
        }).then(res=>{
          console.log(res)
        })
        })
        
      }
    },
    mounted () {
      this.getOrder()
    }
  };

</script>

<style>
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  .van-card {
    background: #ffffff !important;
  }

  page {
    width: 100%;
    height: 100%;
  }

  #cart {
    width: 100%;
    height: 100%;
  }

  #cart scroll-view {
    width: 94%;
    height: 90%;
    margin: 0 auto;
  }

  .cartCard {
    display: flex;
    align-items: center;
    width: 100%;
    background: #ffffff;
  }

  .cartCard van-card {
    width: 100%;
  }

</style>
