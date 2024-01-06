<template>
  <Popover class="relative">
    <div class="flex justify-end">
      <PopoverButton
        class="inline-flex items-center gap-x-1 text-lg font-semibold leading-6 text-gray-900 dark:text-gray-50"
      >
        <span>文档列表</span>
        <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
      </PopoverButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <PopoverPanel
        class="absolute left-1/2 z-10 mt-2 pt-4 flex w-screen -translate-x-1/2 px-4 bg-white dark:bg-gray-800 shadow-lg"
      >
        <SideList class="w-full" :data="props.data" :current="props.current" />
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

import SideList from "./SideList.vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  current: {
    type: String,
    default: "",
  },
});
</script>
