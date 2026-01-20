// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import ContactLogo from '@/public/connect .png';
// import Link from 'next/link'
// /* ===== Animation presets ===== */
// const fadeUp = {
//   hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
//   show: {
//     opacity: 1,
//     y: 0,
//     filter: 'blur(0px)',
//     transition: { duration: 1.1, ease: 'easeOut' },
//   },
// };

// const containerStagger = (stagger = 0.1, delayChildren = 0.2) => ({
//   hidden: { opacity: 1 },
//   show: {
//     opacity: 1,
//     transition: { staggerChildren: stagger, delayChildren },
//   },
// });

// /* ===== Reusable staggered text ===== */
// function StaggerText({
//   text,
//   as: Tag = 'span',
//   className = '',
//   by = 'word',
//   viewportAmount = 0.6,
// }: {
//   text: string;
//   as?: React.ElementType;
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

// function Contact() {
//   return (
//     <section className="w-full py-32">
//       <div className="mx-auto space-y-14 text-foreground">
//         {/* Top icon + tagline */}
//         <motion.div
//           className="flex flex-col items-center gap-6 text-center"
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.5 }}
//         >
//           {/* === Outer: Entrance Animation (on scroll) === */}
//           <motion.div
//             initial={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
//             whileInView={{
//               opacity: 1,
//               scale: 1.2,
//               filter: 'blur(0px)',
//               transition: { duration: 1.8, ease: 'easeOut' },
//             }}
//             viewport={{ once: true }}
//           >
//             {/* === Inner: Continuous Heartbeat Pulse === */}
//             <motion.div
//               animate={{ scale: [1, 1.03, 0.97, 1.02, 1] }}
//               transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
//             >
//               <Image
//                 src={ContactLogo}
//                 alt="Nilay Purayar illustration"
//                 width={100}
//                 height={100}
//                 className="select-none py-8 mb-10 sm:py-0 w-[70px] sm:w-[85px] md:w-[100px] h-auto"
//                 priority
//               />
//             </motion.div>
//           </motion.div>

       
//         </motion.div>

//         {/* Quick Info */}
//         <motion.h3
//           className="leading-tight md:py-20 py-10 hrb"
//           variants={fadeUp}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.6 }}
//         >
//           <span className="block md:inline text-[20px] sm:text-[28px] md:text-[25px] uppercase">
//            CONNECT WITH ME&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
//           </span>
//           <StaggerText
//             as="span"
//             className="text-[24px] sm:text-[32px] md:text-[48px]"
//             text="Always open to new conversations, collaborations, and opportunities — let’s connect!."
//             by="word"
//           />
//         </motion.h3>

          

//       </div>
//     </section>
//   );
// }

// export default Contact;





















'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ContactLogo from '@/public/connect .png';
import Link from 'next/link';

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

/* ===== Reusable staggered text ===== */
function StaggerText({
  text,
  as: Tag = 'span',
  className = '',
  by = 'word',
  viewportAmount = 0.6,
}: {
  text: string;
  as?: React.ElementType;
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

/* ===== Small Chevron (no extra deps) ===== */
function ChevronRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Contact() {
  // Edit your links here; grid will place them row-wise in two columns.
  const socials: { name: string; href: string }[] = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/purayar-nilay/' },
    { name: 'Email', href: 'mailto:purayar.nilay@gmail.com' },
    { name: 'Phone: +33 (0)7 80 83 05 99', href: 'tel:+33780830599' },
    { name: 'Instagram', href: 'https://www.instagram.com/purayar.nilay_06?igsh=MWMxeHUybHhrbGxiag==' },
    { name: 'Snapchat', href: 'https://www.snapchat.com/add/purayar.nilay06?share_id=IwiO_CqN6pw&locale=en-IN' },
  ];

  return (
    <section id="contact" className="w-full py-32">
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
              transition: { duration: 1.8, ease: 'easeOut' },
            }}
            viewport={{ once: true }}
          >
            {/* === Inner: Continuous Heartbeat Pulse === */}
          <motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 12, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
>
  <Image
    src={ContactLogo}
    alt="Nilay Purayar illustration"
    width={100}
    height={100}
    className="select-none py-8 mb-10 sm:py-0 w-[70px] sm:w-[85px] md:w-[100px] h-auto"
    priority
  />
</motion.div>

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
            CONNECT WITH ME&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          </span>
          <StaggerText
            as="span"
            className="text-[24px] sm:text-[32px] md:text-[48px]"
            text="Always open to new conversations, collaborations, and opportunities — let’s connect!."
            by="word"
          />
        </motion.h3>

        {/* ===== Socials (centered row → two columns, row-wise fill) ===== */}
        <motion.div
          variants={containerStagger(0.08, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto w-full max-w-3xl px-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {socials.map((s, idx) => (
              <motion.div
                key={s.name}
                variants={fadeUp}
                className="group"
              >
                <Link
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center justify-between
                    rounded-2xl border border-foreground/20
                    px-4 py-4 md:px-5 md:py-5
                    transition-all duration-300
                    hover:bg-[color:var(--color-s-text)] hover:text-white
                    focus:outline-none focus:ring-2 focus:ring-[color:var(--color-s-text)] focus:ring-offset-2 focus:ring-offset-background
                  "
                  aria-label={`Open ${s.name}`}
                >
                  <span className="text-[16px] sm:text-[18px] font-medium">
                    {s.name}
                  </span>
                  <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
