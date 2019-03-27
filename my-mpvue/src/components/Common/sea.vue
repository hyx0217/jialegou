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
