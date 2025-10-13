import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Articles",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    {
      text: "Courses",
      icon: "book",
      prefix: "courses/",
      children: "structure",
    },
    "intro"
  ],
});
