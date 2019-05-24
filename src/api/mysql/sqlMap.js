// sqlMap.js

var sqlMap = {
  user: {
    add: "insert into ou_user(username, password) values (?, ?)",
    // add: "insert into ou_user(username, password, sort, createdby, createddate) values (?, ?, 0, ?," + new Date() + ")",
    save: "insert into ou_user(name) values (?)",
    delete: "delete from ou_user where Id = ?",
    list: "select * from ou_user"
  }
};
module.exports = sqlMap;
