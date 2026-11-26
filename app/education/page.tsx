import type { Metadata } from 'next';
import PageIntro from '../components/layout/PageIntro';
import PageNav from '../components/layout/PageNav';
import TwoPane from '../components/layout/TwoPane';
import { getEducation, getPage } from '../lib/content';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('education');
  return {
    title: 'Education',
    description: page.intro,
    alternates: { canonical: '/education' },
  };
}

export default async function EducationPage() {
  const [page, education] = await Promise.all([getPage('education'), getEducation()]);

  return (
    <TwoPane
      leftBasis="360px"
      left={
        <PageIntro page={page} headingSize="text-[48px] sm:text-[68px]">
          {education.languages.length > 0 ? (
            <div className="mt-6">
              <div className="label mb-2.5 text-[11px] text-gunmetal">Languages</div>
              <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[15px]">
                {education.languages.map((language) => (
                  <li
                    key={language.name}
                    className="flex justify-between border-b border-rule pb-[7px]"
                  >
                    <span>{language.name}</span>
                    <span className="text-gunmetal">{language.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </PageIntro>
      }
      right={
        <>
          {education.entries.map((entry, index) => {
            const lead = index === 0;
            return (
              <article
                key={entry.degree}
                className={`spec border border-rule p-6 sm:p-8 ${
                  lead ? 'border-t-4 border-t-red' : 'border-t-4 border-t-blue'
                } ${index < education.entries.length - 1 ? 'mb-6' : ''}`}
              >
                <div className="mb-3.5 flex flex-wrap items-baseline justify-between gap-4">
                  <span className="label text-[13px] text-gunmetal">
                    {entry.dates.replace(/\s-\s/, ' – ')}
                  </span>
                  {entry.badge ? (
                    <span
                      className={
                        lead
                          ? 'label bg-navy px-2.5 py-[5px] text-[11px] font-semibold text-white'
                          : 'label border border-loblolly px-[9px] py-1 text-[11px] font-semibold text-gunmetal'
                      }
                    >
                      {entry.badge}
                    </span>
                  ) : null}
                </div>

                <h2 className="mb-2 text-[26px] sm:text-[30px]">{entry.degree}</h2>

                <div className="label mb-5 text-[15px] font-semibold text-blue">
                  {[entry.school, entry.location].filter(Boolean).join(' · ')}
                </div>

                {entry.details.length > 0 ? (
                  <ul className="m-0 flex list-disc flex-col gap-2.5 pl-5 text-base text-gunmetal">
                    {entry.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            );
          })}

          <PageNav
            prev={{ label: 'Skills', href: '/skills' }}
            next={{ label: 'Contact', href: '/contact' }}
          />
        </>
      }
    />
  );
}
