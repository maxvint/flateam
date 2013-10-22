var models = require('../models');
var User = models.User;
var Bug = models.Bug;
var Product = models.Product;
var Project = models.Project;
var Reply = models.Reply;

exports.index = function(req, res, next) {
  var count;
  var perpage = 15;
  var page = req.query.p ? parseInt(req.query.p) : 1;

  // 获取产品列表
  User.findOne({_id: req.session.user._id}, function(err, user) {
    if(!err) {
      Project.find({_id: {$in: user.project}}, function(err, project) {
        Bug.find({uid: req.session.user._id}, '', {skip: (page - 1)*perpage, limit: perpage, sort: {status: 1, ctime: -1}}, function(err, bug) {
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

exports.post = function(req, res, next) {
  // 获取产品列表
  Product.find({}, function(err, product) {
    User.find({}, function(err, users) {
      res.render('bug/post', {
        user: req.session.user,
        product: product,
        users: users,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    });
  });
}

exports.doPost = function(req, res, next) {
  // 根据toUid获取toName
  var userOptions = {
    query: {
      _id: req.body.toUid
    }
  };
  User.getUser(userOptions, function(err, toUser) {
    var ctime = Math.round(new Date().getTime()/1000);
    var post = new Bug({
      pid: req.body.product,
      title: req.body.title,
      content: req.body.content,
      level: req.body.level,
      module: req.body.module,
      uid: req.session.user._id,
      name: req.session.user.name,
      toUid: req.body.toUid,
      toName: toUser.name,
      ctime: ctime,
      status: 0
    });
    post.save(function(err) {
      if(err) {
        return next(err);
      }
      res.redirect('/bug/');
    });
  });   
}

exports.doRemove = function(req, res, next) {
  Bug.remove({_id: req.params.id}, function(err, result) {
    if(!err) {
      // 删除Bug同时，删除任务的评论
      Reply.remove({post_id: req.params.id}, function(err, result) {
        if(!err) {
          res.json({status: 'success'});
        }
      });
    } else {
      res.json({status: 'error'});
    }
  });
}

exports.show = function(req, res, next) {
  var options = {
    query: {
      _id: req.params.id
    }
  };
  Bug.getBug(options, function(err, bug) {
    if(!err) {
      // 获取产品
      var productOptions = {
        query: {
          _id: bug.pid
        }
      };
      Product.getProduct(productOptions, function(err, product) {
        if(!err) {
          var replyOptions = {
            query: {
              form: 'bug',
              post_id: req.params.id
            },
            sort: {
              ctime: -1
            },
            perpage: 10
          };
          Reply.getList(replyOptions, function(err, reply) {
            if(!err) {
              console.log(bug);
              res.render('bug/show', {
                user: req.session.user,
                bug: bug,
                product: product,
                reply: reply,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
              });
            }
          });
        }
      });
    }
  });
}

exports.replyPost = function(req, res, next) {
  // 讨论内容写入数据库
  var ctime = Math.round(new Date().getTime()/1000);
  var post = new Reply({
    post_id: req.params.post_id,
    from: 'bug',
    uid: req.session.user._id,
    name: req.session.user.name,
    content: req.params.content,
    ctime: ctime,
    status: 0
  });
  post.save(function(err, result) {
    if(err) {
      res.json({
        status: 'error'
      });
    } else {
      res.json({
        status: 'success',
        info: result
      });
    }
  });
}

exports.replyRemove = function(req, res, next) {
  Reply.remove({_id: req.params.id}, function(err) {
    if(!err) {
      res.json({
        status: 'success'
      })
    }
  });
}