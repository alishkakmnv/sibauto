import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-[1200px] flex-col justify-center px-5 py-32 lg:px-8">
      <p className="eyebrow">Ошибка 404</p>
      <h1 className="mt-5 max-w-[16ch] text-[clamp(2.25rem,7vw,4rem)] font-semibold leading-[1.02]">
        Такой страницы нет
      </h1>
      <p className="mt-6 max-w-[44ch] text-[17px] leading-relaxed text-fg-muted">
        Возможно, машину сняли с проката или ссылка устарела. Посмотрите весь автопарк.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/cars" variant="primary" className="max-sm:w-full">
          Автопарк
        </ButtonLink>
        <ButtonLink href="/" variant="ghost" className="max-sm:w-full">
          На главную
        </ButtonLink>
      </div>
    </section>
  );
}
