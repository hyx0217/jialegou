import Vue from 'vue'
import App from './App'
var Fly = require("flyio/dist/npm/wx");
var fly = new Fly();

Vue.prototype.$fly = fly;
Vue.prototype.baseUrl = process.env.API_ROOT;
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
