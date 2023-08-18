<script setup lang="ts">
import MenuContainer from '@/components/MenuContainer.vue'
</script>

<template>
  <el-container id="container-c">
    <el-header>
      我的文件
    </el-header>
    <el-container>
      <el-aside>
        <MenuContainer />
      </el-aside>
      <el-container id="container-main">
        <router-view></router-view>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped>
:deep(.el-header) {
  display: flex;
  align-items: center;
}

:deep(.el-aside) {
  width: auto;
}

#container-c {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
}

#container-main {
  padding: 24px;
  flex: 1;
  max-height: calc(100vh - 60px);
  overflow: auto;
}
</style>
