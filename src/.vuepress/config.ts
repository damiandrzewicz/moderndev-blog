import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'

const GA_ID = 'G-LQ71MEQPXZ'

export default defineUserConfig({
  base: "/",

  lang: "en-US",
  title: "<ModernDev/>",
  description: "A <ModernDev/> blog",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,

  head: [
    // Expose GA ID
    ['script', {}, `window.__GA_MEASUREMENT_ID__='${GA_ID}';`],
    // Start with analytics disabled until consent
    ['script', {}, `window['ga-disable-${GA_ID}']=true;`],
    // (Optional) Consent Mode default
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)}
      gtag('consent','default',{analytics_storage:'denied'});
    `],
  ],

  plugins: [
    googleAnalyticsPlugin({ id: GA_ID }),
  ],
});
