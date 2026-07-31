import { CarCard } from "@/components/CarCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cars } from "@/data/cars";

export function Fleet() {
  return (
    <section id="fleet" className="scroll-mt-20 border-t border-line py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Автопарк</p>
            <h2 className="mt-5 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05]">
              Пять машин в наличии
            </h2>
          </div>
          <ButtonLink href="/cars" variant="ghost" className="max-sm:w-full">
            Весь автопарк
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {cars.map((car, index) => (
            <Reveal key={car.slug} delay={index * 0.06}>
              <CarCard car={car} priority={index < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
