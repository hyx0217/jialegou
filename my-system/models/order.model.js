const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    U_id:String,
    U_name:String,
    G_id:String,
    S_id:String,
    name:String,
    price:String,
    B_address:Object,
    num:String,
    img:String,
    send:Boolean,
    pay:Boolean,
    comment:Boolean,
    receive:Boolean,
});
const Order = mongoose.model('orders',schema);
module.exports = Order;