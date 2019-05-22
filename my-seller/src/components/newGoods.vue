<template>
  <div>
    <van-cell-group>
      <van-field :value="form_goods.G_name " label="商品名称" placeholder="请输入商品名称" :border=" false "
        @change="onChangeNa($event)" />
      <div class="img_pos">
        <div v-for="(item,index) in images" :key="index">
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
        <van-field :value="form_goods.G_type" label="商品类型" placeholder="请选择商品类型" readonly :border=" false "
          @click="show=true" />
      </van-cell-group>
      <van-popup :show="show" position="bottom">
        <van-picker show-toolbar :columns="columns " @change="onChange" @cancel="show=false"
          @confirm="onChangeType($event)" />
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
  import store from "../store";
  const clssifys = {
    上衣: ["T桖", "衬衫", "羽绒服", "长袖", "卫衣", "Pole衫"],
    下装: ["牛仔裤", "休闲裤", "短裤", "裙子"],
    鞋子: ["运动鞋", "球鞋", "休闲鞋", "拖鞋", "高跟鞋"],
    电脑办公: ["台式电脑", "笔记本", "键盘", "耳机", "鼠标", "音响"],
    休闲零食: ["牛奶", "巧克力", "方便面", "辣条"],
    美妆护肤: ["口红", "面膜"],
    手机数码: ["老人机", "智能手机", "相机"]
  };
  export default {
    data() {
      return {
        form_goods: {
          G_name: "",
          G_parentId: store.state.storeId,
          G_img: '',
          G_price: "",
          G_num: "",
          G_type: "",
          G_sell: 0
        },
        img_total: [],
        images: [],
        columns: [{
            values: Object.keys(clssifys),
            className: "column1"
          },
          {
            values: clssifys["上衣"],
            className: "column2"
          }
        ],
        show: false
      };
    },
    methods: {
      pushGoods() {
        let that = this
        let arr = [];
        this.images.map(path => {
          arr.push(
            wx.uploadFile({
              url: `${that.baseUrl}/upload/singleImg`,
              filePath: path,
              name: 'img',
              success: function (res) {
                that.img_total.push(res.data)
                that.form_goods.G_img.push(res.data)
              }
            }))
        })
        Promise.all(arr).then(res => {
          console.log(that.form_goods)
          let a=that.form_goods.G_img
          console.log(a)
          that.$fly.post(`${this.baseUrl}/goods`, {
            G_name:that.form_goods.G_name,
            G_parentId:store.state.storeId,
            G_img:that.img_total,
            G_price:that.form_goods.G_price,
            G_num:that.form_goods.G_num,
            G_type:that.form_goods.G_type,
            G_sell:0
          }).then(res => {

            console.log(1,that.img_total)
            console.log(res)
          })
        })


      },
      chooseImg() {
        const that = this;
        mpvue.chooseImage({
          count: 9 || 1, //一次最多可以选择的图片张数
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success(res) {
            const images = that.images.concat(res.tempFilePaths)
            // 限制最多只能留下9张照片
            that.images = images.length <= 9 ? images : images.slice(0, 9)
            /*  if (that.img_total.length < 9) {
               that.img_total = that.img_total.concat(res.tempFilePaths);
               that.img_total.map(path => {
               wx.uploadFile({
                 url: `${that.baseUrl}/upload/singleImg`,
                 filePath: path,
                 name: 'img',
                 success(res) {
                   that.form_goods.G_img=
                   that.form_goods.G_img.push(res.data);
                 }
               })
             })
             } else {
               Toast.fail("最多只能上传9张图片");
             }*/
          }
        });

      },
      toBack() {
        this.$emit("showStore", "false");
      },
      onChangeNa(ev) {
        this.form_goods.G_name = ev.mp.detail;
      },
      onChangePr(ev) {
        this.form_goods.G_price = ev.mp.detail;
      },
      onChangeNum(ev) {
        this.form_goods.G_num = ev.mp.detail;
      },
      onChangeType(ev) {
        this.form_goods.G_type = ev.mp.detail.value[1];
        this.show = false;
      },
      onChange(event) {
        const {
          picker,
          value,
          index
        } = event.mp.detail;

        picker.setColumnValues(1, clssifys[value[0]]);
      }
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
