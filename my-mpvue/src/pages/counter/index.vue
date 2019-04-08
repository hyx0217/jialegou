<template>
  <div id='cart'>
      <scroll-view scroll-y='true' >
              <view v-for="(item, index) in cartProduct" :key="index" style="margin-top:30rpx;width:100%">
                 
                  <a class='cartCard'> 
                      <van-checkbox name='selcetCart' :value="item.ischeck" @change="onSelcet(index)"></van-checkbox>
                      <van-card
                          :num='item.num'
                          :thumb-link="'/pages/prodetails/main?id='+item.id"
                          centered=true
                          :price="item.price"
                          desc="描述信息"
                          :title="item.name"
                          :thumb="item.img "
                      >
                       <view slot="footer">
                          <van-stepper :value="item.num" @change="onChangeNum($event,index)" />
                        </view>
                      </van-card>
                  </a>
              </view>
       </scroll-view>
       <van-submit-bar
          :price="total "
          button-text="提交订单"
          @submit="onClickButton"
        >
          <van-checkbox :value="checked " @change="onSelectAll">全选</van-checkbox>
        </van-submit-bar>
  </div>
</template>

<script>
var Fly=require("flyio/dist/npm/wx") 
var fly=new Fly
export default{
  data(){
    return{
      baseUrl:process.env.API_ROOT,
      cartProduct:'',
      checked:false,
      check:[],
      total:0,
    }
  },
  methods:{
    getDetail(){
      fly.get(`${this.baseUrl}/product?_limit=8&_page=1`).then(res=>{
        this.cartProduct=res.data;
      })
    },
    onSelectAll(){
      if(this.checked){
        this.check=[];//反选设空
        this.cartProduct.forEach(element => {
          element.ischeck=false;
        });
        this.checked=false;
        this.total=0;//价格归零
      }else{
        this.check=[];
        this.cartProduct.forEach(element => {
          element.ischeck=true;
          this.total+=element.price*element.num;
          this.check.push(element.ischeck)//全选 插入
        })
        this.checked=true;
      }
    },
    onSelcet(i){
      if(this.cartProduct[i].ischeck){
        this.total-=this.cartProduct[i].price*this.cartProduct[i].num
        
        this.check.pop();//取消选择 移除一个
        this.cartProduct[i].ischeck=false
        this.checked=false;
      }else{
        this.total+=this.cartProduct[i].price*this.cartProduct[i].num;
        this.check.push(true);//选择 插入一个
        this.cartProduct[i].ischeck=true
        if(this.check.length==this.cartProduct.length){//判断两个数组长度是否相等 全选是否勾上
          this.checked=true;
        }
      }
    },
    //改变数量
    onChangeNum($event,i){
      this.cartProduct[i].num=$event.mp.detail;
    }
  },
  mounted(){
    this.getDetail();
  },
}

</script>

<style>
::-webkit-scrollbar{
    width: 0;
    height: 0;
    color: transparent;
}
.van-card{
    background: #ffffff!important;
}
page{
  width: 100%;
  height: 100%;
}
#cart {
  width: 100%;
  height: 100%;
}
#cart scroll-view{
  width: 94%;
  height: 90%;
  margin:0 auto;

}
.cartCard{
  display: flex;
  align-items: center;
  width: 100%;
  background: #ffffff;
}
.cartCard van-card{

  width: 100%
}
</style>
