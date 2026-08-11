# Portfolio

Static site (`homepage.html/css/js`, `testimony.*`) + a Contentful-backed case-study system:

- `case-study-app/` — React+Vite detail page (`?slug=`), fetches from Contentful, builds to `/case-study`.
- `contentful-schema/caseStudy.migration.js` — Contentful content-type definition, applied via `contentful space migration`.
- `scripts/setup-contentful.sh` — one-time wizard: creates the GitHub repo, enables Pages, creates the Contentful space, creates the content type, wires the API token, builds and deploys `case-study-app`. Run it with `bash scripts/setup-contentful.sh`.

After initial setup, day-to-day content edits happen in the Contentful web app — no rebuild needed. Only re-run `npm run build` in `case-study-app` (and copy `dist/` into `/case-study`) when you change that app's own code.
