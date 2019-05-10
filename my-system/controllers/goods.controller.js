const mongoose = require('mongoose');
const Good = require('../models/goods.model');
module.exports = {
  get: function (req, res, next) {
    var id = req.params.id;
    User.findById(id).then(data => {
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
    var rows=req.body.rows?req.body.rows:3
    Good.paginate({}, { sort:({_id:-1}), page:+page, limit:+rows}, function(err, result) {
      console.log(result)
      result.rows=result.docs
      delete result.docs
        res.json(result.rows)
      });
},
}