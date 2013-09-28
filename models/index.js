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


exports.User = mongoose.model('User');
exports.Project = mongoose.model('Project');
exports.Feed = mongoose.model('Feed');
