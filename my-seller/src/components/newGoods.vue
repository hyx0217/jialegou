<template>
  <div>
    <van-cell-group>
      <van-field
        :value="value "
        label='商品名称'
        placeholder="请输入商品名称"
        :border=" false "
        @change="onChange"
      />
      <van-field
        :value="value "
        placeholder="请输入商品价格"
        :border=" false "
        @change="onChange"
      />
      <van-field
        :value="value "
        placeholder="设置库存以防止超卖"
        :border=" false "
        @change="onChange"
      />
      <van-field
        :value="value "
        placeholder="请输入商品类型"
        :border=" false "
        @change="onChange"
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
