<template>
    <div class="app-wrapper">
      <!-- 上边栏 -->
      <div class="top-bar">
        <div class="top-bar-logo">
          <img src="@/assets/logo.jpg" class="top-bar-logo-img"/>
        </div>
      <MainMenuBar class="mainMenuBar"/>
      </div>
      <SideBar class="side-bar"/>
      <AppMain class="app-main"/>
    </div>
</template>

<script>
import { MainMenuBar, SideBar, AppMain } from "./Components";
export default {
    components: {
      MainMenuBar,
      SideBar,
      AppMain
    }
}
</script>
<style>
.app-wrapper{
  height: 100%;
}
.top-bar{
    width: 100%;
    height: 66px;
    position: fixed;
    top: 0px;
    left: 0px;
}
.top-bar-logo{
    float: left;
    width: 200px;
    height: 100%;
}
.top-bar-logo-img{
  width: 200px;
  height: 100%;
}
.mainMenuBar{
    background-color: red;
    float: left;
    width: calc(100% - 200px);
    height: 100%;
}
.side-bar{
    background-color: blue;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 66px;
    bottom: 0;
    left: 0;
    z-index: 1001;
    width: 200px;
}
.app-main{
  background-color: yellow;
  position: fixed;
  right: 0px;
  top: 66px;
  width: calc(100% - 200px);
  height: 100%;
}
</style>
