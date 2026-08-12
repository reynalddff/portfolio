# Reynald Daffa Pahlevi — Portfolio

Neo-brutalist portfolio for a B2B product designer, built to make measurable
business impact impossible to skim past. Static homepage + a
Contentful-backed case-study system, deployed on Netlify.

## Stack

- **Homepage** — plain `index.html` / `homepage.css` / `homepage.js`, no build step.
- **Case-study detail page** — `case-study-app/` (React + Vite), reads a `?slug=` query param, fetches content from Contentful, builds to `/case-study`.
- **Content** — [Contentful](https://www.contentful.com/), content type defined in `contentful-schema/caseStudy.migration.js`.
- **Hosting** — [Netlify](https://www.netlify.com/), auto-deploys on push to `main`.

## Structure

```
index.html, homepage.css, homepage.js   homepage (static)
case-study-app/                         React+Vite case-study detail page (source)
case-study/                             built output of case-study-app, served at /case-study
contentful-schema/                      Contentful content-type definition
scripts/                                one-time setup wizards (Contentful, Netlify)
DESIGN.md, PRODUCT.md                   design system + product brief
```

## One-time setup

- `bash scripts/setup-contentful.sh` — creates the Contentful space, content type, and API token.
- `bash scripts/setup-netlify.sh` — links this repo to Netlify, optionally wires a custom domain, deploys.
