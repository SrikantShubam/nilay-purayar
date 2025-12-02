
// 'use client';
// import { useState } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';

// const NAV_ITEMS = [
//   { label: 'Work', href: '#work' },
//   { label: 'Projects', href: '#projects' },
//   { label: 'Contact', href: '#contact' },
// ];

// const navItemVariants = {
//   hidden: { opacity: 0, y: -8 },
//   visible: (index: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: 0.15 + index * 0.08, duration: 0.35, ease: 'easeOut' },
//   }),
// };

// export default function NavBar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <motion.header
//       className="w-full py-4 sm:py-6"
//       initial={{ opacity: 0, y: -12 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.45, ease: 'easeOut' }}
//     >
//       <div className="mx-auto flex w-full items-center justify-between">
//         <motion.a
//           href="#home"
//           className="text-sm md:text-[19px] font-normal uppercase tracking-[0.45em] text-foreground"
//           initial={{ opacity: 0, y: -6 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1, duration: 0.35, ease: 'easeOut' }}
//         >
//           N_P
//         </motion.a>

//         <nav className="hidden md:flex flex-1 items-center justify-center gap-48 text-sm md:text-[19px] font-normal uppercase tracking-[0.35em] text-foreground mx-auto">
//           {NAV_ITEMS.map((item, index) => (
//             <motion.a
//               key={item.href}
//               href={item.href}
//               className="transition-colors duration-300 hover:text-s-text"
           
//               initial="hidden"
//               animate="visible"
//               custom={index}
//             >
//               {item.label}
//             </motion.a>
//           ))}
//         </nav>

//         <motion.a
//           href="#resume"
//           className="hidden md:block rounded-[20px] bg-s-text px-6 py-2 text-sm md:text-[19px] font-normal text-white transition-opacity duration-300 hover:opacity-90"
//           initial={{ opacity: 0, scale: 0.94 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3, duration: 0.35, ease: 'easeOut' }}
//         >
//           Download&nbsp;Resume
//         </motion.a>

//         <motion.button
//           onClick={() => setIsOpen((p) => !p)}
//           className="md:hidden text-foreground"
//           aria-label="Toggle menu"
//           whileTap={{ scale: 0.9 }}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
//             />
//           </svg>
//         </motion.button>
//       </div>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             className="md:hidden bg-background border-t border-foreground/10"
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3, ease: 'easeInOut' }}
//           >
//             <nav className="flex flex-col items-center gap-4 pt-4 pb-4 text-sm md:text-base font-normal uppercase tracking-[0.2em] text-foreground">
//               {NAV_ITEMS.map((item, index) => (
//                 <motion.a
//                   key={item.href}
//                   href={item.href}
//                   className="w-full py-2 text-center transition-colors duration-200 hover:text-s-text"
//                   onClick={() => setIsOpen(false)}
//                   initial={{ opacity: 0, y: 12 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 12 }}
//                   transition={{ delay: 0.05 + index * 0.05, duration: 0.25 }}
//                 >
//                   {item.label}
//                 </motion.a>
//               ))}
//               <motion.a
//                 href="#resume"
//                 className="w-full rounded-[20px] bg-s-text px-6 py-3 text-sm md:text-base font-normal text-white text-center transition-opacity duration-300 hover:opacity-90 mt-2"
//                 onClick={() => setIsOpen(false)}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ delay: 0.2, duration: 0.25 }}
//               >
//                 Download&nbsp;Resume
//               </motion.a>
//             </nav>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// }


















'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + index * 0.08, duration: 0.35, ease: 'easeOut' },
  }),
};

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    /** ✅ Sticky on a NON-ANIMATED wrapper */
    <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      {/* Animate the inner header only */}
      <motion.header
        className="w-full py-4 sm:py-6"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <div className="mx-auto flex w-full items-center justify-between">
          <motion.a
            href="#home"
            className="text-sm font-normal uppercase tracking-[0.45em] text-foreground md:text-[19px]"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35, ease: 'easeOut' }}
          >
            N_P
          </motion.a>

          <nav className="hidden flex-1 items-center justify-center lg:gap-48 md:gap-20 text-sm font-normal uppercase tracking-[0.35em] text-foreground lg:flex md:text-[19px]">
            {NAV_ITEMS.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="transition-colors duration-300 hover:text-s-text"
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                custom={index}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.35, ease: 'easeOut' }}
          >
            <Link
              href="/resume.pdf"
              download
              className="rounded-[20px] bg-s-text px-6 py-2 text-sm font-normal text-white transition-opacity duration-300 hover:opacity-90 md:text-[19px]"
            >
              Download&nbsp;Resume
            </Link>
          </motion.div>

          <motion.button
            onClick={() => setIsOpen((p) => !p)}
            className="text-foreground lg:hidden"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden border-t border-foreground/10 bg-background/95 backdrop-blur"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <nav className="flex flex-col items-center gap-4 px-4 pt-4 pb-4 text-sm font-normal uppercase tracking-[0.2em] text-foreground md:text-base">
                {NAV_ITEMS.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="w-full py-2 text-center transition-colors duration-200 hover:text-s-text"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: 0.25 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: 0.2, duration: 0.25 }}
                >
                  <Link
                    href="/resume.pdf"
                    download
                    className="mt-2 block rounded-[20px] bg-s-text px-6 py-3 text-center text-sm font-normal text-white transition-opacity duration-300 hover:opacity-90 md:text-base"
                    onClick={() => setIsOpen(false)}
                  >
                    Download&nbsp;Resume
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
