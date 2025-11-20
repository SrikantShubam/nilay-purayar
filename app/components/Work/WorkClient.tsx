// // 'use client';

// // import React from 'react';
// // import Image from 'next/image';
// // import { motion } from 'framer-motion';
// // import XpIcon from '@/public/xp.png';

// // const fadeUp = {
// //   hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
// //   show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: 'easeOut' } },
// // };

// // export default function WorkClient({ workItems }: { workItems: any[] }) {
// //   return (
// //     <section className="w-full py-20">
// //       <motion.h2
// //         // variants={fadeUp}
// //         initial="hidden"
// //         whileInView="show"
// //         viewport={{ once: true, amount: 0.6 }}
// //         className="text-[28px] sm:text-[30px] md:text-[32px] font-medium mb-22 text-foreground"
// //       >
// //         Work Experience
// //       </motion.h2>

// //       <div className="flex flex-col space-y-20">
// //         {workItems.map((item, index) => (
// //           <motion.div
// //             key={index}
// //             // variants={fadeUp}
// //             initial="hidden"
// //             whileInView="show"
// //             viewport={{ once: true, amount: 0.5 }}
// //             transition={{ duration: 0.6, delay: index * 0.1 }}
// //             className="flex flex-col md:flex-row justify-between items-start border-b border-[color:var(--color-foreground)]/20 pb-10 gap-10"
// //           >
// //             {/* Left side — Image + Text */}
// //             <div className="flex items-center gap-0 md:gap-5 md:w-1/2 ml-0 sm:ml-16 md:ml-20">
// //               <motion.div
// //                 animate={{ rotate: 360 }}
// //                 transition={{
// //                   repeat: Infinity,
// //                   duration: 12,
// //                   ease: 'linear',
// //                 }}
// //                 className="flex-shrink-0"
// //               >
// //                <Image
// //   src={XpIcon}
// //   alt="Experience icon"
// //   width={20}
// //   height={20}
// //   className="hidden select-none sm:block sm:w-[30px] md:w-[40px] h-auto"
// //   priority
// // />

// //               </motion.div>

// //               <div className="flex flex-col space-y-2">
// //                 <h3 className="text-[22px] sm:text-[26px] md:text-[32px] font-semibold text-foreground">
// //                   {item.title}
// //                 </h3>
// //                 <p className="text-[16px] sm:text-[18px] md:text-[22px] font-medium text-[color:var(--color-s-text)]">
// //                   {item.company}
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Right side — Description */}
// //             <div className="md:w-1/2 text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed text-foreground/80">
// //               {item.description}
// //             </div>
// //           </motion.div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }





















// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import XpIcon from '@/public/xp.png';

// /* ===== Animation presets ===== */
// const fadeUp = {
//   hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
//   show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: 'easeOut' } },
// };

// const containerStagger = (stagger = 0.08, delayChildren = 0.1) => ({
//   hidden: { opacity: 1 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: stagger, delayChildren },
//   },
// });

// const wordVariant = {
//   hidden: { opacity: 0, y: 8, filter: 'blur(6px)' },
//   show: {
//     opacity: 1,
//     y: 0,
//     filter: 'blur(0px)',
//     transition: { duration: 0.5, ease: 'easeOut' },
//   },
// };

// /* ===== Reusable StaggerText ===== */
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
//         variants={containerStagger(0.06, 0.05)}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: viewportAmount }}
//         className="inline"
//       >
//         {items.map((t, i) => (
//           <motion.span key={i} variants={wordVariant} className="inline-block mr-[0.25em]">
//             {t}
//           </motion.span>
//         ))}
//       </motion.span>
//     </Tag>
//   );
// }

// /* ===== Work Section ===== */
// export default function WorkClient({ workItems }: { workItems: any[] }) {
//   return (
//     <section className="w-full py-20">
//       <motion.h2
//         variants={fadeUp}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.6 }}
//         className="text-[28px] sm:text-[30px] md:text-[32px] font-medium mb-22 text-foreground"
//       >
//         Work Experience
//       </motion.h2>

//       <div className="flex flex-col space-y-20">
//         {workItems.map((item, index) => (
//           <motion.div
//             key={index}
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, amount: 0.5 }}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             className="flex flex-col md:flex-row justify-between items-start border-b border-[color:var(--color-foreground)]/20 pb-10 gap-10"
//           >
//             {/* Left side — Icon + Title/Company */}
//             <div className="flex items-center gap-0 md:gap-5 md:w-1/2 ml-0 sm:ml-16 md:ml-20">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
//                 className="flex-shrink-0"
//               >
//                 <Image
//                   src={XpIcon}
//                   alt="Experience icon"
//                   width={20}
//                   height={20}
//                   className="hidden select-none sm:block sm:w-[30px] md:w-[40px] h-auto"
//                   priority
//                 />
//               </motion.div>

//               <div className="flex flex-col space-y-2">
//                 <StaggerText
//                   as="h3"
//                   text={item.title}
//                   className="text-[22px] sm:text-[26px] md:text-[32px] font-semibold text-foreground"
//                 />
//                 <StaggerText
//                   as="p"
//                   text={item.company}
//                   className="text-[16px] sm:text-[18px] md:text-[22px] font-medium text-[color:var(--color-s-text)]"
//                 />
//               </div>
//             </div>

//             {/* Right side — Description */}
//             <div className="md:w-1/2 text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed text-foreground/80">
//               <StaggerText as="p" by="word" text={item.description} />
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }



















'use client';

import React from 'react';
import Image from 'next/image';
import { motion, easeOut } from 'framer-motion';
import XpIcon from '@/public/xp.png';

interface WorkItem {
  title: string;
  company: string;
  description: string;
}

/* ===== Animation presets ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: easeOut } },
};

const containerStagger = (stagger = 0.08, delayChildren = 0.1) => ({
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});

const wordVariant = {
  hidden: { opacity: 0, y: 8, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: easeOut },
  },
};

/* ===== Reusable StaggerText ===== */
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
        variants={containerStagger(0.06, 0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: viewportAmount }}
        className="inline"
      >
        {items.map((t, i) => (
          <motion.span key={i} variants={wordVariant} className="inline-block mr-[0.25em]">
            {t}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ===== Work Section ===== */
export default function WorkClient({ workItems }: { workItems: WorkItem[] }) {
  return (
    <section className="w-full py-20">
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
            {/* Left side — Icon + Title/Company */}
            <div className="flex items-center gap-0 md:gap-5 md:w-1/2 ml-0 sm:ml-16 md:ml-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                className="shrink-0"
              >
                <Image
                  src={XpIcon}
                  alt="Experience icon"
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
                />
                <StaggerText
                  as="p"
                  text={item.company}
                  className="text-[16px] sm:text-[18px] md:text-[22px] font-medium text-[var(--color-s-text)]"
                />
              </div>
            </div>

            {/* Right side — Description */}
            <div className="md:w-1/2 text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed text-foreground/80">
              <StaggerText as="p" by="word" text={item.description} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}