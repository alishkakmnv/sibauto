"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { BookingModal } from "./BookingModal";

type BookingContextValue = {
  open: (carSlug?: string) => void;
  close: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [carSlug, setCarSlug] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  // Счётчик открытий — через него сбрасываем состояние формы, не заводя эффект.
  const [openCount, setOpenCount] = useState(0);

  const open = useCallback((slug?: string) => {
    setCarSlug(slug ?? null);
    setIsOpen(true);
    setOpenCount((value) => value + 1);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal
        key={openCount}
        isOpen={isOpen}
        carSlug={carSlug}
        onClose={close}
      />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking должен вызываться внутри <BookingProvider>");
  }
  return context;
}
