import client from '@/tina/__generated__/client';
import SkillsClient, { type SkillGroup } from './SkillsClient';

// Declared here rather than sorted alphabetically, so the list reads from
// languages through to business framings.
const GROUP_ORDER = [
  'Languages and Querying',
  'Machine Learning and AI',
  'Data and Databases',
  'BI and Visualisation',
  'Apps and APIs',
  'Business and Strategy',
];

export default async function Skills() {
  const res = await client.queries.skillConnection();

  const skills = (res?.data?.skillConnection?.edges ?? [])
    .map((edge) => edge?.node)
    .filter((node) => node !== null && node !== undefined)
    .map((node) => ({
      name: node.name,
      group: node.group ?? 'Other',
      order: node.order ?? 0,
    }));

  const groups: SkillGroup[] = GROUP_ORDER.map((name) => ({
    name,
    skills: skills.filter((s) => s.group === name).sort((a, b) => a.order - b.order),
  })).filter((g) => g.skills.length > 0);

  return <SkillsClient groups={groups} />;
}
