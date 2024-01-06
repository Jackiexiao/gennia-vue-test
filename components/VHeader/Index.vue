<template>
  <header>
    <div
      :class="[
        isShowMenu
          ? 'h-screen z-50 fixed w-screen items-start top-0'
          : 'items-center',
      ]"
      class="flex justify-between max-w-7xl m-auto py-6 px-8 bg-white dark:bg-slate-800"
    >
      <a href="/">
        <div class="flex items-center">
          <img
            src="/images/logo.png"
            alt="logo"
            width="92"
          />
          <!-- <span class="ml-2 font-bold text-lg">YourText</span> -->
        </div>
      </a>

      <Menu class="hidden lg:flex" :menus="menus" />
      <!-- <1024px显示 -->
      <Bars3Icon
        v-if="!isShowMenu"
        class="flex-none w-8 text-slate-600 cursor-pointer lg:hidden"
        @click="toggleMenu"
      />
      <XMarIcon
        v-if="isShowMenu"
        class="flex-none w-8 text-slate-600 cursor-pointer lg:hidden"
        @click="toggleMenu"
      >
      </XMarIcon>
      <!-- >=1024px显示 -->
      <div
        id="menu"
        class="hidden lg:flex items-center"
        :class="[isShowMenu ? 'menu--vertical' : '']"
      >
        <div
          class="menu-item text-lg cursor-pointer ml-6 hover:opacity-80 font-semibold flex-none text-slate"
        >
          <SunIcon v-if="!isDark" class="w-6" @click="toggleTheme" />
          <MoonIcon v-else class="w-6" @click="toggleTheme" />
        </div>

        <Menu class="flex flex-col items-center lg:hidden" :menus="menus" />
        <!-- 登录注册按钮（无登录状态时显示） -->
        <template v-if="isShowLoginBtn">
          <div class="menu-item btn ml-6" @click="onLoginClick">登录</div>
          <div class="menu-item btn btn-primary ml-2" @click="onRegisterClick">
            立即注册
          </div>
        </template>
        <!-- 用户头像（用户登时显示） -->
        <div class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="avatar placeholder ml-4 cursor-pointer"
            v-if="isShowAvatar"
          >
            <div class="bg-neutral text-neutral-content rounded-full w-8">
              <span class="text-xs">用户</span>
            </div>
          </div>
          <ul
            tabindex="0"
            class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-44 dark:bg-slate-700"
          >
            <li class="dark:hover:bg-slate-600" @click="onBought">
              <a>我的购买</a>
            </li>
            <li class="dark:hover:bg-slate-600" @click="onLogout">
              <a>退出登录</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter, useNuxtApp } from "nuxt/app";
import { useUserStore } from "~/store/user";
import Bars3Icon from "@heroicons/vue/24/outline/Bars3Icon";
import XMarIcon from "@heroicons/vue/24/outline/XMarkIcon";
import SunIcon from "@heroicons/vue/24/outline/SunIcon";
import MoonIcon from "@heroicons/vue/24/outline/MoonIcon";
import Menu from "./Menu.vue";

// toast
const { $toast } = useNuxtApp();
// 路由
const route = useRoute();
const router = useRouter();
// 是否是登录页
const isLoginPage = computed(() => {
  return route.name === "login";
});

// 用户store
const userStore = useUserStore();
// 是否登录态已经获取
const isInit = computed(() => !!userStore.init);
// 是否有用户登陆态
const currentUser = computed(() => !!userStore.currentUser);

// 是否显示登录/注册按钮
const isShowLoginBtn = computed(() => {
  return !isLoginPage.value && isInit.value && !currentUser.value;
});
// 是否显示用户头像
const isShowAvatar = computed(() => {
  return !isLoginPage.value && isInit.value && currentUser.value;
});

// 菜单项
const menus = [
  { name: "首页", href: "/" },
  { name: "游戏", href: "https://gennia.cn" },
  { name: "文档", href: "/docs/starter" },
];

//  显示菜单的逻辑
const isShowMenu = ref(false);
function toggleMenu() {
  isShowMenu.value = !isShowMenu.value;
}

// 日光/暗黑模式切换的逻辑
const isDark = ref(false);
function toggleTheme() {
  if (!isDark.value) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
  saveLocalTheme(isDark.value);
}
// 日光/暗黑模式进行本地存储
function saveLocalTheme(isDark) {
  localStorage.setItem("gennia_theme", isDark ? "dark" : "light");
}

// 设置暗黑模式
function setDarkTheme() {
  const root = document.documentElement;
  isDark.value = true;
  root.classList.add("dark");
  root.setAttribute("data-theme", "dark");
}

//  设置日光模式
function setLightTheme() {
  const root = document.documentElement;
  isDark.value = false;
  root.classList.remove("dark");
  root.setAttribute("data-theme", "light");
}

// 初始化日光/暗黑模式
function initTheme() {
  if (process.client) {
    const theme = localStorage.getItem("gennia_theme");

    if (theme === "dark") {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }
}

// 用户点击登录
function onLoginClick() {
  router.push("/login");
}

// 用户点击我的购买
function onBought() {
  router.push("/bought");
}

// 用户点击注册
function onRegisterClick() {
  router.push("/login?type=register");
}

// 用户点击登出
async function onLogout() {
  await userStore.logout();
  $toast.success("登出成功");

  setTimeout(() => {
    location.reload();
  }, 200);
}

onMounted(() => {
  initTheme();
  window.addEventListener("resize", () => {
    const width = document.body.clientWidth;
    if (width <= 1024) {
      isShowMenu.value = false;
    }
  });
});
</script>

<style lang="less">
header {
  .menu--vertical {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    bottom: 5vh;
    left: 50%;
    transform: translateX(-50%);
    .menu-item {
      margin: 0 0 24px 0 !important;
    }
  }
}
</style>
