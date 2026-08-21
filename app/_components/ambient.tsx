/** Ambient layers: aurora blobs, blueprint grid, film grain. */
export function Ambient() {
  return (
    <>
      <div className="ambient" aria-hidden="true">
        <div className="aurora aurora--1"></div>
        <div className="aurora aurora--2"></div>
        <div className="aurora aurora--3"></div>
        <div className="grid-layer"></div>
        <div className="noise-layer"></div>
      </div>
      <div className="spotlight" aria-hidden="true"></div>
      <div className="progress" id="progress" aria-hidden="true"></div>
    </>
  );
}

