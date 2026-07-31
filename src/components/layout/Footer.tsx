import Link from "next/link";
import { cars } from "@/data/cars";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto max-w-[1200px] px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-[15px] font-semibold uppercase tracking-[0.14em]">
              Сиб<span className="text-accent">Авто</span>Прокат
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              Аренда автомобилей в Красноярске. Прозрачная цена, свежий парк,
              выдача круглосуточно.
            </p>
            <a
              href={site.phoneHref}
              className="mt-6 inline-block text-[22px] font-semibold tracking-tight transition-colors hover:text-accent"
            >
              {site.phone}
            </a>
          </div>

          <div>
            <p className="eyebrow">Автопарк</p>
            <ul className="mt-5 space-y-3">
              {cars.map((car) => (
                <li key={car.slug}>
                  <Link
                    href={`/cars/${car.slug}`}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {car.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Информация</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.gis}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  Отзывы в 2ГИС
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-[13px] text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>{site.addressFull}</p>
          <p>{site.hours}</p>
          <p>© {new Date().getFullYear()} {site.name}</p>
        </div>

        <p className="mt-8 max-w-[92ch] text-[12px] leading-relaxed text-fg-subtle/80">
          Демо-версия сайта. Фотографии автомобилей — иллюстративные, из открытых
          источников; в рабочей версии их заменяют снимки реального парка.
          Информация на сайте не является публичной офертой.
        </p>
        <p className="mt-2 max-w-[92ch] text-[12px] leading-relaxed text-fg-subtle/80">
          Фото: Wikimedia Commons — Thomas Doerfer, Milhouse35, SsmIntrigue,
          Nord794ub, Jengtingchen, Vyacheslav Argenberg (CC BY-SA 3.0 / CC BY 4.0 /
          CC BY-SA 4.0); rawpixel (CC0). Изображения кадрированы и обработаны.
        </p>
      </div>
    </footer>
  );
}
