/**
 * Парк и тарифы. На демо — здесь; в бою переезжает в Supabase (таблицы cars + rates),
 * чтобы Денис менял цены без правки кода. Формат tier совпадает со схемой из ТЗ.
 */

export const TIERS = ["1-3", "4-7", "8-15", "16-29", "30+"] as const;
export type Tier = (typeof TIERS)[number];

export type Car = {
  slug: string;
  name: string;
  year: number;
  klass: string;
  body: "Седан" | "Кроссовер";
  seats: number;
  transmission: string;
  drive: string;
  fuel: string;
  photo: string;
  /** Тёмный широкий кадр для шапки карточки авто. */
  photoWide: string;
  /** Короткая строка «для кого эта машина» — помогает выбрать без звонка. */
  pitch: string;
  highlights: string[];
  rates: Record<Tier, number>;
};

export const cars: Car[] = [
  {
    slug: "haval-jolion",
    name: "Haval Jolion",
    year: 2024,
    klass: "Компактный кроссовер",
    body: "Кроссовер",
    seats: 5,
    transmission: "Автомат",
    drive: "Передний",
    fuel: "АИ-95",
    photo: "/cars/jolion.webp",
    photoWide: "/cars/jolion-wide.webp",
    pitch: "Самый свежий в парке. Высокая посадка — спокойно на Столбы и Дивногорск.",
    highlights: ["Клиренс кроссовера", "Просторный багажник", "Тёплый салон зимой"],
    rates: { "1-3": 5000, "4-7": 4700, "8-15": 4300, "16-29": 3800, "30+": 3200 },
  },
  {
    slug: "chery-arrizo",
    name: "Chery Arrizo",
    year: 2023,
    klass: "Седан бизнес-класса",
    body: "Седан",
    seats: 5,
    transmission: "Автомат",
    drive: "Передний",
    fuel: "АИ-95",
    photo: "/cars/arrizo.webp",
    photoWide: "/cars/arrizo-wide.webp",
    pitch: "Представительный седан для командировок, свадеб и съёмок.",
    highlights: ["Свежий 2023 год", "Тихий салон", "Богатая комплектация"],
    rates: { "1-3": 6000, "4-7": 5000, "8-15": 4500, "16-29": 4000, "30+": 3500 },
  },
  {
    slug: "kia-optima",
    name: "Kia Optima",
    year: 2020,
    klass: "Седан D-класса",
    body: "Седан",
    seats: 5,
    transmission: "Автомат",
    drive: "Передний",
    fuel: "АИ-92",
    photo: "/cars/optima.webp",
    photoWide: "/cars/optima-wide.webp",
    pitch: "Рабочая лошадка для деловых поездок по городу и краю.",
    highlights: ["Экономичный расход", "Большой багажник", "Подогрев сидений"],
    rates: { "1-3": 5200, "4-7": 4800, "8-15": 4200, "16-29": 3800, "30+": 3200 },
  },
  {
    slug: "vw-passat",
    name: "Volkswagen Passat",
    year: 2016,
    klass: "Седан D-класса",
    body: "Седан",
    seats: 5,
    transmission: "Автомат",
    drive: "Передний",
    fuel: "АИ-95",
    photo: "/cars/passat.webp",
    photoWide: "/cars/passat-wide.webp",
    pitch: "Немецкая база: комфорт на трассе при спокойной цене.",
    highlights: ["Уверенно на трассе", "Мягкая подвеска", "Выгодно от 8 суток"],
    rates: { "1-3": 4000, "4-7": 3800, "8-15": 3500, "16-29": 3100, "30+": 2800 },
  },
  {
    slug: "hyundai-solaris",
    name: "Hyundai Solaris",
    year: 2018,
    klass: "Седан B-класса",
    body: "Седан",
    seats: 5,
    transmission: "Автомат",
    drive: "Передний",
    fuel: "АИ-92",
    photo: "/cars/solaris.webp",
    photoWide: "/cars/solaris-wide.webp",
    pitch: "Самый доступный тариф. Берут на длительную аренду и под работу.",
    highlights: ["От 2 200 ₽ в сутки", "Минимальный расход", "Прост в обслуживании"],
    rates: { "1-3": 3200, "4-7": 3000, "8-15": 2800, "16-29": 2500, "30+": 2200 },
  },
];

export const getCar = (slug: string) => cars.find((car) => car.slug === slug);

/** Самая низкая цена по всему парку — для оффера в герое. */
export const minPrice = Math.min(...cars.map((car) => car.rates["30+"]));
