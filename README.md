# Reynald Daffa Pahlevi — Portfolio

Editorial portfolio for a B2B product designer, built to make measurable
business impact impossible to skim past. One Contentful-backed React app,
deployed on Netlify.

## Stack

- **Site** — `case-study-app/` (React + Vite + react-router). One bundle serves the homepage and every detail page.
- **Content** — [Contentful](https://www.contentful.com/), two content types defined in `contentful-schema/`: `caseStudy` and `sideProject`.
- **Hosting** — [Netlify](https://www.netlify.com/), auto-deploys on push to `main`. `netlify.toml` builds from source and falls back to `/index.html` so client-side routes survive a direct hit or a refresh.

## Routes

| Route | Renders |
| --- | --- |
| `/` | `pages/Home.jsx` — hero, case studies, testimonials, side projects, about, contact |
| `/case-study/:slug` | `pages/ProjectDetail.jsx` against the `caseStudy` content type |
| `/side-project/:slug` | the same page against `sideProject` |

## Structure

```
case-study-app/          the site (source)
  src/pages/             Home and ProjectDetail
  src/components/        HeroCanvas, IntroLoader
  src/styles/            per-page CSS
  src/contentfulClient.js  fetchList() for grids, fetchEntry() for detail pages
  public/img/            images served at /img/*
contentful-schema/       Contentful content-type definitions
scripts/                 one-time setup wizards (Contentful, Netlify)
DESIGN.md, PRODUCT.md    design system + product brief
```

## Local development

```
cd case-study-app
npm install
npm run dev          # http://localhost:5173
```

Needs `case-study-app/.env` with `VITE_CONTENTFUL_SPACE_ID`,
`VITE_CONTENTFUL_ENVIRONMENT` and `VITE_CONTENTFUL_ACCESS_TOKEN`
(see `.env.example`). `npm run build && npm run preview` serves the
production build if you need to check it before pushing.

## One-time setup

- `bash scripts/setup-netlify.sh` — links this repo to Netlify, optionally wires a custom domain, deploys.
- `bash scripts/setup-contentful.sh` — creates the Contentful space, content types, and API token.

Netlify needs the same three `VITE_CONTENTFUL_*` variables set in its own
build environment, since the build runs there rather than from a committed
`dist/`.
