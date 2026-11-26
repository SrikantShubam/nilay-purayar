'use client';

import { useEffect, useState } from 'react';

const REST = 14;
const OVER_LINK = 26;

/**
 * A ring rather than a filled dot, so whatever it sits on stays readable.
 * Red at rest, navy over anything clickable.
 *
 * Nothing renders until a mouse or pen actually moves, which keeps it off
 * touch devices without having to test for them up front.
 */
export default function Cursor() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      setPos({ x: event.clientX, y: event.clientY });
      const target = event.target as Element | null;
      setHot(Boolean(target?.closest?.('a,button')));
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  if (!pos) return null;

  const size = hot ? OVER_LINK : REST;

  return (
    <div
      className="cursor-ring"
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        border: `2px solid ${hot ? 'var(--navy)' : 'var(--red)'}`,
      }}
    />
  );
}
