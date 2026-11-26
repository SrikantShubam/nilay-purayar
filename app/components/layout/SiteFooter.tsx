import Link from 'next/link';
import type { SiteSettings } from '@/app/lib/settings';

const EXPLORE = [
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Education', href: '/education' },
];

export default function SiteFooter({ settings }: { settings: SiteSettings }) {
  const { email, footer, footerSocials, profile } = settings;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 bg-navy text-loblolly">
      <div className="shell pt-16">
        <div className="flex flex-wrap gap-12 border-b border-gunmetal pb-12">
          <div className="min-w-0 flex-[1_1_320px]">
            <h2 className="display-condensed mb-3.5 text-[34px] text-white">{footer.heading}</h2>
            <p className="m-0 mb-5 max-w-[360px] text-[15px]">{footer.note}</p>
            {email ? (
              <a
                href={`mailto:${email}`}
                className="border-b border-gunmetal pb-[3px] text-[17px] font-semibold text-blue hover:text-white"
              >
                {email}
              </a>
            ) : null}
          </div>

          <div className="min-w-0 flex-[1_1_170px]">
            <h3 className="label mb-[18px] text-[11px] font-semibold text-white">Explore</h3>
            <ul className="m-0 flex list-none flex-col gap-[11px] p-0 text-sm">
              {EXPLORE.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-loblolly hover:text-blue">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {footerSocials.length > 0 ? (
            <div className="min-w-0 flex-[1_1_170px]">
              <h3 className="label mb-[18px] text-[11px] font-semibold text-white">Connect</h3>
              <ul className="m-0 flex list-none flex-col gap-[11px] p-0 text-sm">
                {footerSocials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener"
                      className="text-loblolly hover:text-blue"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {profile.location ? (
            <div className="min-w-0 flex-[1_1_230px]">
              <h3 className="label mb-[18px] text-[11px] font-semibold text-white">Based</h3>
              <p className="m-0 text-sm">{profile.location}</p>
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-[18px] pb-8 pt-[26px] text-xs">
          <span>© {year} Nilay Purayar</span>
          {footer.creditName ? (
            <span>
              {footer.creditText}{' '}
              <a
                href={footer.creditUrl}
                target="_blank"
                rel="noopener"
                className="border-b border-gunmetal text-loblolly hover:text-blue"
              >
                {footer.creditName}
              </a>
            </span>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
