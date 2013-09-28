var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var FeedSchema = new Schema({
  pid: {type: ObjectId},
  uid: {type: ObjectId},
  title: {type: String},
  name: {type: String},
  content: {type: String},
  ctime: {type: Number},
  status: {type: Number},
  from: {type: String}
});
mongoose.model('Feed', FeedSchema);