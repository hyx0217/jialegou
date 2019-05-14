const mongoose=require('mongoose');
const Seller = require('../models/user.model');
exports.get=function(req,res,next){
    var id = req.params.id;
    Seller.findById(id).then(data=>{
      res.json(data);
    })
  }