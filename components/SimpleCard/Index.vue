<template>
  <a :href="data.path">
    <article
      class="group border border-gray-300 dark:border-gray-600 rounded-xl"
    >
      <img
        :alt="data.title"
        :src="data.image"
        class="h-56 w-full rounded-t-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
      />

      <div class="p-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-50">
          {{ data.title }}
        </h3>

        <p
          class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-200"
        >
          {{ data.desc }}
        </p>
      </div>
    </article>
  </a>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const data = computed(() => props.data);
</script>
