'use client';

import Link from 'next/link';
import { motion, easeOut, type Variants } from 'framer-motion';
import type { FooterSettings, SocialLink } from '@/app/lib/settings';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: easeOut },
  },
};

const stagger: Variants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.15 } },
};

const linkItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const Chevron = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-transform duration-300 group-hover:translate-x-1"
    aria-hidden
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default function Footer({
  email,
  socials,
  footer,
}: {
  email: string;
  socials: SocialLink[];
  footer: FooterSettings;
}) {

  return (
    <motion.footer
      className="w-full border-t border-foreground/10 py-12 text-foreground"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="mx-auto flex flex-col gap-8 px-6" variants={stagger}>
        <motion.div
          className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between"
          variants={stagger}
        >
          <motion.a
            href={`mailto:${email}`}
            className="text-[36px] font-semibold leading-none tracking-tight transition-colors duration-300 hover:text-[color:var(--color-s-text)]"
            variants={linkItem}
          >
            {email}
          </motion.a>

          <motion.nav
            className="flex items-center justify-end gap-12 text-[20px] font-medium"
            variants={stagger}
          >
            {socials.map(({ label, href }) => {
              const isExternal = href.startsWith('http');
              return (
                <motion.div key={label} variants={linkItem}>
                  <Link
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="group flex items-center align-center md:gap-2 transition-colors duration-300 hover:text-[color:var(--color-s-text)]"
                  >
                    <span>{label}</span>
                    <Chevron />
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>
        </motion.div>

        <motion.p
          className="flex items-center gap-3 text-sm sm:justify-end text-left md:text-center"
          variants={linkItem}
        >
          <span>{footer.creditText}</span>
          <Link
            href={footer.creditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-foreground transition-colors duration-300 hover:text-[color:var(--color-s-text)]"
          >
            <span>{footer.creditName}</span>
            <Chevron />
          </Link>
        </motion.p>
      </motion.div>
    </motion.footer>
  );
}
