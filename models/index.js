var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.conn, function(err) {
	if(err){
		console.error('connect to %s error: ');
	}
});

require('./user');
require('./project');
require('./feed');
require('./task');
require('./reply');

exports.User = mongoose.model('User');
exports.Feed = mongoose.model('Feed');
exports.Project = mongoose.model('Project');
exports.Task = mongoose.model('Task');
exports.Reply = mongoose.model('Reply');