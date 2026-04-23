# Workflow

## Goal

Stabilize one dedicated ChatGPT browser profile so later automation runs against the same local session.

## Minimal path

1. Start the dedicated browser window.
2. Log into ChatGPT once inside that dedicated window.
3. Run the probe script to confirm the session is reusable.
4. Run the generation script to create a simple UI image and save it locally.

## Why use a dedicated profile

- A temporary profile loses the session every time.
- A normal daily-use Chrome window is harder to control reliably through CDP.
- A dedicated profile is easier to document, troubleshoot, and share.

## Success criteria

- `loggedIn: true`: continue to prompt submission and image extraction.
- `loggedIn: false`: log in again inside the dedicated browser window.

## Tested flow

1. Open `chatgpt.com` with a dedicated Chrome `user-data-dir`.
2. Verify the page is logged in and has a writable composer.
3. Send a direct image prompt such as `Create an image: ...`.
4. Wait until the page enters the image generation state.
5. Read the authenticated image URL from the DOM.
6. Fetch the image bytes inside page context and write them to a local file.
