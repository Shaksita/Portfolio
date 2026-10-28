import { cn } from '../../lib/cn';
import { Eyebrow } from './Primitives';

/**
 * Label / value rows on a shared left axis.
 *
 * This is the component that keeps About and Contact visually aligned: both use
 * the same fixed label column, so labels and values line up across the page
 * instead of drifting with content length.
 *
 * @param {{label: string, value: string, href?: string|null}[]} items
 * @param {string} [labelWidth='6.5rem'] Width of the label column.
 */
export function DetailList({ items, labelWidth = '6.5rem', className }) {
  return (
    <dl className={cn('w-full border-t border-rule-2', className)}>
      {items.map(({ label, value, href }) => (
        <div
          key={label}
          className="grid items-baseline gap-x-5 gap-y-1 border-b border-rule-2 py-3.5 [grid-template-columns:1fr] sm:[grid-template-columns:var(--label-w)_minmax(0,1fr)]"
          style={{ '--label-w': labelWidth }}
        >
          <dt>
            <Eyebrow>{label}</Eyebrow>
          </dt>
          <dd className="min-w-0 break-words text-[0.97rem] text-ink">
            {href ? (
              <a
                href={href}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="border-b border-transparent transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                {value}
              </a>
            ) : (
              value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
