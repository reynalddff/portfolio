---
name: Reynald Daffa Pahlevi — Portfolio
description: A B2B product designer's neo-brutalist portfolio, built to make measurable business impact impossible to skim past.
colors:
  bg: "#f4f3ef"
  ink: "#111111"
  dim: "#5c5a55"
  pop: "#1558a9"
  pop2: "#1b39ff"
  pop3: "#f5c518"
  card: "#ffffff"
  edge: "#111111"
  bg-dark: "#111111"
  ink-dark: "#f4f3ef"
  dim-dark: "#a19e97"
  pop-dark: "#5779ea"
  pop2-dark: "#6c7bff"
  pop3-dark: "#ffd84d"
  card-dark: "#1b1b1b"
  edge-dark: "#323232"
typography:
  display:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(54px, 15.5vw, 150px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(34px, 7vw, 88px)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(22px, 2.6vw, 32px)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "normal"
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.14em"
rounded:
  none: "0px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "14px"
  md: "22px"
  lg: "40px"
  xl: "96px"
components:
  button-primary:
    backgroundColor: "#76acee"
    textColor: "#00378e"
    rounded: "{rounded.none}"
    padding: "16px 28px"
  button-primary-hover:
    backgroundColor: "#89b9ff"
  badge:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "4px 9px"
  badge-highlight:
    backgroundColor: "{colors.pop3}"
    textColor: "#111111"
    rounded: "{rounded.none}"
    padding: "4px 9px"
---

# Design System: Reynald Daffa Pahlevi — Portfolio

## 1. Overview

**Creative North Star: "The Sticky Note Manifesto"**

Every surface reads like a claim pinned to a wall with thick marker ink: hard 3px borders, offset drop shadows with zero blur, all-caps Anton headlines shouting one idea per line. Nothing here is soft, rounded, or apologetic — the aesthetic is a direct extension of the site's positioning ("moves metrics, not just screens"): a designer who states results plainly and backs them with numbers, not a designer hiding behind polish. Density is generous but not precious; white space exists to let the bold marks breathe, not to feel minimal.

The system explicitly rejects rounded-corner softness, blurred ambient shadows, gradients, and any visual hedging. If an element could be mistaken for a generic SaaS template, it's wrong for this system.

**Key Characteristics:**
- Zero border-radius everywhere except the circular avatar treatment.
- Hard, unblurred offset shadows (`Npx Npx 0 color`) standing in for elevation.
- Anton for every headline and label accent; DM Sans carries all body copy.
- A three-color-plus-neutral palette used with intent, not decoration: blue for interactive/accent, yellow for high-visibility tags and CTAs, ink/edge for structure.
- Full light/dark theming via CSS custom properties — every token flips, nothing is hard-coded per theme.

## 2. Colors

A committed, high-contrast palette: near-black ink and edges do the structural work, one blue carries interactivity, one yellow carries emphasis and calls-to-action.

### Primary
- **Signal Blue** (`#1558a9` / dark: `#5779ea`, token `pop`): links, active states, eyebrow labels, stat numbers, section accents. The color of "pay attention here."
- **Electric Blue** (`#1b39ff` / dark: `#6c7bff`, token `pop2`): image placeholders, focus rings, hover shadow color on project cards — the louder, more saturated sibling of Signal Blue, reserved for interaction feedback.

### Secondary
- **Marker Yellow** (`#f5c518` / dark: `#ffd84d`, token `pop3`): the tagline pill, `.vlabel` tags, marquee background, highlighted badges. Always paired with near-black text (`#111` / `#001c47`), never white — this is the "sticky note" color, and it reads as a physical highlighter, not a UI accent.

### Neutral
- **Paper** (`#f4f3ef`, token `bg`) / **Ink Black** (`#111111`, token `bg-dark`): page background, light and dark.
- **Ink** (`#111111`, token `ink`) / **Paper Ink** (`#f4f3ef`, token `ink-dark`): primary text color, light and dark.
- **Dim** (`#5c5a55`, token `dim`) / **Dim Light** (`#a19e97`, token `dim-dark`): body copy and secondary text — verified ≥6:1 contrast against `bg` in both themes.
- **Card** (`#ffffff`, token `card`) / **Card Dark** (`#1b1b1b`, token `card-dark`): surface fill for cards, slabs, badges.
- **Edge** (`#111111`, token `edge`) / **Edge Dark** (`#323232`, token `edge-dark`): every border and hard shadow in the system, both themes.

### Named Rules
**The No-Gray-Fade Rule.** Muted text is never a washed-out gray on a tinted background. `dim` is calibrated to clear AA against `bg` in both themes (6.2:1 light, 7.1:1 dark) — legibility never gets traded for "elegance."

**The One Ink-on-Yellow Rule.** `pop3` (Marker Yellow) always carries near-black or deep-navy text, in both themes. It is a highlighter, and highlighters don't get inverted.

## 3. Typography

**Display Font:** Anton (fallback: sans-serif)
**Body Font:** DM Sans (weights 400/500/700, fallback: system-ui, sans-serif)

**Character:** A geometric-condensed poster face slammed against a clean, humanist workhorse sans — the pairing does the "loud claim, plain-spoken proof" split on its own: Anton shouts the headline, DM Sans explains itself without competing for attention.

### Hierarchy
- **Display** (400, `clamp(54px, 15.5vw, 150px)`, line-height 1): hero `h1` only, one per page.
- **Headline** (400, `clamp(34px, 7vw, 88px)`, line-height 0.9): section titles (`.title`).
- **Title** (400, `clamp(22px, 2.6vw, 32px)`, line-height 0.98): card/article headings (`.proj h3`, case-study `h2`).
- **Body** (400, 15.5px, line-height 1.75): paragraph copy, capped near 72ch (`.cs-body`, `.about .body`).
- **Label** (700, 12px, letter-spacing 0.14em, uppercase): tags, badges, timeline dates, the sticky-note pill copy.

All display-weight text is uppercase by convention, regardless of source casing.

### Named Rules
**The One Headline Rule.** Anton is reserved for headings, labels, and stat numbers. It never appears in a paragraph — that's where DM Sans takes over so long-form reading stays comfortable.

### Case Study Detail Page (TOC Layout)
A denser, purpose-built scale for the sticky-TOC case-study template — sits alongside the five core steps above rather than replacing them:
- TOC eyebrow: 12px, Anton, uppercase, `pop`.
- TOC link (h2-level): 14px, DM Sans bold.
- TOC link (h1-level, page title): 15px, Anton, uppercase.
- TOC link (h3-level, indented): 13px, DM Sans medium, `dim`.
- Content `h1`: `clamp(30px, 4vw, 48px)`, Anton, uppercase.
- Content summary paragraph: 16.5px / line-height 1.7, `dim`.
- Content `h2`: `clamp(22px, 2.8vw, 32px)`, Anton, uppercase, `ink`.
- Content `h3`: `clamp(16px, 1.8vw, 20px)`, Anton, `ink` — same color as `h1`/`h2`; `pop` is reserved for interactive elements (TOC active state, links), never static heading text.
- Content body `p`/`li`: 16px / 15.5px, `dim`.
- Embedded content images sit in a bordered `.frame` (3px `edge`, `8px 8px 0 edge` shadow) with a neutral gray backing (`color-mix(in srgb, edge 15%, card)`) behind any transparent regions — a deliberate exception to the sitewide `pop2` image-placeholder convention, since Electric Blue showing through reads as a rendering bug rather than a placeholder on real screenshots. Click any case-study image (cover, content, gallery) to open it full-screen in a lightbox.

## 4. Elevation

Flat surfaces, hard offset shadows for depth — never blur. Every shadow uses the exact same recipe as a border extension: `Npx Npx 0 <edge-color>`, no spread, no blur radius. Depth reads as physical stacking (a card sitting slightly off its base), not ambient light.

### Shadow Vocabulary
- **Tag/pill** (`box-shadow: 5px 5px 0 var(--edge)`): tagline pill, `.vlabel` badges.
- **Card resting** (`box-shadow: 8px 8px 0 var(--edge)` to `9px 9px 0 var(--edge)`): project cards, testimonial cards, slabs, image frames.
- **Card hover** (`box-shadow: 13px 13px 0 var(--pop)` to `15px 15px 0 var(--pop)`): the shadow grows and recolors to `pop` on hover, alongside a `translate(-4px, -4px)` lift.
- **Button rest / press** (`box-shadow: 9px 9px 0 rgba(17,17,17,0.22)` at rest, `4px 4px 0` while pressed with a `translate(3px, 3px)` shift): the theme toggle and primary CTA physically "push in."

### Named Rules
**The No-Blur Rule.** `box-shadow` never carries a blur radius in this system. Every shadow is a hard-edged offset duplicate of the element's own border color — elevation as stacked paper, not glow.

## 5. Components

### Buttons
- **Shape:** square corners always (`{rounded.none}`).
- **Primary (`.big`):** background `#76acee` / text `#00378e`, 3px border matching the fill color, `16px 28px` padding, Anton type, hard offset shadow `9px 9px 0 rgba(17,17,17,0.22)`.
- **Hover:** background lightens to `#89b9ff`, shadow grows to `14px 14px 0`, element lifts `translate(-3px, -3px)`.
- **Icon button (`#themeBtn`):** 40×40px, 3px border, `pop` background, hard shadow `4px 4px 0 var(--edge)`; press state removes the shadow and translates the button into its own shadow position — a literal "push."

### Badges / Tags
- **Style:** 2px border in `edge`, no fill, uppercase 11px bold label, `4px 9px` padding.
- **Highlight variant (`.hi`):** filled `pop3`, near-black text — reserved for the single most important tag in a group (e.g. the case study's primary category).

### Cards / Containers
- **Corner style:** square, always.
- **Background:** `card` token (white / near-black).
- **Shadow strategy:** see Elevation — resting shadow in `edge`, hover shadow recolors to `pop`.
- **Border:** 3px solid `edge` on every card-like container (`.proj`, `.slab`, `.t1 .card`, `.cs-metric`, image `.frame`/`.cs-cover`).
- **Internal padding:** 22–24px.

### Stat Blocks
- Anton number (26–30px, `pop` color) stacked over an uppercase 11–12px `dim` label — used for case-study result metrics (`.stat-row`, `.cs-metric`). No card wrapper required; a bordered block or bare stack both appear depending on context.

### Navigation
- **Top nav:** fixed, 60px tall, `bg` background, 3px bottom border in `edge`. Links are bold uppercase 13px with a transparent 2px border that fills `pop3` on hover.
- **Sticky table of contents (case-study detail pages):** 20%-width side panel, sticky at `top: 60px`, 3px right border, h1-level link (page title) in Anton uppercase, h2-level links in DM Sans bold with an active-state fill in `pop`, h3-level links indented and dimmed. Below 900px it becomes an off-canvas drawer: a floating toggle button opens it over a dimmed overlay, closes on link click, overlay click, or Escape.
- **Mobile:** primary nav links (`.links`) collapse into a hamburger-triggered dropdown below 880px — the `.links{display:none}` no-replacement gap flagged in the prior audit is resolved as of the case-study detail page; extend the same pattern to the homepage nav when it gets touched next.

### Portrait / Avatar
- Portrait: 3px border, hard `pop`-colored shadow, `rotate(-2deg)` at rest straightening to `rotate(0)` on hover — the one place the system allows a playful tilt.
- Testimonial avatar (`.who img`): the sole `border-radius: 50%` in the entire system — circular, 2px border, otherwise everything else is square.

## 6. Do's and Don'ts

### Do:
- **Do** keep every shadow a hard, blur-free offset in `edge` (resting) or `pop` (hover) — the stacked-paper read depends on zero blur.
- **Do** hold border-radius at 0 everywhere except the circular testimonial avatar.
- **Do** pair every new accent color choice against both light and dark `--bg`/`--ink` pairs before shipping — this system's whole contrast floor rests on the `dim` token clearing 6:1+ in both themes.
- **Do** put Anton only on headings, labels, and stat numbers; DM Sans carries every paragraph.
- **Do** lead every case-study section with a concrete, sourced number when one exists — the visual system is built to make a stat impossible to skim past, so don't waste that on vague copy.

### Don't:
- **Don't** add blurred or ambient `box-shadow` values — every shadow in this system is a hard offset duplicate, never soft.
- **Don't** round corners "for softness" — square edges are the system's identity, not an oversight.
- **Don't** put white or light text on the `pop3` yellow — it's a highlighter color and always carries near-black or deep-navy ink.
- **Don't** introduce a second display typeface alongside Anton, or a second body face alongside DM Sans — the pairing is deliberate and load-bearing for the "loud claim, plain proof" voice.
- **Don't** ship a generic template portfolio look (soft rounded cards, pastel gradients, ambient shadows) — PRODUCT.md names this directly as the anti-reference to avoid.
- **Don't** hide the primary mobile nav without a replacement affordance — the current `.links{display:none}` below 880px is a known gap, not a pattern to repeat elsewhere.
