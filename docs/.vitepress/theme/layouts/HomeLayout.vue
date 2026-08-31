<script setup lang="ts">
import { VPLink } from 'vitepress/theme'
import TerminalDemo from '../components/TerminalDemo.vue'

const features = [
  {
    title: '真实 Agent 循环',
    desc: 'LLM 原生 tool calling，Agent 自主读代码、改文件、执行命令，循环直到任务完成。',
  },
  {
    title: '终端 UI',
    desc: 'Textual 构建的 TUI：Markdown 流式渲染、思考过程折叠展示、任务清单面板与工具审批。',
  },
  {
    title: '工具与 MCP 扩展',
    desc: '十八个内置结构化工具，另可接入任意 MCP 服务器，外部工具动态注册为 Agent 能力。',
  },
  {
    title: '十二家模型厂商',
    desc: 'DeepSeek、Claude、OpenAI、Kimi、GLM、Qwen 等统一接入，一行命令切换提供商与模型。',
  },
  {
    title: 'Plan Mode',
    desc: '规划与执行分离：只读调研产出方案文件，确认后才允许改动代码。',
  },
  {
    title: '会话回溯',
    desc: '双击 Esc 回到任意历史轮次，对话记录与文件改动一并回滚，随时撤销。',
  },
]

const sections = [
  {
    title: '使用指南',
    desc: '从安装到进阶：Provider、工具审批、Plan Mode、子代理与 MCP。',
    link: '/guide/getting-started',
    links: [
      { text: '快速开始', link: '/guide/getting-started' },
      { text: '提供商与模型', link: '/guide/providers' },
      { text: 'Plan Mode', link: '/guide/plan-mode' },
      { text: 'MCP 扩展', link: '/guide/mcp' },
    ],
  },
  {
    title: '参考',
    desc: '命令速查、环境变量与配置文件一览，随时查阅。',
    link: '/reference/commands',
    links: [
      { text: '命令速查', link: '/reference/commands' },
      { text: '环境变量', link: '/reference/env' },
      { text: '配置文件', link: '/reference/files' },
    ],
  },
  {
    title: '深入',
    desc: '项目架构、打包分发与数据落盘位置。',
    link: '/advanced/architecture',
    links: [
      { text: '项目架构', link: '/advanced/architecture' },
      { text: '打包与分发', link: '/advanced/distribution' },
      { text: '数据与日志', link: '/advanced/data-and-logs' },
    ],
  },
]
</script>

<template>
  <div class="cn-home">
    <!-- Hero：左文案右终端 -->
    <section class="cn-hero">
      <div class="cn-hero-inner">
        <div class="cn-hero-info">
          <p class="cn-kicker">&gt;_ CodeNect</p>
          <h1>终端里的<br /><span class="cn-accent">AI 编程助手</span></h1>
          <p class="cn-tagline">
            面向开发者的 AI Coding Agent：在终端中理解项目、编写代码、执行命令，循环直到任务完成。
          </p>
          <div class="cn-actions">
            <VPLink class="cn-btn cn-btn--primary" href="/guide/getting-started"
              >快速开始</VPLink
            >
            <VPLink class="cn-btn cn-btn--ghost" href="/reference/commands"
              >命令速查</VPLink
            >
            <VPLink
              class="cn-btn cn-btn--ghost"
              href="https://github.com/kiiki290"
              no-icon
            >
              <span class="vpi-social-github cn-btn-icon" aria-hidden="true"></span
              >GitHub
            </VPLink>
          </div>
          <ul class="cn-hero-points">
            <li>Windows 安装包 / Linux 绿色版，无需 Python</li>
            <li>十八个内置工具 + 任意 MCP 服务器</li>
            <li>双击 Esc 随时回滚会话与文件</li>
          </ul>
        </div>
        <div class="cn-hero-terminal">
          <TerminalDemo />
        </div>
      </div>
    </section>

    <!-- 核心特性 -->
    <section class="cn-section">
      <h2 class="cn-section-title">核心特性</h2>
      <p class="cn-section-sub">每个特性都运行在真实的终端界面里，不离开键盘。</p>
      <div class="cn-features">
        <div v-for="f in features" :key="f.title" class="cn-feature">
          <h3 class="cn-feature-title">{{ f.title }}</h3>
          <p class="cn-feature-desc">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 分区入口 -->
    <section class="cn-section">
      <h2 class="cn-section-title">开始探索</h2>
      <p class="cn-section-sub">文档按使用场景分三个区，按需深入。</p>
      <div class="cn-sections">
        <div
          v-for="s in sections"
          :key="s.title"
          class="cn-section-card"
        >
          <h3><VPLink :href="s.link">{{ s.title }}</VPLink></h3>
          <p>{{ s.desc }}</p>
          <div class="cn-section-links">
            <VPLink v-for="l in s.links" :key="l.link" :href="l.link">{{ l.text }}</VPLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
