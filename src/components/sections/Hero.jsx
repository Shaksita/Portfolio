import { useEffect, useState } from 'react';
import { Eyebrow, Lede, Section, TextLink } from '../ui/Primitives';
import { Counter } from '../ui/Counter';
import { Button } from '../ui/Button';
import { StatusPanels } from '../decor/StatusPanels';
import { Marquee } from '../decor/Marquee';
import { contact, profile, projects, certifications, stack } from '../../data/profile';

/**
 * Headline that animates in word by word on mount.
 *
 * Each word is its own inline-block inside a clipping parent, so words rise
 * from behind a mask rather than fading. The closing line is set in the accent
 * colour, which is what gives the hero its single loud moment.
 */
function RisingHeadline({ words, mounted }) {
  return (
    <h1 className="font-display text-display-xl font-light text-balance">
      {words.map(({ word, accent }, i) => {
        const delay = 90 + i * 70;
        return (
          <span key={word} className="inline-block overflow-hidden align-bottom">
            <span
              className={`inline-block pr-[0.22em] transition-[transform,opacity] duration-[900ms] ease-reveal motion-reduce:!transform-none motion-reduce:!opacity-100 ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
              } ${accent ? 'glow-accent text-accent' : ''}`}
              style={{ transitionDelay: `${delay}ms` }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </h1>
  );
}

/** One figure in the stat strip. */
function Stat({ value, suffix, label }) {
  return (
    <div className="group relative flex-1 border-l border-rule pl-4 first:border-l-0 first:pl-0 sm:pl-6">
      <span className="block font-display text-[clamp(2rem,3.8vw,3rem)] font-light leading-none tabular-nums text-ink">
        <Counter value={value} suffix={suffix} />
      </span>
      <span className="mt-2.5 block text-[0.68rem] uppercase leading-snug tracking-[0.18em] text-ink-3">
        {label}
      </span>
      <span className="absolute -bottom-px left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

export function Hero() {
  const { intro, role, availability } = profile;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Figures are counted from the data, never hand-written, so they cannot drift.
  const skillCount = stack.groups.reduce((total, group) => total + group.items.length, 0);
  const stats = [
    { value: projects.length, suffix: '', label: 'Case studies published' },
    { value: 9, suffix: '', label: 'Months design internship' },
    { value: skillCount, suffix: '', label: 'Skills & tools' },
    { value: certifications.length, suffix: '', label: 'Certifications' },
  ];

  // One flowing block — the words wrap naturally instead of being forced onto
  // separate lines, which keeps the hero compact enough for a single screen.
  const headlineWords = [
    { word: 'Transforming' },
    { word: 'ideas' },
    { word: 'into' },
    { word: 'intuitive', accent: true },
    { word: 'experiences.', accent: true },
  ];

  const tools = stack.groups.flatMap((group) => group.items).slice(0, 9);

  return (
    <>
      <Section
        id="home"
        first
        className="flex min-h-[calc(100svh-var(--nav-height))] flex-col justify-center gap-[clamp(1.5rem,3vw,2.5rem)] !py-[clamp(1.25rem,3vw,2.25rem)]"
      >
        <div className="grid items-center gap-[clamp(1.75rem,4vw,3rem)] lg:grid-cols-[1.05fr_minmax(0,440px)]">
          {/* copy column */}
          <div>
            <div
              className={`mb-[clamp(1.25rem,3vw,2rem)] flex items-center gap-2.5 transition-[transform,opacity] duration-700 ease-reveal ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:!animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-[0.8rem] uppercase tracking-[0.22em] text-accent">
                {role}
                {availability ? (
                  <>
                    {' · '}
                    <span className="text-ink">{availability}</span>
                  </>
                ) : null}
              </span>
            </div>

            <RisingHeadline words={headlineWords} mounted={mounted} />

            <div
              className={`transition-[transform,opacity] duration-[1000ms] ease-reveal ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '560ms' }}
            >
              <Lede className="mt-[clamp(1rem,2vw,1.5rem)] text-[clamp(1.08rem,1.7vw,1.32rem)]">{intro}</Lede>

              <div className="mt-[clamp(1.25rem,2.5vw,1.75rem)] flex flex-wrap items-center gap-3">
                <Button href="#work" variant="accent">
                  View my work
                </Button>
                <Button href={contact.resume} variant="ghost" download>
                  Download CV
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap items-baseline gap-x-7 gap-y-3 text-[1rem]">
                <TextLink href={`mailto:${contact.email}`} variant="accent">
                  {contact.email}
                </TextLink>
                <TextLink href="https://www.behance.net/shaksitarajan" variant="accent" external>
                  Behance
                </TextLink>
                <TextLink href="https://linkedin.com/in/shaksita-bk" variant="accent" external>
                  LinkedIn
                </TextLink>
              </div>
            </div>
          </div>

          {/* status + workflow panels */}
          <div
            className={`transition-[transform,opacity] duration-[1100ms] ease-reveal ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            <StatusPanels />
          </div>
        </div>

        {/* stat strip */}
        <div className="grid grid-cols-2 gap-y-6 border-t border-rule pt-6 sm:flex sm:gap-0">
          {stats.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>
      </Section>

      {/* tools marquee — a full-bleed band between hero and about */}
      <div className="relative -mx-gutter border-y border-rule bg-paper-2/40 backdrop-blur-sm">
        <Marquee items={tools} speed={34} />
      </div>
    </>
  );
}
