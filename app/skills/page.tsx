import type { Metadata } from 'next';
import PageIntro from '../components/layout/PageIntro';
import PageNav from '../components/layout/PageNav';
import TwoPane from '../components/layout/TwoPane';
import SectionHeading from '../components/ui/SectionHeading';
import { getPage, getSkills, getTools, withStats, type NamedGroup } from '../lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('skills');
  return {
    title: 'Skills and Tools',
    description: page.intro,
    alternates: { canonical: '/skills' },
  };
}

function Block({
  groups,
  prefix,
  iconColor,
}: {
  groups: NamedGroup[];
  prefix: string;
  iconColor?: string;
}) {
  return (
    <>
      {groups.map((group, index) => (
        <section
          key={group.name}
          id={`${prefix}${index + 1}`}
          className={index < groups.length - 1 ? 'mb-10' : 'mb-14'}
        >
          <SectionHeading name={group.name} color={iconColor} as="h3" />
          <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
            {group.items.map((item) => (
              <li key={item} className="chip px-[18px] py-2.5 text-base font-medium">
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

function Jump({
  title,
  groups,
  prefix,
  firstIsRed,
}: {
  title: string;
  groups: NamedGroup[];
  prefix: string;
  firstIsRed: boolean;
}) {
  return (
    <>
      <div className="label mb-2.5 text-[11px] text-gunmetal">{title}</div>
      <ul className="m-0 mb-[18px] list-none p-0">
        {groups.map((group, index) => (
          <li key={group.name}>
            <a
              href={`#${prefix}${index + 1}`}
              className={`jump flex justify-between border-l-2 py-[9px] pl-3 text-sm ${
                firstIsRed && index === 0 ? 'border-red font-medium' : 'border-rule text-gunmetal'
              }`}
            >
              <span>{group.name}</span>
              <span className={firstIsRed && index === 0 ? 'text-gunmetal' : ''}>
                {group.items.length}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default async function SkillsPage() {
  const [page, skills, tools] = await Promise.all([getPage('skills'), getSkills(), getTools()]);

  const skillCount = skills.reduce((sum, g) => sum + g.items.length, 0);
  const toolCount = tools.reduce((sum, g) => sum + g.items.length, 0);

  // Counted from the content rather than typed in, so the figures cannot drift
  // away from the lists beside them.
  const counted = withStats(page, [
    { value: String(skillCount), label: 'Skills', accent: 'navy' },
    { value: String(toolCount), label: 'Tools', accent: 'blue' },
  ]);

  return (
    <TwoPane
      leftBasis="360px"
      left={
        <PageIntro page={counted} headingSize="text-[48px] sm:text-[66px]">
          <nav aria-label="Sections on this page">
            <Jump title="Skills" groups={skills} prefix="s" firstIsRed />
            <Jump title="Tools" groups={tools} prefix="t" firstIsRed={false} />
          </nav>
        </PageIntro>
      }
      right={
        <>
          <div className="mb-[26px] flex items-baseline gap-3.5 border-b-2 border-navy pb-3.5">
            <h2 className="display-condensed text-[36px]">Skills</h2>
            <span className="label text-xs text-gunmetal">What I do</span>
          </div>
          <Block groups={skills} prefix="s" />

          <div className="mb-[26px] flex items-baseline gap-3.5 border-b-2 border-blue pb-3.5">
            <h2 className="display-condensed text-[36px]">Tools</h2>
            <span className="label text-xs text-gunmetal">What I use</span>
          </div>
          <Block groups={tools} prefix="t" iconColor="var(--blue)" />

          <PageNav
            prev={{ label: 'Projects', href: '/projects' }}
            next={{ label: 'Education', href: '/education' }}
          />
        </>
      }
    />
  );
}
