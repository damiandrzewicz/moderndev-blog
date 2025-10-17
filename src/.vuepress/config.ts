import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'

function stripNumPrefix(segment: string) {
  // removes "001-", "02_", or lone "3" at the start of a path segment
  return segment.replace(/^\d+[-_]?/, "");
}

function computeCleanPermalink(relPath: string) {
  // only touch markdown files
  if (!/\.md$/i.test(relPath)) return null;

  // remove extension
  const noExt = relPath.replace(/\.md$/i, "");

  // split & clean each segment
  const segments = noExt
    .split("/")
    .map(stripNumPrefix)
    .filter(Boolean);

  // README / index => directory index
  const last = segments[segments.length - 1]?.toLowerCase();
  if (last === "readme" || last === "index") segments.pop();

  // directory-style URL
  const permalink = "/" + segments.join("/") + "/";

  // root README/index.md -> "/"
  return permalink === "//" ? "/" : permalink;
}

export default defineUserConfig({
  base: "/",

  lang: "en-US",
  title: "<ModernDev/>",
  description: "A <ModernDev/> blog",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,

  plugins: [
    (app) => ({
      name: "global-clean-permalinks",

      // Set early so routing is built from our permalink
      extendsPageOptions(options) {
        const rel = (options as any).filePathRelative as string | null;
        if (!rel) return;

        const permalink = computeCleanPermalink(rel);
        if (!permalink) return;

        options.frontmatter ??= {};
        (options.frontmatter as any).permalink = permalink;
      },

      // Also force the resolved page path (some themes/caches read this)
      extendsPage(page) {
        const rel = (page as any).filePathRelative as string | null;
        if (!rel) return;

        const permalink = computeCleanPermalink(rel);
        if (!permalink) return;

        page.frontmatter ??= {};
        page.frontmatter.permalink = permalink;

        (page as any).path = permalink;
        (page as any).data = { ...(page as any).data, path: permalink };
      },
    }),
    googleAnalyticsPlugin({
      id: 'GTM-PQS7LK84',
    }),
  ],
});
