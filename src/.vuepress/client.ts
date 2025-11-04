import { defineClientConfig } from "vuepress/client";
import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";
import CookieBanner from './components/CookieBanner.vue'
import { h } from 'vue'

import "vuepress-theme-hope/presets/bounce-icon.scss";
// import "vuepress-theme-hope/presets/left-blog-info.scss";

export default defineClientConfig({
  setup() {
    setupRunningTimeFooter(
      new Date("2025-10-14"),
      {
        "/": "Running time: :day days :hour hours :minute minutes :second seconds"
      },
      true,
    );
  },
  rootComponents: [() => h(CookieBanner)],
});