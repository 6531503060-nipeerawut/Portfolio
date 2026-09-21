# CLAUDE.md

คู่มือสำหรับ AI agent (Claude Code ฯลฯ) และคนในทีมที่ใช้ AI ช่วยเขียนโค้ดในโปรเจกต์นี้
**อ่านไฟล์นี้ก่อนเริ่มงานทุกครั้ง** — มันบอก "ภาพรวม + กฎที่พังเงียบถ้าไม่รู้"

โปรเจกต์นี้คือ **Portfolio & Résumé ของ Peerawut Nipakornpan** — เว็บ Next.js 16 (App Router)
ที่เสิร์ฟ **สอง front end จากโปรเจกต์เดียว**: เอกสารบนเดสก์ท็อป (`/`) กับแอปบนมือถือ (`/m/*`)
พร้อมเรซูเม่สองฉบับที่ render เป็น PDF จาก HTML ในรีโปนี้

> ✅ **สถานะ: จัดโครงสร้างใหม่ตามมาตรฐานเดียวกับ `circle-web-application@version-1` เรียบร้อยแล้ว**
> `features/` · `components/{ui}` · `constants/` · `lib/` · `types/` · `hooks/` ครบ ·
> ESLint บังคับ R3/R6/R9 ได้จริง · มี `scripts/check-*.mjs` สี่ตัว · `npm run check` ผ่านทั้งชุด
>
> 📊 **เนื้อหาบนเว็บถูกอัปเดตจากรีโปจริงทั้ง 7 ตัว** (ดู §6 และ §13) — ตัวเลข 306 commits /
> 7 repositories / 2 platforms **นับมาจาก git จริง ไม่ได้ประมาณ**

---

## 🚫 ข้อห้ามระดับโปรเจกต์

1. **ห้ามรวมสอง front end เข้าด้วยกันด้วย breakpoint** — `(front)` คือ *เอกสาร* · `(mobile)` ที่ `/m/*`
   คือ *แอป* คนละคำศัพท์ทางสายตา คนละโครง คนละวิธีเดินทาง (ดู §4 R14)
2. **ห้ามใส่ปุ่มสลับ "ดูเวอร์ชันเดสก์ท็อป/มือถือ"** — `src/proxy.ts` เป็นคนตัดสินคนเดียว
3. **ห้าม commit** — เจ้าของรีโปเป็นคน commit เองเท่านั้น (ทีมสั่ง 2026-09-21)
4. **ห้ามปิด Chrome ของเครื่องอัตโนมัติ** — ถ้าต้องใช้ headless ให้ใช้ `--user-data-dir` แยก
   ใน scratchpad และปิดเฉพาะ process ของตัวเอง (ดู §6.2)
5. **ห้ามแก้ไฟล์ของรีโปอื่น** — รีโปใน §13 **อ่านเพื่ออ้างอิงได้อย่างเดียว**
6. **ห้ามสร้าง `.github/workflows/`** — ไม่มี CI/CD ในโปรเจกต์นี้ · ด่านคุณภาพคือ `npm run check`
   ที่เครื่อง + Vercel build

---

## 1. Tech Stack — ตายตัว ห้ามเปลี่ยนโดยไม่ได้รับ approval

| ชั้น | ของที่ใช้ | หมายเหตุ |
|---|---|---|
| Framework | **Next.js 16.3.3** (App Router) | `src/app/` เท่านั้น ไม่มี Pages Router |
| ภาษา | **TypeScript 5.9** `strict: true` | ห้ามปิด strict · ห้าม `any` (R6) |
| UI | **React 19.2** | Server Component เป็นค่าตั้งต้น |
| สไตล์ | **Tailwind CSS v4** + `@theme` ใน `globals.css` | ไม่มี `tailwind.config.js` (R11) |
| ฟอนต์ | **next/font/google** (Sora · Inter · JetBrains Mono) | self-host ไม่มีคำขอไป Google (ดู §8) |
| HTTP | **`fetch` ผ่าน `src/lib/api-client.ts` ที่เดียว** | ไม่มี axios · ไม่มี TanStack Query (ดู R3/R4) |
| Lint | **ESLint 9** flat config + `eslint-plugin-boundaries` | บังคับ R3/R6/R9 |
| Format | **Prettier 3** (`singleQuote` · `printWidth 100` · `endOfLine lf`) | เหมือน circle เป๊ะ |
| Node | **≥ 20.9** บังคับด้วย `engines` + `.npmrc` (`engine-strict`) | npm เท่านั้น |
| Deploy | **Vercel** (`vercel.json` → framework `nextjs`) | ต้องมี Node runtime เพราะมี proxy |

### 1.1 ทำไมโปรเจกต์นี้ **ไม่ได้** ใช้ `output: 'export'` แบบ circle

`circle-web-application` เป็น static export เพราะมี back-end แยกและเสิร์ฟหลัง Firebase Hosting
แต่โปรเจกต์นี้ **ต้องมี Node runtime** เพราะหัวใจของมันคือ `src/proxy.ts` ที่อ่าน `User-Agent`
แล้วตัดสินว่าจะตอบด้วย front end ไหน — งานนี้ทำฝั่ง static ไม่ได้เลย

ผลที่ตามมา:

- **มี `src/proxy.ts` ได้** (circle ห้ามตาม R2 ของที่นั่น) แต่จำกัดไว้ที่ไฟล์เดียว — ดู R2 ข้างล่าง
- ทุกหน้ายัง **prerender เป็น static** อยู่ (`revalidate = 86400`) แค่มี middleware คั่นหน้าเท่านั้น
- `next start` ใช้ได้ตามปกติ · ไม่มีโฟลเดอร์ `out/`

---

## 2. Environment

| ไฟล์ | ใช้กับ | อยู่ใน git? |
|---|---|---|
| `.env.example` | ต้นฉบับรายการคีย์ | ✅ ใช่ |
| `.env.local` | เครื่อง dev | ❌ ไม่ |
| `.env.production` | ถ้า deploy ที่อื่นที่ไม่ใช่ Vercel | ❌ ไม่ (บน Vercel ใช้ dashboard แทน) |

```bash
cp .env.example .env.local     # PowerShell: Copy-Item .env.example .env.local
npm run check:env
```

| ตัวแปร | ทำอะไร |
|---|---|
| `NEXT_PUBLIC_APP_ENV` | `local` \| `production` — **ต้องตรงกับชื่อไฟล์** |
| `NEXT_PUBLIC_SITE_URL` | origin ที่ใช้ resolve canonical / Open Graph ตอน build |

🚨 **ทุกคีย์ต้องขึ้นต้นด้วย `NEXT_PUBLIC_` และห้ามใส่ secret** — โปรเจกต์นี้ไม่มี secret ฝั่ง server
เลยสักตัว ถ้าวันหนึ่งมี แปลว่าออกแบบผิด

`npm run check:env` ตรวจ 4 ข้อ: ไฟล์ครบ · คีย์ตรงกับ `.env.example` เป๊ะ · ทุกคีย์มีค่า ·
ทุกคีย์ที่ `src/` เรียกใช้ต้องอยู่ใน `.env.example`

---

## 3. โครงสร้างโฟลเดอร์

```
src/
├── app/                        # ROUTING เท่านั้น — ห้ามวาง business logic (R1)
│   ├── layout.tsx              # root layout: <html>/<body> + next/font + metadata + theme bootstrap
│   ├── globals.css             # Tailwind v4 + @theme — theme กลางของทั้งเว็บ (R11)
│   ├── favicon.ico
│   ├── not-found.tsx
│   │
│   ├── (front)/                # 🅾️ เอกสารบนเดสก์ท็อป — navbar + ambient + footer + main.js
│   │   ├── layout.tsx
│   │   ├── page.tsx            # /          → <DocumentScreen />
│   │   ├── about/page.tsx      # /about     → <About />     (route composition)
│   │   ├── contact/page.tsx    # /contact   → <Contact />
│   │   └── user/page.tsx       # /user      → <AccountScreen />
│   │
│   ├── (mobile)/               # 🅾️ แอปบนมือถือ — AppBar + TabBar + พื้นหลัง static
│   │   ├── layout.tsx
│   │   └── m/
│   │       ├── page.tsx        # /m            → <HomeScreen />
│   │       ├── about/page.tsx  # /m/about      → <AboutScreen />
│   │       ├── skills/page.tsx # /m/skills     → <SkillsScreen />
│   │       ├── experience/page.tsx
│   │       ├── work/page.tsx
│   │       ├── contact/page.tsx
│   │       └── user/page.tsx   # /m/user       → <AccountAppScreen />
│   │
│   └── (admin)/                # 🅾️ คอนโซลภายใน — ไม่ให้ index
│       ├── layout.tsx
│       └── admin/page.tsx      # /admin        → <ConsoleScreen />
│
├── features/                   # แยกตาม BUSINESS FEATURE
│   ├── document/               # front end ฝั่งเดสก์ท็อป
│   │   └── components/         # DocumentScreen · Hero · About · Skills · Experience · Work
│   │                           # Contact · Navbar · Footer · Ambient · Interactions · SectionEyebrow
│   ├── handheld/               # front end ฝั่งมือถือ
│   │   └── components/         # HomeScreen · AboutScreen · SkillsScreen · ExperienceScreen
│   │                           # WorkScreen · ContactScreen · AppBar · TabBar · ScreenHead · CopyEmail
│   ├── account/                # โปรไฟล์ GitHub — feature เดียว สอง front end ใช้ร่วม
│   │   ├── api.ts              # 🔌 จุดเดียวที่ feature นี้ยิงเน็ต (loadUser)
│   │   ├── types.ts            # GitHubUser · GitHubUserResult
│   │   └── components/         # AccountCard · AccountScreen (เดสก์ท็อป) · AccountAppScreen (มือถือ)
│   └── console/                # คอนโซลภายใน
│       └── components/         # ConsoleScreen · StatCard
│
├── components/                 # SHARED — ของกลางที่ห้ามรู้จัก feature (R9)
│   └── ui/
│       ├── IconSprite.tsx      # ไอคอนทั้งเว็บ (sprite เดียว ไม่มี icon font)
│       ├── Rich.tsx            # ประโยคที่มีคำเน้น → element
│       ├── document.ts         # คำศัพท์คลาสของ "เอกสาร" (SHELL · CARD · BTN · REVEAL …)
│       └── handheld.ts         # คำศัพท์คลาสของ "แอป"  (SCREEN · APP_CARD · APP_ROW …)
│
├── constants/
│   ├── index.ts                # ตัวตนของเว็บ: TITLE · DESCRIPTION · SITE_URL · RESUME_HREF · OG/Twitter
│   ├── content.ts              # ★ ทุกคำที่เว็บพูด (PROFILE · STATS · SKILL_GROUPS · TIMELINE · PROJECTS)
│   ├── navigation.ts           # SECTIONS + ที่อยู่ของทั้งสองฝั่ง (sectionHref · appHref · TABS)
│   └── routes.ts               # ตารางจับคู่ TO_APP / TO_WEB ที่ proxy ใช้
│
├── hooks/                      # ⬜ ที่ว่างที่เตรียมไว้ (มีแค่ .gitkeep)
├── lib/
│   ├── api-client.ts           # 🔒 ไฟล์เดียวที่แตะ fetch ได้ (R3)
│   ├── device-route.ts         # ฟังก์ชันบริสุทธิ์: path + เป็นมือถือไหม → ปลายทาง
│   ├── theme.ts                # THEME_BOOTSTRAP ที่ inline ลง <head>
│   └── utils.ts                # cssVars · stagger · cn
│
├── types/
│   └── content.ts              # รูปร่างของคำที่เว็บพูด (RichText · SkillGroup · Role · Project …)
│
└── proxy.ts                    # 🚦 middleware: ตัดสินว่า request นี้ได้ front end ไหน
```

นอกจาก `src/` ยังมีที่ root: `eslint.config.mjs` · `.prettierrc.json` · `.npmrc` · `.gitattributes` ·
`.env.example` · `next.config.ts` · `vercel.json` และ

- `scripts/` — `check-env.mjs` · `check-routes.mjs` (R13) · `check-proxy.mjs` (ชุดทดสอบ proxy) ·
  `check-fold.mjs` (R15 — วัดความสูงจริงในเบราว์เซอร์) · `free-port.mjs` (`predev`)
- `resume/` — `resume.html` (ฉบับออกแบบ) · `resume-ats.html` (ฉบับ ATS) · `photo.png`
  → render เป็น PDF ไปวางที่ `public/` (ดู §6.2)
- `public/` — `images/` · `js/main.js` (สคริปต์ interaction ของฝั่งเอกสาร) · PDF เรซูเม่ 2 ไฟล์

> ⚠️ **เพิ่มโฟลเดอร์ใหม่ระดับบนใน `src/` ต้องไปประกาศที่ `boundaries/elements` ใน
> `eslint.config.mjs` ก่อน** ไม่งั้น `npm run lint` แดงด้วย `boundaries/no-unknown-files`
> — จงใจให้เป็นแบบนั้น (ดู R9)

### หลักการตัดสินใจว่า "ไฟล์นี้ควรอยู่ที่ไหน"

| คำถาม | คำตอบ |
|---|---|
| ใช้ใน feature เดียว? | → `features/<feature>/…` |
| ใช้ตั้งแต่ 2 features ขึ้นไป? | → `components/ui/`, `hooks/`, `lib/`, `types/` หรือ `constants/` |
| เป็นหน้าเว็บ (route)? | → `app/…/page.tsx` ที่ import Screen จาก `features/` |
| เป็น "คำที่เว็บพูด"? | → `constants/content.ts` (ห้ามฮาร์ดโค้ดในคอมโพเนนต์) |
| เกี่ยวกับการยิงเน็ต? | → `lib/api-client.ts` เท่านั้น |

> 📌 **ทำไม `account` เป็น feature เดียวทั้งที่มีสองหน้าจอ**
> `/user` กับ `/m/user` อ่าน **บัญชีเดียวกัน ผ่าน `loadUser` ตัวเดียวกัน** ถ้าแยกเป็นสอง feature
> จะติด R9 แล้วทางออกเดียวคือก๊อปฟังก์ชันเรียก API ไปไว้สองที่ ซึ่งวันหนึ่งจะหลุดจากกัน
> เกณฑ์ตัดสินคือ **"สอง route นี้แชร์ข้อมูลชุดเดียวกันไหม"** ไม่ใช่ "หนึ่งหน้า = หนึ่ง feature"
>
> ส่วน `document` กับ `handheld` **แชร์ข้อมูลกันจริง** แต่ข้อมูลนั้นอยู่ที่ `constants/content.ts`
> (ของกลาง) ทั้งคู่จึงหยิบได้โดยไม่ต้องรู้จักกัน — สิ่งที่ทั้งสอง feature **ไม่** แชร์คือ *สายตา*
> ซึ่งก็คือเหตุผลทั้งหมดที่มันเป็นคนละ feature

---

## 4. 🚨 กฎเหล็ก (Hard Rules) — ค้างข้อไหน = ไม่ผ่าน Code Review

### R1: `page.tsx` ต้องเป็น **Thin Route Entry**

**อนุญาตเฉพาะ:** `metadata` แบบ static · ประกอบ component (route composition) + `<Suspense>` ·
`redirect` / `notFound` · import Screen จาก `features/`
**ห้าม:** business logic ทุกชนิด · `useState` / `useEffect` · การเรียก API

> หน้าที่ยาวกว่า ~25 บรรทัด แปลว่ามันไม่ใช่ route entry แล้ว — ย้ายเนื้อในไปเป็น `<XxxScreen />`

### R2: ห้ามสร้าง `app/api/` · Server Action · หรือ middleware ตัวที่สอง

- โปรเจกต์นี้เป็น front-end ล้วน ไม่มี back-end ของตัวเอง
- **ข้อยกเว้นเดียวคือ `src/proxy.ts`** ซึ่งมีอยู่ก่อนกฎนี้และมีเหตุผลที่ §1.1 —
  มันเลือก front end จาก `User-Agent` ก่อน HTML ไบต์แรก ซึ่งย้ายไปทำที่อื่นไม่ได้
- ESLint บังคับให้ `proxy.ts` import ได้แค่ `constants/` กับ `lib/` เท่านั้น (ดู R9)

### R3: ยิงเน็ตผ่าน `lib/api-client.ts` เท่านั้น

- ห้าม `fetch()` · `window.fetch` · `globalThis.fetch` · `XMLHttpRequest` ที่อื่นทั้งหมด
- ✅ **บังคับด้วย ESLint แล้ว** — `no-restricted-globals` + `no-restricted-syntax`
  ปิดครบทุกทางหนี · ยกเว้นเฉพาะไฟล์ `src/lib/api-client.ts`
- เหตุผล: นโยบายรอบ ๆ คำขอ (แคชนานเท่าไร · อะไรนับว่าพัง · พังแล้วกลายเป็นอะไร) ต้องเหมือนกัน
  สำหรับคนเรียกคนที่สอง และคนเรียกคนที่สองมาเสมอ

### R4: ไม่มี client-side data fetching ในโปรเจกต์นี้

ทุกหน้าเป็น Server Component ที่ prerender แล้ว revalidate รายวัน — **ไม่มี TanStack Query**
เพราะไม่มีอะไรให้มันทำ

🆕 ถ้าวันหนึ่งต้องมีจริง ให้ทำตามลำดับนี้ ห้ามลัด:
`Component → hook (ใน feature) → api.ts (ใน feature) → lib/api-client.ts`
และติดตั้ง TanStack Query แบบเดียวกับ `circle-web-application` (provider แยกไฟล์ที่มี
`'use client'` ของตัวเอง · Query Key Factory ที่ `keys.ts`) **ห้ามใช้ `useEffect` + `useState` fetch เอง**

### R5: แยกชั้นข้อมูล — Component ห้ามเรียก `api.ts` ตรง ๆ

ตอนนี้ Screen ฝั่ง server `await` `api.ts` ของ feature ตัวเองได้ (สี่ชั้นยุบเหลือสองเพราะ
การ render *คือ* การ fetch) แต่ **ห้ามข้ามไปเรียก `lib/api-client.ts` ตรง ๆ จาก component**
— `api.ts` ของ feature คือจุดเดียวที่รู้ว่า endpoint หน้าตายังไง

### R6: TypeScript ใช้เต็มควบ

- ห้าม `any` (`@typescript-eslint/no-explicit-any` = `error`) · จำเป็นจริงต้องมี
  `eslint-disable-next-line` พร้อมเหตุผลกำกับ
- `strict: true` ห้ามปิด และห้ามลดเป็นรายข้อ
- ตัวแปรที่ตั้งใจไม่ใช้ขึ้นต้นด้วย `_`
- **ห้าม ambient global type** (`declare global`) สำหรับ payload ภายนอก — ประกาศใน
  `types.ts` ของ feature แล้ว import มา (เคยเป็น `src/types/user.d.ts` · ย้ายแล้ว 2026-09-21)

### R7: ใช้ import alias `@/` เสมอเมื่อข้ามโฟลเดอร์

ภายใน feature เดียวกัน (ระยะ 1–2 ชั้น) ใช้ relative ได้ เช่น `./ScreenHead` · `../api`

### R8: `'use client'` วางที่ **Client Boundary** เดียวต่อ feature

- ไฟล์ที่ประกาศ `'use client'` ตอนนี้มีแค่ `AppBar.tsx` · `TabBar.tsx` · `CopyEmail.tsx` ·
  `Interactions.tsx` · `Navbar.tsx` — ล้วนเป็นชิ้นที่ *ต้อง* มี event listener จริง ๆ
- `page.tsx` / `layout.tsx` คงเป็น Server Component เสมอ (R1)
- **กับดัก:** `'use client'` ต้องเป็นบรรทัดแรกจริง ๆ ของไฟล์ · Client Component ห้ามเป็น
  `async function` · อย่าเผลอเอาไปไว้ที่ `layout.tsx` เพราะจะลากทั้งแอปลง client bundle

### R9: ห้าม feature import ข้าม feature กันเอง

- `features/document` ห้าม import จาก `features/handheld` และกลับกัน
- ของกลาง (`components/` `hooks/` `lib/` `types/` `constants/`) **ห้ามรู้จัก feature**
- ✅ **บังคับด้วย `eslint-plugin-boundaries`** → เขียนผิดแล้ว lint แดงทันที
- `src/proxy.ts` ถูกยกเว้นจากการจัดประเภท (element pattern จับโฟลเดอร์ ไม่จับไฟล์เดี่ยว)
  แต่มีกฎของตัวเองที่ห้าม import `@/features/*` และ `@/app/*`

> 🚨 **`boundaries/dependencies` ข้ามไฟล์ที่มันไม่รู้จัก ต่อให้ตั้ง `default: 'disallow'`**
> ใครสร้าง `src/utils/` หรือ `src/store/` ขึ้นมา มันจะกลายเป็นทางลัดให้ feature เรียกข้าม
> feature ได้โดย lint เขียวสนิท — R9 หายไปเงียบ ๆ ทั้งข้อ
> จึงเปิด `boundaries/no-unknown-files` ไว้: ไฟล์ใน `src/` ที่ไม่เข้าพวกกับ element ไหนเลยจะแดงทันที

### R10: ทุกคำที่เว็บพูด อยู่ที่ `constants/content.ts` ที่เดียว

- ห้ามฮาร์ดโค้ดชื่อโปรเจกต์ · สถิติ · หัวข้อ · แท็ก ลงในคอมโพเนนต์
- เหตุผล: เว็บนี้ render **สองครั้ง** ถ้าคำอยู่ในคอมโพเนนต์ แต่ละฝั่งจะมีสำเนาของตัวเอง และ
  การแก้ครั้งแรกที่ทำแค่ฝั่งเดียวจะกลายเป็นคำโกหกบนอีกฝั่ง
- รูปร่างของคำอยู่ที่ `types/content.ts` · `constants/content.ts` **ห้าม import React หรือ
  ชื่อคลาส Tailwind**

### R11: สี ฟอนต์ ระยะ มุมโค้ง และ motion — มาจาก `app/globals.css` ที่เดียว

- ห้ามประกาศสี/ฟอนต์เป็นค่าดิบซ้ำในคอมโพเนนต์ ใช้ token จาก `@theme`
- คลาสที่ใช้ซ้ำหลายที่ให้ขึ้นไปอยู่ที่ `components/ui/document.ts` หรือ `handheld.ts`
- ⚠️ **Tailwind สแกนไฟล์พวกนี้เหมือนซอร์สอื่น** — ทุกคลาสต้องเขียนเต็ม ห้ามประกอบจาก
  เศษ string ตอน runtime ไม่งั้นคลาสจะหายไปจาก bundle เงียบ ๆ

### R12: หนึ่งอย่างที่ใช้ซ้ำ = **component กลาง** ตัวเดียว

- หกส่วนของเอกสารใช้ `SectionEyebrow` ตัวเดียว · หกหน้าจอของแอปใช้ `ScreenHead` ตัวเดียว
- ห้ามก๊อป markup ไปแก้เอง — ถ้าต่างกันจริงให้รับ prop

### R13: ห้ามสร้าง Dynamic Segment (`[id]`, `[slug]`, `[...path]`)

- route ของเว็บนี้เป็นชุดคงที่ที่เขียนด้วยมือ ไม่มีคอลเล็กชันให้ไล่หน้า
- dynamic segment ที่โผล่มาจึงมีแต่ route ที่ไม่มีใครตั้งใจสร้าง — มันจะ render ให้ทุก string
  ที่ crawler ลองยิง และตารางสองใบของ proxy ไม่มีบรรทัดสำหรับมัน
- ต้องการหน้าที่อ้างด้วยค่า → route คงที่ + query param (`/work/detail?id=…`)
- ✅ **บังคับด้วย `npm run check:routes`**

### R14: 🆕 สอง front end ห้ามรวมกัน และห้ามมีปุ่มสลับ

- `(front)` คือ **เอกสาร** — hero เต็มจอ · section สูงเท่าจอ · hover · cursor spotlight ·
  scroll spy ที่ขับด้วย `public/js/main.js`
- `(mobile)` คือ **แอป** — หนึ่งหน้าจอต่อหนึ่งเมนู · list row · pressed state · tab bar
- คนตัดสินคือ `src/proxy.ts` **คนเดียว** และมันตัดสินก่อน render
- ห้ามใส่ลิงก์ "ดูเวอร์ชันเดสก์ท็อป" ที่ไหนทั้งนั้น: ทางออกฉุกเฉินเปลี่ยนคำตอบที่ผู้ใช้
  ไม่เคยต้องคิด ให้กลายเป็นคำถาม บนขนาดจอเดียวที่อีกเลย์เอาต์เป็นคำตอบที่ผิด
- ✅ **บังคับด้วย `npm run check:proxy`** — ตารางสองใบต้องวนกลับหากัน · ทุกปลายทางต้องมี
  `page.tsx` จริง · `config.matcher` ต้องครอบทุกคีย์ · และชุดเคส 18 เคสต้องผ่าน

### R15: 🆕 ทุก section ของฝั่งเอกสารต้อง **พอดีหนึ่งหน้าจอ**

เอกสารฝั่งเดสก์ท็อปตั้งอยู่บนคำสัญญาข้อเดียว: **หนึ่ง section = หนึ่งหน้าจอ** — กระโดดถึงแล้วอ่านจบ
โดยไม่ต้องเลื่อน แล้วเลื่อนครั้งเดียวไปอันถัดไป (`scroll-snap` + `scroll-padding-top` ทำงานบนสมมติฐานนี้)

🚨 **CSS รักษาคำสัญญานี้เองไม่ได้** — `SECTION` ตั้งแค่ `min-height` ไม่ใช่ `max-height`
section ที่โตเกินจอจึงไม่ error ไม่เตือน และไม่ดูพังในภาพที่ถ่ายจากบนสุดของหน้า
มันแค่ **เริ่มถูกขอบจอตัดเงียบ ๆ** และทางเดียวที่จะรู้คือเปิดที่ขนาดหน้าต่างจริงแล้วดู

- ✅ **บังคับด้วย `npm run check:fold`** — สตาร์ตไซต์ที่ build แล้ว ขับ Chrome ผ่าน DevTools
  protocol แล้ววัดความสูงจริงของทุก section ที่ 5 ขนาดหน้าต่างอ้างอิง
- คำสัญญานี้เริ่มที่ **กว้าง ≥ 1280px** (`SECTION` ใน `components/ui/document.ts`)
  ต่ำกว่านั้นหน้าเลื่อนได้อิสระเหมือนบนแท็บเล็ต — ไม่มีอะไรให้ล้น
- **hero (`#home`) เป็นข้อยกเว้น**: มันคือ `min-h-svh` เต็มจอ โดย navbar ลอยทับ ไม่ใช่ตั้งอยู่เหนือมัน
  งบของมันจึงเป็นความสูงจอเต็ม ไม่ใช่ความสูงลบแถบ
- 🚨 **`PROJECTS` ต้องเป็นจำนวนเท่าของ 4** — กริด Work เป็น 4 คอลัมน์ตายตัวตั้งแต่ 1280px
  ชิ้นที่ 9 คือแถวที่สามและล้นทันที (ทางแก้คือทำให้ครบ 12 หรือตัดออก ไม่ใช่ผ่อนกฎ)

> 📌 **บทเรียน 2026-09-21** — การเพิ่มรายการเข้า Skills/Work/Experience โดยไม่วัด ทำให้สาม section
> ล้นขอบจอพร้อมกัน และไม่มีเครื่องมือไหนในโปรเจกต์ฟ้องเลย ทั้ง lint ทั้ง tsc ทั้ง build เขียวหมด
> · แก้เพิ่มสองอย่างในรอบเดียวกัน: ขยาย breakpoint `short` จาก `max-height: 880px` เป็น `1000px`
>   (หน้าต่างเต็มจอบนจอ 1080p สูงราว 935px ซึ่งเคยหลุดออกไป) และเลื่อนเกณฑ์ full-height
>   จาก 1024px เป็น 1280px

---

## 5. Naming Conventions

| สิ่งที่ตั้งชื่อ | รูปแบบ | ตัวอย่าง |
|---|---|---|
| Component (ไฟล์ + ตัว component) | PascalCase | `SectionEyebrow.tsx` |
| Screen (เนื้อในของ route) | PascalCase ลงท้าย `Screen` | `HomeScreen.tsx` · `AccountAppScreen.tsx` |
| Hook | camelCase ขึ้นต้น `use` | `useSomething.ts` |
| ฟังก์ชัน / ตัวแปร | camelCase | `loadUser`, `appHref` |
| Type / Interface | PascalCase ไม่ใส่ prefix `I` | `GitHubUser`, `SkillGroup` |
| ค่าคงที่ | UPPER_SNAKE_CASE | `APP_ROOT`, `SKILL_GROUPS` |
| คำศัพท์คลาส | UPPER_SNAKE_CASE ในไฟล์ของฝั่งนั้น | `CARD` (document) · `APP_CARD` (handheld) |
| โฟลเดอร์ | kebab-case | `features/handheld/` |
| Route folder | kebab-case ตาม URL จริง (ห้ามมี `[...]`) | `app/(mobile)/m/experience/` |

**ต่อท้ายของฝั่งมือถือด้วย `APP_`** — คำศัพท์สองชุดอยู่คนละไฟล์อยู่แล้ว แต่ prefix ทำให้
เวลาอ่าน diff รู้ทันทีว่ากำลังแก้ฝั่งไหน

---

## 6. ตัวเลขบนเว็บมาจากไหน (และวิธีนับใหม่)

### 6.1 สถิติใน `constants/content.ts`

`STATS` มีสามตัว: **2 platforms · 7 repositories · 306 commits**
ทั้งหมด **นับจาก git จริง** ห้ามเดา ห้ามปัดขึ้น ถ้าจะอัปเดตให้รันใหม่:

```bash
# นับ commit ของเจ้าของรีโปในแต่ละโปรเจกต์ บน branch ที่ระบุใน §13
git -C <repo> rev-list --count --author='offpeerawutt' <branch>

# ดูรายชื่อผู้เขียนทั้งหมด เผื่อชื่อ/อีเมลเปลี่ยน
git -C <repo> shortlog -sne <branch>
```

ผลล่าสุด (2026-09-21):

| repo | branch | commits |
|---|---|---|
| `gendee-web-application` | `feat-courses` | 176 |
| `gendee-edge-functions` | `version-2` | 36 |
| `gendee-dashboard` | `version-2` | 17 |
| `circle-web-application` | `version-1` | 33 |
| `bcc24news` | `version-2` | 22 |
| `bcc24news-dashboard` | `version-2` | 11 |
| `bcc24news-edge-functions` | `version-2` | 11 |
| **รวม** | | **306** |

🚨 **ตัวเลขนี้ผูกกับ branch** — คนละ branch ได้คนละเลข ถ้าอัปเดตต้องอัปเดตทั้ง
`constants/content.ts` · `resume/resume.html` · `resume/resume-ats.html` · ตารางข้างบนนี้ ให้ตรงกันหมด

### 6.2 เรซูเม่: HTML → PDF

เรซูเม่ **เขียนเป็น HTML** ที่ `resume/` แล้ว render เป็น PDF ไปวางที่ `public/`
(`Resume_PeerawutNi.pdf` · `Resume_PeerawutNi-ATS.pdf`)

```bash
# ⚠️ ต้องใช้ --user-data-dir แยก ไม่งั้นจะไปยุ่งกับ Chrome ที่เปิดอยู่ของเจ้าของเครื่อง
chrome --headless=new --disable-gpu --no-first-run --no-default-browser-check \
  --user-data-dir="<scratchpad>/chrome-profile" \
  --print-to-pdf="<out>.pdf" --no-pdf-header-footer --virtual-time-budget=8000 \
  "file:///<abs path>/resume/resume.html"
```

🚨 **ทั้งสองฉบับต้องเป็น "หน้าเดียว" เสมอ** — เพิ่มข้อความแล้วต้อง render ตรวจทุกครั้ง
เช็กจำนวนหน้าโดยอ่าน `/Type /Pages … /Count N` จากไฟล์ PDF ตรง ๆ:

```js
readFileSync(pdf).toString('latin1').match(/\/Type\s*\/Pages[\s\S]{0,300}?\/Count\s+(\d+)/)[1]
```

> 📌 ตอนแก้รอบ 2026-09-21 เนื้อหาใหม่ทำให้ล้นเป็นสองหน้าทั้งคู่ ต้องตัดคำจนพอดีอีกรอบ —
> เลย์เอาต์ของสองไฟล์นี้ **ถูกจูนมาให้เต็มหน้าพอดีเป๊ะ** ที่ว่างเหลือน้อยกว่าที่คิดมาก

---

## 7. ⚠️ กับดักของ Next.js 16 (พังเงียบถ้าไม่รู้)

### 7.1 `middleware.ts` เปลี่ยนชื่อเป็น `proxy.ts` และ export ชื่อ `proxy`

ไฟล์นี้อยู่ที่ `src/proxy.ts` และ export `export function proxy(request: NextRequest)`
ถ้าตั้งชื่อเก่าจะ **ไม่ถูกเรียกเลยโดยไม่มี error**

### 7.2 `config.matcher` ต้องเป็น **array literal**

Next อ่านค่านี้ด้วยการ *parse ไฟล์* ตอน build — import ค่าคงที่มาจากที่อื่นจะมองไม่เห็น
จึงต้องเขียนซ้ำไว้ที่ `proxy.ts` แล้วให้ `npm run check:proxy` เป็นคนเทียบกับตารางใน
`constants/routes.ts` แทน

### 7.3 `params` / `searchParams` เป็น Promise แล้ว — ต้อง `await`

(ยังไม่มีหน้าไหนในโปรเจกต์นี้ใช้ แต่จะเจอทันทีที่เพิ่มหน้าที่รับ query param)

### 7.4 `scroll-behavior: smooth` ไม่ถูก override ให้แล้ว

`<html>` จึงต้องมี `data-scroll-behavior="smooth"` เพื่อขอให้ Next พักการ scroll แบบ smooth
ระหว่างเปลี่ยน route ไม่งั้นทุกการ navigate จะ "ไหล" กลับขึ้นบนสุดของหน้าใหม่ให้เห็น

### 7.5 Turbopack บน Windows เคยพ่น `EPERM: operation not permitted, rename …`

- ต้นเหตุคือ **dev กับ build ใช้ `.next` ร่วมกัน** และ Turbopack เขียน manifest ชนกันเอง
- แก้ไว้สองชั้น: `next.config.ts` แยก `distDir` (`.next-dev` สำหรับ dev) และ
  `"dev": "next dev --webpack"` (เหมือนที่ circle ทำ)
- `build` ยังใช้ Turbopack ตามเดิม เพราะไม่เคยมีอาการนี้และเร็วกว่ามาก
- `predev` เรียก `scripts/free-port.mjs` ปิด process เก่าบนพอร์ต 3000 + ลบ `.next-dev` ค้าง
- 🔄 ให้ลองถอด `--webpack` ออกอีกครั้งเมื่ออัป Next รุ่นใหม่

### 7.6 `devIndicators: false` ปิดป้ายมุมล่างซ้ายตอน dev

Next 16 ถอด `appIsrStatus` / `buildActivity` ออกหมดแล้ว เหลือแค่ `false` กับ `{ position }`

---

## 8. ฟอนต์

สามหน้าโหลดผ่าน **`next/font/google`** ใน `src/app/layout.tsx` → self-host ที่ origin เดียวกัน
ไม่มี DNS lookup / TLS handshake / stylesheet ที่บล็อก render ไปหา `fonts.googleapis.com` อีก

| ตัวแปร | face | น้ำหนักที่โหลด | ใช้ที่ |
|---|---|---|---|
| `--font-sora` | Sora | 400–800 | `--font-display` |
| `--font-inter` | Inter | 400–700 | `--font-body` |
| `--font-jetbrains-mono` | JetBrains Mono | 400–500 | `--font-mono` |

🚨 **ทั้งสามไม่ใช่ variable font** — ต้องระบุ `weight` เป็นรายค่า และ **แต่ละค่าคือไฟล์เพิ่มหนึ่งไฟล์**
ใส่น้ำหนักที่ไม่ได้ใช้ = ผู้ใช้ดาวน์โหลดฟรี ๆ · ใช้น้ำหนักที่ไม่ได้โหลด = เบราว์เซอร์ปลอมให้แบบหนา ๆ

`globals.css` ชี้ `--font-display` / `--font-body` / `--font-mono` ไปที่ตัวแปรข้างบน แล้วตามด้วย
fallback stack — **ที่เดียวที่เลือกหน้าฟอนต์ยังเป็น `globals.css` ตาม R11**

---

## 9. Enforcement — กฎที่บังคับได้ด้วยเครื่องมือ

### 9.1 ESLint (`eslint.config.mjs`)

| กฎ | บังคับยังไง |
|---|---|
| R3 | `no-restricted-globals` + `no-restricted-syntax` (fetch / window.fetch / XHR) · ยกเว้น `lib/api-client.ts` |
| R6 | `@typescript-eslint/no-explicit-any` · `no-unused-vars` (`^_`) |
| R9 | `boundaries/no-unknown-files` + `boundaries/dependencies` · `proxy.ts` ใช้ `no-restricted-imports` |

### 9.2 สคริปต์ (`npm run check`)

```bash
npm run check   # env → routes → proxy → format:check → lint → typecheck → build → fold
```

| คำสั่ง | ตรวจอะไร |
|---|---|
| `check:env` | ไฟล์ env ครบ · คีย์ตรง `.env.example` · ทุกคีย์มีค่า · คีย์ที่โค้ดใช้ถูกประกาศไว้ |
| `check:routes` | R13 — ไม่มี dynamic segment ใน `src/app` |
| `check:proxy` | R14 — ตารางวนกลับหากัน · ปลายทางมีจริง · matcher ครอบครบ · 18 เคสผ่าน |
| `check:fold` | R15 — ทุก section พอดีหนึ่งหน้าจอ วัดจริงในเบราว์เซอร์ที่ 5 ขนาด (ต้อง `build` ก่อน) |
| `format:check` | Prettier |
| `lint` | ESLint (R3 · R6 · R9) |
| `typecheck` | `next typegen` แล้ว `tsc --noEmit` |
| `build` | `next build` |

### 9.3 กฎที่ยังต้องพึ่งคนรีวิว

R1 (page บาง) · R2 (ไม่มี back-end ซ้อน) · R5 (ไม่ข้ามชั้น) · R8 (client boundary เดียว) ·
R10 (คำอยู่ที่ content.ts) · R11 (token กลาง) · R12 (component กลาง) · R14 ฝั่งดีไซน์
(R13 · R14 ฝั่งเส้นทาง · R15 บังคับด้วยสคริปต์แล้ว)

---

## 10. Git & Workflow

- **ห้าม commit เอง** — เจ้าของรีโปเป็นคน commit (ดูข้อห้าม §0)
- branch หลักคือ `main`
- `package-lock.json` **ไม่ได้อยู่ใน git** (ดู `.gitignore`)
- `.gitattributes` บังคับ working tree เป็น LF ทุกเครื่อง — จำเป็นเพราะ Prettier ตั้ง
  `endOfLine: "lf"` ส่วน Windows ที่ `core.autocrlf=true` จะได้ CRLF ตอน checkout แล้ว
  `format:check` แดงทั้งรีโปตั้งแต่ยังไม่ได้แก้อะไร (เจอจริง 2026-09-21)

### ✅ Checklist ก่อนส่งงาน

1. `npm run check` ผ่านทั้งชุด
2. ถ้าแตะเนื้อหา → ตัวเลขใน `content.ts` / เรซูเม่สองฉบับ / ตารางใน §6.1 ตรงกัน
3. ถ้าแตะเรซูเม่ → render PDF ใหม่ทั้งสองไฟล์ และ **ยืนยันว่ายังหน้าเดียว**
4. ถ้าเพิ่ม route → เพิ่มใน `constants/routes.ts` ทั้งสองทาง + `config.matcher` + `npm run check:proxy`
5. **ถ้าเพิ่ม/ขยายเนื้อหาในหน้าเดียว → `npm run check:fold` เสมอ** (R15) — ข้อนี้พลาดมาแล้ว
6. ถ้าเพิ่มโฟลเดอร์ใน `src/` → ประกาศที่ `boundaries/elements` ก่อน
7. เปิดดูจริงทั้งสองฝั่ง: เดสก์ท็อป (`/`) และมือถือ (`/m`) — จำลองมือถือด้วย
   `curl -A "<iPhone UA>"` หรือ device toolbar

---

## 11. 🚧 งานที่ยังเหลือ

- `src/hooks/` ยังว่าง (มีแค่ `.gitkeep`) — เป็นที่ว่างที่เตรียมไว้ ไม่ใช่ของที่หายไป
- `/admin` ยัง **ไม่มี auth** — เป็นโครงที่อ่านค่าจากโมดูลเดียวกับที่เว็บ render เท่านั้น
  ไม่มีอะไรเขียนอะไรได้ และถูกกัน `robots` ไว้แล้ว ถ้าจะเปิดใช้จริงต้องมีด่านก่อน
- ยังไม่มี `sitemap.ts` / `robots.ts`
- ยังไม่มีเทสต์อัตโนมัติของคอมโพเนนต์ (ตอนนี้ด่านคือ `check:proxy` + typecheck + build)

---

## 12. เอกสารอื่นในรีโปนี้

| ไฟล์ | เนื้อหา |
|---|---|
| `README.md` | คู่มือสำหรับคนอ่านทั่วไป — เว็บนี้คืออะไร ประกอบด้วยอะไร รันยังไง |
| `portfolio.md` | บันทึกว่าโปรเจกต์นี้ทำอะไรไปแล้วบ้าง (งานรอบต่อรอบ + ที่มาของข้อมูล) |
| `CLAUDE.md` | ไฟล์นี้ — กฎและกับดัก |

---

## 13. รีโปพี่น้อง (อ่านเพื่ออ้างอิงเท่านั้น — ห้ามแก้)

เนื้อหาบนเว็บนี้ถูกดึงมาจากรีโปจริงทั้ง 7 ตัว ด้านล่างคือแผนที่: ใครคืออะไร อยู่ branch ไหน

### แอปที่ 1 — **Gendee.ai** (แพลตฟอร์มสร้างคอนเทนต์ด้วย AI)

ภาพ / วิดีโอ / เสียง / avatar จากหลายโมเดลชั้นนำ · เติมเครดิตจ่ายเท่าที่ใช้ · คอร์สเรียน · แจ้งเตือน · 11 ภาษา

| รีโป | branch | คืออะไร | stack |
|---|---|---|---|
| `gendee-web-application` | `feat-courses` | Web App | Angular 16 (NgModule) · RxJS · SCSS · Bootstrap 5 · three.js · Firebase |
| `gendee-edge-functions` | `version-2` | Back-end | Supabase (Postgres + Auth + Storage) + Edge Functions (Deno/TS) ~45 ฟังก์ชัน |
| `gendee-dashboard` | `version-2` | Dashboard | Angular 16 standalone + signals · Bootstrap 5 · ยิง Supabase ตรง |

### แอปที่ 2 — **CIRCLE** (เดิม BCC24 News · บริการข่าว)

| รีโป | branch | คืออะไร | stack |
|---|---|---|---|
| `circle-web-application` | `version-1` | Web App | **Next.js 16 App Router** · React 19 · Tailwind v4 · TanStack Query · static export → Firebase Hosting |
| `bcc24news` | `version-2` | Mobile App | Ionic 8 + Angular 20 + Capacitor 8 · Supabase · FCM · LINE login · Codemagic (iOS) |
| `bcc24news-dashboard` | `version-2` | Dashboard (โต๊ะข่าว) | Angular 21 standalone · Supabase · ESLint + knip + vitest |
| `bcc24news-edge-functions` | `version-2` | Back-end | Supabase schema `bcc24` + Edge Functions ~30 ตัว |

### 🧭 `circle-web-application` คือ "รีโปแม่แบบ" ของโครงสร้าง Next.js

โครงสร้าง `features/` · `components/` · `constants/` · `lib/` · `types/` · ESLint boundaries ·
Prettier · `scripts/check-*.mjs` ในโปรเจกต์นี้ **ยกมาจากที่นั่น** เวลาสงสัยว่า "แบบแผนควรเป็นยังไง"
ให้ไปดู `CLAUDE.md` ของรีโปนั้นก่อน

ข้อที่ **จงใจต่างกัน** (พร้อมเหตุผล):

| เรื่อง | circle | ที่นี่ | ทำไม |
|---|---|---|---|
| hosting | `output: 'export'` → Firebase | Vercel + Node runtime | ต้องมี proxy อ่าน User-Agent (§1.1) |
| `proxy.ts` | ห้ามมี (R2) | มีได้ 1 ไฟล์ | คือหัวใจของเว็บนี้ |
| HTTP client | axios + interceptor | `fetch` ห่อใน `api-client.ts` | มีคำขอเดียวทั้งเว็บ ไม่คุ้มกับ dependency |
| TanStack Query | ใช้ (R4) | ไม่ใช้ | ไม่มี client-side fetching เลย |
| ภาษาในคอมเมนต์ | ไทย | อังกฤษ | ตามสไตล์ที่มีอยู่เดิมของรีโปนี้ |

---

## 14. สภาพแวดล้อมของ dev เครื่องนี้

- Windows 11 · Git Bash + PowerShell · Node 24 · npm 11
- รีโปทั้งหมดอยู่ที่
  `Documents/gendeewebbbbbbbbbb/` (ฝั่ง Gendee) และ `Documents/bcc24newssssssssss/` (ฝั่ง CIRCLE)
- `chrome.exe` อยู่ที่ `C:\Program Files\Google\Chrome\Application\chrome.exe`
  — ใช้ render PDF ได้ แต่ **ต้อง `--user-data-dir` แยกเสมอ** (§6.2)
- `python` ไม่มีในเครื่อง · `strings` / `pdftoppm` ก็ไม่มี → ใช้ Node อ่านไฟล์แทน
- ⚠️ Node บน Git Bash **ไม่เข้าใจ path แบบ `/c/Users/...`** ต้องส่ง `C:/Users/...`
