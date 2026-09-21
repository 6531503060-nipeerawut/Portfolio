import type { Metadata } from 'next';

import { OPEN_GRAPH, SHARE_DESCRIPTION } from '@/constants';
import { ContactScreen } from '@/features/handheld/components/ContactScreen';

export const metadata: Metadata = {
  title: 'Contact',
  description: SHARE_DESCRIPTION,
  alternates: { canonical: '/contact' },
  openGraph: { ...OPEN_GRAPH, url: '/m/contact' },
};

export default function ContactPage() {
  return <ContactScreen />;
}
