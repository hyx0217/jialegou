<template>
  <div>
      <img :src='product.img'>
      <p>{{product.name}}</p>
  </div>
</template>

<script>
var Fly=require("flyio/dist/npm/wx") 
var fly=new Fly
export default {
  components: {
        
  },

  data () {
    return {
        id:'',
        product:[]
    }
  },
  methods: {
    getDetail(){
        var url='http://localhost:3000/product/'+this.id
        fly.get(url).then(res=>{
            this.product=res.data
        })
    }
  },
  mounted() {
      this.id=this.$root.$mp.query.id
      this.getDetail()
  }, 
}
</script>

<style>

</style>
