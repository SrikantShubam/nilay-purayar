'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, easeOut, type Variants } from 'framer-motion';
import type { NavbarSettings } from '@/app/lib/settings';

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + index * 0.08, duration: 0.35, ease: easeOut },
  }),
};

export default function NavBar({ navbar }: { navbar: NavbarSettings }) {
  const [isOpen, setIsOpen] = useState(false);
  const { logoText, menuItems, resumeLabel, resumeHref } = navbar;

  return (
    /* Sticky on a non-animated wrapper, otherwise the transform breaks position: sticky. */
    <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <motion.header
        className="w-full py-4 sm:py-6"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOut }}
      >
        <div className="mx-auto flex w-full items-center justify-between">
          <motion.a
            href="#home"
            className="text-sm font-normal uppercase tracking-[0.45em] text-foreground md:text-[19px]"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35, ease: easeOut }}
          >
            {logoText}
          </motion.a>

          <nav className="hidden flex-1 items-center justify-center lg:gap-48 md:gap-20 text-sm font-normal uppercase tracking-[0.35em] text-foreground lg:flex md:text-[19px]">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="transition-colors duration-300 hover:text-s-text"
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                custom={index}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.35, ease: easeOut }}
          >
            <Link
              href={resumeHref}
              download
              className="rounded-[20px] bg-s-text px-6 py-2 text-sm font-normal text-white transition-opacity duration-300 hover:opacity-90 md:text-[19px]"
            >
              {resumeLabel}
            </Link>
          </motion.div>

          <motion.button
            onClick={() => setIsOpen((p) => !p)}
            className="text-foreground lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden border-t border-foreground/10 bg-background/95 backdrop-blur"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <nav className="flex flex-col items-center gap-4 px-4 pt-4 pb-4 text-sm font-normal uppercase tracking-[0.2em] text-foreground md:text-base">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="w-full py-2 text-center transition-colors duration-200 hover:text-s-text"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: 0.25 }}
                  >
                    {item.label}
                  </motion.a>
                ))}

                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: 0.2, duration: 0.25 }}
                >
                  <Link
                    href={resumeHref}
                    download
                    className="mt-2 block rounded-[20px] bg-s-text px-6 py-3 text-center text-sm font-normal text-white transition-opacity duration-300 hover:opacity-90 md:text-base"
                    onClick={() => setIsOpen(false)}
                  >
                    {resumeLabel}
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
