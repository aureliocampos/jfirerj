import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const SITE_URL = process.env.SITE_URL ?? "https://aureliocampos.github.io";
const BASE_PATH = process.env.BASE_PATH ?? "/jfirerj/";

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  integrations: [sitemap()],
  build: {
    inlineStylesheets: "always",
  },
});
