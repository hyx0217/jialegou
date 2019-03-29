<template>
    <div>
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
                label="详细地址"
                placeholder="街道门牌信息"
                :border=" false "
            />
        </van-cell-group>
</div>
</template>
<script>
export default {
    data(){
        return {
            show:false,
            data:'',
            list:{
            name:'',
            address:'',
            phone:'',
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
        confirm(res){
            this.data=res.mp.detail.values; //获取选择的城市区
        }
    },
    watch:{
        confirm:function(v1,v2){
            console.log(v1,v2)
        }
    }
}
</script>
<style>

</style>