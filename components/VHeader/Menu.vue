<template>
  <div class="flex">
    <div
      class="menu-item text-lg ml-8 cursor-pointer hover:opacity-80 font-semibold flex-none"
      v-for="menu in menus"
      :key="menu.name"
    >
      <nuxt-link :to="menu.href"> {{ menu.name }}</nuxt-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  menus: {
    type: Array,
    default: () => [],
  },
});
</script>
