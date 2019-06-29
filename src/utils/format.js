import moment from "moment";

/**
 * 将时间转换成想要的格式
 * @param {*} value 要格式化的时间数据
 * @param {*} customFormat 自定义格式
 */
export function dateFormatByCustomFormat(value, customFormat = "YYYY-MM-DD HH:mm:ss") {
  if (!value) {
    return "";
  }
  return moment(value).format(customFormat);
}

/**
 * 将目标对象的首字母大写
 * @param {*} object 目标对象
 */
export function objectKeyTitleCase(object) {
  let reObject = {};
  Object.keys(object).forEach(v => {
    reObject[v.charAt(0).toLowerCase() + v.substring(1)] = object[v];
  });
  return reObject;
}
