import Image from "next/image";

import { BTN_GHOST, BTN_PRIMARY, ENTER, EYEBROW, GRAD, SHELL } from "@/lib/styles";
import { PROFILE_IMAGE, PROFILE_IMAGE_ALT, RESUME_HREF, cssVars } from "@/lib/site";

const MARQUEE = [
  "Web Development",
  "Mobile Apps",
  "API Design",
  "Database Modelling",
  "Full-Stack Engineering",
  "System Design",
  "Authentication & Access",
  "Responsive Interfaces",
];

const SOCIAL =
  "grid size-10 place-items-center rounded-xl border border-line bg-glass text-ink-muted " +
  "transition-[transform,translate,scale,rotate,color,border-color,box-shadow] duration-[400ms] ease-spring " +
  "hover:-translate-y-[3px] hover:border-[color-mix(in_srgb,var(--brand-1)_45%,var(--line))] " +
  "hover:text-brand-1 hover:shadow-md touch:size-11 [&_svg]:size-[18px]";

export function Hero() {
  return (
    <>
      <section
        className="relative flex min-h-svh items-center overflow-x-clip
          pt-[clamp(5.5rem,12vh,8rem)] pb-[clamp(2.5rem,7vh,4.5rem)]
          short:pt-[5.5rem] short:pb-[2.25rem]
          max-[1024px]:[min-height:auto] max-[1024px]:text-center"
        id="home"
      >
        <div
          className={`${SHELL} grid items-center gap-[clamp(2.5rem,6vw,5rem)]
            grid-cols-[minmax(0,1.08fr)_minmax(0,.92fr)]
            max-[1024px]:grid-cols-1 max-[1024px]:gap-[clamp(2.5rem,7vw,3.5rem)]`}
        >
          <div>
            <span className={`${EYEBROW} ${ENTER}`} style={cssVars({ "--d": "60ms" })}>
              <span className="size-[7px] rounded-full bg-brand-3 animate-ping-dot" />
              Open to opportunities
            </span>

            <p
              className={`${ENTER} mb-[.55rem] block font-mono text-[.92rem] tracking-[.02em] text-ink-muted`}
              style={cssVars({ "--d": "140ms" })}
            >
              Hello, my name is
            </p>

            <h1
              className={`${ENTER} mb-[.35rem] font-display text-[clamp(2.3rem,min(6.4vw,9.2vh),4.1rem)]
                font-extrabold leading-[1.1] tracking-[-.03em] text-balance`}
              style={cssVars({ "--d": "210ms" })}
            >
              <span className={`${GRAD} animate-hue`}>Peerawut</span>
              <span className="block text-ink-muted">Nipakornpan</span>
            </h1>

            <p
              className={`${ENTER} mt-[.65rem] mb-4 flex min-h-8 items-center gap-[.55rem] font-mono
                text-[clamp(.95rem,2vw,1.15rem)] font-medium text-ink-soft
                max-[1024px]:justify-center`}
              style={cssVars({ "--d": "290ms" })}
            >
              <span className="text-brand-3">&gt;</span>
              <span
                id="roleText"
                data-roles="Junior Full-Stack Developer|Web &amp; Mobile Developer|Frontend &amp; Backend Developer"
              >
                Junior Full-Stack Developer
              </span>
              <span
                className="inline-block h-[1.15em] w-0.5 bg-brand-2 animate-caret"
                data-caret
              />
            </p>

            <p
              className={`${ENTER} mb-6 short:mb-[1.15rem] max-w-[38rem] text-[clamp(.97rem,1.3vw,1.05rem)] text-ink-muted
                max-[1024px]:mx-auto [&_strong]:font-semibold [&_strong]:text-ink-soft`}
              style={cssVars({ "--d": "360ms" })}
            >
              I build features end to end — the database schema, the API behind it, and the screens on top.
              Right now I do that across two production platforms at <strong>Gendee.ai</strong>: an AI content
              studio and a digital news app.
            </p>

            <div
              className={`${ENTER} mb-[1.6rem] short:mb-[1.15rem] flex flex-wrap gap-3 max-[1024px]:justify-center`}
              style={cssVars({ "--d": "430ms" })}
            >
              <a className={`${BTN_PRIMARY} magnetic`} href="/#work">
                See what I have built
                <svg
                  className="arr-right"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <use href="#i-arrow-right" />
                </svg>
              </a>
              <a className={`${BTN_GHOST} magnetic`} href="/contact">
                Get in touch
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <use href="#i-mail" />
                </svg>
              </a>
              <a className={`${BTN_GHOST} magnetic`} href={RESUME_HREF} download>
                Download Resume
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <use href="#i-download" />
                </svg>
              </a>
            </div>

            <div
              className={`${ENTER} flex items-center gap-2 max-[1024px]:justify-center`}
              style={cssVars({ "--d": "500ms" })}
            >
              <span className="mr-[.35rem] font-mono text-[.7rem] tracking-[.16em] uppercase text-ink-faint">
                Find me
              </span>
              <a
                className={SOCIAL}
                href="https://github.com/6531503060-nipeerawut"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-github" /></svg>
              </a>
              <a
                className={SOCIAL}
                href="https://www.linkedin.com/in/peerawut-nipakornpan-3550a131a"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-linkedin" /></svg>
              </a>
              <a
                className={SOCIAL}
                href="https://www.facebook.com/nong.off.3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-facebook" /></svg>
              </a>
              <a className={SOCIAL} href="mailto:nipeerawutdev15@gmail.com" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-mail" /></svg>
              </a>
            </div>
          </div>

          {/* Capped against viewport height too, so the portrait cannot
              drive the hero taller than the screen on a short laptop.

              The narrow cap keeps that height term rather than replacing it
              with a flat 320px. On a phone held portrait 46vh is far past
              320px, so nothing changes there — but held landscape it is
              about 180px, and a flat cap would hand the whole first screen
              to a photograph before a single word of the page. */}
          <div
            className={`${ENTER} relative mx-auto grid aspect-square w-full max-w-[min(400px,46vh)]
              place-items-center max-[1024px]:row-start-1 max-[1024px]:max-w-[min(320px,46vh)]`}
            style={cssVars({ "--d": "300ms" })}
          >
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <span className="absolute -inset-[4%] rounded-full border border-dashed border-line-strong
                opacity-60 animate-orbit-slow" />
              <span className="absolute inset-[7%] rounded-full border opacity-60 animate-orbit-mid
                border-[color-mix(in_srgb,var(--brand-2)_30%,transparent)]" />
              <span className="absolute inset-[16%] rounded-full border opacity-60
                border-[color-mix(in_srgb,var(--brand-3)_26%,transparent)]" />
            </div>

            {/* A dot riding the outermost ring, on its own faster orbit. */}
            <div
              className="absolute -inset-[4%] animate-orbit-fast
                after:absolute after:-top-[5px] after:left-1/2 after:-ml-[5px] after:size-[10px]
                after:rounded-full after:bg-brand-3 after:content-['']
                after:shadow-[0_0_18px_3px_color-mix(in_srgb,var(--brand-3)_70%,transparent)]"
              aria-hidden="true"
            />

            <div
              className="relative aspect-square w-[78%] rounded-full p-1.5 shadow-lg animate-hue-slow
                bg-[image:var(--gradient-brand)] [background-size:220%_220%]"
            >
              {/* The largest thing on the first screen, so it goes through
                  the optimizer: the source is 960x960 and the circle is
                  never wider than ~312 CSS px. The sizes hint is what tells
                  the browser that, and priority preloads the variant it
                  picks. */}
              <Image
                className="size-full rounded-full bg-surface object-cover"
                src={PROFILE_IMAGE}
                alt={PROFILE_IMAGE_ALT}
                width={960}
                height={960}
                sizes="(max-width: 980px) 250px, 312px"
                priority
              />
            </div>
          </div>
        </div>

        <a
          className="absolute bottom-[1.6rem] left-1/2 flex -translate-x-1/2 flex-col items-center
            gap-[.55rem] font-mono text-[.64rem] tracking-[.2em] uppercase text-ink-faint
            max-[1024px]:hidden print:hidden"
          href="/#skills"
          aria-label="Scroll to the next section"
        >
          <span>Scroll</span>
          <span
            className="grid h-9 w-[22px] justify-items-center rounded-full border border-line-strong pt-[7px]
              after:h-[7px] after:w-[3px] after:rounded-sm after:bg-brand-2 after:content-['']
              after:animate-wheel"
            aria-hidden="true"
          />
        </a>
      </section>

      <div
        className="relative overflow-hidden border-y border-line bg-glass py-[1.15rem] print:hidden
          [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]
          group"
        aria-hidden="true"
        data-marquee
      >
        <div className="flex w-max animate-marquee [will-change:transform] group-hover:[animation-play-state:paused]">
          {/* Two identical groups: the track scrolls exactly one group
              width, so the second copy is what makes the loop seamless. */}
          {[0, 1].map((group) => (
            <div className="flex items-center gap-11 pr-11" key={group}>
              {MARQUEE.map((item) => (
                <span
                  className="inline-flex items-center gap-[.55rem] font-display text-[1.05rem] font-semibold
                    tracking-[-.02em] text-ink-faint transition-colors duration-300 ease-brand
                    hover:text-brand-1
                    before:size-[5px] before:rounded-full before:bg-brand-2 before:opacity-55
                    before:content-['']"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
