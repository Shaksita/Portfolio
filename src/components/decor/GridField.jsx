/**
 * Graph-paper background: a single fine mesh with scattered squares sitting on
 * its intersections.
 *
 * One grid scale only — a second, heavier grid over the top read as oversized
 * and fought the content.
 *
 * Squares, not dots: on a ruled grid a square reads as a placed element, a
 * circle reads as a stray mark. A third of them carry the accent colour and a
 * soft glow so the field has a pulse to it.
 *
 * Positions come from a seeded function rather than Math.random, so the
 * scattering is identical on every load instead of reshuffling per visit, and
 * every square is snapped to the mesh so nothing floats off-grid.
 */

/** Deterministic 0–1 from an integer seed. */
const seeded = (seed) => {
  const x = Math.sin(seed * 91.7) * 43758.5453;
  return x - Math.floor(x);
};

const CELL = 20;        // mesh, px — matches the reference spacing
const SQUARE_COUNT = 54;
const PULSES = ['animate-breathe', 'animate-float-slow', 'animate-float-mid'];

export function GridField() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* mesh */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(var(--ink) / 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--ink) / 0.035) 1px, transparent 1px)',
          backgroundSize: `${CELL}px ${CELL}px`,
        }}
      />

      {/* accent rules, one vertical and one horizontal, as a layout guide would be */}
      <div
        className="absolute inset-y-0 left-[18%] w-px bg-accent/[0.07]"
        style={{ boxShadow: '0 0 24px rgb(var(--accent) / 0.07)' }}
      />
      <div
        className="absolute inset-x-0 top-[62%] h-px bg-accent/[0.05]"
        style={{ boxShadow: '0 0 24px rgb(var(--accent) / 0.05)' }}
      />

      {/* squares snapped to the mesh */}
      {Array.from({ length: SQUARE_COUNT }, (_, i) => {
        // Snap to the grid: pick a cell, then convert back to a percentage.
        const left = Math.round((seeded(i + 3) * 100) / 2) * 2;
        const top = Math.round((seeded(i + 57) * 100) / 2) * 2;
        const size = CELL / (seeded(i + 113) > 0.6 ? 2 : 4); // 10px or 5px
        const isAccent = seeded(i + 211) > 0.62;
        const pulse = PULSES[i % PULSES.length];
        const delay = (seeded(i + 17) * 5).toFixed(2);

        return (
          <span
            key={`sq-${i}`}
            className={`absolute ${pulse} motion-reduce:!animate-none ${
              isAccent ? 'bg-accent' : 'bg-ink'
            }`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: isAccent ? 0.24 : 0.08,
              boxShadow: isAccent ? '0 0 8px rgb(var(--accent) / 0.32)' : 'none',
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
