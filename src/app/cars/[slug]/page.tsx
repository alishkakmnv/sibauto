import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CarCalculator } from "@/components/CarCalculator";
import { CarCard } from "@/components/CarCard";
import { ContactCta } from "@/components/sections/ContactCta";
import { TIERS, cars, getCar } from "@/data/cars";
import { formatPrice, tierLabel } from "@/lib/pricing";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) return {};

  return {
    title: `Аренда ${car.name} ${car.year}`,
    description: `${car.name} ${car.year} в аренду в Красноярске от ${formatPrice(car.rates["30+"])} в сутки. ${car.pitch}`,
    openGraph: { images: [car.photo] },
  };
}

export default async function CarPage({ params }: Params) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) notFound();

  const specs = [
    { label: "Год выпуска", value: String(car.year) },
    { label: "Класс", value: car.klass },
    { label: "Кузов", value: car.body },
    { label: "Коробка", value: car.transmission },
    { label: "Привод", value: car.drive },
    { label: "Топливо", value: car.fuel },
    { label: "Мест", value: String(car.seats) },
  ];

  const others = cars.filter((item) => item.slug !== car.slug).slice(0, 2);

  return (
    <>
      {/* Фото на весь экран — доминанта карточки */}
      <section className="relative flex min-h-[75svh] items-end overflow-hidden">
        <Image
          src={car.photoWide}
          alt={`${car.name} ${car.year}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="scrim absolute inset-0" />

        <div className="relative mx-auto w-full max-w-[1200px] px-5 pb-14 pt-32 lg:px-8 lg:pb-20">
          <Link
            href="/cars"
            className="eyebrow eyebrow-photo transition-colors hover:text-fg"
          >
            ← Автопарк
          </Link>

          <h1 className="mt-6 text-[clamp(2.5rem,8vw,5rem)] font-semibold leading-[0.98]">
            {car.name}
          </h1>
          <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-fg-muted sm:text-[18px]">
            {car.pitch}
          </p>

          <p className="mt-8 text-[13px] uppercase tracking-[0.14em] text-white/70">
            от
          </p>
          <p className="text-[clamp(2.5rem,6vw,3.5rem)] font-semibold leading-none text-accent">
            {formatPrice(car.rates["30+"])}
            <span className="ml-2 align-baseline text-[16px] font-normal text-fg-muted">
              в сутки
            </span>
          </p>
        </div>
      </section>

      <section className="border-t border-line py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-16">
            <div>
              <p className="eyebrow">Характеристики</p>
              <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                  >
                    <dt className="text-[14px] text-fg-subtle">{spec.label}</dt>
                    <dd className="text-[15px]">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-10 flex flex-wrap gap-2">
                {car.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-[4px] border border-line px-4 py-2 text-[13px] text-fg-muted"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>

              <p className="eyebrow mt-14">Тарифы по срокам</p>
              <table className="mt-6 w-full border-collapse text-[15px]">
                <thead>
                  <tr className="border-b border-line text-[13px] text-fg-subtle">
                    <th scope="col" className="py-3 text-left font-normal">
                      Срок аренды
                    </th>
                    <th scope="col" className="py-3 text-right font-normal">
                      Цена за сутки
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {TIERS.map((tier) => (
                    <tr key={tier} className="border-b border-line">
                      <th scope="row" className="py-4 text-left font-normal text-fg-muted">
                        {tierLabel[tier]}
                      </th>
                      <td className="py-4 text-right">
                        {formatPrice(car.rates[tier])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <CarCalculator car={car} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 lg:py-28">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
          <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight">
            Другие машины
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
            {others.map((item) => (
              <CarCard key={item.slug} car={item} />
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
