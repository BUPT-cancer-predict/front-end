<template>
  <!-- 顶部菜单 -->
  <div id="title">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="0">
        <img class="logo" src="@/assets/logo.png" alt="logo" />
      </el-menu-item>
      <el-menu-item index="1">主页</el-menu-item>
      <el-submenu index="2">
        <template v-slot:title>我的工作台</template>
        <el-menu-item index="2-1">
          <a href="http://localhost:8081/predict">病情预测</a>
        </el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template v-slot:title>选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
/* 顶部 Logo 图片 */
.logo {
  width: 50px;
  height: 50px;
}

/* 卡片样式 */
.system-intro {
  padding: 20px;
  font-family: "Arial", sans-serif;
  background-color: #007bff;
}

.card-title {
  color: #ffffff;
}
</style>