# portfolio.md — บันทึกงานของโปรเจกต์นี้

ไฟล์นี้ตอบคำถามเดียว: **"โปรเจกต์นี้ทำอะไรไปแล้วบ้าง"**
กฎและกับดักอยู่ที่ [`CLAUDE.md`](CLAUDE.md) · วิธีรันอยู่ที่ [`README.md`](README.md)

---

## ภาพรวม

**Portfolio & Résumé ของ Peerawut Nipakornpan** — เว็บ Next.js 16 (App Router) ที่เสิร์ฟ
**สอง front end จากโปรเจกต์เดียว**

| | เดสก์ท็อป | มือถือ |
|---|---|---|
| path | `/` · `/about` · `/contact` · `/user` | `/m` · `/m/{about,skills,experience,work,contact,user}` |
| รูปแบบ | **เอกสาร** หนึ่งหน้ายาว scroll ผ่าน 6 section | **แอป** หนึ่งหน้าจอต่อหนึ่งเมนู + tab bar |
| คำศัพท์สายตา | glass · hover lift · magnetic cursor · scroll spy | solid surface · list row · pressed state |
| ใครเลือกให้ | `src/proxy.ts` อ่าน `User-Agent` ก่อน render — **ไม่มีปุ่มสลับ** | |

นอกจากนั้นมี `/admin` (คอนโซลนับเนื้อหาภายใน ไม่ให้ index) และเรซูเม่ 2 ฉบับที่เขียนเป็น HTML
แล้ว render เป็น PDF

---

## รอบงาน 2026-09-21 — จัดโครงสร้างใหม่ + อัปเดตเนื้อหาจากรีโปจริง

งานรอบนี้มีสามส่วน ทำตามลำดับนี้

### ส่วนที่ 1 — ยกโครงสร้าง Next.js ให้ตรงกับ `circle-web-application@version-1`

**ก่อนหน้านี้** `src/` เป็น `app/` + `components/{front,mobile,admin}/` + `lib/` + `types/`
คอมโพเนนต์แยกตาม "หน้าตา" และหน้า `page.tsx` ฝั่งมือถือมี markup เต็ม ๆ อยู่ข้างใน

**ตอนนี้** เป็นโครงเดียวกับรีโปแม่แบบ:

```
src/
├── app/          ROUTING เท่านั้น — ทุก page.tsx เหลือ metadata + <XxxScreen />
├── features/     document · handheld · account · console
├── components/ui IconSprite · Rich · document.ts · handheld.ts
├── constants/    index · content · navigation · routes
├── hooks/        (ที่ว่างที่เตรียมไว้)
├── lib/          api-client · device-route · theme · utils
├── types/        content.ts
└── proxy.ts
```

การเคลื่อนย้ายทั้งหมด:

| เดิม | ใหม่ | หมายเหตุ |
|---|---|---|
| `components/front/*` | `features/document/components/*` | เอกสารฝั่งเดสก์ท็อป |
| `components/mobile/*` | `features/handheld/components/*` | แอปฝั่งมือถือ |
| `components/admin/StatCard` | `features/console/components/StatCard` | |
| `app/(front)/user/User.tsx` | `features/account/components/AccountCard.tsx` | เปลี่ยนชื่อ |
| `lib/github.ts` | `features/account/api.ts` | |
| `types/user.d.ts` | `features/account/types.ts` | เลิกเป็น ambient global (R6) |
| `lib/styles.ts` | `components/ui/document.ts` | |
| `lib/mobile.ts` | `components/ui/handheld.ts` + `constants/navigation.ts` | แยก "คลาส" ออกจาก "เส้นทาง" |
| `lib/sections.ts` | `constants/navigation.ts` | รวมกับที่อยู่ฝั่งมือถือ |
| `lib/content.ts` | `constants/content.ts` + `types/content.ts` | แยก "คำ" ออกจาก "รูปร่างของคำ" |
| `lib/site.ts` | `constants/index.ts` + `lib/utils.ts` | แยก "ตัวตนเว็บ" ออกจาก "helper" |
| `components/{IconSprite,Rich}` | `components/ui/…` | |

**ไฟล์ใหม่ที่เพิ่มเข้ามา**

- `src/lib/api-client.ts` — จุดเดียวที่แตะ `fetch` ได้ (R3) · ESLint ปิดทางหนีทุกทาง
- `src/lib/device-route.ts` — ฟังก์ชันบริสุทธิ์ `resolveDeviceTarget(path, isPhone)`
  ที่ยกตรรกะออกมาจาก `proxy.ts` เพื่อให้ **ทดสอบได้โดยไม่ต้องมี request**
- `src/constants/routes.ts` — ตาราง `TO_APP` / `TO_WEB` ที่จับคู่สอง front end
- `src/features/*/components/*Screen.tsx` — 9 Screen ใหม่ ที่ยกเนื้อในออกมาจาก `page.tsx`
  (`DocumentScreen` · `HomeScreen` · `AboutScreen` · `SkillsScreen` · `ExperienceScreen` ·
  `WorkScreen` · `ContactScreen` · `AccountScreen` · `AccountAppScreen` · `ConsoleScreen`)

**เครื่องมือบังคับกฎที่เพิ่มเข้ามา** (ยกแบบมาจาก circle)

| ไฟล์ | ทำอะไร |
|---|---|
| `eslint.config.mjs` | flat config + `eslint-plugin-boundaries` · บังคับ R3 (ห้ามยิงเน็ตเอง) · R6 (ห้าม `any`) · R9 (ห้าม import ข้าม feature) |
| `.prettierrc.json` · `.prettierignore` | `singleQuote` · `printWidth 100` · `endOfLine lf` — ค่าเดียวกับ circle เป๊ะ |
| `.gitattributes` | บังคับ working tree เป็น LF ทุกเครื่อง (ไม่งั้น `format:check` แดงทั้งรีโปบน Windows) |
| `.npmrc` | `engine-strict=true` — Node ต่ำกว่า 20.9 ติดตั้งไม่ผ่านตั้งแต่ `npm install` |
| `.env.example` | รายการคีย์ต้นฉบับ (ของจริงไม่ขึ้น git) |
| `scripts/check-env.mjs` | ไฟล์ env ครบ · คีย์ตรง · มีค่า · คีย์ที่โค้ดใช้ถูกประกาศ |
| `scripts/check-routes.mjs` | R13 — ห้าม dynamic segment ใน `src/app` |
| `scripts/check-proxy.mjs` | R14 — ตารางวนกลับหากัน · ปลายทางมี `page.tsx` จริง · `matcher` ครอบครบ · **18 เคสเส้นทาง** |
| `scripts/check-fold.mjs` | R15 — ทุก section พอดีหนึ่งหน้าจอ วัดจริงในเบราว์เซอร์ *(เพิ่มรอบสอง)* |
| `scripts/free-port.mjs` | `predev` — ปิด process ค้างบนพอร์ต 3000 + ลบ `.next-dev` ที่เขียนค้าง |

**`package.json`** ได้ชุดคำสั่งเดียวกับ circle:

```
dev · build · start · lint · lint:fix · format · format:check
typegen · typecheck · check:env · check:routes · check:proxy · check:fold · check
```

`npm run check` = `check:env → check:routes → check:proxy → format:check → lint → typecheck → build → check:fold`
**ผ่านทั้งชุด** ณ วันที่บันทึกนี้

**สิ่งที่แก้ไปด้วยระหว่างทาง (เพราะกฎใหม่จับได้)**

1. `AppBar.tsx` เคยทำ `useEffect(() => setTheme(read()), [])` → เปลี่ยนเป็น
   **`useSyncExternalStore`** ที่ subscribe `data-theme` บน `<html>` ผ่าน `MutationObserver`
   — ทำให้ไม่มีสำเนาของ state (ธีมมีคำตอบเดียวคือ attribute) และหายอาการ render สองรอบทุกครั้งที่เปลี่ยนหน้าจอ
2. ฟอนต์ย้ายจาก `<link>` ไป `fonts.googleapis.com` → **`next/font/google`** (Sora · Inter ·
   JetBrains Mono) self-host ที่ origin เดียวกัน ตัด DNS + TLS + stylesheet ที่บล็อก render ออกทั้งชุด
3. `<a href="/#work">` สองจุดใน `Hero.tsx` ได้ `eslint-disable-next-line` พร้อมเหตุผล —
   เป็น in-page jump ที่ `public/js/main.js` `preventDefault()` เพื่อทำ eased scroll เอง
   ถ้าเปลี่ยนเป็น `<Link>` router จะเพิ่ม handler ของตัวเองทับเข้าไปอีกตัว
4. `postcss.config.mjs` เลิก export object แบบ anonymous
5. `.gitignore` **เลิก ignore `CLAUDE.md`** — ตอนนี้มันเป็นคู่มือของโปรเจกต์ ต้องขึ้น git
6. เพิ่มโลโก้ Ionic · Capacitor · Firebase ลง `IconSprite` (ยกจาก ionicons ที่ viewBox 512
   แล้ว `transform="scale(.046875)"` ให้เข้ากับกริด 24 ของ sprite เดิม)

### ส่วนที่ 2 — อัปเดตเนื้อหาจากรีโปจริงทั้ง 7 ตัว

ได้รับอนุญาตให้เข้าไปอ่าน 7 รีโปบน branch ที่ระบุ แล้วนำข้อมูลจริงมาลง `constants/content.ts`
และเรซูเม่ — **ทุกตัวเลขนับจาก git ไม่ได้ประมาณ** (คำสั่งที่ใช้อยู่ใน `CLAUDE.md` §6.1)

**สถิติที่เปลี่ยน**

| | เดิม | ใหม่ |
|---|---|---|
| Platforms | 2 | 2 |
| Repositories | 6 | **7** |
| Commits | 218 | **306** |

| repo | branch | commits |
|---|---|---|
| `gendee-web-application` | `feat-courses` | 176 |
| `gendee-edge-functions` | `version-2` | 36 |
| `gendee-dashboard` | `version-2` | 17 |
| `circle-web-application` | `version-1` | 33 |
| `bcc24news` | `version-2` | 22 |
| `bcc24news-dashboard` | `version-2` | 11 |
| `bcc24news-edge-functions` | `version-2` | 11 |

**Work — จาก 6 เป็น 8 ผลงาน**

| # | ชื่อ | มาจากไหน |
|---|---|---|
| 1 | **Gendee for Business** | `gendee-web-application` + `gendee-edge-functions` + `gendee-dashboard` — องค์กรใช้กระเป๋าเครดิตร่วม · บทบาท owner/admin/member · โควตารายคนที่อัปเดตผ่าน realtime · คำเชิญ · top-up ที่หักเข้าองค์กร · บันทึกการใช้เครดิต |
| 2 | **Course Platform** | แคตตาล็อก · รอบลงทะเบียน · checkout กับ payment provider จริง · ที่นั่งจองที่หมดอายุตามเวลา · ห้องเรียน · หลังบ้าน staff |
| 3 | **Notifications & Push** | trigger ใน Postgres → Firebase Cloud Messaging · dedupe token ต่อเครื่อง · แจ้ง staff เรื่อง KYC/คอร์ส/ความผิดปกติของการจ่ายเงิน · กระดิ่งในแอป |
| 4 | 🆕 **CIRCLE Web Platform** | `circle-web-application@version-1` — **เขียนจากรีโปเปล่า 33 จาก 39 commits**: Next.js 16 App Router · TanStack Query · ticker ข่าวด่วน · Rewards · web push · ปุ่มฟังข่าว (AI narration) · ระบบ ticket · device gate |
| 5 | **CIRCLE News App** | `bcc24news@version-2` — ต่อ frontend↔backend ครบทุกฟังก์ชัน · LINE login · like/save/share · membership tier · รีแบรนด์ BCC24 → CIRCLE |
| 6 | 🆕 **Editorial Desk** | `bcc24news-dashboard@version-2` — workflow บทความ · ตัวกรองหมวด · ป้ายข่าวด่วน · ปกแบบ 16:9 สำหรับเว็บ · slug ภาษาอังกฤษ + preview · ด่าน staff |
| 7 | **Operations Dashboard** | `gendee-dashboard@version-2` — redeem code · organizations · ผลงานขององค์กร · อัตราสำเร็จ/ล้มเหลวรายโมเดล · DateTimePicker + date range ที่เขียนเองพร้อมเทสต์ |
| 8 | **DoiTung Waste Management** | senior project + IEEE paper (เหมือนเดิม) |

**Skills ที่เพิ่ม/แก้**

- Frontend: เพิ่ม **Ionic** และ **Capacitor** (ส่งแอปจริงขึ้น store) · จัดลำดับใหม่ให้ตรงกับที่ใช้จริง
- Backend: `Edge Functions` → **`Deno (Edge Functions)`** ให้ตรงกับความจริงว่า Supabase Edge Functions คือ Deno
- Tools: เพิ่ม **Firebase** (FCM + Hosting)
- Database: จัดลำดับใหม่ (PostgreSQL · Supabase มาก่อน)

**ข้อความอื่นที่แก้**

- `PROFILE.intro` · `BIO` · `FACTS.Focus` · `TIMELINE` — เล่าว่า CIRCLE ไม่ใช่แค่ "แอปข่าว"
  แต่เป็นบริการที่ออกทั้ง **เว็บ · แอป iOS/Android · โต๊ะข่าว** บน backend เดียว
- `LIVE_LINKS` ของ CIRCLE เปลี่ยนจาก `circle-th.com/tabs/home` เป็น `circle-th.com`
- หัวข้อ Work เปลี่ยนจาก "Six builds" เป็น "Eight builds"

### ส่วนที่ 3 — เรซูเม่

ทั้งสองฉบับ (`resume/resume.html` ฉบับออกแบบ · `resume/resume-ats.html` ฉบับ ATS) ถูกอัปเดต
ให้ตรงกับเนื้อหาใหม่ แล้ว render เป็น PDF ใหม่ลง `public/`

- เพิ่มข้อ **CIRCLE web app** เข้าไปในประสบการณ์ทำงาน
- ปรับสถิติเป็น 306 commits / 7 repositories
- ปรับรายการ Technical Skills ให้ตรงกับ `content.ts`
- 🚨 **ทั้งสองฉบับล้นเป็นสองหน้าตอนใส่เนื้อหาใหม่** ต้องตัดคำจนกลับมาเป็นหน้าเดียวทั้งคู่
  ตรวจด้วยการ render จริงแล้วอ่าน `/Count` จากไฟล์ PDF (วิธีอยู่ใน `CLAUDE.md` §6.2)

## รอบแก้ 2026-09-21 (รอบสอง) — section ล้นขอบจอ

> 🔴 **ทีมทักมาพร้อมภาพหน้าจอ**: เปิด `/#skills` แล้วการ์ดถูกขอบล่างของจอตัด และหน้า Experience
> ก็ถูกตัดเช่นกัน — เพราะรอบแรกเพิ่มรายการเข้าไปโดย **ไม่ได้วัดความสูงจริง** เลย

### สิ่งที่พังและทำไมไม่มีอะไรฟ้อง

`SECTION` ตั้ง `min-height` ไม่ใช่ `max-height` — section ที่โตเกินจอจึงไม่ error ไม่เตือน และ
ยังดูปกติในภาพที่ถ่ายจากบนสุดของหน้า `npm run check` รอบแรกเขียวหมดทั้งที่หน้าเว็บพังอยู่

รอบแรกเพิ่มเข้าไป: Frontend 5→7 รายการ · Tools 5→6 · Work 6→8 ชิ้น · Experience 3→4 bullet
สามใน 6 section จึงล้นพร้อมกัน

### เครื่องมือที่วางไว้กันพลาดซ้ำ — `scripts/check-fold.mjs` (R15)

สตาร์ตไซต์ที่ build แล้ว ขับ Chrome ผ่าน **DevTools protocol** (ไม่เพิ่ม dependency — Node มี
`WebSocket` และ Chrome มี debugging port อยู่แล้ว) แล้ววัดความสูงจริงของทุก section
ที่ 5 ขนาดหน้าต่างอ้างอิง เทียบกับพื้นที่ระหว่างแถบเมนูกับขอบล่าง

ระหว่างเขียนเครื่องมือนี้ เจอ bug ในตัวเครื่องมือเองสองข้อ ซึ่งถ้าไม่เจอก็จะวัดผิด:

1. `--nav-offset` ประกาศเป็น `calc(72px + env(...))` → `getPropertyValue` คืน string ของ `calc`
   `parseFloat` ได้ `NaN` → กลายเป็น 0 เงียบ ๆ ทำให้ **วัดหลวมไป 72px** · แก้เป็นอ่าน
   `scroll-padding-top` ที่ resolve แล้ว
2. hero (`#home`) ถูกนับว่าล้น 72px ทุกขนาด ทั้งที่ถูกต้อง — มันคือ `min-h-svh` เต็มจอโดย navbar
   ลอยทับ งบของมันจึงเป็นความสูงจอเต็ม

### ตัวเลขก่อน/หลัง (วัดจริง)

| section | 1366×768 | 1440×900 | 1920×1080 |
|---|---|---|---|
| skills ก่อน | +0 | +0 | +0 (แต่ 1024 = +316) |
| work ก่อน | **+99** | **+290** | **+138** |
| experience ก่อน | +0 | **+26** | +0 |
| ทั้งหมด หลัง | ✅ พอดี | ✅ พอดี | ✅ พอดี |

### สิ่งที่แก้

**1. breakpoint `short` — `max-height: 880px` → `1000px`**

880 ถูกวัดจาก *จอ* 1440×900 ซึ่งเหลือ viewport ราว 800 แต่ **หน้าต่างเต็มจอบนจอ 1080p สูงราว 935px**
และหลุดออกไปนอกเงื่อนไขพอดี หน้าต่างพวกนั้นจึงได้ระยะห่างแบบ "จอใหญ่" ทั้งที่มีที่น้อยกว่าร้อยพิกเซล
— ซึ่งคือขนาดจอที่คนใช้มากที่สุด และคือขนาดในภาพที่ทีมส่งมา

**2. เกณฑ์ full-height — `min-[1024px]` → `min-[1280px]`**

วัดแล้วพบว่าที่ 1024×768 การ์ด Work สองแถว **ใส่ไม่ลงตั้งแต่ตอนมี 6 ชิ้น** (คือพังมาก่อนรอบนี้)
จึงเลื่อนเส้นที่ "สัญญาว่าหนึ่ง section = หนึ่งหน้าจอ" ไปเริ่มที่ 1280px ต่ำกว่านั้นหน้าเลื่อนได้อิสระ
เหมือนบนแท็บเล็ต — พูดสิ่งที่ทำได้จริง ดีกว่าสัญญาสิ่งที่รักษาไม่ได้

**3. กริดคงที่ 4 คอลัมน์ตั้งแต่ 1280px** (Work และ Skills)

`auto-fit` ตัดสินเองจากความกว้าง และที่ 1180px มันเลือก 3 คอลัมน์ → Work 8 ชิ้นกลายเป็น 3 แถว
และ Skills 4 กลุ่มกลายเป็น 2 แถว · 🚨 ผลคือ **`PROJECTS` ต้องเป็นจำนวนเท่าของ 4** ตลอดไป

**4. เนื้อหาในการ์ดสั้นลงให้พอดีการ์ด** — blurb เหลือ ~50–75 ตัวอักษร · แท็กเหลือ 3 ตัวและสั้นลง
(`Next.js 16` → `Next.js` ฯลฯ) · bullet ที่ 4 ของ Experience ย่อเหลือบรรทัดเดียว

**5. การ์ด Work หนาแน่นขึ้นเฉพาะในช่วง `short`** — padding, ไอคอน, ระยะหัวการ์ด, leading ของ blurb
และ padding ของแถวแท็ก ซึ่งเป็นหน้าที่ของ variant นั้นอยู่แล้ว

### Skills ตามที่ทีมสั่ง

| กลุ่ม | ก่อน | หลัง |
|---|---|---|
| Frontend | + Capacitor | **ตัด Capacitor ออก** — เหลือภาษาและเฟรมเวิร์กเท่านั้น |
| Backend | `Deno (Edge Functions)` | **`Supabase`** (ย้ายมาจาก Database) |
| Database | มี Supabase | ตัดออก เหลือ PostgreSQL · MSSQL · MySQL |

Capacitor ยังอยู่ในแท็กของโปรเจกต์ CIRCLE News App และในบรรทัด Stack ของเรซูเม่ ซึ่งเป็นที่ของมัน
(เทคโนโลยีของงาน ไม่ใช่หมวดทักษะ)

---

## สิ่งที่ตรวจแล้วว่าใช้งานได้จริง

```
npm run check
  ✅ env files are complete and consistent with .env.example
  ✅ routes are all static — no dynamic segments in src/app (R13)
  ✅ device proxy is consistent — 4 paired routes, 18 routing cases
  ✅ prettier · eslint · tsc --noEmit
  ✅ next build — 13 routes, prerendered ○ (Static) ทั้งหมด + ƒ Proxy (Middleware)
  ✅ every section fits the fold at all reference window sizes   ← เพิ่มรอบสอง
```

smoke test บน `next start`:

| ตรวจ | ผล |
|---|---|
| `GET /` ด้วย UA เดสก์ท็อป | 200 · มีเนื้อหาใหม่ (306 · Gendee for Business · CIRCLE Web Platform) |
| `GET /` ด้วย UA iPhone | **307 → `/m`** · `vary: User-Agent` · `cache-control: no-store` |
| `GET /m` ด้วย UA iPhone | 200 · hub list ครบ |
| `GET /m/work` | 200 · แสดงผลงานใหม่ครบ 8 ชิ้น |
| `GET /admin` | 200 · คอนโซลนับ Projects / Tools / Roles จาก `content.ts` |
| `<html>` | มีคลาสตัวแปรฟอนต์ของ next/font ครบสามตัว |

เรซูเม่: `resume.pdf` = 1 หน้า · `resume-ats.pdf` = 1 หน้า

---

## โครงสร้างหน้าเว็บทั้งหมด (13 routes)

| route | ฝั่ง | เนื้อหา |
|---|---|---|
| `/` | เอกสาร | Hero → About → Skills → Experience → Work → Contact |
| `/about` · `/contact` | เอกสาร | section เดียวกัน แบบลิงก์ตรง (ไม่ให้ index) |
| `/user` | เอกสาร | บัญชี GitHub อ่านสดจาก API |
| `/m` | แอป | หน้าแรก = hub: แนะนำตัว + ปุ่ม + สถิติ + รายการเมนู + โซเชียล |
| `/m/about` · `/m/skills` · `/m/experience` · `/m/work` · `/m/contact` | แอป | หนึ่งหน้าจอต่อหนึ่งเมนู |
| `/m/user` | แอป | บัญชี GitHub (เรียก `loadUser` ตัวเดียวกับฝั่งเอกสาร) |
| `/admin` | คอนโซล | นับเนื้อหาจากโมดูลเดียวกับที่เว็บ render |
| `/_not-found` | — | 404 |

---

## ประวัติก่อนหน้านี้ (สรุปจาก git log)

| commit | เรื่อง |
|---|---|
| `a0b06e1` | ปรับพฤติกรรม scroll และ navigation ให้การกระโดดในหน้าเดียวลื่นขึ้น |
| `eac638b` · `f43c303` · `4b41074` | ปรับ README |

> รอบ 2026-09-21 นี้ **ยังไม่ได้ commit** ตามที่ทีมสั่ง — เจ้าของรีโปเป็นคน commit เอง
