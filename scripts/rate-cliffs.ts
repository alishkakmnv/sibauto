/**
 * Где общая сумма аренды падает при увеличении срока на сутки.
 * Это свойство тарифной сетки клиента, а не расчёта. Запуск:
 *   node scripts/rate-cliffs.ts
 */
import { cars } from "../src/data/cars.ts";
import { quote } from "../src/lib/pricing.ts";

for (const car of cars) {
  const cliffs: string[] = [];

  for (let days = 2; days <= 60; days += 1) {
    const previous = quote(car, days - 1);
    const current = quote(car, days);
    if (current.total < previous.total) {
      cliffs.push(
        `${days - 1} сут = ${previous.total} ₽  →  ${days} сут = ${current.total} ₽  (−${previous.total - current.total} ₽)`,
      );
    }
  }

  console.log(`\n${car.name}`);
  for (const cliff of cliffs) console.log("  " + cliff);
  if (!cliffs.length) console.log("  провалов нет");
}
