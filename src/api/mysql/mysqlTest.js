// 数据库连接测试
const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "vueelement"
});

conn.connect();

var sql = "select * from ou_user";
conn.query(sql, function(err, result) {
  if (err) {
    console.log("select error - ", err.message);
    return;
  }
  console.log("select");
  console.log(result);
  console.log("-----------------\n\n");
});
conn.end();
