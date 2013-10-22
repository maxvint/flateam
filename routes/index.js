var models = require('../models');
var crypto = require('crypto');
var User = models.User;

exports.index = function(req, res, next) {
  if(!req.session.user) {
    res.render('home/passport', {
      title: '主页',
      alias: 'index',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  } else {
    // 获取所有用户
    User.find({}, function(err, userlist) {
      res.render('home/index', {
        title: '主页',
        alias: 'index',
        user: req.session.user,
        userlist: userlist,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
      });
    });
  }
};

exports.login = function(req, res, next) {
    res.render('login', {
      title: '登录',
      alias: 'index',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
}

exports.doLogin = function(req, res, next) {
  //生成密码的 md5 值
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('hex');
  //检查用户是否存在
  User.findOne({email: req.body.email}, function(err, user) {
    if(!user) {
      req.flash('error', '用户不存在!'); 
      return res.redirect('/login'); //用户不存在则跳转到登录页
    }
    //检查密码是否一致
    if(user.password != password) {
      req.flash('error', '密码错误!'); 
      return res.redirect('/login');//密码错误则跳转到登录页
    }
    //用户名密码都匹配后，将用户信息存入 session
    req.session.user = user;
    req.flash('success', '登录成功!');
    res.redirect('/');
  });
}

exports.ajaxLogin = function(req, res, next) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('hex');
  User.findOne({email: req.body.email}, function(err, user) {
    if(!user) {
      res.json({
        status: 'error',
        info: '用户不存在'
      });
    } else if(user.password != password) {
      res.json({
        status: 'error',
        info: '密码错误'
      });
    } else {
      req.session.user = user;
      res.json({
        status: 'success',
        info: '登录成功'
      });
    }
  });
}

exports.register = function(req, res, next) {
    res.render('register', {
      title: '注册',
      alias: 'index',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
}

exports.doRegister = function(req, res, next) {
  var name = req.body.name;
  var password = req.body.password;
  var repassword = req.body['repassword'];
  //检验用户两次输入的密码是否一致
  if(repassword != password) {
    req.flash('error', '两次输入密码不一致!'); 
    return res.redirect('/register');
  }
  //生成密码的 md5 值
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('hex');

  var newUser = new User({
    email: req.body.email,
    password: password,
    name: req.body.name
  });
  User.find({email: req.body.email}, function(err, user) {
    if(user.email) {
      req.flash('error', '您已注册，请直接登录!');
      return res.redirect('/login'); //用户名存在则返回注册页
    }

    if(!newUser.name) {
      var arr = newUser.email.split('@');
      newUser.name = arr[0];
    }
    //如果不存在则新增用户
    newUser.save(function(err) {
      if(err) {
        req.flash('error', err);
        return res.redirect('/register');
      }
      req.session.user = newUser;//用户信息存入 session
      req.flash('success', '注册成功!');
      res.redirect('/');//注册成功后返回主页
    });
  });
}

exports.logout = function(req, res, next) {
  req.session.user = null;
  req.flash('success', '退出成功!');
  res.redirect('/');//退出后跳转到主页
}