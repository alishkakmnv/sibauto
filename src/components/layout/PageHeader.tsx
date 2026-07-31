import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, lead, children }: Props) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-[1200px] px-5 pb-16 pt-32 lg:px-8 lg:pb-20 lg:pt-40">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-[18ch] text-[clamp(2.25rem,6vw,3.75rem)] font-semibold leading-[1.02]">
          {title}
        </h1>
        {lead && (
          <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-fg-muted sm:text-[18px]">
            {lead}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
