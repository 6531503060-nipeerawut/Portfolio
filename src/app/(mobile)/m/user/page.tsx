import type { Metadata } from 'next';

import { OPEN_GRAPH } from '@/constants';
import { ACCOUNT_APP_HREF, ACCOUNT_HREF } from '@/constants/navigation';
import { AccountAppScreen } from '@/features/account/components/AccountAppScreen';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'The GitHub account behind the commits listed across this portfolio.',
  alternates: { canonical: ACCOUNT_HREF },
  openGraph: { ...OPEN_GRAPH, url: ACCOUNT_APP_HREF },
};

export default function AppUserPage() {
  return <AccountAppScreen />;
}
