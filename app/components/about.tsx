// import React from "react";
// import Image from "next/image";

// function About() {
//   return (
//     <>
//       <div className="mx-auto">
//         <Image src="../../public/about me.png" alt="about me"></Image>
//         <h4 className="color-s-text font-[33px]">Data. Strategy. Impact.</h4>
//       </div>
//       <h3 className="text-48px">
//         <span className="text-32px text-uppercase">QUICK INFO </span> I’m Nilay
//         Purayar, a data scientist and business analyst passionate about
//         translating complex data into measurable impact.
//       </h3>
//       <h4 className="mx-auto font-[28px]">
//         With experience spanning finance, marketing, and AI product development,
//         I’ve built predictive trading models that improved investment accuracy
//         by 20%, and Power BI dashboards that boosted reporting efficiency by
//         30%.
//       </h4>
//       <Image src="../../public/nilay rider provider.png" alt="me riding a bike great success!"></Image>
//       <h4 className="italic font-40px">Where data meets flight and motion.</h4>
//     </>
    
//   );
// }

// export default About;




















// import React from 'react';
// import Image from 'next/image';
// import AboutHero from '@/public/about me.png';
// import RiderImg from '@/public/nilay rider provider.png';

// function About() {
//   return (
//     <section className="w-full py-32">
//       <div className="mx-auto space-y-14  text-foreground">
//         <div className="flex flex-col items-center gap-6 text-center">
//           <Image
//             src={AboutHero}
//             alt="Nilay Purayar illustration"
//        className='py-6'
//             priority
//           />
//           <span className="text-[26px] md:text-[33px] font-medium text-[color:var(--color-s-text)] py-10">
//             Data. Strategy. Impact.
//           </span>
//         </div>

//         <h3 className=" leading-tight py-20 hrb">
//           <span className="text-[33px] md:text-[25px] uppercase">
//             Quick Info&nbsp;
//           </span>
//           <span className="text-[32px] md:text-[48px]">
//    &emsp;&emsp;&emsp;&emsp;   I’m Nilay Purayar, a data scientist and business analyst passionate about translating complex data into measurable impact.

//           </span>
    
//         </h3>
    



//       <h4 className="mx-auto max-w-xl my-30 text-left text-[22px] md:text-[28px] leading-relaxed text-muted-foreground">
//   With experience spanning finance, marketing, and AI product development, I’ve built
//   predictive trading models that improved investment  <span className=" text-[color:var(--color-s-text)]">accuracy by 20%,</span> and Power BI dashboards
//   that boosted reporting <span className=" text-[color:var(--color-s-text)]">efficiency by 30%.</span>
// </h4>



//         <div className="flex flex-col items-center gap-6 py-10 text-center hb">
//           <Image
//             src={RiderImg}
//             alt="Nilay Purayar riding a bike"
//             className="h-auto w-full max-w-lg"
//           />
//           <h4 className="text-[30px] mt-20 md:text-[40px] italic">
//             Where data meets flight and motion.
//           </h4>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default About;









































// import React from 'react';
// import Image from 'next/image';
// import AboutHero from '@/public/about me.png';
// import RiderImg from '@/public/nilay rider provider.png';

// function About() {
//   return (
//     <section className="w-full py-32">
//       <div className="mx-auto space-y-14 text-foreground">
//         <div className="flex flex-col items-center gap-6 text-center">
//     <Image
//             src={AboutHero}
//             alt="Nilay Purayar illustration"
    
//        width={100}
//             height={100}
//             className="select-none py-6 sm:py-0 w-[70px] sm:w-[85px] md:w-[100px] h-auto"
//             priority
//           />
//           <span className="text-[22px] sm:text-[28px] md:text-[33px] font-medium text-[color:var(--color-s-text)] py-10">
//             Data. Strategy. Impact.
//           </span>
//         </div>



//         <h3 className="leading-tight md:py-20 py-10 hrb">
//   <span className="block md:inline text-[20px] sm:text-[28px] md:text-[25px] uppercase">
//     Quick Info&nbsp;
//   </span>
//   <span className="text-[24px] sm:text-[32px] md:text-[48px]">
//     <span className="hidden md:inline">&emsp;&emsp;&emsp;&emsp;</span>
//     I’m Nilay Purayar, a data scientist and business analyst passionate about translating complex data into measurable impact.
//   </span>
// </h3>


//         <h4 className="mx-auto max-w-xl md:my-30 py-0 text-left text-[18px] sm:text-[24px] md:text-[28px] leading-relaxed text-muted-foreground">
//           With experience spanning finance, marketing, and AI product development, I’ve built
//           predictive trading models that improved investment <span className="text-[color:var(--color-s-text)]">accuracy by 20%</span>, and Power BI dashboards
//           that boosted reporting <span className="text-[color:var(--color-s-text)]">efficiency by 30%</span>.
//         </h4>

//         <div className="flex flex-col items-center gap-6 md:py-10 py-0 text-center hb">
//           <Image
//             src={RiderImg}
//             alt="Nilay Purayar riding a bike"
//             className="h-auto w-full max-w-[240px] sm:max-w-[360px] md:max-w-lg"
//           />
//           <h4 className="text-[22px] sm:text-[28px] md:text-[40px] italic mt-20">
//             Where data meets flight and motion.
//           </h4>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default About;







































'use client';

import React from 'react';
import Image from 'next/image';
import { motion, type Variants } from "framer-motion";
import AboutHero from '@/public/about me.png';
import RiderImg from '@/public/nilay rider provider.png';


/* ===== Animation presets ===== */
const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      // cubic-bezier easing – this matches "easeOut" feel, but is correctly typed
      ease: [0.16, 1, 0.3, 1],
    },
  },
};


const fadeIn = {
  hidden: { opacity: 0, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: 'easeOut' },
  },
};

const containerStagger = (stagger = 0.1, delayChildren = 0.2) => ({
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
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

/* ===== Reusable staggered text ===== */
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
            <motion.span
              // variants={wordVariant}
              className="inline-block"
            >
              {t}
            </motion.span>
            {by === 'word' && i < items.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ===== Component ===== */
export default function About() {
  return (
    <section className="w-full py-32">
      <div className="mx-auto space-y-14 text-foreground">
        {/* Top icon + tagline */}
   <motion.div
  className="flex flex-col items-center gap-6 text-center"
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.5 }}
>
  {/* === Outer: Entrance Animation (on scroll) === */}
  <motion.div
    initial={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
    whileInView={{
      opacity: 1,
      scale: 1.2,
      filter: 'blur(0px)',
      transition: {
        duration: 1.8,
        ease: 'easeOut',
      },
    }}
    viewport={{ once: true }}
  >
    {/* === Inner: Continuous Heartbeat Pulse (autoplay on mount) === */}
    <motion.div
      animate={{
        scale: [1, 1.03, 0.97, 1.02, 1], // subtle heartbeat rhythm
      }}
      transition={{
        duration: 2.4, // ~2.4s per heartbeat cycle
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <Image
        src={AboutHero}
        alt="Nilay Purayar illustration"
        width={100}
        height={100}
        className="select-none py-8 mb-10 sm:py-0 w-[70px] sm:w-[85px] md:w-[100px] h-auto"
        priority
      />
    </motion.div>
  </motion.div>

  {/* === Text Fade + Blur === */}
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
        <motion.h3
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
            by="word"
          />
        </motion.h3>

      </div>
    </section>
  );
}
