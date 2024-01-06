<template>
  <div class="my-16">
    <h1 class="text-3xl text-center font-bold mb-8">常见问题</h1>
    <div class="max-w-3xl mx-auto">
      <div
        v-for="(item, index) in questions"
        :key="index"
        class="collapse collapse-plus bg-base-200 dark:bg-gray-900 mb-2"
      >
        <input type="radio" name="my-accordion-3" checked="checked" />
        <div class="collapse-title text-lg text-center font-medium">
          {{ item.title }}
        </div>
        <div class="collapse-content leading-7">
          <p v-html="item.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const questions = [
  {
    title: "这个网站是什么?",
    content:
      "用一个 nuxt + daisyUI + hyperUI 模板写的演示网站,主要是学习用",
  },
  {
    title: "未来计划?",
    content:
      "看心情...",
  },
];
</script>
