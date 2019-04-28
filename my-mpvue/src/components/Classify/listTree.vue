<template>
    <div id='classify'>
        <div class='cfy-left'>
             <scroll-view scroll-y='true' style='height:100%'>
                    <view v-for="(item,index) in kinds" :key="index" @click="onTab(index)" :class='{active:check===index}' class='list'>
                        <span>{{item.name}}</span>
                    </view>
             </scroll-view>
        </div>
        <div class="cfy-right">
            <div class='hidebox' v-for="(item,i) in kindsKid" :key='i' :class='{active:check===i}'>
                 <ul class='kid'>
                    <li v-for="(kid,index) in item" :key="index">
                        <a>
                            <img :src="kid.img" style='width:75rpx;height:75rpx'>
                            <span>{{kid.name}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
var Fly=require("flyio/dist/npm/wx") 
var fly=new Fly
export default {
    data(){
        return{
            kinds:'',
            kindsKid:[],
            check:-1,//默认第一个TAB
            itemHeight:'100',//左侧每类产品高度,
            listHeight:'',
        }
    },
    methods:{
        getKind(){
            const baseUrl=process.env.API_ROOT
          var url=`${baseUrl}/tree`
          fly.get(url
          ).then(res=>{
              this.kinds=res.data;
              this.listHeight=this.itemHeight*this.kinds.length;//根据产品个数计算左侧栏高度
              for(let i=0;i<res.data.length;i++){
                  this.kindsKid.push(res.data[i].childrens);
              }
          })
      },
      //Tab切换
      onTab(index){
          this.check=index;
      },
      //获取高度
      getHeight(){
          var query = wx.createSelectorQuery();
          query.select('#classify').boundingClientRect(rects=>{
              console.log(rects);
          }).exec()

      }
    },
    created(){
        this.getKind();
        this.getHeight();
    }
}
</script>
<style>
/****隐藏滚动条***/
::-webkit-scrollbar{
width: 0;
height: 0;
color: transparent;
}
#classify{
    height: 92%;
    width: 100%;
    background: #ffffff;
    position: relative;

}
.cfy-left{
    position: absolute;
    left:0;
    width: 20%;
    height: 100%;
    background: #F7F8FA;
}
.list{
    text-align: center;
    padding: 0 10rpx;
    height: 100rpx;
    line-height: 100rpx;
    border-top: 1px solid #c3c3c3;
}
.list span{
    font-size:32rpx
}
.list.active{
    color: red;
}
.cfy-right{
    position: absolute;
    right:0;
    width: 80%;
}

.hidebox.active{
    display: block;
}
.hidebox{
    display: none;
}
.kid{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    justify-content:flex-start;

}
.kid li{
    width: 33%;
    margin-top:30rpx;
}
.kid li a{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size:28rpx;
}
</style>

