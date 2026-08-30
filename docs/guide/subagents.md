# 子代理

`task` 工具让 Agent 把独立子任务拆给子代理执行（完成后返回汇报）；`explore` 派发只读探索子代理用于调研。子代理拥有独立上下文，互不干扰。

## 派发与执行模型

- **异步派发，主代理不等待**：派发即返回占位结果（含子代理会话 id），主代理立刻继续下一轮工作；同一消息的多个 task 同时派发，各自独立线程执行
- **完成后自动注入 + 自动续跑**：子代理汇报自动加入主会话（Agent 空闲时立即注入、运行中排队等空闲），无需轮询；**汇报一到主代理立即自动继续处理**（`AI_PROG_AUTO_RESUME=0` 可关闭）；非 task 工具仍按顺序执行
- `task` 工具显式传 `background=false` 时改走同步等待，最终汇报直接作为工具结果返回

## 会话视图

运行中子代理会在输入框上方出现会话切换栏（`● main ● subagent1 ...`），点击切换；子代理的工具调用只显示在它自己的视图里，主会话只保留 task 派发与最终汇报；**默认停留在 main**（不自动切换），想看在栏里点击；`/new` `/clear` `/load` `/cd` 会清空子代理视图。

<ImagePlaceholder desc="输入框上方的子代理会话切换栏（● main ● subagent1 ...）" />

## 历史与续跑

- 子代理消息历史随会话 `/save` 落盘到独立目录 `~/.codenect/sessions/<工作区>/<会话id>.subs/`（每个子代理一个 JSON 文件），`/load` 后重建子代理视图
- `task_id` 传历史会话 id（如 `subagent1`）可**续跑**——沿用原上下文继续干，不用重新探索（`explore` 同样支持 `task_id` 续跑）
- `task` / `explore` 工具描述每轮动态注入「当前子代理总览」（运行中 + 已完成的会话 id / 标题 / 状态）——Agent 每轮直接可见，无需靠对话记忆；描述强制「同主题必须传 `task_id` 续跑」，创建新子代理时若检测到已有相似主题会话会提示复用（阈值 0.3，不强制）；传运行中的 id 返回「仍在运行中，等待结果」提示

## 限制

- 工具集受限：无 `task` / `ask_user` / `plan_enter` / `todowrite`（不反问用户、不动父任务清单）
- **explore 只读探索子代理**：工具集硬限制为只读集（`list_files` / `read_file` / `search` / `glob` / `web_search` / `webfetch` / `get_context_remaining` / `current_time`），不修改文件不执行命令；适合规划阶段并行调研，主上下文只收结论
- 嵌套深度默认 1 层（子代理不能再派子代理），`AI_PROG_MAX_SUBAGENT_DEPTH` 可调，`0` = 禁用
- 子代理轮数上限 `AI_PROG_MAX_SUBAGENT_ROUNDS`（默认 0 = 不限；跑飞时由自动压缩 / doom loop / 取消兜底）

## 模型与审批

- **子代理模型可独立设置**：`AI_PROG_SUBAGENT_MODEL` / `AI_PROG_SUBAGENT_PROVIDER`（TUI 里 `/model sub <模型>|off`），留空继承主配置
- 并行子代理的危险工具审批会**排队串行**进行（审批槽单槽），Token 记账带线程锁不冲突
- 子代理自动继承 MCP 工具
