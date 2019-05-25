<template>
    <div>
        <swiper
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        >
         <block v-for="(item, index) in imgUrls" :key="index" >
              <swiper-item>
                <image style="height:100%" :src="item" class="slide-image"/>
              </swiper-item>
            </block>
          </swiper>
    </div>
        
</template>
<script>
export default {
    data(){
        return{
            imgUrls: [
                'https://m.360buyimg.com/babel/jfs/t9949/132/2897033239/190435/6e97206f/5cdc2fefN01faac05.jpg!q60',
                'https://img.alicdn.com/simba/img/TB1H9rvXRKw3KVjSZFOSuurDVXa.jpg',
                'https://m.360buyimg.com/babel/jfs/t29740/100/1572792053/98357/b01cc632/5ce3b2b4N73b1bf34.jpg'
            ],
            indicatorDots: false,
            autoplay: true,
            interval: 5000,
            duration: 1000
        }
    }
}
</script>
<style>
    image{
        width: 100%
    }
</style>