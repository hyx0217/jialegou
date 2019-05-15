<template>
  <div>
    <van-dialog
      use-slot
      :show="msg"
      confirm-button-open-type="getUserInfo"
      @close="msg=true"
    >账号密码错误,请重新输入</van-dialog>
    <div v-if="show">
      <van-cell-group>
        <van-field
          :value="formLogin.U_phone "
          required
          clearable
          label="手机号"
          icon="question-o"
          placeholder="请输入手机号"
          @click-icon="onClickIcon"
          @change="onChangePh($event)"
        />
        <van-field
          :value="formLogin.U_password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          :border="false "
          @change="onChangePs($event)"
        />
      </van-cell-group>
      <van-button type="danger" size="large" @click="login">登录</van-button>
      <van-button type="primary" size="large" @click="show=false">注册</van-button>
    </div>
    <div v-else>
      <van-cell-group>
        <van-field
          :value="form.U_phone"
          required
          clearable
          icon="question-o"
          label="手机号"
          placeholder="请输入手机号"
          :border="false "
          @change="onRegisterPh($event)"
        />

        <van-field
          :value="U_vli"
          center
          clearable
          label="短信验证码"
          placeholder="请输入验证码"
          :border="false "
          use-button-slot
        >
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
        <van-field
          :value="form.U_password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          :border="false "
          @change="onRegisterPs($event)"
        />
        <van-field
          :value="form.U_repassword"
          type="password"
          label="确认密码"
          placeholder="请再次输入密码"
          required
          :border="false"
        />
      </van-cell-group>
      <van-button type="primary" size="large" @click="register">注册</van-button>
      <van-button type="defalut" size="large" @click="show=true">返回</van-button>
    </div>
  </div>
</template>
<script>
import store from "../../store.js";
var Fly = require("flyio/dist/npm/wx");
var fly = new Fly();
export default {
  data() {
    return {
      formLogin: {
        U_phone: "",
        U_password: ""
      },
      form: {
        U_name: "",
        U_password: "",
        U_repassword: "",
        U_phone: "",
        U_vli: ""
      },
      show: true,
      msg: false
    };
  },
  methods: {
    login() {
      fly
        .post(`${this.baseUrl}/seller/login`, {
          U_phone: this.formLogin.U_phone,
          U_password: this.formLogin.U_password
        })
        .then(res => {
          if (res.data.status == 200) {
            //关闭所有页面跳转到首页
            this.msg = false;
            wx.reLaunch({
              url: "/pages/index/main"
            });
          } else {
            this.msg = true;
          }
          //登录后把用户id存入vuex
          store.commit("login", res.data.result._id);
          //用户存入缓存
          wx.setStorage({
            key: "_id",
            data: res.data.result._id
          });
        });
    },
    register() {
      fly
        .post(`${this.baseUrl}/seller/register`, {
          U_phone: this.form.U_phone,
          U_password: this.form.U_password,
          U_type: 2 //默认卖家用户
        })
        .then(res => {
          this.show = true;
        });
    },

    onChangePh(ev) {
      this.formLogin.U_phone = ev.mp.detail;
    },
    onChangePs(ev) {
      this.formLogin.U_password = ev.mp.detail;
    },
    onRegisterPh(ev) {
      this.form.U_phone = ev.mp.detail;
    },
    onRegisterPs(ev) {
      this.form.U_password = ev.mp.detail;
    }
  }
};
</script>

<style scoped>
</style>
