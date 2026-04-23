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

## How To Ask The AI To Use This Skill

You can ask your coding agent in plain language. Good requests include the goal, subject, style, output path, and whether the asset needs transparent background.

Examples:

```text
Use this ChatGPT image skill to generate 5 mobile game UI icons: gold coin, blue crystal, upgrade arrow, locked chest, and battle pass ticket. Save them under .codex-artifacts/ui-icons/.
```

```text
Use this skill to generate a polished fantasy RPG shop illustration, suitable for a mobile game loading screen. Make it colorful, detailed, and 16:9.
```

```text
Generate a tower defense cannon icon with transparent background, centered composition, readable silhouette, 1024x1024. Save it as .codex-artifacts/cannon-icon.png.
```

## 怎么让 AI 使用这个 skill

你可以直接用自然语言告诉 Codex 或其他 Agent：要生成什么、什么风格、保存到哪里、是否需要透明背景。

示例：

```text
使用这个 ChatGPT image skill，帮我生成 5 个手游 UI 图标：金币、蓝色水晶、升级箭头、上锁宝箱、战令票券。保存到 .codex-artifacts/ui-icons/。
```

```text
用这个 skill 生成一张精致的幻想 RPG 商店插图，适合手游加载页，画面要彩色、细节丰富、16:9。
```

```text
生成一个塔防游戏炮塔图标，透明背景，主体居中，轮廓清晰，1024x1024，保存为 .codex-artifacts/cannon-icon.png。
```

## Game Asset Workflows

### UI icons

Use ChatGPT to generate polished source images, then use local tools to crop, resize, compress, and pack them into your game atlas.

Suggested flow:

1. Generate large images at 1024x1024.
2. Keep the subject centered and ask for a transparent background.
3. Use local tools such as Photoshop, Figma, Aseprite, ImageMagick, or TexturePacker for exact cropping and atlas packing.
4. Import the final PNGs into your engine.

Prompt example:

```text
Create an image: a high-quality mobile game skill icon, fire meteor spell, transparent background, centered composition, bold silhouette, fantasy UI style, 1024x1024.
```

### Illustrations and marketing images

Use ChatGPT for polished illustrations, loading screens, event banners, and concept art. These usually benefit from richer descriptions than icons.

Prompt example:

```text
Create an image: a polished tower defense game loading screen, heroic defenders on a castle wall, monsters approaching from a glowing forest, cinematic lighting, colorful mobile game illustration, 16:9.
```

### Concept exploration

Ask for several variants first, then pick the best direction and refine it in follow-up prompts.

Prompt example:

```text
Create an image: three visual concepts for a sci-fi energy tower in a mobile tower defense game, each with a different silhouette and color theme, clean concept art sheet.
```

## 游戏素材工作流

### UI 图标

可以先让 ChatGPT 生成较精致的大图，再用本地工具做精确裁切、缩放、压缩和图集打包。

建议流程：

1. 先生成 `1024x1024` 大图。
2. 要求主体居中，并明确说明需要透明背景。
3. 用 Photoshop、Figma、Aseprite、ImageMagick 或 TexturePacker 做精确裁切和图集整理。
4. 最后把 PNG 导入游戏引擎。

Prompt 示例：

```text
Create an image: a high-quality mobile game skill icon, fire meteor spell, transparent background, centered composition, bold silhouette, fantasy UI style, 1024x1024.
```

### 插图和宣传图

可以用它生成加载图、活动图、剧情插图、概念图。这类图通常比图标更需要描述氛围、角色、场景和构图。

Prompt 示例：

```text
Create an image: a polished tower defense game loading screen, heroic defenders on a castle wall, monsters approaching from a glowing forest, cinematic lighting, colorful mobile game illustration, 16:9.
```

### 早期概念探索

先让 ChatGPT 出多个方向，再选一个方向继续细化，适合角色、怪物、炮塔、场景风格探索。

Prompt 示例：

```text
Create an image: three visual concepts for a sci-fi energy tower in a mobile tower defense game, each with a different silhouette and color theme, clean concept art sheet.
```

## Practical Tips

- Start prompts with `Create an image:` for this V1 flow.
- Be specific about subject, style, background, aspect ratio, and output use.
- Ask for transparent background for icons and UI assets.
- For production game assets, treat generated images as source art, then finish them with local cropping and asset-pipeline tools.
- Generate one image first when testing the chain; batch workflows can be added later.

## 实用建议

- 这个 V1 流程建议用 `Create an image:` 开头。
- 尽量说清楚主体、风格、背景、比例和用途。
- UI 图标和游戏素材建议明确要求透明背景。
- 真正进项目时，把生成图当作源素材，再用本地工具做精切和规范化。
- 初次验证链路时先生成一张图，批量流程可以后续再扩展。

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
