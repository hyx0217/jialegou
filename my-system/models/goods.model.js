const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    G_name:String,
    G_parentId: String,
    G_img:String,
    G_price:String,
    G_sell:Number,
});
const Goods = mongoose.model('goods',schema);
module.exports = Goods;