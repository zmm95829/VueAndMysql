<template>
  <section>
    <el-button type="primary" @click="refresh">查询</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(item,index) of dynamicDisplay.displayColumnTableOptions"
        :key="`item.label+${index}`"
        :label="item.label"
        :prop="item.props"
        :formatter="formatterColumn"
        align="center"
      ></el-table-column>
      <!-- // ==================type1=================动态展示列dynamicDisplay======================================= -->
      <el-table-column
        :render-header="renderHeader"
        align="center"
        fixed="right"
        label="操作"
        width="220px"
      >
        <template slot-scope="scope">
          <el-button
            v-if="btnShow.delete"
            type="text"
            @click="handleDelete(scope.row, scope.$index)"
          >删除</el-button>
          <el-button v-if="btnShow.edit" type="text" @click="handleEdit(scope.row, scope.$index)">编辑</el-button>
          <slot :row="scope.row" :index="scope.$index"/>
        </template>
      </el-table-column>
      <!-- // ==================type1=================动态展示列dynamicDisplay======================================= -->
    </el-table>
    <!-- // ==================type1=================动态展示列dynamicDisplay======================================= -->
    <el-dialog
      :visible.sync="dynamicDisplay.dialogVisible"
      :before-close="handleClose"
      :append-to-body="true"
      title="请选择"
      width="50%"
    >
      <el-checkbox
        :indeterminate="dynamicDisplay.isIndeterminate"
        v-model="dynamicDisplay.checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <el-checkbox-group v-model="dynamicDisplay.checkedColumn" @change="handleCheckedColumnChange">
        <el-checkbox
          v-for="(column,index) in dynamicDisplay.displayColumnDialogOptions"
          :label="column"
          :key="index"
          style="margin-left:15px; width:150px;margin-top:10px;"
        >{{ column.label }}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dynamicDisplay.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="checkChange(dynamicDisplay.checkedColumn)">确定</el-button>
      </span>
    </el-dialog>
    <!-- // ==================type1=================动态展示列dynamicDisplay======================================= -->
  </section>
</template>
<script>
import { getConfigByKey } from "./config";
import { getDataByKey } from "./data";
let columnOptions = [];
export default {
  props: {
    // 对应config中的key，用于获取config和data的数据
    content: {
      type: String,
      default: "test"
    },
    // 要格式化的列名与格式化方法组成的数组
    formatterColumns: {
      type: Object,
      default: () => { }
    },
    // 按钮是否显示
    btnShow: {
      type: Object,
      default: () => function() {
        return {
          delete: false,
          edit: false
        };
      }
    },
    // 父组件要求刷新数据
    isRefresh: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      tableData: [],
      // ==================type1=================动态展示列dynamicDisplay=======================================
      dynamicDisplay: {
        isIndeterminate: false,
        dialogVisible: false,
        checkAll: true,
        checkedColumn: [],
        displayColumnTableOptions: [],
        displayColumnDialogOptions: [],
      },
      // ==================type1=================动态展示列dynamicDisplay=======================================
    }
  },
  mounted() {
    // 获取要展示的全部列信息
    columnOptions = getConfigByKey(this.content);
    columnOptions = columnOptions && columnOptions.columnOptions || [];

    this.dynamicDisplay.checkedColumn = columnOptions;
    this.dynamicDisplay.displayColumnTableOptions = columnOptions;
    this.dynamicDisplay.displayColumnDialogOptions = columnOptions;
    this.refresh();
  },
  watch: {
    /**
     * 父组件要求刷新数据时重新查询数据
     */
    isRefresh: function() {
      if(this.isRefresh) {
        this.refresh();
      }
    }
  },
  methods: {
    // ==================type1=================动态展示列dynamicDisplay=======================================
    /**
     * 动态选择要展示的列
     */
    renderHeader(h, { column }) {
      const _this = this;
      // h即为cerateElement的简写，具体可看vue官方文档
      return h("div", [
        h("span", column.label),
        h("i", {
          class: "el-icon-setting",
          style: "color:#999;margin-left:70px;font-size:20px;",
          on: {
            click: () => {
              _this.dynamicDisplay.dialogVisible = true;
            }
          }
        })
      ]);
    },
    /**
     * 关闭设置展示列时触发
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    /**
     * 动态选择要展示的列，全选时触发
     */
    handleCheckAllChange(val) {
      this.dynamicDisplay.checkedColumn = val ? columnOptions : [];
      this.dynamicDisplay.isIndeterminate = false;
    },
    /**
     * 动态选择要展示的列，多选框勾选发生改变时触发
     */
    handleCheckedColumnChange(value) {
      const checkedCount = value.length;
      this.dynamicDisplay.checkAll = checkedCount === columnOptions.length;
      this.dynamicDisplay.isIndeterminate =
        checkedCount > 0 && checkedCount < columnOptions.length;
    },
    /**
     * 动态选择要展示的列，处理确定按钮的点击事件
     */
    checkChange(val) {
      if (val.length < 1) {
        this.$message("至少选择一项进行显示");
        return false;
      }
      this.dynamicDisplay.dialogVisible = false;
      this.dynamicDisplay.displayColumnTableOptions = val;
    },
    // ==================type1=================动态展示列dynamicDisplay=======================================
    // 刷新数据
    refresh: function() {
      console.log("===================刷新数据==============");
      // 获取表格数据
      getDataByKey(this.content)
        .then(v => {
          this.tableData = v;
        });
    },
    /**
     * 将父组件传入的格式化参数分解
     */
    setFormatter: function() {
      this.formatter.columns = this.formatterColumns.column || [];
      this.formatter.functions = this.formatterColumns.functions || [];
    },
    /**
     * 列的格式化
     */
    formatterColumn: function(row, column, cellValue) {
      let re = cellValue;
      const index = this.formatterColumns.columns.indexOf(column.property)
      if (index !== -1 && this.formatterColumns.functions[index]) {
        re = this.formatterColumns.functions[index](re);
      }
      return re;
    },
    /**
     * 处理删除事件
     */
    handleDelete: function(row, index) {
      this.$emit("delete", row, index);
    },
    /**
     * 处理编辑事件
     */
    handleEdit: function(row, index) {
      this.$emit("edit", row, index);
    }
  }
}
</script>

