var models = require('../models');
var Project = models.Project;
var Feed = models.Feed;
var User = models.User;

exports.index = function (req, res, next) {
  res.render('user/index', {
      title: '我的主页',
      alias: 'user',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
}