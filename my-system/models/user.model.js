const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    U_chat:String,
    U_name: String,
    U_type:String,
    U_pay:String
});
const User = mongoose.model('users',schema);
module.exports = User;