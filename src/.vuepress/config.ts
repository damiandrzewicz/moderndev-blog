import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
const GA_ID = 'G-LQ71MEQPXZ'

export default defineUserConfig({
  base: "/",

  lang: "en-US",
  title: "<ModernDev/>",
  description: "A <ModernDev/> blog",

  theme,

  // Only treat selected markdown files as pages; exclude external submodule content
  // This prevents files under `src/_external/**` (e.g., git submodules) from being
  // processed as site pages by VuePress.
  pagePatterns: [
    "**/*.md",
    "!_external",
    "!**/_external/**",
    "!.vuepress",
    "!node_modules",
  ],

  // Enable it with pwa
  // shouldPrefetch: false,

  head: [
    // Favicon: prefer SVG for consistency with /logo.svg
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    // Expose GA ID for client scripts
    ['script', {}, `window.__GA_MEASUREMENT_ID__='${GA_ID}';`],
    // Consent Mode v2 default (basic mode): deny everything by default
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments)}
      gtag('consent','default',{
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        ad_storage: 'denied',
        analytics_storage: 'denied',
        wait_for_update: 500
      });
      // If user previously granted consent, update immediately and load GA
      (function(){
        try{
          var granted = localStorage.getItem('cookie-consent-v1') === 'granted';
          if(granted){
            gtag('consent','update',{
              ad_user_data: 'granted',
              ad_personalization: 'granted',
              ad_storage: 'granted',
              analytics_storage: 'granted'
            });
            var id = window.__GA_MEASUREMENT_ID__;
            if(id && !window.__gtagLoaded){
              var s=document.createElement('script');
              s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id='+id;
              s.onload=function(){
                gtag('js', new Date());
                gtag('config', id);
                window.__gtagLoaded=true;
              };
              document.head.appendChild(s);
            }
          }
        }catch(e){}
      })();
    `],
  ],

  plugins: [
    // GA is handled manually to support Consent Mode v2 (basic)
  ],
});
