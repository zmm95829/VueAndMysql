<template>
  <section>
    <el-button @click="handleOpen('add')">新增</el-button>
    <el-button type="primary" @click="getList">查询</el-button>
    <list-table :btn-show="btnShow" :formatter-columns="formatterColumns" :content="childContent" @delete="handleDeleteRow" @edit="handleEditRow"/>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" title="新增经历" width="770px">
      <el-form>
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
import { cloneDeep } from "lodash";

import ListTable from "@/components/ListTable";
import EditTags from "@/components/Assembly/EditTags";

import { add, update } from "@/api/vue_element/request";

import { dateFormatByCustomFormat } from "@/utils/format"

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
      childContent: "myExperience",
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
     * 查询数据
     */
    getList: function() {
      console.log(ListTable.methods.refresh);
      ListTable.methods.refresh(this.childContent);
    },
    /**
     * 编辑数据
     */
    handleEditRow: function(row, index) {
      console.log("row");
      console.log(row);
      console.log("index");
      console.log(index);
    },
    /**
     * 删除数据
     */
    handleDeleteRow: function(row, index) {
      console.log("row");
      console.log(row);
      console.log("index");
      console.log(index);
    },
    /**
     * 打开弹窗
     */
    handleOpen: function(type, changeItem) {
      switch (type) {
        case "add":
          this.model = cloneDeep(modelData);
          break;
        default:
          this.model = Object.assign({}, changeItem);
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

