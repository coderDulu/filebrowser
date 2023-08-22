<script lang="ts" setup>
import { ref } from 'vue'
import type { MenusType } from '@/components/common/menu/MenuList.vue'
import { ElIcon } from 'element-plus'
import { CaretLeft, CaretRight } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

import MenuCpm from './common/menu/MenuCpm.vue'

const router = useRouter()

const menus = ref<MenusType[]>([
  {
    label: '新建文件夹',
    icon: 'Folder',
    index: '1'
  },
  {
    label: '新建文件',
    icon: 'DocumentAdd',
    index: '2'
  },
  {
    label: '设置',
    icon: 'Setting',
    index: '3'
  },
  {
    label: '退出登录',
    icon: 'CircleClose',
    onClick() {
      router.push('/login')
      // 清空token
      localStorage.removeItem('token')
    }
  }
])

const isCollapse = ref(false)

const onSelect = () => {}
</script>
<template>
  <div class="main-left" v-scroll>
    <MenuCpm
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :menus="menus"
      background-color="#fafafa"
      text-color="#546e7a"
      @select="onSelect"
    >
      <!-- 显示隐藏按钮 -->
      <template #collapse>
        <div @click="() => (isCollapse = !isCollapse)" class="collapse">
          <el-icon size="24" v-if="isCollapse"><CaretRight /></el-icon>
          <el-icon size="24" v-else><CaretLeft /></el-icon>
        </div>
      </template>
    </MenuCpm>
  </div>
</template>

<style lang="scss" scoped>
.collapse {
  cursor: pointer;
  position: absolute;
  background-color: #89aec4;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-icon) {
  cursor: pointer;
}

:deep(.el-menu) {
  height: 100%;
}

.main-left {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header-utils {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  // height: auto;
}

.item-contextmenu {
  position: absolute;
  z-index: 999;
  background-color: #000;
  width: 100px;
  height: 100px;
}

// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 200px;
//   min-height: 400px;
// }
</style>
