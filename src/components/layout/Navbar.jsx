import { cn } from '../../lib/cn';
import { navLinks, profile } from '../../data/profile';
import { useScrollSpy } from '../../hooks/useScrollSpy';

const SECTION_IDS = navLinks.map((link) => link.id);

/**
 * Sticky navbar. Every link is an in-page anchor, and the link for the section
 * currently on screen is underlined in the accent colour.
 *
 * No hamburger: below 640px the links wrap onto a second row and spread out, so
 * every section stays one tap away instead of hiding behind a menu button.
 */
export function Navbar() {
  const activeId = useScrollSpy(SECTION_IDS, { clearOnId: 'home' });

  return (
    <nav className="sticky top-0 z-20 border-b border-rule bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-5 gap-y-3 px-gutter py-3 sm:py-3.5">
        {/* avatar + name, back to the top */}
        <a href="#home" className="group flex items-center gap-3">
          {profile.portrait.src ? (
            <span className="block shrink-0 rounded-full bg-gradient-to-br from-accent via-accent-2 to-accent p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <img
                src={profile.portrait.src}
                alt=""
                width={1254}
                height={1254}
                className="block h-9 w-9 rounded-full border border-paper object-cover"
              />
            </span>
          ) : null}
          <span className="whitespace-nowrap font-display text-[1.3rem] font-medium leading-none transition-colors duration-300 group-hover:text-accent">
            {profile.name}
          </span>
        </a>

        <ul className="flex basis-full items-center justify-between gap-2.5 text-[0.84rem] text-ink sm:basis-auto sm:justify-start sm:gap-[clamp(0.875rem,2.4vw,1.875rem)] sm:text-[0.94rem]">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={activeId === id ? 'true' : undefined}
                className="group relative inline-block pb-[5px] text-ink"
              >
                {label}
                {/* Underline sweeps in from the left on hover, and stays put
                    for the section currently on screen. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute bottom-0 left-0 h-[2px] bg-accent transition-[width] duration-300 ease-reveal',
                    activeId === id ? 'w-full' : 'w-0 group-hover:w-full',
                  )}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
