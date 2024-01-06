import { defineNuxtPlugin, addRouteMiddleware } from "nuxt/app";

export default defineNuxtPlugin(() => {
  addRouteMiddleware((to, from) => {
    try {
      if (!window_html) {
        window._hmt = window._hmt || [];
      }
    } catch (e) {}
    return true;
  });
});
