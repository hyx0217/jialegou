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
    console.log(req.body)
    good.save().then(data => {
      res.json(data);
    });
  },
  update: function (req, res, next) {
    var id = req.params.id;
    Good.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then(data => {
      res.json(data);
    })
  },
  delete: function (req, res, next) {
    var id = req.params.id;
    Good.findByIdAndRemove(id).then(data => {
      res.json(data);
    })
  },
  list: function (req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var rows = req.body.rows ? req.body.rows : 3;
    var obj=req.body.G_type?{G_type:req.body.G_type}:{}
    Good.paginate(obj, { sort: ({ _id: -1 }), page: +page, limit: +rows }, function (err, result) {
      result.rows = result.docs
      delete result.docs
      res.json(result.rows)
    });
  },
   listBySell: function (req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var rows = req.body.rows ? req.body.rows : 3;
    Good.paginate({}, { sort: ({ G_sell: -1 }), page: +page, limit: +rows }, function (err, result) {
      result.rows = result.docs
      delete result.docs
      res.json(result.rows)
    });
  },
  //通过店铺Id获取
  listByStore: function (req, res, next) {
    const parentId = req.params.parentId
    Good.find({ G_parentId: parentId,G_num : {$gt : 0} },null,{sort:({ _id: -1 })}).then(data => {
      if (data) {
        res.json({ 'msg': '查找成功', 'status': 200, 'result': data })
      } else {
        res.json({ 'msg': '查找失败', 'status': 400, 'result': {} })
      }
    })
  },
  listByNone: function (req, res, next) {
    const parentId = req.params.parentId
    Good.find({ G_parentId: parentId,G_num:0 },null,{sort: ({_id: -1 })}).then(data => {
      if (data) {
        res.json({ 'msg': '查找成功', 'status': 200, 'result': data })
      } else {
        res.json({ 'msg': '查找失败', 'status': 400, 'result': {} })
      }
    })
  },
  search:function(req,res,next){
    var name = req.body.name;
    var page = req.body.page?req.body.page:1;
    var rows = req.body.rows?req.body.rows:10;
    Good.paginate({G_name:new RegExp(name,'g')},{page:+page,limit:+rows},function(err,result){
      result.rows = result.docs;
      delete result.docs;
      res.json(result.rows);
    })
  }
}