'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import XpIcon from '@/public/images/xp.png';
import { StaggerText, makeFadeUp } from '../motion';

interface WorkItem {
  title: string;
  company: string;
  description: string;
}

const fadeUp = makeFadeUp({ y: 30, blur: 6, duration: 0.7 });

export default function WorkClient({ workItems }: { workItems: WorkItem[] }) {
  return (
    <section id="work" className="w-full py-20">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="text-[28px] sm:text-[30px] md:text-[32px] font-medium mb-22 text-foreground"
      >
        Work Experience
      </motion.h2>

      <div className="flex flex-col space-y-20">
        {workItems.map((item: WorkItem, index: number) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col md:flex-row justify-between items-start border-b border-foreground/20 pb-10 gap-10"
          >
            {/* Left: icon, title, company */}
            <div className="flex items-center gap-0 md:gap-5 md:w-1/2 ml-0 sm:ml-16 md:ml-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                className="shrink-0"
              >
                <Image
                  src={XpIcon}
                  alt=""
                  width={20}
                  height={20}
                  className="hidden select-none sm:block sm:w-[30px] md:w-[40px] h-auto"
                  priority
                />
              </motion.div>

              <div className="flex flex-col space-y-2">
                <StaggerText
                  as="h3"
                  text={item.title}
                  className="text-[22px] sm:text-[26px] md:text-[32px] font-semibold text-foreground"
                  animateWords
                  stagger={0.06}
                  delayChildren={0.05}
                />
                <StaggerText
                  as="p"
                  text={item.company}
                  className="text-[16px] sm:text-[18px] md:text-[22px] font-medium text-[var(--color-s-text)]"
                  animateWords
                  stagger={0.06}
                  delayChildren={0.05}
                />
              </div>
            </div>

            {/* Right: description */}
            <div className="md:w-1/2 text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed text-foreground/80">
              <StaggerText
                as="p"
                text={item.description}
                animateWords
                stagger={0.06}
                delayChildren={0.05}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
