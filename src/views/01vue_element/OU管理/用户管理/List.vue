<template>
  <section>
    <span>{{ title }}</span>
    <el-form>
        <el-form-item label="用户名">
            <el-input v-model="modelItem.username"/>
        </el-form-item>        
        <el-form-item label="密码">
            <el-input v-model="modelItem.password"/>
        </el-form-item>
    </el-form>
    <button @click="list">list</button>
    <button @click="add">add</button>
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
export default {
  data() {
    return {
      title: "用户",
      tableData: [],
      modelItem: {
          username: "",
          password: ""
      }
    };
  },
  mounted() {
    this.list();
  },
  methods: {
      list: function(){
           this.$http.post("/api/user/list").then((response) => {
      console.log("response");
      console.log(response);
      this.tableData = response.body;
    }).catch(v => {
      console.log("catch");
      console.log(v);
    });
      },
      add: function(){
           this.$http.post("/api/user/add", this.modelItem, {}).then((response) => {
      console.log("response");
      console.log(response);
      this.list();
    }).catch(v => {
      console.log("catch");
      console.log(v);
    });
      }
  }
};
</script>
