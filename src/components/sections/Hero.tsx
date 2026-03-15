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
  { label: "status",   value: "Open to Work" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-[#fdfcf8] grid grid-cols-1 lg:grid-cols-[1fr_560px] border-b border-[#e2ddd2]"
    >
      {/* ── LEFT ── */}
      <div className="flex flex-col justify-start px-8 md:px-16 pt-24 pb-16 lg:pt-28 lg:pb-20 lg:border-r border-[#e2ddd2] overflow-hidden min-w-0">

        <motion.p
          {...fadeUp(0.06)}
          className="font-['DM_Mono'] font-semibold text-[13px] tracking-[0.18em] uppercase text-[#8a6800] mb-6"
        >
          software engineer &nbsp;·&nbsp; buffalo, ny
        </motion.p>

        <motion.h1
          {...fadeUp(0.14)}
          className="font-['Cormorant_Garamond'] font-light tracking-[-0.03em] text-[#16130e] leading-[0.9] mb-2"
          style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
        >
          Tahmina{" "}
          <span className="italic text-[#0b3d2e]">Fayezi</span>
        </motion.h1>

        <motion.span {...fadeUp(0.2)} className="block w-full h-[2px] bg-[#e8d9a8] mb-6" />

        <motion.div {...fadeUp(0.26)} className="flex items-center gap-4 mb-7">
          <span className="font-['DM_Mono'] font-semibold text-[15px] tracking-[0.08em] text-[#2a231a]">
            {personalInfo.subtitle}
          </span>
        </motion.div>

        <motion.p
          {...fadeUp(0.32)}
          className="font-['DM_Mono'] text-[15px] leading-[1.9] text-[#2a231a] max-w-[720px] mb-10"
        >
          {personalInfo.bio}
        </motion.p>

        <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => scrollTo("projects")}
            className="font-['DM_Mono'] font-semibold text-[15px] tracking-[0.08em] lowercase px-7 py-3.5 rounded-full bg-[#0b3d2e] text-white hover:bg-[#145c42] transition-colors duration-200 cursor-pointer"
          >
            view my work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="font-['DM_Mono'] font-semibold text-[15px] tracking-[0.08em] lowercase px-7 py-3.5 rounded-full border-2 border-[#928c82] text-[#16130e] hover:border-[#16130e] transition-all duration-200 cursor-pointer"
          >
            say hello
          </button>
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-['DM_Mono'] font-semibold text-[15px] tracking-[0.08em] lowercase px-7 py-3.5 rounded-full border-2 border-[#d4b86a] text-[#8a6800] hover:bg-[#faf3e0] transition-all duration-200"
          >
            résumé ↗
          </a>
        </motion.div>

        {/* Stats strip — pulled up directly after buttons, no mt-auto */}
        <motion.div
          {...fadeUp(0.48)}
          className="grid grid-cols-2 md:grid-cols-4 border-2 border-[#e2ddd2] rounded-xl overflow-hidden"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="px-6 py-7 bg-[#f7f4ed]"
              style={{ borderRight: i < stats.length - 1 ? "2px solid #e2ddd2" : "none" }}
            >
              <p className="font-['DM_Mono'] font-semibold text-[14px] tracking-[0.14em] uppercase text-[#928c82] mb-2">
                {stat.label}
              </p>
              <p className="font-['Cormorant_Garamond'] font-light text-[26px] text-[#16130e] tracking-wide leading-snug">
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>

      </div>

      {/* ── RIGHT: photo ── */}
      <div className="hidden lg:flex flex-col justify-start pt-28 lg:pt-32 px-10 pb-12 bg-[#f7f4ed]">
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