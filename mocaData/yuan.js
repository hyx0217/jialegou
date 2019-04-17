var lodash=require('lodash');
var faker=require('faker');
var Mock=require('mockjs');

module.exports=function(){
    return {
        organize:lodash.times(50,function(n){
            return{
                id:n,
                name:Mock.Random.cname(),
                img:faker.image.image(),
                price:Mock.Random.natural(100, 1000),
                stars:Mock.mock({
                    'number|1-100':100
                }),
                num:2,
                ischeck:false,
            }
        }),
       
    }
}