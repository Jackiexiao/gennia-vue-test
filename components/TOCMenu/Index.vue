<template>
  <nav>
    <div class="hidden lg:inline-block flex-none sticky top-0 ml-4 w-64">
      <MenuTree :menu="menu" :activeId="activeItemId" />
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import MenuTree from "./MenuTree.vue";

const props = defineProps({
  // 要显示的深度（支持1-5）
  depth: {
    type: Number,
    default: 3,
  },
});

const menu = ref([]);
const activeItemId = ref(null);

onMounted(() => {
  setTimeout(() => {
    initMneu();
    initMenuWhenRenderChange();
    updateActiveItem();
    window.addEventListener("scroll", updateActiveItem);
  }, 10);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateActiveItem);
});

function initMneu() {
  const _menu = getMenu(props.depth);
  menu.value = _menu;
}

function getMenu(depth) {
  // 获取1-5级标题
  const headers = document.querySelectorAll(
    ".markdown-body h1, .markdown-body h2, .markdown-body h3,  .markdown-body h4,  .markdown-body h5"
  );
  const tree = [];

  headers.forEach((header) => {
    const headerLevel = parseInt(header.tagName.substring(1)); // 获取标题级别（1, 2, 3等）

    // 只处理到指定深度的标题
    if (headerLevel <= depth) {
      const node = {
        id: header.id,
        name: header.innerText,
        value: header.id,
        level: headerLevel, // 添加 level 属性
        children: [],
      };

      // 找到合适的位置插入节点
      insertNode(tree, node, headerLevel);
    }
  });

  return tree;
}

function insertNode(tree, node, level, currentLevel = 1) {
  if (!tree.length || level === currentLevel) {
    tree.push(node);
  } else {
    insertNode(tree[tree.length - 1].children, node, level, currentLevel + 1);
  }
}

const updateActiveItem = () => {
  function update(menuList) {
    for (let item of menuList) {
      const element = document.querySelector(`.markdown-body #${item.id}`);
      if (element && window.scrollY >= element.offsetTop) {
        activeItemId.value = item.id;
      }
      if (item.children.length) {
        update(item.children);
      }
    }
  }

  update(menu.value);
};

// 监听.markdown-body元素，当元素渲染发生变化的时候，我们需要重新初始化菜单
function initMenuWhenRenderChange() {
  const observer = new MutationObserver((mutationsList) => {
    setTimeout(() => {
      initMneu();
    });
  });
  const targetNode = document.querySelector(".markdown-body");
  observer.observe(targetNode, { childList: true, subtree: true });
}
</script>
