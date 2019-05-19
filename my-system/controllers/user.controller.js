const mongoose = require("mongoose");
const User = require("../models/user.model");
module.exports = {
  get: function(req, res, next) {
    var id = req.params.id;
    User.findById(id).then(data => {
      res.json(data);
    });
  },
  create: function(req, res, next) {
    const user = new User(req.body);
    user.save().then(data => {
      res.json(data);
    });
  },
  address: function(req, res, next) {
    var id = req.params.id;
    User.findByIdAndUpdate(
      id,
      { U_address: req.body.U_address },
      { new: true }
    ).then(data => {
      res.json(data);
    });
  },
  cates: function(req, res, next) {
    var id = req.params.id;
    //查找到用户，克隆购物车数组，在修改购物车数组
    User.findById(id).then(data => {
      let arr = data.U_cates.concat();
      //判断购物车里是否存在改商品，存在+上购买数量，不存在添加
      if (arr.length == 0) {
        arr.push(req.body.U_cates);
      } else {
        var i=0;
        for ( i = 0; i < arr.length; i++) {
          if (arr[i].id == req.body.U_cates.id) {
            arr[i].num = +arr[i].num + req.body.U_cates.num;
            break;
          }
        }
        if(i==arr.length){
          arr.push(req.body.U_cates);
        }
      }
      User.findByIdAndUpdate(id, { U_cates: arr }, { new: true }).then(data => {
        res.json(data);
      });
    });
  },
  editcates:function(req,res,next){
    var id=req.params.id;
    User.findByIdAndUpdate(id, { U_cates: req.body }, { new: true }).then(data => {
      res.json(data);
    });
  },
  //购买后删除购物车里选中的商品
  delcates:function(req,res,next){
    var id=req.params.id;
    User.findByIdAndUpdate(id, { U_cates: req.body }, { new: true }).then(data => {
      res.json(data);
    });
  },
};
