import { defineStore } from "pinia";
import { useNuxtApp } from "nuxt/app";
import { getAuth } from "../tools/auth";
import { getError } from "../tools/error";

export const useUserStore = defineStore("user", {
  state: () => ({
    init: false,
    currentUser: null,
    anonymousUser: null,
  }),
  getters: {
    // 用户的uid
    uid() {
      return this.currentUser?.uid || this.anonymousUser?.uid;
    },
    // 用户是否是匿名用户
    isAnonymous() {
      return !!this.anonymousUser;
    },
    // 是否登录
    isLogin() {
      return !!this.currentUser;
    }

  },
  actions: {
    // 初始化用户状态
    async initUser() {
      const auth = await getAuth();
      const user = auth.currentUser;
      this.init = true;

      if (user && user.loginType) {
        // 如果用户存在，判断用户的登录类型
        if (user.loginType !== "ANONYMOUS") {
          // 邮箱登录
          this.currentUser = user;
        } else {
          // 匿名登录
          this.anonymousUser = user;
        }
      } else {
        // 如果用户不存在，则开启匿名登录
        await this.anonymousLogin();
      }
    },
    // 开启匿名登录
    async anonymousLogin() {
      const { $toast } = useNuxtApp();
      try {
        const auth = await getAuth();
        const user = await auth.anonymousAuthProvider().signIn();
        this.anonymousUser = user;
      } catch (error) {
        // 弹出错误提示
        const { code, message } = getError(error.message);
        if (message) {
          $toast.error(message);
        }
        throw error;
      }
    },
    // 用户注册
    async register({ email, password }) {
      const { $toast } = useNuxtApp();
      try {
        const auth = await getAuth();
        return await auth.signUpWithEmailAndPassword(email, password);
      } catch (error) {
        // 弹出错误提示
        const { code, message } = getError(error.message);
        if (message) {
          $toast.error(message);
        }
        throw error;
      }
    },
    // 用户登录
    async login({ email, password }) {
      const { $toast } = useNuxtApp();
      try {
        const auth = await getAuth();
        return await auth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        // 弹出错误提示
        const { code, message } = getError(error.message);
        if (message) {
          $toast.error(message);
        }
        throw error;
      }
    },
    // 忘记密码
    async forgetPassword(email) {
      const { $toast } = useNuxtApp();
      try {
        const auth = await getAuth();
        return await auth.sendPasswordResetEmail(email);
      } catch (error) {
        // 弹出错误提示
        const { code, message } = getError(error.message);
        if (message) {
          $toast.error(message);
        }
        throw error;
      }
    },
    // 用户登出
    async logout() {
      const { $toast } = useNuxtApp();
      try {
        const auth = await getAuth();
        return await auth.signOut();
      } catch (error) {
        // 弹出错误提示
        const { code, message } = getError(error.message);
        if (message) {
          $toast.error(message);
        }
        throw error;
      }
    },
  },
});
