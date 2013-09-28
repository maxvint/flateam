/*!
 * Flateam - route.js
 * Copyright(c) 2013 yuwenhui <yuwenhui1986@163.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var auth = require('./common/auth');
var site = require('./routes/index');
var user = require('./routes/user');

var project = require("./routes/project");
var task = require("./routes/task");
var demand = require("./routes/demand");
var bug = require("./routes/bug");
var doc = require("./routes/doc");


module.exports = function(app) {
  // home page
  app.get('/', site.index);

  // login
  app.get('/login', site.login);
  app.post('/login', site.doLogin);

  // register
  app.get('/register', site.register);
  app.post('/register', site.doRegister);

  // logout
  app.get('/logout', auth.checkLogin, site.logout);

  // user
  app.get('/user/:id', auth.checkLogin, user.index);

  // project page
  app.get('/project', auth.checkLogin, project.index);
  app.get('/project/post', auth.checkLogin, project.post);
  app.get('/project/delay', auth.checkLogin, project.delay);
  app.get('/project/:pid', auth.checkLogin, project.show);
  app.post('/project/doPost', auth.checkLogin, project.doPost);
  app.post('/project/doRemove/:pid', auth.checkLogin, project.doRemove);
  app.post('/project/doAddFeed',  auth.checkLogin, project.doAddFeed);
  app.post('/project/doDelFeed/:id', auth.checkLogin, project.doDelFeed);
  app.post('/project/uploadPhoto', auth.checkLogin, project.uploadPhoto);

  // task page
  app.get('/task', auth.checkLogin, task.index);
  app.get('/task/post', auth.checkLogin, task.post);
  app.post('/task/doPost', auth.checkLogin, task.doPost);
  app.post('/task/doFinish/:id', auth.checkLogin, task.doFinish);
  
  // demand page
  app.get('/demand', auth.checkLogin, demand.index);

  // bug page
  app.get('/bug', auth.checkLogin, bug.index);

  // doc page
  app.get('/doc', auth.checkLogin, doc.index);
  
};
