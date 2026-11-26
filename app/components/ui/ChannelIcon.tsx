import type { ReactElement } from 'react';

const PATHS: Record<string, ReactElement> = {
  Email: (
    <>
      <rect x="2" y="4.5" width="20" height="15" rx="2" />
      <path d="M2.5 6.5 L12 13.5 L21.5 6.5" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="2" />
      <path d="M7 10.5v7" />
      <path d="M7 7v.01" />
      <path d="M11.5 17.5v-4a2.5 2.5 0 015 0v4" />
    </>
  ),
  GitHub: (
    <>
      <path d="M9.5 20.5c-4 1.2-4-2-5.5-2.5" />
      <path d="M15 21.5v-3.4a3 3 0 00-.8-2.3c2.7-.3 5.5-1.4 5.5-6a4.7 4.7 0 00-1.3-3.2 4.3 4.3 0 00-.1-3.2s-1 -.3-3.3 1.2a11.4 11.4 0 00-5.9 0C6.8 2.9 5.8 3.2 5.8 3.2a4.3 4.3 0 00-.1 3.2A4.7 4.7 0 004.4 9.6c0 4.6 2.8 5.7 5.5 6a3 3 0 00-.8 2.3v3.6" />
    </>
  ),
  Instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  Facebook: <path d="M17 2.5h-2.6a4.4 4.4 0 00-4.4 4.4V10H7.2v3.6h2.8v8h3.6v-8h2.9l.5-3.6h-3.4V7.2c0-.6.5-1.1 1.1-1.1H17z" />,
  Snapchat: (
    <>
      <path d="M12 2.8c2.6 0 4.2 1.9 4.2 4.4 0 1.2-.1 2.3-.1 2.3.5.3 1.2 0 1.6-.2.6.3.5 1-.2 1.4-.6.4-1.5.6-1.4 1.1.3 1.3 2.3 3.2 3.6 3.5.4.1.4.6 0 .8-.9.4-1.8.3-2.1.7-.2.4 0 .9-.5 1-.7.1-1.8-.4-2.9.2-.9.5-1.3 1.4-2.2 1.4s-1.3-.9-2.2-1.4c-1.1-.6-2.2-.1-2.9-.2-.5-.1-.3-.6-.5-1-.3-.4-1.2-.3-2.1-.7-.4-.2-.4-.7 0-.8 1.3-.3 3.3-2.2 3.6-3.5.1-.5-.8-.7-1.4-1.1-.7-.4-.8-1.1-.2-1.4.4.2 1.1.5 1.6.2 0 0-.1-1.1-.1-2.3 0-2.5 1.6-4.4 4.2-4.4z" />
    </>
  ),
};

/** Keeps the colour and the mark for each channel in one place. */
export const CHANNEL_ACCENT: Record<string, string> = {
  Email: 'var(--red)',
  LinkedIn: 'var(--blue)',
  GitHub: 'var(--navy)',
};

export function channelAccent(label: string): string {
  return CHANNEL_ACCENT[label] ?? 'var(--loblolly)';
}

/** Marks on the loblolly accent still need a readable stroke. */
export function channelStroke(label: string): string {
  return CHANNEL_ACCENT[label] ?? 'var(--gunmetal)';
}

export default function ChannelIcon({
  label,
  size = 22,
  color,
}: {
  label: string;
  size?: number;
  color?: string;
}) {
  const stroke = color ?? channelStroke(label);
  const mark = PATHS[label];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: stroke }}
      aria-hidden="true"
    >
      {mark ?? (
        <>
          <path d="M10 13.5a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" />
          <path d="M14 10.5a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />
        </>
      )}
    </svg>
  );
}
