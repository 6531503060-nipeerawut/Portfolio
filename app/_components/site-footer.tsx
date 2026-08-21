export function SiteFooter({ year }: { year: number }) {
  return (
    <>
      <footer className="footer">
        <div className="shell footer__inner">
          <p>&copy; {year} Peerawut Nipakornpan. All rights reserved.</p>
          <p className="footer__built">Designed &amp; built with <span>&#9829;</span> using Next.js, React &amp; TypeScript</p>
        </div>
      </footer>

      <button className="icon-btn to-top" id="toTop" type="button" aria-label="Back to top">
        <svg className="arr-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round" aria-hidden="true"><use href="#i-arrow-up" /></svg>
      </button>

      <div className="toast-stack" id="toastStack" role="status" aria-live="polite"></div>
    </>
  );
}

