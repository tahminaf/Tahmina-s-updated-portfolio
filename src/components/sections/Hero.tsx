"use client";

import { motion } from "framer-motion";
import { personalInfo } from "../../data/portfolioData";

const tahminaImg = "/tahmina.jpg";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const stats = [
  { label: "school",   value: "UB Honors College" },
  { label: "major",    value: "Computer Science" },
  { label: "based in", value: "Buffalo, NY" },
  { label: "status",   value: "Open to Work" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-[#fdfcf8] dark:bg-[#0d1f18] grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_374px] border-b border-[#e2ddd2] dark:border-[#243828] transition-colors duration-300"
    >
      {/* ── LEFT ── */}
      <div className="flex flex-col justify-start px-4 sm:px-8 lg:px-16 pt-6 sm:pt-10 lg:pt-14 pb-10 lg:pb-20 lg:border-r border-[#e2ddd2] dark:border-[#243828] min-w-0">

        {/* Eyebrow */}
        <motion.p
          {...fadeUp(0.06)}
          className="font-['DM_Mono'] font-semibold text-[10px] sm:text-[13px] tracking-[0.16em] uppercase text-[#8a6800] dark:text-[#c8a040] mb-4 sm:mb-6"
        >
          software engineer &nbsp;·&nbsp; buffalo, ny
        </motion.p>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.14)}
          className="font-['Cormorant_Garamond'] font-light tracking-[-0.03em] text-[#16130e] dark:text-white leading-[0.9] mb-2"
          style={{ fontSize: "clamp(40px, 5vw, 96px)" }}
        >
          Tahmina{" "}
          <span className="italic text-[#0b3d2e] dark:text-[#7fbfa0]">Fayezi</span>
        </motion.h1>

        <motion.span {...fadeUp(0.2)} className="block w-full h-[2px] bg-[#e8d9a8] dark:bg-[#2a2010] mb-4 sm:mb-6" />

        {/* Subtitle */}
        <motion.div {...fadeUp(0.26)} className="mb-4 sm:mb-6">
          <span className="font-['DM_Mono'] font-semibold text-[12px] sm:text-[15px] tracking-[0.08em] text-[#2a231a] dark:text-[#e8e8e8]">
            {personalInfo.subtitle}
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          {...fadeUp(0.32)}
          className="font-['DM_Mono'] text-[12px] sm:text-[15px] leading-[1.85] text-[#2a231a] dark:text-[#e8e8e8] max-w-[720px] mb-6 sm:mb-10"
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTA buttons */}
        <motion.div {...fadeUp(0.4)} className="flex flex-nowrap gap-2 mb-6 sm:mb-10">
          <button
            onClick={() => scrollTo("projects")}
            className="font-['DM_Mono'] font-semibold text-[10px] sm:text-[13px] tracking-[0.06em] lowercase px-3 sm:px-6 py-2 sm:py-3 rounded-full bg-[#0b3d2e] dark:bg-[#1a3d2a] text-white hover:bg-[#145c42] dark:hover:bg-[#2d6648] transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            view my work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="font-['DM_Mono'] font-semibold text-[10px] sm:text-[13px] tracking-[0.06em] lowercase px-3 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-[#928c82] dark:border-[#3a3830] text-[#16130e] dark:text-white hover:border-[#16130e] dark:hover:border-[#7a7268] transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            say hello
          </button>
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-['DM_Mono'] font-semibold text-[10px] sm:text-[13px] tracking-[0.06em] lowercase px-3 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-[#d4b86a] dark:border-[#8a6820] text-[#8a6800] dark:text-[#c8a040] hover:bg-[#faf3e0] dark:hover:bg-[#2a2010] transition-all duration-200 whitespace-nowrap"
          >
            résumé ↗
          </a>
        </motion.div>

        {/* Stats pills */}
        <motion.div {...fadeUp(0.48)} className="flex flex-wrap gap-1.5 sm:gap-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#e2ddd2] dark:border-[#243828] sm:border-2 bg-[#f7f4ed] dark:bg-[#162419]"
            >
              <span className="font-['DM_Mono'] font-semibold text-[9px] sm:text-[10px] tracking-[0.12em] uppercase text-[#928c82] dark:text-[#cccccc]">
                {stat.label}
              </span>
              <span className="w-px h-2.5 sm:h-3 bg-[#e2ddd2] dark:bg-[#243828]" />
              <span className="font-['DM_Mono'] font-semibold text-[10px] sm:text-[11px] text-[#0b3d2e] dark:text-[#7fbfa0]">
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* ── RIGHT: photo — hidden on mobile ── */}
      <div className="hidden lg:flex flex-col justify-start pt-14 px-8 xl:px-10 pb-12 bg-[#f7f4ed] dark:bg-[#111c16] transition-colors duration-300">
        <motion.div
          {...fadeUp(0.2)}
          className="relative w-full"
        >
          {/* Gold offset frame */}
          <div className="absolute -top-3 -left-3 right-3 bottom-3 border-2 border-[#d4b86a] dark:border-[#8a6820] rounded-[8px] pointer-events-none z-0" />
          <div
            className="relative w-full rounded-[8px] overflow-hidden border-2 border-[#c8c0b4] dark:border-[#243828] z-10"
            style={{ aspectRatio: "5/7" }}
          >
            <img
              src={tahminaImg}
              alt="Tahmina Fayezi"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
