import { useEffect, useRef } from 'react';
import { cn } from '../../lib/cn';

/**
 * Infinite marquee whose speed is driven by the page scroll.
 *
 * It always drifts at `baseSpeed`, and the reader's scrolling is added on top:
 * scroll down and the band accelerates away, scroll up and it slows, stops, or
 * runs backwards. Stop scrolling and it eases back to its resting drift.
 *
 * Smoothness comes from three decisions:
 *   1. Scroll position is sampled inside the animation frame rather than from a
 *      scroll event, so there is exactly one reading per painted frame and no
 *      event backlog on fast flicks.
 *   2. The measured velocity is eased toward (`SMOOTHING`) instead of applied
 *      raw, which turns the browser's chunky scroll deltas into a continuous
 *      curve.
 *   3. Position is written straight to `style.transform` as a `translate3d`,
 *      never through React state — no re-render per frame, and the band stays
 *      on the compositor.
 *
 * The track holds two identical copies of the content and the offset wraps at
 * one copy's width, so the loop has no seam.
 *
 * @param {string[]} items
 * @param {number}   [baseSpeed=34]     Resting drift, pixels per second.
 * @param {number}   [scrollFactor=0.45] How much scroll velocity contributes.
 * @param {boolean}  [reverse=false]    Run right-to-left instead.
 */
export function Marquee({
  items,
  baseSpeed = 34,
  scrollFactor = 0.45,
  reverse = false,
  className,
}) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) return;

    const SMOOTHING = 0.12;      // velocity easing per frame
    const MAX_SCROLL_V = 4000;   // px/s ceiling, so a flick can't fling the band
    const direction = reverse ? -1 : 1;

    let half = track.scrollWidth / 2 || 1;
    let offset = 0;
    let velocity = 0;
    let lastTime = performance.now();
    let lastScrollY = window.scrollY;
    let frame;

    const measure = () => {
      half = track.scrollWidth / 2 || 1;
    };

    const loop = (now) => {
      // Cap dt so a backgrounded tab doesn't jump the band on return.
      const dt = Math.min(64, now - lastTime) / 1000;
      lastTime = now;

      const scrollY = window.scrollY;
      const rawVelocity = Math.max(
        -MAX_SCROLL_V,
        Math.min(MAX_SCROLL_V, (scrollY - lastScrollY) / Math.max(dt, 0.001)),
      );
      lastScrollY = scrollY;

      velocity += (rawVelocity - velocity) * SMOOTHING;

      offset += (baseSpeed + velocity * scrollFactor) * direction * dt;
      offset = ((offset % half) + half) % half; // stays positive, wraps seamlessly

      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);

    // Width changes once webfonts swap in, and on resize.
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [baseSpeed, scrollFactor, reverse, items]);

  const Row = ({ ariaHidden }) => (
    <ul className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={ariaHidden || undefined}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center gap-12 whitespace-nowrap">
          <span className="font-display text-[clamp(1.75rem,4vw,3.25rem)] font-light leading-none text-ink-2 transition-colors duration-300 hover:text-ink">
            {item}
          </span>
          <span className="h-2 w-2 shrink-0 rotate-45 bg-accent/80 shadow-[0_0_14px_rgb(var(--accent)/0.8)]" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn('relative overflow-hidden py-5', className)}
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{ backfaceVisibility: 'hidden' }}
      >
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
}
