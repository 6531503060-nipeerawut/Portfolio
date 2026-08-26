import { CARD } from "@/lib/styles";

/**
 * A single figure with a caption, used across the admin dashboard.
 *
 * `hint` is optional and carries the sentence that explains where the
 * number came from — a dashboard tile that cannot say that is a number
 * nobody can act on.
 */
export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className={`${CARD} p-5`}>
      <span className="block font-mono text-[.64rem] tracking-[.14em] uppercase text-ink-faint">
        {label}
      </span>
      <span
        className="mt-2 block font-display text-[clamp(1.6rem,3.4vw,2.1rem)] font-extrabold leading-none
          tracking-[-.04em] [font-variant-numeric:tabular-nums] bg-[image:var(--gradient-text)]
          bg-clip-text text-transparent"
      >
        {value}
      </span>
      {hint ? <p className="mt-2 text-[.82rem] leading-[1.45] text-ink-muted">{hint}</p> : null}
    </div>
  );
}
