<script setup lang="ts">
import { onMounted, ref,onUpdated, } from 'vue';
import { throttle } from '@/utils/index'

type ScrollBehavior = "auto" | "smooth"

const props = defineProps<{
  isAuto?: boolean
}>()

const scrollRef = ref<HTMLDivElement>()
const isMouseEnter = ref(false);  // 鼠标是否在内
const scrollH = ref<number | undefined>(0)
const scrollToBottomDebounce = throttle(() => {
  scrollToBottom()
}, 500)

onMounted(() => {
  listenNodesChange();
})

onUpdated(() => {
  scrollToBottomDebounce()
})




function listenNodesChange() {
  props.isAuto && scrollToBottom();
}

// 滚动到底部
function scrollToBottom() {
  const scroll = scrollRef.value?.scrollHeight;
  scrollH.value = scroll
  scrollRef.value?.scrollBy({ top: scroll }); // 滚动到最下方
}

function handleMouseEnter() {
  scrollRef.value && (scrollRef.value.style.overflowY = "auto")
  isMouseEnter.value = true;
}

function handleMouseLeave() {
  isMouseEnter.value = false;
  scrollRef.value && (scrollRef.value.style.overflowY = "hidden")
}

defineExpose({
  scrollH,
  scrollTo: (position: number, behavior: ScrollBehavior | undefined) => {
    scrollRef.value?.scrollTo({
      top: position,
      behavior
    })
  }
})
</script>

<template>
  <div class="auto-c" ref="scrollRef" @mouseenter.self="handleMouseEnter" @mouseleave.self="handleMouseLeave">
    <slot></slot>
  </div>
</template>

<style scoped>
.auto-c {
  width: 100%;
  overflow: hidden;
  word-break: break-all;
  font-size: 16px;
  padding: 0 10px;
  white-space: pre-wrap;
  max-height: 100vh;
}
</style>
