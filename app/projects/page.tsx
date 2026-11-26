import type { Metadata } from 'next';
import { getPage, getProjects } from '../lib/content';
import ProjectsBrowser from './ProjectsBrowser';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('projects');
  return {
    title: 'Projects',
    description: page.intro,
    alternates: { canonical: '/projects' },
  };
}

export default async function ProjectsPage() {
  const [page, projects] = await Promise.all([getPage('projects'), getProjects()]);

  return <ProjectsBrowser page={page} projects={projects} />;
}
