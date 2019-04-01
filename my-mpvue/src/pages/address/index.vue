<template>
    <div id='address'>
        <div v-show='hide'>
            <div class='box'>
                <van-icon name="location-o" size='100rpx'/>
                <p>你还没有添加收货地址</p>
            </div>
            <van-button type="danger" size="large" @click="add()" style='position:fixed;bottom:0;width:100%'>添加收货地址</van-button>
        </div>
        <div v-show='hide2'>
            <van-cell-group>
                <van-field
                    :value=" list.name "
                    label="收货人"
                    placeholder="请输入收货人姓名"
                    :border="false"
                    @change="onChange"
                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    :value=" list.phone "
                    label="手机号"
                    placeholder="请输入手机号"
                    :border="false"
                />
            </van-cell-group>
            <van-cell-group>
                <van-field
                    :value='list.address'
                    label="收货地区"
                    :border=" false "
                    @click="show=true"
                />
            </van-cell-group>
            <!-- 弹出地区选项 -->
            <van-popup :show="show" position="bottom">
                <van-area :area-list="areaList" @cancel='show=false' @confirm='confirm'/>
            </van-popup>
            <van-cell-group>
                <van-field
                    :value='list.road'
                    label="详细地址"
                    placeholder="街道门牌信息"
                    :border=" false "
                />
            </van-cell-group>
            <van-button type="primary" size="large" @click='keep()'>保存</van-button>
            <van-button type="default" size="large" @click='cancel()'>取消</van-button>
        </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            hide:true,
            hide2:false,
            page:1,//当前收货地址的页面
            show:false,
            data:'',
            list:{
            name:'',
            address:'',
            phone:'',
            road:''
        },
            areaList:{
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
    methods:{
        add(){
            this.page=2;
            this.areaList={
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
        add(){
            this.hide=false;
            this.hide2=true;
        },
        //保存收货地址
        keep(){
            this.hide=true;
            this.hide2=false;
        },
        //取消返回
        cancel(){
            this.hide=true;
            this.hide2=false;
        },
        confirm(res){
            this.data=res.mp.detail.values; //获取选择的城市区
            this.list.address=this.data[0].name+this.data[1].name+this.data[2].name;
            this.show=false;//关闭弹出
        }
    }
}
</script>
<style>
page{
    height: 100%;
}
#address{
    position: relative;
    height: 100%;
}
.box{
    text-align: center;
    position: absolute;
    top:40%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.box p{
    font-size: 30rpx;
    color: #c3c3c3;
}
</style>