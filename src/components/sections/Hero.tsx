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
  { label: "school",   value: "University at Buffalo Honors College" },
  { label: "major",    value: "Computer Science" },
  { label: "based in", value: "Buffalo, NY" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-[#fdfcf8] grid grid-cols-1 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_560px] border-b border-[#e2ddd2]"
    >
      {/* ── LEFT ── */}
      <div className="flex flex-col justify-start px-5 sm:px-8 md:px-12 lg:px-16 pt-8 sm:pt-10 pb-12 lg:pt-14 lg:pb-20 lg:border-r border-[#e2ddd2] overflow-hidden min-w-0">

        <motion.p
          {...fadeUp(0.06)}
          className="font-['DM_Mono'] font-semibold text-[11px] sm:text-[13px] tracking-[0.16em] sm:tracking-[0.18em] uppercase text-[#8a6800] mb-5 sm:mb-6"
        >
          software engineer &nbsp;·&nbsp; buffalo, ny
        </motion.p>

        <motion.h1
          {...fadeUp(0.14)}
          className="font-['Cormorant_Garamond'] font-light tracking-[-0.03em] text-[#16130e] leading-[0.9] mb-2"
          style={{ fontSize: "clamp(44px, 8vw, 96px)" }}
        >
          Tahmina{" "}
          <span className="italic text-[#0b3d2e]">Fayezi</span>
        </motion.h1>

        <motion.span {...fadeUp(0.2)} className="block w-full h-[2px] bg-[#e8d9a8] mb-5 sm:mb-6" />

        <motion.div {...fadeUp(0.26)} className="flex items-center gap-4 mb-5 sm:mb-7">
          <span className="font-['DM_Mono'] font-semibold text-[13px] sm:text-[15px] tracking-[0.08em] text-[#2a231a]">
            {personalInfo.subtitle}
          </span>
        </motion.div>

        <motion.p
          {...fadeUp(0.32)}
          className="font-['DM_Mono'] text-[13px] sm:text-[15px] leading-[1.9] text-[#2a231a] max-w-[720px] mb-8 sm:mb-10"
        >
          {personalInfo.bio}
        </motion.p>

        <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-10">
          <button
            onClick={() => scrollTo("projects")}
            className="font-['DM_Mono'] font-semibold text-[13px] sm:text-[15px] tracking-[0.08em] lowercase px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#0b3d2e] text-white hover:bg-[#145c42] transition-colors duration-200 cursor-pointer"
          >
            view my work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="font-['DM_Mono'] font-semibold text-[13px] sm:text-[15px] tracking-[0.08em] lowercase px-5 sm:px-7 py-3 sm:py-3.5 rounded-full border-2 border-[#928c82] text-[#16130e] hover:border-[#16130e] transition-all duration-200 cursor-pointer"
          >
            say hello
          </button>
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-['DM_Mono'] font-semibold text-[13px] sm:text-[15px] tracking-[0.08em] lowercase px-5 sm:px-7 py-3 sm:py-3.5 rounded-full border-2 border-[#d4b86a] text-[#8a6800] hover:bg-[#faf3e0] transition-all duration-200"
          >
            résumé ↗
          </a>
        </motion.div>

        {/* Stats pills */}
        <motion.div
          {...fadeUp(0.48)}
          className="flex flex-wrap gap-2"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-[#e2ddd2] bg-[#f7f4ed]"
            >
              <span className="font-['DM_Mono'] font-semibold text-[10px] tracking-[0.14em] uppercase text-[#928c82]">
                {stat.label}
              </span>
              <span className="w-[1px] h-3 bg-[#e2ddd2]" />
              <span className="font-['DM_Mono'] font-semibold text-[12px] text-[#0b3d2e]">
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* ── RIGHT: photo — hidden on mobile ── */}
      <div className="hidden lg:flex flex-col justify-start pt-14 px-8 xl:px-10 pb-12 bg-[#f7f4ed]">
        <motion.div
          {...fadeUp(0.2)}
          className="relative w-full"
        >
          {/* Gold offset frame */}
          <div className="absolute -top-3 -left-3 right-3 bottom-3 border-2 border-[#d4b86a] rounded-[8px] pointer-events-none z-0" />

          <div
            className="relative w-full rounded-[8px] overflow-hidden border-2 border-[#c8c0b4] z-10"
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