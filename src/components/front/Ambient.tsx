/**
 * Ambient layers: aurora blobs, blueprint grid, film grain, cursor
 * spotlight, and the scroll-progress bar.
 *
 * All of it is decorative and sits behind the content on negative
 * z-indexes. The three aurora gradients are written out in full rather
 * than generated, because Tailwind only ever sees class names that appear
 * literally in the source.
 */
export function Ambient() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-20 overflow-hidden
          bg-[radial-gradient(125%_90%_at_50%_0%,var(--bg)_0%,var(--bg-deep)_100%)]"
        aria-hidden="true"
      >
        <div
          className="absolute -top-[14vw] -left-[8vw] h-[46vw] min-h-[380px] w-[46vw] min-w-[380px]
            rounded-full opacity-[var(--aurora-alpha)]
            bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-1)_100%,transparent)_0%,color-mix(in_srgb,var(--brand-1)_70%,transparent)_22%,color-mix(in_srgb,var(--brand-1)_36%,transparent)_42%,color-mix(in_srgb,var(--brand-1)_13%,transparent)_62%,transparent_80%)]"
        />
        <div
          className="absolute -top-[6vw] -right-[10vw] h-[40vw] min-h-[340px] w-[40vw] min-w-[340px]
            rounded-full opacity-[var(--aurora-alpha)]
            bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-2)_100%,transparent)_0%,color-mix(in_srgb,var(--brand-2)_70%,transparent)_22%,color-mix(in_srgb,var(--brand-2)_36%,transparent)_42%,color-mix(in_srgb,var(--brand-2)_13%,transparent)_62%,transparent_80%)]"
        />
        {/* Dimmer than the other two: it sits under the body copy rather
            than off the edge of the page. */}
        <div
          className="absolute top-[58%] left-[30%] h-[38vw] min-h-[300px] w-[38vw] min-w-[300px]
            rounded-full opacity-[calc(var(--aurora-alpha)*.55)]
            bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-3)_100%,transparent)_0%,color-mix(in_srgb,var(--brand-3)_70%,transparent)_22%,color-mix(in_srgb,var(--brand-3)_36%,transparent)_42%,color-mix(in_srgb,var(--brand-3)_13%,transparent)_62%,transparent_80%)]"
        />

        {/* Blueprint grid, faded out towards the bottom so it never
            competes with the sections it sits behind. */}
        <div
          className="absolute inset-0 text-ink opacity-[var(--grid-alpha)]
            [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
            [background-size:72px_72px]
            [mask-image:radial-gradient(125%_85%_at_50%_0%,#000_18%,transparent_78%)]"
        />

        <div className="absolute inset-0 opacity-[var(--noise-alpha)] [background-image:var(--noise-url)]" />
      </div>

      {/* Follows the pointer; main.js writes the transform and flags the
          body once a real pointer has actually moved, so touch devices
          never pay for it. */}
      <div
        className="spotlight pointer-events-none fixed top-0 left-0 -z-10 -mt-[230px] -ml-[230px]
          size-[460px] rounded-full opacity-0 transition-opacity duration-[600ms] ease-brand
          [will-change:transform]
          bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand-2)_24%,transparent),transparent_62%)]
          [body.has-pointer_&]:opacity-50"
        aria-hidden="true"
      />

      <div
        id="progress"
        className="fixed inset-x-0 top-0 z-[1200] h-[2.5px] origin-left scale-x-0
          bg-[image:var(--gradient-brand)]
          shadow-[0_0_14px_color-mix(in_srgb,var(--brand-2)_70%,transparent)]"
        aria-hidden="true"
      />
    </>
  );
}
