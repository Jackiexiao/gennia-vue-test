<template>
  <nav class="menu mr-4">
    <!-- 1024px上显示的效果 -->
    <ul class="rounded-box sticky top-0">
      <li class="mb-2" v-for="link in props.data" :key="link.path">
        <nuxt-link
          class="text-gray-70"
          :class="{
            'bg-gray-100': props.current === link.path,
            'dark:bg-gray-700': props.current === link.path,
          }"
          :to="link.path"
        >
          <component class="inline-block w-5 h-5" :is="link.icon" />
          {{ link.title }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  current: {
    type: String,
    default: "",
  },
});
</script>
