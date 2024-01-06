<template>
  <Layout>
    <div
      class="relative flex max-w-5xl m-auto max-lg:flex-col"
      :class="{
        'max-w-6xl': isShowSideMenu,
      }"
    >
      <SideMenu :data="docs" :current="path" v-if="isShowSideMenu" />
      <!-- markdown（由@nuxt/content渲染） -->
      <div class="markdown-body">
        <ContentDoc />
      </div>
      <!-- 文章标题导航 -->
      <TOCMenu :depth="3" />
    </div>
  </Layout>
</template>

<script setup>
import { ref } from "vue";
import config from "~/config";
import { useRoute } from "nuxt/app";

const route = useRoute();
const path = ref(route.path);
const docs = config.docs;
const isShowSideMenu = path.value.includes("/docs");
</script>

<style lang="less">
@import url(../assets/css/markdown.css);
</style>
