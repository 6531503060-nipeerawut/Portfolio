import Image from "next/image";

import { PROFILE_IMAGE, PROFILE_IMAGE_ALT, RESUME_HREF, cssVars } from "@/app/_lib/site";

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

export function Hero() {
  return (
    <>
      <section className="hero section" id="home">
        <div className="shell hero__grid">
          <div className="hero__copy">
            <span className="eyebrow enter" style={cssVars({ "--d": "60ms" })}>
              <span className="dot"></span>Open to opportunities
            </span>

            <p className="hero__intro enter" style={cssVars({ "--d": "140ms" })}>Hello, my name is</p>

            <h1 className="enter" style={cssVars({ "--d": "210ms" })}>
              <span className="grad">Peerawut</span>
              <span className="hero__surname">Nipakornpan</span>
            </h1>

            <p className="hero__role enter" style={cssVars({ "--d": "290ms" })}>
              <span className="prompt">&gt;</span>
              <span id="roleText" data-roles="Junior Full-Stack Developer|Web &amp; Mobile Developer|Frontend &amp; Backend Developer">Junior Full-Stack Developer</span><span className="caret"></span>
            </p>

            <p className="hero__desc enter" style={cssVars({ "--d": "360ms" })}>
              I build features end to end — the database schema, the API behind it, and the screens on top.
              Right now I do that across two production platforms at <strong>Gendee.ai</strong>: an AI content
              studio and a digital news app.
            </p>

            <div className="hero__actions enter" style={cssVars({ "--d": "430ms" })}>
              <a className="btn btn--primary magnetic" href="#work">
                See what I have built
                <svg className="arr-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-arrow-right" /></svg>
              </a>
              <a className="btn btn--ghost magnetic" href="#contact">
                Get in touch
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-mail" /></svg>
              </a>
              <a className="btn btn--ghost magnetic" href={RESUME_HREF} download>
                Download CV
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-download" /></svg>
              </a>
            </div>

            <div className="socials enter" style={cssVars({ "--d": "500ms" })}>
              <span className="socials__label">Find me</span>
              <a className="social" href="https://github.com/6531503060-nipeerawut" target="_blank" rel="noopener noreferrer"
                aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-github" /></svg>
              </a>
              <a className="social" href="https://www.linkedin.com/in/peerawut-nipakornpan-3550a131a" target="_blank"
                rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-linkedin" /></svg>
              </a>
              <a className="social" href="https://www.facebook.com/nong.off.3" target="_blank" rel="noopener noreferrer"
                aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-facebook" /></svg>
              </a>
              <a className="social" href="mailto:yeern12@gmail.com" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-mail" /></svg>
              </a>
            </div>
          </div>

          <div className="hero__figure enter" style={cssVars({ "--d": "300ms" })}>
            <div className="hero__rings" aria-hidden="true"><span></span><span></span><span></span></div>
            <div className="hero__orbit" aria-hidden="true"></div>
            <div className="hero__photo">
              {/* The largest thing on the first screen, so it goes through the
                  optimizer: the source is 2048x2048 and the circle is never
                  wider than ~312 CSS px. The sizes hint is what tells the
                  browser that, and priority preloads the variant it picks. */}
              <Image src={PROFILE_IMAGE} alt={PROFILE_IMAGE_ALT} width={440} height={440}
                sizes="(max-width: 980px) 250px, 312px" priority />
            </div>
          </div>
        </div>

        <a className="hero__cue" href="#about" aria-label="Scroll to about section">
          <span>Scroll</span>
          <span className="track" aria-hidden="true"></span>
        </a>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {/* Two identical groups: the track scrolls exactly one group width,
              so the second copy is what makes the loop seamless. */}
          {[0, 1].map((group) => (
            <div className="marquee__group" key={group}>
              {MARQUEE.map((item) => (
                <span className="marquee__item" key={item}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

