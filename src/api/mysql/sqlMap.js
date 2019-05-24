// sqlMap.js
var sqlMap = {
  user: {
    save: "insert into ou_user(name) values (?)",
    delete: "delete from ou_user where Id = ?",
    list: "select * from ou_user"
  }
};
module.exports = sqlMap;

