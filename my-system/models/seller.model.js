const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    U_name: String,
    U_type:String,
    U_pay:String,
    U_phone:String,
    U_password:String
});
const Seller = mongoose.model('sellers',schema);
module.exports = Seller;