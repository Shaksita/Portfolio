import { Eyebrow, Section, SectionHeading } from '../ui/Primitives';
import { RecordList } from '../ui/RecordList';
import { SubHeading } from '../ui/SubHeading';
import { Reveal } from '../ui/Reveal';
import { ToolCube } from '../decor/ToolCube';
import { useInView } from '../../hooks/useInView';
import { certifications, education, stack } from '../../data/profile';

/**
 * A skill group rendered as chips that stagger in when the group scrolls into
 * view. Chips carry more presence than a plain list and keep long skill names
 * readable on one line.
 *
 * @param {{title: string, items: string[]}} props
 */
function SkillGroup({ title, items }) {
  const [ref, inView] = useInView({ threshold: 0.25 });

  return (
    <div ref={ref}>
      <Eyebrow as="h3" className="mb-4 flex items-center gap-3 !text-accent">
        <span className="h-px w-6 bg-accent" />
        {title}
      </Eyebrow>
      <ul className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <li
            key={item}
            style={{ transitionDelay: `${i * 55}ms` }}
            className={`rounded-full border border-rule bg-paper/60 px-3.5 py-2 text-[0.92rem] text-ink backdrop-blur-sm transition-[transform,opacity,border-color,color] duration-500 ease-reveal hover:border-accent/60 hover:text-accent motion-reduce:!transform-none motion-reduce:!opacity-100 ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Stack() {
  return (
    <Section id="stack">
      <Reveal>
        <SectionHeading number="03">Skills &amp; Tools.</SectionHeading>

        <div className="grid items-start gap-[clamp(2rem,5vw,3.5rem)] lg:grid-cols-[1fr_210px]">
          <div className="grid gap-[clamp(1.75rem,4vw,2.5rem)]">
            {stack.groups.map((group) => (
              <SkillGroup key={group.title} {...group} />
            ))}
          </div>

          {/* rotating tool cube, pinned beside the chips on wide screens */}
          <div className="order-first lg:order-none lg:sticky lg:top-32">
            <ToolCube />
          </div>
        </div>

        <SubHeading number="04" title="Education" note="University of Madras" />
        <RecordList items={education} />

        <SubHeading number="05" title="Courses & certifications" note="Two" />
        <RecordList items={certifications} />
      </Reveal>
    </Section>
  );
}
