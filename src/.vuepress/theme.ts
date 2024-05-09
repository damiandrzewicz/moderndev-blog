import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";
import { MR_HOPE_AVATAR } from "./logo.js";

export default hopeTheme({
  hostname: "https://damiandrzewicz.github.io/",

  author: {
    name: "Damian Drzewicz",
    // url: "https://mister-hope.com",
  },

  iconAssets: "fontawesome-with-brands",

  // logo: "https://theme-hope-assets.vuejs.press/logo.svg",
  logo: "/logo.svg",

  repo: "vuepress-theme-hope/vuepress-theme-hope",

  editLink: false,

  docsDir: "src",

  // navbar
  navbar,
  // navbar: [
  //   {
  //     text: "Courses",
  //     prefix: "/posts/courses/",
  //     // link: "/posts/README.md",
  //     icon: "lightbulb",
  //     // only active in `/guide/`
  //     // activeMatch: "^/posts/$",
  //     children: [
  //       {
  //         text: "C++",
  //         prefix: "cpp/",
  //         children: [
  //           "design-patterns/"
  //         ]
  //       }
  //     ]
  //   },
    // { text: "Config", link: "/config/README.md", icon: "config" },
    // {
    //   text: "FAQ",
    //   link: "/faq.md",
    //   icon: "circle-question",
    //   // active in path starting with `/faq`
    //   // so it will active in path like `/faq/xxx.html`
    //   activeMatch: "^/zh/faq/",
    // },
  // ],

  // sidebar
  sidebar: {
    // "/": "structure",
    // "/posts/": "structure",
    // "/posts/apple/": "structure",
    // "/demo/": "structure"
  },
  // sidebar: [
  //   {
  //     text: "test",
  //     lin
  //   }
  //   "": "structure",
  //   {
  //     text: "Guide",
  //     link: "/guide/README.md",
  //     icon: "lightbulb",
  //     // only active in `/guide/`
  //     activeMatch: "^/guide/$",
  //   }
  // ],

  footer: "Built with ❤️ by Damian Drzewicz",

  displayFooter: true,

  // encrypt: {
  //   config: {
  //     "/demo/encrypt.html": ["1234"],
  //   },
  // },

  blog: {
    description: "A Senior C++/Embedded Software Engineer, dedicated to crafting elegant solutions and pushing the boundaries of technology. With years of experience and a passion for problem-solving, I strive to create robust and efficient software that powers the digital world. Welcome to ModernDev, where innovation meets expertise.",
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
    avatar: "/me.jpg",
    roundAvatar: true
    // description: "C++ Senior Software Engineer, dedicated to crafting elegant solutions and pushing the boundaries of technology. With years of experience and a passion for problem-solving, I strive to create robust and efficient software that powers the digital world. Welcome to ModernDev, where innovation meets expertise."
  },

  metaLocales: {
    editLink: "Edit this page on GitHub",
  },

  // enable it to preview all changes in time
  // hotReload: true,

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

    // These features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      codetabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
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

      // install chart.js before enabling it
      // chart: true,

      // insert component easily

      // install echarts before enabling it
      // echarts: true,

      // install flowchart.ts before enabling it
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // install katex before enabling it
      // katex: true,

      // install mathjax-full before enabling it
      // mathjax: true,

      // install mermaid before enabling it
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // install reveal.js before enabling it
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // install @vue/repl before enabling it
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },

    // install @vuepress/plugin-pwa and uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
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
