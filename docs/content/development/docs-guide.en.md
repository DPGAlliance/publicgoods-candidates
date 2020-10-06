---
title: "Documentation guide"

---

<!-- NOTE: This document is written with the one-sentence-per-line convention: https://asciidoctor.org/docs/asciidoc-recommended-practices/#one-sentence-per-line -->

This page provides instructions on how to add new pages to this documentation site and how to run it locally.
This documentation site is powered by [Hugo](https://gohugo.io/).


## How to add new docs

All documentation is in Markdown format.
For help writing in Markdown, see this [basic syntax guide](https://www.markdownguide.org/basic-syntax "Basic Syntax | Markdown Guide").

New content must be added to the [`docs/content/`](https://github.com/unicef/publicgoods-candidates/blob/master/docs/content) directory.
There, you will find more sub-directories (a.k.a. categories) with specific pages added to this folder.
As of October 2020, the directory structure looks like this:

```sh
content/
├── development
│   ├── docs-guide.en.md
│   └── _index.en.md
├── _index.en.md
└── legal
    ├── _index.en.md
    └── licensing.en.md
```

To create a new category, make a new directory and add an `_index.en.md` file to the folder.
See existing `_index.en.md` files for examples.


## How to test docs locally

Sometimes you may want to test how your changes look in the documentation site before making a new Pull Request.
This section explains how to render a local preview on your developer workstation:

1. Install Hugo (see [official documentation](https://gohugo.io/getting-started/installing/))
1. Change directories to docs directory (`cd docs/`)
1. Run `hugo serve`
1. In your browser, open [`localhost:1313/publicgoods-candidates/`](http://localhost:1313/publicgoods-candidates/)

You should see a local preview of the docs site.


## Update Hugo theme

On rare occasion, an update may need to be applied to the documentation site theme.
Currently, this repo uses the [hugo-geekdoc](https://github.com/xoxys/hugo-geekdoc) theme.
It is added as a [git submodule](https://devconnected.com/how-to-add-and-update-git-submodules/) to this repository (see [`.gitmodules`](https://github.com/unicef/publicgoods-candidates/blob/master/.gitmodules)).

To update the Hugo theme, run this git command from the same directory as `.gitmodules`:

```sh
git submodule update --remote --merge
```
