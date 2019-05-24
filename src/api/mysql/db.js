
module.exports = {
  mysql: {
    host: "localhost",
    user: "root",
    password: "123456",
    port: "3306",
    database: "vueelement"
  }
};
// var mysql = require('mysql')
// var pool = mysql.createPool({
//   host: '192.168.3.126',
//   user: 'zmm',
//   password: '123456',
//   port: '3306',
//   database: 'order'
// })

// function query (sql, callback) {
//   pool.getConnection(function (_err, connection) {
//     connection.query(sql, function (err, rows) {
//       callback(err, rows)
//       connection.release()
//     })
//   })
// }

// exports.query = query

