import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Обработка персональных данных на сайте СибАвтоПрокат.",
  robots: { index: false },
};

const sections = [
  {
    title: "Какие данные мы собираем",
    text: "Имя, номер телефона, выбранный автомобиль и даты аренды — то, что вы указываете в форме заявки. Дополнительно сохраняется источник перехода на сайт.",
  },
  {
    title: "Зачем",
    text: "Чтобы связаться с вами, подтвердить бронирование и подготовить автомобиль к выдаче. Для рассылок данные не используются.",
  },
  {
    title: "Сколько храним",
    text: "До достижения цели обработки или до вашего отзыва согласия — смотря что наступит раньше.",
  },
  {
    title: "Как отозвать согласие",
    text: `Напишите или позвоните по номеру ${site.phone}. Удалим данные в течение рабочего дня.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Документы"
        title="Политика конфиденциальности"
        lead="Как мы обращаемся с персональными данными, которые вы оставляете в форме заявки."
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[760px] px-5 lg:px-8">
          <div className="border border-line bg-bg-elevated p-6 text-[14px] leading-relaxed text-fg-muted">
            <strong className="font-medium text-fg">Демо-версия.</strong> Это
            рабочая заготовка текста. Перед запуском её нужно дополнить реквизитами
            оператора (ИП или ООО, ИНН, юридический адрес) и привести в соответствие
            с 152-ФЗ вместе с юристом.
          </div>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <div key={section.title} className="border-t border-line pt-7">
                <h2 className="text-[20px] font-medium">{section.title}</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-fg-muted">
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-[13px] text-fg-subtle">
            Оператор: {site.name}, {site.addressFull}. Контакт: {site.phone}.
          </p>
        </div>
      </section>
    </>
  );
}
