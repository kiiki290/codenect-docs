# 快速开始

欢迎使用 CodeNect 文档中心。

## 本地开发

```bash
npm install
npm run docs:dev
```

开发服务器默认运行在 <http://localhost:5173>。

## 构建与预览

```bash
npm run docs:build
npm run docs:preview
```

## 目录结构

```text
.
├── docs/                  # 文档根目录
│   ├── .vitepress/
│   │   └── config.mts     # 站点配置
│   ├── index.md           # 首页
│   └── guide/             # 指南章节
│       └── getting-started.md
└── package.json
```
