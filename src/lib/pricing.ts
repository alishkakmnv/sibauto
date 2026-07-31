import type { Car, Tier } from "@/data/cars";

/** Тариф подбирается по числу суток — алгоритм из ТЗ (раздел 3.3). */
export function tierForDays(days: number): Tier {
  if (days <= 3) return "1-3";
  if (days <= 7) return "4-7";
  if (days <= 15) return "8-15";
  if (days <= 29) return "16-29";
  return "30+";
}

export const tierLabel: Record<Tier, string> = {
  "1-3": "1–3 суток",
  "4-7": "4–7 суток",
  "8-15": "8–15 суток",
  "16-29": "16–29 суток",
  "30+": "от 30 суток",
};

/** Разница дат в сутках: округление вверх, минимум 1. */
export function daysBetween(from: string, to: string): number | null {
  if (!from || !to) return null;

  const start = Date.parse(from);
  const end = Date.parse(to);
  if (Number.isNaN(start) || Number.isNaN(end)) return null;
  if (end <= start) return null;

  return Math.max(1, Math.ceil((end - start) / 86_400_000));
}

export type Quote = {
  days: number;
  tier: Tier;
  pricePerDay: number;
  total: number;
  /** Сколько экономит клиент против базового тарифа 1–3 суток. */
  saved: number;
};

export function quote(car: Car, days: number): Quote {
  const tier = tierForDays(days);
  const pricePerDay = car.rates[tier];

  return {
    days,
    tier,
    pricePerDay,
    total: days * pricePerDay,
    saved: days * (car.rates["1-3"] - pricePerDay),
  };
}

const rub = new Intl.NumberFormat("ru-RU");

export const formatPrice = (value: number) => `${rub.format(value)} ₽`;

/** «3 суток», «5 суток», «21 сутки» */
export function plural(count: number, forms: [string, string, string]) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}

export const daysWord = (count: number) =>
  plural(count, ["сутки", "суток", "суток"]);

/** ISO-дата (YYYY-MM-DD) со сдвигом в днях от сегодня — для дефолтов календаря. */
export function isoDate(offsetDays = 0): string {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}
