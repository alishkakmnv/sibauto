import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactCta } from "@/components/sections/ContactCta";
import { Faq } from "@/components/sections/Faq";
import { steps } from "@/components/sections/Steps";
import { formatPrice } from "@/lib/pricing";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Как арендовать",
  description:
    "Три шага до ключей, документы, залог 5 000 ₽ и условия аренды автомобиля в Красноярске. Выдача круглосуточно.",
};

const docs = [
  { title: "Паспорт РФ", text: "Оригинал, действующий." },
  { title: "Водительское удостоверение", text: "Категория B, не просрочено." },
  { title: `Залог ${formatPrice(site.deposit)}`, text: "Фиксированный, возвращается при сдаче." },
];

const terms = [
  { label: "Минимальный срок", value: "1 сутки" },
  { label: "Выдача и возврат", value: `${site.address}, круглосуточно` },
  { label: "Топливо", value: "Возврат с тем же уровнем топлива" },
  { label: "Пробег", value: "Без ограничения по городу и краю" },
  { label: "Продление", value: "По согласованию, с пересчётом тарифа" },
  { label: "Требования к водителю", value: "Возраст и стаж уточняем при бронировании" },
];

export default function HowPage() {
  return (
    <>
      <PageHeader
        eyebrow="Как арендовать"
        title="От заявки до ключей — один день"
        lead="Никаких справок с работы и поручителей. Паспорт, права, залог — и машина ваша."
      />

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
          <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
            {steps.map((step) => (
              <li key={step.n} className="border-t border-line pt-7">
                <span className="text-[13px] font-medium tracking-[0.06em] text-accent">
                  {step.n}
                </span>
                <h2 className="mt-4 text-[22px] font-medium leading-tight">{step.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line">
        <div className="absolute inset-0">
          <Image
            src="/cars/interior.webp"
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-bg/85" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-5 py-20 lg:px-8 lg:py-28">
          <p className="eyebrow">Документы</p>
          <h2 className="mt-5 text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold leading-tight">
            Что взять с собой
          </h2>

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {docs.map((doc) => (
              <li key={doc.title} className="border border-line bg-bg-elevated p-7">
                <h3 className="text-[18px] font-medium">{doc.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">{doc.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-band py-20 text-band-fg lg:py-28">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
          <p className="text-[11px] uppercase leading-none tracking-[0.18em] text-black/45">
            Условия
          </p>
          <h2 className="mt-5 text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold leading-tight">
            Всё, о чём обычно спрашивают
          </h2>

          <dl className="mt-12 border-t border-black/15">
            {terms.map((term) => (
              <div
                key={term.label}
                className="grid gap-2 border-b border-black/15 py-6 sm:grid-cols-[280px_1fr] sm:gap-8"
              >
                <dt className="text-[13px] uppercase tracking-[0.1em] text-black/45">
                  {term.label}
                </dt>
                <dd className="text-[16px] leading-relaxed">{term.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Faq />
      <ContactCta />
    </>
  );
}
