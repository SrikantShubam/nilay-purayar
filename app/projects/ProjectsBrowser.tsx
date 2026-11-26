'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import PageIntro from '../components/layout/PageIntro';
import PageNav from '../components/layout/PageNav';
import TwoPane from '../components/layout/TwoPane';
import { countLabel, PROJECT_CATEGORIES, type PageHeader, type Project } from '../lib/content';

type Key = 'All' | (typeof PROJECT_CATEGORIES)[number];

export default function ProjectsBrowser({
  page,
  projects,
}: {
  page: PageHeader;
  projects: Project[];
}) {
  const [filter, setFilter] = useState<Key>('All');

  const counts = useMemo(() => {
    const out = new Map<Key, number>([['All', projects.length]]);
    for (const category of PROJECT_CATEGORIES) {
      out.set(category, projects.filter((p) => p.category === category).length);
    }
    return out;
  }, [projects]);

  const shown = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  );

  // Categories with nothing in them would be dead buttons.
  const keys: Key[] = ['All', ...PROJECT_CATEGORIES.filter((c) => (counts.get(c) ?? 0) > 0)];

  return (
    <TwoPane
      leftBasis="360px"
      rightBasis="600px"
      left={
        <PageIntro page={page}>
          <div className="label mb-3 text-[11px] text-gunmetal">Filter by domain</div>
          <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Filter by domain">
            {keys.map((key) => {
              const on = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  aria-pressed={on}
                  className="label min-h-[36px] border px-3.5 py-2 text-xs font-semibold transition-colors"
                  style={{
                    color: on ? 'var(--white)' : 'var(--gunmetal)',
                    background: on ? 'var(--navy)' : 'transparent',
                    borderColor: on ? 'var(--navy)' : 'var(--loblolly)',
                  }}
                >
                  {key} {counts.get(key) ?? 0}
                </button>
              );
            })}
          </div>

          <div className="flex gap-7 border-t border-loblolly pt-5">
            <div>
              <div className="stat-number text-[42px] leading-none text-navy">{shown.length}</div>
              <div className="label mt-1 text-[11px] text-gunmetal">Showing</div>
            </div>
            <div>
              <div className="stat-number text-[42px] leading-none text-blue">
                {projects.length}
              </div>
              <div className="label mt-1 text-[11px] text-gunmetal">In total</div>
            </div>
          </div>
        </PageIntro>
      }
      right={
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {shown.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="card block border border-rule p-6"
              >
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <span className="tag text-[11px] font-semibold text-red">{project.domain}</span>
                  <span className="stat-number idx text-xl text-loblolly">{project.number}</span>
                </div>
                <h2 className="mb-2.5 text-xl">{project.name}</h2>
                <p className="m-0 mb-4 text-sm text-gunmetal">{project.summary}</p>
                <div className="flex flex-wrap gap-3.5">
                  <span className="label text-[11px] text-gunmetal">
                    {countLabel(project.skills.length, 'skill')}
                  </span>
                  <span className="label text-[11px] text-gunmetal">
                    {countLabel(project.tools.length, 'tool')}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <PageNav
            prev={{ label: 'Experience', href: '/experience' }}
            next={{ label: 'Skills', href: '/skills' }}
          />
        </>
      }
    />
  );
}
