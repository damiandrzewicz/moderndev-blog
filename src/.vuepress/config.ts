import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'

export default defineUserConfig({
  base: "/",

  lang: "en-US",
  title: "<ModernDev/>",
  description: "A <ModernDev/> blog",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,

  plugins: [
    googleAnalyticsPlugin({
      id: 'G-LQ71MEQPXZ',
    }),
  ],
});
