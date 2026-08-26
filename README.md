# Portfolio — Peerawut Nipakornpan

Personal portfolio of **Peerawut Nipakornpan**, a junior full-stack developer at Gendee.ai.
Built with Next.js 16, React 19, TypeScript and Tailwind CSS v4.

**Live site — [portfolio-offpeerawutt.vercel.app](https://portfolio-offpeerawutt.vercel.app/)** &nbsp;·&nbsp; **Résumé:** [`/Resume_PeerawutNi.pdf`](public/Resume_PeerawutNi.pdf)

<sub>Next.js 16.3 · React 19.2 · TypeScript 5.9 · Tailwind CSS 4.3 · Deployed on Vercel</sub>

---

## Table of contents

- [About this repository](#about-this-repository)
- [What is on the site](#what-is-on-the-site)
- [Tech stack](#tech-stack)
- [How it is built](#how-it-is-built)
- [Project structure](#project-structure)
- [Design system](#design-system)
- [Content](#content)
- [Assets and documents](#assets-and-documents)
- [Conventions](#conventions)
- [Contact](#contact)

---

## About this repository

This is the source of a personal portfolio site — a single, static, hand-built
front end whose job is to explain who I am, what I have shipped, and how to
reach me.

It is published so the code can be **read**: the structure, the design system,
the rendering strategy and the reasoning behind each decision are all visible,
and most non-obvious choices are explained in a comment next to the code that
makes them. It is not published as a starter template. The deliverable is the
live site, not a copy of it — so this README documents how the project is put
together rather than how to stand another one up.

Every route is prerendered at build time and rebuilt daily. There is no
database, no CMS, no authentication and no server-side session anywhere in the
project.

---

## What is on the site

The site is **one page** a visitor scrolls through, in this order:

| Section | What it holds |
| --- | --- |
| **Home** | Name, an animated role line, the three calls to action and a scrolling keyword marquee |
| **About** | Biography, education, three live counters and links to the two products currently in production |
| **Skills** | Frontend, Backend, Database and Tools, each entry linking to its own documentation |
| **Experience** | A timeline of roles and what was owned in each |
| **Work** | Six systems that reached real users, with the stack behind each |
| **Contact** | Email with a one-click copy control, LinkedIn, GitHub and a résumé download |

Six navigation entries — one per section — are declared once in
[`src/lib/sections.ts`](src/lib/sections.ts) and drive the desktop nav, the
mobile drawer with its `01`–`06` counters, the scroll-spy, and the numbered
eyebrow above each section. Every one is an anchor, so the nav scrolls rather
than navigates.

Three further routes exist but are not in the nav: `/about` and `/contact`
serve those two sections on their own, `/user` reads the GitHub account live
from the public API, and `/admin` is a read-only console listing what the site
is currently serving — no auth, no writes. All are excluded from search
results, and anything else lands on a custom 404 page.

### Interaction layer

The page works fully without JavaScript. Everything below is enhancement layered
on top, and all of it respects `prefers-reduced-motion`:

- Sliding pill that follows the active nav link, driven by a scroll-spy
- Mobile drawer with focus trapping and `inert` on the content behind it
- Scroll progress bar and scroll-triggered reveals
- Typewriter cycling the role line under the name
- Counters that animate up when their tile enters view
- Cursor spotlight, magnetic buttons and card tilt — pointer devices only
- Copy-to-clipboard for the email address, with a toast
- Light/dark theme switch with a View Transitions wipe where supported
- An animation budget that pauses off-screen animations

---

## Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router, Turbopack) | Static prerendering, file-based routing, first-class metadata |
| UI | **React 19** | Server Components by default; only the script loader is a client component |
| Language | **TypeScript 5.9**, `strict` | The section registry and site constants are typed, so a bad id fails the build |
| Styling | **Tailwind CSS v4** | Utilities only — see below |
| Interactions | **Vanilla JS**, one classic script | No hydration cost, no framework tax on effects that are purely visual |
| Fonts | Sora, Inter, JetBrains Mono | Display, body and mono, preconnected from Google Fonts |
| Icons | Hand-built inline SVG sprite | One `<symbol>` set, referenced by `<use>` — no icon package |
| Hosting | **Vercel** | Static output served from the edge |

Runtime dependencies: `next`, `react`, `react-dom`. That is the whole list —
no UI kit, no animation library, no icon package, no CSS framework beyond
Tailwind.

---

## How it is built

### 100% Tailwind — one stylesheet, no component CSS

There is exactly one `.css` file in the project,
[`src/app/globals.css`](src/app/globals.css), and it is a **token layer**, not
a component sheet. It holds the palette, the `@theme` definitions, the
keyframes and a small `@layer base`. Nothing in it styles a component.

Every visual decision lives in a Tailwind class on the element that owns it.
Repeated patterns — the button, the glass card, the tag, the section shell —
are written once as class strings in [`src/lib/styles.ts`](src/lib/styles.ts)
and imported where needed. They are exported constants, never assembled from
fragments at runtime, because Tailwind has to be able to see each full class
name in the source.

States that JavaScript toggles are expressed as arbitrary variants rather than
as CSS rules — `[&.is-active]:`, `group-[.is-open]:`, `[&.is-copied_.i-check]:block`.
So the class names the script writes stay pure hooks with no styling of their
own, and the appearance of a state stays next to the element it applies to.

### One source of truth per concern

| File | Owns |
| --- | --- |
| [`src/lib/site.ts`](src/lib/site.ts) | Titles, description, author, canonical origin, résumé path, portrait, Open Graph and Twitter cards |
| [`src/lib/sections.ts`](src/lib/sections.ts) | The section registry and the numbering derived from it |
| [`src/lib/styles.ts`](src/lib/styles.ts) | Shared Tailwind class strings |
| [`src/lib/theme.ts`](src/lib/theme.ts) | The inline palette bootstrap |
| [`src/app/globals.css`](src/app/globals.css) | Design tokens, keyframes, base layer |

Renaming the résumé, reordering a section or retuning the palette is a
one-file edit in each case.

### Theming without a flash

The palette is two sets of CSS custom properties — one on `:root`, one under
`[data-theme="dark"]` — mapped into Tailwind's colour namespace through
`@theme inline`. A single class such as `bg-glass` therefore resolves
correctly in both themes without a `dark:` counterpart.

The stored preference lives in `localStorage`, which the server cannot read, so
markup ships with the dark palette and a tiny script inlined in `<head>`
corrects it while the browser is still parsing — before first paint and before
React is involved. The same script also repaints the browser chrome via
`<meta name="theme-color">`, and parks itself on `window` so the one caller
that has to replay it cannot drift from what ran first.

### Progressive enhancement

[`public/js/main.js`](public/js/main.js) is a plain classic script, not a
bundle. It is loaded `afterInteractive` because it writes classes, text and
inline styles onto elements React also owns, and an overlap would be treated as
a hydration mismatch.

Two failsafes cover the gap that waiting creates: a `<noscript>` rule reveals
every hidden section when scripting is off, and a CSS animation reveals them
anyway if the script never arrives at all. A visitor with JavaScript disabled,
or on a failed script load, still sees the complete page.

### Rendering and caching

All six routes are static. The public layout sets `revalidate = 86400`, which
rebuilds them daily — enough to keep the footer's copyright year honest across
a long-lived deployment without giving up the CDN cache.

The `/user` route fetches the GitHub API with the same daily revalidation
rather than per visit, since unauthenticated requests are rate-limited per IP.
A failure there returns a reason instead of throwing: a rate-limited API is not
a reason to take a portfolio page down, so the component renders the error and
a direct link to GitHub in place of the profile.

### Metadata and SEO

The tab title and the share title are deliberately different values. A tab is a
few characters wide and sits next to a page that already states the name, so it
reads `PN · Portfolio`; sub-pages extend it through a template
(`About · PN · Portfolio`) so several open tabs stay distinguishable. A share
card has no surrounding page to supply context, so `og:title` and
`twitter:title` carry the full descriptive title instead.

Each route sets its own canonical URL and `og:url`. The admin group is
`noindex, nofollow`. The image optimizer is restricted to `/images/**` so it
cannot be handed arbitrary local paths to transcode.

### Responsive, in two directions

Width is the obvious axis: a fluid `clamp()` scale for type and spacing, four
breakpoints (1080 / 1024 / 980 / 640px) where the layout actually changes, and
grids built on `repeat(auto-fit, minmax(min(Npx, 100%), 1fr))` so the column
count falls out of the available room rather than out of a media query.

Height is the axis most sites forget. A 1440×800 laptop is wider than a tablet
but far shorter, and width-based spacing hands it the roomiest padding of all —
which is exactly backwards, and pushes every section past the fold. Below 880px
of viewport height the vertical rhythm tightens while the layout stays put, via
the `short:` variant defined in [`globals.css`](src/app/globals.css).

Two more queries key on the device rather than the window: `touch:` lifts every
icon button, social link and burger to a 44px target on coarse pointers — a
finger is the same size whichever way the phone is held, so a landscape phone
would miss a width-based rule — and `no-hover:` drops the cursor spotlight
where there is no cursor to follow.

### Accessibility

A skip link, a focusable `<main>`, a visible `:focus-visible` ring on every
interactive element, `aria-label` on every icon-only control, `aria-hidden` on
decorative SVG, a focus-trapped drawer that marks the page behind it `inert`,
and a reduced-motion block that disables the typewriter, the marquee, the
orbits and the reveals.

---

## Project structure

```
.
├── public/                          # Served verbatim from the site root
│   ├── images/                      # Logo, favicons, portrait
│   ├── js/main.js                   # Interaction layer (classic script)
│   ├── Resume_PeerawutNi.pdf
│   └── Resume_PeerawutNi-ATS.pdf
├── resume/                          # Source documents the PDFs are printed from
│   ├── resume.html                  # Designed version
│   ├── resume-ats.html              # Plain, ATS-parseable version
│   └── photo.png
├── src/
│   ├── app/
│   │   ├── (front)/                 # Public site — shared navbar, footer, background
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── user/
│   │   │   │   ├── User.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── (admin)/                 # Console — its own chrome, excluded from search
│   │   │   ├── admin/page.tsx
│   │   │   └── layout.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css              # The only stylesheet in the project
│   │   ├── layout.tsx               # <html>, metadata, theme bootstrap
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── admin/
│   │   │   └── StatCard.tsx
│   │   └── front/                   # 12 files: the sections and the shared chrome
│   │       ├── About.tsx
│   │       ├── Ambient.tsx          # Aurora, grid and noise background
│   │       ├── Contact.tsx
│   │       ├── Experience.tsx
│   │       ├── Footer.tsx
│   │       ├── Hero.tsx
│   │       ├── IconSprite.tsx       # The <symbol> set every <use> points at
│   │       ├── Interactions.tsx     # Loads main.js — the one client component
│   │       ├── Navbar.tsx
│   │       ├── SectionEyebrow.tsx
│   │       ├── Skills.tsx
│   │       └── Work.tsx
│   ├── lib/
│   │   ├── sections.ts              # Navigation registry and section numbering
│   │   ├── site.ts                  # Titles, URLs, share cards, CSS-var helpers
│   │   ├── styles.ts                # Shared Tailwind class strings
│   │   └── theme.ts                 # Inline palette bootstrap
│   └── types/
│       └── user.d.ts                # Shape of the GitHub profile response
├── next.config.ts
├── postcss.config.mjs               # Tailwind v4 — the whole build config
├── tsconfig.json                    # `@/*` → `./src/*`
└── vercel.json
```

Route groups split the site in two. `(front)` and `(admin)` share the root
layout — the palette, the fonts, the metadata — but nothing else: the console
has a different job, and sharing the marketing header would invite the two to
drift into each other.

---

## Design system

Defined in [`src/app/globals.css`](src/app/globals.css) and consumed through
Tailwind utilities.

**Brand**

| Token | Light | Dark |
| --- | --- | --- |
| `--brand-1` | `#4f46e5` | `#6d7cff` |
| `--brand-2` | `#a855f7` | `#b76bff` |
| `--brand-3` | `#06b6d4` | `#22d3ee` |
| `--brand-4` | `#f43f5e` | `#fb7185` |

Three gradients are derived from them — `--gradient-brand` for filled surfaces,
`--gradient-text` for headline highlights, `--gradient-line` for dividers.

**Semantic surfaces and ink** — `canvas`, `canvas-deep`, `surface`, `glass`,
`glass-strong`, `sunken`; `ink`, `ink-soft`, `ink-muted`, `ink-faint`; `line`,
`line-strong`. Each is a single class name that resolves per theme.

**Type** — Sora (`font-display`), Inter (`font-body`), JetBrains Mono
(`font-mono`). Headings are fluid `clamp()` scales with negative tracking.

**Spacing and shape** — `--spacing-shell` (1180 px reading column),
`--spacing-gutter` and `--spacing-section` are fluid; four brand radii from
10 px to 32 px; five shadow steps including a brand-tinted one.

**Motion** — three easing curves (`ease-brand`, `ease-spring`, `ease-io`) and
thirteen named animations, each registered as an `--animate-*` token so it is
reachable as a utility class. All of them are disabled under reduced motion,
and an animation budget pauses those outside the viewport.

**The mark** — [`public/images/logo.svg`](public/images/logo.svg) is a person
glyph drawn as one unbroken stroke: a circular head over shoulders that rise
symmetrically and stop with rounded caps. It renders identically at 16 px in a
tab and at 512 px on a home screen, appears in the navbar and the console
header, and is baked over the brand gradient in the favicon and the
apple-touch icon.

---

## Content

**Experience** — Junior Full-Stack Developer at Gendee.ai, building two
products in parallel: Gendee.ai, an AI content generation platform, and CIRCLE,
a news platform. Preceded by a Full Stack Developer internship,
January – April 2026. B.Eng. in Software Engineering, Mae Fah Luang University,
School of Applied Digital Technology.

**Work** — six systems, each with the stack it was built on:

| Project | Context | Stack |
| --- | --- | --- |
| Gendee for Business | B2B — shared credit pools, member limits, invite flows | Angular, Deno, PostgreSQL |
| Course Platform | Catalog, checkout, payment, classroom and staff console | Angular, Deno, PostgreSQL |
| Notifications & Push | Database triggers fanning out to Firebase Cloud Messaging | Firebase FCM, Deno, PostgreSQL |
| CIRCLE News Platform | Reader app, editorial desk and the rebrand across both | Ionic, Capacitor, Supabase |
| Operations Dashboard | Redeem codes, organizations and reporting | Angular, Chart.js, Supabase |
| DoiTung Waste Management | Senior project — published as a peer-reviewed IEEE paper | React, Node.js, MySQL |

**Skills** — grouped as Frontend (Angular, React, Next.js, Tailwind CSS,
Flutter), Backend (Go/Fiber, Node.js/Express, Java/Spring Boot, Edge
Functions), Database (MSSQL, MySQL, PostgreSQL, Supabase) and Tools (Git,
GitHub, Swagger, Postman, Figma). Every entry links to its official
documentation and carries its own brand colour, tuned separately for each
theme.

---

## Assets and documents

Two résumés are served from `/public`, both generated from the HTML sources in
[`resume/`](resume/) and kept in step with what the site says:

- **`Resume_PeerawutNi.pdf`** — the designed version, linked from the hero and
  the contact page
- **`Resume_PeerawutNi-ATS.pdf`** — a plain, single-column version that
  applicant tracking systems can parse

The download links carry no filename of their own, so the file on disk is named
exactly as it should land in a visitor's downloads folder.

Icons ship as one hand-built SVG sprite rendered once per page; `favicon.svg`,
`favicon.ico` and `apple-touch-icon.png` are all generated from the same mark.

---

## Conventions

- **Imports** — every internal reference uses the `@/` alias. No `./`, no
  `../`, anywhere in `src`.
- **Comments** — they explain *why*, not *what*. Where a decision looks
  arbitrary, the comment next to it says what would break otherwise.
- **Class strings** — shared Tailwind patterns are exported constants, always
  written out in full so the scanner can see them.
- **JS hooks** — class names the script toggles (`is-active`, `is-open`,
  `is-in`, `is-copied`, `magnetic`, `tilt`, `spotlight`) carry no styling
  themselves; the appearance of each state is a Tailwind variant on the element.
- **Naming** — components in `PascalCase`, modules in `lib/` in `camelCase`,
  section ids in `kebab-case` and declared only in `sections.ts`.

---

## Contact

- **Email** — [nipeerawutdev15@gmail.com](mailto:nipeerawutdev15@gmail.com)
- **GitHub** — [@6531503060-nipeerawut](https://github.com/6531503060-nipeerawut)
- **LinkedIn** — [peerawut-nipakornpan](https://www.linkedin.com/in/peerawut-nipakornpan-3550a131a)

---

The code here is public to read. The written content, design, photographs and
résumé documents are personal material and are not offered for reuse.
