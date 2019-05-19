const mongoose=require('mongoose');
const Order = require('../models/order.model');
module.exports={
  create: function (req, res, next) {
    const order = new Order(req.body)
    order.save().then(data => {
      res.json(data);
    });
  },
  list: function (req, res, next) {
    var id=req.params.id
    Order.find({U_id:id},null,{ sort: ({ _id: -1 })}, function (err, data) {
      res.json(data)
    });
  },
  listBy:function(req,res,next){
    Order.find(req.body).then(data=>{
      res.json(data)
    })
  },
  update:function(req,res,next){
    var id=req.params.id;
    Order.findByIdAndUpdate(id,{$set:req.body},{new:true}).then(data=>{
      res.json(data)
    })
  },
  delorder:function(req,res,next){
    var id=req.params.id;
    Order.findByIdAndRemove(id).then(res=>{
      res.json(data)
    })
  }
}
