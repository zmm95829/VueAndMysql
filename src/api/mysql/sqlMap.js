// // sqlMap.js

// var sqlMap = {
//   add: "insert into ou_user(username, password) values (?, ?)",
//   user: {
//     add: "insert into ou_user(username, password) values (?, ?)",
//     // add: "insert into ou_user(username, password, sort, createdby, createddate) values (?, ?, 0, ?," + new Date() + ")",
//     save: "insert into ou_user(name) values (?)",
//     delete: "delete from ou_user where Id = ?",
//     list: "select * from ou_user"
//   }
// };
// module.exports = sqlMap;

// var $sql = require("../mysql/sqlMap");
function add(object, tableName) {
  let props = "";
  let values = "";
  const data = [];
  Object.keys(object).forEach(key => {
    props += ", " + key;
    values += ", ?";
    data.push(object[key]);
  });
  props = props.slice(2);
  values = values.slice(2);
  return {
    sql: `insert into ${tableName}(${props}) values(${values})`,
    data: data
  };
};
function list(object, tableName) {
  let props = "";
  Object.keys(object).forEach(key => {
    const isStr = (typeof object[key]) === "string";
    props += ` and ${key}${isStr ? " like '%" : " = "}${object[key]}${isStr ? "%'" : ""}`;
  });
  props = props.slice(5);
  return {
    sql: `select * from ${tableName} where ${props}`
  };
};
exports.add = add;
exports.list = list;
