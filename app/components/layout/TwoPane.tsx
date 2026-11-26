import type { ReactNode } from 'react';

/**
 * The shape every page shares: a left pane that frames the page and a wider
 * right pane that carries the content. They stack below the lg breakpoint,
 * where the divider and the sticky behaviour would both get in the way.
 */
export default function TwoPane({
  left,
  right,
  leftBasis = '400px',
  rightBasis = '560px',
}: {
  left: ReactNode;
  right: ReactNode;
  leftBasis?: string;
  rightBasis?: string;
}) {
  return (
    <div className="shell">
      <div className="flex flex-wrap">
        <div
          className="min-w-0 pb-10 pt-10 lg:pb-14 lg:pr-12"
          style={{ flex: `1 1 ${leftBasis}` }}
        >
          <div className="rise pane-sticky">{left}</div>
        </div>
        <div
          className="min-w-0 pb-14 pt-4 lg:border-l lg:border-loblolly lg:pl-12 lg:pt-10"
          style={{ flex: `999 1 ${rightBasis}` }}
        >
          {right}
        </div>
      </div>
    </div>
  );
}
