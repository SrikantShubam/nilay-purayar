import type { Metadata } from 'next';
import PageIntro from '../components/layout/PageIntro';
import PageNav from '../components/layout/PageNav';
import TwoPane from '../components/layout/TwoPane';
import ChannelIcon, { channelAccent, channelStroke } from '../components/ui/ChannelIcon';
import { getPage } from '../lib/content';
import { getSettings } from '../lib/settings';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('contact');
  return {
    title: 'Contact',
    description: page.intro,
    alternates: { canonical: '/contact' },
  };
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getPage('contact'), getSettings()]);
  const { email, profile, contactSocials, navbar } = settings;

  const channels = [
    ...(email
      ? [
          {
            label: 'Email',
            href: `mailto:${email}`,
            handle: email,
            actionLabel: 'Write',
            external: false,
          },
        ]
      : []),
    ...contactSocials.map((social) => ({
      label: social.label,
      href: social.href,
      handle: social.handle || social.label,
      actionLabel: social.actionLabel,
      external: true,
    })),
  ];

  return (
    <TwoPane
      rightBasis="520px"
      left={
        <PageIntro page={page} headingSize="text-[48px] sm:text-[68px]">
          {email ? (
            <a
              href={`mailto:${email}`}
              className="label resume mb-[30px] inline-flex min-h-[52px] items-center gap-2.5 px-7 text-sm font-semibold"
            >
              <ChannelIcon label="Email" size={17} color="var(--white)" />
              Send an email
            </a>
          ) : null}

          {profile.location ? (
            <div className="border-t border-loblolly pt-[22px]">
              <div className="label mb-[3px] text-[11px] text-gunmetal">Based</div>
              <div className="text-base">{profile.location}</div>
              {profile.coordinates ? (
                <div className="label mt-1 text-xs text-gunmetal">{profile.coordinates}</div>
              ) : null}
            </div>
          ) : null}
        </PageIntro>
      }
      right={
        <>
          <h2 className="label mb-5 text-[13px] font-semibold text-gunmetal">Channels</h2>

          <ul className="m-0 mb-11 flex list-none flex-col gap-3 p-0">
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  {...(channel.external ? { target: '_blank', rel: 'noopener' } : {})}
                  className="chan flex flex-wrap items-center gap-5 border border-rule border-l-4 px-[22px] py-5"
                  style={{ borderLeftColor: channelAccent(channel.label) }}
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-11 w-11 flex-[0_0_auto] items-center justify-center border border-loblolly"
                  >
                    <ChannelIcon label={channel.label} />
                  </span>
                  <span className="min-w-0 flex-[1_1_220px]">
                    <span className="label mb-0.5 block text-[11px] text-gunmetal">
                      {channel.label}
                    </span>
                    <span className="break-words text-[19px] font-semibold sm:text-[21px]">
                      {channel.handle}
                    </span>
                  </span>
                  <span
                    className="label text-xs font-semibold"
                    style={{ color: channelStroke(channel.label) }}
                  >
                    {channel.actionLabel} →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {page.cta && navbar.resumeHref ? (
            <div className="bg-navy p-8 text-loblolly">
              <h3 className="mb-2.5 text-[22px] text-white">{page.cta.heading}</h3>
              <p className="m-0 mb-5 max-w-[460px] text-[15px]">{page.cta.text}</p>
              <a
                href={navbar.resumeHref}
                target="_blank"
                rel="noopener"
                className="label inline-flex min-h-[46px] items-center bg-blue px-6 text-[13px] font-semibold text-navy hover:text-navy"
              >
                {page.cta.buttonLabel}
              </a>
            </div>
          ) : null}

          <PageNav
            prev={{ label: 'Education', href: '/education' }}
            next={{ label: 'Back to overview', href: '/' }}
          />
        </>
      }
    />
  );
}
