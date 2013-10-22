var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var BugSchema = new Schema({
  pid: {type: ObjectId},
  title: {type: String},
  content: {type: String},
  level: {type: Number},
  module: {type: ObjectId},
  uid: {type: ObjectId},
  name: {type: String},
  toUid: {type: ObjectId},
  toName: {type: String},
  ctime: {type: Number},
  status: {type: Number}
});

BugSchema.statics = {
  getBug: function(options, callback) {
    var query = options.query || {};
    this.findOne(options.query)
      .exec(callback);
  }
};

mongoose.model('Bug', BugSchema);