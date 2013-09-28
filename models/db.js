// var settings = require('../settings');
// var Db = require('mongodb').Db;
// var Connection = require('mongodb').Connection;
// var BSON = require('mongodb').pure().BSON;
// var Server = require('mongodb').Server;
// module.exports = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT, {}));


var config = require('../config');
var mongoose = require('mongoose');    //引用mongoose模块
var db = mongoose.createConnection(config.host, config.db); //创建一个数据库连接
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.connection.once('connected', function() {
	console.log("Connected to database")
});