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

  head: [
    ['link', { rel: 'stylesheet', href: 'https://unpkg.com/@antonz/codapi@0.19.0/dist/snippet.css'}],
    ['script', { src: 'https://unpkg.com/@antonz/codapi@0.19.0/dist/snippet.js' }],
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});
