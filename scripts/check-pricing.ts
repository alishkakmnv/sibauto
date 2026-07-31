/**
 * Проверка стыков тарифных ступеней и расчёта суммы.
 * Запуск: node scripts/check-pricing.ts
 */
import assert from "node:assert/strict";
import test from "node:test";
import { cars } from "../src/data/cars.ts";
import { daysBetween, quote, tierForDays } from "../src/lib/pricing.ts";

const expected: Array<[number, string]> = [
  [1, "1-3"],
  [2, "1-3"],
  [3, "1-3"],
  [4, "4-7"],
  [7, "4-7"],
  [8, "8-15"],
  [15, "8-15"],
  [16, "16-29"],
  [29, "16-29"],
  [30, "30+"],
  [31, "30+"],
  [90, "30+"],
];

test("ступени тарифа на стыках", () => {
  for (const [days, tier] of expected) {
    assert.equal(tierForDays(days), tier, `${days} суток → ожидали ${tier}`);
  }
});

test("даты дают ожидаемое число суток", () => {
  assert.equal(daysBetween("2026-08-01", "2026-08-04"), 3);
  assert.equal(daysBetween("2026-08-01", "2026-08-05"), 4);
  assert.equal(daysBetween("2026-08-01", "2026-08-31"), 30);
  // переход через границу месяца и через смену времени
  assert.equal(daysBetween("2026-10-20", "2026-11-19"), 30);
  // некорректные диапазоны
  assert.equal(daysBetween("2026-08-04", "2026-08-01"), null);
  assert.equal(daysBetween("2026-08-01", "2026-08-01"), null);
  assert.equal(daysBetween("", "2026-08-01"), null);
});

test("сумма считается по цене выбранной ступени", () => {
  const jolion = cars.find((car) => car.slug === "haval-jolion")!;

  // 3 суток — ещё базовый тариф
  const short = quote(jolion, 3);
  assert.equal(short.tier, "1-3");
  assert.equal(short.pricePerDay, 5000);
  assert.equal(short.total, 15000);
  assert.equal(short.saved, 0);

  // 4 суток — уже следующая ступень, сумма не должна «прыгать» вверх
  const next = quote(jolion, 4);
  assert.equal(next.tier, "4-7");
  assert.equal(next.total, 4 * 4700);
  assert.ok(next.total > short.total, "четвёртые сутки не могут удешевить бронь целиком");

  // 30 суток — минимальная ставка
  const month = quote(jolion, 30);
  assert.equal(month.tier, "30+");
  assert.equal(month.total, 30 * 3200);
  assert.equal(month.saved, 30 * (5000 - 3200));
});

/**
 * Известная особенность тарифной сетки клиента: на переходах 15→16 и 29→30
 * итог падает — сутки дешевеют сильнее, чем растёт срок. Это не баг расчёта,
 * а свойство цен из ТЗ. Тест фиксирует, что «провалы» есть ровно в этих двух
 * точках: если Денис поправит тарифы, тест сразу это покажет.
 * Подробности — `node scripts/rate-cliffs.ts`.
 */
test("провалы суммы — только на стыках 15→16 и 29→30", () => {
  for (const car of cars) {
    const cliffs: number[] = [];

    for (let days = 2; days <= 60; days += 1) {
      if (quote(car, days).total < quote(car, days - 1).total) cliffs.push(days);
    }

    assert.deepEqual(cliffs, [16, 30], `${car.name}: неожиданные провалы ${cliffs}`);
  }
});
