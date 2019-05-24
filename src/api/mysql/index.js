// // node后端服务器
// const db = require('./db/js')
// const mysql = require('mysql')
// const express = require('express')
// const app = express()
// app.use(express.static('../dist'))

// // var server = require('http').createServer(app)
// var conn = mysql.createConnection(db.mysql)
// conn.connect()

// web服务器使用3000端口监听后端服务器，并根据MySQL中的表内容设置后端api路由，跳转到数据库连接表入口
const userApi = require("../vue_element/user");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// 后端api路由
app.use("/api/user/save", userApi);
// 监听端口
app.listen(3000);
console.log("success listen at port:3000......");
