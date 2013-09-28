var models = require('../models');
var Task = models.Task;
var Project = models.Project;


exports.index = function (req, res, next) {
  var total;
  var count;
  var perpage = 15;
  var page = req.query.p ? parseInt(req.query.p) : 1;

  
  Task.count({uid: req.session.user._id}, function (err, res) {
    count = res;
  });

  Task.find({uid: req.session.user._id}, '', {skip: (page - 1)*perpage, limit: perpage, sort: {status: 1, ctime: -1}}, function (err, result) {
    res.render('task/index', {
      title: '任务',
      alias: 'task',
      user: req.session.user,
      list: result,
      count: count,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
}

exports.post = function (req, res, next) {
  var count;
  // 获取当前用户参与的项目
  Project.count({uid: req.session.user._id}, function (err, res) {
    count = res;
  });
  Project.find({uid: req.session.user._id}, '', {sort: [['ctime', 'desc' ]]}, function (err, result) {

    console.log(result);

    res.render('task/post', {
      title: '添加任务',
      alias: 'task',
      user: req.session.user,
      list: result,
      count: count,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });

    
}

exports.doPost = function (req, res, next) {
  //写入数据库
  var ctime = Math.round(new Date().getTime()/1000);
  var post = new Task({
    pid: req.body.project,
    title: req.body.title,
    uid: req.session.user._id,
    name: req.session.user.name,
    ctime: ctime,
    status: 0
  });
  post.save(function (err) {
    if(err) {
      return next(err);
    }
    res.redirect('/task/');
  });
}

exports.doFinish = function (req, res, next) {
  var id = req.params.id;
  var status;
  console.log(id);
  Task.findOne({_id: req.params.id}, function (err, task) {
    (task.status == 0) ? status = 1: status = 0;
    Task.update({_id: req.params.id}, {status: status}, function (err, result) {
      console.log(result);
      if (!err) {
        res.json({
          status: 'success',
          info: status,
        });
      } else {
        res.json({
          status: 'error',
          info: status,
        });
      }
    });
  });
}