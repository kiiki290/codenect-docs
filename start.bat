@echo off
chcp 65001 >nul
cd /d "%~dp0"
title CodeNect Docs

rem 首次运行自动安装依赖
if not exist "node_modules" (
    echo [1/2] 首次运行，正在安装依赖...
    call npm install
    if errorlevel 1 (
        echo [!] 依赖安装失败，请检查网络后重试。
        pause
        exit /b 1
    )
)

echo [2/2] 正在启动开发服务器，浏览器将在几秒后自动打开...
rem 延迟 3 秒等服务器就绪后打开浏览器（隐藏窗口，无闪烁）
start "" pwsh -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 3; Start-Process 'http://localhost:5173'"
call npm run docs:dev

echo.
echo 开发服务器已停止，按任意键关闭窗口。
pause >nul
