<script setup lang="ts">
import { createEcharts } from '@/utils/echarts'
import type { ECharts } from 'echarts/core';

import { onMounted, watch, onUnmounted } from 'vue'

const props = defineProps<{
  option: any;
}>()
const hash = Math.random().toString(36).substring(2)  // 生成唯一id
let myChart: ECharts | null = null // 定义实例 
const id = 'base-' + hash  // 定义元素id
const style = {
  height: '100%',
}

// 更改配置
const resetEcharts = (newVal: any) => {
  myChart?.setOption(newVal)
}


onMounted(() => {
  // @ts-ignore
  myChart = createEcharts(id, props.option)
})


watch(props.option, (newVal) => {
 resetEcharts(newVal)
})

onUnmounted(() => {
  myChart?.dispose()
})


defineExpose({
  myChart
})
</script>

<template>
  <div :id="id" :style="style"></div>
</template>

<style scoped></style>
