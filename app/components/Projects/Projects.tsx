import client from '@/tina/__generated__/client';
import ProjectsClient from './ProjectsClient';

export default async function Projects() {
  const res = await client.queries.projects({ relativePath: 'projects.md' });

  // Tina types every list entry and every optional field as nullable, so drop
  // empty entries and fall back to an empty string rather than rendering null.
  const projects = (res?.data?.projects?.projects ?? [])
    .filter((item) => item !== null)
    .map((item) => ({
      name: item.project_name,
      short: item.short_description ?? '',
      domain: item.domain ?? '',
      tools: item.tools ?? '',
      role: item.role ?? '',
      overview: item.overview ?? '',
      highlights: (item.highlights ?? []).filter((h) => h !== null),
      outcome: item.outcome ?? '',
    }));

  return <ProjectsClient projects={projects} />;
}
