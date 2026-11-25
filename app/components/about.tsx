'use client';

import Image from 'next/image';
import { motion, cubicBezier } from 'framer-motion';
import AboutHero from '@/public/images/about.png';
import { StaggerText, makeFadeUp } from './motion';

const fadeUp = makeFadeUp({ ease: cubicBezier(0.16, 1, 0.3, 1) });

export default function About() {
  return (
    <section id="about" className="w-full py-32">
      <div className="mx-auto space-y-14 text-foreground">
        {/* Top icon + tagline */}
        <motion.div
          className="flex flex-col items-center gap-6 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Outer: entrance animation on scroll */}
          <motion.div
            initial={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
            whileInView={{
              opacity: 1,
              scale: 1.2,
              filter: 'blur(0px)',
              transition: { duration: 1.8, ease: 'easeOut' },
            }}
            viewport={{ once: true }}
          >
            {/* Inner: continuous heartbeat pulse */}
            <motion.div
              animate={{ scale: [1, 1.03, 0.97, 1.02, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src={AboutHero}
                alt=""
                width={100}
                height={100}
                className="select-none py-8 mb-10 sm:py-0 w-[70px] sm:w-[85px] md:w-[100px] h-auto"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 1.2, delay: 0.4, ease: 'easeOut' },
            }}
            viewport={{ once: true, amount: 0.6 }}
          >
            <StaggerText
              as="span"
              text="Data. Strategy. Impact."
              className="text-[22px] sm:text-[28px] md:text-[33px] font-medium text-[color:var(--color-s-text)] pt-20 "
            />
          </motion.div>
        </motion.div>

        {/* Quick Info */}
        <motion.h2
          className="leading-tight md:py-20 py-10 hrb"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          <span className="block md:inline text-[20px] sm:text-[28px] md:text-[25px] uppercase">
            Quick Info&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          </span>
          <StaggerText
            as="span"
            className="text-[24px] sm:text-[32px] md:text-[48px]"
            text="I’m Nilay Purayar, a data scientist and business analyst passionate about translating complex data into measurable impact."
          />
        </motion.h2>
      </div>
    </section>
  );
}
