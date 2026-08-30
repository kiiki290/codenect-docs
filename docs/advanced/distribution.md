# 打包与分发

CodeNect 提供 Windows 安装包 / 绿色版、Linux 二进制绿色版与 Linux / macOS 源码包四种分发形态（下载与安装见[快速开始](/guide/getting-started)）。

## 产物矩阵

| 产物 | 平台 | 说明 |
| --- | --- | --- |
| `CodeNect-v<版本>-setup.exe` | Windows x64 | Inno Setup 安装包，默认装到用户目录（无需管理员），可注册 `codenect` 命令（加入用户 PATH，新开终端生效） |
| `CodeNect-v<版本>-win64.zip` | Windows x64 | 绿色版，解压双击 `CodeNect.exe`，无需安装 |
| `CodeNect-v<版本>-linux-x64.tar.gz` | Linux x86_64 | 二进制绿色版，解压即用，无需 Python；要求 glibc ≥ 2.38（Ubuntu 24.04 及更新发行版） |
| `CodeNect-v<版本>-src.tar.gz` | Linux / macOS | 源码包，解压后 `./start.sh` 一键启动，需 Python 3.10+ |

所有形态的用户数据（配置 / 会话 / 日志）统一保存在 `~/.codenect/`，升级覆盖安装不影响已有数据。

## 构建脚本

| 脚本 | 产物 | 要求 |
| --- | --- | --- |
| `pwsh scripts/build/build.ps1` | Windows：exe + zip 绿色版 + Inno Setup 安装包 | venv 装 pyinstaller 与 Inno Setup |
| `bash scripts/build/pkg_linux.sh` | Linux 二进制绿色版 tar.gz | Linux x86_64 上运行；glibc 下限 = 打包机 |
| `bash scripts/build/build_linux.sh` | Linux / macOS 源码包 tar.gz | git archive 出包，执行位按 HEAD 校验（可在 Windows git bash 上验证） |

- 版本号单一来源：`core/version.py`
- Windows 打包版随包内置 ripgrep（rg.exe 与 LICENSE）；无对应平台二进制时回退系统 PATH 中的 rg
- 源码包打包时校验 start.sh 与 bin/ 下 rg 二进制的执行位
- 安装包 / 绿色版 / 二进制版均无需用户安装 Python；源码包要求 Python 3.10+
