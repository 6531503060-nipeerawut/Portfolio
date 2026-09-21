import type { Metadata } from 'next';

import { OPEN_GRAPH } from '@/constants';
import { ExperienceScreen } from '@/features/handheld/components/ExperienceScreen';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Where I have worked and what I owned there.',
  alternates: { canonical: '/#experience' },
  openGraph: { ...OPEN_GRAPH, url: '/m/experience' },
};

export default function ExperiencePage() {
  return <ExperienceScreen />;
}
