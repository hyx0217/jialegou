<template>
  <div style='height: 100%;'>
    <sea></sea>
    <tree></tree> 
  </div>
</template>

<script>
import sea from '@/components/Common/sea'
import tree from '@/components/Classify/listTree'

export default {
  components: {
    sea,
    tree
  },
  data () {
    return {}
  }
}
</script>

<style>
page{ 
  height: 100%;
}
</style>
