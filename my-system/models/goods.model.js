const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const schema = new mongoose.Schema({
    G_name:String,
    G_parentId: String,
    G_img:String,
    G_price:String,
    G_sell:Number,
});
schema.plugin(mongoosePaginate);
const Goods = mongoose.model('goods',schema);
module.exports = Goods;