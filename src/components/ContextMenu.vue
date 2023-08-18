<script setup lang="ts">
defineProps<{
    x: number,
    y: number,
    menu: { label: string, onclick: Function }[]
}>()
</script>

<template>
    <div class="contextmenu" :style="{ top: y + 'px', left: x + 'px' }">
        <ul>
            <li v-for="item in menu" :key="item.label" @click="item.onclick">{{ item.label }}</li>
        </ul>
    </div>
</template> 

<style lang="scss" scoped>
.contextmenu {
    position: fixed;
    z-index: 999;
    background-color: #f6f5f6;
    // width: 100px;

    padding: 5px;
    box-shadow: 0 0 10px 1px rgba($color: #000000, $alpha: .5);
}

ul {
    padding: 0 10px;
}

li {
    font-size: 14px;
    margin: 5px 0;
    cursor: pointer;

    &:hover {
        color: rgb(184, 93, 93);
    }

    text-align: center;
}</style>