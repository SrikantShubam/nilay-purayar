import { cache } from 'react';
import client from '@/tina/__generated__/client';
import { slugify } from './slug';

/** Tina stores these as one comma separated line so they stay quick to edit. */
function splitList(value: string | null | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
}

/** A blank line in a textarea becomes a paragraph break on the page. */
function paragraphs(value: string | null | undefined): string[] {
  return (value ?? '')
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

/** "October 2026 - Present" reads as 2026 in the Overview timeline column. */
function firstYear(dates: string): string {
  const match = dates.match(/\d{4}/);
  return match ? match[0] : '';
}

/**
 * "1 skill" / "3 skills". Counts are always the length of the Tina list they
 * describe, never a number typed into the CMS, so they follow any edit. Kept
 * here so the wording is defined once.
 */
export function countLabel(n: number, singular: string): string {
  return `${n} ${n === 1 ? singular : `${singular}s`}`;
}

export type Accent = 'navy' | 'blue' | 'red';

function toAccent(value: string | null | undefined): Accent {
  return value === 'blue' || value === 'red' ? value : 'navy';
}

/* ------------------------------------------------------------------ banner */

export type Strength = {
  label: string;
  note: string;
  percent: number;
  accent: Accent;
};

export type BannerContent = {
  label: string;
  name: string;
  photo: string;
  photoAlt: string;
  intro: string;
  strengths: Strength[];
};

export const getBanner = cache(async (): Promise<BannerContent> => {
  const res = await client.queries.banner({ relativePath: 'banner.md' });
  const b = res.data.banner;
  return {
    label: b.label ?? '',
    name: b.name ?? '',
    photo: b.photo ?? '',
    photoAlt: b.photo_alt ?? '',
    intro: b.intro ?? '',
    strengths: (b.strengths ?? [])
      .filter((item) => item !== null)
      .map((item) => ({
        label: item.label ?? '',
        note: item.note ?? '',
        percent: Math.min(100, Math.max(0, item.percent ?? 0)),
        accent: toAccent(item.accent),
      })),
  };
});

/* ------------------------------------------------------------ page headers */

export type PageStat = {
  value: string;
  label: string;
  accent: Accent;
};

/**
 * Prepends figures counted from the content to whatever the page's own stats
 * hold. A counted figure never appears as a field in Tina, so it cannot be
 * typed in wrong; the editable ones, such as Years and Countries, stay.
 */
export function withStats(page: PageHeader, counted: PageStat[]): PageHeader {
  return { ...page, stats: [...counted, ...page.stats] };
}

export type PageCta = {
  heading: string;
  text: string;
  buttonLabel: string;
};

export type PageHeader = {
  eyebrow: string;
  heading: string;
  intro: string;
  stats: PageStat[];
  cta: PageCta | null;
};

export const getPage = cache(async (name: string): Promise<PageHeader> => {
  const res = await client.queries.page({ relativePath: `${name}.md` });
  const p = res.data.page;
  const cta = p.cta;
  return {
    eyebrow: p.eyebrow ?? '',
    heading: p.heading ?? '',
    intro: p.intro ?? '',
    stats: (p.stats ?? [])
      .filter((item) => item !== null)
      .map((item) => ({
        value: item.value ?? '',
        label: item.label ?? '',
        accent: toAccent(item.accent),
      })),
    cta: cta?.heading
      ? {
          heading: cta.heading ?? '',
          text: cta.text ?? '',
          buttonLabel: cta.button_label ?? '',
        }
      : null,
  };
});

/* -------------------------------------------------------------- experience */

export type WorkRole = {
  id: string;
  title: string;
  company: string;
  department: string;
  location: string;
  dates: string;
  year: string;
  current: boolean;
  paragraphs: string[];
  skills: string[];
  tools: string[];
};

export const getWork = cache(async (): Promise<WorkRole[]> => {
  const res = await client.queries.work({ relativePath: 'work.md' });
  return (res.data.work.work ?? [])
    .filter((item) => item !== null)
    .map((item, index) => {
      const dates = item.dates ?? '';
      return {
        id: `r${index + 1}`,
        title: item.title,
        company: item.company,
        department: item.department ?? '',
        location: item.location ?? '',
        dates,
        year: firstYear(dates),
        current: item.current ?? false,
        paragraphs: paragraphs(item.description),
        skills: splitList(item.skills),
        tools: splitList(item.tools),
      };
    });
});

/* ---------------------------------------------------------------- projects */

export const PROJECT_CATEGORIES = ['Analytics', 'AI', 'Finance', 'Strategy'] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type Project = {
  slug: string;
  number: string;
  name: string;
  summary: string;
  domain: string;
  category: ProjectCategory;
  skills: string[];
  tools: string[];
  role: string;
  overview: string;
  highlights: string[];
  outcome: string;
};

function toCategory(value: string | null | undefined): ProjectCategory {
  return PROJECT_CATEGORIES.includes(value as ProjectCategory)
    ? (value as ProjectCategory)
    : 'Analytics';
}

export const getProjects = cache(async (): Promise<Project[]> => {
  const res = await client.queries.projects({ relativePath: 'projects.md' });
  const items = (res.data.projects.projects ?? []).filter((item) => item !== null);

  // Two projects could in principle slugify the same way, so the second one
  // gets a suffix rather than quietly shadowing the first.
  const seen = new Map<string, number>();

  return items.map((item, index) => {
    const base = slugify(item.project_name);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return {
      slug: count === 0 ? base : `${base}-${count + 1}`,
      number: String(index + 1).padStart(2, '0'),
      name: item.project_name,
      summary: item.short_description ?? '',
      domain: item.domain ?? '',
      category: toCategory(item.category),
      skills: splitList(item.skills),
      tools: splitList(item.tools),
      role: item.role ?? '',
      overview: item.overview ?? '',
      highlights: (item.highlights ?? []).filter((h) => h !== null),
      outcome: item.outcome ?? '',
    };
  });
});

/* ---------------------------------------------------------- skills & tools */

export type NamedGroup = {
  name: string;
  items: string[];
};

// Declared rather than sorted, so each list reads from the fundamentals
// outward instead of alphabetically.
const SKILL_GROUP_ORDER = [
  'Languages and Querying',
  'Machine Learning and AI',
  'Data and Databases',
  'Business and Strategy',
];

const TOOL_GROUP_ORDER = [
  'Data and Modelling',
  'BI and Visualisation',
  'Apps and Dashboards',
  'Workflow and Platforms',
];

type Entry = { name: string; group: string; order: number };

function group(entries: Entry[], order: string[]): NamedGroup[] {
  return order
    .map((name) => ({
      name,
      items: entries
        .filter((entry) => entry.group === name)
        .sort((a, b) => a.order - b.order)
        .map((entry) => entry.name),
    }))
    .filter((g) => g.items.length > 0);
}

export const getSkills = cache(async (): Promise<NamedGroup[]> => {
  const res = await client.queries.skillConnection();
  const entries = (res.data.skillConnection.edges ?? [])
    .map((edge) => edge?.node)
    .filter((node) => node !== null && node !== undefined)
    .map((node) => ({ name: node.name, group: node.group ?? '', order: node.order ?? 0 }));
  return group(entries, SKILL_GROUP_ORDER);
});

export const getTools = cache(async (): Promise<NamedGroup[]> => {
  const res = await client.queries.toolConnection();
  const entries = (res.data.toolConnection.edges ?? [])
    .map((edge) => edge?.node)
    .filter((node) => node !== null && node !== undefined)
    .map((node) => ({ name: node.name, group: node.group ?? '', order: node.order ?? 0 }));
  return group(entries, TOOL_GROUP_ORDER);
});

/* --------------------------------------------------------------- education */

export type EducationEntry = {
  degree: string;
  school: string;
  location: string;
  dates: string;
  badge: string;
  details: string[];
};

export type Language = {
  name: string;
  level: string;
};

export type EducationContent = {
  entries: EducationEntry[];
  languages: Language[];
};

export const getEducation = cache(async (): Promise<EducationContent> => {
  const res = await client.queries.education({ relativePath: 'education.md' });
  const e = res.data.education;
  return {
    entries: (e.entries ?? [])
      .filter((entry) => entry !== null)
      .map((entry) => ({
        degree: entry.degree ?? '',
        school: entry.school ?? '',
        location: entry.location ?? '',
        dates: entry.dates ?? '',
        badge: entry.badge ?? '',
        details: (entry.details ?? []).filter((d) => d !== null),
      })),
    languages: (e.languages ?? [])
      .filter((item) => item !== null)
      .map((item) => ({ name: item.name ?? '', level: item.level ?? '' })),
  };
});
