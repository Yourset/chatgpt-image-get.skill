# Notes

## Security and privacy

- Do not commit `.local/` or any browser profile directory.
- Do not ask users to paste account passwords into chat.
- Reuse browser session cookies only through the local dedicated profile.
- Treat generated image URLs as authenticated, short-lived links.

## Expected rough edges

- This is browser automation, not an official API integration.
- DOM structure may change after ChatGPT UI updates.
- Some prompts may trigger clarification instead of immediate image generation.
- V1 is more reliable with explicit English prompts such as `Create an image: ...`.

## Prompt guidance

- Prefer starting with `Create an image:` for V1.
- Keep the subject simple when validating the chain.
- Ask for transparent background explicitly if needed.
- Ask for one image at a time first.

## Troubleshooting

- If `probe-chatgpt-session.js` reports `loggedIn: false`, log in again inside the dedicated browser window.
- If image generation starts but download fails outside the browser, fetch the image from page context rather than plain HTTP requests.
- If the script cannot connect to CDP, check that the browser was started by `start-chatgpt-images-browser.ps1` and that the CDP port is not occupied.

## Open-source guidance

- Keep local path assumptions configurable through environment variables.
- Document the browser profile location, but treat it as user-local state.
- Do not bundle session files or generated artifacts in the public repository.
