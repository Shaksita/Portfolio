import { GridField } from './GridField';
import { WireframeField } from './WireframeField';

/**
 * The page background: flat black ruled like graph paper, with faint
 * wireframe sketches drifting over the grid.
 *
 * Deliberately has no colour wash, vignette or grain — the ground is pure
 * #000 everywhere, and the only things on it are the grid, its squares and the sketches. The
 * ground itself is painted on <html> in index.css; <body> stays transparent so
 * this fixed layer is not covered by it.
 */
export function BackgroundLayer() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <GridField />
      <WireframeField />
    </div>
  );
}
