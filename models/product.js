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

ProductSchema.statics = {
  getProduct: function(options, callback) {
    var query = options.query || {};
    this.findOne(query)
      .exec(callback);
  },
  getList: function(options, callback) {
    var query = options.query || {};
    this.find(query)
      .exec(callback);
  }
}

mongoose.model('Product', ProductSchema);