import type { Metadata } from 'next';

import { OPEN_GRAPH } from '@/constants';
import { SkillsScreen } from '@/features/handheld/components/SkillsScreen';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'The stack I use day to day, plus what I have shipped with before.',
  // No desktop route of its own: over there this is a section of the one page.
  alternates: { canonical: '/#skills' },
  openGraph: { ...OPEN_GRAPH, url: '/m/skills' },
};

export default function SkillsPage() {
  return <SkillsScreen />;
}
