#!/usr/bin/env node

const { chromium } = require("playwright");

const cdpPort = process.env.CHATGPT_IMAGES_BROWSER_CDP_PORT || "9031";
const cdpUrl = `http://127.0.0.1:${cdpPort}`;

async function main() {
  const browser = await chromium.connectOverCDP(cdpUrl);
  try {
    const context = browser.contexts()[0];
    if (!context) {
      throw new Error("No browser context found on the CDP endpoint");
    }

    const page =
      context.pages().find((candidate) => candidate.url().includes("chatgpt.com")) ||
      context.pages()[0];
    if (!page) {
      throw new Error("No ChatGPT page found in the current CDP session");
    }

    await page.waitForLoadState("domcontentloaded", { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);

    const result = await page.evaluate(() => {
      const text = document.body ? document.body.innerText : "";
      const hasLoginPrompt =
        text.includes("Log in to continue your chat history") ||
        text.includes("Log in to get") ||
        text.includes("Sign up") ||
        text.includes("Log in");
      const composer = !!document.querySelector('textarea, [contenteditable="true"]');

      return {
        href: location.href,
        title: document.title,
        loggedIn: !hasLoginPrompt,
        hasComposer: composer,
        previewText: text.slice(0, 800),
      };
    });

    console.log(JSON.stringify(result, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(
    JSON.stringify(
      {
        ok: false,
        cdpUrl,
        error: error && error.message ? error.message : String(error),
      },
      null,
      2,
    ),
  );
  process.exitCode = 1;
});
