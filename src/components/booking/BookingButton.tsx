"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { useBooking } from "./BookingProvider";

type Props = {
  carSlug?: string;
  variant?: "primary" | "accent" | "ghost" | "ghost-dark";
  full?: boolean;
  className?: string;
  children: ReactNode;
};

export function BookingButton({ carSlug, children, ...rest }: Props) {
  const booking = useBooking();

  return (
    <Button {...rest} onClick={() => booking.open(carSlug)}>
      {children}
    </Button>
  );
}
