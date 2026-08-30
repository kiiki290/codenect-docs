import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'CodeNect Docs',
  description: 'CodeNect 文档中心',

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
          ],
        },
      ],
    },

    outline: {
      label: '本页目录',
    },

    footer: {
      message: '基于 VitePress 构建',
    },
  },
})
