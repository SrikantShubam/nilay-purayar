'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  easeOut,
  cubicBezier,
  type Variants,
} from 'framer-motion';
import ProjectsHero from '@/public/images/projects.png';
import CardIcon from '@/public/images/project-card-icon.png';
import { StaggerText, containerStagger, makeFadeUp } from '../motion';

export type Project = {
  name: string;
  short: string;
  domain: string;
  tools: string;
  role: string;
  overview: string;
  highlights: string[];
  outcome: string;
};

const fadeUp = makeFadeUp();
const rowStagger = containerStagger(0.15, 0);

const TITLE_ID = 'project-dialog-title';

const makeCardReveal = (reduced: boolean): Variants =>
  reduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.35, ease: easeOut } },
      }
    : {
        hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.55, ease: easeOut },
        },
      };

const backdropVar: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const panelVar = (reduced: boolean): Variants =>
  reduced
    ? {
        hidden: { opacity: 0, scale: 0.95 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: easeOut } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 40, scale: 0.98 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.4, ease: cubicBezier(0.16, 1, 0.3, 1) },
        },
        exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2 } },
      };

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 last:mb-0 text-center">
      <div className="font-bold text-xs sm:text-sm md:text-[15px] uppercase tracking-widest text-white/80 mb-2 drop-shadow-md">
        {label}
      </div>
      {children}
    </div>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed text-white font-medium drop-shadow-sm">
      {children}
    </p>
  );
}

/**
 * Renders the structured fields in the order they were authored:
 * Domain, Tools, Role (rare), Overview, Highlights, Outcome (usually).
 * Role and Outcome are skipped when empty.
 */
function ProjectDetail({ project }: { project: Project }) {
  return (
    <>
      {project.domain ? (
        <Section label="Domain">
          <Line>{project.domain}</Line>
        </Section>
      ) : null}
      {project.tools ? (
        <Section label="Tools">
          {/*
            Split on commas only. No tool name contains one, so each chip
            keeps its exact wording, including entries like
            "Python (Clustering & Regression)".
          */}
          <ul className="flex flex-wrap justify-center gap-2">
            {project.tools
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
              .map((tool) => (
                <li
                  key={tool}
                  className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-3 py-1.5 text-[14px] sm:text-[15px] font-medium text-white drop-shadow-sm"
                >
                  {tool}
                </li>
              ))}
          </ul>
        </Section>
      ) : null}
      {project.role ? (
        <Section label="Role">
          <Line>{project.role}</Line>
        </Section>
      ) : null}
      {project.overview ? (
        <Section label="Overview">
          <Line>{project.overview}</Line>
        </Section>
      ) : null}
      {project.highlights.length > 0 ? (
        <Section label="Highlights">
          {project.highlights.map((h, i) => (
            <p
              key={i}
              className="text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed mb-4 last:mb-0 text-white/90 text-center drop-shadow-sm"
            >
              {h}
            </p>
          ))}
        </Section>
      ) : null}
      {project.outcome ? (
        <Section label="Outcome">
          <Line>{project.outcome}</Line>
        </Section>
      ) : null}
    </>
  );
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const selected = openIndex === null ? null : projects[openIndex];

  /**
   * While the dialog is open: move focus into it, keep Tab inside it, stop the
   * page behind from scrolling, and hand focus back to the card on close.
   */
  useEffect(() => {
    if (openIndex === null) return;

    const triggeredBy = cardRefs.current[openIndex];
    closeRef.current?.focus();

    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenIndex(null);
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = previousOverflow;
      triggeredBy?.focus();
    };
  }, [openIndex]);

  return (
    <section id="projects" className="w-full py-14 sm:py-20 md:py-24">
      <div className="mx-auto space-y-8 sm:space-y-10 md:space-y-12 text-foreground max-w-6xl px-4 sm:px-6 lg:px-0">
        {/* Section icon */}
        <motion.div
          className="flex flex-col items-center gap-3 sm:gap-4 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            whileInView={{
              opacity: 1,
              scale: 1.1,
              filter: 'blur(0px)',
              transition: { duration: 1.2, ease: 'easeOut' },
            }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: [0, 18, -18, 10, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src={ProjectsHero}
                alt=""
                width={72}
                height={72}
                className="select-none py-4 sm:py-0 w-[52px] sm:w-[70px] md:w-[82px] h-auto"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.h2
          className="leading-tight md:py-10 py-6 hrb text-center max-w-3xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          <span className="block text-[14px] sm:text-[18px] md:text-[20px] uppercase tracking-[0.14em] mb-2 sm:mb-3">
            PROJECTS
          </span>
          <StaggerText
            as="span"
            className="block text-[18px] sm:text-[22px] md:text-[30px] lg:text-[34px]"
            text="A selection of projects that reflect my journey across data science, analytics, and strategy."
          />
        </motion.h2>

        {/* Cards */}
        <div className="flex flex-col space-y-6 sm:space-y-8 md:space-y-10">
          {Array.from({ length: Math.ceil(projects.length / 2) }).map((_, rowIdx) => {
            const i = rowIdx * 2;
            return (
              <motion.div
                key={`row-${rowIdx}`}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                variants={rowStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                {/* Empty column on desktop only, to keep the centred look */}
                <div className="hidden lg:block" />
                {[i, i + 1].map((index) =>
                  projects[index] ? (
                    <Card
                      key={index}
                      project={projects[index]}
                      icon={CardIcon}
                      prefersReducedMotion={prefersReducedMotion ?? false}
                      onOpen={() => setOpenIndex(index)}
                      buttonRef={(el) => {
                        cardRefs.current[index] = el;
                      }}
                    />
                  ) : (
                    <div key={index} />
                  ),
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail popup */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4"
            variants={backdropVar}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={() => setOpenIndex(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={TITLE_ID}
              className="
                relative w-full h-full
                sm:h-auto sm:max-h-[90vh] sm:max-w-4xl
                flex flex-col
                sm:rounded-[24px] lg:rounded-[32px]
                overflow-hidden shadow-2xl
              "
              style={{
                background: 'linear-gradient(90deg, #CF6345 0%, #C98A74 48%, #C2B5A8 100%)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2)',
              }}
              variants={panelVar(prefersReducedMotion ?? false)}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Close project details"
                className="
                  absolute top-3 right-3 sm:top-5 sm:right-5
                  z-50 p-1.5 sm:p-2
                  rounded-full bg-white/15 hover:bg-white/25
                  text-white transition-colors duration-200
                  backdrop-blur-md
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                "
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Background visuals */}
              <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <motion.div
                  animate={prefersReducedMotion ? {} : { rotate: [0, 360] }}
                  transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
                  className="relative w-[140%] max-w-none sm:w-[720px] h-auto aspect-square flex items-center justify-center"
                >
                  <Image
                    src={ProjectsHero}
                    alt=""
                    className="object-cover opacity-75 drop-shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                    priority
                  />
                </motion.div>
                <div
                  className="absolute inset-0 z-[1]"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                  }}
                />
                <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/10 to-transparent mix-blend-overlay" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                <div className="flex flex-col items-center px-4 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16 min-h-full">
                  <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
                    <h2
                      id={TITLE_ID}
                      className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 tracking-tight drop-shadow-md"
                    >
                      {selected.name}
                    </h2>
                    <div className="h-1.5 w-14 sm:w-16 bg-white/40 mx-auto rounded-full mb-5 sm:mb-6 backdrop-blur-sm" />
                    <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium leading-relaxed drop-shadow-sm">
                      {selected.short}
                    </p>
                  </div>

                  <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert text-center max-w-3xl mx-auto">
                    <ProjectDetail project={selected} />
                  </div>

                  <div className="h-10 sm:h-14" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Card({
  project,
  icon,
  prefersReducedMotion,
  onOpen,
  buttonRef,
}: {
  project: Project;
  icon: StaticImageData;
  prefersReducedMotion: boolean;
  onOpen: () => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}) {
  const cardReveal = makeCardReveal(prefersReducedMotion);

  return (
    <motion.div
      variants={cardReveal}
      className="
        group relative
        rounded-[14px] sm:rounded-[18px]
        border border-black
        hover:border-transparent
        p-4 sm:p-5 md:p-6
        text-foreground
        transition-all duration-300
        hover:bg-[color:var(--color-s-text)]
        has-[:focus-visible]:bg-[color:var(--color-s-text)]
        has-[:focus-visible]:border-transparent
        has-[:focus-visible]:ring-2
        has-[:focus-visible]:ring-[color:var(--color-s-text)]
        has-[:focus-visible]:ring-offset-2
        has-[:focus-visible]:ring-offset-background
        cursor-pointer
      "
      whileHover={!prefersReducedMotion ? { y: -4 } : undefined}
    >
      <div className="absolute right-2 top-2 sm:right-3 sm:top-3 opacity-0 group-hover:opacity-100 group-has-[:focus-visible]:opacity-100 transition-opacity duration-300">
        <Image
          src={icon}
          alt=""
          width={32}
          height={32}
          className="sm:w-[38px] sm:h-[38px] opacity-100"
        />
      </div>

      <h3 className="text-[16px] sm:text-[20px] md:text-[24px] font-semibold leading-tight my-3 sm:my-4 md:my-5 transition-colors duration-300 group-hover:text-white group-has-[:focus-visible]:text-white">
        {/*
          The button carries the whole card's click target via a stretched
          pseudo-element, so the accessible name stays just the project title
          while the full card remains clickable.
        */}
        <button
          ref={buttonRef}
          type="button"
          onClick={onOpen}
          className="text-left before:absolute before:inset-0 before:content-[''] focus:outline-none"
        >
          {project.name}
        </button>
      </h3>

      <p className="text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed transition-colors duration-300 group-hover:text-white group-has-[:focus-visible]:text-white">
        {project.short}
      </p>
    </motion.div>
  );
}
