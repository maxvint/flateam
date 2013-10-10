var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var BugSchema = new Schema({
  pid: {type: ObjectId},
  title: {type: String},
  content: {type: String},
  uid: {type: ObjectId},
  name: {type: String},
  toUid: {type: ObjectId},
  toName: {type: String},
  ctime: {type: Number},
  status: {type: Number}
});
mongoose.model('Bug', BugSchema);