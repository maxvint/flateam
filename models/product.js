var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ProductSchema = new Schema({
  title: {type: String},
  uid: {type: ObjectId},
  name: {type: String},
  project: [],
  demand: [],
  bug: [],
  ctime: {type: Number}
});

mongoose.model('Product', ProductSchema);