import { Display, Eyebrow, Prose, Section, SectionHeading } from '../ui/Primitives';
import { DetailList } from '../ui/DetailList';
import { Reveal } from '../ui/Reveal';
import { DesignCanvas } from '../decor/DesignCanvas';
import { profile } from '../../data/profile';

/**
 * Circular avatar with a gradient ring, name and role beside it.
 *
 * The ring is a gradient-filled wrapper with padding, with the round photo laid
 * on top — one element, no pseudo-element tricks, and it scales with the avatar
 * size. A soft accent halo sits behind it so a light portrait doesn't float
 * against the dark ground.
 */
function Identity({ name, role, portrait }) {
  return (
    <div className="flex items-center gap-5">
      <div className="relative shrink-0">
        {/* soft halo */}
        <span
          aria-hidden="true"
          className="absolute -inset-2 animate-breathe rounded-full bg-accent/30 blur-xl motion-reduce:!animate-none"
        />

        {/* The ring is a conic gradient on its own layer, spinning behind the
            photo — the photo itself never rotates, so the face stays upright
            while the light travels around it. */}
        <span
          aria-hidden="true"
          className="absolute -inset-[3px] animate-[spin_6s_linear_infinite] rounded-full motion-reduce:!animate-none"
          style={{
            backgroundImage:
              'conic-gradient(from 0deg, rgb(var(--accent)) 0deg, rgb(var(--accent-2)) 110deg, rgb(var(--accent) / 0.08) 210deg, rgb(var(--accent)) 360deg)',
          }}
        />

        <span className="relative block rounded-full p-[3px]">
          {portrait.src ? (
            <img
              src={portrait.src}
              alt={portrait.alt}
              width={1254}
              height={1254}
              className="relative block h-20 w-20 rounded-full border-2 border-paper object-cover sm:h-24 sm:w-24"
            />
          ) : (
            <span className="relative block h-20 w-20 rounded-full border-2 border-paper bg-paper-2 sm:h-24 sm:w-24" />
          )}
        </span>
      </div>

      <div>
        <Display as="p" size="sm" className="font-normal leading-none">
          {name}
        </Display>
        <Eyebrow className="mt-2.5 block !text-accent">{role}</Eyebrow>
      </div>
    </div>
  );
}

export function About() {
  const { name, role, summary, facts, portrait } = profile;

  return (
    <Section id="about">
      <Reveal>
        <SectionHeading number="01">Profile.</SectionHeading>

        <div className="grid items-start gap-[clamp(2.25rem,5vw,4rem)] lg:grid-cols-[1fr_1.05fr]">
          {/* identity + copy */}
          <div className="grid gap-[clamp(1.5rem,3vw,2.25rem)]">
            <Identity name={name} role={role} portrait={portrait} />
            <Prose className="text-[1.05rem] leading-relaxed">{summary}</Prose>
            <DetailList items={facts} className="max-w-prose" />
          </div>

          {/* animated design-tool window */}
          <div className="lg:sticky lg:top-28">
            <DesignCanvas />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
