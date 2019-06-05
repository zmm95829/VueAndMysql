const config = [
  {
    key: "test",
    // 要展示的全部列信息
    columnOptions: [
      { label: "日期", props: "date" },
      { label: "名字", props: "name" },
      { label: "地址", props: "address" }
    ]
  }
];
export function getConfigByKey(key) {
  const re = config.find(v => v.key === key);
  return re || [];
}
