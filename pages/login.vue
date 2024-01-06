<template>
  <Layout>
    <div class="flex mt-24 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="text-center text-2xl font-bold leading-9 tracking-tight">
          用户{{ btnText }}
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" method="post">
          <div>
            <label for="email" class="block text-sm font-medium leading-6"
              >邮箱</label
            >
            <div class="mt-2">
              <input
                v-model="form.email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="邮箱"
                class="input input-bordered w-full"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6"
                >密码</label
              >
              <div class="text-sm" v-if="!isRegister">
                <button
                  class="btn btn-active btn-link p-0"
                  type="button"
                  @click="onForgetPassword"
                >
                  忘记密码
                </button>
              </div>
            </div>
            <div class="mt-2">
              <input
                v-model="form.password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                placeholder="密码"
                class="input input-bordered w-full"
              />
            </div>
          </div>
          <div>
            <button
              class="btn btn-active btn-primary w-full"
              @click="onLoginClick"
            >
              {{ btnText }}
            </button>
          </div>
        </form>

        <p class="mt-10 text-center text-sm">
          {{ tipText }}
          <button class="btn btn-active btn-link pl-0" @click="onTypeChange">
            {{ tipTBtnText }}
          </button>
        </p>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "~/store/user";
import { validEmail, validPassword } from "~/tools/validate";
import { useRoute, useRouter, useNuxtApp } from "nuxt/app";
import get from "safe-get";

// toast
const { $toast } = useNuxtApp();
// 路由
const route = useRoute();
const router = useRouter();
// 用户表单
const form = ref({
  email: "",
  password: "",
});
// 当前的状态：登录login、注册register
const type = ref("login");
// 是否是注册
const isRegister = computed(() => type.value === "register");
// 按钮文案
const btnText = computed(() => (isRegister.value ? "注册" : "登录"));
// 提示文案
const tipText = computed(() =>
  isRegister.value ? "已有账号？" : "还没有账号？"
);
// 提示文案按钮
const tipTBtnText = computed(() =>
  isRegister.value ? "立即登录" : "立即注册"
);
// 用户的store
const userStore = useUserStore();

// 登录按钮点击
async function onLoginClick(e) {
  e.preventDefault();

  // 校验逻辑，如果校验没有通过不进行下面的操作
  if (!validate()) {
    return;
  }

  const { email, password } = form.value;
  if (isRegister.value) {
    // 注册逻辑
    const res = await userStore.register({ email, password });
    $toast.success("验证邮件已发送，请查收");
    console.log("注册的返回值：", res);
  } else {
    // 登录逻辑
    const res = await userStore.login({ email, password });
    $toast.success("登录成功");
    location.href = "/";
  }
}
// 校验
function validate() {
  const { email, password } = form.value;

  const emailValidateRes = validEmail(email);
  const passwordValidateRes = validPassword(password);

  if (!passwordValidateRes.valid) {
    $toast.error(passwordValidateRes.msg);
    return false;
  }

  if (!emailValidateRes.valid) {
    $toast.error(emailValidateRes.msg);
    return false;
  }

  return true;
}

// 类型改变（切换登录或注册）
async function onTypeChange(e) {
  const _type = get(route, "query.type");
  if (_type === "register") {
    router.push("/login");
    return;
  }

  e.preventDefault();
  type.value = isRegister.value ? "login" : "register";
}

// 用戶点击忘记密码
async function onForgetPassword(e) {
  e.preventDefault();
  const { email } = form.value;

  const emailValidateRes = validEmail(email);

  if (!emailValidateRes.valid) {
    $toast.error(emailValidateRes.msg);
    return false;
  }

  await userStore.forgetPassword(email);
  $toast.success("重置密码邮件已发送！");
}

// 初始化类型
function initType() {
  const _type = get(route, "query.type");
  if (_type === "register") {
    type.value = "register";
  } else {
    type.vlaue = "login";
  }
}

initType();
</script>
