import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { allowIndexing } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Демо закрыто от поиска, пока Денис не согласовал публикацию. См. lib/seo.ts
  robots: allowIndexing
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, noimageindex: true },
      },
  title: {
    default: `${site.name} — аренда авто в Красноярске от 2 200 ₽/сутки`,
    template: `%s — ${site.name}`,
  },
  description:
    "Прокат автомобилей в Красноярске: посчитайте стоимость за 10 секунд и забронируйте онлайн. Свежий парк, залог 5 000 ₽, выдача круглосуточно.",
  keywords: [
    "аренда авто Красноярск",
    "прокат автомобилей Красноярск",
    "аренда машины без залога",
    "прокат авто Брянская 142",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: site.name,
    title: `${site.name} — аренда авто в Красноярске`,
    description:
      "Посчитайте стоимость за 10 секунд и забронируйте в один клик. Чем дольше аренда — тем дешевле сутки.",
    images: ["/cars/hero.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <BookingProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
