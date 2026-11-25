'use client';

import { motion } from 'framer-motion';
import type { EducationContent } from '@/app/lib/content';
import { StaggerText, makeFadeUp } from '../motion';

const fadeUp = makeFadeUp({ y: 30, blur: 6, duration: 0.7 });

export default function EducationClient({ content }: { content: EducationContent }) {
  return (
    <section id="education" className="w-full py-20">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="text-[28px] sm:text-[30px] md:text-[32px] font-medium mb-22 text-foreground"
      >
        {content.heading}
      </motion.h2>

      <div className="flex flex-col space-y-20">
        {content.entries.map((entry, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col md:flex-row justify-between items-start border-b border-foreground/20 pb-10 gap-6 md:gap-10"
          >
            {/* Left: school, degree, dates */}
            <div className="flex flex-col space-y-2 md:w-1/2 ml-0 sm:ml-16 md:ml-20">
              <StaggerText
                as="h3"
                text={entry.school}
                className="text-[22px] sm:text-[26px] md:text-[32px] font-semibold text-foreground"
                animateWords
                stagger={0.06}
                delayChildren={0.05}
              />
              <p className="text-[16px] sm:text-[18px] md:text-[22px] font-medium text-[var(--color-s-text)]">
                {entry.degree}
              </p>
              <p className="text-[15px] sm:text-[16px] md:text-[18px] text-foreground/70">
                {entry.dates}
              </p>
            </div>

            {/* Right: details */}
            <ul className="md:w-1/2 space-y-3 text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed text-foreground/80 list-disc pl-5">
              {entry.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
