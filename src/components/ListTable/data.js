import { list } from "@/api/vue_element/request";
const data = [{
  date: "2016-05-02",
  name: "王小虎",
  address: "上海市普陀区金沙江路 1518 弄",
  operate: ""
}, {
  date: "2016-05-04",
  name: "王小虎",
  address: "上海市普陀区金沙江路 1517 弄",
  operate: ""
}, {
  date: "2016-05-01",
  name: "王小虎",
  address: "上海市普陀区金沙江路 1519 弄",
  operate: ""
}, {
  date: "2016-05-03",
  name: "王小虎",
  address: "上海市普陀区金沙江路 1516 弄",
  operate: ""
}];
export function getDataByKey(key) {
  switch (key) {
    case "myExperience": return list("experience").then(v => v.data);
    default: return Promise.resolve()
      .then(_ => data);
  }
}
