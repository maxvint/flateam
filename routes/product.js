var models = require('../models');
var User = models.User;
var Product = models.Product;
var Project = models.Project;

exports.index = function(req, res, next) {
  var count;
  var perpage = 15;
  var page = req.query.p ? parseInt(req.query.p) : 1;

  Product.find({}, '', {skip: (page - 1)*perpage, limit: perpage, sort: [['ctime', 'desc' ]]}, function(err, product) {
    res.render('product/index', {
      title: '产品主页',
      alias: 'product',
      user: req.session.user,
      product: product,
      page: page,
      count: product.length,
      perpage: perpage,
      isFirstPage: (page - 1) == 0,
      isLastPage: ((page - 1)*perpage + product.length) == count,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
}

exports.post = function(req, res, next) {
  res.render('product/post', {
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
}

exports.doPost = function(req, res, next) {
  //写入数据库
  var ctime = Math.round(new Date().getTime()/1000);
  var post = new Product({
    title: req.body.title,
    uid: req.session.user._id,
    name: req.session.user.name,
    project: [],
    demand: [],
    bug: [],
    ctime: ctime
  });
  post.save(function(err) {
    if(err) {
      return next(err);
    }
    res.redirect('/product/');
  });
}