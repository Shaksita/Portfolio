import { useEffect, useState } from 'react';

/**
 * A design-tool window that builds a screen by itself, on loop.
 *
 * The UI/UX counterpart to a terminal demo: layers appear in the left rail, the
 * artboard assembles block by block, the inspector on the right updates to match
 * the selected layer, and a named cursor moves to whatever is being placed.
 *
 * Driven by one `step` counter rather than per-element timers, so every part of
 * the window stays in sync and there is a single thing to reason about. After
 * the last step it holds, then resets.
 *
 * Reduced-motion visitors see the finished screen with no cursor and no loop.
 */

/**
 * Each step places one layer. `token` names the palette variable the layer is
 * filled with, so the inspector always shows the site's live colours — hard-
 * coded hexes would drift the moment the palette changes.
 */
const STEPS = [
  { layer: 'Header', cursor: { x: 46, y: 16 }, token: '--accent', size: '320 × 64' },
  { layer: 'Hero image', cursor: { x: 52, y: 34 }, token: '--accent-2', size: '320 × 180' },
  { layer: 'Title', cursor: { x: 34, y: 52 }, token: '--ink', size: '240 × 28' },
  { layer: 'List', cursor: { x: 50, y: 68 }, token: '--ink-2', size: '320 × 96' },
  { layer: 'CTA button', cursor: { x: 50, y: 86 }, token: '--accent', size: '280 × 48' },
];

/** `--accent` → `#FA2B55`, read from the live stylesheet. */
function tokenToHex(name) {
  if (typeof window === 'undefined') return '#000000';
  const channels = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
    .split(/\s+/)
    .map(Number);
  if (channels.length < 3 || channels.some(Number.isNaN)) return '#000000';
  return (
    '#' +
    channels
      .slice(0, 3)
      .map((c) => Math.max(0, Math.min(255, c)).toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

const TOTAL = STEPS.length;

export function DesignCanvas() {
  const [step, setStep] = useState(-1);
  const [reduced, setReduced] = useState(false);
  const [hexes, setHexes] = useState(() => STEPS.map(() => '#000000'));

  useEffect(() => {
    const read = () => setHexes(STEPS.map((s) => tokenToHex(s.token)));
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (query.matches) {
      setReduced(true);
      setStep(TOTAL - 1);
      return;
    }

    // One interval drives everything. The extra two ticks past the last step are
    // the pause where the finished screen sits before the loop restarts.
    const id = setInterval(() => {
      setStep((current) => (current >= TOTAL + 1 ? -1 : current + 1));
    }, 900);
    return () => clearInterval(id);
  }, []);

  const placed = Math.min(step, TOTAL - 1);
  const activeIndex = step >= 0 && step < TOTAL ? step : TOTAL - 1;
  const active = STEPS[activeIndex];
  const activeHex = hexes[activeIndex];
  const isVisible = (index) => index <= placed;

  /** Shared transition for every block that drops onto the artboard. */
  const blockClass = (index, extra = '') =>
    `transition-[opacity,transform] duration-500 ease-reveal ${
      isVisible(index) ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
    } ${extra}`;

  return (
    <div className="glass-card overflow-hidden">
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-rule px-4 py-3">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-3/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-3/40" />
        </span>
        <span className="truncate text-[0.72rem] tracking-wide text-ink-3">
          shaksita — mobile-app.fig
        </span>
        <span className="ml-auto rounded border border-rule px-1.5 py-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-ink-3">
          Auto layout
        </span>
      </div>

      <div className="grid grid-cols-[84px_1fr_92px] text-[0.62rem] sm:grid-cols-[104px_1fr_108px]">
        {/* layers rail */}
        <div className="border-r border-rule p-3">
          <span className="mb-2.5 block uppercase tracking-[0.16em] text-ink-3">Layers</span>
          <ul className="space-y-1.5">
            {STEPS.map((item, i) => (
              <li
                key={item.layer}
                className={`flex items-center gap-1.5 truncate rounded px-1.5 py-1 transition-[opacity,background-color,color] duration-400 ${
                  isVisible(i) ? 'opacity-100' : 'opacity-25'
                } ${step === i ? 'bg-accent/15 text-accent' : 'text-ink-2'}`}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-sm ${
                    step === i ? 'bg-accent' : 'bg-ink-3/60'
                  }`}
                />
                <span className="truncate">{item.layer}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* artboard */}
        <div className="relative bg-paper/40 p-4">
          {/* dotted artboard grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(rgb(var(--ink-3)) 0.5px, transparent 0.5px)',
              backgroundSize: '12px 12px',
            }}
          />

          <div className="relative mx-auto w-[150px] rounded-xl border border-rule bg-paper-2 p-2 shadow-[0_18px_40px_-26px_rgb(0_0_0/0.9)]">
            {/* 0 — header */}
            <div className={blockClass(0, 'mb-2 flex items-center justify-between px-1')}>
              <span className="h-1 w-6 rounded-full bg-ink-3/60" />
              <span className="h-2.5 w-2.5 rounded-full border border-rule" />
            </div>

            {/* 1 — hero image */}
            <div
              className={blockClass(
                1,
                'mb-2 h-12 rounded-lg bg-gradient-to-br from-accent/80 via-accent/40 to-accent-2/70',
              )}
            />

            {/* 2 — title */}
            <div className={blockClass(2, 'mb-2 space-y-1')}>
              <span className="block h-1.5 w-3/4 rounded-full bg-ink/30" />
              <span className="block h-1.5 w-1/2 rounded-full bg-ink/20" />
            </div>

            {/* 3 — list */}
            <div className={blockClass(3, 'mb-2 space-y-1.5')}>
              {[0, 1].map((row) => (
                <span key={row} className="flex items-center gap-1.5 rounded-md bg-paper/70 p-1.5">
                  <span className="h-4 w-4 rounded bg-accent-2/40" />
                  <span className="flex-1 space-y-1">
                    <span className="block h-1 w-2/3 rounded-full bg-ink/25" />
                    <span className="block h-1 w-1/3 rounded-full bg-ink/15" />
                  </span>
                </span>
              ))}
            </div>

            {/* 4 — CTA, with the selection frame once it lands */}
            <div className={blockClass(4, 'relative')}>
              <span className="flex items-center justify-center rounded-full bg-accent py-1.5">
                <span className="text-[0.5rem] uppercase tracking-[0.14em] text-paper">
                  Continue
                </span>
              </span>
              {placed >= 4 ? (
                <span className="pointer-events-none absolute -inset-1 rounded-lg border border-accent/70">
                  <span className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="absolute -right-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="absolute -bottom-[3px] -left-[3px] h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="absolute -bottom-[3px] -right-[3px] h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
              ) : null}
            </div>
          </div>

          {/* designer cursor with name tag */}
          {!reduced ? (
            <div
              className="pointer-events-none absolute z-10 transition-[left,top] duration-700 ease-reveal"
              style={{ left: `${active.cursor.x}%`, top: `${active.cursor.y}%` }}
            >
              <svg width="16" height="16" viewBox="0 0 26 26" fill="none">
                <path
                  d="M4 3l16 7.5-7 1.8-1.8 7L4 3z"
                  fill="rgb(var(--ink))"
                  stroke="rgb(var(--paper))"
                  strokeWidth="1.6"
                />
              </svg>
              <span className="ml-3 inline-block whitespace-nowrap rounded bg-accent px-1.5 py-0.5 text-[0.55rem] font-medium text-paper">
                Shaksita
              </span>
            </div>
          ) : null}
        </div>

        {/* inspector */}
        <div className="border-l border-rule p-3">
          <span className="mb-2.5 block uppercase tracking-[0.16em] text-ink-3">Design</span>

          <span className="mb-1 block text-ink-3">Fill</span>
          <span className="mb-3 flex items-center gap-1.5">
            <span
              className="h-3.5 w-3.5 rounded border border-rule transition-colors duration-500"
              style={{ backgroundColor: activeHex }}
            />
            <span className="truncate text-ink-2">{activeHex}</span>
          </span>

          <span className="mb-1 block text-ink-3">Size</span>
          <span className="mb-3 block tabular-nums text-ink-2">{active.size}</span>

          <span className="mb-1 block text-ink-3">Radius</span>
          <span className="mb-3 block tabular-nums text-ink-2">12</span>

          <span className="block border-t border-rule pt-2.5 text-ink-3">
            {placed >= TOTAL - 1 ? 'Ready for hand-off' : 'Designing…'}
          </span>
        </div>
      </div>
    </div>
  );
}
