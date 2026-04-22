import React, { CSSProperties, Fragment, ReactNode } from 'react';
import { Text } from '../Typography/Text';
import styles from './Footer.module.css';

export interface FooterLink {
  label: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
}

export interface FooterLinkSection {
  title: string;
  links: FooterLink[];
}

export interface FooterContentPair {
  title: string;
  body: string;
}

export type FooterSocialPlatform =
  | 'linkedin'
  | 'instagram'
  | 'twitter'
  | 'youtube'
  | 'pinterest';

export interface FooterSocialLink {
  platform: FooterSocialPlatform;
  href: string;
  label?: string;
}

export interface FooterProps {
  /** Compact brand logo rendered above the heading */
  logo?: ReactNode;
  /** Large hero heading (e.g. "Win Hearts") */
  heading?: string;
  /** Content pairs (title + body) — rendered in a 2-column grid, wrapping */
  contentPairs?: FooterContentPair[];
  /** Optional trailing slot shown alongside the last content pair (e.g. certifications) */
  trailingContent?: ReactNode;
  /** Link columns — auto-chunked into rows of 4 with dividers between rows */
  linkSections?: FooterLinkSection[];
  /** Bottom-left legal links (Help, Privacy, Terms) */
  legalLinks?: FooterLink[];
  /** Bottom-right social icons */
  socialLinks?: FooterSocialLink[];
  /** Oversized decorative wordmark. Pass a string for a simple outlined text or a ReactNode (e.g. Lottie player) for a custom animation. */
  wordmark?: ReactNode;
  /** Copyright line */
  copyright?: string;
  className?: string;
  style?: CSSProperties;
}

const SocialIcon: React.FC<{ platform: FooterSocialPlatform }> = ({ platform }) => {
  switch (platform) {
    case 'linkedin':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79ZM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68Zm1.39 9.94v-8.37H5.5v8.37h2.77Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'twitter':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.53 3h3.21l-7.02 8.02L22 21h-6.47l-5.06-6.61L4.68 21H1.47l7.5-8.57L1 3h6.62l4.58 6.05L17.53 3Zm-1.12 16.14h1.78L7.66 4.76H5.75L16.41 19.14Z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.5 7.2a2.9 2.9 0 0 0-2-2.05C19.72 4.7 12 4.7 12 4.7s-7.72 0-9.5.45A2.9 2.9 0 0 0 .5 7.2 30.5 30.5 0 0 0 0 12a30.5 30.5 0 0 0 .5 4.8 2.9 2.9 0 0 0 2 2.05C4.28 19.3 12 19.3 12 19.3s7.72 0 9.5-.45a2.9 2.9 0 0 0 2-2.05A30.5 30.5 0 0 0 24 12a30.5 30.5 0 0 0-.5-4.8ZM9.6 15.57V8.43L15.82 12 9.6 15.57Z" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.25a9.75 9.75 0 0 0-3.55 18.84c-.08-.8-.16-2.02.03-2.89.18-.78 1.14-4.95 1.14-4.95s-.29-.59-.29-1.45c0-1.36.79-2.37 1.77-2.37.83 0 1.24.63 1.24 1.38 0 .84-.53 2.1-.81 3.26-.23.97.49 1.77 1.45 1.77 1.74 0 3.08-1.84 3.08-4.5 0-2.35-1.69-4-4.1-4-2.8 0-4.44 2.1-4.44 4.27 0 .85.33 1.75.73 2.25.08.1.09.18.07.28l-.27 1.12c-.04.18-.15.22-.34.14-1.27-.59-2.07-2.44-2.07-3.92 0-3.19 2.32-6.12 6.69-6.12 3.51 0 6.24 2.5 6.24 5.85 0 3.49-2.2 6.3-5.26 6.3-1.03 0-1.99-.54-2.32-1.17l-.63 2.4c-.23.88-.84 1.99-1.25 2.66A9.75 9.75 0 1 0 12 2.25Z" />
        </svg>
      );
  }
};

const renderLink = (
  link: FooterLink,
  className: string,
  variant: 'body-s' | 'body-m' = 'body-s'
) => {
  const handleClick = link.onClick
    ? (e: React.MouseEvent) => {
        if (!link.href) e.preventDefault();
        link.onClick?.();
      }
    : undefined;

  const content = (
    <Text variant={variant} as="span">
      {link.label}
    </Text>
  );

  if (link.href) {
    return (
      <a
        key={link.label}
        className={className}
        href={link.href}
        target={link.external ? '_blank' : undefined}
        rel={link.external ? 'noopener noreferrer' : undefined}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }
  return (
    <button key={link.label} type="button" className={className} onClick={handleClick}>
      {content}
    </button>
  );
};

const chunk = <T,>(arr: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

export const Footer: React.FC<FooterProps> = ({
  logo,
  heading,
  contentPairs,
  trailingContent,
  linkSections = [],
  legalLinks,
  socialLinks,
  wordmark,
  copyright,
  className,
  style,
}) => {
  const rootClass = [styles.root, className].filter(Boolean).join(' ');
  const linkRows = chunk(linkSections, 4);

  return (
    <footer className={rootClass} style={style}>
      <div className={styles.container}>
        {(logo || heading) && (
          <div className={styles.topBlock}>
            {logo && <div className={styles.logo}>{logo}</div>}
            {heading && (
              <Text variant="heading-xxl" as="h2" color="white">
                {heading}
              </Text>
            )}
          </div>
        )}

        {((contentPairs && contentPairs.length > 0) || trailingContent) && (
          <div className={styles.contentPairs}>
            {contentPairs?.map((pair, i) => (
              <div key={`${pair.title}-${i}`} className={styles.contentPair}>
                <Text variant="body-s" weight="medium" color="white" as="p">
                  {pair.title}
                </Text>
                <Text variant="body-s" color="muted" as="p">
                  {pair.body}
                </Text>
              </div>
            ))}
            {trailingContent && <div className={styles.trailing}>{trailingContent}</div>}
          </div>
        )}

        {linkRows.map((row, rowIdx) => (
          <Fragment key={rowIdx}>
            <div className={styles.divider} role="presentation" />
            <div className={styles.linkRow}>
              {row.map((section) => (
                <div key={section.title} className={styles.linkSection}>
                  <Text
                    variant="body-xs"
                    caps
                    weight="semibold"
                    color="white"
                    as="h3"
                  >
                    {section.title}
                  </Text>
                  <ul className={styles.linkList}>
                    {section.links.map((link) => (
                      <li key={link.label}>{renderLink(link, styles.link)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Fragment>
        ))}

        {(legalLinks?.length || socialLinks?.length) && (
          <>
            <div className={styles.divider} role="presentation" />
            <div className={styles.bottomRow}>
              {legalLinks && legalLinks.length > 0 && (
                <div className={styles.legalLinks}>
                  {legalLinks.map((link) => renderLink(link, styles.legalLink))}
                </div>
              )}
              {socialLinks && socialLinks.length > 0 && (
                <div className={styles.socialLinks}>
                  {socialLinks.map((s) => (
                    <a
                      key={s.platform}
                      href={s.href}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label ?? s.platform}
                    >
                      <SocialIcon platform={s.platform} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {wordmark && (
          <div
            className={[
              styles.wordmark,
              typeof wordmark === 'string' && styles['wordmark--text'],
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden="true"
          >
            {wordmark}
          </div>
        )}

        {copyright && (
          <div className={styles.copyright}>
            <Text variant="body-s" color="muted" as="p">
              {copyright}
            </Text>
          </div>
        )}
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
