/**
 * Скриншоты для визуальной проверки вёрстки.
 * Запуск: node scripts/shots.mjs [baseUrl] [outDir]
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const BASE = process.argv[2] ?? "http://localhost:3020";
const OUT = process.argv[3] ?? path.join(process.cwd(), ".shots");
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const pages = [
  { url: "/", name: "home" },
  { url: "/cars", name: "cars" },
  { url: "/cars/haval-jolion", name: "car-detail" },
  { url: "/how", name: "how" },
  { url: "/contacts", name: "contacts" },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: CHROME });

for (const viewport of [
  { width: 1440, height: 900, tag: "desktop" },
  { width: 390, height: 844, tag: "mobile" },
]) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(String(error)));

  for (const target of pages) {
    await page.goto(BASE + target.url, { waitUntil: "networkidle" });
    // Прокручиваем до конца, чтобы отработали whileInView-анимации
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 90));
      }
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 400));
    });

    // fullPage-снимок пересобирает страницу целиком, и scroll-reveal успевает
    // «сброситься» в opacity 0. Для снимка фиксируем финальное состояние.
    await page.addStyleTag({
      content: "*{opacity:1 !important;transform:none !important}",
    });

    await page.screenshot({
      path: path.join(OUT, `${target.name}-${viewport.tag}.png`),
      fullPage: true,
    });
    console.log(`✓ ${target.name}-${viewport.tag}`);
  }

  if (errors.length) {
    console.log(`⚠ console errors (${viewport.tag}):`);
    for (const error of new Set(errors)) console.log("   ", error);
  }

  await context.close();
}

await browser.close();
