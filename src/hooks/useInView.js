import { useEffect, useRef, useState } from 'react';

/**
 * Observe an element once and report when it first enters the viewport.
 *
 * Returns `inView: true` immediately when the visitor prefers reduced motion or
 * IntersectionObserver is unavailable, so content is never hidden by a
 * progressive enhancement.
 *
 * @param {Object}  [options]
 * @param {number}  [options.threshold=0.08]   Fraction visible before firing.
 * @param {string}  [options.rootMargin='0px 0px -12% 0px']
 * @param {boolean} [options.once=true]        Stop observing after the first hit.
 * @returns {[React.RefObject<HTMLElement>, boolean]} `[ref, inView]`
 */
export function useInView({
  threshold = 0.08,
  rootMargin = '0px 0px -12% 0px',
  once = true,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
