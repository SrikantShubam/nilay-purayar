import client from '@/tina/__generated__/client';
import WorkClient from './WorkClient';

export default async function Work() {
  const res = await client.queries.work({ relativePath: 'work.md' });

  // Tina types every list entry and every optional field as nullable, so drop
  // empty entries and fall back to an empty string rather than rendering null.
  const workItems = (res?.data?.work?.work ?? [])
    .filter((item) => item !== null)
    .map((item) => ({
      title: item.title,
      company: item.company,
      description: item.description ?? '',
    }));

  return <WorkClient workItems={workItems} />;
}
