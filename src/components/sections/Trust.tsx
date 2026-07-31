import Image from "next/image";
import { site } from "@/lib/site";

export function Trust() {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden border-t border-line">
      <Image
        src="/cars/krasnoyarsk.webp"
        alt="Улица в центре Красноярска"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="scrim-soft absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 py-20 lg:px-8 lg:py-24">
        <p className="eyebrow eyebrow-photo">Нам доверяют</p>

        <div className="mt-8 flex flex-wrap items-end gap-x-14 gap-y-8">
          <div>
            <p className="text-[clamp(3.5rem,10vw,5.5rem)] font-semibold leading-none">
              {site.gisRating}
            </p>
            <p className="mt-3 text-[14px] text-fg-muted">
              рейтинг в 2ГИС · {site.gisReviews} отзывов
            </p>
          </div>

          <p className="max-w-[36ch] text-[17px] leading-relaxed text-fg-muted">
            Работаем в Красноярске: город, Дивногорск, Столбы, трасса на Ергаки.
            Знаем маршруты и готовим машину под них.
          </p>
        </div>

        <a
          href={site.gis}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex h-12 items-center justify-center rounded-[4px] border border-white/45 px-8 text-[13px] font-medium uppercase tracking-[0.06em] transition-colors hover:border-fg hover:bg-white/5"
        >
          Читать отзывы в 2ГИС
        </a>

        <p className="mt-6 max-w-[52ch] text-[13px] leading-relaxed text-fg-subtle">
          Демо: тексты отзывов появятся на сайте после того, как соберём согласия
          клиентов. Рейтинг и число отзывов — с реальной карточки 2ГИС.
        </p>
      </div>
    </section>
  );
}
