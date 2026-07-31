import Image from "next/image";
import { BookingButton } from "@/components/booking/BookingButton";
import { ButtonLink } from "@/components/ui/Button";
import { minPrice } from "@/data/cars";
import { formatPrice } from "@/lib/pricing";
import { site } from "@/lib/site";

const facts = [
  { value: site.gisRating, label: "рейтинг в 2ГИС" },
  { value: "24/7", label: "выдача авто" },
  { value: formatPrice(site.deposit), label: "залог, фиксированный" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <Image
        src="/cars/hero.webp"
        alt="Автомобиль автопарка СибАвтоПрокат"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="scrim absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 pb-14 pt-28 lg:px-8 lg:pb-20">
        <p className="eyebrow eyebrow-photo">Красноярск · круглосуточно</p>

        <h1 className="mt-6 max-w-[16ch] text-[clamp(2.75rem,9vw,6rem)] font-semibold leading-[0.95]">
          Цена видна сразу
        </h1>

        <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-fg-muted sm:text-[18px]">
          Посчитайте стоимость аренды за 10 секунд и забронируйте онлайн —
          без звонков и ожидания. От {formatPrice(minPrice)} в сутки.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#calculator" variant="primary" className="max-sm:w-full">
            Рассчитать стоимость
          </ButtonLink>
          <BookingButton variant="accent" className="max-sm:w-full">
            Забронировать
          </BookingButton>
        </div>

        <dl className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/15 pt-8">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[22px] font-semibold tracking-tight sm:text-[26px]">
                {fact.value}
              </dt>
              <dd className="mt-1 text-[13px] text-fg-muted">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
