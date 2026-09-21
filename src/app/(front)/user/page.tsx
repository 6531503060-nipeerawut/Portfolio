import type { Metadata } from 'next';

import { ACCOUNT_APP_HREF, ACCOUNT_HREF, APP_MEDIA } from '@/constants/navigation';
import { OPEN_GRAPH } from '@/constants';
import { AccountScreen } from '@/features/account/components/AccountScreen';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'The GitHub account behind the commits listed across this portfolio.',
  alternates: { canonical: ACCOUNT_HREF, media: { [APP_MEDIA]: ACCOUNT_APP_HREF } },
  // Reachable by anyone given the link, but not something to compete with
  // the home page in search results.
  robots: { index: false, follow: true },
  openGraph: { ...OPEN_GRAPH, url: ACCOUNT_HREF },
};

export default function UserPage() {
  // pt-* clears the fixed navbar, which has no full-height hero under it here.
  return (
    <div className="pt-[clamp(5rem,10vh,7rem)]">
      <AccountScreen />
    </div>
  );
}
