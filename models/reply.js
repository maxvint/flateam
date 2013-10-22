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

ReplySchema.statics = {
  getList: function(options, callback) {
    var query = options.query || {};
    this.find(query)
      .sort(options.sort)
      .limit(options.limit)
      .skip(options.perpage * (options.page -1))
      .exec(callback);
  }
}

mongoose.model('Reply', ReplySchema);