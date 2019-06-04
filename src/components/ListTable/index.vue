<template>
  <section>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="(item,index) of dynamicDisplay.displayColumnTableOptions" :key="`item.label+${index}`" :label="item.label"
        :prop="item.props" align="center">
      </el-table-column>    
        <!-- // ==================type1=================动态展示列dynamicDisplay======================================= -->
      <el-table-column :render-header="renderHeader" align="center" fixed="right" label="操作" width="220px">
        <template slot-scope="{row}">
          <el-input v-model="row.operate"/>
        </template>
      </el-table-column>
        <!-- // ==================type1=================动态展示列dynamicDisplay======================================= -->
    </el-table>
      <!-- // ==================type1=================动态展示列dynamicDisplay======================================= -->
  <el-dialog :visible.sync="dynamicDisplay.dialogVisible" :before-close="handleClose" :append-to-body="true" title="请选择"
    width="50%">
    <el-checkbox :indeterminate="dynamicDisplay.isIndeterminate" v-model="dynamicDisplay.checkAll" @change="handleCheckAllChange">全选
    </el-checkbox>
    <el-checkbox-group v-model="dynamicDisplay.checkedColumn" @change="handleCheckedColumnChange">
      <el-checkbox v-for="(column,index) in dynamicDisplay.displayColumnDialogOptions" :label="column" :key="index"
        style="margin-left:15px; width:150px;margin-top:10px;">{{ column.label }}</el-checkbox>
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
const columnOptions = [
    { label: "日期", props: "date" },
    { label: "名字", props: "name" },
    { label: "地址", props: "address" },
  ];
export default {
   data: function() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          operate: ""
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          operate: ""
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          operate: ""
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          operate: ""
        }],
      // ==================type1=================动态展示列dynamicDisplay=======================================
        dynamicDisplay: {
          isIndeterminate: false,
          dialogVisible: false,
          checkAll: true,          
          checkedColumn: columnOptions,
          displayColumnTableOptions: columnOptions,
          displayColumnDialogOptions: columnOptions,
        }
      // ==================type1=================动态展示列dynamicDisplay=======================================
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
      }
      // ==================type1=================动态展示列dynamicDisplay=======================================
    }
}
</script>

