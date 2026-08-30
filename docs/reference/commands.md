# 命令速查

本页是 CLI 命令、TUI 斜杠命令与快捷键的总表。各功能的详细说明见[使用指南](/guide/getting-started)。

## CLI 命令

| 命令 | 说明 |
| --- | --- |
| `start.bat` | Windows 一键启动（自动建 venv、装依赖并进 TUI） |
| `./start.sh` | Linux / macOS 一键启动（同上；venv 损坏自动重建） |
| `./CodeNect/CodeNect` | Linux x86_64 二进制绿色版直接运行（解压即用，无需 Python；glibc ≥ 2.38） |
| `python main.py` | 启动 TUI（默认） |
| `python main.py -C <目录>` | 指定工作区启动 |
| `python main.py tui [-C <目录>]` | 启动 TUI（默认命令，等价 `python main.py`） |
| `python main.py key` | 查看 Key 配置 |
| `python main.py key set` | 交互设置 Key |
| `python main.py key reset` | 清除 Key |
| `python main.py report` | Token 用量统计 |
| `python main.py workspace [-C <目录>]` | 工作区信息 |

## 斜杠命令：对话

| 命令 | 说明 |
| --- | --- |
| `/help` | 显示完整帮助（分类排版） |
| `/new` | 创建新会话（保存当前，开始新的） |
| `/clear` | 重置当前对话上下文 |
| `/cls` | 清空屏幕显示（不删对话历史） |
| `/compact [补充指示]` | 压缩上下文为结构化摘要（详见[上下文管理](/guide/context)） |
| `/cancel` | 中断当前 Agent 运行 |
| `/plan` | 进入 Plan Mode（只读规划；方案写入 `<工作区>/.codenect/plans/plan.md`） |
| `/build` | 退出 Plan Mode，开始实施（方案文件存在时自动注入「按方案实施」提示） |
| `/mcp [list\|refresh\|connect\|disconnect [name]]` | MCP 服务器状态 / 管理（详见 [MCP 扩展](/guide/mcp)） |
| `/exit` | 退出程序 |

## 斜杠命令：工作区

| 命令 | 说明 |
| --- | --- |
| `/cd <路径>` | 切换工作目录（自动保存当前会话并开启新会话） |
| `/pwd` | 显示当前工作目录 |

## 斜杠命令：提供商与模型

| 命令 | 说明 |
| --- | --- |
| `/provider` | 查看当前提供商和模型 |
| `/provider <厂商名>` | 切换提供商（12 家内置，详见[提供商与模型](/guide/providers)） |
| `/provider custom <base_url> [模型]` | 接入任意 OpenAI 兼容站 |
| `/model` | 查看当前模型与厂商模型列表 |
| `/model <模型名>` | 切换模型 |
| `/think` / `/think on` / `/think off` | 查看 / 开启 / 关闭思考模式 |
| `/noapproval` / `/noapproval on` / `/noapproval off` | 查看 / 开启 / 关闭无审批模式（详见[内置工具与审批](/guide/tools)） |
| `/effort <v>` | 推理强度：low / medium / high / xhigh / max |
| `/temp <v>` | 温度 0.0 - 2.0 |
| `/tokens <v>` | 最大输出 Token（256 - 384000） |
| `/stream on\|off` | 流式输出开关 |
| `/submodel <模型名>\|off` | 子代理专用模型（off = 继承主模型） |

## 斜杠命令：Key 与搜索

| 命令 | 说明 |
| --- | --- |
| `/key` | 查看已配置的 Key（脱敏显示） |
| `/key set` | 交互设置 Key（支持 12 家厂商 + 自定义站 + Tavily 搜索） |
| `/key reset` | 清除所有 Key（删除 auth.json） |
| `/search` | 查看当前搜索提供商 |
| `/search auto` | 免费匿名：Parallel 优先，失败降级 Exa（默认） |
| `/search parallel` | 仅 Parallel（免费匿名，无需 Key） |
| `/search exa` | 仅 Exa（免费匿名 50 次/天） |
| `/search tavily` | 使用 Tavily（AI 优化，需 Key） |

## 斜杠命令：Shell 与工具

| 命令 | 说明 |
| --- | --- |
| `/shell` | 查看 run_shell 工具当前使用的解释器 |
| `/shell auto` | 平台默认（Windows = pwsh → powershell → cmd，其他 = sh） |
| `/shell cmd` | Windows cmd（仅 Windows 菜单提供） |
| `/shell powershell` | Windows PowerShell 5.1 |
| `/shell pwsh` | PowerShell 7+ |
| `/shell bash` / `/shell sh` / `/shell zsh` | Unix shell（需在 PATH 中） |
| `/tools` | 查看所有可用工具及中文说明（内置 18 个 + MCP 分组） |

## 斜杠命令：会话

| 命令 | 说明 |
| --- | --- |
| `/save` | 手动保存当前会话 |
| `/sessions` | 列出所有历史会话（含缩略路径和标题） |
| `/resume` | 恢复本工作目录的历史会话 |
| `/load <id>` | 加载指定会话（自动切换工作目录） |
| `/init` | 分析代码库并生成项目级 `CODENECT.md` |
| `/session` | 查看当前会话详细信息 |
| `/report` | Token 用量统计（按模型 + 按会话 + 费用） |

## 快捷键

| 操作 | 按键 |
| --- | --- |
| 发送 | `Enter` |
| 换行 | `Ctrl + Enter` / `Ctrl + J` |
| 发送 `/` 文字 | `//` 开头（如 `//help` → 发给 AI） |
| 命令补全 | 输入 `/` 触发下拉 → `↑` `↓` 导航 → `Tab` / `Enter` 填充 → `Esc` 取消 |
| 参数补全 | `/model ` 等完整命令后自动展开参数选项 |
| 历史消息 | `↑` `↓`（光标在首/尾行时，非命令输入状态下） |
| 鼠标 | 滚轮导航补全 / 左键点击选择（拖选超出视口自动滚动） |
| 复制选中 | `Ctrl + C`（有选中文本时优先复制；输入框内选中同样适用） |
| 复制选中（强制） | `Ctrl + Shift + C`（Markdown 消息与代码块按块提取全文） |
| 取消 Agent | `Ctrl + C`（无选中且运行中时取消任务，不退出） |
| 会话回溯 | 双击 `Esc`（轮次选择器 + 代码/对话回滚 + 撤销，详见[会话管理](/guide/sessions)） |
| 退出 | 双击 `Ctrl + C`（无选中时；确认框 `Enter` / `Y` 确认，`Esc` / `N` 取消） |
