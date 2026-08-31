# 技能包与指令文件

除了内置工具，CodeNect 还支持两种自定义扩展方式：技能包（Agent 按需加载的指令）与指令文件（每轮自动注入的指令）。

## 技能包

技能包 = 一个目录 + `SKILL.md`（可带 `---` 包裹的简易 frontmatter：`name` / `description`，缺省时技能名回退目录名、描述回退正文首行）。可用技能列表启动时注入 Agent 提示词，任务匹配时 Agent 会用 `skill` 工具加载指令正文。

```text
<技能目录>/
  SKILL.md        指令正文（必须）
  scripts/ ...    附带资源（可选，加载时列出文件清单）
```

- 全局：`~/.codenect/skills/<技能名>/SKILL.md`（跨项目共享，首启自动创建目录与说明）
- 项目级：`<工作区>/skills/<技能名>/SKILL.md`（同名覆盖全局）
- 新建技能后需重启会话才会出现在可用列表里

![一个技能包目录的示例结构（SKILL.md + scripts/）](../images/skill目录.png)

## CODENECT.md 指令文件

两级指令文件在 Agent 每次对话时自动加载并注入到 system prompt 中：

| 级别 | 路径 | 说明 |
| --- | --- | --- |
| 全局 | `~/.codenect/CODENECT.md` | 跨项目共享，首次启动自动创建空文件 |
| 项目 | `{workspace}/CODENECT.md` | 项目专属，通过 `/init` 命令由 Agent 分析代码库生成 |

- 修改 CODENECT.md 后用 `/new` 开新会话即可生效
- `/init` 如果发现 CODENECT.md 已存在，会在原基础上改进而非覆盖
