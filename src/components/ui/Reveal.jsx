import { cn } from '../../lib/cn';
import { useInView } from '../../hooks/useInView';

/**
 * Fade-and-lift a block the first time it scrolls into view.
 *
 * Wraps any children; respects `prefers-reduced-motion` through useInView, which
 * reports visible immediately in that case.
 *
 * @param {number} [delay=0] Milliseconds to stagger the reveal by.
 */
export function Reveal({ delay = 0, className, children }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        'transition-[opacity,transform] duration-[900ms] ease-reveal motion-reduce:transition-none',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-3.5 opacity-0',
        className,
      )}
    >
      {children}
    </div>
  );
}
