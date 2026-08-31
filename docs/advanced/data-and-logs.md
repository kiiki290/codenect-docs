# 数据与日志

CodeNect 的运行期数据全部存放在用户目录与工作区内，本页说明各数据的位置、内容与用途。

## 数据位置总览

| 数据 | 位置 | 说明 |
| --- | --- | --- |
| 会话存档 | `~/.codenect/sessions/<工作区>/<id>.json` | 完整对话，含工具调用和思考内容 |
| Token 流水 | `~/.codenect/logs/token_usage.csv` | 每次 API 调用明细（一行一条） |
| 调试日志 | `~/.codenect/logs/debug.log` | Agent 循环、API 请求 / 响应、错误 |
| 超限工具输出 | `<工作区>/tool-output/` | 超上限的工具输出全文落盘，7 天自动清理 |
| 转后台命令输出 | `logs/shell_outputs/`（项目内） | 转后台命令的输出文件，保留 7 天 |

## 反馈问题时的收集清单

测试人员反馈问题时，建议收集：

1. 启动横幅里的版本号（`CodeNect v0.x.x`）
2. `~/.codenect/logs/debug.log`（崩溃前最后一段；可能含对话内容，注意脱敏）
3. `~/.codenect/sessions/<工作区>/` 下最近会话 json（复现上下文）
4. `token_usage.csv` 尾部（确认调用了哪些模型）
5. 复现步骤 + 截图 / 文字描述
