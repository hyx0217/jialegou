<template>
  <div id="classify">
    <div class="cfy-left">
      <scroll-view scroll-y="true" style="height:100%">
        <view
          v-for="(item,index) in kinds"
          :key="index"
          @click="onTab(index)"
          :class="{active:check===index}"
          class="list"
        >
          <span>{{item}}</span>
        </view>
      </scroll-view>
    </div>
    <div class="cfy-right">
      <div class="hidebox" v-for="(item,i) in kindsKid" :key="i" :class="{active:check===i}">
        <ul class="kid">
          <li v-for="(kid,index) in item" :key="index">
            <a :href="'/pages/list/main?G_type='+kid.name">
              <img :src="kid.img" style="width:100rpx;height:100rpx">
              <span>{{kid.name}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      kinds: [
        "上衣",
        "下装",
        "球鞋",
        "电脑办公",
        "休闲零食",
        "美妆护肤",
        "手机数码",
        "其他"
      ],
      kindsKid: [
        [
          { name: "T桖", img: "/static/images/T桖.png" },
          { name: "长袖", img: "/static/images/cloth.png" },
          { name: "衬衫", img: "/static/images/衬衫.png" },
          { name: "Polo衫", img: "/static/images/Polo衫.png" },
          { name: "卫衣", img: "/static/images/卫衣.png" },
          { name: "羽绒服", img: "/static/images/羽绒服.png" },

        ],
        [
          { name: "牛仔裤", img: "/static/images/牛仔裤.png" },
          { name: "休闲裤", img: "/static/images/休闲裤.png" },
          { name: "短裤", img: "/static/images/短裤.png" },
          { name: "裙子", img: "/static/images/裙子.png" }   
        ],
        [
          { name: "运动鞋", img: "/static/images/运动鞋.png" },
          { name: "球鞋", img: "/static/images/球鞋.png" },
          { name: "休闲鞋", img: "/static/images/休闲鞋.png" },
          { name: "拖鞋", img: "/static/images/拖鞋.png" },   
          { name: "高跟鞋", img: "/static/images/高跟鞋.png" }   
        ],
        [
          { name: "台式电脑", img: "/static/images/台式电脑.png" },
          { name: "笔记本", img: "/static/images/笔记本.png" },
          { name: "键盘", img: "/static/images/键盘.png" },
          { name: "鼠标", img: "/static/images/鼠标.png" },   
          { name: "耳机", img: "/static/images/耳机.png" }   
        ],
        [
          { name: "牛奶", img: "/static/images/牛奶.png" },
          { name: "巧克力", img: "/static/images/巧克力.png" },
          { name: "方便面", img: "/static/images/方便面.png" },
          { name: "辣条", img: "/static/images/辣条.png" } 
        ],
        [
          { name: "口红", img: "/static/images/口红.png" },
          { name: "面膜", img: "/static/images/面膜.png" },
        ],
         [
          { name: "智能手机", img: "/static/images/智能手机.png" },
          { name: "老人机", img: "/static/images/老人机.png" },
          { name: "相机", img: "/static/images/相机.png" }
        ],
      ],
      check: 0, //默认第一个TAB
      itemHeight: "100", //左侧每类产品高度,
      listHeight: ""
    };
  },
  methods: {
    /* getKind(){
            const baseUrl=process.env.API_ROOT
          var url=`${baseUrl}/tree`
          this.$fly.get(url
          ).then(res=>{
              this.kinds=res.data;
              this.listHeight=this.itemHeight*this.kinds.length;//根据产品个数计算左侧栏高度
              for(let i=0;i<res.data.length;i++){
                  this.kindsKid.push(res.data[i].childrens);
              }
          })
      }, */
    //Tab切换
    onTab(index) {
      this.check = index;
    },
    //获取高度
    getHeight() {
      var query = wx.createSelectorQuery();
      query
        .select("#classify")
        .boundingClientRect(rects => {
          console.log(rects);
        })
        .exec();
    }
  },
  created() {
    this.listHeight = this.itemHeight * this.kinds.length; //根据产品个数计算左侧栏高度
    this.getHeight();
  }
};
</script>
<style>
/****隐藏滚动条***/
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
#classify {
  height: 92%;
  width: 100%;
  background: #ffffff;
  position: relative;
}
.cfy-left {
  position: absolute;
  left: 0;
  width: 20%;
  height: 100%;
  background: #f7f8fa;
}
.list {
  text-align: center;
  padding: 0 10rpx;
  height: 100rpx;
  line-height: 100rpx;
  border-top: 1px solid #c3c3c3;
}
.list span {
  font-size: 32rpx;
}
.list.active {
  color: red;
}
.cfy-right {
  position: absolute;
  right: 0;
  width: 80%;
}

.hidebox.active {
  display: block;
}
.hidebox {
  display: none;
}
.kid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.kid li {
  width: 50%;
  margin-top: 50rpx;
}
.kid li a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
}
</style>

