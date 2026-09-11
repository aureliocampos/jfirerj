import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

const SITE_URL = process.env.SITE_URL ?? "https://jfirerj.com.br";
const BASE_PATH = process.env.BASE_PATH ?? "/";

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  integrations: [sitemap(), icon()],
  build: {
    inlineStylesheets: "always",
  },
});
