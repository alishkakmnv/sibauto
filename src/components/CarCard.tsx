import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/data/cars";
import { formatPrice } from "@/lib/pricing";

type Props = {
  car: Car;
  priority?: boolean;
};

export function CarCard({ car, priority }: Props) {
  return (
    <Link
      href={`/cars/${car.slug}`}
      className="group block overflow-hidden rounded-lg border border-line bg-bg-elevated transition-[transform,border-color] duration-[250ms] ease-out-quint hover:-translate-y-1 hover:border-fg-subtle"
    >
      {/* Фото — доминанта карточки */}
      <div className="relative aspect-[3/2] overflow-hidden bg-surface">
        <Image
          src={car.photo}
          alt={`${car.name} ${car.year}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover transition-transform duration-[600ms] ease-out-quint group-hover:scale-[1.03]"
        />
        {/* Смыкаем фото с телом карточки, чтобы низ не «резался» линией */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg-elevated to-transparent" />
      </div>

      <div className="flex items-end justify-between gap-6 p-6">
        <div>
          <h3 className="text-[22px] font-medium leading-tight">{car.name}</h3>
          <p className="mt-1.5 text-[13px] text-fg-subtle">
            {car.year} · {car.body} · {car.transmission}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[11px] uppercase tracking-[0.14em] text-fg-subtle">от</p>
          <p className="text-[22px] font-semibold leading-tight text-accent">
            {formatPrice(car.rates["30+"])}
          </p>
          <p className="text-[13px] text-fg-subtle">в сутки</p>
        </div>
      </div>
    </Link>
  );
}
