import type { CSSProperties } from 'react';

/**
 * The handful of helpers that belong to no one feature.
 *
 * Both front ends drive stagger delays and per-item brand tints from CSS
 * custom properties set on the element, so both need a way to write them —
 * which is the only reason this file exists rather than each caller repeating
 * the same cast.
 */

/**
 * Custom properties as a style object.
 *
 * React writes `--*` keys through untouched; the cast exists only because
 * CSSProperties has no index signature for them.
 */
export function cssVars(vars: Record<string, string>): CSSProperties {
  return vars as CSSProperties;
}

/** Stagger delay for the nth item of a list, as the `--d` custom property. */
export function stagger(index: number, step: number): CSSProperties {
  return cssVars({ '--d': `${index * step}ms` });
}

/** Joins class names, dropping anything falsy. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
