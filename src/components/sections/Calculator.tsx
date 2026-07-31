"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import { TIERS, cars, getCar } from "@/data/cars";
import {
  daysBetween,
  daysWord,
  formatPrice,
  isoDate,
  quote,
  tierForDays,
  tierLabel,
} from "@/lib/pricing";
import { site } from "@/lib/site";

export function Calculator() {
  const booking = useBooking();
  const [slug, setSlug] = useState(cars[0].slug);
  const [from, setFrom] = useState(isoDate(1));
  const [to, setTo] = useState(isoDate(4));

  const car = getCar(slug) ?? cars[0];
  const days = daysBetween(from, to);
  const estimate = days ? quote(car, days) : null;
  const activeTier = days ? tierForDays(days) : null;

  return (
    <section id="calculator" className="scroll-mt-20 border-t border-line py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <p className="eyebrow">Калькулятор</p>
        <h2 className="mt-5 max-w-[18ch] text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05]">
          Сколько это стоит
        </h2>
        <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-fg-muted">
          Чем дольше аренда, тем дешевле сутки. Тариф подбирается автоматически —
          звонить, чтобы узнать цену, не нужно.
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">
          {/* ── Управление ───────────────────────────────────────────── */}
          <div>
            <p className="eyebrow">Автомобиль</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {cars.map((item) => {
                const isActive = item.slug === slug;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => setSlug(item.slug)}
                    aria-pressed={isActive}
                    className={`flex items-baseline justify-between rounded-[4px] border px-5 py-4 text-left transition-colors ${
                      isActive
                        ? "border-fg bg-bg-elevated"
                        : "border-line bg-transparent hover:border-fg-subtle"
                    }`}
                  >
                    <span>
                      <span className="block text-[15px] font-medium">{item.name}</span>
                      <span className="block text-[13px] text-fg-subtle">{item.year}</span>
                    </span>
                    <span className="text-[13px] text-fg-muted">
                      от {formatPrice(item.rates["30+"])}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Field label="Дата выдачи">
                <Input
                  type="date"
                  value={from}
                  min={isoDate()}
                  onChange={(event) => setFrom(event.target.value)}
                />
              </Field>
              <Field label="Дата возврата">
                <Input
                  type="date"
                  value={to}
                  min={from}
                  onChange={(event) => setTo(event.target.value)}
                />
              </Field>
            </div>

            {/* Тарифная сетка выбранной машины — видно, где начинается скидка */}
            <table className="mt-10 w-full border-collapse text-[15px]">
              <caption className="eyebrow mb-4 text-left">
                Тарифы · {car.name}
              </caption>
              <tbody>
                {TIERS.map((tier) => {
                  const isActive = tier === activeTier;
                  return (
                    <tr
                      key={tier}
                      className={`border-b border-line ${isActive ? "text-fg" : "text-fg-muted"}`}
                    >
                      <th
                        scope="row"
                        className="py-3 text-left font-normal"
                      >
                        {isActive && (
                          <span
                            aria-hidden
                            className="mr-3 inline-block h-1.5 w-1.5 -translate-y-0.5 rounded-full bg-accent"
                          />
                        )}
                        {tierLabel[tier]}
                      </th>
                      <td className={`py-3 text-right ${isActive ? "font-medium" : ""}`}>
                        {formatPrice(car.rates[tier])}
                        <span className="text-fg-subtle">/сут</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── Итог ─────────────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="border border-line bg-bg-elevated p-7 lg:p-8">
              {estimate ? (
                <>
                  <p className="eyebrow">Итого</p>

                  <motion.p
                    key={estimate.total}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-4 text-[clamp(2.5rem,7vw,3.5rem)] font-semibold leading-none text-accent"
                  >
                    {formatPrice(estimate.total)}
                  </motion.p>

                  <p className="mt-4 text-[15px] text-fg-muted">
                    {estimate.days} {daysWord(estimate.days)} ×{" "}
                    {formatPrice(estimate.pricePerDay)}
                  </p>

                  <dl className="mt-7 space-y-3 border-t border-line pt-6 text-[14px]">
                    <div className="flex justify-between">
                      <dt className="text-fg-subtle">Автомобиль</dt>
                      <dd>
                        {car.name}, {car.year}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-fg-subtle">Тариф</dt>
                      <dd>{tierLabel[estimate.tier]}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-fg-subtle">Залог</dt>
                      <dd>{formatPrice(site.deposit)}</dd>
                    </div>
                    {estimate.saved > 0 && (
                      <div className="flex justify-between">
                        <dt className="text-fg-subtle">Скидка за срок</dt>
                        <dd>−{formatPrice(estimate.saved)}</dd>
                      </div>
                    )}
                  </dl>

                  <div className="mt-8 space-y-3">
                    <Button
                      variant="accent"
                      full
                      onClick={() => booking.open(car.slug)}
                    >
                      Забронировать
                    </Button>
                    <Link
                      href={`/cars/${car.slug}`}
                      className="flex h-12 w-full items-center justify-center rounded-[4px] border border-white/45 text-[13px] font-medium uppercase tracking-[0.06em] transition-colors hover:border-fg hover:bg-white/5"
                    >
                      Про эту машину
                    </Link>
                  </div>
                </>
              ) : (
                <div className="py-10 text-center">
                  <p className="text-[15px] text-fg-muted">
                    Выберите даты: возврат должен быть позже выдачи.
                  </p>
                </div>
              )}
            </div>

            <p className="mt-4 text-[13px] leading-relaxed text-fg-subtle">
              Расчёт предварительный. Итоговую сумму {""}
              подтверждает менеджер при бронировании.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
