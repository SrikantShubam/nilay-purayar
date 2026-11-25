'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ContactLogo from '@/public/images/connect.png';
import { StaggerText, containerStagger, makeFadeUp } from './motion';
import { socials } from './socials';

const fadeUp = makeFadeUp();

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
  const contactLinks = socials.filter((s) => s.showInContact);

  return (
    <section id="contact" className="w-full py-32">
      <div className="mx-auto space-y-14 text-foreground">
        {/* Top icon */}
        <motion.div
          className="flex flex-col items-center gap-6 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
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
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
            >
              <Image
                src={ContactLogo}
                alt=""
                width={100}
                height={100}
                className="select-none py-8 mb-10 sm:py-0 w-[70px] sm:w-[85px] md:w-[100px] h-auto"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h2
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
          />
        </motion.h2>

        {/* Socials */}
        <motion.div
          variants={containerStagger(0.08, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto w-full max-w-3xl px-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {contactLinks.map((s) => {
              const isExternal = s.href.startsWith('http');
              return (
                <motion.div key={s.label} variants={fadeUp} className="group">
                  <Link
                    href={s.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="
                      flex items-center justify-between
                      rounded-2xl border border-foreground/20
                      px-4 py-4 md:px-5 md:py-5
                      transition-all duration-300
                      hover:bg-[color:var(--color-s-text)] hover:text-white
                      focus:outline-none focus:ring-2 focus:ring-[color:var(--color-s-text)] focus:ring-offset-2 focus:ring-offset-background
                    "
                    aria-label={`Open ${s.label}`}
                  >
                    <span className="text-[16px] sm:text-[18px] font-medium">
                      {s.label}
                    </span>
                    <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
