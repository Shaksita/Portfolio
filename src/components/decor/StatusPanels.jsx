import { useEffect, useState } from 'react';
import { HeroScene } from './HeroScene';
import { stack } from '../../data/profile';

/**
 * The hero's right-hand column: the 3D design scene above a workflow log that
 * prints itself out.
 *
 * The scene carries its own pointer tilt, so it is deliberately not wrapped in
 * another 3D context here — nesting two tilts would compound the rotation and
 * read as a wobble.
 *
 * Every log line is a real entry from the skills list in data/profile.js, not
 * invented status text.
 */

/**
 * Workflow log. Lines appear one at a time on a loop with a caret on the most
 * recent — the designer's version of a server log.
 */
function WorkflowLog() {
  // Four lines keep the hero inside one screen; the full list lives in Stack.
  const lines = (stack.groups.find((group) => group.title === 'Design skills')?.items ?? []).slice(0, 4);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(lines.length);
      return;
    }
    // One extra tick past the last line is the pause before the loop restarts.
    const id = setInterval(() => {
      setShown((current) => (current >= lines.length + 1 ? 0 : current + 1));
    }, 850);
    return () => clearInterval(id);
  }, [lines.length]);

  return (
    <div className="glass-card p-5">
      <span className="flex items-center gap-2 text-[0.74rem] uppercase tracking-[0.2em] text-accent">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent motion-reduce:!animate-none" />
        Design workflow
      </span>

      <ul className="mt-3.5 space-y-2 font-mono text-[0.8rem] leading-relaxed">
        {lines.map((line, i) => (
          <li
            key={line}
            className={`flex gap-2 transition-[opacity,transform] duration-500 ease-reveal ${
              i < shown ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'
            }`}
          >
            <span className="shrink-0 text-accent">$</span>
            <span className="text-ink-2">
              {line.toLowerCase()}
              {i === shown - 1 ? (
                <span className="ml-1 inline-block h-[0.85em] w-[0.45em] translate-y-[0.1em] animate-pulse bg-accent align-middle motion-reduce:!animate-none" />
              ) : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StatusPanels() {
  return (
    <div className="grid gap-4">
      <HeroScene />
      <WorkflowLog />
    </div>
  );
}
