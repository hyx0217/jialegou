<template>
  <div>
    <div v-if="show">
      <van-cell-group>
        <van-field
          :value="formLogin.username "
          required
          clearable
          label="手机号"
          icon="question-o"
          placeholder="请输入手机号"
          @click-icon="onClickIcon"
          @change="onChangePh($event)"
        />
        <van-field
          :value="formLogin.password"
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
        <van-row>
          <van-col span="16">
            <van-field
              :value="form.U_phone"
              required
              clearable
              icon="question-o"
              label="手机号"
              placeholder="请输入手机号"
              :border="false "
            />
          </van-col>
          <van-col span="8">
            <van-button type="defalut" round size="large">获取验证码</van-button>
          </van-col>
        </van-row>
        <van-field :value="U_vli" label="验证码" placeholder="请输入验证码" required :border="false "/>
        <van-field
          :value="form.U_password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          required
          :border="false "
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
  
      <van-button type="primary" size="large">注册</van-button>
      <van-button type="defalut" size="large" @click="show=true">返回</van-button>
    </div>
  </div>
</template>
<script>
var Fly = require("flyio/dist/npm/wx");
var fly = new Fly();
export default {
  data() {
    return {
      baseUrl: process.env.API_ROOT,
      formLogin: {
        U_name: "",
        U_password: ""
      },
      form: {
        U_name: "",
        U_password: "",
        U_repassword: "",
        U_phone: "",
        U_vli: "123456"
      },
      show: true
    };
  },
  methods: {
    login() {
      fly.post(`${this.baseUrl}/`)
    },
    onChangePh(ev){
      this.formLogin.U_name=ev.mp.detail
    },
    onChangePs(ev){
      this.formLogin.U_password=ev.mp.detail
    }
  }
};
</script>

<style scoped>
</style>
