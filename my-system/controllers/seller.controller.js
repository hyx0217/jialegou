const mongoose=require('mongoose');
const Seller = require('../models/seller.model');
module.exports = {
  //登录
    login:function(req,res,next){
    var userinfo=req.body;
    Seller.findOne(userinfo).then(data=>{
        if(data){
          res.json({'msg':'登录成功','status':200,'result':data})
        }else{
          res.json({'msg':'登录失败','status':400,'result':{}})
        }
    })
  },
  //注册
    register:function(req,res,next){
      const user = new Seller(req.body)
      user.save().then(data => {
        if(data){
          res.json({'msg':'注册成功','status':200,'result':data})
        }else{
          res.json({'msg':'注册失败','status':400,'result':{}})
        }
    });
    }
}