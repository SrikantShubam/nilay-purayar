'use client';

import { motion, easeOut, type Variants } from 'framer-motion';
import { makeFadeUp } from '../motion';

export type Skill = {
  name: string;
  group: string;
  order: number;
};

export type SkillGroup = {
  name: string;
  skills: Skill[];
};

const fadeUp = makeFadeUp({ y: 30, blur: 6, duration: 0.7 });

const chipVar: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOut } },
};

export default function SkillsClient({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="skills" className="w-full py-20">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="text-[28px] sm:text-[30px] md:text-[32px] font-medium mb-12 text-foreground"
      >
        Skills
      </motion.h2>

      <div className="flex flex-col gap-10">
        {groups.map((group) => (
          <motion.div
            key={group.name}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-[15px] sm:text-[16px] uppercase tracking-[0.14em] text-foreground/60 mb-4">
              {group.name}
            </h3>

            <motion.ul
              className="flex flex-wrap gap-2.5 sm:gap-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.03 }}
            >
              {group.skills.map((skill) => (
                <motion.li
                  key={skill.name}
                  variants={chipVar}
                  className="inline-flex items-center rounded-full border border-foreground/25 px-4 py-2 text-[15px] sm:text-[16px] text-foreground"
                >
                  {skill.name}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
