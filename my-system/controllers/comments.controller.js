const mongoose = require('mongoose');
const Comment = require('../models/comments.model');
module.exports = {
  get: function (req, res, next) {
    var id = req.params.id;
    Comment.findById(id).then(data => {
      res.json(data);
    })
  },
  create: function (req, res, next) {
    const comment = new Comment(req.body)
    comment.save().then(data => {
      res.json(data);
    });
  },
  list:function(req,res,next){
   const id=req.params.id
   Comment.find({G_id:id}).then(data=>{
    if(data){
      res.json({'msg':'查找成功','status':200,'result':data})
    }else{
      res.json({'msg':'查找失败','status':400,'result':{}})
    }
})
  }
}