const config = [
  {
    key: "test",
    // 要展示的全部列信息
    columnOptions: [
      { label: "日期", props: "date" },
      { label: "名字", props: "name" },
      { label: "地址", props: "address" }
    ]
  },
  {
    key: "myExperience",
    columnOptions: [
      { label: "ID", props: "Id" },
      { label: "标题", props: "Title" },
      { label: "日期", props: "Date" },
      { label: "标签", props: "Tag" }
    ]
  }
];
export function getConfigByKey(key) {
  const re = config.find(v => v.key === key);
  return re || [];
}
