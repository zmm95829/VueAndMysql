<template>
    <section>
        <span>左菜单</span>
        <el-menu default-active="1" @select="handleSelect" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu index="1">
            <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">OU管理</span>
            </template>
            <el-menu-item-group>
            <span slot="title">用户管理</span>
            <el-menu-item index="1-1">查询</el-menu-item>
            <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
        </el-menu-item>
        </el-menu>

    </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    computed: {
      ...mapGetters(["siderBarOpened"]),
      isCollapse: function() {
        return !this.siderBarOpened;
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log("handleOpen");
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log("handleClose");
        console.log(key, keyPath);
      },
      handleSelect: function(){
        this.$router.push({name: "UserList"});
      }
    }
}
</script>
<style>

</style>

