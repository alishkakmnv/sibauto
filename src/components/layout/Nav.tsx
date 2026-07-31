"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useBooking } from "@/components/booking/BookingProvider";
import { nav, site } from "@/lib/site";

const subscribeToScroll = (onChange: () => void) => {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
};

/** Проскроллена ли страница ниже шапки. Без эффектов — читаем внешний источник. */
function useScrolled() {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 24,
    () => false,
  );
}

export function Nav() {
  const pathname = usePathname();
  const booking = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();

  // Прозрачная поверх героя, при скролле — фон. На внутренних страницах героя нет.
  const overHero = pathname === "/" && !scrolled;

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        overHero ? "bg-transparent" : "border-b border-line bg-bg/95 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:h-[72px] lg:px-8">
        <Link
          href="/"
          className="text-[15px] font-semibold uppercase tracking-[0.14em]"
          aria-label={`${site.name} — на главную`}
        >
          Сиб<span className="text-accent">Авто</span>Прокат
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] uppercase tracking-[0.08em] transition-colors ${
                pathname.startsWith(item.href)
                  ? "text-fg"
                  : "text-fg-muted hover:text-fg"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <a
            href={site.phoneHref}
            className="text-[15px] font-medium tracking-tight transition-colors hover:text-accent"
          >
            {site.phone}
          </a>
          <button
            type="button"
            onClick={() => booking.open()}
            className="h-10 rounded-[4px] bg-fg px-6 text-[12px] font-medium uppercase tracking-[0.06em] text-bg transition-colors hover:bg-white/85"
          >
            Забронировать
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          className="-mr-3 flex h-11 w-11 items-center justify-center md:hidden"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <path d="M5 5l14 14M19 5L5 19" />
            ) : (
              <path d="M3 7h18M3 17h18" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-bg md:hidden"
          >
            <div className="space-y-1 px-5 py-6">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex h-12 items-center text-lg tracking-tight"
                >
                  {item.label}
                </Link>
              ))}

              <a
                href={site.phoneHref}
                onClick={closeMenu}
                className="flex h-12 items-center text-lg tracking-tight text-accent"
              >
                {site.phone}
              </a>

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  booking.open();
                }}
                className="mt-4 h-12 w-full rounded-[4px] bg-fg text-[13px] font-medium uppercase tracking-[0.06em] text-bg"
              >
                Забронировать
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
