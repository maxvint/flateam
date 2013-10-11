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




ProjectSchema.statics = {
  list: function (options, cb) {
    var criteria = options.criteria || {}
    console.log(options);
    this.find(criteria)
      // .populate('user', 'name username')
      .sort(options.sort)
      .limit(options.perpage)
      .skip(options.perpage * (options.page -1))
      .exec(cb)
  }
}



mongoose.model('Project', ProjectSchema);