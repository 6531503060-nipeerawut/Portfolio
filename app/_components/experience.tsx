import { SectionEyebrow } from "@/app/_components/section-eyebrow";
import { cssVars } from "@/app/_lib/site";

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="shell">
        <div className="section-head reveal">
          <SectionEyebrow id="experience" />
          <h2>Two products, built <span className="grad">in parallel</span>.</h2>
          <p>Where I have worked and what I owned there.</p>
        </div>

        <ol className="timeline">
          <li className="timeline__item reveal">
            <span className="timeline__dot" aria-hidden="true"></span>
            <article className="card timeline__card">
              <header className="timeline__head">
                <div>
                  <h3>Junior Full-Stack Developer</h3>
                  <p className="timeline__org">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-building" /></svg>
                    Gendee.ai
                  </p>
                </div>
                <span className="timeline__when">Jun 2026 &ndash; Present</span>
              </header>

              <p>
                Two platforms at once &mdash; <strong>Gendee.ai</strong>, an AI content studio, and{" "}
                <strong>CIRCLE</strong>, a news app. 218 commits across six repositories.
              </p>

              <ul className="timeline__points">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"><use href="#i-check" /></svg>
                  Shipped three systems end to end &mdash; courses, notifications, and B2B organizations &mdash;
                  each from schema through API to UI.
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"><use href="#i-check" /></svg>
                  Connected the CIRCLE reader app and editorial desk to their backend, then simplified the news
                  schema behind them.
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"><use href="#i-check" /></svg>
                  Kept the details honest: mobile layouts, multi-language copy, accessibility, tests and handover docs.
                </li>
              </ul>

              <div className="tags">
                <span className="tag">Angular</span>
                <span className="tag">Ionic</span>
                <span className="tag">Deno</span>
                <span className="tag">Supabase</span>
                <span className="tag">PostgreSQL</span>
                <span className="tag">TypeScript</span>
              </div>
            </article>
          </li>

          <li className="timeline__item reveal" style={cssVars({ "--d": "100ms" })}>
            <span className="timeline__dot" aria-hidden="true"></span>
            <article className="card timeline__card">
              <header className="timeline__head">
                <div>
                  <h3>Software Engineer Intern</h3>
                  <p className="timeline__org">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-briefcase" /></svg>
                    DoiTung
                  </p>
                </div>
                <span className="timeline__when">Internship</span>
              </header>

              <p>
                Built <strong>MyTissue</strong>, an internal system tracking client wood inventory through every
                processing stage &mdash; multi-step workflows with transactional consistency.
              </p>

              <div className="tags">
                <span className="tag">Next.js</span>
                <span className="tag">Go / Fiber</span>
                <span className="tag">MSSQL</span>
              </div>
            </article>
          </li>

        </ol>
      </div>
    </section>
  );
}

