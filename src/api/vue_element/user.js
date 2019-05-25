// userApi中的每个函数，连接到sqlMap.js里的一个sql语句进行对数据库的操作
var models = require("../mysql/db");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
// var $sql = require("../mysql/sqlMap");
var getSqlData = require("../mysql/sqlMap");
// const getSql = require("@/utils/sqlSplice");
// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function (res, ret) {
  if (typeof ret === "undefined") {
    res.json({
      code: "1",
      msg: "操作失败"
    });
  } else {
    res.json(ret);
  }
};

// 增加用户接口
router.post("/update", (req, res) => {
  var params = req.body;
  var sqlData = getSqlData.update(params, "ou_user");
  console.log("sqlData.sql");
  console.log(sqlData.sql);
  conn.query(sqlData.sql, sqlData.data, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});
router.post("/list", (req, res) => {
  console.log("req");
  console.log(req);
  var params = req.body;
  var sqlData = getSqlData.list(params, "ou_user");
  conn.query(sqlData.sql, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      return jsonWrite(res, result);
    }
  });
});
router.post("/add", (req, res) => {
  var params = req.body;
  var sqlData = getSqlData.add(params, "ou_user");
  conn.query(sqlData.sql, sqlData.data, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

module.exports = router;
