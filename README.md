# Portfolio — Peerawut Nipakornpan

Personal portfolio of **Peerawut Nipakornpan**, a junior full-stack developer at Gendee.ai.
Built with Next.js 16, React 19, TypeScript and Tailwind CSS v4.

**Live site — [portfolio-offpeerawutt.vercel.app](https://portfolio-offpeerawutt.vercel.app/)**

<sub>Next.js 16.3 · React 19.2 · TypeScript 5.9 · Tailwind CSS 4.3 · Deployed on Vercel</sub>

---

## Table of contents

- [About this repository](#about-this-repository)
- [Two front ends](#two-front-ends)
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

This is the source of a personal portfolio site — static, hand-built, and whose
job is to explain who I am, what I have shipped, and how to reach me. It ships
as **two front ends**: a scrolling document for a desktop, and a phone app with
one screen per navigation entry. See [Two front ends](#two-front-ends).

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

## Two front ends

A phone is not a narrow desktop. The site used to pretend otherwise: below
981px the one scrolling document grew an app bar and a bottom tab bar, and the
result was a document wearing an app's clothes — six tabs that scrolled instead
of navigating, sections a screen tall stacked into an endless page, and hover
effects nothing on the device could trigger.

So the two are now separate builds that share data and nothing else.

| | Document | App |
| --- | --- | --- |
| Routes | `/`, `/about`, `/contact`, `/user` | `/m`, `/m/about`, `/m/skills`, `/m/experience`, `/m/work`, `/m/contact`, `/m/user` |
| Shape | One page, six anchors, scroll-snapped sections a viewport tall | One screen per navigation entry — a tap is a navigation, back means something |
| Navigation | Fixed rail with a scroll-spied sliding pill | Fixed app bar and bottom tab bar, active state from the pathname |
| Surfaces | Glass panels over an animated aurora, grid and film-grain background | Opaque cards over one static gradient — a blurred backdrop is the most expensive thing a phone composites while a finger is dragging |
| Motion | Hover lifts, magnetic buttons, 3D card tilt, cursor spotlight, scroll reveals | Pressed states and a staggered rise on mount |
| Behaviour | [`public/js/main.js`](public/js/main.js), measured once at boot | React — screens are replaced under the shell on every tap, so cached DOM would go stale |
| Layer | [`src/app/(front)`](<src/app/(front)>) · [`src/components/front`](src/components/front) · [`src/lib/styles.ts`](src/lib/styles.ts) | [`src/app/(mobile)`](<src/app/(mobile)>) · [`src/components/mobile`](src/components/mobile) · [`src/lib/mobile.ts`](src/lib/mobile.ts) |

**What they share** is the content itself.
[`src/lib/content.ts`](src/lib/content.ts) holds every word, link and ordering
on the site and imports neither React nor a Tailwind class; each front end
decides what those look like. Without it the six projects, four skill groups
and two roles would exist twice, and the first edit made to one of them would
be a lie on the other.
[`src/lib/sections.ts`](src/lib/sections.ts) is shared the same way: same six
ids in the same order, addressed as `/#about` on one side and `/m/about` on
the other.

**Which one a request gets** is decided by
[`src/proxy.ts`](src/proxy.ts), before anything renders — a client-side
redirect would paint the wrong site first and cost a second load to leave it.
Phones (`device.type === "mobile"`; tablets and iPads count as desktops) go to
the app, everything else to the document.

That file is the *only* thing that decides. There is deliberately no switch
anywhere in the interface: an escape hatch turns an answer the visitor never
had to think about into a question, and puts it on the one screen size where
the other layout is the wrong one.

Search engines are told the pairing rather than left to guess it: every desktop
route carries `rel="alternate"` pointing at its screen, and every screen
carries a canonical pointing back plus `noindex, follow`.

---

## What is on the site

On the desktop the site is **one page** a visitor scrolls through, in this
order; in the app each row below is a screen of its own:

| Section | What it holds |
| --- | --- |
| **Home** | Name, an animated role line, the three calls to action and a scrolling keyword marquee |
| **About** | Biography, education, three live counters and links to the two products currently in production |
| **Skills** | Frontend, Backend, Database and Tools, each entry linking to its own documentation |
| **Experience** | A timeline of roles and what was owned in each |
| **Work** | Six systems that reached real users, with the stack behind each |
| **Contact** | Email with a one-click copy control, LinkedIn, GitHub and a résumé download |

Six navigation entries — one per section — are declared once in
[`src/lib/sections.ts`](src/lib/sections.ts) and drive the desktop nav rail and
its scroll-spy, the app's tab bar, and the numbered eyebrow above each section.

Further routes exist but are not in the nav: `/about` and `/contact` serve
those two sections on their own, `/user` reads the GitHub account live from the
public API, and `/admin` is a read-only console listing what the site is
currently serving — no auth, no writes. All are excluded from search results,
as is every `/m` screen, and anything else lands on a custom 404 page.

The app adds one screen the document has no equivalent for: its home is a hub
rather than the first sixth of a page, listing the other five sections with
their descriptions and a link to the profile, each one tap away.

### Interaction layer

The desktop document works fully without JavaScript. Everything below is
enhancement layered on top of *that* build — the app owns its behaviour in
React instead and never loads this script — and all of it respects
`prefers-reduced-motion`:

- Sliding pill that follows the active nav entry, driven by one scroll-spy
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
| Framework | **Next.js 16** (App Router, Turbopack, Proxy) | Static prerendering, route groups, first-class metadata, and a device split decided before anything renders |
| UI | **React 19** | Server Components by default; the client ones are the script loader and the app's shell |
| Language | **TypeScript 5.9**, `strict` | The section registry, the content module and the site constants are typed, so a bad id fails the build |
| Styling | **Tailwind CSS v4** | Utilities only — see below |
| Interactions | **Vanilla JS** on the document, React in the app | No hydration cost for effects that are purely visual; real state where screens are replaced on every tap |
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
| [`src/lib/content.ts`](src/lib/content.ts) | Every word, link and ordering on the site — read by both front ends, imports neither React nor a class name |
| [`src/lib/site.ts`](src/lib/site.ts) | Titles, description, author, canonical origin, résumé path, portrait, Open Graph and Twitter cards |
| [`src/lib/sections.ts`](src/lib/sections.ts) | The section registry and the numbering derived from it |
| [`src/lib/styles.ts`](src/lib/styles.ts) | Shared Tailwind class strings — the document |
| [`src/lib/mobile.ts`](src/lib/mobile.ts) | App routes and shared class strings — the phone build |
| [`src/lib/theme.ts`](src/lib/theme.ts) | The inline palette bootstrap, the storage key and the two chrome colours |
| [`src/lib/github.ts`](src/lib/github.ts) | How the GitHub profile is read, for both profile routes |
| [`src/proxy.ts`](src/proxy.ts) | Which build a request gets |
| [`src/app/globals.css`](src/app/globals.css) | Design tokens, keyframes, base layer |

Renaming the résumé, rewording a project, reordering a section or retuning the
palette is a one-file edit in each case — and lands on both front ends at once.

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

Every route is static — thirteen of them, across both builds. Each front end's
layout sets `revalidate = 86400`, which rebuilds them daily — enough to keep
the footer's copyright year honest across a long-lived deployment without
giving up the CDN cache. The proxy runs ahead of that cache, so choosing
between the two costs a redirect rather than a render.

The `/user` route fetches the GitHub API with the same daily revalidation
rather than per visit, since unauthenticated requests are rate-limited per IP.
A failure there returns a reason instead of throwing: a rate-limited API is not
a reason to take a portfolio page down, so the component renders the error and
a direct link to GitHub in place of the profile.

The two commands write to two directories — `next dev` to `.next-dev`,
`next build` and `next start` to `.next` — via a `distDir` keyed on the phase
in [`next.config.ts`](next.config.ts). Sharing one is the default and it does
not survive Windows: a build drops its own `BUILD_ID` and manifests where a
running dev server is rewriting the same names, the dev server starts reading
the build's manifests, and each write becomes a rename into a directory two
processes are holding. Apart, a build can run with the dev server up and
neither leaves artifacts the other will try to read.

### Metadata and SEO

The tab title and the share title are deliberately different values. A tab is a
few characters wide and sits next to a page that already states the name, so it
reads `PN · Portfolio`; sub-pages extend it through a template
(`About · PN · Portfolio`) so several open tabs stay distinguishable. A share
card has no surrounding page to supply context, so `og:title` and
`twitter:title` carry the full descriptive title instead.

Each route sets its own canonical URL and `og:url`. Because the same content
lives at two sets of URLs, the pairing is stated rather than inferred: a
desktop route carries `rel="alternate" media="only screen and (max-width:
760px)"` pointing at its screen, and the screen carries a canonical pointing
back, plus `noindex, follow` so only one of the pair competes in results. The
admin group is `noindex, nofollow`. The image optimizer is restricted to
`/images/**` so it cannot be handed arbitrary local paths to transcode.

### Responsive, in two directions

This is about the *document*. The phone is not a breakpoint of it — it is the
other build, and the two never meet at a width.

Width is the obvious axis: a fluid `clamp()` scale for type and spacing, four
breakpoints (1080 / 880 / 820 / 640 / 560px) where the layout actually changes,
and grids built on `repeat(auto-fit, minmax(min(Npx, 100%), 1fr))` so the
column count falls out of the available room rather than out of a media query.
The nav rail only tightens as the window narrows; it never hands over to
something else, and below 560px it is dropped rather than replaced, because the
page is one document and everything on it is still one scroll away.

Height is the axis most sites forget. A 1440×800 laptop is wider than a tablet
but far shorter, and width-based spacing hands it the roomiest padding of all —
which is exactly backwards, and pushes every section past the fold. Below 880px
of viewport height the vertical rhythm tightens while the layout stays put, via
the `short:` variant defined in [`globals.css`](src/app/globals.css).

Two more queries key on the device rather than the window: `touch:` lifts every
icon button and social link to a 44px target on coarse pointers — a finger is
the same size whichever way the phone is held, so a landscape phone would miss
a width-based rule — and `no-hover:` drops the cursor spotlight where there is
no cursor to follow.

Sections lock to the viewport on a desktop — `scroll-snap-type: y proximity`
with a minimum height of one screen — so the page comes to rest on a section
rather than between two. That is deliberately not applied to a touch device:
a phone scrolls with momentum, and snapping fights the flick it is still
carrying.

The app's own responsiveness is a different problem — one column, always — so
it spends its budget on the two edges instead. `viewport-fit=cover` in the root
layout lets the page run to the edge of the screen and is what makes
`env(safe-area-inset-*)` report anything; the app bar pads its contents past
the notch while its ground reaches the top edge, and the tab bar pads itself
above the home indicator.

### Accessibility

A skip link, a focusable `<main>`, a visible `:focus-visible` ring on every
interactive element, `aria-label` on every icon-only control, `aria-hidden` on
decorative SVG, `aria-current` on the nav entry the page is showing, and a
reduced-motion block that disables the typewriter, the marquee, the orbits,
the reveals and the scroll snapping.

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
│   │   ├── (front)/                 # The document — navbar, footer, ambient background
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── user/
│   │   │   │   ├── User.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── (mobile)/                # The app — one screen per navigation entry
│   │   │   ├── m/
│   │   │   │   ├── about/page.tsx
│   │   │   │   ├── contact/page.tsx
│   │   │   │   ├── experience/page.tsx
│   │   │   │   ├── skills/page.tsx
│   │   │   │   ├── user/page.tsx
│   │   │   │   ├── work/page.tsx
│   │   │   │   └── page.tsx         # The hub
│   │   │   └── layout.tsx           # App bar, tab bar, safe areas
│   │   ├── (admin)/                 # Console — its own chrome, excluded from search
│   │   │   ├── admin/page.tsx
│   │   │   └── layout.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css              # The only stylesheet in the project
│   │   ├── layout.tsx               # <html>, metadata, theme bootstrap
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── IconSprite.tsx           # The <symbol> set every <use> points at
│   │   ├── Rich.tsx                 # Renders the emphasis carried in content.ts
│   │   ├── admin/
│   │   │   └── StatCard.tsx
│   │   ├── front/                   # The document's sections and chrome
│   │   │   ├── About.tsx
│   │   │   ├── Ambient.tsx          # Aurora, grid and noise background
│   │   │   ├── Contact.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Interactions.tsx     # Loads main.js
│   │   │   ├── Navbar.tsx
│   │   │   ├── SectionEyebrow.tsx
│   │   │   ├── Skills.tsx
│   │   │   └── Work.tsx
│   │   └── mobile/                  # The app's shell — all client components but one
│   │       ├── AppBar.tsx           # Where you are, and the theme switch
│   │       ├── CopyEmail.tsx
│   │       ├── ScreenHead.tsx
│   │       └── TabBar.tsx           # Active state from usePathname
│   ├── lib/
│   │   ├── content.ts               # Every word and link on the site — shared
│   │   ├── github.ts                # How both profile routes read the API
│   │   ├── mobile.ts                # App routes and the app's class strings
│   │   ├── sections.ts              # Navigation registry and section numbering
│   │   ├── site.ts                  # Titles, URLs, share cards, CSS-var helpers
│   │   ├── styles.ts                # The document's class strings
│   │   └── theme.ts                 # Inline palette bootstrap
│   ├── proxy.ts                     # Which build a request gets
│   └── types/
│       └── user.d.ts                # Shape of the GitHub profile response
├── next.config.ts
├── postcss.config.mjs               # Tailwind v4 — the whole build config
├── tsconfig.json                    # `@/*` → `./src/*`
└── vercel.json
```

Route groups split the site in three. `(front)`, `(mobile)` and `(admin)` share
the root layout — the palette, the fonts, the metadata — but nothing below it.
The console has a different job, and sharing the marketing header would invite
the two to drift into each other; the app has a different *medium*, and sharing
components would pull it back towards being a narrow copy of the document,
which is the thing it exists to stop being.

`src/components/IconSprite.tsx` and `src/components/Rich.tsx` sit above both
front ends because they are genuinely neutral: one is the glyph set, the other
turns the emphasis stored in `content.ts` back into elements using whichever
classes the caller passes.

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

**The mark** — [`public/images/logo.svg`](public/images/logo.svg) is the
portrait from the GitHub profile reduced to the two features that survive at
icon size: a head-and-shoulders bust, and a pair of round glasses. The lenses
are holes rather than dots — an even-odd fill — so the brand gradient behind
the mark shows through them. It renders identically at 16 px in a tab and at
512 px on a home screen, appears in the navbar, and is baked over the gradient
in the favicon and the apple-touch icon.

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
