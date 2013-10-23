var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var setDate = function() {
  return Math.round(new Date().getTime()/1000);
}

var ProjectSchema = new Schema({
  title: {type: String, default: '', trim: true, required: true},
  user: [],
  member: [{type: ObjectId, ref: 'User'}],
  product: [{type: ObjectId, ref: 'Product'}],
  progress: {type: Number, default: '0'},
  ctime: {type: Number, default: setDate},
  status: {type: Number, default: '1'}
});

/**
 * Validations
 */
ProjectSchema.path('title').validate(function(title) {
  return title.length > 0
}, '项目名称不能为空')

/**
 * Methods
 */
ProjectSchema.methods = {
  /**
   * 添加项目
   *
   * @param {Object} images
   * @param {Function} cb
   * @api private
   */
  add: function(callback) {
    return this.save(callback);
  }
}

ProjectSchema.statics = {
  getList: function(options, callback) {
    var query = options.query || {};
    this.find(query)
      .sort(options.sort)
      .limit(options.perpage)
      .skip(options.perpage * (options.page -1))
      .exec(callback);
  }
}

mongoose.model('Project', ProjectSchema);