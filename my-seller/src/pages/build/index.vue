<template>
  <div>
    <van-cell-group>
      <van-field
        :value="form.S_name"
        required
        clearable
        icon="question-o"
        label="店铺名称"
        placeholder="请输入店铺名称"
        :border="false "
        @change="onRegisterNa($event)"
      />
      <van-field
        :value="vli"
        center
        clearable
        label="短信验证码"
        placeholder="请输入用户手机的验证码"
        :border="false "
        use-button-slot
      >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
      <van-field
        :value="form.S_address"
        label="发货地址"
        placeholder="请输入发货地址"
        required
        :border="false "
        @change="onRegisterAd($event)"
      />
      <van-field
        :value="form.S_money"
        label="缴纳金"
        placeholder="请输入金额不低于200"
        required
        :border="false"
        @change="onRegisterMo($event)"
      />
    </van-cell-group>
    <van-button type="primary" size="large" @click="register">开店</van-button>
    <van-button type="defalut" size="large" @click="toIndex">返回</van-button>
  </div>
  

</template>

<script>
import store from "../../store.js";
import Notify from "../../../static/vant/dist/notify/notify";
export default {
  data() {
    return {
      form: {
        S_name: "",
        S_boss:'',
        S_money: "",
        S_childen: [],
        S_address: ""
      },
      vli:''
    };
  },
  methods: {
    register() {
      this.$fly.post(`${this.baseUrl}/store/register`,this.form)
        .then(res => {
          this.toIndex()
        });
    },
    onRegisterNa(ev) {
      this.form.S_name = ev.mp.detail;
    },
    onRegisterAd(ev) {
      this.form.S_address = ev.mp.detail;
    },
    onRegisterMo(ev) {
      this.form.S_money = ev.mp.detail;
    },
     toIndex() {
        mpvue.switchTab({
          url: "/pages/index/main"
        });
      },
  },
  mounted(){
    this.form.S_boss=store.state.userId
  }
};
</script>

<style>
</style>
