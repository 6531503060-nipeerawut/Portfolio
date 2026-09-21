import type { Metadata } from 'next';

import { OPEN_GRAPH, SHARE_DESCRIPTION } from '@/constants';
import { AboutScreen } from '@/features/handheld/components/AboutScreen';

export const metadata: Metadata = {
  title: 'About',
  description: SHARE_DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: { ...OPEN_GRAPH, url: '/m/about' },
};

export default function AboutPage() {
  return <AboutScreen />;
}
