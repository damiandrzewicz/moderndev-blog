import { defineClientConfig } from "vuepress/client";
import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";

import "vuepress-theme-hope/presets/bounce-icon.scss";
// import "vuepress-theme-hope/presets/left-blog-info.scss";

export default defineClientConfig({
  setup() {
    setupRunningTimeFooter(
      new Date("2024-04-08"),
      {
        "/": "Running time: :day days :hour hours :minute minutes :second seconds"
      },
      true,
    );
  },
});