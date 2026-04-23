---
name: chatgpt-images-browser-v1
description: Reuse a dedicated local ChatGPT browser profile and automate image generation through Chrome plus CDP without using the OpenAI API. Use when you need a low-cost browser automation path for ChatGPT Images, want to keep an existing ChatGPT or ChatGPT Pro session, and need to validate the chain of opening ChatGPT, sending an image prompt, waiting for generation, and saving the resulting image locally.
---

# ChatGPT Images Browser V1

Use this skill to drive ChatGPT image generation through a dedicated local Chrome profile.

Core goals:

1. Reuse one stable local ChatGPT login session.
2. Verify whether the current browser profile is already logged in.
3. Send a simple image prompt and save the generated image to a local file.

## Files

- Launch browser: `scripts/start-chatgpt-images-browser.ps1`
- Probe login state: `scripts/probe-chatgpt-session.js`
- Generate one image: `scripts/generate-ui-image.js`
- Workflow details: `references/workflow.md`
- Notes and limitations: `references/notes.md`

## Workflow

### 1. Start the dedicated browser

Run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\start-chatgpt-images-browser.ps1
```

This script:

- creates or reuses a dedicated Chrome profile under `.local/`
- opens `https://chatgpt.com/`
- exposes a CDP port for Playwright reuse

Supported environment variables:

- `CHATGPT_IMAGES_BROWSER_ROOT`
- `CHATGPT_IMAGES_BROWSER_PROFILE_DIR`
- `CHATGPT_IMAGES_BROWSER_CDP_PORT`
- `CHATGPT_IMAGES_BROWSER_URL`
- `CHATGPT_IMAGES_BROWSER_CHROME`

### 2. Log in once inside that dedicated window

If the profile has never been used before, log into ChatGPT manually in the browser window opened by the launch script.

Do not log in through a different Chrome window and expect the session to appear here. The skill only reuses the dedicated profile directory.

### 3. Probe the session

Run:

```powershell
node .\scripts\probe-chatgpt-session.js
```

If `loggedIn` is `false`, log in again inside the dedicated browser window and rerun the probe.

### 4. Generate one image

Run:

```powershell
node .\scripts\generate-ui-image.js --prompt "Create an image: a simple mobile game UI icon, blue crystal button, flat style, transparent background, centered composition, 1024x1024." --out .\.codex-artifacts\chatgpt-images-output.png
```

This script:

- attaches to the existing Chrome session through CDP
- reuses the current ChatGPT login state
- sends one explicit image prompt
- waits for an image to appear
- fetches the authenticated image bytes inside page context
- writes the image to the output path

## Limits

- This is browser automation, not an official API integration.
- ChatGPT UI changes can break selectors or flow timing.
- Session expiry or additional security checks can require manual relogin.
- V1 is best for simple image generation validation, not unattended bulk production.

## Open-source boundary

- Never commit `.local/`, browser profiles, cookies, or generated artifacts.
- Keep local paths configurable through environment variables.
- Treat the generated image links as authenticated and short-lived.
