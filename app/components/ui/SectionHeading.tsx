import HeadingIcon from './HeadingIcon';

/**
 * Every section heading on the Skills page and in a project write-up is the
 * same thing: a mark, then a small uppercase label. Defined once here so the
 * icon, the gap and the spacing below cannot drift between pages.
 */
export default function SectionHeading({
  name,
  label,
  color,
  as: Tag = 'h2',
}: {
  /** Looked up in the icon registry, and used as the text unless label is set. */
  name: string;
  label?: string;
  color?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <HeadingIcon name={name} color={color} />
      <Tag className="label text-[13px] font-semibold text-gunmetal">{label ?? name}</Tag>
    </div>
  );
}
