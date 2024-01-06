<template>
  <footer
    class="footer footer-center p-10 text-base-content rounded dark:text-white mt-24"
  >
    <!-- 更多链接 -->
    <nav class="grid grid-flow-col gap-4">
      <nuxt-link
        class="link link-hover"
        v-for="link in footerNav"
        :to="link.path"
        :key="link.name"
        >{{ link.name }}</nuxt-link
      >
    </nav>
    <!-- 你的网站备案号 -->
    <p><a href="https://beian.miit.gov.cn/">粤ICP备2022122081号-2</a></p>
  </footer>
</template>

<script setup>
const footerNav = [
  {
    name: "意见和反馈",
    path: "/feedback",
  },
  {
    name: "文档",
    path: "/docs/starter",
  },
];

const footerMedia = [{}];
</script>
