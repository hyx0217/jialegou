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
    <banner></banner>
    <hot></hot>
  </div>
</template>

<script>
import card from '@/components/Common/card'
import banner from '@/components/Common/banner'
import hot from '@/components/Home/hot'
export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      value:'',

      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },

  components: {
    card,
    banner,
    hot
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },
  
  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
   .sea{
    position: fixed;
    top:0;
    z-index: 10;
    width: 100%;
    }
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
}
</style>
