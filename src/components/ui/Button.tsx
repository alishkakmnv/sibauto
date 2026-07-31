import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "accent" | "ghost" | "ghost-dark";

/** Tesla-pill: почти прямоугольная, uppercase, широкий трекинг. */
const base =
  "inline-flex h-12 items-center justify-center rounded-[4px] px-8 text-[13px] font-medium uppercase tracking-[0.06em] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-white/85",
  accent: "bg-accent text-white hover:bg-accent-hover",
  ghost: "border border-white/45 text-fg hover:border-fg hover:bg-white/5",
  "ghost-dark":
    "border border-black/25 text-band-fg hover:border-band-fg hover:bg-black/5",
};

type Props = {
  variant?: Variant;
  full?: boolean;
  className?: string;
  children: ReactNode;
};

export function buttonClass({
  variant = "primary",
  full,
  className = "",
}: Omit<Props, "children">) {
  return [base, variants[variant], full ? "w-full" : "", className]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  variant,
  full,
  className,
  children,
  ...props
}: Props & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={buttonClass({ variant, full, className })} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  full,
  className,
  children,
  ...props
}: Props & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link className={buttonClass({ variant, full, className })} {...props}>
      {children}
    </Link>
  );
}
