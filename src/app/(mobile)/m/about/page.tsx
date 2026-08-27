import type { Metadata } from "next";

import { Rich } from "@/components/Rich";
import { ScreenHead } from "@/components/mobile/ScreenHead";
import { BIO, FACTS, LIVE_LINKS } from "@/lib/content";
import {
  APP_ENTER,
  APP_LABEL,
  APP_PANEL,
  APP_ROW,
  APP_ROW_ARROW,
  APP_ROW_GROUP,
  APP_ROW_ICON,
  APP_ROW_TITLE,
  SCREEN,
  STACK,
} from "@/lib/mobile";
import { OPEN_GRAPH, SHARE_DESCRIPTION, cssVars } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: SHARE_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { ...OPEN_GRAPH, url: "/m/about" },
};

const FACT_KEY = "block font-mono text-[.64rem] tracking-[.15em] uppercase text-ink-faint";
const FACT_VALUE = "mt-[.2rem] block text-[.9rem] leading-[1.4] font-medium text-ink";

/** This URL is reachable right now. */
const LIVE_DOT = "size-[6px] flex-none rounded-full bg-[#22c55e] animate-ping-live";

export default function AppAbout() {
  return (
    <div className={`${SCREEN} ${STACK}`}>
      <ScreenHead id="about" />

      {/* The desktop puts the bio and the fact list side by side and makes
          them end level. There is one column here, so they become one thing
          after another and the order is what carries the priority. */}
      <article
        className={`${APP_PANEL} ${APP_ENTER} [&>p]:text-[.9rem] [&>p]:leading-[1.62] [&>p]:text-ink-muted
          [&>p+p]:mt-[.85rem]`}
        style={cssVars({ "--d": "70ms" })}
      >
        <p className="text-[1.02rem]! font-display font-semibold leading-[1.45] tracking-[-.02em] text-ink!">
          {BIO.lead}
        </p>
        {BIO.paragraphs.map((paragraph, index) => (
          <p key={index}>
            <Rich
              parts={paragraph}
              strongClass="font-semibold text-ink-soft"
              markClass="bg-transparent font-semibold text-brand-1"
            />
          </p>
        ))}
      </article>

      <section className={APP_ENTER} style={cssVars({ "--d": "140ms" })}>
        <span className={APP_LABEL}>At a glance</span>
        <div className={APP_ROW_GROUP}>
          {FACTS.map((fact) => (
            <div className={APP_ROW} key={fact.key}>
              <span className={APP_ROW_ICON}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <use href={`#${fact.icon}`} />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className={FACT_KEY}>{fact.key}</span>
                {fact.value.map((line) => (
                  <span className={FACT_VALUE} key={line}>
                    {line}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={APP_ENTER} style={cssVars({ "--d": "210ms" })}>
        <span className={APP_LABEL}>See them live</span>
        <div className={APP_ROW_GROUP}>
          {LIVE_LINKS.map((live) => (
            <a
              className={APP_ROW}
              href={live.href}
              key={live.name}
              style={cssVars({ "--tint": live.tint })}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={APP_ROW_ICON}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <use href={`#${live.icon}`} />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className={APP_ROW_TITLE}>{live.name}</span>
                <span className="mt-[.15rem] flex items-center gap-[.4rem] font-mono text-[.76rem] text-ink-faint">
                  <i className={LIVE_DOT} />
                  {live.host}
                </span>
              </span>
              <span className={APP_ROW_ARROW}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <use href="#i-external" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
