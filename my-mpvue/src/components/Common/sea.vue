<template>
    <div>
        <van-search
        class="sea"
        :value="value "
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"

        />
        <div style='width:100%;height:100rpx'></div>
    </div>
         
</template>
<script>
export default {
    data(){
        return{
            list:[],
            value:''
        }
    },
    methods:{
        //根据关键字查找商品
        onSearch(ev){
            mpvue.navigateTo({
              url: `/pages/list/main?name=${ev.mp.detail}`
            });
           /*  this.value=ev.mp.detail;
            this.$fly.get(`${this.baseUrl}/goods/search/${ev.mp.detail}`,).then(res=>{
                this.list=res.data;
                mpvue.nava
            }) */
        }
    }
}
</script>
<style>
       .sea{
    position: fixed;
    top:0;
    z-index: 10;
    width: 100%;
    }
</style>
