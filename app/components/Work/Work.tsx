// // import React from 'react'

// // function Work() {
// //   return (
// //     <>
// //     <h2 className='md:text-[32px] hb'>Work Experience</h2>
// //     </>
// //   )
// // }

// // export default Work





// // 'use client';

// // import React from 'react';
// // import client from '@/tina/__generated__/client';
// // import Image from 'next/image';
// // import { motion } from 'framer-motion';
// // import XpIcon from '@/public/xp.png'; // ✅ Proper static import

// // export default async function Work() {
// //   // Fetch from TinaCMS
// //   const res = await client.queries.work({ relativePath: 'work.md' });
// //   const workItems = res?.data?.work?.work || [];

// //   return (
// //     <section className="w-full py-20">
// //       <h2 className="md:text-[32px] font-medium mb- text-foreground">
// //         Work Experience
// //       </h2>

// //       {/* Work list */}
// //       <div className="flex flex-col space-y-20 ">
// //         {workItems.map((item: any, index: number) => (
// //           <div
// //             key={index}
// //             className="flex flex-col md:flex-row justify-between items-start border-b border-[color:var(--color-foreground)]/20 pb-10 gap-10"
// //           >
// //             {/* Left side — Image + Title/Company */}
// //             <div className="flex items-center gap-6 md:w-1/2 ml-20">
// //               {/* Rotating image */}
// //               <motion.div
// //                 animate={{ rotate: 360 }}
// //                 transition={{
// //                   repeat: Infinity,
// //                   duration: 10,
// //                   ease: 'linear',
// //                 }}
// //               >
// //                 <Image
// //                   src={XpIcon}
// //                   alt="Experience icon"
// //                   width={40}
// //                   height={40}
// //                   className="select-none "
// //                   priority
// //                 />
// //               </motion.div>

// //               {/* Texts beside image */}
// //               <div className="flex flex-col space-y-2">
// //                 <h3 className="text-[28px] sm:text-[32px] font-semibold text-foreground">
// //                   {item.title}
// //                 </h3>
// //                 <p className="text-[18px] sm:text-[22px] font-medium text-[color:var(--color-s-text)]">
// //                   {item.company}
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Right side — Description */}
// //             <div className="md:w-1/2 text-[20px] sm:text-[22px] leading-relaxed text-foreground/80">
// //               {item.description}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }


// 'use client';

// import React from 'react';
// import client from '@/tina/__generated__/client';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import XpIcon from '@/public/xp.png';

// // ===== Animation presets =====
// const fadeUp = {
//   hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
//   show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: 'easeOut' } },
// };

// export default async function Work() {
//   // Fetch from TinaCMS
//   const res = await client.queries.work({ relativePath: 'work.md' });
//   const workItems = res?.data?.work?.work || [];

//   return (
//     <section className="w-full py-20">
//       {/* Section heading */}
//       <motion.h2
//         // variants={fadeUp}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.6 }}
//         className="text-[28px] sm:text-[30px] md:text-[32px] font-medium mb-22 text-foreground"
//       >
//         Work Experience
//       </motion.h2>

//       {/* Work list */}
//       <div className="flex flex-col space-y-20">
//         {workItems.map((item: any, index: number) => (
//           <motion.div
//             key={index}
//             // variants={fadeUp}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, amount: 0.5 }}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             className="flex flex-col md:flex-row justify-between items-start border-b border-[color:var(--color-foreground)]/20 pb-10 gap-10"
//           >
//             {/* Left side — Icon + Title/Company */}
//             <div className="flex items-center gap-5 md:w-1/2 ml-10 sm:ml-16 md:ml-20">
//               {/* Continuous rotating image */}
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{
//                   repeat: Infinity,
//                   duration: 12,
//                   ease: 'linear',
//                 }}
//                 className="flex-shrink-0"
//               >
//                 <Image
//                   src={XpIcon}
//                   alt="Experience icon"
//                   width={40}
//                   height={40}
//                   className="select-none w-[35px] sm:w-[40px] md:w-[50px] h-auto"
//                   priority
//                 />
//               </motion.div>

//               {/* Text beside image */}
//               <div className="flex flex-col space-y-2">
//                 <h3 className="text-[22px] sm:text-[26px] md:text-[32px] font-semibold text-foreground">
//                   {item.title}
//                 </h3>
//                 <p className="text-[16px] sm:text-[18px] md:text-[22px] font-medium text-[color:var(--color-s-text)]">
//                   {item.company}
//                 </p>
//               </div>
//             </div>

//             {/* Right side — Description */}
//             <div className="md:w-1/2 text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed text-foreground/80">
//               {item.description}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }






import client from '@/tina/__generated__/client';
import WorkClient from './WorkClient';

export default async function Work() {
  const res = await client.queries.work({ relativePath: 'work.md' });
  const workItems = res?.data?.work?.work || [];

  return <WorkClient workItems={workItems} />;
}
