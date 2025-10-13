import { navbar } from "vuepress-theme-hope";

export default navbar([
  // Home
  "/",

  {
    text: "Courses",
    prefix: "/courses/",
    // link: "/posts/README.md",
    icon: "book",
    // only active in `/guide/`
    // activeMatch: "^/posts/$",
    children: [
      {
        text: "C++",
        link: "cpp/README.md",
      }
    ]
  },

  // Blog index (general posts)
  { text: "Blog", icon: "pen-to-square", link: "/posts/" },

  // About page (uses existing src/intro.md)
  { text: "About", icon: "circle-info", link: "/intro.html" },
]);
