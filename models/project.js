var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ProjectSchema = new Schema({
  title: {type: String},
  uid: {type: ObjectId},
  name: {type: String},
  member: [],
  progress: {type: Number},
  ctime: {type: Number},
  status: {type: Number},
});

mongoose.model('Project', ProjectSchema);