import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/pricing";

const points = [
  {
    title: "Цена без звонка",
    text: "Калькулятор на сайте считает по тем же тарифам, что и менеджер. Никаких «уточняйте по телефону».",
  },
  {
    title: "Скидка за срок",
    text: "Пять тарифных ступеней: от 1–3 суток до месяца и дольше. Чем дольше берёте — тем дешевле сутки.",
  },
  {
    title: `Залог ${formatPrice(site.deposit)}`,
    text: "Одна фиксированная сумма за любую машину парка. Возвращаем при сдаче авто без повреждений.",
  },
  {
    title: "Выдача 24/7",
    text: "Ночной рейс или ранний вылет — отдадим ключи в любое время. Адрес один: Брянская, 142.",
  },
];

export function Why() {
  return (
    <section className="relative border-t border-line">
      {/* Фото-подложка: интерьер, без «бизнес-людей с ноутбуком» */}
      <div className="absolute inset-0">
        <Image
          src="/cars/interior.webp"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-bg/85" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 py-24 lg:px-8 lg:py-32">
        <p className="eyebrow">Почему мы</p>
        <h2 className="mt-5 max-w-[20ch] text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05]">
          Четыре причины не искать дальше
        </h2>

        <div className="mt-16 grid border-t border-line sm:grid-cols-2 sm:gap-x-16">
          {points.map((point, index) => (
            <Reveal key={point.title} delay={index * 0.06} className="h-full">
              <div className="h-full border-b border-line py-9">
                <h3 className="text-[22px] font-medium leading-tight">{point.title}</h3>
                <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-fg-muted">
                  {point.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
