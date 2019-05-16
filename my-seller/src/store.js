// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userId: '',
    storeId:''
  },
  mutations: {
    login: (state,payload) => {
      state.userId=payload
    },
    keepStore: (state,payload) => {
      state.storeId=payload
    }
  }
})

export default store
