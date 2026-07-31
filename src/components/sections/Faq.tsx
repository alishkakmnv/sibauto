"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { formatPrice } from "@/lib/pricing";
import { site } from "@/lib/site";

export const faq = [
  {
    q: "Какой залог и когда его возвращают?",
    a: `Залог фиксированный — ${formatPrice(site.deposit)} за любую машину парка. Возвращаем при сдаче автомобиля в исходном состоянии, без новых повреждений и штрафов.`,
  },
  {
    q: "Какие документы нужны?",
    a: "Паспорт РФ и водительское удостоверение. Договор оформляем на месте, занимает около десяти минут.",
  },
  {
    q: "Есть требования к возрасту и стажу?",
    a: "Да, требования к возрасту и стажу мы уточняем при бронировании — они зависят от класса автомобиля. Позвоните, и менеджер сразу скажет, подходите ли вы.",
  },
  {
    q: "Можно продлить аренду?",
    a: "Можно. Предупредите заранее — если машина свободна, продлеваем. При переходе на более длинный срок пересчитываем по более выгодному тарифу.",
  },
  {
    q: "Когда можно забрать машину?",
    a: `Выдача круглосуточно по адресу: ${site.address}. Ночной прилёт или ранний вылет — не проблема.`,
  },
  {
    q: "Привозите ли авто к клиенту?",
    a: "Доставку обсуждаем отдельно: уточните при бронировании адрес и время, менеджер скажет условия.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-line py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-20">
          <div>
            <p className="eyebrow">Вопросы</p>
            <h2 className="mt-5 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05]">
              Коротко о главном
            </h2>
          </div>

          <div className="border-t border-line">
            {faq.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={item.q} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="text-[17px] font-medium leading-snug sm:text-[19px]">
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className={`relative flex h-6 w-6 shrink-0 items-center justify-center transition-transform duration-300 ease-out-quint ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <span className="absolute h-px w-4 bg-fg-muted" />
                        <span className="absolute h-4 w-px bg-fg-muted" />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[60ch] pb-7 pr-10 text-[15px] leading-relaxed text-fg-muted">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
