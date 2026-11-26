import Link from 'next/link';

type Target = { label: string; href: string };

/** The pair of links that closes every right pane. */
export default function PageNav({ prev, next }: { prev: Target; next: Target }) {
  return (
    <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-loblolly pt-6">
      <Link href={prev.href} className="label text-[13px] font-semibold text-gunmetal">
        ← {prev.label}
      </Link>
      <Link href={next.href} className="label text-[13px] font-semibold text-red">
        {next.label} →
      </Link>
    </div>
  );
}
