<script setup lang="ts">
import { ElMenuItem, ElSubMenu, ElIcon } from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import { defineAsyncComponent } from 'vue'
import IconsItem from '@/components/IconsItem.vue'

const MenuList = defineAsyncComponent({
  loader: () => import('../menu/MenuList.vue')
})

export interface MenusType {
  label: string
  index?: string
  path?: string
  icon?: keyof typeof Icons
  children?: MenusType[]
  onClick?: (el: any) => void
}

defineProps<{
  menus: MenusType[]
}>()
</script>

<template>
  <template v-for="item in menus" :key="item.label">
    <el-sub-menu v-if="item.children" :index="item.index || item.path || item.label">
      <el-icon v-if="item.icon">
        <component :is="Icons[item.icon]"></component>
      </el-icon>
      <template #title>
        <span>{{ item.label }}</span>
      </template>
      <MenuList :menus="item.children" />
    </el-sub-menu>
    <el-menu-item @click="item.onClick" v-else :index="item.index || item.path || item.label">
      <IconsItem v-if="item.icon" :icon-name="item.icon" />
      <!-- <el-icon v-if="item.icon">console.log('', )
        <component :is="Icons[item.icon]"></component>
      </el-icon> -->
      <template #title>
        <span>{{ item.label }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<style lang="scss" scoped></style>
