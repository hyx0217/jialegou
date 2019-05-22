const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const schema = new mongoose.Schema({
    U_id:String,
    G_id:String,
    G_name:String,
    G_price:String,
    G_img:String,
});
schema.plugin(mongoosePaginate);

const Likes = mongoose.model('likes',schema);
module.exports = Likes;