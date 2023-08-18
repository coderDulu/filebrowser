<script setup lang="ts">
import MenuList, { MenusType } from './MenuList.vue'
import { ElMenu,  } from 'element-plus'
import type { MenuProps } from 'element-plus'


interface PropsType {
  menus: MenusType[]
}

defineProps<PropsType & Partial<MenuProps>>()
</script>

<template>
  <el-menu v-bind="$props" id="menu">
    <MenuList :menus="menus" />
    <slot name="collapse"></slot>
  </el-menu>
</template>

<style lang="scss" scoped>
.menu {
  position: relative;
}


</style>
