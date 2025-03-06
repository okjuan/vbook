---
modified_date: 2025-03-05
layout: post
title: "what is this site? #5"
permalink: /what-5
tags: notes coding design
---

On the surface, this is an ordinary blog.
<!--more-->
For its techno-literary lean I might categorize it with the likes of [robinsloan.com](https://www.robinsloan.com/), [craigmod.com](https://craigmod.com/), [sive.rs](https://sive.rs), [jsomers.net](https://jsomers.net/), and [macwright.com](https://macwright.com/).
My goal however is not just to publish my thoughts on similar subjects, but to promote {% vbook_post novel ways of reading and writing | 2023-08-11-virtual-book %} through the design of this site's structure and interface.

Here are the custom features I've implemented so far:

| features | motivation | date implemented |
| -------- | ----- | ---------------- |
| tags | originally implemented [in okjuan.github.io](https://github.com/okjuan/okjuan.github.io/pull/10) repo, predecessor of [vbook](https://github.com/okjuan/vbook). hardest feature to implement because I knew the least about Jekyll and GitHub Pages at that point. see [the PR description](https://github.com/okjuan/okjuan.github.io/pull/10#issue-1604361048) for more info. | May '23|
| backlinks | helps make this site {% vbook_post explorable and interconnected | 2024-01-17-what %} like Wikipedia. | Nov '23 |
| hoverbox post previews | required JavaScript, although I intend to refactor them to rely only [on HTML and CSS](https://github.com/okjuan/vbook/issues/38).| March '24 |
| sort by modification date | encourages me to update and rework pieces as explained in the **coding** section of {% vbook_post this /now update | 2024-07-07-now %}. discussed in {% vbook_post this post | 2024-10-03-building-vbook %}. | Sept '24 |
| revisions | lets me and hypothetical readers examine the evolution of select posts. gives insight into my writing process. discussed in {% vbook_post this post | 2024-10-03-building-vbook %}. | Sept '24 |
| redirects | lets me easily change a post's URL without breaking the old one. discussed in {% vbook_post this post | 2025-03-04-building-this-site-2 %}. | March '25 |
| post series links | a simple but important ingredient that makes this site {% vbook_post booklike | 2024-11-29-what-3 %}. | March '25 |

I use [GitHub Issues](https://github.com/okjuan/vbook/issues) to track problems and potential improvements.

I started developing this site [in February 2023](https://github.com/okjuan/howto/commit/5713a2fd87c532192a76c67bed3d33bb2f9551c5).
I write the site's content in [Markdown](https://en.wikipedia.org/wiki/Markdown) text files and from them I generate the site's HTML and CSS using [Jekyll](https://jekyllrb.com/).
The layout is based on the [Minima](https://github.com/jekyll/minima) Jekyll theme and the colors on the [Solarized](https://en.wikipedia.org/wiki/Solarized) theme.
The customizations listed above are implemented using [Ruby](https://www.ruby-lang.org/en/) plugins and [Liquid](https://shopify.github.io/liquid/).

The site is static and consists mostly of HTML and CSS and a little bit of JavaScript.
It's hosted for free on [GitHub Pages](https://pages.github.com/).
However, I did spend money on the domain `okjuan.me`, which I bought in June 2023 from [bookmyname.com](http://bookmyname.com/) for ten years for €156 and configured `okjuan.github.io` to point to it.

The fundamental unit of this site is a post.
What you're reading right now is a post.
I often call them "pieces", too.
I write each post in [Markdown](https://en.wikipedia.org/wiki/Markdown) using a text editor, usually [VS Code](https://code.visualstudio.com/) and occasionally [vim](https://www.vim.org/).

To publish a post, I commit it to the `main` branch of [vbook GitHub repo](https://github.com/okjuan/vbook).
I configured that repo to publish on GitHub Pages as `okjuan.github.io/vbook`, which gets resolved by DNS to `okjuan.me/vbook`.
GitHub provides a default process for building Jekyll sites and publishing them to the web, but I use the community-built [Jekyll Deploy Action](https://github.com/marketplace/actions/jekyll-deploy-action) because I have several custom plugins and GitHub [only supports a few select plugins](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#plugins).