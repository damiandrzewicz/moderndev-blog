import { hopeTheme } from "vuepress-theme-hope";
import { getDirname, path } from "vuepress/utils";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://moderndev.eu/",

  author: {
    name: "Damian Drzewicz",
    // url: "https://mister-hope.com",
  },

  logo: "/logo.svg",

  repo: "vuepress-theme-hope/vuepress-theme-hope",

  editLink: false,

  docsDir: "src",

  // navbar
  navbar,

  // sidebar
  sidebar,

  footer: "Built with ❤️ by Damian Drzewicz",

  displayFooter: true,

  // encrypt: {
  //   config: {
  //     "/demo/encrypt.html": {
  //       hint: "Password: 1234",
  //       password: "1234",
  //     },
  //   },
  // },

  blog: {
    description: "A Senior C++/Embedded Software Engineer.</br></br>Dedicated to:</br> - crafting elegant solutions</br> - pushing the boundaries of technology.</br></br>With years of experience and a passion for problem-solving, strive to create robust and efficient software that powers the digital world.",
    // intro: "/intro.html",
    medias: {
      // Baidu: "https://example.com",
      // BiliBili: "https://example.com",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      // Email: "mailto:damian.drzewicz@gmail.com",
      // Evernote: "https://example.com",
      // Facebook: "https://example.com",
      // Flipboard: "https://example.com",
      // Gitee: "https://example.com",
      GitHub: "https://github.com/damiandrzewicz",
      // Gitlab: "https://example.com",
      Gmail: "mailto:damian.drzewicz@gmail.com",
      // Instagram: "https://example.com",
      // Lark: "https://example.com",
      // Lines: "https://example.com",
      Linkedin: "https://www.linkedin.com/in/damian-drzewicz",
      // Pinterest: "https://example.com",
      // Pocket: "https://example.com",
      // QQ: "https://example.com",
      // Qzone: "https://example.com",
      // Reddit: "https://example.com",
      // Rss: "https://example.com",
      // Steam: "https://example.com",
      // Twitter: "https://example.com",
      // Wechat: "https://example.com",
      // Weibo: "https://example.com",
      // Whatsapp: "https://example.com",
      // Youtube: "https://example.com",
      // Zhihu: "https://example.com",
      // MrHope: ["https://mister-hope.com", MR_HOPE_AVATAR],
    },
    avatar: "/assets/images/me.jpg",
    // roundAvatar: true
    // description: "C++ Senior Software Engineer, dedicated to crafting elegant solutions and pushing the boundaries of technology. With years of experience and a passion for problem-solving, I strive to create robust and efficient software that powers the digital world. Welcome to ModernDev, where innovation meets expertise."
  },

  metaLocales: {
    editLink: "Edit this page on GitHub",
  },

  // enable it to preview all changes in time
  // hotReload: true,

  // These features are enabled for demo, only preserve features you need here
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: {
      // Allow `<!-- @include: ... -->` to use convenient prefixes
      // - "@src/" or "@/" => resolved from docs source dir (src)
      // - "/" => resolved from docs source dir (src)
      resolvePath: (file) => {
        const __dirname = getDirname(import.meta.url);
        if (file.startsWith("@src/"))
          return path.resolve(__dirname, "..", file.slice("@src/".length));

        // if (file.startsWith("@/"))
        //   return path.resolve(__dirname, "..", file.slice("@/".length));

        // if (file.startsWith("/"))
        //   return path.resolve(__dirname, "..", file.slice(1));

        return file;
      },
    },
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,
    preview: true,

    // uncomment these if you need TeX support
    math: {
    //   // install katex before enabling it
      type: "katex",
    //   // or install mathjax-full before enabling it
    //   type: "mathjax",
    },

    // install chart.js before enabling it
    chartjs: true,

    // install echarts before enabling it
    echarts: true,

    markmap: true,

    // install flowchart.ts before enabling it
    // flowchart: true,

    // install mermaid before enabling it
    mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // install @vue/repl before enabling it
    // vuePlayground: true,

    // install sandpack-vue3 before enabling it
    // sandpack: true,

    // install @vuepress/plugin-revealjs and uncomment these if you need slides
    revealjs: {
      plugins: ["highlight", "math", "search", "notes", "zoom"],
    },
  },

  plugins: {
    blog: true,

    // Install @waline/client before enabling it
    // Note: This is for testing ONLY!
    // You MUST generate and use your own comment service in production.
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline-comment.vuejs.press",
    // },

    components: {
      components: ["Badge", "VPCard"],
    },

    icon: {
      prefix: "fa6-solid:",
    },

    // install @vuepress/plugin-pwa and uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
