<template>
  <Layout>
    <div class="max-w-4xl m-auto">
      <div>
        <label class="mb-2 block font-bold" for="connect">联系方式</label>
        <input
          id="connect"
          type="text"
          v-model="connect"
          placeholder="选填，手机号、微信号、邮箱都可"
          class="input input-bordered w-full max-w-lg text-sm"
        />
      </div>
      <div class="mt-8">
        <label class="mb-2 block font-bold" for="connect"
          >是否需要我们联系你解决？</label
        >
        <select class="select select-bordered w-full max-w-xs" v-model="help">
          <option value="no">不需要</option>
          <option value="yes">需要</option>
        </select>
      </div>
      <div class="mt-8">
        <label class="mb-2 block font-bold" for="comment"
          >请填写你的反馈意见</label
        >
        <textarea
          id="comment"
          class="textarea textarea-bordered w-full text-sm"
          v-model="comment"
          rows="6"
          placeholder="请告诉我们你的意见、或者你遇到的任何问题"
        ></textarea>
      </div>

      <div class="mt-12">
        <button class="btn btn-primary w-48 max-md:w-full" @click="submit">
          提交
        </button>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useNuxtApp } from "nuxt/app";
import request from "~/tools/request";

const { $toast } = useNuxtApp();

const connect = ref("");
const comment = ref("");
const help = ref("no");

// 表单数据
const form = computed(() => ({
  connect: connect.value,
  comment: comment.value,
  help: help.value,
}));

// 清空表单
const clear = () => {
  connect.value = "";
  comment.value = "";
  help.value = "no";
};

// 提交表单
const submit = async () => {
  if (comment.value.trim() === "") {
    $toast.error("请填写反馈意见");
    return;
  }

  await request({
    name: "post_feedback",
    data: form.value,
  });

  $toast.success("提交成功");
  clear();
};
</script>
