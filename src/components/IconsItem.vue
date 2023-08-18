<script setup lang="ts">
import type * as Icons from '@element-plus/icons-vue'
import type { IconProps } from 'element-plus'
import useIcons from '@/hooks/useIcons'

type IconType = keyof typeof Icons

type PropsType = Partial<IconProps> & { iconName: IconType }

defineProps<PropsType>()

const Icon = useIcons
</script>

<template>
  <el-icon v-if="iconName" v-bind="$props">
    <component :is="Icon(iconName)"></component>
  </el-icon>
</template>

<style lang="scss" scoped></style>
