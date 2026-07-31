/** Реквизиты клиента. Всё, что может поменяться, — здесь, а не по компонентам. */
export const site = {
  name: "СибАвтоПрокат",
  tagline: "Аренда авто в Красноярске",
  owner: "Денис",
  phone: "+7 933 326-20-82",
  phoneHref: "tel:+79333262082",
  whatsapp: "https://wa.me/79333262082",
  telegram: "https://t.me/+79333262082",
  address: "Красноярск, ул. Брянская, 142",
  addressFull: "660048, Красноярск, ул. Брянская, 142, Железнодорожный район",
  hours: "Круглосуточно, 7 дней в неделю",
  deposit: 5000,
  gis: "https://2gis.ru/krasnoyarsk/firm/70000001104884542",
  gisRating: "5.0",
  gisReviews: 7,
  url: "https://sibavtoprokat.ru",
} as const;

export const nav = [
  { href: "/cars", label: "Автопарк" },
  { href: "/how", label: "Как арендовать" },
  { href: "/contacts", label: "Контакты" },
] as const;
