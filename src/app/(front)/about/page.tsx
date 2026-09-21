import type { Metadata } from 'next';

import { About } from '@/features/document/components/About';
import { APP_MEDIA } from '@/constants/navigation';
import { OPEN_GRAPH, SHARE_DESCRIPTION } from '@/constants';

export const metadata: Metadata = {
  title: 'About',
  description: SHARE_DESCRIPTION,
  alternates: { canonical: '/about', media: { [APP_MEDIA]: '/m/about' } },
  // These two sections are also on the home page, which is where the nav
  // points and where visitors actually read them. The route stays for a
  // direct link, but it should not compete with the home page in search.
  robots: { index: false, follow: true },
  openGraph: { ...OPEN_GRAPH, url: '/about' },
};

export default function AboutPage() {
  // pt-* clears the fixed navbar, which no longer has a full-height hero
  // sitting under it on this route.
  return (
    <div className="pt-[clamp(5rem,10vh,7rem)]">
      <About />
    </div>
  );
}
