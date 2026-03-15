"use client";

import { motion } from "framer-motion";
import { experiences, Experience } from "../../data/portfolioData";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const previewImages: Record<string, string> = {
  "University at Buffalo": "/ub.jpeg",
  "M&T Bank": "/m_t.png",
  "PwC — Tax Innovation": "/pwc.jpg",
  "UB Forge": "/forge.png",
  "Codepath": "/codepath.png",
};

function Card({ item, index }: { item: Experience; index: number }) {
  const img = previewImages[item.org] ?? null;

  return (
    <motion.div
      {...fadeUp(index * 0.07)}
      className="grid grid-cols-1 xl:grid-cols-[1fr_320px] border-2 border-[#e2ddd2] rounded-2xl overflow-hidden bg-[#fdfcf8] hover:border-[#7fbfa0] transition-colors duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-[210px_1fr]">
        <div className="bg-[#0b3d2e] px-7 py-8 flex flex-col justify-between border-b-2 md:border-b-0 md:border-r-2 border-white/[0.1]">
          <p className="font-['Cormorant_Garamond'] font-light text-[26px] leading-[1.2] text-white">{item.org}</p>
          <p className="font-['DM_Mono'] font-semibold text-[13px] tracking-[0.06em] text-[#f0c040] mt-6">{item.period}</p>
        </div>
        <div className="px-8 py-8 border-b-2 xl:border-b-0 xl:border-r-2 border-[#e2ddd2] flex flex-col">
          <p className="font-['DM_Mono'] font-bold text-[15px] tracking-[0.05em] text-[#0d5c40] mb-1">{item.role}</p>
          <p className="font-['DM_Mono'] font-semibold text-[13px] text-[#6b6358] mb-5">{item.location}</p>
          <p className="font-['DM_Mono'] text-[15px] leading-[1.85] text-[#2a231a] mb-5 flex-1">{item.description}</p>
          {item.achievements.length > 0 && (
            <ul className="mb-5 space-y-2">
              {item.achievements.map((a) => (
                <li key={a} className="font-['DM_Mono'] text-[14px] leading-[1.8] text-[#2a231a] pl-5 relative">
                  <span className="absolute left-0 text-[#0b3d2e] font-bold">—</span>{a}
                </li>
              ))}
            </ul>
          )}
          {item.skills.length > 0 && (
            <div className="flex flex-wrap gap-[6px]">
              {item.skills.map((s) => (
                <span key={s} className="font-['DM_Mono'] font-semibold text-[12px] tracking-[0.04em] px-3 py-[5px] rounded-full text-[#0d4d35] bg-[#d8f0e4] border-2 border-[#7fbfa0]">{s}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col min-h-[200px]">
        <div className="flex-1 bg-[#edeae4] flex flex-col items-center justify-center gap-3 text-[#928c82] overflow-hidden">
          {img ? (
            <img src={img} alt={`${item.org} preview`} className="w-full h-full object-cover object-top" />
          ) : (
            <>
              <svg viewBox="0 0 48 48" className="w-10 h-10 opacity-25" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="8" width="40" height="28" rx="3" /><path d="M4 30l10-8 8 6 8-10 14 10" /><circle cx="16" cy="18" r="3" />
              </svg>
              <span className="font-['DM_Mono'] text-[11px] tracking-[0.1em] text-[#b0a898]">preview image</span>
            </>
          )}
        </div>
        <div className="px-5 py-3 bg-[#f0ece3] border-t-2 border-[#e2ddd2]">
          <p className="font-['DM_Mono'] font-semibold text-[11px] tracking-[0.12em] uppercase text-[#928c82]">{item.org} &nbsp;·&nbsp; {item.period}</p>
        </div>
      </div>
    </motion.div>
  );
}

function Group({ label, items }: { label: string; items: Experience[] }) {
  return (
    <div>
      <motion.div {...fadeUp(0)} className="flex items-center gap-5 mb-8 pb-4 border-b-2 border-[#e2ddd2]">
        <span className="font-['DM_Mono'] font-bold text-[14px] tracking-[0.16em] uppercase text-[#2a231a]">{label}</span>
        <div className="flex-1 h-[1px] bg-[#e2ddd2]" />
        <span className="font-['Cormorant_Garamond'] font-light italic text-[32px] leading-none text-[#0b3d2e]">
          {String(items.length).padStart(2, "0")}
        </span>
      </motion.div>
      <div className="space-y-5">
        {items.map((item, i) => <Card key={`${item.org}-${i}`} item={item} index={i} />)}
      </div>
    </div>
  );
}

export function ExperiencePage() {
  return (
    <section id="experiences" className="min-h-screen bg-[#fdfcf8]">

      {/* ── Cream header — consistent with rest of site ── */}
      <div className="px-8 md:px-16 pt-16 pb-14 border-b-2 border-[#e2ddd2]">
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="font-['DM_Mono'] font-semibold text-[13px] tracking-[0.18em] uppercase text-[#8a6800] mb-5"
        >
          my journey
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08 }}
          className="font-['Cormorant_Garamond'] font-light text-[#16130e] leading-[0.95] tracking-[-0.02em] mb-6"
          style={{ fontSize: "clamp(52px, 7vw, 96px)" }}
        >
          Experience &amp;<br />
          <em className="text-[#0b3d2e]">Education</em>
        </motion.h1>
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.14 }}
          className="block w-10 h-[2px] bg-[#a07c20] mb-6"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }}
          className="font-['DM_Mono'] text-[17px] leading-[1.9] text-[#3a342a] max-w-[600px]"
        >
          A record of the roles, institutions, and programs that have shaped how I think about software, leadership, and craft.
        </motion.p>
      </div>

      <div className="px-8 md:px-16 py-16 space-y-16">
        <Group label="Education"                  items={experiences.education}  />
        <Group label="Work Experience"            items={experiences.work}       />
        <Group label="Leadership & Organizations" items={experiences.clubs}      />
        <Group label="Coursework"                 items={experiences.coursework} />
      </div>
    </section>
  );
}