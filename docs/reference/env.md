# 环境变量

配置加载优先级：**系统环境变量 > auth.json > settings.json**（后两者位于 `~/.codenect/`，见[配置文件](/reference/files)）。TUI 内的 `/provider` `/model` `/think` 等命令自动回写 settings.json / auth.json，即时生效。

> 命名约定：`AI_PROG_*` 为行为调优，`LLM_*` 与 `*_API_KEY` 为提供商配置。

## 提供商 Key 与连接

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `DEEPSEEK_API_KEY` | DeepSeek API Key | - |
| `ANTHROPIC_API_KEY` | Claude API Key | - |
| `OPENAI_API_KEY` | OpenAI API Key | - |
| `MOONSHOT_API_KEY` | Kimi API Key | - |
| `ZHIPU_API_KEY` | 智谱 GLM API Key（国际站 Z.AI） | - |
| `ZHIPU_CN_API_KEY` | 智谱 GLM API Key（国内站 BigModel） | - |
| `MIMO_API_KEY` | 小米 MiMo API Key | - |
| `DASHSCOPE_API_KEY` | 阿里百炼 API Key | - |
| `MINIMAX_API_KEY` | MiniMax API Key | - |
| `ARK_API_KEY` | 火山方舟 API Key | - |
| `OPENROUTER_API_KEY` | OpenRouter API Key | - |
| `TAVILY_API_KEY` | Tavily 搜索 Key | - |
| `LLM_API_KEY` | 通用 Key（优先级最高；自定义站默认使用，未配置时复用任一厂商 Key） | - |
| `LLM_API_BASE` | API 地址（自定义站必填） | 按 `LLM_PROVIDER` 取厂商默认 |
| `LLM_MODEL` | 模型名 | 按 `LLM_PROVIDER` 取厂商默认 |
| `LLM_PROVIDER` | 提供商：`deepseek` / `claude` / `openai` / `moonshot` / `zhipu` / `zhipu-cn` / `dashscope` / `minimax` / `ark` / `mimo` / `openrouter` / `ollama` / `custom`（不在表内的值一律按自定义兼容站处理，配合 `LLM_API_BASE` / `LLM_MODEL` 使用） | `deepseek` |

## 行为调优（AI_PROG_*）

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `AI_PROG_SEARCH_PROVIDER` | 搜索：`auto` / `parallel` / `exa` / `tavily` | `auto` |
| `AI_PROG_SHELL` | run_shell 解释器：`auto` / `cmd` / `powershell` / `pwsh` / `bash` / `sh` / `zsh`（auto = Windows 优先 pwsh，缺失依次回退 powershell、cmd，其他平台 = sh；cmd 仅 Windows 有效，其他平台归一为 sh） | `auto` |
| `AI_PROG_SHELL_TIMEOUT` | run_shell checkpoint 秒数（不传 timeout 时：该时长内未结束自动转后台交还控制权，永不自动杀；显式传 timeout 仍为到点必杀 1~600） | `120` |
| `AI_PROG_THINKING` | 思考模式 `1` = 开启 | - |
| `AI_PROG_THINKING_TYPE` | 思考模式类型 | `enabled` |
| `AI_PROG_REASONING_EFFORT` | 推理强度 | `high` |
| `AI_PROG_TEMPERATURE` | 采样温度 | `0.3` |
| `AI_PROG_MAX_TOKENS` | 最大输出 Token | `32000` |
| `AI_PROG_STREAM` | 流式输出 `1` / `0` | `1` |
| `AI_PROG_MAX_TOOL_ROUNDS` | 工具调用安全上限（0 = 不限） | `0` |
| `AI_PROG_SNAPSHOT` | 文件快照（会话回退连带回滚文件，依赖 git；0 = 关闭） | `1` |
| `AI_PROG_MAX_SUBAGENT_DEPTH` | 子代理嵌套层数上限（0 = 禁用 task） | `1` |
| `AI_PROG_MAX_SUBAGENT_ROUNDS` | 子代理工具轮数上限（0 = 不限） | `0` |
| `AI_PROG_AUTO_RESUME` | 子代理汇报到达后自动续跑主代理（0 = 关闭） | `1` |
| `AI_PROG_WELCOME` | 首启欢迎配置向导开关（`0` / `false` / `no` 禁用；只读不持久化） | 开启 |
| `AI_PROG_SUBAGENT_MODEL` | 子代理专用模型（留空继承主模型） | - |
| `AI_PROG_SUBAGENT_PROVIDER` | 子代理专用提供商（留空继承主配置） | - |
| `AI_PROG_CTX_WARN` | 上下文告警阈值 tokens（0 关） | `100000` |
| `AI_PROG_CTX_AUTO_COMPACT` | 自动压缩阈值 tokens（0 关） | `0`（需手动开启） |
| `AI_PROG_CTX_KEEP` | /compact 保留近期原文的 token 预算 | `20000` |
| `AI_PROG_CTX_TIER` | 发送前分级截断与读去重开关 | `1` |
| `AI_PROG_CTX_WINDOW` | 模型上下文窗口大小 tokens | `1000000` |
| `AI_PROG_CTX_USER_KEEP` | 压缩时保留用户原话的 token 预算 | `4000` |
| `AI_PROG_TOOL_OUTPUT_MAX_LINES` | 工具输出最大行数（0 = 不限） | `2000` |
| `AI_PROG_TOOL_OUTPUT_MAX_BYTES` | 工具输出最大字节数（0 = 不限） | `51200` |
| `AI_PROG_DEBUG_LAYOUT` | 调试模式：对话各区块按类型显示不同背景色（定位空行 / 布局问题用，非调试勿开） | 关闭 |
| `AI_PROG_LOG_LEVEL` | 调试日志级别：`DEBUG` / `INFO` / `WARNING` / `ERROR`（低于阈值不落盘；启动环境快照不受影响） | `DEBUG` |
| `AI_PROG_TOOL_DISPLAY` | 工具结果折叠 / 预览配置（一般配置在 `~/.codenect/tool_display.json`，启动时注入；也可直接设系统环境变量为 JSON，优先级更高） | 内置默认 |
| `AI_PROG_TOOL_APPROVAL` | 工具审批覆盖配置：JSON 对象，键 = 工具名（MCP 用扁平名）/ `*` 兜底，值 = true 需审批 / false 免审批（一般配置在 `~/.codenect/tool_approval.json`，启动时注入；也可直接设系统环境变量，优先级更高） | 内置默认（write / patch / run_shell / task 需审批，其余免审批） |
| `AI_PROG_MCP_SERVERS` | MCP 服务器配置 JSON（一般配置在 `~/.codenect/mcp_servers.json`，启动时注入；也可直接设系统环境变量为 JSON，优先级更高） | - |
| `AI_PROG_MCP_DISABLED` | 全局禁用 MCP（`1` / `true` / `yes`） | - |
| `AI_PROG_MCP_CONNECT_TIMEOUT` | 单服务器连接 / 握手超时秒数 | `30` |
| `AI_PROG_NO_APPROVAL` | 无审批模式：跳过全部工具审批（含 tool_approval.json 配置与 plan_enter / ask_user 询问，`1` / `true` / `yes`），TUI 启动显示红色警告 | 关闭 |
| `AI_PROG_IGNORE_DIRS` | 目录 / 文件忽略黑名单：逗号分隔（如 `node_modules,__pycache__`）或 JSON 数组（目录名含逗号时），list_files / search / glob / 树形结构 / 路径沙箱统一过滤；动态读取即时生效 | 空（不忽略任何目录） |
| `AI_PROG_HIDE_DOTFILES` | 隐藏文件过滤开关：`1` / `true` / `yes` 时 list_files / search / glob / 树形结构跳过 `.` 开头条目（如 `.git` / `.env`） | 关闭（全部显示） |
