const mongoose = require('mongoose');
const Like = require('../models/likes.model');
module.exports = {
  get: function (req, res, next) {
    var id = req.params.id;
    Like.findById(id).then(data => {
      res.json(data);
    })
  },
  create: function (req, res, next) {
    const like = new Like(req.body)
    like.save().then(data => {
      res.json(data);
    });
  },
  delete:function(req,res,next){
    var id = req.params.id;
    Like.findByIdAndRemove(id).then(data => {
      res.json(data);
    })
  },
  list:function (req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var rows = req.body.rows ? req.body.rows : 10;
    Like.paginate({U_id:req.body.U_id}, { sort: ({ _id: -1 }), page: +page, limit: +rows }, function (err, result) {
      result.rows = result.docs
      delete result.docs
      res.json(result.rows)
    });
  },
}