import { Display, Eyebrow, Section, SectionHeading } from '../ui/Primitives';
import { Reveal } from '../ui/Reveal';
import { useInView } from '../../hooks/useInView';
import { experience } from '../../data/profile';

/**
 * One role on a vertical timeline.
 *
 * The rail line draws itself downward when the item enters view — a scaleY
 * transform from the top, which costs nothing and makes the section feel
 * authored rather than static. Each shipped project is a node on the rail.
 */
function TimelineRole({ period, role, company, highlights }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <article ref={ref} className="relative grid gap-y-5 pl-8 sm:pl-12 md:grid-cols-[180px_1fr] md:gap-x-10 md:pl-0">
      {/* rail */}
      <span
        aria-hidden="true"
        className="absolute left-[5px] top-2 h-full w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-transparent transition-transform duration-[1400ms] ease-reveal md:left-[186px]"
        style={{ transform: `scaleY(${inView ? 1 : 0})` }}
      />
      {/* node */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-paper md:left-[181px]"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-accent/50 motion-reduce:!animate-none" />
      </span>

      <Eyebrow className="tracking-[0.14em] md:pt-[5px] md:text-right">{period}</Eyebrow>

      <div className="md:pl-10">
        <Display as="h3" size="sm" className="font-normal">
          {role}
        </Display>
        <span className="mt-2 block font-body text-sm uppercase tracking-[0.14em] text-accent">
          {company}
        </span>

        <ul className="mt-5 grid gap-3">
          {highlights.map(({ title, detail }, i) => (
            <li
              key={title}
              className="glass-card p-4 transition-[transform,border-color,box-shadow] duration-500 ease-reveal hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_18px_40px_-28px_rgb(var(--accent)/0.6)]"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="block text-base font-medium text-ink">{title}</span>
              <span className="mt-1.5 block text-[0.95rem] leading-relaxed text-ink-2">
                {detail}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function Experience() {
  return (
    <Section id="experience">
      <Reveal>
        <SectionHeading number="02">
          Where I&rsquo;ve worked,
          <br />
          and what I shipped there.
        </SectionHeading>

        <div className="grid gap-12">
          {experience.map((role) => (
            <TimelineRole key={`${role.company}-${role.period}`} {...role} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
