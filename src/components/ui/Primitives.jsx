import { cn } from '../../lib/cn';

/**
 * Uppercase micro-label. Used for section eyebrows, list keys and captions —
 * every small letterspaced label on the site comes from here.
 */
export function Eyebrow({ as: Tag = 'span', className, children }) {
  return (
    <Tag className={cn('text-label font-medium uppercase text-ink-3', className)}>{children}</Tag>
  );
}

/**
 * Serif display type at one of four fixed steps.
 * Keeping the scale in one component stops headings drifting apart over time.
 *
 * @param {'xl'|'lg'|'md'|'sm'} [size='lg']
 */
export function Display({ as: Tag = 'h2', size = 'lg', className, children }) {
  const sizes = {
    xl: 'text-display-xl',
    lg: 'text-display-lg',
    md: 'text-display-md',
    sm: 'text-display-sm',
  };
  return (
    <Tag className={cn('font-display font-light text-balance', sizes[size], className)}>
      {children}
    </Tag>
  );
}

/** The italic accent word inside a Display heading. */
export function Accent({ children }) {
  return <em className="italic text-accent">{children}</em>;
}

/** Body copy held at a comfortable measure. */
export function Prose({ className, children }) {
  return <p className={cn('max-w-prose text-ink', className)}>{children}</p>;
}

/** The hero's larger intro paragraph. Set in primary ink, not the dimmer tier —
 *  it is a headline-adjacent line, not supporting copy. */
export function Lede({ className, children }) {
  return <p className={cn('max-w-[60ch] text-lede text-ink', className)}>{children}</p>;
}

/**
 * Page section wrapper: vertical rhythm, the hairline that separates sections,
 * and a scroll offset so the sticky navbar never covers a heading.
 *
 * @param {string}  id              Anchor target, also used by the scroll-spy.
 * @param {boolean} [first=false]   Marks the hero; kept for callers, no visual effect.
 */
export function Section({ id, first = false, className, children }) {
  return (
    <section id={id} className={cn('scroll-mt-nav-offset py-section', className)}>
      {children}
    </section>
  );
}

/**
 * Section header: a small accent index beside the display heading.
 *
 * The number is real information — it tells the reader where they are in a
 * five-part page — so it is rendered as text rather than a decorative glyph,
 * and it sits on the heading's baseline rather than floating above it.
 *
 * @param {string} [number]  Two-digit index, e.g. "01". Omitted = no index.
 */
export function SectionHeading({ number, children }) {
  return (
    <header className="mb-[clamp(2rem,5vw,3.625rem)] flex items-baseline gap-3 sm:gap-5">
      {number ? (
        <span className="shrink-0 font-mono text-[0.8rem] tracking-[0.1em] text-accent sm:text-[0.95rem]">
          {number}
        </span>
      ) : null}
      <Display as="h2">{children}</Display>
    </header>
  );
}

/** Max-width page shell with the shared horizontal gutter. */
export function Container({ as: Tag = 'div', className, children }) {
  return <Tag className={cn('mx-auto w-full max-w-page px-gutter', className)}>{children}</Tag>;
}

/**
 * Inline text link in two weights.
 *
 * `quiet` is for links inside running copy, where a hairline is enough.
 * `accent` is for standalone links that must read as clickable at a glance —
 * the underline is accent-coloured and thicker, and external ones carry an
 * arrow so the destination is obvious before the click.
 *
 * @param {'quiet'|'accent'} [variant='quiet']
 */
export function TextLink({ href, external = false, variant = 'quiet', className, children }) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  const variants = {
    quiet: 'border-b border-rule pb-px hover:border-accent hover:text-accent',
    accent:
      'border-b-2 border-accent/70 pb-0.5 text-ink hover:border-accent hover:text-accent hover:drop-shadow-[0_0_10px_rgb(var(--accent)/0.55)]',
  };

  return (
    <a
      href={href}
      {...externalProps}
      className={cn(
        'inline-flex items-center gap-1.5 transition-[color,border-color,filter] duration-200',
        variants[variant],
        className,
      )}
    >
      {children}
      {external ? (
        <span aria-hidden="true" className="text-[0.85em] leading-none">
          &#8599;
        </span>
      ) : null}
    </a>
  );
}
