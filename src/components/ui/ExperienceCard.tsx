"use client";

import { motion } from "framer-motion";
import { Experience } from "../../data/portfolioData";

interface Props {
  item: Experience;
  index: number;
}

export function ExperienceCard({ item, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 xl:grid-cols-[1fr_340px] border-2 border-[#e2ddd2] rounded-xl overflow-hidden"
    >
      {/* ── LEFT: content ── */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">

        {/* Org / period sidebar */}
        <div className={`px-8 py-10 flex flex-col justify-between border-b-2 md:border-b-0 md:border-r-2 ${
          item.dark
            ? "bg-[#0b3d2e] border-white/[0.1]"
            : "bg-[#f0ece3] border-[#e2ddd2]"
        }`}>
          <p className={`font-['Cormorant_Garamond'] font-light text-[28px] leading-[1.15] ${
            item.dark ? "text-white" : "text-[#16130e]"
          }`}>
            {item.org}
          </p>
          <p className={`font-['DM_Mono'] font-semibold text-[13px] tracking-[0.06em] mt-6 ${
            item.dark ? "text-[#f0c040]" : "text-[#8a6800]"
          }`}>
            {item.period}
          </p>
        </div>

        {/* Body */}
        <div className="bg-[#fdfcf8] px-8 py-10 border-b-2 xl:border-b-0 border-[#e2ddd2]">
          <p className="font-['DM_Mono'] font-bold text-[15px] tracking-[0.06em] text-[#0d5c40] mb-1">
            {item.role}
          </p>
          <p className="font-['DM_Mono'] font-semibold text-[13px] text-[#6b6358] mb-6">
            {item.location}
          </p>
          <p className="font-['DM_Mono'] text-[15px] leading-[1.85] text-[#2a231a] mb-6">
            {item.description}
          </p>
          <ul className="mb-6 space-y-2">
            {item.achievements.map((a) => (
              <li key={a} className="font-['DM_Mono'] text-[15px] leading-[1.8] text-[#2a231a] pl-5 relative">
                <span className="absolute left-0 text-[#a07c20] font-bold">—</span>
                {a}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-[6px]">
            {item.skills.map((s) => (
              <span key={s} className="font-['DM_Mono'] font-semibold text-[12px] tracking-[0.04em] px-3 py-[5px] rounded-full text-[#0d4d35] bg-[#d8f0e4] border-2 border-[#7fbfa0]">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: image slot ── */}
      <div className="bg-[#f7f4ed] border-l-0 xl:border-l-2 border-[#e2ddd2] flex flex-col">
        {/* Image area — replace div contents with <img> when ready */}
        <div className="flex-1 min-h-[220px] bg-[#e8e4dc] flex flex-col items-center justify-center gap-3 text-[#928c82] relative overflow-hidden">
          {item.previewImg ? (
            <img
              src={item.previewImg}
              alt={`${item.org} preview`}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <>
              <svg viewBox="0 0 48 48" className="w-10 h-10 opacity-30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="8" width="40" height="28" rx="3" />
                <path d="M4 32l10-8 8 6 8-10 14 10" />
                <circle cx="16" cy="18" r="3" />
              </svg>
              <span className="font-['DM_Mono'] text-[12px] tracking-[0.08em] text-[#b0a898]">add preview image</span>
            </>
          )}
        </div>

        {/* Caption bar */}
        <div className="px-6 py-4 border-t-2 border-[#e2ddd2] bg-[#f0ece3]">
          <p className="font-['DM_Mono'] font-semibold text-[11px] tracking-[0.14em] uppercase text-[#928c82]">
            {item.org} &nbsp;·&nbsp; {item.period}
          </p>
        </div>
      </div>

    </motion.div>
  );
}