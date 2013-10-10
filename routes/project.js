var models = require('../models');
var User = models.User;
var Project = models.Project;
var Product = models.Product;
var Feed = models.Feed;

var core = require('../common/core');
var fs = require('fs');

exports.index = function (req, res, next) {
  var count;
  var perpage = 15;
  var page = req.query.p ? parseInt(req.query.p) : 1;

  Project.find({}, '', {skip: (page - 1)*perpage, limit: perpage, sort: [['ctime', 'desc' ]]}, function (err, project) {
    project.forEach(function (data) {

      // (data.end > date) ? data.status = '未完成' : data.status = '已完成';
    });
    res.render('project/index', {
      title: '项目主页',
      alias: 'project',
      user: req.session.user,
      project: project,
      page: page,
      count: project.length,
      perpage: perpage,
      isFirstPage: (page - 1) == 0,
      isLastPage: ((page - 1)*perpage + project.length) == count,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
};

exports.my = function (req, res, next) {
  res.render('project/my', {
    title: '我参与的项目',
    alias: 'project',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
}

exports.post = function (req, res, next) {
  // 获取产品列表
  Product.find({}, function (err, product) {
    console.log(product);
    res.render('project/post', {
      user: req.session.user,
      product: product,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
  
}

// 创建项目
exports.doPost = function (req, res, next) {
  //写入数据库
  var ctime = Math.round(new Date().getTime()/1000);
  var post = new Project({
    title: req.body.title,
    uid: req.session.user._id,
    name: req.session.user.name,
    member: req.session.user._id,
    ctime: ctime
  });
  post.save(function (err, project) {
    if (!err) {
      // 更新user collection
      User.findOne({_id: req.session.user._id}, function (err, user) {
        if (!err && user.project.indexOf(project._id) < 0) {
          user.project.push(project._id);
          User.update({_id: req.session.user._id}, {project: user.project}, function (err, result) {
            if (err) {
              return next(err);
            }
          })
        }
      });

      // 添加创建动态
      var feed = new Feed({
        pid: project._id,
        uid: req.session.user._id,
        name: req.session.user.name,
        content: req.session.user.name + '创建了项目',
        ctime: ctime,
        status: 1
      });
      feed.save(function (err, result) {
        if (err) {
          return next(err);
        }
      });
      res.redirect('/project/');
    }
  });
}

exports.show = function (req, res, next) {
  var pid = req.params.pid;
  Project.findById(pid, '', function (err, project) {
    // 判断当前用户是否已加入
    (project.member.indexOf(req.session.user._id) >= 0) ? project.isJoin = 1 : project.isJoin = 0;

    // 获取项目成员
    User.find({_id: {$in: project.member}}, function (err, member) {
      var members = member;

      // 获取项目进度

      // 获取项目feed
      Feed.find({pid: pid}, '', {limit: 10, sort: [['ctime', 'desc' ]]},function (err, feed) {
        if (feed) {
          feed.forEach(function (value) {
            var date = Math.round(new Date().getTime()/1000);
            value.ctimeFriendly = core.friendlyDate(value.ctime, date);
          });
        }
        res.render('project/show', {
          title: '我参与的项目',
          alias: 'project',
          user: req.session.user,
          project: project,
          feed: feed,
          members: members,
          count: feed.length,
          success: req.flash('success').toString(),
          error: req.flash('error').toString()
        });
      });
    });
  });
}

exports.doRemove = function (req, res, next) {
  Project.remove({_id: req.params.pid}, function (err, result) {
    if (!err) {
      // 删除项目同时，删除项目的动态、任务、需求、Bugs
      res.json({status: 'success'});
    } else {
      res.json({status: 'error'});
    }
  });
}

exports.delay = function (req, res, next) {
  res.render('project/delay', {
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
}

exports.doJoin = function (req, res, next) {
  // 判断当前用户是否已加入，重组member数据
  Project.findOne({_id: req.params.id}, function (err, project) {
    if(project.member.indexOf(req.session.user._id) < 0) {
      project.member.push(req.session.user._id);
      Project.update({_id: req.params.id}, {member: project.member}, function (err, result) {
        if (!err) {
          // 加入数据写入user collection
          User.findOne({_id: req.session.user._id}, function (err, user) {
            if (!err && user.project.indexOf(req.params.id) < 0) {
              user.project.push(req.params.id);
              User.update({_id: req.session.user._id}, {project: user.project}, function (err, result) {
                if (err) {
                  return next(err);
                }
              })
            }
          });

          // 添加动态
          var ctime = Math.round(new Date().getTime()/1000);
          var feed = new Feed({
            pid: project._id,
            uid: req.session.user._id,
            name: req.session.user.name,
            content: req.session.user.name + '加入了项目',
            ctime: ctime,
            status: 1
          });
          feed.save(function (err, result) {
            if (err) {
              return next(err);
            }
          });
          res.json({status: 'success'});
        } else {
          res.json({status: 'error'});
        }
      });
    }
  });
}

exports.doUnjoin = function (req, res, next) {
  // 判断当前用户在数组中的位置
  Project.findOne({_id: req.params.id}, function (err, project) {
    var index = project.member.indexOf(req.session.user._id);
    if (index >= 0) {
      project.member.splice(index, 1);
      Project.update({_id: req.params.id}, {member: project.member}, function (err, result) {
        if (!err) {
          // 从user collection中删除当前项目
          User.findOne({_id: req.session.user._id}, function (err, user) {
            if (!err) {
              var indexUser = user.project.indexOf(req.params.id);
              if (indexUser >= 0) {
                user.project.splice(indexUser, 1);
                User.update({_id: req.session.user._id}, {project: user.project}, function (err, result) {
                  if (err) {
                    return next(err);
                  }
                });
              }
            }
          });
          res.json({status: 'success'});
        } else {
          res.json({status: 'error'});
        }
      });
    }
  });
}


exports.getFeedById = function (req, res, next) {

}

exports.doAddFeed = function (req, res, next) {
  var ctime = Math.round(new Date().getTime()/1000);
  var post = new Feed({
    pid: req.body.pid,
    uid: req.session.user._id,
    name: req.session.user.name,
    content: req.body.content,
    ctime: ctime,
    status: 1
  });
  post.save(function (err, result) {
    if (err) {
      return next(err);
    }
    res.json({status: 'success', data: result});
  });
}

exports.doDelFeed = function (req, res, next) {
  var fid = req.params.id;
  // 判断是否有权限删除
  Feed.findOne({_id: fid}, function (err, result) {
    if (result.uid == req.session.user._id) {
      Feed.remove({_id: fid}, function (err, result) {
        if (!err) {
          res.json({status: 'success'});
        } else {
          res.json({status: 'error'});
        }
      });
      res.json({status: 'success'});
    } else {
      res.json({status: 'error'});
    }
  });
}

exports.uploadPhoto = function (req, res, next) {
  var file = req.files;
  req.flash('success', '文件上传成功!');
  // res.redirect('/upload');
  // console.log(req.files);
  
}