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
