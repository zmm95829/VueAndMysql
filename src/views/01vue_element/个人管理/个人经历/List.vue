<template>
    <section>
      <span>hahahahah</span>
      <el-button @click="handleOpen('add')">新增</el-button>
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
            placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标签">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
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
        <el-button type="primary" @click="getList">查询</el-button>
      <list-table content="myExperience"/>
    </section>
</template>
<script>
import { cloneDeep } from "lodash";
import ListTable from "@/components/ListTable";
import { add, update } from "@/api/vue_element/request";
const modelData = {
  title: "",
  date: "",
  tag: "",
  description: "",
  thoughts: ""
};
export default {
  name: "GeRenJingLi",
  components:{
    ListTable
  },
  data() {
    return {
      dialogVisible: false,
      dynamicTags:[],
      model: {},
      changeModel: {}
    };
  },
  methods: {
    /**
     * 查询数据
     */
    getList: function() {
      ListTable.methods.refresh();
    },
    /**
     * 打开弹窗
     */
    handleOpen: function(type, changeItem){
      switch(type) {
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
     * 删掉标签
     */
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
  }
}
</script>

