<template>
  <section>
    <span>{{ title }}</span>
    <el-form :inline="true">
        <el-form-item label="用户名">
            <el-input v-model="modelItem.username"/>
        </el-form-item>        
        <el-form-item label="密码">
            <el-input v-model="modelItem.password"/>
        </el-form-item>  
        <el-form-item label="排序">
            <el-input v-model="modelItem.sort"/>
        </el-form-item>
    </el-form>
    <el-button @click="list">list</el-button>
    <el-button @click="add">add</el-button>
    <el-button @click="update">update</el-button>
    <el-table :data="tableData">
      <el-table-column fixed prop="Id" label="ID"/>
      <el-table-column fixed prop="UserName" label="用户名"/>
      <el-table-column fixed prop="Password" label="密码"/>
      <!-- <el-table-column
        v-for="(item,index) of options"
        :key="`item.label+${index}`"
        :label="item.label"
        :prop="item.props"
        :sortable="item.sortable"
        :formatter="columnFormatter"
        width="150px"
      />-->
      <!-- <el-table-column
        :render-header="renderHeader"
        fixed="right"
        align="center"
        label="操作"
        width="120px"
      >
      </el-table-column>-->
    </el-table>
  </section>
</template>
<script>
import { add, list, update } from "@/api/vue_element/request";
export default {
  data() {
    return {
      title: "用户",
      tableData: [],
      modelItem: {
          id: 1,
          username: "",
          password: "",
          sort: ""
      }
    };
  },
  mounted() {
    this.list();
  },
  methods: {
      list: function(){
           list("user").then((response) => {
      this.tableData = response.body;
    }).catch(v => {
      console.log("catch");
      console.log(v);
    });
      },
      add: function(){
           add("user", this.modelItem, {}).then((response) => {
      this.list();
    }).catch(v => {
      console.log("catch");
      console.log(v);
    });
      },
      update: function(){
           update("user", this.modelItem, {}).then((response) => {
      this.list();
    }).catch(v => {
      console.log("catch");
      console.log(v);
    });
      }
  }
};
</script>
