import { cache } from 'react';
import client from '@/tina/__generated__/client';

/**
 * Used whenever the Site Settings site URL is missing or not a usable
 * address. Keeps the canonical tag and share links pointing somewhere real
 * instead of emitting a broken host.
 */
const FALLBACK_SITE_URL = 'https://nilay-purayar.vercel.app';

function resolveSiteUrl(value: string | null | undefined): string {
  if (!value) return FALLBACK_SITE_URL;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return FALLBACK_SITE_URL;
    // A bare word parses as a URL but is not a host we can link to.
    if (!url.hostname.includes('.')) return FALLBACK_SITE_URL;
    return url.origin;
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export type SeoSettings = {
  siteUrl: string;
  title: string;
  siteName: string;
  description: string;
  keywords: string[];
  shareDescription: string;
  shareImage: string;
  shareImageAlt: string;
  xHandle: string;
};

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  actionLabel: string;
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
  heading: string;
  note: string;
  creditText: string;
  creditName: string;
  creditUrl: string;
};

export type ProfileSettings = {
  location: string;
  coordinates: string;
};

export type SiteSettings = {
  seo: SeoSettings;
  email: string;
  navbar: NavbarSettings;
  profile: ProfileSettings;
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

  const toLink = (x: {
    label?: string | null;
    url?: string | null;
    handle?: string | null;
    action_label?: string | null;
  }): SocialLink => ({
    label: x.label ?? '',
    href: x.url ?? '',
    handle: x.handle ?? '',
    actionLabel: x.action_label ?? 'Open',
  });

  return {
    seo: {
      siteUrl: resolveSiteUrl(s.seo?.site_url),
      title: s.seo?.title ?? '',
      siteName: s.seo?.site_name ?? '',
      description: s.seo?.description ?? '',
      keywords: (s.seo?.keywords ?? []).filter((k) => k !== null),
      shareDescription: s.seo?.share_description ?? '',
      shareImage: s.seo?.share_image ?? '',
      shareImageAlt: s.seo?.share_image_alt ?? '',
      xHandle: s.seo?.x_handle?.trim() ?? '',
    },
    email,
    navbar: {
      logoText: s.navbar?.logo_text ?? '',
      menuItems: (s.navbar?.menu_items ?? [])
        .filter((item) => item !== null)
        .map((item) => ({
          label: item.label ?? '',
          href: item.href ?? '/',
        })),
      resumeLabel: s.navbar?.resume_label ?? '',
      resumeHref: s.navbar?.resume_file ?? '',
    },
    profile: {
      location: s.profile?.location ?? '',
      coordinates: s.profile?.coordinates ?? '',
    },
    contactSocials: socials.filter((x) => x.show_in_contact).map(toLink),
    footerSocials: socials.filter((x) => x.show_in_footer).map(toLink),
    footer: {
      heading: s.footer?.heading ?? '',
      note: s.footer?.note ?? '',
      creditText: s.footer?.credit_text ?? '',
      creditName: s.footer?.credit_name ?? '',
      creditUrl: s.footer?.credit_url ?? '',
    },
  };
});
