import { SECTIONS, drawerNumber } from "@/app/_lib/sections";
import { cssVars } from "@/app/_lib/site";

export function SiteHeader() {
  return (
    <>
      <header className="nav" id="nav">
        <div className="shell nav__inner">
          <a className="brand" href="#home" aria-label="Peerawut Nipakornpan — back to top">
            <span className="brand__mark">PN</span>
            <span className="brand__text">
              <span className="brand__name">Peerawut Nipakornpan</span>
              <span className="brand__role">Junior Full-Stack Developer</span>
            </span>
          </a>

          <nav className="nav__links" id="navLinks" aria-label="Section navigation">
            <span className="nav__pill" id="navPill" aria-hidden="true"></span>
            {SECTIONS.map((section) => (
              <a className="nav__link" href={`#${section.id}`} key={section.id}>{section.label}</a>
            ))}
          </nav>

          <div className="nav__actions">
            <button className="icon-btn theme-toggle" id="themeToggle" type="button" aria-label="Switch colour theme">
              <span className="theme-toggle__icons">
                <svg className="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-sun" /></svg>
                <svg className="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><use href="#i-moon" /></svg>
              </span>
            </button>

            <button className="nav__burger" id="burger" type="button" aria-expanded="false" aria-controls="drawer"
              aria-label="Open menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      <div className="drawer" id="drawer" aria-hidden="true">
        <nav className="drawer__list" aria-label="Mobile navigation">
          {SECTIONS.map((section, index) => (
            <a className="drawer__link" href={`#${section.id}`} key={section.id}
              style={cssVars({ "--i": String(index) })}>
              <span className="num">{drawerNumber(index)}</span>
              <span>{section.label}<span className="drawer__desc">{section.blurb}</span></span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
