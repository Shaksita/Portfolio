import { Display, Eyebrow } from './Primitives';

/**
 * Divider heading used inside a section — an optional accent index, a serif
 * title, and a small label pushed to the right, separated from what follows by
 * a rule.
 *
 * Carries the same index treatment as SectionHeading so a sub-section like
 * Education reads as part of the page's numbered sequence rather than a
 * separate kind of thing.
 *
 * @param {string} [number]  Two-digit index, e.g. "04".
 * @param {string} title
 * @param {string} [note]    Small right-hand label.
 */
export function SubHeading({ number, title, note }) {
  return (
    <div className="mb-4 mt-[clamp(2.875rem,6.5vw,4.75rem)] flex items-baseline justify-between gap-5 border-b border-rule pb-3">
      <div className="flex items-baseline gap-3 sm:gap-5">
        {number ? (
          <span className="shrink-0 font-mono text-[0.8rem] tracking-[0.1em] text-accent sm:text-[0.95rem]">
            {number}
          </span>
        ) : null}
        <Display as="h3" size="sm">
          {title}
        </Display>
      </div>
      {note ? <Eyebrow className="shrink-0">{note}</Eyebrow> : null}
    </div>
  );
}
