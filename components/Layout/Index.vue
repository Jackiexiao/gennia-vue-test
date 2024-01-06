<template>
  <div class="layout-container">
    <VHeader />
    <main class="max-w-7xl m-auto px-8" style="min-height: 60vh">
      <slot></slot>
    </main>
    <Footers />
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style lang="less">
.layout-container {
  font-family: BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei,
    Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
}
</style>
