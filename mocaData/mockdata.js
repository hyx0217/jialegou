var lodash=require('lodash');
var faker=require('faker');
var Mock=require('mockjs');

module.exports=function(){
    return {
        product:lodash.times(100,function(n){
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
        news:lodash.times(100,function(n){
            return{
                id:n,
                name:Mock.Random.cname(),
                img:faker.image.image(),
                text:Mock.Random.cparagraph(1, 3)
            }
        }),
        tree:lodash.times(20,function(n){
            return{
                    id:n,
                    name:Mock.Random.cname(),
                    childrens:lodash.times(15,function(n){
                        return{
                               
                                personId:n,
                                name:Mock.Random.cname(),
                                img:faker.image.image(),
                            }
                        
                    })       
                }
        }),
        order:lodash.times(10,function(n){
            return{
                id:n,
                name:Mock.Random.name(),
                img:faker.image.image(),
                pay:Mock.Random.boolean(),
                comment:Mock.Random.boolean(),
                send:Mock.Random.boolean(),
                price:Mock.Random.natural(100, 1000),
            }
        })
    }
}
