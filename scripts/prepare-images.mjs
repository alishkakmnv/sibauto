/**
 * Подготовка изображений для демо.
 * Источники — свободные фото (Wikimedia Commons / Openverse), лежат в scripts/raw.
 * Приводим к единой сетке кадров и единому «тёмному» грейду, чтобы каталог
 * не выглядел набором случайных снимков. В бою сюда лягут фото парка Дениса.
 *
 * Запуск: node scripts/prepare-images.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RAW = path.join(process.cwd(), "scripts", "raw");
const OUT = path.join(process.cwd(), "public", "cars");

/** Грейд карточек: приглушаем цвет и яркость, чтобы фото садилось на #0A0A0A. */
const grade = (img) =>
  img.modulate({ saturation: 0.62, brightness: 0.8 }).linear(1.08, -16);

/** Грейд полноэкранных полос: сильно темнее — текст ложится поверх без «пятен». */
const gradeDark = (img) =>
  img.modulate({ saturation: 0.5, brightness: 0.48 }).linear(1.15, -26);

/** Доля кадра по ширине, которую оставляем (обрезаем лишнее по краям). */
const crops = {
  // На исходнике Chery справа стоят люди — оставляем левые 76%.
  "arr1.jpg": { left: 0, widthRatio: 0.76 },
};

const cards = [
  { src: "arr1.jpg", out: "arrizo.webp" },
  { src: "opt1.jpg", out: "optima.webp" },
  { src: "jol1.jpg", out: "jolion.webp" },
  { src: "pas1.jpg", out: "passat.webp" },
  { src: "sol2.jpg", out: "solaris.webp" },
];

const jobs = [
  // Карточки каталога — 3:2, светлее
  ...cards.map((card) => ({ ...card, w: 1400, h: 933 })),

  // Полноэкранные шапки карточек авто — 16:9, тёмный грейд
  ...cards.map((card) => ({
    ...card,
    out: card.out.replace(".webp", "-wide.webp"),
    w: 2000,
    h: 1125,
    dark: true,
  })),

  // Полосы главной
  { src: "pas1.jpg", out: "hero.webp", w: 2400, h: 1350, dark: true },
  { src: "interior.jpg", out: "interior.webp", w: 1800, h: 1200, dark: true },
  { src: "krsk2s.jpg", out: "krasnoyarsk.webp", w: 1800, h: 1013, dark: true },
];

await mkdir(OUT, { recursive: true });

for (const job of jobs) {
  let pipeline = sharp(path.join(RAW, job.src));

  const crop = crops[job.src];
  if (crop) {
    const { width, height } = await pipeline.metadata();
    pipeline = pipeline.extract({
      left: Math.round(width * crop.left),
      top: 0,
      width: Math.round(width * crop.widthRatio),
      height,
    });
  }

  pipeline = pipeline.resize(job.w, job.h, { fit: "cover", position: "centre" });

  const graded = job.dark ? gradeDark(pipeline) : grade(pipeline);
  await graded.webp({ quality: 82 }).toFile(path.join(OUT, job.out));
  console.log(`✓ ${job.out}  ${job.w}×${job.h}`);
}
