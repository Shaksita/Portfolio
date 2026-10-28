import { stack } from '../../data/profile';

/**
 * A slowly rotating 3D cube with one tool per face.
 *
 * Six real CSS 3D faces, not an illusion: each is rotated into place and pushed
 * out by half the cube's width. The rotation pauses on hover so a face can be
 * read, and holds still entirely for reduced-motion visitors.
 *
 * Faces come from `stack.groups` → Tools, padded to six so the cube is never
 * missing a side.
 */

const SIZE = 150; // px — cube edge
const HALF = SIZE / 2;

const FACE_TRANSFORMS = [
  `rotateY(0deg) translateZ(${HALF}px)`,
  `rotateY(90deg) translateZ(${HALF}px)`,
  `rotateY(180deg) translateZ(${HALF}px)`,
  `rotateY(-90deg) translateZ(${HALF}px)`,
  `rotateX(90deg) translateZ(${HALF}px)`,
  `rotateX(-90deg) translateZ(${HALF}px)`,
];

export function ToolCube() {
  const tools = stack.groups.find((group) => group.title === 'Tools')?.items ?? [];
  const faces = Array.from({ length: 6 }, (_, i) => tools[i % tools.length] ?? '—');

  return (
    <div
      className="scene group flex items-center justify-center py-6"
      style={{ perspective: '900px' }}
    >
      <div
        className="preserve-3d relative animate-cube group-hover:[animation-play-state:paused] motion-reduce:!animate-none"
        style={{ width: SIZE, height: SIZE }}
      >
        {faces.map((tool, i) => (
          <div
            key={`${tool}-${i}`}
            className="backface-hidden absolute inset-0 flex items-center justify-center rounded-lg border border-accent/30 bg-paper/70 p-3 text-center shadow-[0_0_30px_-12px_rgb(var(--accent)/0.6)] backdrop-blur-sm"
            style={{ transform: FACE_TRANSFORMS[i] }}
          >
            <span className="font-display text-xl font-normal leading-tight text-ink">{tool}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
