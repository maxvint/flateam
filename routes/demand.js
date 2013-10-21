var models = require('../models');
var User = models.User;
var Demand = models.Demand;
var Project = models.Project;
var Product = models.Product;
var Reply = models.Reply;

exports.index = function (req, res, next) {
  var count;
  var perpage = 15;
  var page = req.query.p ? parseInt(req.query.p) : 1;

  // 获取参与的项目
  User.findOne({_id: req.session.user._id}, function (err, user) {
    if (!err) {
      Project.find({_id: {$in: user.project}}, function (err, project) {
        Demand.find({uid: req.session.user._id}, '', {skip: (page - 1)*perpage, limit: perpage, sort: {status: 1, ctime: -1}}, function (err, demand) {
          res.render('demand/index', {
            title: '需求',
            alias: 'demand',
            user: req.session.user,
            demand: demand,
            project: project,
            count: demand.length,
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
        res.render('demand/post', {
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
  var post = new Demand({
    pid: req.body.product,
    title: req.body.title,
    content: req.body.content,
    uid: req.session.user._id,
    name: req.session.user.name,
    ctime: ctime,
    status: 0
  });
  post.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/demand/');
  });
}

exports.show = function (req, res, next) {
  var options = {
    _id: req.params.id,
  };
  Demand.getShowById(options, function(err, demand) {
    res.render('demand/show', {
      user: req.session.user,
      demand: demand,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
}