# Источники изображений

Все фотографии в демо — иллюстративные, взяты из открытых источников под свободными
лицензиями. Файлы обработаны (кадрирование, цветокоррекция под тёмную палитру)
скриптом `scripts/prepare-images.mjs`; исходники — в `scripts/raw`.

**В боевой версии эти файлы заменяются снимками реального парка. После замены
этот файл нужно обновить или удалить.**

## Соответствие поколений

Фото подобраны не просто «по названию модели», а по поколению под год из парка —
иначе клиент заметит подмену.

| Машина в парке | Что на фото | Совпадает |
|---|---|---|
| Haval Jolion 2024 | Jolion 1-го поколения, снят в Москве в 2024 | да |
| Kia Optima 2020 | Optima 2020 модельного года | да |
| VW Passat 2016 | Passat **B8** (2015+) | да, поколение то же |
| Hyundai Solaris 2018 | Solaris **HC**, 2-е поколение до рестайлинга (2017–2020) | да, поколение то же |
| Chery Arrizo 2023 | Arrizo **GX** | **нет уверенности** — в данных клиента не указана модификация (Arrizo 5 / 8 / GX). Уточнить у Дениса, см. `STRATEGY.md`, п. 4.1 |

Цвет кузова на фото не совпадает с реальными машинами ни у одной позиции —
это ожидаемо для демо.

## Атрибуция

| Файл в `public/cars` | Исходник | Автор | Лицензия |
|---|---|---|---|
| `passat.webp`, `passat-wide.webp`, `hero.webp` | Wikimedia Commons, *VW Passat B8 Limousine 2.0 TDI Highline.JPG* | TD (Thomas Doerfer) | CC BY-SA 3.0 |
| `solaris.webp`, `solaris-wide.webp` | Wikimedia Commons, *Hyundai Solaris (HC).jpg* | Milhouse35 | CC BY-SA 4.0 |
| `optima.webp`, `optima-wide.webp` | Wikimedia Commons, *2020 Kia Optima EX, Front Right, 05-30-2021.jpg* | SsmIntrigue | CC BY-SA 4.0 |
| `jolion.webp`, `jolion-wide.webp` | Wikimedia Commons, *Haval Jolion 1st gen in Moscow 2024 front.jpg* | Nord794ub | CC BY-SA 4.0 |
| `arrizo.webp`, `arrizo-wide.webp` | Wikimedia Commons, *Chery Arrizo GX 005.jpg* | Jengtingchen | CC BY-SA 4.0 |
| `krasnoyarsk.webp` | Wikimedia Commons, *Krasnoyarsk, City street, Russia.jpg* | Vyacheslav Argenberg | CC BY 4.0 |
| `interior.webp` | rawpixel через Openverse, *Car interior, steering wheel photo* | — | CC0 1.0 |

Лицензии CC BY / CC BY-SA требуют указания авторства и сохранения ссылки на лицензию —
поэтому таблица выше остаётся в репозитории, а краткая строка атрибуции стоит в подвале
сайта, пока фото не заменены.

Шрифт: **Inter** (SIL Open Font License 1.1), подключён через `next/font`.
