<template>
  <section>
    <span>{{ title }}</span>
    <el-table :data="tableData" max-height="600">
      <el-table-column fixed prop="Id" label="ID" />
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
      tableData: [{
        Id: 1,
        Sort: 0,
        UserName: "zmm",
        Password: "123456"
      },
      {
        Id: 2,
        Sort: 0,
        UserName: "zmm",
        Password: "123451"
      }]
    };
  },
  mounted() {
    // this.$http.post("/api/user/save", {
    //   username: "haha",
    //   password: "sss"
    // }, {}).then((response) => {
    //   console.log("response");
    //   console.log(response);
    // }).catch(v => {
    //   console.log("catch");
    //   console.log(v);
    // });
  }
};
</script>
