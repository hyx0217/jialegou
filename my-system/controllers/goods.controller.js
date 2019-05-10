const mongoose=require('mongoose');
const User = require('../models/goods.model');
module.exports={
  get:function(req,res,next){
    var id = req.params.id;
    console.log(id)
    User.findById(id).then(data=>{
      res.json(data);
    })
  },
  create:function(req,res,next){
    const good=new Good({
      G_name: 'Air jordon 1 新秀',
      G_parentId: '5ccff87ee92a552647a5410b',
      G_price: '1300.00',
      G_sell: '500',
      G_img:
       'http://wx1.sinaimg.cn/mw690/005A9zIVgy1fuxplbbqyvj30fi0f446v.jpg' });
    good.save(function(err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  }
}