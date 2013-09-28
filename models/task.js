var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TaskSchema = new Schema({
  pid: {type: ObjectId},
  title: {type: String},
  uid: {type: ObjectId},
  name: {type: String},
  ctime: {type: Number},
  status: {type: Number}
});
mongoose.model('Task', TaskSchema);