import { CopyEmail } from './CopyEmail';
import { ScreenHead } from './ScreenHead';
import { CHANNELS } from '@/constants/content';
import {
  APP_ENTER,
  APP_LABEL,
  APP_ROW,
  APP_ROW_ARROW,
  APP_ROW_GROUP,
  APP_ROW_ICON,
  APP_ROW_META,
  APP_ROW_TITLE,
  SCREEN,
  STACK,
} from '@/components/ui/handheld';
import { cssVars } from '@/lib/utils';

export function ContactScreen() {
  return (
    <div className={`${SCREEN} ${STACK}`}>
      <ScreenHead id="contact" />

      <div className={APP_ENTER} style={cssVars({ '--d': '70ms' })}>
        <CopyEmail />
      </div>

      <section className={APP_ENTER} style={cssVars({ '--d': '140ms' })}>
        <span className={APP_LABEL}>Elsewhere</span>
        <div className={APP_ROW_GROUP}>
          {CHANNELS.map((channel) => (
            <a
              className={APP_ROW}
              href={channel.href}
              key={channel.label}
              style={cssVars({ '--tint': channel.tint })}
              {...(channel.download
                ? { download: true }
                : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              <span className={APP_ROW_ICON}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <use href={`#${channel.icon}`} />
                </svg>
              </span>

              <span className="min-w-0 flex-1">
                <span className={APP_ROW_TITLE}>{channel.label}</span>
                <span className={APP_ROW_META}>{channel.handle}</span>
              </span>

              {/* The résumé is a file, not a destination. */}
              <span className={APP_ROW_ARROW}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <use href={channel.download ? '#i-arrow-down' : '#i-external'} />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
