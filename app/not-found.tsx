import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="shell py-20 sm:py-28">
      <div className="label mb-3.5 text-xs font-semibold text-red">Error 404</div>
      <h1 className="display-condensed mb-5 text-[52px] leading-[0.92] sm:text-[72px]">
        Page not
        <br />
        found
      </h1>
      <p className="m-0 mb-8 max-w-[420px] text-[17px] text-gunmetal">
        That address does not match anything on this site. The links below cover everything here.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="label inline-flex min-h-[48px] items-center bg-navy px-[26px] text-[13px] font-semibold text-white hover:text-white"
        >
          Overview
        </Link>
        <Link
          href="/projects"
          className="label inline-flex min-h-[48px] items-center border border-navy px-[26px] text-[13px] font-semibold"
        >
          Projects
        </Link>
      </div>
    </div>
  );
}
