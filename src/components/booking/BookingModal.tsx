"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { cars, getCar } from "@/data/cars";
import { daysBetween, daysWord, formatPrice, isoDate, quote, tierLabel } from "@/lib/pricing";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";

type Props = {
  isOpen: boolean;
  carSlug: string | null;
  onClose: () => void;
};

export function BookingModal({ isOpen, carSlug, onClose }: Props) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  const [slug, setSlug] = useState(carSlug ?? cars[0].slug);
  const [from, setFrom] = useState(isoDate(1));
  const [to, setTo] = useState(isoDate(4));
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const car = getCar(slug) ?? cars[0];
  const days = daysBetween(from, to);
  const estimate = days ? quote(car, days) : null;

  const canSubmit =
    Boolean(estimate) && name.trim().length > 1 && phone.replace(/\D/g, "").length >= 10 && consent;

  const waText = estimate
    ? `Здравствуйте! Хочу забронировать ${car.name} (${car.year}) с ${from} по ${to}. ${estimate.days} ${daysWord(estimate.days)} — ${formatPrice(estimate.total)}.`
    : `Здравствуйте! Хочу арендовать ${car.name}.`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          <motion.button
            type="button"
            aria-label="Закрыть форму"
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="relative max-h-[92dvh] w-full overflow-y-auto border border-line bg-bg-elevated p-6 outline-none sm:max-w-[520px] sm:rounded-lg sm:p-10"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-fg-muted transition-colors hover:text-fg"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>

            {sent ? (
              <div className="py-6">
                <p className="eyebrow">Заявка принята</p>
                <h2 id={titleId} className="mt-4 text-[28px] font-semibold">
                  {name.split(" ")[0] || "Спасибо"}, мы на связи
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                  {site.owner} перезвонит на {phone} и подтвердит бронь. Машина отложена
                  на выбранные даты.
                </p>

                <p className="mt-6 border border-line bg-surface p-4 text-[13px] leading-relaxed text-fg-subtle">
                  Демо-версия: заявка никуда не уходит. В рабочей версии она
                  сохраняется в базе и мгновенно прилетает {site.owner}у в Telegram.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={`${site.whatsapp}?text=${encodeURIComponent(waText)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center justify-center rounded-[4px] border border-white/45 px-8 text-[13px] font-medium uppercase tracking-[0.06em] transition-colors hover:border-fg hover:bg-white/5"
                  >
                    Написать в WhatsApp
                  </a>
                  <Button variant="ghost" onClick={onClose}>
                    Закрыть
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSent(true);
                }}
                className="space-y-5"
              >
                <div>
                  <p className="eyebrow">Бронирование</p>
                  <h2 id={titleId} className="mt-3 text-[28px] font-semibold">
                    Забронировать авто
                  </h2>
                  <p className="mt-2 text-sm text-fg-muted">
                    Ответим в течение 15 минут. Без предоплаты.
                  </p>
                </div>

                <Field label="Автомобиль">
                  <Select value={slug} onChange={(event) => setSlug(event.target.value)}>
                    {cars.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}, {item.year}
                      </option>
                    ))}
                  </Select>
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Дата с">
                    <Input
                      type="date"
                      value={from}
                      min={isoDate()}
                      onChange={(event) => setFrom(event.target.value)}
                    />
                  </Field>
                  <Field label="Дата по">
                    <Input
                      type="date"
                      value={to}
                      min={from}
                      onChange={(event) => setTo(event.target.value)}
                    />
                  </Field>
                </div>

                <div className="flex items-baseline justify-between border-y border-line py-4">
                  {estimate ? (
                    <>
                      <span className="text-sm text-fg-muted">
                        {estimate.days} {daysWord(estimate.days)} ·{" "}
                        {formatPrice(estimate.pricePerDay)}/сут
                        <span className="ml-2 text-fg-subtle">
                          тариф {tierLabel[estimate.tier]}
                        </span>
                      </span>
                      <span className="text-[28px] font-semibold text-accent">
                        {formatPrice(estimate.total)}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-fg-subtle">
                      Дата возврата должна быть позже даты выдачи
                    </span>
                  )}
                </div>

                <Field label="Имя">
                  <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Как к вам обращаться"
                    autoComplete="name"
                    required
                  />
                </Field>

                <Field label="Телефон">
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+7 900 000-00-00"
                    autoComplete="tel"
                    required
                  />
                </Field>

                <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-fg-subtle">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#e31937]"
                    required
                  />
                  Согласен на обработку персональных данных
                </label>

                <Button type="submit" variant="accent" full disabled={!canSubmit}>
                  Отправить заявку
                </Button>

                <p className="text-center text-[12px] text-fg-subtle">
                  Залог {formatPrice(site.deposit)} · выдача {site.hours.toLowerCase()}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
