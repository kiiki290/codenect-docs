import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'CodeNect 文档',
  description: 'CodeNect 使用文档：真实 Agent 循环（LLM 原生 tool calling）+ 终端 UI + MCP 外部工具桥接',
  lastUpdated: true,

  head: [['link', { rel: 'icon', href: '/logo.png' }]],

  themeConfig: {
    logo: '/logo.png',

    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: '参考', link: '/reference/commands' },
      { text: '深入', link: '/advanced/architecture' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '使用指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '基础操作', link: '/guide/basic-usage' },
            { text: '提供商与模型', link: '/guide/providers' },
            { text: '内置工具与审批', link: '/guide/tools' },
            { text: 'Plan Mode', link: '/guide/plan-mode' },
            { text: '会话管理', link: '/guide/sessions' },
            { text: '子代理', link: '/guide/subagents' },
            { text: '技能包与指令文件', link: '/guide/skills' },
            { text: 'MCP 扩展', link: '/guide/mcp' },
            { text: '上下文管理', link: '/guide/context' },
          ],
        },
      ],
      '/reference/': [
        {
          text: '参考',
          items: [
            { text: '命令速查', link: '/reference/commands' },
            { text: '环境变量', link: '/reference/env' },
            { text: '配置文件', link: '/reference/files' },
          ],
        },
      ],
      '/advanced/': [
        {
          text: '深入',
          items: [
            { text: '项目架构', link: '/advanced/architecture' },
            { text: '打包与分发', link: '/advanced/distribution' },
            { text: '数据与日志', link: '/advanced/data-and-logs' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
    },

    outline: {
      label: '本页目录',
      level: [2, 3],
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    lastUpdated: {
      text: '最后更新',
    },

    footer: {
      message: '基于 VitePress 构建',
    },
  },
})
