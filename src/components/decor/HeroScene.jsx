import { usePointerTilt } from '../../hooks/usePointerTilt';

/**
 * The hero's 3D scene: a phone screen with two design panels floating in front
 * of and behind it, tilting together toward the pointer.
 *
 * Every panel shows a real UI/UX artefact — a mobile layout, a colour palette,
 * a component with a toggle and slider — so the decoration says what the work is
 * rather than being abstract shapes.
 *
 * Structure note: each layer is a wrapper holding the static `translateZ` and an
 * inner element carrying the float animation, because an animation on
 * `transform` would otherwise replace the layer's depth.
 */

/** Small label used on the floating panels. */
function PanelLabel({ children }) {
  return (
    <span className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ink-3">
      {children}
    </span>
  );
}

function PhoneMock() {
  return (
    <div className="w-[228px] rounded-[26px] border border-rule bg-paper p-3 shadow-[0_40px_80px_-40px_rgb(var(--ink)/0.5)]">
      {/* status row */}
      <div className="mb-3 flex items-center justify-between px-1.5">
        <span className="h-1 w-6 rounded-full bg-ink-3/50" />
        <span className="h-3 w-3 rounded-full border border-rule" />
      </div>

      {/* hero image block */}
      <div className="mb-3 h-[92px] rounded-xl bg-gradient-to-br from-accent/80 via-accent/40 to-accent-2/70" />

      {/* text rows */}
      <div className="mb-1.5 h-2 w-3/4 rounded-full bg-ink/15" />
      <div className="mb-3 h-2 w-1/2 rounded-full bg-ink/10" />

      {/* list rows */}
      <div className="space-y-2">
        {[0, 1].map((row) => (
          <div key={row} className="flex items-center gap-2 rounded-lg bg-paper-2/80 p-2">
            <span className="h-6 w-6 rounded-md bg-accent-2/30" />
            <span className="flex-1">
              <span className="mb-1 block h-1.5 w-2/3 rounded-full bg-ink/15" />
              <span className="block h-1.5 w-1/3 rounded-full bg-ink/10" />
            </span>
          </div>
        ))}
      </div>

      {/* primary action */}
      <div className="mt-3 flex items-center justify-center rounded-full bg-ink py-2">
        <span className="text-[0.6rem] uppercase tracking-[0.14em] text-paper">Continue</span>
      </div>
    </div>
  );
}

function PalettePanel() {
  const swatches = [
    'bg-accent',
    'bg-accent-2',
    'bg-accent/50',
    'bg-ink/70',
  ];
  return (
    <div className="glass-card w-[150px] p-3.5">
      <PanelLabel>Palette</PanelLabel>
      <div className="mt-2.5 flex gap-1.5">
        {swatches.map((swatch) => (
          <span key={swatch} className={`h-7 w-7 rounded-lg ${swatch}`} />
        ))}
      </div>
      <div className="mt-3 space-y-1.5">
        <span className="block h-1.5 w-full rounded-full bg-ink/10" />
        <span className="block h-1.5 w-2/3 rounded-full bg-ink/10" />
      </div>
    </div>
  );
}

function ComponentPanel() {
  return (
    <div className="glass-card w-[168px] p-3.5">
      <PanelLabel>Components</PanelLabel>

      {/* toggle */}
      <div className="mt-2.5 flex items-center justify-between">
        <span className="h-1.5 w-14 rounded-full bg-ink/15" />
        <span className="flex h-4 w-8 items-center rounded-full bg-accent p-0.5">
          <span className="ml-auto h-3 w-3 rounded-full bg-paper" />
        </span>
      </div>

      {/* slider */}
      <div className="relative mt-4 h-1 rounded-full bg-ink/12">
        <span className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-accent-2" />
        <span className="absolute -top-1 left-2/3 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent-2 bg-paper" />
      </div>

      {/* chips */}
      <div className="mt-4 flex gap-1.5">
        {['Auto', 'Grid', '8pt'].map((chip) => (
          <span
            key={chip}
            className="rounded-md border border-rule px-1.5 py-0.5 text-[0.55rem] uppercase tracking-[0.1em] text-ink-2"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroScene() {
  const { ref, style } = usePointerTilt({ max: 9 });

  return (
    <div className="scene relative mx-auto h-[290px] w-full max-w-[400px] origin-center scale-[0.9] sm:h-[320px] sm:scale-100">
      <div ref={ref} style={style} className="preserve-3d relative h-full w-full">
        {/* soft halo behind the whole scene */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-breathe rounded-full bg-accent/25 blur-3xl motion-reduce:!animate-none"
        />

        {/* phone, centre plane */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{ transform: 'translate(-50%, -50%) translateZ(0px)' }}
        >
          <div className="animate-float-slow motion-reduce:!animate-none">
            <PhoneMock />
          </div>
        </div>

        {/* palette panel, behind and left */}
        <div
          className="absolute left-0 top-10"
          style={{ transform: 'translateZ(-70px) rotateY(16deg)' }}
        >
          <div className="animate-float-mid motion-reduce:!animate-none">
            <PalettePanel />
          </div>
        </div>

        {/* component panel, in front and right */}
        <div
          className="absolute -right-2 bottom-8"
          style={{ transform: 'translateZ(80px) rotateY(-14deg)' }}
        >
          <div className="animate-float-fast motion-reduce:!animate-none">
            <ComponentPanel />
          </div>
        </div>

        {/* designer's cursor */}
        <div
          aria-hidden="true"
          className="absolute right-12 top-4"
          style={{ transform: 'translateZ(130px)' }}
        >
          <div className="animate-float-mid motion-reduce:!animate-none">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path
                d="M4 3l16 7.5-7 1.8-1.8 7L4 3z"
                className="fill-ink"
                stroke="rgb(var(--paper))"
                strokeWidth="1.4"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
