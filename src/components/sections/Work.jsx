import { Display, Eyebrow, Section, SectionHeading } from '../ui/Primitives';
import { Reveal } from '../ui/Reveal';
import { usePointerTilt } from '../../hooks/usePointerTilt';
import { behanceProfile, projects } from '../../data/profile';

/**
 * Project card: cover, index, title and discipline.
 *
 * The whole card is a link straight to the case study on Behance — one click,
 * no intermediate dialog. It opens in a new tab so the portfolio stays behind
 * it.
 *
 * The card tilts toward the pointer in its own 3D scene, so the grid responds
 * to the mouse rather than just changing colour. Covers are shown whole —
 * `object-contain` inside the cover's own aspect ratio — so no part of a case
 * study's artwork is cropped away.
 */
function ProjectCard({ index, title, discipline, summary, cover, href }) {
  const { ref, style } = usePointerTilt({ max: 7, scale: 1.015 });

  return (
    <article className="scene h-full" style={{ perspective: '1000px' }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        ref={ref}
        style={style}
        className="glass-card group preserve-3d relative flex h-full w-full flex-col overflow-hidden text-left transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgb(var(--accent)/0.65)]"
      >
        <span className="relative block overflow-hidden">
          <img
            src={cover}
            alt={`${title} cover`}
            loading="lazy"
            width={808}
            height={632}
            className="aspect-[808/632] w-full object-contain saturate-[0.92] transition-[transform,filter] duration-700 ease-reveal group-hover:scale-[1.03] group-hover:saturate-100 motion-reduce:!transform-none"
          />

          {/* index chip */}
          <span className="absolute left-3 top-3 rounded-full border border-ink/20 bg-paper/70 px-2.5 py-1 font-display text-sm tabular-nums text-ink backdrop-blur-sm">
            {String(index).padStart(2, '0')}
          </span>

          {/* hover overlay */}
          <span className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-paper via-paper/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="w-full translate-y-3 p-4 transition-transform duration-500 ease-reveal group-hover:translate-y-0">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-ink">
                View case study
                <span aria-hidden="true">&#8599;</span>
              </span>
            </span>
          </span>

          {/* sheen */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-ink/15 to-transparent group-hover:animate-sheen motion-reduce:!animate-none"
          />
        </span>

        <span className="flex flex-1 flex-col p-4 sm:p-5">
          <Display
            as="h3"
            size="md"
            className="font-normal transition-colors duration-300 group-hover:text-accent"
          >
            {title}
          </Display>
          <Eyebrow className="mt-2.5 block">{discipline}</Eyebrow>
          {summary ? (
            <span className="mt-3 block max-w-[52ch] text-[0.95rem] text-ink-2">{summary}</span>
          ) : null}
        </span>
      </a>
    </article>
  );
}

/** Closing tile that sends people to the full Behance profile. */
function BehanceTile() {
  return (
    <article className="sm:col-span-2 lg:col-span-3">
      <a
        href={behanceProfile}
        target="_blank"
        rel="noopener noreferrer"
        className="glass-card group flex h-full min-h-[200px] flex-col justify-between overflow-hidden border-accent/40 p-5 transition-shadow duration-500 hover:shadow-[0_40px_80px_-44px_rgb(var(--accent)/0.7)] sm:p-7"
      >
        <Eyebrow>Archive</Eyebrow>
        <div>
          <Display as="p" size="md" className="font-normal">
            Every case study,
            <br />
            in full, on Behance.
          </Display>
          <span className="mt-4 inline-flex items-center gap-2 text-[0.8rem] uppercase tracking-[0.14em] text-accent">
            behance.net/shaksitarajan
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </span>
        </div>
      </a>
    </article>
  );
}

export function Work() {
  return (
    <Section id="work">
      <Reveal>
        <SectionHeading number="06">
          Six case studies
          <br />
          and interface projects.
        </SectionHeading>

        <div className="grid gap-[clamp(1rem,2vw,1.5rem)] sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} index={i + 1} {...project} />
          ))}
          <BehanceTile />
        </div>
      </Reveal>
    </Section>
  );
}
