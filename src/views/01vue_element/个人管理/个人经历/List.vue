<template>
  <section>
    <el-button @click="handleOpen('add')">新增</el-button>
    <list-table :btn-show="btnShow" :formatter-columns="formatterColumns" :is-refresh="child.refreshList" content="myExperience" @delete="handleDeleteRow" @edit="handleEditRow"/>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" title="新增经历" width="770px">
      <el-form :model="model">
        <el-form-item label="标题">
          <el-input v-model="model.title" clearable placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="model.date"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="请选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="标签">
          <edit-tags :dynamic-tags.sync="dynamicTags"></edit-tags>
        </el-form-item>
        <el-form-item label="详细描述">
          <el-input v-model="model.description" clearable placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="感想或收获">
          <el-input v-model="model.thoughts" clearable placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddOk">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
import ListTable from "@/components/ListTable";
import EditTags from "@/components/Assembly/EditTags";

import { add, update } from "@/api/vue_element/request";

import { dateFormatByCustomFormat, objectKeyTitleCase } from "@/utils/format"

const modelData = {
  title: "",
  date: "",
  tag: "",
  description: "",
  thoughts: ""
};
export default {
  name: "GeRenJingLi",
  components: {
    ListTable,
    EditTags
  },
  data() {
    return {
      child: {
        refreshList: false
      },
      btnShow: {
        delete: true,
        edit: true
      },
      dialogVisible: false,
      dynamicTags: [],
      model: {},
      changeModel: {}
    };
  },
  computed: {
    /**
     * 列的格式化
     */
    formatterColumns: function() {
      return {
        columns: ["Date"],
        functions: [this.dateFormatByCustomFormat]
      }
    }
  },
  methods: {
    /**
     * 编辑数据
     */
    handleEditRow: function(row, index) {
      console.log("编辑数据");
      console.log("row");
      console.log(row);
      console.log("index");
      console.log(index);
      this.handleOpen("edit", row);
    },
    /**
     * 删除数据
     */
    handleDeleteRow: function(row, index) {
      console.log("删除数据");
      console.log("row");
      console.log(row);
      console.log("index");
      console.log(index);
    },
    /**
     * 打开弹窗
     */
    handleOpen: function(type, changeItem) {
      this.dynamicTags = [];
      // ===========================
      Object.keys(changeItem).forEach(v => {
        if(v && v.charAt(0)) {
          v = v.charAt(0).toLowerCase() + v.substring(1);
        }
      });
      // ===========================
      switch (type) {
        case "add":
          this.model = cloneDeep(modelData);
          break;
        default:
          this.model = Object.assign({},  objectKeyTitleCase(changeItem));
          this.dynamicTags = changeItem.Tag.split(",");
          break;
      }
      this.dialogVisible = true;
    },
    /**
     * 新增内容点击确定
     */
    handleAddOk: function() {
      this.model.tag = this.dynamicTags.join(",");
      add("experience", this.model)
      this.dialogVisible = false;
      // 刷新查询页面
      this.child.refreshList = true;
    },
    /**
     * 格式化时间
     */
    dateFormatByCustomFormat(value) {
      return dateFormatByCustomFormat(value, "YYYY年MM月DD日")
    }
  }
}
</script>

