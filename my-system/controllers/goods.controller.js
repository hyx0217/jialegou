const mongoose = require('mongoose');
const Good = require('../models/goods.model');
module.exports = {
  get: function (req, res, next) {
    var id = req.params.id;
    Good.findById(id).then(data => {
      res.json(data);
    })
  },
  create: function (req, res, next) {
    const good = new Good(req.body)
    good.save().then(data => {
      res.json(data);

    });
  },
  list:function(req,res,next){
    var page=req.body.page?req.body.page:1;
    var rows=req.body.rows?req.body.rows:3;
    Good.paginate({}, { sort:({_id:-1}), page:+page, limit:+rows}, function(err, result) {
      result.rows=result.docs
      delete result.docs
        res.json(result.rows)
      });
},
  listByStore:function(req,res,next){
   const parentId=req.params.parentId
   Good.find({G_parentId:parentId}).then(data=>{
    if(data){
      res.json({'msg':'查找成功','status':200,'result':data})
    }else{
      res.json({'msg':'查找失败','status':400,'result':{}})
    }
})
  }
}