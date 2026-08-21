import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
