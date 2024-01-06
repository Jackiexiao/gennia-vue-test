<template>
  <div
    id="app"
    class="min-h-screen text-base font-mono dark:bg-slate-800 text-slate-800 dark:text-slate-100"
    :style="{
      visibility: visible ? 'visible' : 'hidden',
    }"
  >
    <NuxtPage />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "~/store/user";
const userStore = useUserStore();

// 主体是否显示的变量，避免在暗黑主体下首屏闪现日光模式，影响用户体验
const visible = ref(false);

onMounted(() => {
  visible.value = true;
  userStore.initUser();
});

// 初始化用户主体样式
function initTheme() {
  if (process.client) {
    const theme = localStorage.getItem("gennia_theme");
    if (theme === "dark") {
      document.documentElement.classList.add(theme);
    }
  }
}

initTheme();
</script>
