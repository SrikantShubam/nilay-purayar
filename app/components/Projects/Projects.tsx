// 'use client';

// import React, { useEffect, useState, useCallback } from 'react';
// import Image from 'next/image';
// import { motion, useReducedMotion } from 'framer-motion';
// import client from '@/tina/__generated__/client';
// import AboutHero from '@/public/projects.png';
// import SmallIcon from '@/public/active state projects.png';

// /* ===== Animation presets (header + rows) ===== */
// const fadeUp = {
//   hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
//   show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease: 'easeOut' } },
// };
// const containerStagger = (stagger = 0.1, delayChildren = 0.2) => ({
//   hidden: { opacity: 1 },
//   show: { opacity: 1, transition: { staggerChildren: stagger, delayChildren } },
// });
// const rowStagger = containerStagger(0.15, 0);

// /* Card reveal (on scroll) */
// const makeCardReveal = (reduced: boolean) =>
//   reduced
//     ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } } }
//     : { hidden: { opacity: 0, y: 18, filter: 'blur(8px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: 'easeOut' } } };

// /* Popout animations */
// const backdropVar = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } }, exit: { opacity: 0, transition: { duration: 0.2 } } };
// const panelVar = (reduced: boolean) =>
//   reduced
//     ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } }, exit: { opacity: 0, transition: { duration: 0.2 } } }
//     : { hidden: { opacity: 0, y: 24, filter: 'blur(10px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: 'easeOut' } }, exit: { opacity: 0, y: 10, filter: 'blur(6px)', transition: { duration: 0.25, ease: 'easeIn' } } };

// /* ===== Reusable staggered text ===== */
// function StaggerText({
//   text,
//   as: Tag = 'span',
//   className = '',
//   by = 'word',
//   viewportAmount = 0.6,
// }: {
//   text: string;
//   as?: any;
//   className?: string;
//   by?: 'word' | 'char';
//   viewportAmount?: number;
// }) {
//   const items = by === 'word' ? text.split(' ') : [...text];
//   return (
//     <Tag className={className}>
//       <motion.span
//         variants={containerStagger(0.1, 0.15)}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: viewportAmount }}
//         className="inline"
//       >
//         {items.map((t, i) => (
//           <motion.span key={i} className="inline-block mr-[0.25em]">
//             {t}
//           </motion.span>
//         ))}
//       </motion.span>
//     </Tag>
//   );
// }

// type ProjectItem = {
//   project_name?: string;
//   'project-name'?: string;
//   short_description?: string;
//   'short-description'?: string;
//   long_description?: string;
//   'long-description'?: string;
// };

// /* ===== Render long description with section styling ===== */
// function renderLongDesc(text: string) {
//   if (!text) return null;
//   return text
//     .split('\n')
//     .filter(line => line.trim())
//     .map((line, i) => {
//       const trimmed = line.trim();
//       if (trimmed.includes(':') && trimmed.match(/^[A-Z][a-z]+:/)) {
//         // Section header like "Domain:", "Tech Stack:", etc.
//         const [label, ...contentParts] = trimmed.split(':');
//         const content = contentParts.join(':').trim();
//         return (
//           <div key={i} className="mb-4 last:mb-0">
//             <div className="font-semibold text-[18px] sm:text-[20px] mb-1">{label.trim()}:</div>
//             {content ? (
//               <p className="text-[16px] sm:text-[18px] leading-relaxed ml-1">{content}</p>
//             ) : null}
//           </div>
//         );
//       } else {
//         // Regular line (e.g., multi-line content under a section)
//         return (
//           <p key={i} className="text-[16px] sm:text-[18px] leading-relaxed mb-2 last:mb-0 ml-1">
//             {trimmed}
//           </p>
//         );
//       }
//     });
// }

// export default function Projects() {
//   const [projects, setProjects] = useState<ProjectItem[]>([]);
//   const [selected, setSelected] = useState<ProjectItem | null>(null);
//   const prefersReducedMotion = useReducedMotion();

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await client.queries.projects({ relativePath: 'projects.md' });
//         const list: ProjectItem[] = (res as any)?.data?.projects?.projects ?? [];
//         setProjects(list);
//       } catch (e) {
//         console.error('Failed to load projects from Tina:', e);
//       }
//     })();
//   }, []);

//   const getName = (p: ProjectItem) => p.project_name ?? (p as any)['project-name'] ?? '';
//   const getShort = (p: ProjectItem) => p.short_description ?? (p as any)['short-description'] ?? '';
//   const getLong = (p: ProjectItem) => p.long_description ?? (p as any)['long-description'] ?? '';

//   /* Close on Esc */
//   const onKey = useCallback((e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); }, []);
//   useEffect(() => {
//     if (!selected) return;
//     window.addEventListener('keydown', onKey);
//     return () => window.removeEventListener('keydown', onKey);
//   }, [selected, onKey]);

//   return (
//     <section className="w-full py-20 sm:py-24 md:py-28">
//       <div className="mx-auto space-y-10 sm:space-y-12 md:space-y-14 text-foreground max-w-7xl">
//         {/* ===== Header ===== */}
//         <motion.div
//           className="flex flex-col items-center gap-4 text-center"
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.5 }}
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
//             whileInView={{ opacity: 1, scale: 1.2, filter: 'blur(0px)', transition: { duration: 1.2, ease: 'easeOut' } }}
//             viewport={{ once: true }}
//           >
//             <motion.div
//               animate={{ rotate: [0, 18, -18, 10, 0] }}
//               transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
//             >
//               <Image
//                 src={AboutHero}
//                 alt="Projects icon"
//                 width={80}
//                 height={80}
//                 className="select-none py-6 sm:py-0 w-[60px] sm:w-[75px] md:w-[90px] h-auto"
//                 priority
//               />
//             </motion.div>
//           </motion.div>
//         </motion.div>

//         <motion.h3
//           className="leading-tight md:py-14 py-8 hrb"
//           variants={fadeUp}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.6 }}
//         >
//           <span className="block md:inline text-[18px] sm:text-[24px] md:text-[22px] uppercase">
//             PROJECTS&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
//           </span>
//           <StaggerText
//             as="span"
//             className="text-[18px] sm:text-[24px] md:text-[36px]"
//             text="A selection of projects that reflect my journey across data science, analytics, and strategy — showcasing how I apply data-driven thinking to solve real-world business problems."
//             by="word"
//           />
//         </motion.h3>

//         {/* ===== Cards grid (layout preserved) ===== */}
//         <div className="flex flex-col space-y-8 sm:space-y-9 md:space-y-10">
//           {Array.from({ length: Math.ceil(projects.length / 2) }).map((_, rowIdx) => {
//             const i = rowIdx * 2;
//             const middle = projects[i];
//             const right = projects[i + 1];

//             return (
//               <motion.div
//                 key={`row-${rowIdx}`}
//                 className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
//                 variants={rowStagger}
//                 initial="hidden"
//                 whileInView="show"
//                 viewport={{ once: true, amount: 0.25 }}
//               >
//                 {/* spacer */}
//                 <div className="hidden md:block" />

//                 {/* Middle card */}
//                 {middle ? (
//                   <Card
//                     title={getName(middle)}
//                     short={getShort(middle)}
//                     icon={SmallIcon}
//                     prefersReducedMotion={prefersReducedMotion}
//                     onOpen={() => setSelected(middle)}
//                   />
//                 ) : (
//                   <div />
//                 )}

//                 {/* Right card */}
//                 {right ? (
//                   <Card
//                     title={getName(right)}
//                     short={getShort(right)}
//                     icon={SmallIcon}
//                     prefersReducedMotion={prefersReducedMotion}
//                     onOpen={() => setSelected(right)}
//                   />
//                 ) : (
//                   <div />
//                 )}
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ===== Popout (Modal) — Mobile/Tablet responsive; Image+Ribbed hidden < lg ===== */}
//    {selected && (
//   <motion.div
//     className="fixed inset-0 z-50 flex items-center justify-center"
//     variants={backdropVar}
//     initial="hidden"
//     animate="show"
//     exit="exit"
//     // Close on backdrop click
//     onClick={() => setSelected(null)}
//   >
//     {/* Backdrop */}
//     <div className="absolute inset-0 bg-black/70" />

//     {/* Modal Panel */}
//     <motion.div
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="project-popout-title"
//       className="relative w-full max-w-7xl h-screen sm:h-auto sm:max-h-[95vh] flex flex-col sm:flex-row"
//       variants={panelVar(prefersReducedMotion)}
//       onClick={(e) => e.stopPropagation()}
//       // Optional: drag-to-close on mobile (requires framer-motion drag)
//       drag="y"
//       dragElastic={0.2}
//       dragConstraints={{ top: 0, bottom: 100 }}
//       onDragEnd={(_, info) => {
//         if (info.offset.y > 150) setSelected(null);
//       }}
//       className="relative w-full max-w-7xl h-screen sm:h-auto sm:max-h-[95vh] flex flex-col sm:flex-row cursor-default"
//     >
//       <div
//         className="relative w-full h-full rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20"
//         style={{
//           background: 'linear-gradient(90deg, #CF6345 0%, #C98A74 48%, #C2B5A8 100%)',
//           boxShadow: '0 20px 50px rgba(0,0,0,0.4), inset 0 0 60px rgba(255,255,255,0.08)',
//         }}
//       >
//         {/* Close Button */}
//         <button
//           onClick={() => setSelected(null)}
//           aria-label="Close modal"
//           className="absolute top-4 right-4 z-50 text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full p-2 transition"
//         >
//           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//             <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
//           </svg>
//         </button>

//         {/* Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
//           {/* Visual Column - Hidden on <lg, floating animated image */}
//           <div className="hidden lg:flex lg:col-span-4 xl:col-span-3 items-center justify-center relative p-8">
//             <motion.div
//               className="relative z-10"
//               animate={
//                 prefersReducedMotion
//                   ? {}
//                   : {
//                       y: [0, -20, 0],
//                       rotate: [0, 3, 0],
//                     }
//               }
//               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//             >
//               <Image
//                 src={AboutHero}
//                 alt={`${getName(selected)} visual`}
//                 className="max-h-[280px] w-auto select-none drop-shadow-2xl"
//                 priority
//               />
//             </motion.div>

//             {/* Ribbed Glass Overlay */}
//             <div className="absolute inset-0">
//               <RibbedGlass ribHeights={[70, 80, 65, 75, 60, 85]} />
//             </div>

//             {/* Subtle inner glow */}
//             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
//           </div>

//           {/* Text Content Column */}
//           <div className="lg:col-span-8 xl:col-span-9 flex flex-col h-full text-white">
//             <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
//               <div className="max-w-3xl mx-auto">
//                 <h2
//                   id="project-popout-title"
//                   className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8 sm:mb-12 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
//                 >
//                   {getName(selected)}
//                 </h2>

//                 <div className="prose prose-invert prose-lg max-w-none space-y-6 text-white/90 leading-relaxed">
//                   {renderLongDesc(getLong(selected))}
//                 </div>
//               </div>
//             </div>

//             {/* Optional: Mobile-only visual peek at bottom */}
//             <div className="lg:hidden relative h-32 -mb-8 -mx-6 overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/40" />
//               <motion.div
//                 className="absolute bottom-4 left-1/2 -translate-x-1/2"
//                 animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
//                 transition={{ duration: 6, repeat: Infinity }}
//               >
//                 <Image
//                   src={AboutHero}
//                   alt=""
//                   className="h-32 w-auto opacity-60 blur-sm"
//                 />
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   </motion.div>
// )}
//     </section>

    
//   );
// }

// /* ===== Card (unchanged desktop behavior) ===== */
// function Card({
//   title,
//   short,
//   icon,
//   prefersReducedMotion,
//   onOpen,
// }: {
//   title: string;
//   short: string;
//   icon: any;
//   prefersReducedMotion: boolean;
//   onOpen: () => void;
// }) {
//   const cardReveal = makeCardReveal(prefersReducedMotion);

//   return (
//     <motion.div
//       variants={cardReveal}
//       className="group relative rounded-[18px] border border-black hover:border-none p-5 sm:p-6 md:p-7 text-foreground transition-all duration-300 hover:bg-[color:var(--color-s-text)]"
//       whileHover={!prefersReducedMotion ? { y: -2 } : undefined}
//       onClick={onOpen}
//     >
//       {/* corner icon - opacity on hover only */}
//       <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//         <Image src={icon} alt="" width={38} height={38} className="opacity-100" />
//       </div>

//       <h5 className="text-[18px] sm:text-[24px] md:text-[28px] font-semibold leading-tight my-4 sm:my-5 md:my-6 transition-colors duration-300 group-hover:text-white">
//         {title}
//       </h5>
//       <p className="text-[15px] sm:text-[17px] md:text-[20px] leading-relaxed transition-colors duration-300 group-hover:text-white">
//         {short}
//       </p>
//     </motion.div>
//   );
// }

// /* ===== Ribbed Glass (kept as-is; now only renders on lg+ due to parent hidden classes) ===== */
// interface RibbedGlassProps {
//   ribHeights?: number[]; // Array of heights in % for each rib (e.g., [60, 70, 80, ...]); defaults to uniform 70%
// }

// function RibbedGlass({ ribHeights = [70, 70, 70, 70, 70, 70] }: RibbedGlassProps) {
//   // 6 ribs; NO GAP; full width coverage
//   const ribs = 6;
//   const ribWidth = 40 / ribs; // Percentage for even, seamless fill

//   // Glass properties applied via inline styles (approximations in CSS)
//   const glassStyle = {
//     backgroundColor: 'rgba(255, 255, 255, 0.33)', // Light opacity 33%
//     backdropFilter: 'blur(12px)', // Frost: 12px
//     filter: `blur(0.29px) brightness(0.86) hue-rotate(28deg)`, // Refraction ~29% blur, dispersion ~28 hue-rotate, intensity 86%
//     boxShadow: `0 1.14rem 2.4rem rgba(0,0,0,0.15)`, // Depth: 1.14 (y-offset in rem)
//     border: '1px solid rgba(255, 255, 255, 0.3)',
//   } as React.CSSProperties;

//   return (
//     <div className="absolute inset-0 z-10 flex items-center justify-center">
//       <div
//         className="flex absolute items-center justify-center"
//         style={{
//           height: '70%', // Overall wrapper height
//           width: '100%',
//           WebkitMaskImage:
//             'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 12%, rgba(0,0,0,0.9) 88%, rgba(0,0,0,0) 100%)',
//           maskImage:
//             'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 12%, rgba(0,0,0,0.9) 88%, rgba(0,0,0,0) 100%)',
//           gap: '0px',
//         }}
//       >
//         {Array.from({ length: ribs }).map((_, i) => {
//           const height = ribHeights[i] || 50;
//           return (
//             <div
//               key={i}
//               className="flex items-center justify-center"
//               style={{
//                 ...glassStyle,
//                 width: `${ribWidth}%`,
//                 height: `${height}%`,
//               }}
//             />
//           );
//         })}
//       </div>
//       <div className="absolute inset-0" />
//     </div>
//   );
// }
// import { useState } from "react";
// const [data,setData]=useState(0);

// function incrementsetData{
//   setData=data+1
// }









































'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import client from '@/tina/__generated__/client';
import AboutHero from '@/public/projects.png';
import SmallIcon from '@/public/active state projects.png';

/* ===== Animation presets ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: 'easeOut' },
  },
};
const containerStagger = (stagger = 0.1, delayChildren = 0.2) => ({
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});
const rowStagger = containerStagger(0.15, 0);

/* Card reveal */
const makeCardReveal = (reduced: boolean) =>
  reduced
    ? {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { duration: 0.35, ease: 'easeOut' },
        },
      }
    : {
        hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.55, ease: 'easeOut' },
        },
      };

/* Popout animations */
const backdropVar = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const panelVar = (reduced: boolean) =>
  reduced
    ? {
        hidden: { opacity: 0, scale: 0.95 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.25, ease: 'easeOut' },
        },
        exit: {
          opacity: 0,
          scale: 0.95,
          transition: { duration: 0.2 },
        },
      }
    : {
        hidden: { opacity: 0, y: 40, scale: 0.98 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        },
        exit: {
          opacity: 0,
          y: 20,
          scale: 0.98,
          transition: { duration: 0.2 },
        },
      };

/* ===== Reusable Stagger Text ===== */
function StaggerText({
  text,
  as: Tag = 'span',
  className = '',
  by = 'word',
  viewportAmount = 0.6,
}: {
  text: string;
  as?: any;
  className?: string;
  by?: 'word' | 'char';
  viewportAmount?: number;
}) {
  const items = by === 'word' ? text.split(' ') : [...text];
  return (
    <Tag className={className}>
      <motion.span
        variants={containerStagger(0.1, 0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: viewportAmount }}
        className="inline"
      >
        {items.map((t, i) => (
          <React.Fragment key={i}>
            <motion.span className="inline-block">
              {t}
            </motion.span>
            {by === 'word' && i < items.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}

type ProjectItem = {
  project_name?: string;
  'project-name'?: string;
  short_description?: string;
  'short-description'?: string;
  long_description?: string;
  'long-description'?: string;
};

/* ===== Render long description (White Text for Gradient) ===== */
function renderLongDesc(text: string) {
  if (!text) return null;
  return text
    .split('\n')
    .filter((line) => line.trim())
    .map((line, i) => {
      const trimmed = line.trim();
      // Check for section headers
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
      } else {
        return (
          <p
            key={i}
            className="text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed mb-4 last:mb-0 text-white/90 text-center drop-shadow-sm"
          >
            {trimmed}
          </p>
        );
      }
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
        const list: ProjectItem[] = (res as any)?.data?.projects?.projects ?? [];
        setProjects(list);
      } catch (e) {
        console.error('Failed to load projects from Tina:', e);
      }
    })();
  }, []);

  const getName = (p: ProjectItem) =>
    p.project_name ?? (p as any)['project-name'] ?? '';
  const getShort = (p: ProjectItem) =>
    p.short_description ?? (p as any)['short-description'] ?? '';
  const getLong = (p: ProjectItem) =>
    p.long_description ?? (p as any)['long-description'] ?? '';

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
        {/* Page Header */}
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
                src={AboutHero}
                alt="Projects icon"
                width={72}
                height={72}
                className="select-none py-4 sm:py-0 w-[52px] sm:w-[70px] md:w-[82px] h-auto"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.h3
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
            by="word"
          />
        </motion.h3>

        {/* Cards Grid */}
        <div className="flex flex-col space-y-6 sm:space-y-8 md:space-y-10">
          {Array.from({ length: Math.ceil(projects.length / 2) }).map((_, rowIdx) => {
            const i = rowIdx * 2;
            const middle = projects[i];
            const right = projects[i + 1];

            return (
              <motion.div
                key={`row-${rowIdx}`}
                className="
                  grid grid-cols-1 
                  md:grid-cols-2 
                  lg:grid-cols-3 
                  gap-4 sm:gap-6 md:gap-8
                "
                variants={rowStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                {/* Empty column only on desktop to keep the “centered” look */}
                <div className="hidden lg:block" />
                {middle ? (
                  <Card
                    title={getName(middle)}
                    short={getShort(middle)}
                    icon={SmallIcon}
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
                    icon={SmallIcon}
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

      {/* ===== MODAL (STACKED APPEARANCE) ===== */}
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
            {/* Dark Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal Panel */}
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
                background:
                  'linear-gradient(90deg, #CF6345 0%, #C98A74 48%, #C2B5A8 100%)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2)',
              }}
              variants={panelVar(prefersReducedMotion ?? false)}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
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
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* LAYER 0: BACKGROUND VISUALS */}
              <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
                <motion.div
                  animate={
                    prefersReducedMotion ? {} : { rotate: [0, 360] }
                  }
                  transition={{
                    duration: 80,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="
                    relative 
                    w-[140%] max-w-none 
                    sm:w-[720px] 
                    h-auto aspect-square 
                    flex items-center justify-center
                  "
                >
                  <Image
                    src={AboutHero}
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

              {/* LAYER 1: CONTENT */}
              <div className="relative z-10 flex flex-col h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                <div className="flex flex-col items-center px-4 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16 min-h-full">
                  {/* Title Header */}
                  <div className="text-center mb-8 sm:mb-10 max-w-2xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 tracking-tight drop-shadow-md">
                      {getName(selected)}
                    </h2>
                    <div className="h-1.5 w-14 sm:w-16 bg-white/40 mx-auto rounded-full mb-5 sm:mb-6 backdrop-blur-sm" />
                    <p className="text-base sm:text-lg md:text-xl text-white/90 font-medium leading-relaxed drop-shadow-sm">
                      {getShort(selected)}
                    </p>
                  </div>

                  {/* Description Body */}
                  <div className="prose prose-sm sm:prose-base md:prose-lg prose-invert text-center max-w-3xl mx-auto">
                    {renderLongDesc(getLong(selected))}
                  </div>

                  {/* Bottom Padding for scroll */}
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

/* ===== Card Component ===== */
function Card({
  title,
  short,
  icon,
  prefersReducedMotion,
  onOpen,
}: {
  title: string;
  short: string;
  icon: any;
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

      <h5 className="text-[16px] sm:text-[20px] md:text-[24px] font-semibold leading-tight my-3 sm:my-4 md:my-5 transition-colors duration-300 group-hover:text-white">
        {title}
      </h5>
      <p className="text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed transition-colors duration-300 group-hover:text-white">
        {short}
      </p>
    </motion.div>
  );
}
