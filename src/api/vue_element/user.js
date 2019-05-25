// userApi中的每个函数，连接到sqlMap.js里的一个sql语句进行对数据库的操作
var models = require("../mysql/db");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var $sql = require("../mysql/sqlMap");
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
router.post("/save", (req, res) => {
  var sql = $sql.user.save;
  var params = req.body;
  console.log("params");
  console.log(params);
  console.log("sql");
  console.log(sql);
  // conn.query(sql, [params.name], function(err, result) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   if (result) {
  //     jsonWrite(res, result);
  //   }
  // });
});
router.post("/list", (req, res) => {
  // var sql = $sql.user.list;
  var params = req.body;
  // console.log("params");
  // console.log(params);
  var sqlData = getSqlData.list(params, "ou_user");
  console.log("sql");
  console.log(sqlData.sql);
  conn.query(sqlData.sql, function(err, result) {
    console.log("1111111111");
    if (err) {
      console.log(err);
    }
    if (result) {
      console.log("resultHAHAHA");
      console.log(result);
      return jsonWrite(res, result);
    }
  });
});
router.post("/add", (req, res) => {
  // var sql = $sql.user.add;
  var params = req.body;
  var sqlData = getSqlData.add(params, "ou_user");
  console.log("params");
  console.log(params);
  console.log("sql");
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

// router.post("/cancelReader", (req, res) => {
//   var sql = $sql.reader.delete;
//   var params = req.body;
//   console.log(params);
//   conn.query(sql, [params.name], function(err, result) {
//     if (err) {
//       console.log(err);
//     }
//     if (result) {
//       jsonWrite(res, result);
//     }
//   });
// });

// router.get("/searchReader", (req, res) => {
//   var sql = $sql.reader.search;
//   var params = req.query;
//   console.log(params);
//   conn.query(sql, [params.name], function(err, result) {
//     if (err) {
//       console.log(err);
//     }
//     if (result) {
//       console.log(result);
//       res.send(result);
//     }
//   });
// });

// router.post("/readerBorrow", (req, res) => {
//   var sql = $sql.reader.borrowBook;
//   var params = req.body;
//   console.log(params);
//   conn.query(sql, [params.readerName, params.bookName], function(err, result) {
//     if (err) {
//       console.log(err);
//     }
//     if (result) {
//       jsonWrite(res, result);
//     }
//   });
// });

module.exports = router;
