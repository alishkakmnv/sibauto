import type { Metadata } from "next";
import { CarCard } from "@/components/CarCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactCta } from "@/components/sections/ContactCta";
import { Reveal } from "@/components/ui/Reveal";
import { cars, minPrice } from "@/data/cars";
import { formatPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Автопарк",
  description:
    "Пять автомобилей в аренду в Красноярске: Haval Jolion, Chery Arrizo, Kia Optima, VW Passat, Hyundai Solaris. Цены по срокам аренды.",
};

export default function CarsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Автопарк"
        title="Пять машин, пять тарифов"
        lead={`Все автомобили на автомате и в наличии. Минимальная ставка — ${formatPrice(minPrice)} в сутки при аренде от 30 дней.`}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {cars.map((car, index) => (
              <Reveal key={car.slug} delay={index * 0.06}>
                <CarCard car={car} priority={index < 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
