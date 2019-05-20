<template>
  <div>
    <van-cell-group>
      <van-field :value="form_goods.G_name " label="商品名称" placeholder="请输入商品名称" :border=" false "
        @change="onChangeNa($event)" />
      <div class="img_pos">
        <div v-for="(item,index) in img_total" :key="index">
          <img :src="item">
        </div>
        <div class="upload" @click="chooseImg">
          <van-icon size="150rpx" name="plus" />
        </div>
      </div>
      <van-toast id="van-toast" />
      <van-field label="商品价格" :value="form_goods.G_price " placeholder="请输入商品价格" :border=" false "
        @change="onChangePr($event)" />
      <van-field label="商品库存" :value="form_goods.G_num " placeholder="设置库存以防止超卖" :border=" false "
        @change="onChangeNum($event)" />
      <van-cell-group>
        <van-field :value='form_goods.G_type' label="商品类型" placeholder="请选择商品类型" readonly :border=" false "
          @click="show=true" />
      </van-cell-group>
      <van-popup :show="show" position="bottom">
        <van-picker show-toolbar :columns="columns " @cancel="show=false" @confirm="onChangeType($event)" />
      </van-popup>

    </van-cell-group>
    <div style="position:fixed;bottom:0; width:100%">
      <van-button type="danger" size="large" @click="pushGoods">上架</van-button>
      <van-button type="default" size="large" @click="toBack">返回</van-button>
    </div>
  </div>
</template>

<script>
  import Toast from "../../static/vant/dist/toast/toast";
  import store from '../store'
  export default {
    data() {
      return {
        form_goods: {
          G_name: '',
          G_parentId: store.state.storeId,
          G_img: [],
          G_price: '',
          G_num: '',
          G_type: '',
          G_sell:0
        },
        img_total: [],
        columns: ['电脑', '手机', '上衣', '裤子', '零食','运动鞋', '其他'],
        show: false
      };
    },
    methods: {
      pushGoods() {
        this.$fly.post(`${this.baseUrl}/goods`, this.form_goods).then(res => {
  
        })
      },
      chooseImg() {
        const that = this;
        mpvue.chooseImage({
          count: 9 || 1, //一次最多可以选择的图片张数
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success(res) {
            if (that.img_total.length < 9) {
              that.img_total = that.img_total.concat(res.tempFilePaths);
              that.form_goods.G_img = that.img_total
            } else {
              Toast.fail("最多只能上传9张图片");
            }
          }
        });
      },
      toBack(){
        this.$emit('showStore','false')
      },
      onChangeNa(ev) {
        this.form_goods.G_name = ev.mp.detail
      },
      onChangePr(ev) {
        this.form_goods.G_price = ev.mp.detail
      },
      onChangeNum(ev) {
        this.form_goods.G_num = ev.mp.detail
      },
      onChangeType(ev) {
        this.form_goods.G_type=ev.mp.detail.value;
        this.show=false
      },
    }
  };

</script>

<style>
  .upload {
    height: 150rpx;
  }

  .img_pos div {
    float: left;
    width: 20%;
  }

  .img_pos img {
    width: 100%;
    height: 150rpx;
  }

</style>
