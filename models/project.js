var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ProjectSchema = new Schema({
  title: {type: String},
  name: {type: String},
  uid: {type: ObjectId},
  ctime: {type: Number},
  status: {type: Number},
});

mongoose.model('Project', ProjectSchema);