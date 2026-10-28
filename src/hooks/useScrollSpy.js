import { useEffect, useState } from 'react';

/**
 * Track which section is currently centred in the viewport.
 *
 * Used by the navbar to highlight the active link. The `-45%` root margin
 * narrows the observation band to a horizontal strip across the middle of the
 * screen, so the active link changes when a section genuinely takes over rather
 * than the moment its top edge appears.
 *
 * @param {string[]} ids              Section element ids, in page order.
 * @param {Object}   [options]
 * @param {string}   [options.clearOnId] Section that clears the highlight (the hero).
 * @returns {string|null} The active section id, or null when none is.
 */
export function useScrollSpy(ids, { clearOnId } = {}) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el) => el !== null);
    if (sections.length === 0) return;

    const spy = new IntersectionObserver(
      (entries) => {
        const winner = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (winner) setActiveId(winner.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((section) => spy.observe(section));

    // The hero owns no nav link, so clear the highlight when it returns.
    let heroObserver;
    const hero = clearOnId ? document.getElementById(clearOnId) : null;
    if (hero) {
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(null);
        },
        { threshold: 0.5 },
      );
      heroObserver.observe(hero);
    }

    return () => {
      spy.disconnect();
      heroObserver?.disconnect();
    };
  }, [ids, clearOnId]);

  return activeId;
}
