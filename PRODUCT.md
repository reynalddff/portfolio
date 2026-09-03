# Product

## Register

brand

## Platform

web

## Users

Hiring managers and recruiters evaluating a B2B product designer for a full-time role, arriving from a job application, LinkedIn, or a resume link. They're scanning fast, comparing candidates, and looking for evidence a designer can operate inside real B2B/SaaS/fintech complexity and move business metrics, not just ship screens. A secondary audience of founders or engineering leads may read the case studies the same way a hiring manager would: as proof of judgment under real constraints.

## Product Purpose

A personal portfolio for Reynald Daffa Pahlevi, a B2B product designer with 5+ years across SaaS, fintech, and e-commerce. It exists to convert a recruiter's or hiring manager's first look into a resume click or an email. Success is a hiring manager reading a case study and believing this person's design work already survives contact with engineering and moves the numbers a business cares about.

## Positioning

B2B product design that moves metrics with AI-native workflows, not just screens.

## Conversion & proof

- Primary and secondary CTA: email (`mailto:reynalddaffa.dev@gmail.com`) is primary; the linked resume doc is the secondary fallback for visitors not ready to reach out directly.
- The line a visitor remembers after 10 seconds: this designer ships work that moves real business numbers (Rp6B+ GMV, a 200% conversion lift) and has named colleagues vouching for it.
- Belief ladder: (1) this person understands B2B/SaaS/fintech complexity, not just visual polish → (2) their design work survives engineering handoff → (3) it moves metrics that matter to the business → (4) named managers and peers already vouch for that → (5) reaching out is worth the hiring manager's time.
- Proof on hand: three named, quoted testimonials with title (`case-study-app/src/pages/Home.jsx`, the `TESTIMONIALS` const — a Senior Product Manager, a Product Manager, and a peer Product Designer, all from FLIK), quantified case-study results pulled from Contentful onto each detail page (Rp6B+ GMV, 60% GMV increase, 3–4wk launch), and a work-history/education timeline in the homepage About section.

## Brand Personality

Considered, confident, direct — matching the site's editorial visual system as-is: Instrument Serif display type over IBM Plex Mono labels, hairline rules instead of heavy borders, warm paper tones, no hedging in the copy or the layout. See DESIGN.md.

## Anti-references

The prior neo-brutalist direction, preserved on the `neo-brutalism` branch. The current editorial system is the reference to protect and extend; do not mix the two.

## Design Principles

- Show the metric, not just the screen — every case study leads with a quantified business result, not a visual walkthrough.
- Proof over claims — named testimonials and real numbers carry the pitch; adjectives don't.
- Loud typography, hard edges, no hedging — the visual voice matches the direct, confident personality; nothing about the interface should feel tentative.
- Design that survives engineering — the "bridges design and engineering" claim in the About copy should be reflected in how clean and buildable the site's own implementation is, not just stated.

## Accessibility & Inclusion

No formal WCAG target requested. The existing implementation already carries a solid informal floor worth maintaining: visible focus states (`:focus-visible` outline sitewide), `prefers-reduced-motion` support on all animation, and body-text contrast ratios verified above 6:1 in both light and dark themes. Treat that as the baseline, not a ceiling.
