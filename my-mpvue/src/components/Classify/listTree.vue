<template>
    <div id='classify'>
        <div class='cfy-left'>
             <scroll-view scroll-y='true' :style="{height:listHeight+'rpx'}">
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
            check:0,//默认第一个TAB
            itemHeight:'100',//左侧每类产品高度,
            listHeight:'',
        }
    },
    methods:{
        getKind(){
          var url='http://localhost:3000/tree'
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
    },
    created(){
        this.getKind();
    }
}
</script>
<style>
#classify{
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    background: #ffffff;
    position: relative;
}
.cfy-left{
    width: 20%;
    height: 100%;
    background: #F7F8FA;
}
.list{
    text-align: center;
    padding: 0 10rpx;
    height: 100rpx;
    line-height: 100rpx;
    border-top: 1px solid black;
}
.list span{
    font-size:38rpx
}
.list.active{
    color: red;
}
.cfy-right{
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
    width: 30%;
    background: red;
    margin:10rpx;
}
.kid li a{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size:28rpx;
}
</style>

