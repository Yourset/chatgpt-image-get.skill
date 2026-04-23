# ChatGPT Image Get Skill

Browser-based Codex skill for generating images with a logged-in ChatGPT web session, without using the OpenAI API.

这个仓库提供一个 Codex skill：通过本地 Chrome 持久化 profile 复用你的 ChatGPT 登录态，用浏览器自动化生成图片，不走 OpenAI API。

## What It Does

- Opens ChatGPT in a dedicated Chrome profile.
- Reuses your existing ChatGPT or ChatGPT Pro web session.
- Sends an image prompt through the ChatGPT web UI.
- Waits for the generated image and saves it locally.

## 它能做什么

- 用专用 Chrome profile 打开 ChatGPT。
- 复用你已有的 ChatGPT / ChatGPT Pro 网页登录态。
- 自动把图片 prompt 发到 ChatGPT。
- 等待生成完成，并把图片保存到本地。

## Recommended Install: Ask AI To Install

The recommended path is to ask Codex or another coding agent:

```text
Install the Codex skill from git@github.com:Yourset/chatgpt-image-get.skill.git, then read SKILL.md and set up the local dependencies.
```

If your agent supports skill installation, prefer letting it clone the repository into your local skills directory and run the setup steps.

## 推荐安装方式：让 AI 安装

推荐直接让 Codex 或其他编程 Agent 帮你安装：

```text
从 git@github.com:Yourset/chatgpt-image-get.skill.git 安装这个 Codex skill，读取 SKILL.md，并配置本地依赖。
```

如果你的 Agent 支持安装 skill，让它自动 clone 到本地 skills 目录并执行依赖安装即可。

## Manual Setup

```powershell
git clone git@github.com:Yourset/chatgpt-image-get.skill.git
cd chatgpt-image-get.skill
npm install
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\start-chatgpt-images-browser.ps1
```

Then log into ChatGPT manually in the opened dedicated browser window.

Verify the session:

```powershell
node .\scripts\probe-chatgpt-session.js
```

Generate one image:

```powershell
node .\scripts\generate-ui-image.js --prompt "Create an image: a simple mobile game UI icon, blue crystal button, flat style, transparent background, centered composition, 1024x1024." --out .\.codex-artifacts\chatgpt-images-output.png
```

## 手动安装

```powershell
git clone git@github.com:Yourset/chatgpt-image-get.skill.git
cd chatgpt-image-get.skill
npm install
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\start-chatgpt-images-browser.ps1
```

然后在打开的专用浏览器窗口里手动登录 ChatGPT。

检查登录态：

```powershell
node .\scripts\probe-chatgpt-session.js
```

生成一张图片：

```powershell
node .\scripts\generate-ui-image.js --prompt "Create an image: a simple mobile game UI icon, blue crystal button, flat style, transparent background, centered composition, 1024x1024." --out .\.codex-artifacts\chatgpt-images-output.png
```

## Configuration

- `CHATGPT_IMAGES_BROWSER_ROOT`: repository/runtime root.
- `CHATGPT_IMAGES_BROWSER_PROFILE_DIR`: local persistent profile directory.
- `CHATGPT_IMAGES_BROWSER_CDP_PORT`: Chrome remote debugging port, default `9031`.
- `CHATGPT_IMAGES_BROWSER_URL`: target URL, default `https://chatgpt.com/`.
- `CHATGPT_IMAGES_BROWSER_CHROME`: explicit Chrome executable path.

## 配置项

- `CHATGPT_IMAGES_BROWSER_ROOT`：仓库或运行根目录。
- `CHATGPT_IMAGES_BROWSER_PROFILE_DIR`：本地持久化 profile 目录。
- `CHATGPT_IMAGES_BROWSER_CDP_PORT`：Chrome 远程调试端口，默认 `9031`。
- `CHATGPT_IMAGES_BROWSER_URL`：目标 URL，默认 `https://chatgpt.com/`。
- `CHATGPT_IMAGES_BROWSER_CHROME`：指定 Chrome 可执行文件路径。

## Important Notes

- This is browser automation, not an official OpenAI API integration.
- It may break when ChatGPT changes its frontend.
- Do not commit `.local/`, cookies, browser profiles, or generated artifacts.
- Use the API instead if you need reliable, unattended, large-scale production.

## 注意事项

- 这是浏览器自动化，不是 OpenAI 官方 API 集成。
- ChatGPT 前端改版后，脚本可能需要维护。
- 不要提交 `.local/`、cookie、浏览器 profile 或生成图片。
- 如果你需要稳定的大规模无人值守生产，应该改用 API。
