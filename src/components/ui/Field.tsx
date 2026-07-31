import type { ComponentProps, ReactNode } from "react";

const control =
  "h-12 w-full rounded-[4px] border border-line bg-surface px-4 text-[15px] text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-fg";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export function Input({ className = "", ...props }: ComponentProps<"input">) {
  return <input className={`${control} ${className}`} {...props} />;
}

export function Select({ className = "", children, ...props }: ComponentProps<"select">) {
  return (
    <span className="relative block">
      <select className={`${control} appearance-none pr-11 ${className}`} {...props}>
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-fg-subtle"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </span>
  );
}
