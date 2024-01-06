<template>
  <a
    :href="article.path"
    target="_blank"
    class="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
  >
    <span
      class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
    ></span>

    <div class="sm:flex sm:justify-between sm:gap-4">
      <div>
        <h3
          class="text-lg font-bold text-gray-900 dark:text-gray-50 sm:text-xl"
        >
          {{ article.title }}
        </h3>

        <p class="mt-1 text-xs font-medium text-gray-600 dark:text-gray-300">
          {{ article.author }}
        </p>
      </div>

      <div class="hidden sm:block sm:shrink-0">
        <img
          :alt="article.author"
          :src="article.avatar"
          class="h-16 w-16 rounded-lg object-cover shadow-sm"
        />
      </div>
    </div>

    <div class="mt-4">
      <p class="max-w-[40ch] text-sm text-gray-500 dark:text-gray-200">
        {{ article.desc }}
      </p>
    </div>

    <dl class="mt-6 flex gap-4 sm:gap-6">
      <div class="flex flex-col-reverse">
        <dt class="text-sm font-medium text-gray-600 dark:text-gray-200">
          {{ article.date }}
        </dt>
        <dd class="text-xs text-gray-500 dark:text-gray-400">发布时间</dd>
      </div>

      <div class="flex flex-col-reverse">
        <dt class="text-sm font-medium text-gray-600 dark:text-gray-200">
          {{ article.readTime }}
        </dt>
        <dd class="text-xs text-gray-500 dark:text-gray-400">阅读时间</dd>
      </div>
    </dl>
  </a>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const article = computed(() => props.article);
</script>
