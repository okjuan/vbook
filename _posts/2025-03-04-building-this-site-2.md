---
modified_date: 2025-03-04
layout: post
title: "building this site #2"
permalink: /building-this-site-2
tags: journal notes coding design kaizen editing
---

Many features I've implemented on this site – e.g. {% vbook_post revisions | 2024-10-03-building-vbook %} – encourage retroactive editing of posts.
<!--more-->
Today, I implemented a minor feature in the same spirit: configurable redirects.
This allows me to easily give a post a new URL without making its previous one(s) obsolete.
All I have to do is make two configuration changes in the frontmatter of the relevant post:
1. Specify the new URL via the usual `permalink` property e.g. `'/why-write'`.
2. Add the old URL to the list specified by `redirect_from` e.g. `['/justify-writing']`.

For example, I changed {% vbook_post _okjuan.me/vbook/justify-writing_ | 2023-03-09-justify-writing %} to {% vbook_post _okjuan.me/vbook/why-write_ | 2023-03-09-justify-writing %}.
If I later decide to change the URL again e.g. to _okjuan.me/vbook/why-i-write_, I just have to set `permalink: /why-i-write` and `redirect_from: ['why-write', '/justify-writing']` in the post's frontmatter.

A nice side-effect of this change is that I can make a post's URL match its title even if I change it.
Another perk is that I can easily update _okjuan.me/vbook/now_ to point to my latest _what I'm doing now_ post.
But probably this feature's most useful effect, and the reason I thought to implement it in the first place, is that it lets me realign a post into a series.
For example, by changing the title of _how to justify writing_ to _why write?_, I can make it the first entry in a series that I can create by writing posts _why write? #2_, _why write? #3_, and so on.