import { useEffect, useState } from 'react';

/**
 * Thin gradient bar across the top of the viewport showing read progress.
 *
 * Reads scroll position inside a requestAnimationFrame tick so a fast scroll
 * can't queue up more work than a frame can do.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-40 h-[2px] bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-accent via-accent-2 to-accent shadow-[0_0_12px_rgb(var(--accent)/0.7)]"
        style={{ transform: `scaleX(${progress})`, transition: 'transform 90ms linear' }}
      />
    </div>
  );
}
