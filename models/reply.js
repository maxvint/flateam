var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ReplySchema = new Schema({
  post_id: {type: ObjectId},
  reply_id: {type: ObjectId},
  from: {type: String},
  uid: {type: ObjectId},
  name: {type: String},
  content: {type: String},
  ctime: {type: Number},
  status: {type: Number}
});
mongoose.model('Reply', ReplySchema);