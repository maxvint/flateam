var models = require('../models');
var Project = models.Project;
var Feed = models.Feed;

var core = require('../common/core');
var fs = require('fs');

exports.index = function (req, res, next) {
  var total;
  var count;
  var perpage = 15;
  var page = req.query.p ? parseInt(req.query.p) : 1;

  Project.count({uid: req.session.user._id}, function (err, res) {
    count = res;
  });

  Project.find({uid: req.session.user._id}, '', {skip: (page - 1)*perpage, limit: perpage, sort: [['ctime', 'desc' ]]}, function (err, result) {
    result.forEach(function (data) {
      // (data.end > date) ? data.status = '未完成' : data.status = '已完成';
    });
    res.render('project/index', {
      title: '项目主页',
      alias: 'project',
      user: req.session.user,
      list: result,
      page: page,
      count: count,
      perpage: perpage,
      isFirstPage: (page - 1) == 0,
      isLastPage: ((page - 1)*perpage + result.length) == total,
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
  res.render('project/post', {
    title: '创建项目',
    alias: 'project',
    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
}

exports.doPost = function (req, res, next) {
  //写入数据库
  var ctime = Math.round(new Date().getTime()/1000);
  var post = new Project({
    title: req.body.title,
    name: req.session.user.name,
    uid: req.session.user._id,
    ctime: ctime
  });
  post.save(function (err) {
    if(err) {
      return next(err);
    }
    res.redirect('/project/');
  });

}

exports.show = function (req, res, next) {
  var pid = req.params.pid;
  Project.findById(pid, '', function (err, result) {
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
        project: result,
        feed: feed,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
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