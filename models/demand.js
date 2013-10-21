var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var DemandSchema = new Schema({
  pid: {type: ObjectId},
  title: {type: String},
  content: {type: String},
  uid: {type: ObjectId},
  name: {type: String},
  ctime: {type: Number},
  status: {type: Number}
});

DemandSchema.statics = {
  getShowById: function (options, callback) {
    var query = options.query || {};
    this.findOne(query)
      .exec(callback);
  }
}

mongoose.model('Demand', DemandSchema);