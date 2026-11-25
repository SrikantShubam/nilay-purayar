import { getEducation } from '@/app/lib/content';
import EducationClient from './EducationClient';

export default async function Education() {
  const content = await getEducation();
  return <EducationClient content={content} />;
}
