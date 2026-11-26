import Image from 'next/image';
import Link from 'next/link';
import TwoPane from './components/layout/TwoPane';
import ChannelIcon from './components/ui/ChannelIcon';
import { getBanner, getEducation, getProjects, getWork, type Accent } from './lib/content';
import { getSettings } from './lib/settings';

const BAR: Record<Accent, string> = {
  navy: 'var(--navy)',
  blue: 'var(--blue)',
  red: 'var(--red)',
};

export default async function OverviewPage() {
  const [settings, banner, work, projects, education] = await Promise.all([
    getSettings(),
    getBanner(),
    getWork(),
    getProjects(),
    getEducation(),
  ]);

  const linkedIn =
    settings.contactSocials.find((s) => s.label === 'LinkedIn') ??
    settings.footerSocials.find((s) => s.label === 'LinkedIn');

  // The three Highlights rows read themselves off the content, so adding a
  // role or moving house in Tina is the only edit needed.
  const currentRole = work[0];
  const degree = education.entries[0];
  const recent = work.slice(0, 3);
  const selected = projects.slice(0, 3);

  const highlights = [
    currentRole && {
      label: 'Current role',
      value: currentRole.title,
      note: [currentRole.company, currentRole.department].filter(Boolean).join(', '),
    },
    degree && {
      label: 'Degree',
      value: degree.degree,
      note: degree.school,
    },
    settings.profile.location && {
      label: 'Current location',
      value: settings.profile.location,
      note: settings.profile.coordinates,
    },
  ].filter(Boolean) as { label: string; value: string; note: string }[];

  return (
    <TwoPane
      leftBasis="460px"
      rightBasis="540px"
      left={
        <>
          {banner.label ? (
            <div className="mb-[22px]">
              <span className="label border-b-2 border-red pb-1 text-xs font-semibold text-gunmetal">
                {banner.label}
              </span>
            </div>
          ) : null}

          <div className="mb-7 flex flex-wrap items-end gap-6">
            <div className="flex-[0_0_148px]">
              <div className="relative aspect-square border-b-[5px] border-red bg-navy">
                {banner.photo ? (
                  <Image
                    src={banner.photo}
                    alt={banner.photoAlt}
                    fill
                    sizes="148px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-[7px] p-3 text-center text-blue">
                    <ChannelIcon label="photo" size={26} color="var(--blue)" />
                    <span className="label text-[10px] font-semibold leading-snug">
                      Your
                      <br />
                      photo
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="min-w-0 flex-[1_1_200px]">
              <h1 className="display-condensed whitespace-pre-line text-[52px] leading-[0.92] sm:text-[62px]">
                {banner.name}
              </h1>
            </div>
          </div>

          {banner.intro ? (
            <p className="m-0 mb-[30px] max-w-[420px] text-[17px] text-gunmetal">{banner.intro}</p>
          ) : null}

          <div className="mb-9 flex flex-wrap gap-3">
            {linkedIn ? (
              <a
                href={linkedIn.href}
                target="_blank"
                rel="noopener"
                className="label resume inline-flex min-h-[48px] items-center gap-[9px] px-[26px] text-[13px] font-semibold"
              >
                <ChannelIcon label="LinkedIn" size={16} color="var(--white)" />
                LinkedIn
              </a>
            ) : null}
            <Link
              href="/contact"
              className="label inline-flex min-h-[48px] items-center border border-navy px-[26px] text-[13px] font-semibold"
            >
              Contact
            </Link>
          </div>

          {banner.strengths.length > 0 ? (
            <div className="flex flex-col gap-4 border-t border-loblolly pt-[22px]">
              {banner.strengths.map((strength) => (
                <div key={strength.label}>
                  <div className="label mb-[7px] flex justify-between text-xs font-semibold text-gunmetal">
                    <span>{strength.label}</span>
                    <span>{strength.note}</span>
                  </div>
                  <div className="h-1.5 bg-track">
                    <div
                      className="bar h-full"
                      style={{ width: `${strength.percent}%`, background: BAR[strength.accent] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </>
      }
      right={
        <>
          <section className="mb-14">
            <h2 className="label mb-6 text-[13px] font-semibold text-gunmetal">Highlights</h2>
            <div className="border border-loblolly">
              {highlights.map((row, index) => (
                <div
                  key={row.label}
                  className={`tile flex flex-wrap gap-5 p-[22px] ${
                    index < highlights.length - 1 ? 'border-b border-rule' : ''
                  }`}
                >
                  <div className="label flex-[0_0_150px] pt-1 text-[11px] font-semibold text-gunmetal">
                    {row.label}
                  </div>
                  <div className="min-w-0 flex-[1_1_300px]">
                    <div className="text-[19px] font-semibold leading-snug">{row.value}</div>
                    {row.note ? <div className="text-sm text-gunmetal">{row.note}</div> : null}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="label text-[13px] font-semibold text-gunmetal">Recent experience</h2>
              <Link
                href="/experience"
                className="label border-b-2 border-red pb-0.5 text-xs font-semibold"
              >
                See all
              </Link>
            </div>
            <ul className="m-0 list-none p-0">
              {recent.map((role, index) => (
                <li key={role.id}>
                  <Link
                    href={`/experience#${role.id}`}
                    className={`tile flex flex-wrap items-baseline gap-5 border border-rule px-4 py-5 ${
                      index < recent.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <span className="label flex-[0_0_86px] text-[13px] font-semibold text-gunmetal">
                      {role.year}
                      {role.current ? ' →' : ''}
                    </span>
                    <span className="min-w-0 flex-[1_1_300px]">
                      <span className="block text-[17px] font-semibold">{role.title}</span>
                      <span className="text-sm text-gunmetal">
                        {[role.company, role.location].filter(Boolean).join(', ')}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="label text-[13px] font-semibold text-gunmetal">Selected projects</h2>
              <Link
                href="/projects"
                className="label border-b-2 border-red pb-0.5 text-xs font-semibold"
              >
                See all
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selected.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="tile block border border-rule p-[22px]"
                >
                  <div className="mb-3 flex items-baseline justify-between gap-2.5">
                    <span className="tag text-[11px] font-semibold text-red">{project.domain}</span>
                    <span className="stat-number text-lg text-loblolly">{project.number}</span>
                  </div>
                  <h3 className="mb-2.5 text-lg">{project.name}</h3>
                  <p className="m-0 text-sm text-gunmetal">{project.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        </>
      }
    />
  );
}
