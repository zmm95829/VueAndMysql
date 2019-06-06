var models = require("../mysql/db");
var mysql = require("mysql");
// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

module.exports = conn;
