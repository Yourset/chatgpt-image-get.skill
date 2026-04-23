#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const repoRoot = path.resolve(__dirname, "..");
const cdpPort = process.env.CHATGPT_IMAGES_BROWSER_CDP_PORT || "9031";
const cdpUrl = `http://127.0.0.1:${cdpPort}`;
const defaultPrompt =
  "Create an image: a simple mobile game UI icon, blue crystal button, flat style, transparent background, centered composition, 1024x1024.";
const defaultOut = path.join(repoRoot, ".codex-artifacts", "chatgpt-images-output.png");

function getArg(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1 || index + 1 >= process.argv.length) {
    return fallback;
  }
  return process.argv[index + 1];
}

async function findChatPage(context) {
  const existing = context.pages().find((page) => page.url().includes("chatgpt.com"));
  if (existing) {
    return existing;
  }

  const page = await context.newPage();
  await page.goto("https://chatgpt.com/", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  return page;
}

async function sendPrompt(page, prompt) {
  await page.goto("https://chatgpt.com/", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  }).catch(() => {});
  await page.waitForTimeout(2000);

  const input = page.locator('[contenteditable="true"][role="textbox"]').first();
  await input.waitFor({ state: "visible", timeout: 30000 });
  await input.click();
  await page.keyboard.press(process.platform === "darwin" ? "Meta+A" : "Control+A").catch(() => {});
  await page.keyboard.press("Backspace").catch(() => {});
  await page.keyboard.type(prompt, { delay: 8 });
  await page.keyboard.press("Enter");
}

async function waitForGeneratedImage(page) {
  for (let attempt = 0; attempt < 24; attempt += 1) {
    await page.waitForTimeout(5000);
    const result = await page.evaluate(() => {
      const text = document.body ? document.body.innerText : "";
      const images = Array.from(document.querySelectorAll("img"))
        .map((img) => ({
          src: img.src || "",
          alt: img.alt || "",
        }))
        .filter((img) => img.src && !img.src.includes("auth0.com"));

      return {
        creating:
          text.toLowerCase().includes("creating image") ||
          text.toLowerCase().includes("creating images"),
        images,
      };
    });

    if (result.images.length > 0) {
      return result.images[result.images.length - 1].src;
    }
  }

  throw new Error("Timed out while waiting for image generation");
}

async function saveImageFromPage(page, src, outFile) {
  const dataUrl = await page.evaluate(async (imageSrc) => {
    const response = await fetch(imageSrc, { credentials: "include" });
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }, src);

  const base64 = String(dataUrl).split(",")[1];
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, Buffer.from(base64, "base64"));
}

async function main() {
  const prompt = getArg("--prompt", defaultPrompt);
  const outFile = path.resolve(getArg("--out", defaultOut));

  const browser = await chromium.connectOverCDP(cdpUrl);
  try {
    const context = browser.contexts()[0];
    if (!context) {
      throw new Error("No browser context found on the CDP endpoint");
    }

    const page = await findChatPage(context);
    await sendPrompt(page, prompt);
    const imageSrc = await waitForGeneratedImage(page);
    await saveImageFromPage(page, imageSrc, outFile);

    console.log(
      JSON.stringify(
        {
          ok: true,
          outFile,
          prompt,
          imageSrc,
        },
        null,
        2,
      ),
    );
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
