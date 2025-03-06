---
modified_date: 2025-03-06
layout: post
title: "what is this site? #5"
permalink: /what-5
tags: notes coding design
---

On the surface, this is an ordinary blog.
<!--more-->
For its techno-literary lean, it could be categorized with the likes of [robinsloan.com](https://www.robinsloan.com/), [craigmod.com](https://craigmod.com/), [sive.rs](https://sive.rs), [jsomers.net](https://jsomers.net/), and [macwright.com](https://macwright.com/).
My goal, however, is not just to publish my thoughts on subjects that interest me but to promote {% vbook_post novel ways | 2023-08-11-virtual-book %} of [#reading]({{site.baseurl}}/tags/reading) and [#writing]({{site.baseurl}}/tags/writing).
I attempt to do this not only through the ideas I discuss on site but also through the custom features I build into its interface, which allow readers to explore the content on this site according to their curiosity:

| features | motivation | notes | date implemented |
| -------- | ---------- | ----- | ---------------- |
| tags | tags are a great way to connect ideas without forcing them into a hierarchy. in general, a network is better way to organize information. it's simple, meaningful, and less restrictive. I think the [Composition Over Inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance) principle of programming depends on similar insight. others have written about this e.g. [Folders Kill Creativity](https://www.mentalnodes.com/folders-kill-creativity). | originally implemented [in okjuan.github.io](https://github.com/okjuan/okjuan.github.io/pull/10) repo, predecessor of [vbook](https://github.com/okjuan/vbook). hardest feature to implement because I knew the least about Jekyll and GitHub Pages at that point. see [the PR description](https://github.com/okjuan/okjuan.github.io/pull/10#issue-1604361048) for more info. | May '23 |
| backlinks | helps make this site explorable and interconnected {% vbook_post like Wikipedia | 2024-01-17-what %}. | implemented as a custom [Liquid](https://shopify.github.io/liquid/) tag. | Nov '23 |
| hoverbox post previews | allows readers to peek at linked posts without leaving the current context, like in Wikipedia. I've seen other interesting designs for this sort of thing. The [original wiki](https://wiki.c2.com/) opens [hoverboxes](https://en.wikipedia.org/wiki/Hoverbox) on _click_ instead of hover and leaves them open until the user clicks outside them. Links in Andy Matuschak's [Zettelkasten notes](https://andymatuschak.org/) open in vertical columns to the right of the post, preserving the reading context and allowing the reader to see a progressive trail of thought in sequence. there are many possibilities. another that occurs to me is to reveal the linked post's content as a dropdown on click. | required JavaScript, although I intend to refactor them to rely only [on HTML and CSS](https://github.com/okjuan/vbook/issues/38).| Mar '24 |
| sort by modification date | discourages staleness of pieces by encouraging me to update and rework them. | implemented with a git pre-commit hook. explained in the **coding** section of {% vbook_post this /now update | 2024-07-07-now %}. discussed in {% vbook_post this post | 2024-10-03-building-vbook %}. | Sept '24 |
| revisions | gives insight into my writing process by letting readers examine the evolution of select posts. | discussed in {% vbook_post this post | 2024-10-03-building-vbook %}. | Sept '24 |
| redirects | another feature that promotes retroactive changes. it lets me easily change a post's URL without breaking the old one. | discussed in {% vbook_post this post | 2025-03-04-building-this-site-2 %}. | Mar '25 |
| post series links | a simple but important ingredient that makes this site {% vbook_post booklike | 2024-11-29-what-3 %}. | implementation is similar to that of revisions, but simpler because it doesn't involve generating new pages. | Mar '25 |

I use [GitHub Issues](https://github.com/okjuan/vbook/issues) to track problems and potential improvements.

I started developing this site [in February 2023](https://github.com/okjuan/howto/commit/5713a2fd87c532192a76c67bed3d33bb2f9551c5).
The fundamental unit of this site is a post.
What you're reading right now is a post.
I often call them "pieces", too.
I write each post as a [Markdown](https://en.wikipedia.org/wiki/Markdown) text file using a text editor, usually [VS Code](https://code.visualstudio.com/) and occasionally [vim](https://www.vim.org/).
From those text files, [Jekyll](https://jekyllrb.com/) generates the site's HTML and CSS using the [Minima](https://github.com/jekyll/minima) layout theme and the [Solarized](https://en.wikipedia.org/wiki/Solarized) color palette.
I have tweaked fonts, spacing, and other UI details by modifying the `_sass/minima/_layout.scss` file.
The features described in the table above are implemented using [Ruby](https://www.ruby-lang.org/en/) plugins and [Liquid](https://shopify.github.io/liquid/).

The site is static and consists mostly of HTML and CSS and a little bit of JavaScript.
It's hosted for free on [GitHub Pages](https://pages.github.com/).
The only money I've spent so far was on the domain `okjuan.me`, which I bought in June 2023 from [bookmyname.com](http://bookmyname.com/) for ten years for €156 and configured `okjuan.github.io` to point to it.

To publish a post, I commit it to the `main` branch of [`vbook` GitHub repo](https://github.com/okjuan/vbook).
I configured that repo to publish on GitHub Pages as `okjuan.github.io/vbook`, which gets resolved by DNS to `okjuan.me/vbook`.
GitHub provides a default process for building Jekyll sites and publishing them to the web, but I use the community-built [Jekyll Deploy Action](https://github.com/marketplace/actions/jekyll-deploy-action) because I have several custom plugins and GitHub [only supports a few select plugins](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#plugins).