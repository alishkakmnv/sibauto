import type { MetadataRoute } from "next";
import { allowIndexing } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Пока демо закрыто, обход разрешаем намеренно: иначе робот не прочитает
  // noindex из заголовка и мета-тега и сможет проиндексировать голый URL.
  if (!allowIndexing) {
    return { rules: [{ userAgent: "*", allow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
