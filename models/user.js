var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
  email: {type: String},
  password: {type: String},
  name: {type: String},
  project: [],
});

mongoose.model('User', UserSchema);