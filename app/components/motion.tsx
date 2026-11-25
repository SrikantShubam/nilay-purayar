'use client';

import React from 'react';
import { motion, easeOut, type Easing, type Variants } from 'framer-motion';

/**
 * Shared animation presets and the StaggerText helper.
 *
 * Each section used to carry its own copy of these. The copies had drifted,
 * so the values below are kept configurable rather than unified: every
 * section still animates exactly as it did before.
 */

/** Reveal an element as it scrolls into view. */
export const makeFadeUp = ({
  y = 20,
  blur = 4,
  duration = 1.1,
  ease = easeOut,
}: {
  y?: number;
  blur?: number;
  duration?: number;
  ease?: Easing;
} = {}): Variants => ({
  hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration, ease },
  },
});

/** Parent that releases its children one after another. */
export const containerStagger = (
  stagger = 0.08,
  delayChildren = 0.1,
): Variants => ({
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Per-word reveal. Only applied where words animate individually. */
export const wordVariant: Variants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: easeOut },
  },
};

/**
 * Splits text into words so they can be revealed one at a time.
 *
 * `animateWords` is off by default. With it off the words carry no variants
 * and the text simply appears, which is what About, Projects and Contact
 * have always done. Banner and Work pass `animateWords` to get the
 * word-by-word reveal. The markup is the same either way, so line wrapping
 * does not shift between the two.
 */
export function StaggerText({
  text,
  as: Tag = 'span',
  className = '',
  viewportAmount = 0.6,
  animateWords = false,
  stagger = 0.1,
  delayChildren = 0.15,
}: {
  text: string;
  as?: React.ElementType;
  className?: string;
  viewportAmount?: number;
  animateWords?: boolean;
  stagger?: number;
  delayChildren?: number;
}) {
  const words = text.split(' ');

  return (
    <Tag className={className}>
      <motion.span
        variants={containerStagger(stagger, delayChildren)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: viewportAmount }}
        className="inline"
      >
        {words.map((word, i) => (
          <React.Fragment key={i}>
            <motion.span
              variants={animateWords ? wordVariant : undefined}
              className="inline-block"
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
