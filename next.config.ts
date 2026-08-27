import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

/*
 * Config is a function of the phase so that `next dev` and `next build` can
 * be given separate output directories.
 *
 * Sharing one `.next` is what the default does, and on Windows it bites: a
 * production build drops its own `BUILD_ID`, `build-manifest.json` and
 * `server/` tree into the same folder a running dev server is rewriting,
 * the dev server then reads the build's manifests (`Could not find files
 * for /_error in .next/build-manifest.json`), and every manifest write
 * becomes a rename into a directory two Next processes are touching —
 * which fails with EPERM, because a rename over an open file is not
 * permitted here the way it is on Linux.
 *
 * Keeping them apart costs one directory and makes the two commands
 * genuinely independent: a build can run while the dev server is up, and
 * neither can leave artifacts the other will try to read.
 */
const nextConfig = (phase: string): NextConfig => ({
  // `next build` and `next start` share `.next`; only the dev server moves.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",

  // Hides the floating Next.js dev-tools badge in the corner during
  // `next dev`. Compile and runtime errors are still reported.
  devIndicators: false,

  images: {
    // The optimizer only ever serves the portrait in /images. Leaving it open
    // would let anyone hand it arbitrary local paths and query strings to
    // transcode.
    localPatterns: [{ pathname: "/images/**", search: "" }],
  },

  // The stylesheet, the interaction script and the CV PDFs are plain files in
  // /public rather than build inputs, so they need no configuration here and
  // keep the URLs they have always had.
});

export default nextConfig;
