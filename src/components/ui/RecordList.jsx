import { cn } from '../../lib/cn';
import { Eyebrow } from './Primitives';

/**
 * Three-column record rows: title, issuer, period.
 *
 * Shared by Education and Certifications. At medium widths the issuer drops
 * beneath the title while the period stays on the right; on phones all three
 * stack. Reflowing with grid placement rather than hiding anything keeps every
 * field readable at every size.
 *
 * @param {{title: string, issuer: string, period: string}[]} items
 */
export function RecordList({ items, className }) {
  return (
    <ul className={cn('border-t border-rule-2', className)}>
      {items.map(({ title, issuer, period }) => (
        <li
          key={title}
          className="grid items-baseline gap-x-[clamp(0.625rem,2.5vw,1.75rem)] gap-y-1.5 border-b border-rule-2 py-4 [grid-template-columns:1fr] md:[grid-template-columns:minmax(0,1fr)_170px] lg:[grid-template-columns:minmax(0,1fr)_230px_180px]"
        >
          <span className="text-base text-ink md:[grid-row:1]">{title}</span>
          <span className="text-[0.94rem] text-ink-2 md:[grid-column:1] md:[grid-row:2] lg:[grid-column:2] lg:[grid-row:1]">
            {issuer}
          </span>
          <Eyebrow className="tracking-[0.1em] md:[grid-column:2] md:[grid-row:1] md:text-right lg:[grid-column:3]">
            {period}
          </Eyebrow>
        </li>
      ))}
    </ul>
  );
}
