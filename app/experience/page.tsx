import type { Metadata } from 'next';
import PageIntro from '../components/layout/PageIntro';
import PageNav from '../components/layout/PageNav';
import TwoPane from '../components/layout/TwoPane';
import { getPage, getWork, withStats } from '../lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('experience');
  return {
    title: 'Experience',
    description: page.intro,
    alternates: { canonical: '/experience' },
  };
}

export default async function ExperiencePage() {
  const [page, roles] = await Promise.all([getPage('experience'), getWork()]);

  // Roles is the length of the list; Years and Countries stay editable.
  const counted = withStats(page, [
    { value: String(roles.length), label: 'Roles', accent: 'navy' },
  ]);

  return (
    <TwoPane
      left={
        <PageIntro page={counted}>
          <nav aria-label="Roles on this page">
            <div className="label mb-3 text-[11px] text-gunmetal">On this page</div>
            <ul className="m-0 flex list-none flex-col p-0">
              {roles.map((role, index) => (
                <li key={role.id}>
                  <a
                    href={`#${role.id}`}
                    className={`jump block border-l-2 py-2.5 pl-3 text-sm ${
                      index === 0
                        ? 'border-red font-medium'
                        : 'border-rule text-gunmetal'
                    }`}
                  >
                    {role.company}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </PageIntro>
      }
      right={
        <>
          {roles.map((role, index) => (
            <article
              key={role.id}
              id={role.id}
              className={
                index < roles.length - 1
                  ? 'mb-10 border-b border-rule pb-10'
                  : ''
              }
            >
              <div className="mb-4 flex flex-wrap items-center gap-3.5">
                {role.current ? (
                  <span className="label bg-red px-2.5 py-[5px] text-[11px] font-semibold text-white">
                    Current
                  </span>
                ) : null}
                <span className="label text-[13px] text-gunmetal">
                  {role.dates.replace(/\s-\s/, ' → ')}
                </span>
              </div>

              <h2 className="mb-1.5 text-[26px] sm:text-[30px]">{role.title}</h2>

              <div className="label mb-[18px] text-[15px] font-semibold text-blue">
                {[role.company, role.department, role.location].filter(Boolean).join(' · ')}
              </div>

              {role.paragraphs.map((text, i) => (
                <p key={i} className="m-0 mb-[18px] max-w-[680px] text-base text-gunmetal">
                  {text}
                </p>
              ))}

              {role.skills.length + role.tools.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-[7px]">
                  {[...role.skills, ...role.tools].map((item) => (
                    <span
                      key={item}
                      className="tag chip px-2.5 py-[5px] text-[11px] font-semibold text-gunmetal"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}

          <PageNav
            prev={{ label: 'Overview', href: '/' }}
            next={{ label: 'Projects', href: '/projects' }}
          />
        </>
      }
    />
  );
}
