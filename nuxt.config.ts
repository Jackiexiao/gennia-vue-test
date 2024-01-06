import config from "./config";

export default defineNuxtConfig({
  // 应用配置
  app: {
    head: {
      title: "Gennia Vue",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/images/favicon.ico",
        },
        {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css'
        }
      ],
      script: [
        {
          src: process.env.baiduJsScript,
        },
      ],
    },
  },
  generate: {
    routes: [
      // 文档页面需要预先生成静态页面
      ...config.docs.map((i) => i.path),
    ],
  },
  // 开发者工具
  devtools: { enabled: true },
  // nuxt插件配置
  plugins: ["~/plugins/toast.js", "~/plugins/baidu.js"],
  // nuxt模块配置
  modules: ["@pinia/nuxt", "@nuxt/content"],
  // 全局css
  css: ["~/assets/css/main.css"],
  // 运行时全局变量配置
  runtimeConfig: {
    public: {
      envId: process.env.envId,
    },
  },
  // @nuxt/content配置
  content: {
    markdown: {
      toc: {
        depth: 3,
      },
      remarkPlugins: ['remark-math'],
      rehypePlugins: {
        'rehype-katex': {
          output: 'html' // the default value is 'htmlAndMathml'
        }
      }
    },
    highlight: {
      theme: {
        default: "github-light",
        dark: "github-dark",
        sepia: "monokai",
      },
    },
  },
  // postcss配置
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
