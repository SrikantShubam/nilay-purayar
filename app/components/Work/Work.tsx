import client from '@/tina/__generated__/client';
import WorkClient from './WorkClient';

export default async function Work() {
  const res = await client.queries.work({ relativePath: 'work.md' });
  const data = res?.data?.work;

  // Tina types every list entry and every optional field as nullable, so drop
  // empty entries and fall back to an empty string rather than rendering null.
  const workItems = (data?.work ?? [])
    .filter((item) => item !== null)
    .map((item) => ({
      title: item.title,
      company: item.company,
      dates: item.dates ?? '',
      description: item.description ?? '',
    }));

  return <WorkClient heading={data?.heading ?? ''} workItems={workItems} />;
}
