import type { Metadata } from "next";
import Image from "next/image";
import { BookingButton } from "@/components/booking/BookingButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Аренда авто в Красноярске: ${site.addressFull}. Телефон ${site.phone}, выдача круглосуточно.`,
};

const channels = [
  { label: "Телефон", value: site.phone, href: site.phoneHref },
  { label: "WhatsApp", value: "Написать в чат", href: site.whatsapp },
  { label: "Telegram", value: "Написать в чат", href: site.telegram },
  { label: "2ГИС", value: `Карточка · рейтинг ${site.gisRating}`, href: site.gis },
];

export default function ContactsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Контакты"
        title="Красноярск, Брянская 142"
        lead={`${site.owner} на связи круглосуточно. Позвоните или напишите — подберём машину и закрепим её за вашими датами.`}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <a
                href={site.phoneHref}
                className="block text-[clamp(2rem,6vw,3rem)] font-semibold leading-none tracking-tight transition-colors hover:text-accent"
              >
                {site.phone}
              </a>

              <dl className="mt-12 border-t border-line">
                {channels.map((channel) => (
                  <div
                    key={channel.label}
                    className="grid gap-1 border-b border-line py-5 sm:grid-cols-[160px_1fr] sm:gap-6"
                  >
                    <dt className="eyebrow pt-1">{channel.label}</dt>
                    <dd>
                      <a
                        href={channel.href}
                        target={channel.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="text-[16px] underline decoration-line underline-offset-4 transition-colors hover:decoration-fg"
                      >
                        {channel.value}
                      </a>
                    </dd>
                  </div>
                ))}

                <div className="grid gap-1 border-b border-line py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <dt className="eyebrow pt-1">Адрес</dt>
                  <dd className="text-[16px] leading-relaxed">{site.addressFull}</dd>
                </div>

                <div className="grid gap-1 border-b border-line py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <dt className="eyebrow pt-1">Режим работы</dt>
                  <dd className="text-[16px] leading-relaxed">{site.hours}</dd>
                </div>
              </dl>

              <BookingButton variant="accent" className="mt-10 max-sm:w-full">
                Оставить заявку
              </BookingButton>
            </div>

            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line">
                <Image
                  src="/cars/krasnoyarsk.webp"
                  alt="Красноярск, центр города"
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-bg/35" />

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="text-[18px] font-medium">{site.address}</p>
                  <p className="mt-1 text-[14px] text-fg-muted">
                    Железнодорожный район · 660048
                  </p>
                  <a
                    href={site.gis}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex h-11 items-center justify-center rounded-[4px] bg-fg px-6 text-[12px] font-medium uppercase tracking-[0.06em] text-bg transition-colors hover:bg-white/85"
                  >
                    Построить маршрут
                  </a>
                </div>
              </div>

              <p className="mt-4 text-[13px] leading-relaxed text-fg-subtle">
                Демо: здесь встанет интерактивная карта 2ГИС или Яндекс.Карт
                с точкой выдачи.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
