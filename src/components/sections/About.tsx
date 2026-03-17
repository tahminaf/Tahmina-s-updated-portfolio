"use client";

import { motion } from "framer-motion";
import { personalInfo } from "../../data/portfolioData";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

const posts = [
  {
    image: "/hackathon.png",
    alt: "UB Hacking 2025 — AI/ML Track Winners",
    caption: "UB Hacking 2025",
    tag: "Hackathon",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7394362592745500672/",
    objectPosition: "center top",
  },
  {
    image: "/internship.png",
    alt: "M&T Bank TIP Intern Showcase",
    caption: "M&T Bank Internship",
    tag: "Internship",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7360403146487009280/",
    objectPosition: "center top",
  },
  {
    image: "/redbull.png",
    alt: "Red Bull Basement Workshop",
    caption: "Red Bull Basement",
    tag: "Leadership",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7435772767930630146/",
    objectPosition: "center center",
  },
  {
    image: "/forge_post.png",
    alt: "Forge First Light Recap — Fall 2025",
    caption: "UB Forge",
    tag: "Community",
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7371541810529177602/",
    objectPosition: "center top",
  },
];

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export function About() {
  return (
    <section id="about" className="border-t border-[#e2ddd2] bg-[#fdfcf8]">

      {/* ── Header ── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 pt-20 sm:pt-28 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 border-b border-[#e2ddd2] flex flex-col items-center text-center">
        <motion.p
          {...fadeUp(0)}
          className="font-['DM_Mono'] font-semibold text-[11px] sm:text-[13px] tracking-[0.16em] sm:tracking-[0.18em] uppercase text-[#8a6800] mb-4 sm:mb-5"
        >
          follow along
        </motion.p>
        <motion.h2
          {...fadeUp(0.05)}
          className="font-['Cormorant_Garamond'] font-light text-[#16130e] leading-[1.0] tracking-[-0.02em] mb-5 sm:mb-6"
          style={{ fontSize: "clamp(40px, 6vw, 68px)" }}
        >
          Life in <em className="text-[#0b3d2e] not-italic italic">Motion</em>
        </motion.h2>

        <motion.a
          {...fadeUp(0.1)}
          href={personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 sm:gap-3 font-['DM_Mono'] font-semibold text-[20px] sm:text-[24px] md:text-[28px] tracking-[0.06em] text-[#0b3d2e] hover:text-[#145c42] transition-colors duration-200"
        >
          <LinkedInIcon className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />
          @tahmina-fayezi
        </motion.a>
      </div>

      {/* ── Grid ── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 pt-12 sm:pt-16 lg:pt-24 pb-20 sm:pb-28 lg:pb-40 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {posts.map((post, i) => (
          <motion.a
            key={i}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square overflow-hidden group rounded-lg sm:rounded-xl border-2 border-[#e2ddd2]"
          >
            <img
              src={post.image}
              alt={post.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ objectPosition: post.objectPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b3d2e]/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-2 sm:px-4 py-2 sm:py-4">
              <span className="font-['DM_Mono'] font-semibold text-[9px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.16em] uppercase text-[#f0c040] block mb-0.5 sm:mb-1">
                {post.tag}
              </span>
              <p className="font-['DM_Mono'] font-semibold text-[11px] sm:text-[13px] text-white leading-snug">
                {post.caption}
              </p>
            </div>
            <div className="absolute inset-0 bg-[#0b3d2e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
                <LinkedInIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>

    </section>
  );
}