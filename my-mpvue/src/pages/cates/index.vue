<template>
  <div id="cart">
    <scroll-view scroll-y="true">
      <view v-for="(item, index) in cartProduct" :key="index" style="margin-top:30rpx;width:100%">
        <a class="cartCard">
          <van-checkbox name="selcetCart" :value="item.ischeck" @change="onSelcet(index)"></van-checkbox>
          <van-card
            :num="item.num"
            :thumb-link="'/pages/prodetails/main?id='+item.id"
            centered="true"
            :price="item.price"
            desc="描述信息"
            :title="item.name"
            :thumb="item.img"
          >
            <view slot="footer">
              <van-row>
                <van-col :span="6" :offset="8">
                  <van-button type="danger" size="small" @click="delCates(index)">删除</van-button>
                </van-col>
                <van-col :span="8" :offset="2">
                  <van-stepper :value="item.num" @change="onChangeNum($event,index)"/>
                </van-col>
              </van-row>
            </view>
          </van-card>
        </a>
      </view>
    </scroll-view>
    <van-submit-bar :price="total " button-text="提交订单" @submit="onClickButton">
      <van-checkbox :value="checked " @change="onSelectAll">全选</van-checkbox>
    </van-submit-bar>
    <van-dialog id="van-dialog"/>
  </div>
</template>

<script>
import store from "../../store";
import Dialog from "../../../static/vant/dist/dialog/dialog";

export default {
  data() {
    return {
      show: false,
      cartProduct: "",
      checked: false,
      check: [],
      total: "",
      B_address: ""
    };
  },
  methods: {
    //删除
    delCates(index) {
      Dialog.confirm({
        message: "确定删除吗？"
      }).then(res => {
        this.cartProduct.splice(index, 1);
        this.editCates();
      });
    },
    //修改购物车内信息
    editCates() {
      this.$fly
        .put(
          `${this.baseUrl}/user/editcates/${store.state.userId}`,
          this.cartProduct
        )
        .then(res => {
          console.log(res)
          this.cartProduct = res.data.U_cates;
        });
    },
    //获取购物车信息
    getDetail() {
      this.$fly.get(`${this.baseUrl}/user/${store.state.userId}`).then(res => {
        console.log(res)

        this.cartProduct = res.data.U_cates;
        this.B_address = res.data.U_address[0];
      });
    },
    //提交订单
    onClickButton() {
      //删除选中的
      this.cartProduct = this.cartProduct.filter(element => {
        //选中的提交到订单
        if (element.ischeck) {
          this.$fly
            .post(`${this.baseUrl}/order`, {
              U_id: store.state.userId,
              S_id: element.S_id,
              G_id: element.id,
              B_address: this.B_address,
              name: element.name,
              price: element.price,
              num: element.num,
              img: element.img,
              send: false,
              pay: false,
              comment: false,
              receive: false
            })
            .then(res => {
              console.log(res);
              //卖出修改货量和销量
              this.$fly.get(`${this.baseUrl}/goods/${element.id}`).then(res => {
                let sell = res.data.G_sell + element.num;
                let num = res.data.G_num - element.num;
                this.$fly.put(`${this.baseUrl}/goods/${element.id}`, {
                  G_sell: sell,
                  G_num: num
                });
              });
            });
        }
        return element.ischeck == false;
      });
      this.editCates();
      mpvue.navigateTo({
        url: "/pages/confirm/main"
      });
    },

    onSelectAll() {
      if (this.checked) {
        this.check = []; //反选设空
        this.cartProduct.forEach(element => {
          element.ischeck = false;
        });
        this.checked = false;
      } else {
        this.check = [];
        this.cartProduct.forEach(element => {
          element.ischeck = true;
          this.check.push(element.ischeck); //全选 插入
        });
        this.checked = true;
      }
      this.editCates();
    },
    onSelcet(i) {
      if (this.cartProduct[i].ischeck) {
        this.check.pop(); //取消选择 移除一个
        this.cartProduct[i].ischeck = false;
        this.checked = false;
      } else {
        this.check.push(true); //选择 插入一个
        this.cartProduct[i].ischeck = true;
        if (this.check.length == this.cartProduct.length) {
          //判断两个数组长度是否相等 全选是否勾上
          this.checked = true;
        }
      }
      this.editCates();
    },
    //改变数量
    onChangeNum($event, i) {
      this.cartProduct[i].num = $event.mp.detail;
      this.editCates();
    }
  },
  onShow() {
    this.checked = false;
    this.getDetail();
  },
  watch: {
    //监听计算总价
    cartProduct: {
      handler: function(val, oldval) {
        this.total = 0;
        for (var value in val) {
          if (val[value].ischeck == true) {
            this.total += val[value].num * val[value].price*100;
          }
        }
      },
      deep: true
    }
  }
};
</script>

<style>
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

.van-card {
  background: #ffffff !important;
}

page {
  width: 100%;
  height: 100%;
}

#cart {
  width: 100%;
  height: 100%;
}

#cart scroll-view {
  width: 94%;
  height: 90%;
  margin: 0 auto;
}

.cartCard {
  display: flex;
  align-items: center;
  width: 100%;
  background: #ffffff;
}

.cartCard van-card {
  width: 100%;
}
</style>
