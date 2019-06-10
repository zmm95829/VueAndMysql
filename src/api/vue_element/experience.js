var express = require("express");
var router = express.Router();
var getSqlData = require("../mysql/sqlMap");
let conn = require("./connection");

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

router.post("/update", (req, res) => {
  var params = req.body;
  var sqlData = getSqlData.update(params, "my_experience");
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
  var sqlData = getSqlData.list(params, "my_experience");
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
  var sqlData = getSqlData.add(params, "my_experience");
  conn.query(sqlData.sql, sqlData.data, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  });
});

router.get("/delete", (req, res) => {
  var params = req.body;
  var sqlData = getSqlData.deleteById(params, "my_experience");
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
