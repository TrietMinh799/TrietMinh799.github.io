import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://trietminh799.github.io",
  integrations: [sitemap()],
});
