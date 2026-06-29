// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// Update this to the final production domain before launch.
const SITE = "https://www.elena-roehrborn.de";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: "ignore",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "de",
        locales: { de: "de-DE" },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
