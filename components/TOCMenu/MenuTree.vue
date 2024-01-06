<template>
  <div class="menu-tree">
    <div
      v-for="item in props.menu"
      :key="item.id"
      class="text-sm text-gray-600 dark:text-gray-100 leading-7"
      :style="{
        paddingLeft: `${(item.level - 1) * 10}px`,
      }"
    >
      <a
        class="px-2 py-1 rounded hover:bg-gray-100 hover:dark:bg-gray-600 "
        :class="{
          'bg-gray-100': item.id === activeId,
          'dark:bg-gray-700': item.id === activeId,
        }"
        :href="`#${item.value}`"
        >{{ item.name }}</a
      >
      <MenuTree
        v-if="item.children.length"
        :menu="item.children"
        :activeId="activeId"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  menu: {
    type: Array,
    default: () => [],
  },
  activeId: {
    type: String,
    default: null,
  },
});
</script>
