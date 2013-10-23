/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var MongoStore = require('connect-mongo')(express);
var config = require('./config');
var flash = require('connect-flash');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.engine('.html', ejs.__express);
// 修改模板，支持html
app.set('view engine', 'html');

app.use(flash());
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser({ keepExtensions: true, uploadDir: './statics/photo' }));
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
  secret: config.cookieSecret,
  key: config.db,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
  store: new MongoStore({
    db: config.db
  })
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-promise')());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

routes(app);