import type { Metadata } from 'next';

import { OPEN_GRAPH, SHARE_DESCRIPTION } from '@/constants';
import { HomeScreen } from '@/features/handheld/components/HomeScreen';

export const metadata: Metadata = {
  title: 'Home',
  description: SHARE_DESCRIPTION,
  // The document is the indexed copy of all of this; see the app layout.
  alternates: { canonical: '/' },
  openGraph: { ...OPEN_GRAPH, url: '/m' },
};

export default function HomePage() {
  return <HomeScreen />;
}
