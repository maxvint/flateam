var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.conn, function(err) {
	if(err){
		console.error('connect to %s error: ');
	}
});

require('./user');
require('./reply');
require('./feed');
require('./product');
require('./project');
require('./task');
require('./demand');
require('./bug');

exports.User = mongoose.model('User');
exports.Reply = mongoose.model('Reply');
exports.Feed = mongoose.model('Feed');
exports.Product = mongoose.model('Product');
exports.Project = mongoose.model('Project');
exports.Task = mongoose.model('Task');
exports.Demand = mongoose.model('Demand');
exports.Bug = mongoose.model('Bug');