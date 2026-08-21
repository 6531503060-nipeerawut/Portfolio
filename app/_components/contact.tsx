import { SectionEyebrow } from "@/app/_components/section-eyebrow";
import { RESUME_HREF } from "@/app/_lib/site";

export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="shell">
        <div className="card contact__panel reveal reveal--scale">
          <SectionEyebrow id="contact" />
          <h2>Say <span className="grad">hello</span>.</h2>
          <p>
            Hiring, collaborating, or just comparing notes on something you are building &mdash; my inbox is open
            and I reply to everything.
          </p>

          <div className="copy-mail" id="copyMail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true" style={{ width: "19px", height: "19px", color: "var(--brand-1)" }}>
              <use href="#i-mail" />
            </svg>
            <span className="copy-mail__value" id="emailValue">yeern12@gmail.com</span>
            <button className="copy-mail__btn" id="copyBtn" type="button" aria-label="Copy email address to clipboard">
              <svg className="i-copy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-copy" /></svg>
              <svg className="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-check" /></svg>
              <span id="copyLabel">Copy</span>
            </button>
          </div>

          <div className="channels">
            <a className="channel channel--li" href="https://www.linkedin.com/in/peerawut-nipakornpan-3550a131a"
              target="_blank" rel="noopener noreferrer">
              <span className="channel__ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-linkedin" /></svg>
              </span>
              <span>
                <span className="channel__label">LinkedIn</span>
                <span className="channel__handle">peerawut-nipakornpan</span>
              </span>
              <span className="channel__arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-external" /></svg>
              </span>
            </a>

            <a className="channel channel--gh" href="https://github.com/6531503060-nipeerawut" target="_blank"
              rel="noopener noreferrer">
              <span className="channel__ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-github" /></svg>
              </span>
              <span>
                <span className="channel__label">GitHub</span>
                <span className="channel__handle">6531503060-nipeerawut</span>
              </span>
              <span className="channel__arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-external" /></svg>
              </span>
            </a>

            <a className="channel channel--fb" href="https://www.facebook.com/nong.off.3" target="_blank"
              rel="noopener noreferrer">
              <span className="channel__ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-facebook" /></svg>
              </span>
              <span>
                <span className="channel__label">Facebook</span>
                <span className="channel__handle">nong.off.3</span>
              </span>
              <span className="channel__arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-external" /></svg>
              </span>
            </a>

            <a className="channel channel--cv" href={RESUME_HREF} download>
              <span className="channel__ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-download" /></svg>
              </span>
              <span>
                <span className="channel__label">Resume</span>
                <span className="channel__handle">PDF, one page</span>
              </span>
              <span className="channel__arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"
                  strokeLinejoin="round" aria-hidden="true"><use href="#i-arrow-down" /></svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

