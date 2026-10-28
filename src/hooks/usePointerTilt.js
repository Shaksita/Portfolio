import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Tilt an element in 3D toward the pointer.
 *
 * Returns a ref to attach to the tilting element and a style object carrying the
 * rotation. Pointer position is normalised to -1…1 across the element, so the
 * effect is identical whatever the element's size.
 *
 * Disabled entirely for reduced-motion visitors and for coarse pointers (touch),
 * where there is no hover to respond to.
 *
 * @param {Object} [options]
 * @param {number} [options.max=10]   Maximum rotation in degrees.
 * @param {number} [options.scale=1]  Scale applied while hovering.
 * @returns {{ref: React.RefObject<HTMLElement>, style: React.CSSProperties, isTilting: boolean}}
 */
export function usePointerTilt({ max = 10, scale = 1 } = {}) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isTilting, setIsTilting] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    setEnabled(!reduced && finePointer);
  }, []);

  const handlePointerMove = useCallback(
    (event) => {
      const node = ref.current;
      if (!node || !enabled) return;
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: -py * 2 * max, y: px * 2 * max });
      setIsTilting(true);
    },
    [enabled, max],
  );

  const handlePointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsTilting(false);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;
    node.addEventListener('pointermove', handlePointerMove);
    node.addEventListener('pointerleave', handlePointerLeave);
    return () => {
      node.removeEventListener('pointermove', handlePointerMove);
      node.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [enabled, handlePointerMove, handlePointerLeave]);

  return {
    ref,
    isTilting,
    style: {
      transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isTilting ? scale : 1})`,
      transition: isTilting ? 'transform 120ms ease-out' : 'transform 700ms cubic-bezier(0.2,0.7,0.2,1)',
    },
  };
}
