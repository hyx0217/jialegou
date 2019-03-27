<template>
    <div id='classify'>
        <div class='cfy-left'>
            <ul>
                <li v-for="(item,index) in kinds" :key="index" @click="onTab(index)" :class='{active:check===index}'>
                    <span>{{item.name}}</span>
                </li>
            </ul>
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
        }
    },
    methods:{
        getKind(){
          var url='http://localhost:3000/tree'
          fly.get(url
          ).then(res=>{
              this.kinds=res.data;
              for(let i=0;i<res.data.length;i++){
                  this.kindsKid.push(res.data[i].childrens);
              }
          })
      },
      //Tab切换
      onTab(index){
          this.check=index;
      }
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
}
.cfy-left{
    width: 20%;
    background: yellow;
}
.cfy-left li{
    text-align: center;
    padding: 0 10rpx;
    height: 100rpx;
    line-height: 100rpx;
    border-top: 1px solid black;
}
.cfy-left li span{
    font-size:38rpx
}
.cfy-left li.active{
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

