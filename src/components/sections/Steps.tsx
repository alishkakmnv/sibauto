import { BookingButton } from "@/components/booking/BookingButton";
import { ButtonLink } from "@/components/ui/Button";

export const steps = [
  {
    n: "01",
    title: "Выбрали и посчитали",
    text: "Калькулятор на сайте показывает точную сумму за ваши даты. Тариф подставляется сам.",
  },
  {
    n: "02",
    title: "Оставили заявку",
    text: "Имя, телефон, даты. Перезваниваем в течение 15 минут и закрепляем машину за вами.",
  },
  {
    n: "03",
    title: "Забрали ключи",
    text: "Паспорт, права, залог — и вы уехали. Договор подписываем на месте, за 10 минут.",
  },
];

/** Светлая полоса — чередование тёмное/светлое из DESIGN.md. */
export function Steps() {
  return (
    <section className="bg-band text-band-fg">
      <div className="mx-auto max-w-[1200px] px-5 py-24 lg:px-8 lg:py-32">
        <p className="text-[11px] uppercase leading-none tracking-[0.18em] text-black/45">
          Как арендовать
        </p>
        <h2 className="mt-5 max-w-[18ch] text-[clamp(2rem,5vw,3rem)] font-semibold leading-[1.05]">
          Три шага до ключей
        </h2>

        <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {steps.map((step) => (
            <li key={step.n} className="border-t border-black/15 pt-7">
              <span className="text-[13px] font-medium tracking-[0.06em] text-accent">
                {step.n}
              </span>
              <h3 className="mt-4 text-[22px] font-medium leading-tight">{step.title}</h3>
              <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-black/60">
                {step.text}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col gap-3 sm:flex-row">
          <BookingButton variant="accent" className="max-sm:w-full">
            Оставить заявку
          </BookingButton>
          <ButtonLink href="/how" variant="ghost-dark" className="max-sm:w-full">
            Документы и условия
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
