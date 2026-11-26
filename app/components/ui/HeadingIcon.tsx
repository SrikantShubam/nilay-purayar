import type { ReactElement } from 'react';

/**
 * One registry for every mark that sits beside a heading, whether that
 * heading is a skill group, a tool group or a section of a project write-up.
 * Each mark is drawn to say something about its heading rather than repeat a
 * brand device. An unknown name falls back to the layers mark.
 */
const PATHS: Record<string, ReactElement> = {
  /* ---------------------------------------- project write-up sections */
  Overview: (
    <>
      <path d="M5.5 2.8 h8.2 L19 8.1 V21.2 H5.5 Z" />
      <path d="M13.5 2.8 V8.2 H19" />
      <path d="M8.5 12.5 H15.5" />
      <path d="M8.5 16 H15.5" />
    </>
  ),
  Highlights: (
    <>
      <path d="M9.5 6 H20.5" />
      <path d="M9.5 12 H20.5" />
      <path d="M9.5 18 H20.5" />
      <circle cx="4.8" cy="6" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="4.8" cy="12" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="4.8" cy="18" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  Outcome: (
    <>
      <path d="M6 21.2 V3" />
      <path d="M6 3.8 h11.5 l-2.4 4 2.4 4 H6" />
    </>
  ),

  /* ----------------------------------------------------- skill groups */
  'Languages and Querying': (
    <>
      <path d="M8 6 L3 12 L8 18" />
      <path d="M16 6 L21 12 L16 18" />
      <path d="M13.5 4.5 L10.5 19.5" />
    </>
  ),
  'Machine Learning and AI': (
    <>
      <circle cx="4.5" cy="12" r="2" />
      <circle cx="12" cy="5.5" r="2" />
      <circle cx="12" cy="18.5" r="2" />
      <circle cx="19.5" cy="12" r="2" />
      <path d="M6.2 10.9 L10.3 6.6" />
      <path d="M6.2 13.1 L10.3 17.4" />
      <path d="M13.7 6.6 L17.8 10.9" />
      <path d="M13.7 17.4 L17.8 13.1" />
    </>
  ),
  'Data and Databases': (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
      <path d="M4.5 5.5 V18.5 C4.5 20.2 7.9 21.5 12 21.5 S19.5 20.2 19.5 18.5 V5.5" />
      <path d="M4.5 12 C4.5 13.7 7.9 15 12 15 S19.5 13.7 19.5 12" />
    </>
  ),
  'Business and Strategy': (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" />
    </>
  ),

  /* ------------------------------------------------------ tool groups */
  'Data and Modelling': (
    <>
      <path d="M12 2.8 L21.5 7.5 L12 12.2 L2.5 7.5 Z" />
      <path d="M2.5 12.2 L12 16.9 L21.5 12.2" />
      <path d="M2.5 16.6 L12 21.3 L21.5 16.6" />
    </>
  ),
  'BI and Visualisation': (
    <>
      <path d="M3.5 20.5 H20.5" />
      <rect x="5" y="12" width="3.6" height="6" />
      <rect x="10.2" y="7.5" width="3.6" height="10.5" />
      <rect x="15.4" y="3.5" width="3.6" height="14.5" />
    </>
  ),
  'Apps and Dashboards': (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M2.5 9.5 H21.5" />
      <path d="M9 14 L7 16 L9 18" />
      <path d="M15 14 L17 16 L15 18" />
    </>
  ),
  'Workflow and Platforms': (
    <>
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <circle cx="17.5" cy="6.5" r="2.5" />
      <path d="M6.5 9 V15" />
      <path d="M17.5 9 v2.5a3 3 0 01-3 3H9" />
    </>
  ),
};

export default function HeadingIcon({
  name,
  size = 19,
  color = 'var(--navy)',
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  return (
    <span aria-hidden="true" className="ico">
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color }}
      >
        {PATHS[name] ?? PATHS['Data and Modelling']}
      </svg>
    </span>
  );
}
