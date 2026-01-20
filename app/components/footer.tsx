// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';

// const fadeUp = {
//   hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
//   show: {
//     opacity: 1,
//     y: 0,
//     filter: 'blur(0px)',
//     transition: { duration: 0.9, ease: 'easeOut' },
//   },
// };

// const stagger = {
//   hidden: { opacity: 1 },
//   show: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.15 } },
// };

// const linkItem = {
//   hidden: { opacity: 0, y: 16 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
// };

// const Chevron = () => (
//   <svg
//     width={20}
//     height={20}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="transition-transform duration-300 group-hover:translate-x-1"
//     aria-hidden
//   >
//     <path d="M9 18l6-6-6-6" />
//   </svg>
// );

// export default function Footer() {
//   return (
//     <motion.footer
//       className="w-full border-t border-foreground/10 py-12 text-foreground"
//       variants={fadeUp}
//       initial="hidden"
//       whileInView="show"
//       viewport={{ once: true, amount: 0.3 }}
//     >
//       <motion.div className="mx-auto flex flex-col gap-8 px-6" variants={stagger}>
//         <motion.div
//           className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between"
//           variants={stagger}
//         >
//           <motion.a
//             href="mailto:hello@nilaypurayar.com"
//             className="text-[36px] font-semibold leading-none tracking-tight transition-colors duration-300 hover:text-[color:var(--color-s-text)]"
//             variants={linkItem}
//           >
//             hello@nilaypurayar.com
//           </motion.a>

//           <motion.nav
//             className="flex items-center justify-end gap-12 text-[20px] font-medium"
//             variants={stagger}
//           >
//             {[
//               { label: 'LinkedIn', href: 'https://www.linkedin.com/in/YOUR-USERNAME/' },
//               { label: 'X', href: 'https://twitter.com/YOUR-HANDLE' },
//               { label: 'WhatsApp', href: 'https://wa.me/YOUR-NUMBER' },
//               { label: 'Email', href: 'mailto:hello@nilaypurayar.com' },
//             ].map(({ label, href }) => (
//               <motion.div key={label} variants={linkItem}>
//                 <Link
//                   href={href}
//                   target={href.startsWith('http') ? '_blank' : undefined}
//                   rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
//                   className="group flex items-center gap-2 transition-colors duration-300 hover:text-[color:var(--color-s-text)]"
//                 >
//                   <span>{label}</span>
//                   <Chevron />
//                 </Link>
//               </motion.div>
//             ))}
//           </motion.nav>
//         </motion.div>

//         <motion.p
//           className="flex items-center gap-3 text-sm text-muted-foreground sm:justify-end"
//           variants={linkItem}
//         >
//           <span>Developed by</span>
//           <Link
//             href="https://agency-ss.example.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="group inline-flex items-center gap-1 text-foreground transition-colors duration-300 hover:text-[color:var(--color-s-text)]"
//           >
//             <span>Agency 10169</span>
//             <Chevron />
//           </Link>
//         </motion.p>
//       </motion.div>
//     </motion.footer>
//   );
// }











'use client';

import Link from 'next/link';
import { motion, easeOut } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: easeOut },
  },
};

const stagger = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.15 } },
};

const linkItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const Chevron = () => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-transform duration-300 group-hover:translate-x-1"
    aria-hidden
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default function Footer() {
  return (
    <motion.footer
      className="w-full border-t border-foreground/10 py-12 text-foreground"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="mx-auto flex flex-col gap-8 px-6" variants={stagger}>
        <motion.div
          className="flex flex-col gap-10 sm:flex-row sm:items-center sm:justify-between"
          variants={stagger}
        >
          <motion.a
            href="mailto:purayar.nilay@gmail.com"
            className="text-[36px] font-semibold leading-none tracking-tight transition-colors duration-300 hover:text-[color:var(--color-s-text)]"
            variants={linkItem}
          >
            purayar.nilay@gmail.com
          </motion.a>

          <motion.nav
            className="flex items-center justify-end gap-12 text-[20px] font-medium"
            variants={stagger}
          >
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/purayar-nilay/' },
              { label: 'Instagram', href: 'https://www.instagram.com/purayar.nilay_06?igsh=MWMxeHUybHhrbGxiag==' },
              { label: 'Snapchat', href: 'https://www.snapchat.com/add/purayar.nilay06?share_id=IwiO_CqN6pw&locale=en-IN' },
              { label: 'Email', href: 'mailto:purayar.nilay@gmail.com' },
            ].map(({ label, href }) => (
              <motion.div key={label} variants={linkItem}>
                <Link
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center align-center md:gap-2 transition-colors duration-300 hover:text-[color:var(--color-s-text)]"
                >
                  <span>{label}</span>
                  <Chevron />
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>

        <motion.p
          className="flex items-center gap-3 text-sm text-muted-foreground sm:justify-end text-left md:text-center"
          variants={linkItem}
        >
          <span>Developed by</span>
          <Link
            href="https://vectorveda.online"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-foreground transition-colors duration-300 hover:text-[color:var(--color-s-text)]"
          >
            <span>Vector Veda</span>
            <Chevron />
          </Link>
        </motion.p>
      </motion.div>
    </motion.footer>
  );
}
