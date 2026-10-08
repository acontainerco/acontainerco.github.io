# Container — acontainer.co

Source for the website of **Container**, a book arts press publishing language in novel forms: objects that are rarely "book-like," from View-Master™ reels (Look Books) to transformed everyday objects (Multitudes) to one-off editions like *Saw Palmettos* and *Easter Wings*.

The site is built with [Eleventy (11ty)](https://www.11ty.dev/) and deployed to GitHub Pages.

## Quick start

Requires Node.js and npm.

```sh
npm install
npm run serve   # dev server with live reload at http://localhost:8080
npm run build   # build the static site into dist/
```

Both scripts read from `src/` and write to `dist/` (which is git-ignored).

## Deployment

Every push to `main` triggers `.github/workflows/main.yml`, which runs `npm install && npm run build` and publishes `dist/` to GitHub Pages. There is no separate staging step: **merging to `main` publishes the site.**

## Project layout

```
.eleventy.js                 Eleventy config: YAML data, markdown filter, image shortcode, helpers
src/
  index.njk                  Home page (latest object, Look Books, Objects, Multitudes, About, Submit)
  tag.njk                    One page per tag, at /series/<tag>/
  tags.njk                   Tag index
  projects/
    projects.json            Defaults for every project page (layout, "projects" collection)
    <slug>.md                One page per publication
  _data/
    site.json                Site name, language, logo
    _series_data/*.yaml      One record per contributor piece in a multi-artist series
  _includes/
    layouts/                 base, project, project_multiple, project_multiple_edition
    partials/                head, menu, footer, project cards for the home page
  img/
    people/                  Contributor headshots
    projects/<slug>/         Photos for each project (folder name must match the slug)
  css/, js/                  Styles, site scripts, lightbox
  static/                    Files copied as-is to /static/ (e.g. PDFs)
utils/collections/tagList.js Tag-collection helper
```

## Adding a project

### 1. Pick a layout

| Layout | Use for | Example |
| --- | --- | --- |
| `layouts/project.njk` (default) | A single object with a single artist and one checkout link | `saw-palmettos.md` |
| `layouts/project_multiple_edition.njk` | One author/object sold in several variants, each with its own Stripe buy button | `easter-wings.md` |
| `layouts/project_multiple.njk` | A series with many contributors, each described by a file in `_series_data/` | `multitudes-series-4.md`, `look-book-2024.md` |

### 2. Create `src/projects/<slug>.md`

Front matter fields used by the layouts:

```yaml
---
title: "Easter Wings"
layout: layouts/project_multiple_edition.njk   # omit for the default project layout
slug: easter-wings              # must match the folder in src/img/projects/
description: Easter Wings
artists:
  - name: George Herbert
    photo: george_herbert.jpg   # file in src/img/people/ (project / multiple_edition layouts)
    bio: "Markdown allowed."
summary: One-paragraph summary shown near the top of the page.
production_details: Edition size, materials, etc. (markdown allowed)
price: 25.00
sold_out: false                 # true hides the purchase buttons
shipping_us: 7.00
shipping_intl: 15.00
images:                         # files in src/img/projects/<slug>/
  - { name: "EW - Back.png", alt: "Back of the assembled kite" }
tags: ["latest", "objects"]
shop: https://checkout.acontainer.co/...   # project.njk: a single checkout URL
# project_multiple / project_multiple_edition: a list of Stripe buy buttons
# shop:
#   - { name: Stanza 1, id: buy_btn_..., key: pk_live_... }
---

Markdown body (artist's statement, "About the object", etc.)
```

For series pages (`project_multiple.njk`), `artists` only needs names, and the page also carries `edition` and `project` (e.g. `_multitudes`, `_look_books`).

### 3. Add images

- Product photos go in `src/img/projects/<slug>/`.
- Headshots go in `src/img/people/`.

The `image` shortcode in `.eleventy.js` generates resized JPEG and WebP versions into `dist/img/` at build time, so commit the originals only.

### 4. For series: add one YAML file per contributor

Create `src/_data/_series_data/<piece>.yaml`. It is shown on the project page whose `slug` equals its `series` field:

```yaml
title: "The Fall"
series: multitudes-series-2     # slug of the project page this piece belongs to
artists:
  - name: Johnny Damm
    image: johnny_damm.jpg      # src/img/people/  (note: `image`, not `photo`)
    bio: "Markdown allowed."
images:                         # src/img/projects/<series slug>/
  - johnny_damm_1.jpg
description: "Markdown allowed."
```

## Tags and the home page

Tags control where a project appears:

| Tag | Effect |
| --- | --- |
| `objects` | Listed in the Objects section and on `/series/objects/` |
| `latest` + `objects` | Featured as "Latest object" at the top of the home page (keep only one at a time) |
| `Look Book` | Look Books section |
| `Multitudes` | Multitudes section and `/series/Multitudes/` |

Every tag also gets its own page at `/series/<tag>/`.

## Static files

Put downloadable files such as PDFs in `src/static/`. They are copied to `/static/<file>` unchanged.

## License

`package.json` declares the project as Unlicense. `LICENSE` contains the MIT license inherited from the original [eleventy-site](https://github.com/bjankord/eleventy-site) starter. Artwork, photographs and texts belong to Container and the contributing artists.
