<template>
  <section>
    <div class="max-w-screen-xl px-0 py-4">
      <div
        class="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16"
      >
        <div class="mx-auto max-w-lg text-center lg:mx-0">
          <h2 class="mb-8 text-3xl text-center font-bold">{{ data.title }}</h2>

          <p
            class="text-gray-700 text-left leading-8 dark:text-gray-300 text-lg"
            v-html="data.desc"
          ></p>

        </div>

        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <a
            v-for="feature in data.features"
            :key="feature.icon"
            class="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
          >
            <span class="inline-block rounded-lg p-3">
              <component
                :is="feature.icon"
                class="w-6 h-6 text-gray-600 dark:text-gray-200"
              />
            </span>

            <h2 class="mt-2 font-bold">{{ feature.name }}</h2>

            <p
              class="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600 dark:text-gray-400"
            >
              {{ feature.desc }}
            </p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  AcademicCapIcon,
  ChartBarSquareIcon,
  CloudArrowUpIcon,
  CodeBracketSquareIcon,
  CubeTransparentIcon,
  LightBulbIcon,
} from "@heroicons/vue/24/outline";

const data = {
  title: "为啥用 vue3 开发",
  desc: "人生苦短，选个最喜欢的实现方式，而不是最好的方式",
  features: [
    {
      name: "上手快",
      desc: "vue 符合直觉,学习成本比 react 低,投入产出比高",
      icon: AcademicCapIcon,
    },
    {
      name: "响应式",
      desc: "Vue 是响应式的，React 是手动setState",
      icon: ChartBarSquareIcon,
    },
    {
      name: "不纠结",
      desc: "vue 官方有一套完整的解决方案，react 有太多的解决方案, 让人选择困难",
      icon: CloudArrowUpIcon,
    },
  ],
};
</script>
