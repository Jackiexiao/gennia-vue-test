<template>
  <div>
    <SideList
      class="hidden lg:inline-block w-56 h-full"
      :data="props.data"
      :current="props.current"
    ></SideList>
    <PopList
      class="hidden max-lg:block"
      :data="props.data"
      :current="props.current"
    >
    </PopList>
  </div>
</template>

<script setup>
import SideList from "./SideList.vue";
import PopList from "./PopList.vue";

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
