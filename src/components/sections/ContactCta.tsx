import { BookingButton } from "@/components/booking/BookingButton";
import { site } from "@/lib/site";

const rows = [
  { label: "Адрес", value: site.addressFull },
  { label: "Режим работы", value: site.hours },
  { label: "Связь", value: "Телефон, WhatsApp, Telegram" },
];

export function ContactCta() {
  return (
    <section id="contacts" className="scroll-mt-20 border-t border-line py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">Контакты</p>
            <h2 className="mt-5 max-w-[16ch] text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05]">
              Готовы отдать ключи
            </h2>
            <p className="mt-6 max-w-[42ch] text-[17px] leading-relaxed text-fg-muted">
              Позвоните или оставьте заявку — {site.owner} ответит и подтвердит
              бронь на нужные даты.
            </p>

            <a
              href={site.phoneHref}
              className="mt-8 block text-[clamp(1.75rem,5vw,2.5rem)] font-semibold tracking-tight transition-colors hover:text-accent"
            >
              {site.phone}
            </a>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BookingButton variant="accent" className="max-sm:w-full">
                Оставить заявку
              </BookingButton>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-[4px] border border-white/45 px-8 text-[13px] font-medium uppercase tracking-[0.06em] transition-colors hover:border-fg hover:bg-white/5 max-sm:w-full"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <dl className="border-t border-line">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid gap-2 border-b border-line py-6 sm:grid-cols-[160px_1fr] sm:gap-6"
              >
                <dt className="eyebrow pt-1">{row.label}</dt>
                <dd className="text-[16px] leading-relaxed">{row.value}</dd>
              </div>
            ))}

            <div className="grid gap-2 border-b border-line py-6 sm:grid-cols-[160px_1fr] sm:gap-6">
              <dt className="eyebrow pt-1">На картах</dt>
              <dd>
                <a
                  href={site.gis}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[16px] underline decoration-line underline-offset-4 transition-colors hover:decoration-fg"
                >
                  Открыть в 2ГИС
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
