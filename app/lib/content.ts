import { cache } from 'react';
import client from '@/tina/__generated__/client';

export type BannerContent = {
  name: string;
  heroText: string;
  highlightedText: string;
};

export type AboutContent = {
  tagline: string;
  label: string;
  text: string;
};

export type ContactContent = {
  label: string;
  text: string;
};

export const getBanner = cache(async (): Promise<BannerContent> => {
  const res = await client.queries.banner({ relativePath: 'banner.md' });
  const b = res.data.banner;
  return {
    name: b.name ?? '',
    heroText: b.hero_text ?? '',
    highlightedText: b.highlighted_text ?? '',
  };
});

export const getAbout = cache(async (): Promise<AboutContent> => {
  const res = await client.queries.about({ relativePath: 'about.md' });
  const a = res.data.about;
  return {
    tagline: a.tagline ?? '',
    label: a.label ?? '',
    text: a.text ?? '',
  };
});

export const getContact = cache(async (): Promise<ContactContent> => {
  const res = await client.queries.contact({ relativePath: 'contact.md' });
  const c = res.data.contact;
  return {
    label: c.label ?? '',
    text: c.text ?? '',
  };
});

export type EducationEntry = {
  school: string;
  degree: string;
  dates: string;
  details: string[];
};

export type EducationContent = {
  heading: string;
  entries: EducationEntry[];
};

export const getEducation = cache(async (): Promise<EducationContent> => {
  const res = await client.queries.education({ relativePath: 'education.md' });
  const e = res.data.education;
  return {
    heading: e.heading ?? '',
    entries: (e.entries ?? [])
      .filter((entry) => entry !== null)
      .map((entry) => ({
        school: entry.school ?? '',
        degree: entry.degree ?? '',
        dates: entry.dates ?? '',
        details: (entry.details ?? []).filter((d) => d !== null),
      })),
  };
});
