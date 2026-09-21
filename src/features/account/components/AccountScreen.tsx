import { EYEBROW, GRAD, H2, SECTION, SECTION_HEAD, SHELL } from '@/components/ui/document';
import { loadUser } from '../api';
import { AccountCard } from './AccountCard';

/**
 * The document's `/user` route.
 *
 * A Server Component that awaits its own data, which is what a Screen is on
 * this side of the site: there is no client-side fetching anywhere in this
 * project, so there is no hook layer between the screen and `api.ts` — the
 * four-layer rule collapses to two when the render itself is the fetch.
 *
 * Its counterpart on the phone is `AccountAppScreen`. The two read the same
 * account through the same `loadUser`, which is why they are one feature and
 * not two: if they each had their own call they could quietly start disagreeing
 * about how the profile is read.
 */
export async function AccountScreen() {
  const result = await loadUser();

  return (
    <section className={SECTION} id="user">
      <div className={SHELL}>
        <div className={`${SECTION_HEAD} mx-auto text-center`}>
          {/* Not a <SectionEyebrow>: those are numbered from the registry of
              home-page sections, and this route is not one of them. The
              counter would have nothing honest to print. */}
          <span className={EYEBROW}>
            <span className="text-brand-1">&#47;&#47;</span>
            {' GitHub'}
          </span>
          <h2 className={H2}>
            The account behind the <span className={GRAD}>commits</span>.
          </h2>
          <p>Read live from GitHub, so the counts here are whatever they are today.</p>
        </div>

        <div className="mx-auto max-w-[46rem]">
          <AccountCard {...result} />
        </div>
      </div>
    </section>
  );
}
