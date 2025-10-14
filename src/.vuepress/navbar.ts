import { navbar } from "vuepress-theme-hope";

export default navbar([
  // Home
  "/",

  {
    text: "Courses",
    icon: "book",
    prefix: "/courses/",
    // link: "/courses/",        // parent is a real link
    // activeMatch: "^/courses/",
    children: [
      { text: "Back to basics", link: "001-back-to-basics/" },
      { text: "C++", link: "002-cpp/" },
    ],
  },

  // { text: "Courses", icon: "pen-to-square", link: "/courses/" },

  // Blog index (general posts)
  { text: "Blog", icon: "pen-to-square", link: "/posts/" },

  // About page (uses existing src/intro.md)
  { text: "About", icon: "circle-info", link: "/intro.html" },
]);
