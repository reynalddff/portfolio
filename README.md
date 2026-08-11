# Portfolio

Static site (`homepage.html/css/js`, `testimony.*`) + a Sanity-backed case-study system:

- `case-study-app/` — React+Vite detail page (`?slug=`), fetches from Sanity, builds to `/case-study`.
- `studio-schema/caseStudy.js` — Sanity schema, drop into `studio/schemaTypes` once Studio exists.
- `scripts/setup-sanity.sh` — one-time wizard: creates the GitHub repo, enables Pages, scaffolds the Sanity Studio, wires CORS + project ID, builds and deploys `case-study-app`. Run it with `bash scripts/setup-sanity.sh`.

After initial setup, day-to-day content edits happen in the hosted Sanity Studio — no rebuild needed. Only re-run `npm run build` in `case-study-app` (and copy `dist/` into `/case-study`) when you change that app's own code.
