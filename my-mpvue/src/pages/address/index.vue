<template>
  <div id='address'>
    <div v-show='hide'>
      <div class='box' v-if='arrList.length==0'>
        <van-icon name="location-o" size='100rpx' />
        <p>你还没有添加收货地址</p>
      </div>
      <div v-else>
        <ul>
          <li v-for='(item,index) in arrList' :key='index'>
            <van-cell-group>
              <van-cell :title="item.name+','+item.phone" :label="'收货地址:'+item.address+item.road" :border=" false ">
                <van-icon slot="right-icon" name="edit" class="van-cell__right-icon" size='40rpx'
                  @click="onEdit(item,index)" />
              </van-cell>
            </van-cell-group>
          </li>
        </ul>
      </div>
      <van-button type="danger" size="large" @click="addOpen()" style='position:fixed;bottom:0;width:100%'>添加收货地址
      </van-button>
    </div>
    <div v-show='hide2'>
      <van-cell-group>
        <van-field :value='list.name' label="收货人" placeholder="请输入收货人姓名" :border="false"
          @change="onChangeName($event)" />
      </van-cell-group>
      <van-cell-group>
        <van-field :value='list.phone' label="手机号" placeholder="请输入手机号" :border="false" @change="onChangePhone($event)" />
      </van-cell-group>
      <van-cell-group>
        <van-field :value='list.address' label="收货地区" placeholder="请选择收货地区" readonly :border=" false "
          @click="show=true" />
      </van-cell-group>
      <!-- 弹出地区选项 -->
      <van-popup :show="show" position="bottom">
        <van-area :area-list="areaList" @cancel='show=false' @confirm='confirm' />
      </van-popup>
      <van-cell-group>
        <van-field :value='list.road' label="详细地址" placeholder="街道门牌信息" :border=" false "
          @change="onChangeRoad($event)" />
      </van-cell-group>
      <van-button type="primary" size="large" @click='keep()'>保存</van-button>
      <van-button type="default" size="large" @click='cancel()'>取消</van-button>
    </div>
    <div v-show='hide3'>
      <van-cell-group>
        <van-field :value='list.name' label="收货人" placeholder="请输入收货人姓名" :border="false"
          @change="onChangeName($event)" />
      </van-cell-group>
      <van-cell-group>
        <van-field :value='list.phone' label="手机号" placeholder="请输入手机号" :border="false"
          @change="onChangePhone($event)" />
      </van-cell-group>
      <van-cell-group>
        <van-field :value='list.address' label="收货地区" placeholder="请选择收货地区" readonly :border=" false "
          @click="show=true" />
      </van-cell-group>
      <!-- 弹出地区选项 -->
      <van-popup :show="show" position="bottom">
        <van-area :area-list="areaList" @cancel='show=false' @confirm='confirm' />
      </van-popup>
      <van-cell-group>
        <van-field :value='list.road' label="详细地址" placeholder="街道门牌信息" :border=" false "
          @change="onChangeRoad($event)" />
      </van-cell-group>
      <van-button type="primary" size="large" @click='keepEdit()'>保存</van-button>
      <van-button type="default" size="large" @click='delAddress()'>删除地址</van-button>
      <van-button type="default" size="large" @click='cancel()'>取消</van-button>
    </div>
    <van-dialog id="van-dialog"/>

  </div>
</template>
<script>
  import store from '../../store'
  import Dialog from "../../../static/vant/dist/dialog/dialog";
  export default {
    data() {
      return {
        hide: true,
        hide2: false,
        hide3: false,
        page: 1, //当前收货地址的页面
        show: false,
        data: '',
        pos: '', //点击修改时保存修改对象的下标
        arrList: [], //所有收货地址管理
        list: { //添加单个收货地址
          name: '',
          address: '',
          phone: '',
          road: ''
        },
        areaList: {
          province_list: {
            110000: '北京市',
            120000: '天津市'
          },
          city_list: {
            110100: '北京市',
            110200: '县',
            120100: '天津市',
            120200: '县'
          },
          county_list: {
            110101: '东城区',
            110102: '西城区',
            110105: '朝阳区',
            110106: '丰台区',
            120101: '和平区',
            120102: '河东区',
            120103: '河西区',
            120104: '南开区',
            120105: '河北区',
            // ....
          }
        }
      }
    },
    methods: {
      //获取地址
      getAddress(){
        this.$fly.get(`${this.baseUrl}/user/${store.state.userId}`).then(res=>{
          this.arrList=res.data.U_address
        })
      },
      //存地址到后端
      address() {
        this.$fly.put(`${this.baseUrl}/user/address/${store.state.userId}`, {
          U_address: this.arrList
        }).then(res => {
        })
      },
      add() {
        this.page = 2;
        this.areaList = {
          province_list: {
            110000: '北京市',
            120000: '天津市'
          },
          city_list: {
            110100: '北京市',
            110200: '县',
            120100: '天津市',
            120200: '县'
          },
          county_list: {
            110101: '东城区',
            110102: '西城区',
            110105: '朝阳区',
            110106: '丰台区',
            120101: '和平区',
            120102: '河东区',
            120103: '河西区',
            120104: '南开区',
            120105: '河北区',
            // ....
          }
        }
      },
      //添加收货地址
      addOpen() {
        this.list = { //打开后重置
          name: '',
          address: '',
          phone: '',
          road: ''
        };
        this.list.phone='';
        this.hide = false;
        this.hide2 = true;
        this.hide3 = false;
      },
      //保存收货地址
      keep() {
        this.arrList.push(this.list);
        //保存地址
        this.address()
        this.hide = true;
        this.hide2 = false;
        this.hide3 = false;
      },
      //取消返回
      cancel() {
        this.hide = true;
        this.hide2 = false;
        this.hide3 = false;
      },
      onChangeName(ev) {
        this.list.name = ev.mp.detail
      },
      onChangePhone(ev) {
        this.list.phone = ev.mp.detail
      },
      onChangeRoad(ev) {
        this.list.road = ev.mp.detail
      },
      confirm(res) {
        this.data = res.mp.detail.values; //获取选择的城市区
        this.list.address = this.data[0].name + this.data[1].name + this.data[2].name;
        this.show = false; //关闭弹出
      },
      //修改地址
      onEdit(ele, i) {
        this.list = ele;
        this.pos = i
        this.hide = false;
        this.hide2 = false;
        this.hide3 = true;

      },
      //保存修改
      keepEdit() {
        this.arrList[this.pos] = this.list;
        this.address();
        this.hide = true;
        this.hide2 = false;
        this.hide3 = false;
        
      },
      //删除地址
      delAddress() {
        Dialog.confirm({
        message: "确定删除吗？"
      }).then(res=>{
        this.arrList.splice(this.pos, 1);
        this.address();
        this.hide = true;
        this.hide2 = false;
        this.hide3 = false;
      })
      }
    },
    onShow(){
      this.getAddress()
    },
    mounted() {
      this.hide = true;
      this.hide2 = false;
      this.hide3 = false; //防止在添加收货地址时退出，再次进来时还是添加地址
    }
  }

</script>
<style>
  page {
    height: 100%;
  }

  #address {
    position: relative;
    height: 100%;
  }

  .box {
    text-align: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .box p {
    font-size: 30rpx;
    color: #c3c3c3;
  }

</style>
