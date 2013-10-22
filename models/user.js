var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
  email: {type: String},
  password: {type: String},
  name: {type: String},
  project: [],
});

UserSchema.statics = {
  getUser: function(options, callback) {
    var query = options.query || {};
    this.findOne(query)
      .exec(callback);
  }
};

mongoose.model('User', UserSchema);