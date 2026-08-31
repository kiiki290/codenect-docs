# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

CodeNect 的 VitePress 文档站（纯静态内容工程，全部文档为中文）。CodeNect 本体是终端 AI 编程助手（Python + Textual TUI + MCP），其源码在**本仓库之外的姊妹仓库 `D:\Project\qzb\CodeNect`**——本仓库只负责文档。

## 常用命令

```powershell
npm run docs:dev                    # 开发服务器 http://localhost:5173（热更新）
npm run docs:build                  # 构建到 docs/.vitepress/dist/（绝对路径，用于部署）
npm run docs:preview                # 本地预览构建产物
node scripts/build-offline.mjs      # 构建离线静态包（比赛提交用）
```

- 离线包原理：`DOCS_OFFLINE=1` 让 `config.mts` 用 `base: './'` 构建，脚本再按每个 HTML 的目录深度改写 `./`、`/` 前缀引用为深度感知相对路径，并校验所有 href/src 指向真实文件。改动内容后重跑该脚本再打包即可
- `start.bat`：一键启动开发服务器（首次运行自动 `npm install`，延迟 3 秒自动打开浏览器）
- 没有测试、没有 lint；本机 Node 24 / npm 11
- 构建产物 `docs/.vitepress/dist/` 与 `docs/.vitepress/cache/` 已被 gitignore，**不提交**；dist 里当前是离线改写后的产物，如需部署版重跑 `npm run docs:build` 即可

## 结构与架构

内容按三层组织，与侧边栏一一对应（16 个内容页 + 首页）：

- `docs/index.md` — 首页（唯一使用 frontmatter 的页面，`layout: home`）
- `docs/guide/` — 使用指南（getting-started、basic-usage、providers、tools、plan-mode、sessions、subagents、skills、mcp、context）
- `docs/reference/` — 参考（commands、env、files）
- `docs/advanced/` — 深入（architecture、distribution、data-and-logs）

**新增页面必须同步改 `docs/.vitepress/config.mts` 的 sidebar**，否则页面不会出现在导航里；`nav` 只挂三个分区的入口页。

自定义主题在 `docs/.vitepress/theme/index.ts`：继承默认主题，全局注册一个 `ImagePlaceholder` 组件（`theme/components/ImagePlaceholder.vue`，虚线占位框）。**目前所有截图已就位，该组件无任何引用**，属遗留代码；以后再写"待截图"内容可继续用它占位。

插图约定：图片文件放 **`docs/images/`**（不要放 `docs/public/`——public 的文件不经过 Vite 资源管线，`base: './'` 离线构建时会解析失败）。md 中用相对路径引用：子目录页面 `![描述](../images/xxx.png)`，首页 `./images/`；构建时管线会把图片哈希改名到 `assets/`，引用自动改写。文件名避免空格（有空格需用 `<路径>` 尖括号写法）。

`docs/public/logo.png` 同时是站点 logo 与 favicon。`lastUpdated: true` 依赖页面文件的 git 提交时间，本地新建未提交的文件会显示当前时间。

## 内容编写约定

- 全部内容用中文（`lang: 'zh-CN'`），页内链接一律用**绝对路径**（`/guide/basic-usage`）
- 内容页直接以 `# 标题` 开头，不加 frontmatter；不渲染 `::: ` 自定义容器（无对应组件）
- 文档描述的是 CodeNect 的真实行为，不是想象——**修改文档前先在主仓库 `D:\Project\qzb\CodeNect` 的源码（`core/`、`modules/`、`tui/`）中核实**；主仓库的功能迭代时常同步改文档口径（见主仓库 commit 记录中的「同步 docs」）
- 文档引用的命令、环境变量、文件路径以 `docs/reference/` 三页为准，改产品行为时记得同步这三页
