'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import StarImg from '@/public/images/star.png';
import { StaggerText, containerStagger, makeFadeUp, wordVariant } from '../motion';
import type { BannerContent } from '@/app/lib/content';

const fadeUp = makeFadeUp({ y: 24, blur: 6, duration: 0.8 });

export default function Banner({ content }: { content: BannerContent }) {
  return (
    <motion.section
      id="home"
      className="w-full py-12 "
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Rotating Star */}
      <motion.div
        className="w-full flex justify-start mb-10"
        initial={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
        whileInView={{
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.7, ease: 'easeOut' },
        }}
        viewport={{ once: true }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
        >
          <Image
            src={StarImg}
            alt=""
            width={100}
            height={100}
            className="select-none w-[70px] sm:w-[85px] md:w-[100px] h-auto"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Text Columns */}
      <motion.div
        className="grid grid-cols-1 hrb py-16 md:grid-cols-2 gap-y-10 md:gap-x-20"
        variants={containerStagger(0.1, 0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        {/* Left Column */}
        <motion.div variants={fadeUp} className="flex h-full flex-col justify-end">
          <StaggerText
            as="h1"
            text={content.name}
            className="text-[30px] md:text-[57px] font-medium text-foreground leading-tight"
            animateWords
            stagger={0.06}
            delayChildren={0.05}
          />
        </motion.div>

        {/* Right Column */}
        <motion.div variants={fadeUp}>
          <p className="relative text-[18px] md:text-[28px] font-poppins font-regular leading-relaxed md:leading-[1.5] text-foreground">
            <StaggerText
              as="span"
              text={content.heroText}
              animateWords
              stagger={0.06}
              delayChildren={0.05}
            />
            &nbsp;
            <motion.span
              className="relative inline-block text-[color:var(--color-s-text)] font-medium"
              variants={wordVariant}
            >
              {content.highlightedText}
            </motion.span>
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
