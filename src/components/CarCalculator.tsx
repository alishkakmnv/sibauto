"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Button } from "@/components/ui/Button";
import { Field, Input } from "@/components/ui/Field";
import type { Car } from "@/data/cars";
import { daysBetween, daysWord, formatPrice, isoDate, quote, tierLabel } from "@/lib/pricing";
import { site } from "@/lib/site";

/** Калькулятор карточки авто: машина зафиксирована, меняются только даты. */
export function CarCalculator({ car }: { car: Car }) {
  const booking = useBooking();
  const [from, setFrom] = useState(isoDate(1));
  const [to, setTo] = useState(isoDate(4));

  const days = daysBetween(from, to);
  const estimate = days ? quote(car, days) : null;

  return (
    <div className="border border-line bg-bg-elevated p-7 lg:p-8">
      <p className="eyebrow">Расчёт стоимости</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
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

      {estimate ? (
        <>
          <motion.p
            key={estimate.total}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-[clamp(2.5rem,7vw,3.25rem)] font-semibold leading-none text-accent"
          >
            {formatPrice(estimate.total)}
          </motion.p>

          <p className="mt-4 text-[15px] text-fg-muted">
            {estimate.days} {daysWord(estimate.days)} × {formatPrice(estimate.pricePerDay)}
            <span className="ml-2 text-fg-subtle">тариф {tierLabel[estimate.tier]}</span>
          </p>

          {estimate.saved > 0 && (
            <p className="mt-2 text-[14px] text-fg-muted">
              Экономия против короткой аренды — {formatPrice(estimate.saved)}
            </p>
          )}
        </>
      ) : (
        <p className="mt-8 text-[15px] text-fg-subtle">
          Дата возврата должна быть позже даты выдачи.
        </p>
      )}

      <Button
        variant="accent"
        full
        className="mt-8"
        disabled={!estimate}
        onClick={() => booking.open(car.slug)}
      >
        Забронировать
      </Button>

      <p className="mt-4 text-[13px] text-fg-subtle">
        Залог {formatPrice(site.deposit)} · выдача круглосуточно
      </p>
    </div>
  );
}
