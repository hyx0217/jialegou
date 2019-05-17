const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    U_id:String,
    U_name: String,
    G_id:String,
    C_comment:String,
});
const Comments = mongoose.model('comments',schema);
module.exports = Comments;