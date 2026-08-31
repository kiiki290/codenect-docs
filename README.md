# CodeNect 文档站

CodeNect（终端 AI 编程助手）的使用文档，基于 [VitePress](https://vitepress.dev/) 构建，全部内容为中文。产品本体见 CodeNect 主仓库。

## 快速开始

双击 `start.bat`（首次运行自动安装依赖，启动后自动打开浏览器），或：

```powershell
npm install
npm run docs:dev
```

开发服务器默认地址 http://localhost:5173，保存即热更新。

## 其他命令

| 命令 | 说明 |
| --- | --- |
| `npm run docs:dev` | 启动开发服务器（热更新） |
| `npm run docs:build` | 构建静态站点到 `docs/.vitepress/dist/`（绝对路径，用于部署） |
| `npm run docs:preview` | 本地预览构建产物 |
| `node scripts/build-offline.mjs` | 构建**离线静态包**（相对路径 + 链接校验，解压后双击 index.html 即可浏览） |

## 文档结构

| 目录 | 内容 |
| --- | --- |
| `docs/guide/` | 使用指南（快速开始、基础操作、提供商、工具、Plan Mode 等） |
| `docs/reference/` | 参考（命令速查、环境变量、配置文件） |
| `docs/advanced/` | 深入（项目架构、打包分发、数据与日志） |

新增页面需在 `docs/.vitepress/config.mts` 的 sidebar 中同步登记；待截图位置使用 `<ImagePlaceholder desc="..." />` 占位。更多编写约定见 [CLAUDE.md](CLAUDE.md)。

## 环境要求

- Node.js ≥ 18（本机 Node 24 验证通过）
- 无测试、无 lint
