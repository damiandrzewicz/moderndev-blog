---
title: How to create a VuePress blog
date: 2021-12-30 22:06:00
excerpt: Description how to create a blog by using VuePress. General process and few issues.
type: post
blog: true
tags:
    - VuePress
    - Blog
image: "/posts/how-create-vuepress-blog/vuepress.png"
---

## How to create a VuePress blog?

My first attempts to create blog were based on `Wordpress`. I was lost in the amout of plugins and extensions. Finally when I found desired one I had difficulties to properly configure them. So I decided to drop this idea and found `Jekyll`. It's another static site generator. It was prepared especially for blogging. Unfortunately it wasn't as powerfull as `VuePress`.

Defaultly `VuePress` is designed for technical documentation. To use it as a *blog* it's necessary to provide some additional features:
- pagination sorted by most recent posts
- ability to search for posts via headings within the post
- archived posts page
- basic scheduling for future publishing
- basic tagging for posts
- automatic RSS feed generation
- use `Google Analytics`

All these things has been implemented by *bencodezen* [here](https://github.com/bencodezen/vuepress-blog-boilerplate).
That's template for blog which implements all mentioned features. One of biggest advantage of `VuePress` is ability to write content/posts in [markdown](https://www.markdownguide.org/basic-syntax/). Its engine converts each Markdown file to a prerendered static `HTML` page. Since it is statically rendered, the application is fast and SEO-friendly. The site still uses Vue.js under the hood, meaning it is still an SPA after the initial page load, so we enjoy smooth navigation features as well.

First execute following commands to download `VuePress` blog template:

```shell
git clone https://github.com/bencodezen/vuepress-blog-boilerplate.git
cd vuepress-blog-boilerplate
npm install
npm run dev
```

When all dependencies are fetched and development server is running, site is ussually visible at `http://localhost:8080`.

::: warning
Unfortunately I got missing `moment` library error:

![An image](/posts/how-create-vuepress-blog/missing_moemnt_pkg.png)
*Fig. 1. Missing `moment` library.*

To solve it install `moment` library package:

```shell
npm install --save moment
```
:::



### Custom Requirements

Markdown processor is awesome and has a lot of fetaures. Unfortunately not all are included. My additional, custom requirements are:
- **support for `plantuml`** - by using special [syntax](https://plantuml.com/) enclosed in `@plantuml` tags allows to draw `UML` diagrams,
- **support for `chartjs`** - plugin `vuepress-plugin-chart@next` for adding JavaScript charting library [ChartJS](https://www.chartjs.org/) to `VuePress`,
- **support for `latex`** - allows to draw mathematical equations in beautiful way.

I used following `markdown` template to see how output is rendered:

<<< @/src/.vuepress/public/posts/how-create-vuepress-blog/custom_features_example.md{1,20,23}

Where:
1. example of `plantuml`
2. example of `latex` 
3. example of `chartjs`

This is output of rendered page. None of above items were processed:

![An image](/posts/how-create-vuepress-blog/bad_post.png)
*Fig. 2. Missing render for elements.*

### 1'st requirement - `plantuml`

To make `plantuml` work with `VuePress` it's necessary to install [markdown-it-plantuml](https://www.npmjs.com/package/markdown-it-plantuml) plugin:

```shell
npm install --save markdown-it-plantuml
```

Then plugin needs to be enabled in `.vuepress/config.js`:

```js
...
	markdown: {
		extendMarkdown: md => {
		  md.set({ html: true })
		  md.use(require('markdown-it-plantuml'))
		}
	}
...
```

Rendered result is following:

![An image](/posts/how-create-vuepress-blog/plantuml_ok.png)
*Fig.3. Rendered `plantuml` syntax*

### 2'nd requirement - `chartjs`

Plugin [vuepress-plugin-chart](https://github.com/Renovamen/vuepress-theme-gungnir/tree/main/packages/plugins/chart) needs to be installed:

```shell
npm install vuepress-plugin-chart --save
```

Then plugin needs to be enabled in `.vuepress/config.js`:

```js{5}
	plugins: [
        ...
		'vuepress-plugin-reading-time',
		'vuepress-plugin-janitor',
		'vuepress-plugin-chart'
	],
```

Rendered result is following:

![An image](/posts/how-create-vuepress-blog/chartjs_ok.png)
*Fig. 4. Rendered `chartjs` syntax*


::: warning
Meantime I got error for missing `json-fn` library. It can be installed:
```shell
npm install --save json-fn
```
:::

### 3'rd requirement - `latex`

Last plugin which supports `latex` processing is [vuepress-plugin-mathjax](https://vuepress-community.netlify.app/en/plugins/mathjax). To install:

```shell
npm install --save vuepress-plugin-mathjax
```

Add to `.vuepress/config.js`:

```js
  plugins: [
    [
      'vuepress-plugin-mathjax',
      {
        target: 'svg',
        macros: {
          '*': '\\times',
        },
      },
    ],
  ],
```

![An image](/posts/how-create-vuepress-blog/latex_ok.png)
*Fig. 5. Rendered `latex` syntax*

## Summary

After installation of all plugins, finally rendered page looks following:

![An image](/posts/how-create-vuepress-blog/all_ok.png)
*Fig. 6. Finally rendered page*

Where:
1. Output for rendered `plantuml` script,
2. Output for rendered `latex` script,
3. Chart from `chartjs`.