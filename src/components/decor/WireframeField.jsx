/**
 * Background layer of design vocabulary and wireframe sketches.
 *
 * Scattered monospace terms and faint outline sketches — a phone frame, a
 * browser window, an image placeholder, an 8pt grid — drift slowly behind the
 * page, the way a designer's canvas looks when it is zoomed out. A handful of
 * terms carry the accent colour so the field is not a flat grey wash.
 *
 * Everything is positioned from a seeded pseudo-random function rather than
 * Math.random, so the layout is identical on every load and between renders —
 * a background that reshuffled itself on each visit would read as noise.
 *
 * Pure CSS transforms on a fixed layer: no canvas, no per-frame JavaScript.
 */

/** Deterministic 0–1 from an integer seed. */
const seeded = (seed) => {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

const FLOATS = ['animate-float-slow', 'animate-float-mid', 'animate-float-fast'];

/** Outline sketches, drawn as inline SVG so they stay crisp at any zoom. */
const SKETCHES = [
  {
    // phone frame with content blocks
    left: '6%', top: '14%', scale: 1, rotate: -8,
    svg: (
      <svg width="70" height="130" viewBox="0 0 70 130" fill="none">
        <rect x="1" y="1" width="68" height="128" rx="10" stroke="currentColor" />
        <rect x="9" y="14" width="52" height="30" rx="4" stroke="currentColor" />
        <rect x="9" y="52" width="38" height="4" rx="2" stroke="currentColor" />
        <rect x="9" y="62" width="26" height="4" rx="2" stroke="currentColor" />
        <rect x="9" y="78" width="52" height="16" rx="4" stroke="currentColor" />
        <rect x="9" y="102" width="52" height="14" rx="7" stroke="currentColor" />
      </svg>
    ),
  },
  {
    // browser window
    left: '82%', top: '9%', scale: 1, rotate: 6,
    svg: (
      <svg width="140" height="92" viewBox="0 0 140 92" fill="none">
        <rect x="1" y="1" width="138" height="90" rx="6" stroke="currentColor" />
        <path d="M1 18h138" stroke="currentColor" />
        <circle cx="10" cy="9.5" r="2.5" stroke="currentColor" />
        <circle cx="20" cy="9.5" r="2.5" stroke="currentColor" />
        <rect x="10" y="28" width="52" height="52" rx="4" stroke="currentColor" />
        <rect x="72" y="28" width="56" height="5" rx="2.5" stroke="currentColor" />
        <rect x="72" y="41" width="40" height="5" rx="2.5" stroke="currentColor" />
        <rect x="72" y="62" width="34" height="14" rx="7" stroke="currentColor" />
      </svg>
    ),
  },
  {
    // image placeholder with cross
    left: '72%', top: '62%', scale: 1, rotate: -5,
    svg: (
      <svg width="96" height="72" viewBox="0 0 96 72" fill="none">
        <rect x="1" y="1" width="94" height="70" rx="4" stroke="currentColor" />
        <path d="M1 1l94 70M95 1L1 71" stroke="currentColor" />
      </svg>
    ),
  },
  {
    // 8pt grid
    left: '14%', top: '72%', scale: 1, rotate: 4,
    svg: (
      <svg width="104" height="104" viewBox="0 0 104 104" fill="none">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={col * 26 + 1}
              y={row * 26 + 1}
              width="24"
              height="24"
              stroke="currentColor"
            />
          )),
        )}
      </svg>
    ),
  },
  {
    // avatar + text rows
    left: '45%', top: '84%', scale: 1, rotate: -3,
    svg: (
      <svg width="110" height="40" viewBox="0 0 110 40" fill="none">
        <circle cx="20" cy="20" r="18" stroke="currentColor" />
        <rect x="46" y="10" width="60" height="6" rx="3" stroke="currentColor" />
        <rect x="46" y="24" width="38" height="6" rx="3" stroke="currentColor" />
      </svg>
    ),
  },
  {
    // flow: three nodes and connectors
    left: '36%', top: '6%', scale: 1, rotate: 2,
    svg: (
      <svg width="160" height="34" viewBox="0 0 160 34" fill="none">
        <rect x="1" y="7" width="38" height="20" rx="4" stroke="currentColor" />
        <path d="M39 17h22M99 17h22" stroke="currentColor" />
        <rect x="61" y="1" width="38" height="32" rx="16" stroke="currentColor" />
        <rect x="121" y="7" width="38" height="20" rx="4" stroke="currentColor" />
      </svg>
    ),
  },
];

export function WireframeField() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* outline sketches */}
      {SKETCHES.map((sketch, i) => (
        <span
          key={`sketch-${i}`}
          className={`absolute text-ink ${FLOATS[(i + 1) % FLOATS.length]} motion-reduce:!animate-none`}
          style={{
            left: sketch.left,
            top: sketch.top,
            opacity: 0.1,
            animationDelay: `${(i * 1.3).toFixed(2)}s`,
          }}
        >
          <span
            className="block"
            style={{ transform: `rotate(${sketch.rotate}deg) scale(${sketch.scale})` }}
          >
            {sketch.svg}
          </span>
        </span>
      ))}
    </div>
  );
}
