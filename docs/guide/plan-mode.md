# Plan Mode 规划模式

Plan Mode 将「规划」与「执行」分离：规划阶段 Agent 只读调研并产出方案文件，确认后才切换回执行模式动手实施。

## 切换方式

- **`/plan`** — 进入 Plan Mode。Agent 只能读取文件、搜索代码、派发探索子代理、向用户提问，**严格禁止**文件编辑或命令执行（唯一例外：方案文件 `<工作区>/.codenect/plans/plan.md`，越界写入会被工具层白名单拦截）。状态栏显示 `PLAN` 标记。
- **`/build`** — 退出 Plan Mode，切换回正常模式。Agent 可以编辑文件和执行命令，开始实施方案；若方案文件存在，会自动向对话注入「按方案实施」提示。
- `/new` 创建新会话时自动退出 Plan Mode。

<ImagePlaceholder desc="状态栏上的 PLAN 模式标记" />

## 推荐工作流

1. `/plan`（或 Agent 主动 `plan_enter` 建议）→ 向 Agent 描述需求
2. Agent 阅读代码、派发 `explore` 只读探索子代理并行调研（独立上下文，主上下文只收结论）、向用户确认细节
3. Agent 把完整方案写入方案文件（目标 / 改动清单 / 关键决策 / 实施顺序 / 风险与验证）
4. Agent 调用 `plan_exit` 请求切换：确认后自动进入 Build Mode 按方案实施；拒绝则继续细化方案
5. 用户也可手动 `/build` 切换实施

<ImagePlaceholder desc="Plan Mode 下 Agent 输出方案文件后的 plan_exit 确认框（1 是 / 2 否）" />

## 只读限制细节

- 可见工具 = 只读工具集 + `write_file` / `patch_file`（仅放行 `<工作区>/.codenect/plans/` 下路径），`run_shell` 全拦
- `explore` 派发只读探索子代理：工具集硬限制为只读集（`list_files` / `read_file` / `search` / `glob` / `web_search` / `webfetch` / `get_context_remaining` / `current_time`，不含 `task` / `explore`——天然限制嵌套深度），不修改文件不执行命令
- MCP 工具对模型不可见（外部能力无法判定只读性，规划阶段一律禁用）
- 无审批模式（`AI_PROG_NO_APPROVAL=1`）下：`plan_enter` 自动进入 Plan Mode、`plan_exit` 自动切回 Build Mode，不再询问
