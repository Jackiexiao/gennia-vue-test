<template>
  <div class="hero-content text-center my-16">
    <div class="max-w-5xl">
      <h1 class="text-5xl font-bold">Gennia Game</h1>
      <p class="pt-6 pb-4 text-xl">
        A realtime multiplayer game where the goal is to capture all of the enemy's general without losing your own
        一个实时多人在线方块即时战略游戏，目标是占领敌方所有皇都!
      </p>
      <button class="btn btn-primary mt-4" @click="onPlay">
        Play Game
      </button>
      <button class="btn ml-4 mt-4" @click="onDocClick">Docs</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "nuxt/app";
import config from "~/config";

const router = useRouter();

async function onPlay() {
  location.href = 'https://gennia.cn';
}

function onDocClick() {
  router.push(config.docs[0].path);
}
</script>

<style></style>
