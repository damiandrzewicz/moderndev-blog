import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  // Courses-only sidebar
  "/courses/": [
    "",
    {
      text: "Courses",
      icon: "book",
      // prefix: "courses/",
      children: "structure",
      // highlight when under courses
      activeMatch: "^/courses/",
    },
  ],

  // Posts-only sidebar
  "/posts/": [
    "",
    {
      text: "Articles",
      icon: "book",
      // prefix: "posts/",
      children: "structure",
      activeMatch: "^/posts/",
    },
  ],

  // Fallback (home, intro, etc.)
  "/": [
    "",
    "intro",
  ],
});
