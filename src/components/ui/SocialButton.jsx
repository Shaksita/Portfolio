import { cn } from '../../lib/cn';

/**
 * Circular icon link used in the contact row.
 *
 * Takes either an `icon` node (an SVG) or a short `glyph` string for the marks
 * that read better as letterforms than as outlines — LinkedIn's "in", Behance's
 * "Bē". Both render inside the same circle so the row stays even.
 *
 * Every button carries a visible `label` for assistive tech, since a circle
 * with a glyph in it says nothing on its own.
 */
export function SocialButton({ href, label, icon, glyph, external = true, download = false }) {
  const externalProps = external && !download ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...externalProps}
      {...(download ? { download: true } : {})}
      className={cn(
        'flex h-[52px] w-[52px] items-center justify-center rounded-full border border-rule bg-paper-2/80 text-ink-2',
        'transition-[transform,color,border-color,background-color,box-shadow] duration-300 ease-reveal',
        'hover:-translate-y-1 hover:border-accent hover:bg-accent/10 hover:text-accent',
        'hover:shadow-[0_10px_24px_-10px_rgb(var(--accent)/0.7)]',
      )}
    >
      {glyph ? (
        <span className="text-[0.95rem] font-semibold leading-none tracking-tight">{glyph}</span>
      ) : (
        icon
      )}
    </a>
  );
}

/* ---- icons: single-colour, inherit the button's text colour ---- */

export const MailIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const InstagramIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
  </svg>
);

export const DocumentIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M6 2.75h7.5L18.25 7.5v13.75H6z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M13.25 3v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M9 13h6M9 16.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
