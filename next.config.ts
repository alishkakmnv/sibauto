import path from "node:path";
import type { NextConfig } from "next";

// Продублировано из src/lib/seo.ts: конфиг грузится вне алиасов приложения.
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

const nextConfig: NextConfig = {
  // В домашней папке пользователя лежит посторонний package-lock.json —
  // без этого Next выбирает её корнем воркспейса.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },

  async headers() {
    if (allowIndexing) return [];

    // Заголовок закрывает и страницы, и картинки — включая те, что отдаются
    // мимо HTML и до которых мета-тег не достаёт.
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, noimageindex",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
