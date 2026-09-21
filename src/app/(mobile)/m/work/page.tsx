import type { Metadata } from 'next';

import { OPEN_GRAPH } from '@/constants';
import { WorkScreen } from '@/features/handheld/components/WorkScreen';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Six builds that reached real users — schema, API and interface where it says end to end.',
  alternates: { canonical: '/#work' },
  openGraph: { ...OPEN_GRAPH, url: '/m/work' },
};

export default function WorkPage() {
  return <WorkScreen />;
}
