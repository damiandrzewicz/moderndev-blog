import { getDirname, path } from "vuepress/utils";
import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/moderndev-blog/",

  lang: "en-US",
  title: "<ModernDev/>",
  description: "A <ModernDev/> blog",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
