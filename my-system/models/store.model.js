const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    S_name: String,
    S_boss:String,
    S_money:String,
    S_address:String,
    S_children:Array,
    S_income:String,
    S_order:Number,
});
const Store = mongoose.model('stores',schema);
module.exports = Store;