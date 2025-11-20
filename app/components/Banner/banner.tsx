// 'use client';

// import Image from 'next/image';
// import React from 'react';
// import StarImg from '@/public/nilay star.png';

// export default function Banner() {
//   return (
//     <section className="w-full py-12 mt-40 sm:mt-60 md:mt-80 hr">
//       {/* Top: Star image */}
//       <div className="w-full flex justify-start mb-10">
//         <Image
//           src={StarImg}
//           alt="Nilay Purayar star icon"
//           width={100}
//           height={100}
//           className="select-none w-[70px] sm:w-[85px] md:w-[100px] h-auto"
//           priority
//         />
//       </div>

//       {/* Bottom: 2-column row */}
//       <div className="grid grid-cols-1 hrb py-16 md:grid-cols-2 gap-y-10 md:gap-x-20">
//         {/* Left column */}
//            <div className="flex h-full flex-col justify-end">
//                 <h2 className="text-[30px] md:text-[57px] font-medium text-foreground leading-tight">
//                 Nilay&nbsp;Purayar
//                 </h2>
//             </div>
       

//         {/* Right column */}
//         <div>
//           <h3 className="text-[18px] md:text-[28px] font-poppins font-regular leading-relaxed md:leading-[1.5] text-foreground">
//             Turning complex data into actionable insights across finance, strategy, and innovation — I’m
//             Nilay Purayar, a data scientist and business analyst passionate about transforming ideas into{' '}
//             <span className="text-[color:var(--color-s-text)] font-medium">
//               measurable impact.
//             </span>
//           </h3>
//         </div>
//       </div>
//     </section>
//   );
// }




// 'use client';

// import Image from 'next/image';
// import React from 'react';
// import { motion } from 'framer-motion';
// import StarImg from '@/public/nilay star.png';

// const containerVariants = {
//   hidden: { opacity: 0, y: 24 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.55, ease: 'easeOut' },
//   },
// };

// const rightColumnVariants = {
//   hidden: { opacity: 0, y: 24 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { delay: 0.15, duration: 0.55, ease: 'easeOut' },
//   },
// };

// export default function Banner() {
//   return (
//     <motion.section
//       className="w-full py-12 mt-40 sm:mt-60 md:mt-80 hr"
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.3 }}
   
//     >
//       <motion.div
//         className="w-full flex justify-start mb-10"
//         initial={{ opacity: 0, y: -12 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.45, ease: 'easeOut' }}
//       >
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
//         >
//           <Image
//             src={StarImg}
//             alt="Nilay Purayar star icon"
//             width={100}
//             height={100}
//             className="select-none w-[70px] sm:w-[85px] md:w-[100px] h-auto"
//             priority
//           />
//         </motion.div>
//       </motion.div>

//       <motion.div className="grid grid-cols-1 hrb py-16 md:grid-cols-2 gap-y-10 md:gap-x-20">
//         <motion.div className="flex h-full flex-col justify-end">
//           <h2 className="text-[30px] md:text-[57px] font-medium text-foreground leading-tight">
//             Nilay&nbsp;Purayar
//           </h2>
//         </motion.div>

//         <motion.div >
//           <h3 className="text-[18px] md:text-[28px] font-poppins font-regular leading-relaxed md:leading-[1.5] text-foreground">
//             Turning complex data into actionable insights across finance, strategy, and innovation — I’m
//             Nilay Purayar, a data scientist and business analyst passionate about transforming ideas into{' '}
//             <span className="text-[color:var(--color-s-text)] font-medium">measurable impact.</span>
//           </h3>
//         </motion.div>
//       </motion.div>
//     </motion.section>
//   );
// }




















// 'use client';

// import Image from 'next/image';
// import React from 'react';
// import { motion } from 'framer-motion';
// import StarImg from '@/public/nilay star.png';

// /* ===== Animation Variants ===== */
// const fadeUp = {
//   hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
//   show: {
//     opacity: 1,
//     y: 0,
//     filter: 'blur(0px)',
//     transition: { duration: 0.8, ease: 'easeOut' },
//   },
// };

// const containerStagger = (stagger = 0.08, delayChildren = 0.1) => ({
//   hidden: { opacity: 1 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: stagger, delayChildren },
//   },
// });

// const wordVariant = {
//   hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
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

// /* ===== Banner Component ===== */
// export default function Banner() {
//   return (
//     <motion.section
//       className="w-full py-12 mt-40 sm:mt-60 md:mt-80 hr"
//       initial="hidden"
//       whileInView="show"
//       viewport={{ once: true, amount: 0.3 }}
//     >
//       {/* Rotating Star */}
//       <motion.div
//         className="w-full flex justify-start mb-10"
//         initial={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
//         whileInView={{
//           opacity: 1,
//           y: 0,
//           filter: 'blur(0px)',
//           transition: { duration: 0.7, ease: 'easeOut' },
//         }}
//         viewport={{ once: true }}
//       >
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
//         >
//           <Image
//             src={StarImg}
//             alt="Nilay Purayar star icon"
//             width={100}
//             height={100}
//             className="select-none w-[70px] sm:w-[85px] md:w-[100px] h-auto"
//             priority
//           />
//         </motion.div>
//       </motion.div>

//       {/* Text Columns */}
//       <motion.div
//         className="grid grid-cols-1 hrb py-16 md:grid-cols-2 gap-y-10 md:gap-x-20"
//         variants={containerStagger(0.1, 0.15)}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.5 }}
//       >
//         {/* Left Column */}
//         <motion.div variants={fadeUp} className="flex h-full flex-col justify-end">
//           <StaggerText
//             as="h2"
//             text="Nilay Purayar"
//             className="text-[30px] md:text-[57px] font-medium text-foreground leading-tight"
//           />
//         </motion.div>

//         {/* Right Column */}
//         <motion.div variants={fadeUp}>
//           <h3 className="text-[18px] md:text-[28px] font-poppins font-regular leading-relaxed md:leading-[1.5] text-foreground">
//             <StaggerText
//               as="span"
//               text="Turning complex data into actionable insights across finance, strategy, and innovation — I’m Nilay Purayar, a data scientist and business analyst passionate about transforming ideas into"
//             />
//             &nbsp;
//             <motion.span
//               className="inline-block text-[color:var(--color-s-text)] font-medium"
//               variants={wordVariant}
//             >
//               measurable impact.
//             </motion.span>
//           </h3>
//         </motion.div>
//       </motion.div>
//     </motion.section>
//   );
// }













'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import StarImg from '@/public/nilay star.png';

/* ===== Animation Variants ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const containerStagger = (stagger = 0.08, delayChildren = 0.1) => ({
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});

const wordVariant = {
  hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' },
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

/* ===== Banner Component ===== */
export default function Banner() {
  return (
    <motion.section
      className="w-full py-12 mt-40 sm:mt-60 md:mt-80 hr"
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
            alt="Nilay Purayar star icon"
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
            as="h2"
            text="Nilay Purayar"
            className="text-[30px] md:text-[57px] font-medium text-foreground leading-tight"
          />
        </motion.div>

        {/* Right Column */}
        <motion.div variants={fadeUp}>
          <h3 className="relative text-[18px] md:text-[28px] font-poppins font-regular leading-relaxed md:leading-[1.5] text-foreground">
            <StaggerText
              as="span"
              text="Turning complex data into actionable insights across finance, strategy, and innovation — I’m Nilay Purayar, a data scientist and business analyst passionate about transforming ideas into"
            />
            &nbsp;
            <motion.span
              className="relative inline-block text-[color:var(--color-s-text)] font-medium"
              variants={wordVariant}
            >
              measurable impact.

          

            </motion.span>
          </h3>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

















