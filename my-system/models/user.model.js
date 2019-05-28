const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    U_name: String,
    U_img:String,
    U_pay:String,
    U_address:Array,
    U_cates:Array,
    openid:String,
    token:String
});
const User = mongoose.model('users',schema);
module.exports = User;