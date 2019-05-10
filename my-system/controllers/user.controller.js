const mongoose=require('mongoose');
const User = require('../models/user.model');
exports.get=function(req,res,next){
    var id = req.params.id;
    User.findById(id).then(data=>{
      res.json(data);
    })
  }