import type { Metadata } from 'next';

import { OPEN_GRAPH } from '@/constants';
import { APP_MEDIA, APP_ROOT } from '@/constants/navigation';
import { DocumentScreen } from '@/features/document/components/DocumentScreen';

// Title, description, icons and the share card are inherited from the root
// layout. Only the tags that name *this* route belong here — the layout has
// no pathname, so declaring them there would have every other route claim
// to be the home page.
export const metadata: Metadata = {
  // This page is the indexed one; `media` names the phone screen that shows
  // the same content, which points its canonical back here.
  alternates: { canonical: '/', media: { [APP_MEDIA]: APP_ROOT } },
  openGraph: { ...OPEN_GRAPH, url: '/' },
};

export default function Home() {
  return <DocumentScreen />;
}
