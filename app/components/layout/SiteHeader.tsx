'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavbarSettings } from '@/app/lib/settings';

/**
 * A project page keeps Projects marked, so the nav always says where you are.
 */
function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader({ navbar }: { navbar: NavbarSettings }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-loblolly bg-white">
      <div className="shell flex min-h-[68px] flex-wrap items-center gap-x-7 gap-y-3 py-3 md:py-0">
        <Link
          href="/"
          className="label text-base font-semibold"
          style={{ letterSpacing: '0.14em' }}
        >
          {navbar.logoText}
        </Link>

        <nav aria-label="Main" className="min-w-0 flex-[1_1_420px]">
          <ul className="m-0 flex list-none flex-wrap gap-x-7 gap-y-2 p-0 text-sm">
            {navbar.menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="navlink"
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {navbar.resumeHref ? (
          <a
            href={navbar.resumeHref}
            target="_blank"
            rel="noopener"
            className="label resume inline-flex min-h-[44px] items-center px-[22px] text-[13px] font-semibold"
          >
            {navbar.resumeLabel}
          </a>
        ) : null}
      </div>
    </header>
  );
}
