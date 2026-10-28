import { cn } from '../../lib/cn';

/**
 * Link-styled button in two weights.
 *
 * Renders an `<a>` because every action on this site navigates (mail, download,
 * external profile). Pass `download` for file links.
 *
 * @param {'solid'|'accent'|'ghost'} [variant='solid']
 * @param {boolean}                  [external=false]  Adds target/rel for off-site links.
 */
export function Button({
  href,
  variant = 'solid',
  external = false,
  download = false,
  className,
  children,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center rounded-md border px-7 py-3.5 text-[0.9rem] uppercase tracking-[0.1em] transition-colors duration-200';

  const variants = {
    solid: 'border-ink bg-ink text-paper hover:bg-transparent hover:text-ink',
    accent:
      'border-accent bg-accent text-ink hover:bg-accent/90 hover:shadow-[0_6px_16px_-6px_rgb(var(--accent)/0.65)]',
    ghost: 'border-rule bg-transparent text-ink hover:border-ink hover:bg-paper-2/60',
  };

  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a
      href={href}
      {...externalProps}
      {...(download ? { download: true } : {})}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {children}
    </a>
  );
}
