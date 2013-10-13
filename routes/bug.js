var models = require('../models');
var User = models.User;
var Bug = models.Bug;
var Product = models.Product;
var Project = models.Project;
var Reply = models.Reply;

exports.index = function (req, res, next) {
  var count;
  var perpage = 15;
  var page = req.query.p ? parseInt(req.query.p) : 1;

  // 获取产品列表
  User.findOne({_id: req.session.user._id}, function (err, user) {
    if (!err) {
      Project.find({_id: {$in: user.project}}, function (err, project) {
        Bug.find({uid: req.session.user._id}, '', {skip: (page - 1)*perpage, limit: perpage, sort: {status: 1, ctime: -1}}, function (err, bug) {
          res.render('bug/index', {
            title: 'Bug',
            alias: 'bug',
            user: req.session.user,
            bug: bug,
            project: project,
            count: bug.length,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
          });
        });
      });
    }
  });
}

exports.post = function (req, res, next) {
  var count;
  // 获取产品列表
  User.findOne({_id: req.session.user._id}, function (err, user) {
    if (!err) {
      Product.find({}, function (err, product) {
        res.render('bug/post', {
          user: req.session.user,
          product: product,
          success: req.flash('success').toString(),
          error: req.flash('error').toString()
        });
      });
    }
  });
}

exports.doPost = function (req, res, next) {
  //写入数据库
  var ctime = Math.round(new Date().getTime()/1000);
  var post = new Bug({
    pid: req.body.product,
    title: req.body.title,
    content: req.body.content,
    uid: req.session.user._id,
    name: req.session.user.name,
    toUid: req.body.toUid,
    toName: req.body.toName,
    ctime: ctime,
    status: 0
  });
  post.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/bug/');
  });
}