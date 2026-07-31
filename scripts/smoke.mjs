/**
 * Сквозная проверка демо перед показом: все страницы открываются, консоль чистая,
 * калькулятор пересчитывает, модалка брони подставляет нужную машину и доходит
 * до экрана «заявка принята», мобильное меню работает.
 *
 * Запуск: node scripts/smoke.mjs [baseUrl]
 */
import { chromium } from "playwright-core";

const BASE = process.argv[2] ?? "http://localhost:3020";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const routes = ["/", "/cars", "/cars/haval-jolion", "/how", "/contacts", "/privacy"];

let failures = 0;

const check = (label, ok, detail = "") => {
  console.log(`${ok ? "✓" : "✗"} ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures += 1;
};

const browser = await chromium.launch({ executablePath: CHROME });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

const noise = [];
// 404 мы дёргаем намеренно ниже — он не должен считаться шумом
const expected404 = "/cars/no-such-car";

page.on("console", (m) => {
  if (m.type() !== "error") return;
  // у сетевых сообщений URL лежит в location, а не в тексте
  const where = m.location()?.url ?? "";
  if (m.text().includes(expected404) || where.includes(expected404)) return;
  noise.push(`${m.text()} ${where}`.trim());
});
page.on("pageerror", (e) => noise.push(String(e)));
page.on("response", (r) => {
  if (r.status() >= 400 && !r.url().includes(expected404)) {
    noise.push(`${r.status()} ${r.url()}`);
  }
});

// 1. Все маршруты отдают 200 и рисуют h1
for (const route of routes) {
  const response = await page.goto(BASE + route, { waitUntil: "networkidle" });
  const heading = await page.locator("h1").first().textContent();
  check(
    `${route}`,
    response?.status() === 200 && Boolean(heading?.trim()),
    `${response?.status()} · «${heading?.trim().slice(0, 40)}»`,
  );
}

// 2. 404 отдаёт статус 404, а не 200
const missing = await page.goto(BASE + expected404, { waitUntil: "networkidle" });
check("несуществующая машина → 404", missing?.status() === 404, String(missing?.status()));

// 3. Калькулятор пересчитывает при смене машины и дат
await page.goto(BASE + "/", { waitUntil: "networkidle" });
const total = page.locator("#calculator p.text-accent").first();
const before = (await total.textContent())?.trim();

await page.getByRole("button", { name: /Hyundai Solaris/ }).click();
await page.waitForTimeout(400);
const afterCar = (await total.textContent())?.trim();
check("смена машины меняет сумму", before !== afterCar, `${before} → ${afterCar}`);

// 30 суток — должен включиться тариф «от 30 суток»
await page.locator("#calculator input[type=date]").first().fill("2026-09-01");
await page.locator("#calculator input[type=date]").nth(1).fill("2026-10-01");
await page.waitForTimeout(400);
const monthTotal = (await total.textContent())?.replace(/\s|₽/g, "");
const monthTier = await page.locator("#calculator").getByText("от 30 суток").first().isVisible();
check("30 суток → тариф «от 30 суток»", monthTier);
check("30 суток Solaris = 66 000 ₽", monthTotal === "66000", String(monthTotal));

// 4. Модалка с карточки авто подставляет именно эту машину и отправляется
await page.goto(BASE + "/cars/vw-passat", { waitUntil: "networkidle" });
await page.locator("main").getByRole("button", { name: "Забронировать" }).last().click();
await page.waitForTimeout(500);

const dialog = page.getByRole("dialog");
check(
  "модалка с карточки подставляет машину",
  (await dialog.locator("select").inputValue()) === "vw-passat",
);

const submit = dialog.getByRole("button", { name: "Отправить заявку" });
check("кнопка отправки заблокирована без данных", await submit.isDisabled());

await dialog.getByPlaceholder("Как к вам обращаться").fill("Иван");
await dialog.getByPlaceholder("+7 900 000-00-00").fill("+7 900 111-22-33");
await dialog.getByRole("checkbox").check();
await page.waitForTimeout(200);
check("кнопка разблокирована после заполнения", await submit.isEnabled());

await submit.click();
await page.waitForTimeout(500);
check("экран «заявка принята»", await dialog.getByText("Заявка принята").isVisible());
check(
  "в подтверждении честно про демо",
  await dialog.getByText(/Демо-версия: заявка никуда не уходит/).isVisible(),
);

await page.keyboard.press("Escape");
await page.waitForTimeout(400);
check("Escape закрывает модалку", (await page.getByRole("dialog").count()) === 0);

// 5. Мобильное меню
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mobilePage = await mobile.newPage();
mobilePage.on("pageerror", (e) => noise.push(String(e)));
await mobilePage.goto(BASE + "/", { waitUntil: "networkidle" });
await mobilePage.getByRole("button", { name: "Открыть меню" }).click();
await mobilePage.waitForTimeout(400);

const menuLink = mobilePage.getByRole("banner").getByRole("link", { name: "Автопарк" });
check("бургер открывает меню", await menuLink.isVisible());
await menuLink.click();
await mobilePage.waitForURL("**/cars");
await mobilePage.waitForTimeout(400);
check("после перехода меню закрыто", await mobilePage.getByRole("button", { name: "Открыть меню" }).isVisible());
await mobile.close();

// 6. Консоль и сеть
check("нет ошибок в консоли и сети", noise.length === 0, noise.slice(0, 5).join(" | "));

await browser.close();

console.log(failures ? `\n${failures} проверок упало` : "\nвсе проверки пройдены");
process.exit(failures ? 1 : 0);
