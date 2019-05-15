const mongoose=require('mongoose');
const Store = require('../models/store.model');
module.exports = {
  //开店
    register:function(req,res,next){
      const store = new Store(req.body)
      store.save().then(data => {
        if(data){
          res.json({'msg':'开店成功','status':200,'result':data})
        }else{
          res.json({'msg':'开店失败','status':400,'result':{}})
        }
    });
    },
  //根据用户id查找是否有这家店铺
    find:function(req,res,next){
      Store.findOne(req.body).then(data=>{
        if(data){
          res.json({'msg':'查找成功','status':200,'result':data})
        }else{
          res.json({'msg':'查找失败,该用户没有店铺','status':400,'result':{}})
        }
      })
    }
}