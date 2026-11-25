'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image, { type StaticImageData } from 'next/image';
import {
  motion,
  useReducedMotion,
  AnimatePresence,
  easeOut,
  cubicBezier,
  type Variants,
} from 'framer-motion';
import client from '@/tina/__generated__/client';
import ProjectsHero from '@/public/images/projects.png';
import CardIcon from '@/public/images/project-card-icon.png';
import { StaggerText, containerStagger, makeFadeUp } from '../motion';

const fadeUp = makeFadeUp();
const rowStagger = containerStagger(0.15, 0);

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

type ProjectItem = {
  project_name?: string | null;
  'project-name'?: string | null;
  short_description?: string | null;
  'short-description'?: string | null;
  long_description?: string | null;
  'long-description'?: string | null;
};

/**
 * The long description is a flat block of "Label: value" lines. Lines whose
 * first word ends in a colon render as a section label, everything else as a
 * paragraph. Structured Tina fields will replace this.
 */
function renderLongDesc(text: string) {
  if (!text) return null;
  return text
    .split('\n')
    .filter((line) => line.trim())
    .map((line, i) => {
      const trimmed = line.trim();
      if (trimmed.includes(':') && trimmed.match(/^[A-Z][a-z]+:/)) {
        const [label, ...contentParts] = trimmed.split(':');
        const content = contentParts.join(':').trim();
        return (
          <div key={i} className="mb-6 last:mb-0 text-center">
            <div className="font-bold text-xs sm:text-sm md:text-[15px] uppercase tracking-widest text-white/80 mb-2 drop-shadow-md">
              {label.trim()}
            </div>
            {content ? (
              <p className="text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed text-white font-medium drop-shadow-sm">
                {content}
              </p>
            ) : null}
          </div>
        );
      }
      return (
        <p
          key={i}
          className="text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed mb-4 last:mb-0 text-white/90 text-center drop-shadow-sm"
        >
          {trimmed}
        </p>
      );
    });
}

export default function Projects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    (async () => {
      try {
        const res = await client.queries.projects({ relativePath: 'projects.md' });
        // Tina types every list entry as nullable, so drop empty entries.
        const list = (res?.data?.projects?.projects ?? []).filter(
          (p) => p !== null,
        );
        setProjects(list);
      } catch (e) {
        console.error('Failed to load projects from Tina:', e);
      }
    })();
  }, []);

  const getName = (p: ProjectItem) => p.project_name ?? p['project-name'] ?? '';
  const getShort = (p: ProjectItem) => p.short_description ?? p['short-description'] ?? '';
  const getLong = (p: ProjectItem) => p.long_description ?? p['long-description'] ?? '';

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelected(null);
  }, []);

  useEffect(() => {
    if (!selected) return;
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, onKey]);

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
            const middle = projects[i];
            const right = projects[i + 1];
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
                {middle ? (
                  <Card
                    title={getName(middle)}
                    short={getShort(middle)}
                    icon={CardIcon}
                    prefersReducedMotion={prefersReducedMotion ?? false}
                    onOpen={() => setSelected(middle)}
                  />
                ) : (
                  <div />
                )}
                {right ? (
                  <Card
                    title={getName(right)}
                    short={getShort(right)}
                    icon={CardIcon}
                    prefersReducedMotion={prefersReducedMotion ?? false}
                    onOpen={() => setSelected(right)}
                  />
                ) : (
                  <div />
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
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <motion.div
              role="dialog"
              aria-modal="true"
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
                onClick={() => setSelected(null)}
                className="
                  absolute top-3 right-3 sm:top-5 sm:right-5
                  z-50 p-1.5 sm:p-2
                  rounded-full bg-white/15 hover:bg-white/25
                  text-white transition-colors duration-200
                  backdrop-blur-md
                "
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
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
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 tracking-tight drop-shadow-md">
                      {getName(selected)}
                    </h2>
                    <div className="h-1.5 w-14 sm:w-16 bg-white/40 mx-auto rounded-full mb-5 sm:mb-6 backdrop-blur-sm" />
                    <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium leading-relaxed drop-shadow-sm">
                      {getShort(selected)}
                    </p>
                  </div>

                  <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert text-center max-w-3xl mx-auto">
                    {renderLongDesc(getLong(selected))}
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
  title,
  short,
  icon,
  prefersReducedMotion,
  onOpen,
}: {
  title: string;
  short: string;
  icon: StaticImageData;
  prefersReducedMotion: boolean;
  onOpen: () => void;
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
        cursor-pointer
      "
      whileHover={!prefersReducedMotion ? { y: -4 } : undefined}
      onClick={onOpen}
    >
      <div className="absolute right-2 top-2 sm:right-3 sm:top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Image
          src={icon}
          alt=""
          width={32}
          height={32}
          className="sm:w-[38px] sm:h-[38px] opacity-100"
        />
      </div>
      <h3 className="text-[16px] sm:text-[20px] md:text-[24px] font-semibold leading-tight my-3 sm:my-4 md:my-5 transition-colors duration-300 group-hover:text-white">
        {title}
      </h3>
      <p className="text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed transition-colors duration-300 group-hover:text-white">
        {short}
      </p>
    </motion.div>
  );
}
