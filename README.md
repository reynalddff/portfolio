# Portfolio

Static site (`homepage.html/css/js`, `testimony.*`) + a Contentful-backed case-study system:

- `case-study-app/` — React+Vite detail page (`?slug=`), fetches from Contentful, builds to `/case-study`.
- `contentful-schema/caseStudy.migration.js` — Contentful content-type definition, applied via `contentful space migration`.
- `scripts/setup-contentful.sh` — one-time wizard: creates the GitHub repo, creates the Contentful space, creates the content type, wires the API token. Run it with `bash scripts/setup-contentful.sh`.
- `netlify.toml` — build command (`npm run build` in `case-study-app`, copies `dist/` into `/case-study`) and publish dir (repo root) for Netlify.
- `scripts/setup-netlify.sh` — one-time wizard: logs into Netlify, links this repo, optionally wires a custom domain, deploys. Run it with `bash scripts/setup-netlify.sh`.

Hosted on Netlify, connected to this GitHub repo — `git push` alone triggers a new build+deploy, no manual `npm run build`/copy/commit dance. Day-to-day content edits happen in the Contentful web app and need no rebuild at all.
