import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageNav from '../../components/layout/PageNav';
import TwoPane from '../../components/layout/TwoPane';
import SectionHeading from '../../components/ui/SectionHeading';
import { getProjects, type Project } from '../../lib/content';

/**
 * The project list is fixed at build time, so an address outside it is a 404
 * rather than something to render on demand. This also keeps the live site
 * from querying Tina at request time: content changes arrive as a rebuild.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

async function find(slug: string): Promise<{ project: Project; prev: Project; next: Project } | null> {
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  return {
    project: projects[index],
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = await find(slug);
  if (!found) return {};
  return {
    title: found.project.name,
    description: found.project.summary,
    alternates: { canonical: `/projects/${found.project.slug}` },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = await find(slug);
  if (!found) notFound();
  const { project, prev, next } = found;

  const rows = [
    { label: 'Domain', value: project.domain },
    project.role ? { label: 'Role', value: project.role } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  // Both figures are the length of the Tina list beside them, so adding or
  // removing a skill or a tool in the CMS moves them on the next build.
  const counts = [
    { label: 'Skills used', value: project.skills.length, color: 'var(--navy)' },
    { label: 'Tools used', value: project.tools.length, color: 'var(--blue)' },
  ];

  return (
    <TwoPane
      left={
        <>
          <Link
            href="/projects"
            className="label mb-[22px] inline-block text-xs font-semibold text-gunmetal"
          >
            ← All projects
          </Link>

          <div className="label mb-3 text-xs font-semibold text-red">Project {project.number}</div>

          <h1 className="display mb-4 text-[32px] leading-[1.05] sm:text-[40px]">{project.name}</h1>

          {project.summary ? (
            <p className="m-0 mb-[26px] max-w-[400px] text-[17px] text-gunmetal">
              {project.summary}
            </p>
          ) : null}

          <div className="border border-loblolly">
            {rows.map((row) => (
              <div key={row.label} className="flex flex-wrap gap-x-4 gap-y-1 border-b border-rule p-4">
                <span className="label flex-[0_0_96px] text-[11px] text-gunmetal">{row.label}</span>
                <span className="min-w-0 flex-[1_1_auto] text-[15px] font-semibold">
                  {row.value}
                </span>
              </div>
            ))}
            {counts.map((row, index) => (
              <div
                key={row.label}
                className={`flex flex-wrap gap-x-4 gap-y-1 p-4 ${index === 0 ? 'border-b border-rule' : ''}`}
              >
                <span className="label flex-[0_0_96px] text-[11px] text-gunmetal">{row.label}</span>
                <span
                  className="stat-number min-w-0 flex-[1_1_auto] text-[22px] leading-tight"
                  style={{ color: row.color }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              href={`/projects/${prev.slug}`}
              className="label inline-flex min-h-[46px] items-center border border-navy px-6 text-[13px] font-semibold"
            >
              Previous
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className="label inline-flex min-h-[46px] items-center bg-navy px-6 text-[13px] font-semibold text-white hover:text-white"
            >
              Next project
            </Link>
          </div>
        </>
      }
      right={
        <>
          {project.overview ? (
            <section className="mb-11">
              <SectionHeading name="Overview" />
              <p className="m-0 max-w-[680px] text-lg">{project.overview}</p>
            </section>
          ) : null}

          {project.highlights.length > 0 ? (
            <section className="mb-11">
              <SectionHeading name="Highlights" />
              <ul className="m-0 list-none p-0">
                {project.highlights.map((item, index) => (
                  <li
                    key={index}
                    className={`flex gap-[18px] border-t border-rule py-[18px] ${
                      index === project.highlights.length - 1 ? 'border-b' : ''
                    }`}
                  >
                    <span className="stat-number flex-[0_0_34px] text-xl text-loblolly">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-[1_1_auto] text-base text-gunmetal">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.outcome ? (
            <section className="mb-11">
              <SectionHeading name="Outcome" color="var(--red)" />
              <p className="m-0 max-w-[660px] text-lg">{project.outcome}</p>
            </section>
          ) : null}

          {project.skills.length > 0 ? (
            <section className="mb-9">
              <SectionHeading name="Machine Learning and AI" label="Skills applied" />
              <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
                {project.skills.map((item) => (
                  <li key={item} className="chip px-4 py-2.5 text-[15px] font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {project.tools.length > 0 ? (
            <section>
              <SectionHeading
                name="Apps and Dashboards"
                label="Tools used"
                color="var(--blue)"
              />
              <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
                {project.tools.map((item) => (
                  <li key={item} className="chip px-4 py-2.5 text-[15px] font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <PageNav
            prev={{ label: 'All projects', href: '/projects' }}
            next={{ label: 'Get in touch', href: '/contact' }}
          />
        </>
      }
    />
  );
}
