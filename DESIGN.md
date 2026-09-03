---
name: Reynald Daffa Pahlevi — Portfolio (swiss-editorial)
description: A B2B product designer's editorial portfolio — warm neutral paper tones, hairline structure, and a serif/mono pairing that reads like a considered publication rather than a template.
colors:
  bg: "oklch(0.968 0.006 85)"
  bg-alt: "#F6F4F0"
  bg-card: "oklch(0.958 0.006 84)"
  line: "#EFEBE8"
  ink: "oklch(0.29 0.012 70)"
  ink-dim: "oklch(0.50 0.010 70)"
  ink-faint: "oklch(0.66 0.008 70)"
  accent: "oklch(0.62 0.10 48)"
  accent-hover: "oklch(0.50 0.10 48)"
  dark-bg: "#302B25"
  dark-line: "#453E37"
  dark-card: "#3B342D"
  dark-ink: "oklch(0.96 0.006 85)"
  dark-ink-dim: "oklch(0.80 0.010 78)"
  dark-ink-faint: "oklch(0.68 0.010 76)"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(38px, 6vw, 70px)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  card-title:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "normal"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  mono-body:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  eyebrow:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.14em"
rounded:
  none: "0px"
spacing:
  xs: "8px"
  sm: "18px"
  md: "24px"
  lg: "44px"
  xl: "100px"
components:
  button-primary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "10px 18px"
    border: "1px solid {colors.ink}"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
  card:
    backgroundColor: "{colors.bg}"
    rounded: "{rounded.none}"
    border: "1px solid {colors.line}"
---

# Design System: Reynald Daffa Pahlevi — Portfolio (swiss-editorial)

## 1. Overview

**Creative North Star: "The Considered Publication"**

Every surface reads like a well-set editorial page: warm paper neutrals, hairline 1px rules instead of borders-with-weight, a serif for moments of voice (headlines, names, numbers-as-statements) against a monospace for structure (labels, meta, dates, body copy that wants to feel precise). Nothing carries a drop shadow or a fill for emphasis — hierarchy comes from type scale, hairline dividers, and generous whitespace, not decoration.

This supersedes the prior neo-brutalist system (preserved on the `neo-brutalism` branch). The two systems do not mix: no thick offset shadows, no all-caps Anton, no yellow highlighter fills here.

**Key Characteristics:**
- Zero border-radius, but also zero heavy borders — structure comes from 1px hairlines (`--line` / `--dark-line`), not 3px edges.
- Instrument Serif for headlines, names, and section titles; IBM Plex Mono for labels, meta, and body copy that reads as "data"; DM Sans for the one long-form paragraph per section (hero subtext, about body, summaries).
- A single warm terracotta accent (`--accent`), used only for links and active/hover states — never as a fill.
- Two backgrounds, not a light/dark toggle: warm paper (`--bg`/`--bg-alt`) for content sections, warm near-black (`--dark-bg`) for the About and Contact sections. This is a structural section choice from the approved reference, not a user-togglable theme — the prior system's light/dark toggle is dropped.

## 2. Colors

### Primary
- **Terracotta accent** (`oklch(0.62 0.10 48)`, token `accent`; hover `oklch(0.50 0.10 48)`): links, hover states, the only saturated color in the system. Used sparingly — one accent, used identically everywhere it appears.

### Neutral (light sections)
- **Paper** (`oklch(0.968 0.006 85)`, token `bg`): hero, project card background.
- **Paper Alt** (`#F6F4F0`, token `bg-alt`): projects/side-projects section background, one step warmer/darker than `bg` for section separation without a border.
- **Card** (`oklch(0.958 0.006 84)`, token `bg-card`): image placeholders, hover fill.
- **Line** (`#EFEBE8`, token `line`): every hairline border and grid gap in light sections.
- **Ink** (`oklch(0.29 0.012 70)`, token `ink`) / **Ink Dim** (`oklch(0.50 0.010 70)`) / **Ink Faint** (`oklch(0.66 0.008 70)`): primary / secondary / tertiary text on light backgrounds.

### Neutral (dark sections: About, Contact)
- **Dark bg** (`#302B25`) / **Dark line** (`#453E37`) / **Dark card** (`#3B342D`).
- **Dark ink** (`oklch(0.96 0.006 85)`) / **Dark ink dim** (`oklch(0.80 0.010 78)`) / **Dark ink faint** (`oklch(0.68 0.010 76)`).

### Named Rules
**One accent, used identically everywhere.** `accent` never shifts hue between sections — same terracotta on a light hero link and a dark-section hover state.

**Dark sections are structural, not a theme.** About and Contact are always dark; hero, projects, and case-study pages are always light warm paper. There is no user-facing light/dark toggle in this system.

## 3. Typography

**Display/heading font:** Instrument Serif (fallback: Georgia, serif) — italic and regular both available.
**Structure font:** IBM Plex Mono (weights 400/500, fallback: monospace).
**Long-form body font:** DM Sans (weights 400/500, fallback: system-ui, sans-serif).

**Character:** The serif carries every moment that should feel like a person speaking — headlines, project titles, "Say hello." The mono carries everything that should feel precise and structural — eyebrows, meta rows, dates, timeline entries, card copy. DM Sans is reserved for the few paragraphs that are meant to be read at length (hero subtext, the About bio, case-study summaries).

### Hierarchy
- **Display** (Instrument Serif 400, `clamp(38px, 6vw, 70px)`, line-height 1.04): hero `h1` only.
- **Heading** (Instrument Serif 400, 32px, line-height 1.1): section headings ("The work behind the screens.", "Side Projects", case-study `h2`).
- **Card title** (Instrument Serif 400, 28px, line-height 1.12): project card titles, case-study detail `h1` scales up to `clamp(30px, 4vw, 44px)` at the same weight/family.
- **Logo mark** (Instrument Serif 400, 19–21px): "RDP." wordmark, nav and detail header.
- **Mono body** (IBM Plex Mono 400, 13.5px, line-height 1.75): project card summaries, about bio, timeline rows.
- **Body** (DM Sans 400, 16px, line-height 1.7–1.8): hero subtext, case-study summary and prose body.
- **Eyebrow** (IBM Plex Mono 400, 11–12px, letter-spacing 0.14em, uppercase): section eyebrows, meta rows, timeline dates. Used at most once per 2–3 sections — not stacked on every heading.

### Named Rules
**The Serif-Speaks, Mono-Structures rule.** If copy is a headline, a name, or a number presented as a statement (a metric value, "Say hello"), it's Instrument Serif. If it's a label, a date, a card summary, or anything structural, it's IBM Plex Mono. DM Sans only appears where a paragraph needs to be genuinely read, not scanned.

### Case Study Detail Page (TOC Layout)
- TOC links: 11.5px IBM Plex Mono, `ink-faint` resting, `accent` active/hover, right-hand sticky rail (150px, hairline left border), hidden below 900px rather than converted to a drawer.
- Detail `h1`: `clamp(30px, 4vw, 44px)`, Instrument Serif.
- Detail `h2` (section): Instrument Serif, `clamp(24px, 3vw, 32px)`.
- Detail `h3` (sub-section): IBM Plex Mono uppercase, 13px, letter-spacing 0.1em, `ink-faint` — a label, not a heading, deliberately smaller than body text.
- Metric tiles: Instrument Serif 26px value over an 11px uppercase mono label, laid out as a hairline-divided row (no card shadow).
- Embedded images sit in a 1px `line`-bordered `.frame` on a `bg-card` backing. Click any image to open a lightbox.

## 4. Elevation

There is no elevation system. No `box-shadow` anywhere. Depth and grouping come entirely from a 1px hairline border (`--line` / `--dark-line`) and background-color steps (`bg` → `bg-alt` → `bg-card`, or `dark-bg` → `dark-card`). A project grid is a set of cells sharing a 1px gap on a `line`-colored background, not a set of individually-shadowed cards.

### Named Rules
**The No-Shadow Rule.** If something needs to look "raised," give it a hairline border or a background-color step instead. Shadows do not appear in this system at all.

## 5. Components

### Buttons / links-as-buttons
- **Shape:** square corners, 1px border in `ink` (light) or `dark-line` (dark), no fill at rest.
- **Hover:** fills solid with the border color, text flips to the background color (light sections) — a simple invert, not a shadow lift.
- **Nav CTA ("GET IN TOUCH"):** IBM Plex Mono 12px, letter-spacing 0.06em, same invert-on-hover pattern.

### Cards / Containers
- **Corner style:** square, always.
- **Background:** `bg` (light) or `dark-bg` (dark section cards).
- **Border:** 1px hairline in `line`/`dark-line` — cards in a grid share this as a 1px gap between grid cells, not individual borders per card.
- **Internal padding:** 36–52px (generous, editorial — this system is airier than the prior brutalist one).

### Metric / Stat Blocks
- Instrument Serif number (26px, `ink`) stacked over an 11px uppercase mono label (`ink-faint`), grouped in a hairline-divided row. No card wrapper, no color accent on the number itself.

### Navigation
- **Home nav:** fixed, 72px tall, translucent blurred `bg`, 1px bottom hairline. Logo left (serif), links center (mono), CTA right (bordered, invert on hover). Below 640px the center links hide (no hamburger substitute yet — flagged below as a known gap, matching the mobile nav gap called out in the prior system's audit).
- **Case-study detail header:** not the home nav — a simple hairline-bordered strip with "← All work" (mono, left) and "RDP." (serif, right), centered to the 860px content column.
- **Sticky TOC:** right-hand rail, 150px wide, hairline left border, sticky at `top: 24px`, hidden entirely below 900px rather than becoming an off-canvas drawer.

## 6. Do's and Don'ts

### Do:
- **Do** keep every "raised" surface a 1px hairline or a background-color step — never a shadow.
- **Do** hold border-radius at 0 everywhere.
- **Do** reserve Instrument Serif for headlines/titles/names/stated-numbers and IBM Plex Mono for structure/labels/meta — don't let them trade places.
- **Do** keep the terracotta accent to links and hover/active states only, identical hue everywhere it appears.
- **Do** treat the About/Contact dark sections as structural (always dark), not as a togglable theme.

### Don't:
- **Don't** bring back the prior system's offset box-shadows, thick 3px edges, or Anton/yellow-highlighter styling — that system lives on the `neo-brutalism` branch, not here.
- **Don't** stack an eyebrow label above every section heading — max once per 2–3 sections.
- **Don't** introduce a second serif or a second mono face alongside Instrument Serif / IBM Plex Mono.
- **Don't** hide the home nav's center links below 640px without a replacement affordance — known gap, same shape as the prior system's flagged mobile-nav issue, not yet resolved here.
