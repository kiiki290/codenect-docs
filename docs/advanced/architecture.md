# 项目架构

## 目录结构

```text
CodeNect/
├── main.py                     # CLI 入口
├── requirements.txt
├── bin/                        # 内置可执行文件（ripgrep 15.2.0，MIT 许可，search/glob 工具用，零安装）
│                               #   按平台分发：rg.exe=Windows、rg-linux-x64=Linux x86_64(musl 静态)、
│                               #   rg-macos-arm64/x64=macOS；无对应二进制时（如 Linux aarch64）
│                               #   回退系统 PATH 中的 rg；Windows 打包版随包内置 rg.exe 与 LICENSE
├── tui/                        # Textual TUI（按职责拆模块，函数统一 fn(app, ...) 显式传 app）
│   ├── app.py                  # App 骨架（compose / 按键 / 输入提交 / 流式运行 / 上下文体检 / 退出）
│   ├── commands.py             # 全部 / 斜杠命令（注册表、分发、Key 流程、模型配置、/save /sessions /resume /load）
│   ├── subagents.py            # 子代理会话视图（切换栏、bg 汇报注入 + 自动续跑）
│   ├── approval.py             # 工具审批流程（内联选项条、阻塞等待、回调）
│   ├── render.py               # 消息→控件映射（实时流式、/load、子代理视图三处共用）
│   ├── streaming.py            # 流式事件与状态（worker 投递事件队列、主线程定时 drain 消费）
│   ├── widgets.py              # 自定义控件（Markdown 流式、折叠块、diff 渲染等）
│   ├── autocomplete.py         # 输入补全（命令 + 参数 + 鼠标交互）
│   ├── rewind.py               # 双击 Esc 会话回溯（轮次选择器、消息截断 + 文件回滚 + 撤销）
│   ├── resume.py               # /resume 会话恢复选择器
│   ├── clipboard.py            # 选区收集与复制
│   └── screen.py               # SelectionScreen（拖选自动滚动）
│
├── core/                       # 核心引擎
│   ├── agent.py                # Agent 循环（ReAct）+ 子代理
│   ├── llm_client.py           # LLM API（流式 + Tool Calling + 思考模式；厂商档案：12 家内置 + 自定义兼容站）
│   ├── workspace.py            # 工作区上下文（Git 感知）
│   ├── tools.py                # 18 个结构化工具 + AgentTool + CancellationToken
│   ├── context_manager.py      # 上下文管理（发送前缩减、自动 / 手动压缩）
│   ├── instruction.py          # 指令文件加载（全局 / 项目级 CODENECT.md）
│   ├── skills.py               # 技能包扫描与加载
│   ├── snapshot.py             # 文件树快照（影子 git 仓库：track / diff / revert / restore）
│   ├── mcp/                    # MCP 支持（config 配置解析 / bridge 事件循环桥接 / manager 状态机与工具注册）
│   ├── single_instance.py      # TUI 单实例锁
│   ├── user_config.py          # 用户目录配置（auth.json + settings.json + tool_display.json + tool_approval.json + mcp_servers.json）
│   └── env_config.py           # 配置加载（auth.json + settings.json，main 与 TUI 共用）
│
├── modules/                    # 功能模块
│   ├── token_tracker.py        # Token 统计 + 费用计算
│   ├── session_store.py        # 会话持久化（保存 / 加载 / 列表）
│   ├── todo_manager.py         # 任务清单状态管理（单例 + 监听器）
│   └── debug_log.py            # 调试日志
│
├── scripts/dev/                # 开发辅助（stream_sim.py：TUI 无头回归 15 场景；mcp_smoke.py：MCP 冒烟五组；
│                               #   provider_check.py：厂商档案验证，均零 API 花费）
├── scripts/build/              # 打包分发（build.ps1 一键出包：exe + zip 绿色版 + Inno Setup 安装包；
│                               #   pkg_linux.sh 出 Linux x64 二进制绿色版 tar.gz；
│                               #   build_linux.sh 出 Linux/macOS 源码包 tar.gz；版本号单一来源 core/version.py）
├── prompts/                    # Prompt 模板（system.md 可独立修改）
├── logs/
│   └── shell_outputs/          # 转后台命令的输出文件（保留 7 天；debug.log 等见 ~/.codenect/logs/）
└── output/                     # 历史残留（流水线已移除，目录已 gitignore，不再产生新文件）
```

## Agent 架构

六组件 + 事件驱动设计：

1. **工作区上下文** — Git 分支 / 状态 / 提交历史 / 项目结构
2. **System Prompt** — `prompts/system.md` 独立文件，改提示词无需改代码
3. **结构化工具** — 内置 18 个 AgentTool（OpenAI 兼容，路径沙箱安全校验，结构化输出标记成败）+ 可选 MCP 外部工具（`core/mcp/` 桥接，扁平命名动态注册）
4. **Agent 循环** — ReAct 模式，`AgentConfig` 封装回调参数，支持取消令牌
5. **流式渲染** — worker 只投递事件（FIFO 队列为唯一跨线程通道），主线程定时 drain 批量刷新（tui/streaming.py），Markdown 增量追加
6. **会话持久化** — JSON 格式完整对话，可随时保存和恢复

## Agent 核心链路

```text
_agent_loop (core/agent.py)        ReAct 循环：LLM → tool_calls → 执行 → 结果喂回 → 直到纯文本回复
  ├─ call_llm (core/llm_client.py) OpenAI 兼容 /chat/completions（requests 直连，无 SDK）
  └─ AgentTool (core/tools.py)     内置 18 个工具 + MCP 外部工具动态注册
```

<ImagePlaceholder desc="Agent 循环流程图：LLM 调用 → 工具调用 → 执行 → 结果回填 → 循环，直到纯文本回复" />

## 关键设计

- **错误按返回值传递**：`call_llm()` 失败不抛异常，返回 `{"error": ..., "content": 提示文本}`
- **配置动态读取**：每次调用读环境变量，`/model` `/provider` 即时生效
- **路径沙箱**：文件类工具禁止逃逸 workspace_root
- **审批钩子**：`AgentConfig.before_tool_call` 返回 False 时工具调用被拒、回填占位结果继续循环
- **取消机制**：`CancellationToken` 由 `/cancel` 或 `Ctrl+C` 置位，Agent 循环每轮开头检查
