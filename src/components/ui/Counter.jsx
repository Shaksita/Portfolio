import { useEffect, useRef, useState } from 'react';
import { useInView } from '../../hooks/useInView';

/**
 * Count up to a number the first time it scrolls into view.
 *
 * @param {number} value             Final value.
 * @param {number} [duration=1300]   Milliseconds for the run.
 * @param {string} [suffix='']       Appended once the count finishes (e.g. '+').
 */
export function Counter({ value, duration = 1300, suffix = '', className }) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }

    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic — fast out of the gate, settles on the number
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
