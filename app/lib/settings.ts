import { cache } from 'react';
import client from '@/tina/__generated__/client';

export type SocialLink = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type NavbarSettings = {
  logoText: string;
  menuItems: NavItem[];
  resumeLabel: string;
  resumeHref: string;
};

export type FooterSettings = {
  creditText: string;
  creditName: string;
  creditUrl: string;
};

export type SiteSettings = {
  email: string;
  navbar: NavbarSettings;
  contactSocials: SocialLink[];
  footerSocials: SocialLink[];
  footer: FooterSettings;
};

/**
 * Cached per request, so the layout and the page can both ask for settings
 * without querying Tina twice.
 */
export const getSettings = cache(async (): Promise<SiteSettings> => {
  const res = await client.queries.settings({ relativePath: 'settings.md' });
  const s = res.data.settings;

  const email = s.email ?? '';
  const socials = (s.socials ?? []).filter((x) => x !== null);

  const toLink = (x: { label?: string | null; url?: string | null }): SocialLink => ({
    label: x.label ?? '',
    href: x.url ?? '',
  });

  // Email is its own field rather than a social link, but it is shown in the
  // same lists, always last.
  const emailLink: SocialLink[] = email ? [{ label: 'Email', href: `mailto:${email}` }] : [];

  return {
    email,
    navbar: {
      logoText: s.navbar?.logo_text ?? '',
      menuItems: (s.navbar?.menu_items ?? [])
        .filter((item) => item !== null)
        .map((item) => ({
          label: item.label ?? '',
          href: `#${item.section ?? ''}`,
        })),
      resumeLabel: s.navbar?.resume_label ?? '',
      resumeHref: s.navbar?.resume_file ?? '',
    },
    contactSocials: [...socials.filter((x) => x.show_in_contact).map(toLink), ...emailLink],
    footerSocials: [...socials.filter((x) => x.show_in_footer).map(toLink), ...emailLink],
    footer: {
      creditText: s.footer?.credit_text ?? '',
      creditName: s.footer?.credit_name ?? '',
      creditUrl: s.footer?.credit_url ?? '',
    },
  };
});
