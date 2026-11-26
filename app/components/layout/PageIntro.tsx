import type { PageHeader, PageStat } from '@/app/lib/content';

const ACCENT: Record<PageStat['accent'], string> = {
  navy: 'var(--navy)',
  blue: 'var(--blue)',
  red: 'var(--red)',
};

export default function PageIntro({
  page,
  headingSize = 'text-[52px] sm:text-[72px]',
  children,
}: {
  page: PageHeader;
  /** The longer headings need to come down a step to hold one line. */
  headingSize?: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      {page.eyebrow ? (
        <div className="label mb-3.5 text-xs font-semibold text-red">{page.eyebrow}</div>
      ) : null}

      <h1
        className={`display-condensed mb-5 whitespace-pre-line leading-[0.92] ${headingSize}`}
      >
        {page.heading}
      </h1>

      {page.intro ? (
        <p className="m-0 mb-7 max-w-[380px] text-[17px] text-gunmetal">{page.intro}</p>
      ) : null}

      {page.stats.length > 0 ? (
        <div className="mb-7 flex flex-wrap gap-x-8 gap-y-4 border-y border-loblolly py-5">
          {page.stats.map((stat) => (
            <div key={stat.label}>
              <div
                className="stat-number text-[42px] leading-none"
                style={{ color: ACCENT[stat.accent] }}
              >
                {stat.value}
              </div>
              <div className="label mt-1 text-[11px] text-gunmetal">{stat.label}</div>
            </div>
          ))}
        </div>
      ) : null}

      {children}
    </>
  );
}
