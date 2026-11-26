'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { NavbarSettings } from '@/app/lib/settings';

/**
 * A project page keeps Projects marked, so the nav always says where you are.
 */
function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * The six labels plus the logo and the button need about 840px to sit on one
 * line, so anything narrower than lg gets the menu button instead. That is the
 * same breakpoint where the two-pane layout stacks, so the whole site changes
 * shape in one step rather than two.
 */
export default function SiteHeader({ navbar }: { navbar: NavbarSettings }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-loblolly bg-white">
      <div className="shell flex min-h-[60px] flex-wrap items-center gap-x-7 gap-y-3 lg:min-h-[68px]">
        <Link
          href="/"
          className="label text-base font-semibold"
          style={{ letterSpacing: '0.14em' }}
          onClick={() => setOpen(false)}
        >
          {navbar.logoText}
        </Link>

        <nav aria-label="Main" className="hidden min-w-0 flex-[1_1_420px] lg:block">
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
            className="label resume hidden min-h-[44px] items-center px-[22px] text-[13px] font-semibold lg:inline-flex"
          >
            {navbar.resumeLabel}
          </a>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2.5 ml-auto inline-flex h-11 w-11 items-center justify-center text-navy lg:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <>
                <path d="M5 5 L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M19 5 L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <path d="M3 6 H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 12 H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 18 H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Overlays the page rather than pushing it, so the bar stays 60px tall. */}
      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="absolute inset-x-0 top-full border-b border-loblolly bg-white lg:hidden"
        >
          <ul className="shell m-0 flex list-none flex-col p-0 py-2 text-[15px]">
            {navbar.menuItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-rule last:border-b-0">
                  <Link
                    href={item.href}
                    // No sliding underline here: stacked, it reads as a second
                    // rule under every row. The page you are on is simply red.
                    className={`block py-3.5 ${active ? 'text-red' : ''}`}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {navbar.resumeHref ? (
            <div className="shell pb-5 pt-2">
              <a
                href={navbar.resumeHref}
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="label resume flex min-h-[48px] items-center justify-center text-[13px] font-semibold"
              >
                {navbar.resumeLabel}
              </a>
            </div>
          ) : null}
        </nav>
      ) : null}
    </header>
  );
}
