import { site } from "@/lib/site";

/** Доп. услуги из карточки 2ГИС — растим средний чек, не раздувая каталог. */
const services = [
  { title: "Авто с водителем", text: "Встреча в аэропорту, поездки по краю, трансферы." },
  { title: "Прокат автобусов", text: "Группы, вахта, корпоративные выезды." },
  { title: "Аренда спецтехники", text: "Под задачу — уточняем наличие и сроки." },
  { title: "Длительная аренда", text: "От 30 суток: минимальная ставка, машина закреплена." },
];

export function Services() {
  return (
    <section className="border-t border-line py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_1.2fr] lg:gap-20">
          <div>
            <p className="eyebrow">Ещё умеем</p>
            <h2 className="mt-5 text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05]">
              Не только легковые
            </h2>
            <p className="mt-6 max-w-[40ch] text-[17px] leading-relaxed text-fg-muted">
              Если задача шире аренды седана — позвоните, подберём под неё транспорт.
            </p>
            <a
              href={site.phoneHref}
              className="mt-8 inline-block text-[26px] font-semibold tracking-tight transition-colors hover:text-accent"
            >
              {site.phone}
            </a>
          </div>

          <ul className="grid gap-px sm:grid-cols-2">
            {services.map((service) => (
              <li
                key={service.title}
                className="border border-line bg-bg-elevated p-7"
              >
                <h3 className="text-[18px] font-medium">{service.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">
                  {service.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
