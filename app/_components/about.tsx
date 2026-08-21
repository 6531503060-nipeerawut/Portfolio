import { SectionEyebrow } from "@/app/_components/section-eyebrow";
import { cssVars } from "@/app/_lib/site";

export function About() {
  return (
    <section className="section" id="about">
      <div className="shell">
        <div className="section-head section-head--split reveal">
          <div>
            <SectionEyebrow id="about" />
            <h2>I build features <span className="grad">end to end</span>.</h2>
            <p>Who I am, where I studied, and the way I like to work.</p>
          </div>

          <div className="stats">
            <div className="card stat">
              <div className="stat__num" data-count="2">2</div>
              <div className="stat__label">Platforms in production</div>
            </div>
            <div className="card stat">
              <div className="stat__num" data-count="6">6</div>
              <div className="stat__label">Repositories contributed to</div>
            </div>
            <div className="card stat">
              <div className="stat__num" data-count="218">218</div>
              <div className="stat__label">Commits authored</div>
            </div>
          </div>
        </div>

        <div className="about__grid">
          <article className="card about__bio reveal reveal--left">
            <p className="lead">
              Most features I take on start at the database and finish in the browser. I design the tables and
              access rules, write the API, then build the screens that use them.
            </p>
            <p>
              That is how I work at <mark>Gendee.ai</mark>, on two products at once: <strong>Gendee.ai</strong>,
              an AI content generation platform, and <strong>CIRCLE</strong>, a digital news app. Owning the whole
              path means the pieces actually fit — no guessing at a contract someone else wrote.
            </p>
            <p>
              I graduated in Software Engineering from Mae Fah Luang University, School of Applied Digital
              Technology. My senior project and my internship both ran inside real operations, where accurate
              records mattered more than clever code. That shaped how I build: get the data model right first,
              keep the interface predictable, and write it down so the next person is not stuck.
            </p>

          </article>

          <div className="about__side">
            <ul className="card facts reveal reveal--right" style={cssVars({ "--d": "80ms" })}>
              <li>
                <span className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"><use href="#i-briefcase" /></svg>
                </span>
                <div>
                  <span className="k">Currently</span>
                  <span className="v">Junior Full-Stack Developer at Gendee.ai</span>
                </div>
              </li>
              <li>
                <span className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"><use href="#i-cap" /></svg>
                </span>
                <div>
                  <span className="k">Education</span>
                  <span className="v">B.Eng. Software Engineering<br />Mae Fah Luang University</span>
                </div>
              </li>
              <li>
                <span className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"><use href="#i-code" /></svg>
                </span>
                <div>
                  <span className="k">Focus</span>
                  <span className="v">Next.js, Go (Fiber), PostgreSQL</span>
                </div>
              </li>
              <li>
                <span className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                    strokeLinejoin="round" aria-hidden="true"><use href="#i-pin" /></svg>
                </span>
                <div>
                  <span className="k">Based in</span>
                  <span className="v">Thailand — open to remote &amp; on-site</span>
                </div>
              </li>
            </ul>

            <div className="card live-links reveal reveal--right" style={cssVars({ "--d": "240ms" })}>
              <span className="live-links__label">See them live</span>
              <div className="live-links__row">
                <a className="live-link live-link--1" href="https://gendee.ai/" target="_blank"
                  rel="noopener noreferrer">
                  <span className="live-link__ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-globe" /></svg>
                  </span>
                  <span className="live-link__text">
                    <span className="live-link__name">Gendee.ai</span>
                    <span className="live-link__meta"><i className="live-dot"></i>gendee.ai</span>
                  </span>
                  <span className="live-link__arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-external" /></svg>
                  </span>
                </a>

                <a className="live-link live-link--2" href="https://circle-demo-gch.pages.dev/tabs/home" target="_blank"
                  rel="noopener noreferrer">
                  <span className="live-link__ico">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-news" /></svg>
                  </span>
                  <span className="live-link__text">
                    <span className="live-link__name">CIRCLE <span className="live-link__tag">Demo</span></span>
                    <span className="live-link__meta"><i className="live-dot"></i>circle-demo-gch.pages.dev</span>
                  </span>
                  <span className="live-link__arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-external" /></svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

