import Vue from "vue";
/**
 * 新增数据
 * @param {*} module 模块名
 * @param {*} data 添加对象
 */
export function add(module, data) {
  return Vue.http.post(`/api/${module}/add`, data)
    .then((re) => {
      console.log("这是新增结果");
      console.log(re);
    });
}
/**
 * 新增数据
 * @param {*} module 模块名
 * @param {*} data 添加对象
 */
export function list(module, data) {
  return Vue.http.post(`/api/${module}/list`, data)
    .then((re) => {
      console.log("这是查询结果");
      console.log(re);
      return re;
    });
}
/**
 * 修改数据
 * @param {*} module 模块名
 * @param {*} data 修改对象
 */
export function update(module, data) {
  return Vue.http.post(`/api/${module}/update`, data)
    .then((re) => {
      console.log("这是修改结果");
      console.log(re);
      return re;
    });
}
/**
 * 修改数据
 * @param {*} module 模块名
 * @param {*} data 修改对象
 */
export function deleteById(module, id) {
  return Vue.http.post(`/api/${module}/delete`, {id: id})
    .then((re) => {
      console.log("这是修改结果");
      console.log(re);
      return re;
    });
}
