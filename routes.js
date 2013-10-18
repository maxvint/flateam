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


var product = require('./routes/product');
var project = require('./routes/project');
var task = require('./routes/task');
var demand = require('./routes/demand');
var bug = require('./routes/bug');


module.exports = function(app) {
  // index page
  app.get('/', site.index);


  // login
  app.get('/login', site.login);
  app.post('/login', site.doLogin);
  app.post('/ajaxLogin', site.ajaxLogin);

  // register
  app.get('/register', site.register);
  app.post('/register', site.doRegister);

  // logout
  app.get('/logout', auth.checkLogin, site.logout);

  // user
  app.get('/user/:id', auth.checkLogin, user.index);

  // product page
  app.get('/product', auth.checkLogin, product.index);
  app.get('/product/post', auth.checkLogin, product.post);

  app.post('/product/doPost', auth.checkLogin, product.doPost);
  
  // project page
  app.get('/project', auth.checkLogin, project.index);
  app.get('/project/post', auth.checkLogin, project.post);
  app.get('/project/:pid', auth.checkLogin, project.show);
  app.post('/project/doPost', auth.checkLogin, project.doPost);
  app.post('/project/doRemove/:pid', auth.checkLogin, project.doRemove);
  app.post('/project/doJoin/:id', auth.checkLogin, project.doJoin);
  app.post('/project/doUnjoin/:id', auth.checkLogin, project.doUnjoin);
  app.post('/project/doAddFeed',  auth.checkLogin, project.doAddFeed);
  app.post('/project/doDelFeed/:id', auth.checkLogin, project.doDelFeed);
  app.post('/project/uploadPhoto', auth.checkLogin, project.uploadPhoto);

  // task page
  app.get('/task', auth.checkLogin, task.index);
  app.get('/task/post', auth.checkLogin, task.post);
  // app.get('/task/reply/:id', auth.checkLogin, task.reply);
  app.get('/task/:id', auth.checkLogin, task.show);
  app.get('/task/forward/:id', auth.checkLogin, task.forward);
  app.post('/task/doPost', auth.checkLogin, task.doPost);
  app.post('/task/doFinish/:id', auth.checkLogin, task.doFinish);
  app.post('/task/doPersonal/:id', auth.checkLogin, task.doPersonal);
  app.post('/task/doRemove/:id', auth.checkLogin, task.doRemove);
  app.post('/task/doForward/:tid/:uid/:name', auth.checkLogin, task.doForward);
  app.post('/task/replyPost/:post_id/:content', auth.checkLogin, task.replyPost);
  app.post('/task/replyRemove/:id', auth.checkLogin, task.replyRemove);

  // demand page
  app.get('/demand', auth.checkLogin, demand.index);
  app.get('/demand/post', auth.checkLogin, demand.post);
  
  app.post('/demand/doPost', auth.checkLogin, demand.doPost);
  
  // bug page
  app.get('/bug', auth.checkLogin, bug.index);
  app.get('/bug/post', auth.checkLogin, bug.post);
  
  app.post('/bug/doPost', auth.checkLogin, bug.doPost);
};
