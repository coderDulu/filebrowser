<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)

const details = ref([
  {
    title: 'UI框架',
    href: 'https://ant.design/components/overview-cn',
    detail: 'Ant Design-Vue'
  },
  {
    title: "Vue存储库",
    href: "https://pinia.vuejs.org/zh/",
    detail: "Pinia"
  },
  {
    title: "路由",
    href: "https://router.vuejs.org/zh/",
    detail: "Vue Router"
  }
])
</script>

<template>
  <h1 class="msg">{{ msg }}</h1>

  <div class="button-c">
    <a-button type="primary" @click="count++">count is {{ count }}</a-button>
  </div>

  <div class="utils">
    <h2 class="msg">相关使用技术</h2>
    <div class="utils-item" v-for="item, key in details" :key="key">
      <h4>{{ item.title }}: &nbsp;</h4>
      <p>
        <a :href="item.href" target="_blank">{{ item.detail }}</a>
      </p>
    </div>



  </div>
</template>

<style scoped lang="scss">
.msg {
  @include setFontSize(24);
  font-weight: bold;
}

.button-c {
  @include setSize(100, 40);
  background-color: #ccc;

  button {
    width: 100%;
    height: 100%;
  }

  &:hover {
    background-color: burlywood;
  }
}

.utils {
  margin-top: 20px;

  h4 {
    font-weight: bold;
    // @include setFontSize(20);
  }

  &-item {
    display: flex;
    align-items: baseline;
  }
}
</style>
