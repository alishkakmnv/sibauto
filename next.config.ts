import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // В домашней папке пользователя лежит посторонний package-lock.json —
  // без этого Next выбирает её корнем воркспейса.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
