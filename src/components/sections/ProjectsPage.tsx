"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "../../data/portfolioData";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const previewImages: Record<string, string> = {
  "01": "/ease.png",
  "02": "/saath.png",
  "03": "/amal.png",
  "04": "/study_sync.png",
  "05": "/superhero.png",
  "06": "/century_medical.png",
  "07": "/century_aesthetics.png",
};

const imagePosition: Record<string, string> = {
  "05": "left bottom",
};

function TechModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl bg-[#fdfcf8] rounded-2xl border-2 border-[#e2ddd2] p-8 shadow-2xl z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f0ece3] border border-[#e2ddd2] flex items-center justify-center text-[#928c82] hover:text-[#16130e] hover:bg-[#e8e4dc] transition-colors text-[16px]">✕</button>
          <p className="font-['DM_Mono'] font-semibold text-[11px] tracking-[0.18em] uppercase text-[#8a6800] mb-2">{project.cat}</p>
          <h3 className="font-['Cormorant_Garamond'] font-light text-[32px] text-[#16130e] leading-tight mb-1">{project.title}</h3>
          <p className="font-['DM_Mono'] font-semibold text-[12px] tracking-[0.08em] text-[#928c82] mb-6">{project.tech.length} technologies</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="font-['DM_Mono'] font-semibold text-[13px] tracking-[0.04em] px-4 py-2 rounded-full text-[#0d4d35] bg-[#d8f0e4] border-2 border-[#7fbfa0]">{t}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectCard({ project, index, onTechClick }: { project: Project; index: number; onTechClick: () => void }) {
  const img = previewImages[project.num];
  const imgPos = imagePosition[project.num] ?? "left top";

  const linkButtons: { label: string; url: string; primary?: boolean }[] = [];
  if (project.links && project.links.length > 0) {
    project.links.forEach((l, idx) => linkButtons.push({ ...l, primary: idx === 0 }));
  } else {
    if (project.liveLink) linkButtons.push({ label: "live site ↗", url: project.liveLink, primary: true });
    if (project.link) linkButtons.push({ label: "github →", url: project.link, primary: !project.liveLink });
  }

  return (
    <motion.div
      {...fadeUp(index * 0.06)}
      className="grid grid-cols-1 xl:grid-cols-[1fr_300px] border-2 border-[#e2ddd2] rounded-2xl overflow-hidden hover:border-[#7fbfa0] transition-colors duration-300 bg-[#fdfcf8]"
      style={{ minHeight: 320 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr]">
        <div className="bg-[#0b3d2e] px-6 py-8 flex flex-col justify-between border-b-2 md:border-b-0 md:border-r-2 border-white/[0.1]">
          <div>
            <span className="font-['Cormorant_Garamond'] font-light italic text-[44px] text-white/10 leading-none block mb-3">{project.num}</span>
            <p className="font-['DM_Mono'] font-bold text-[11px] tracking-[0.12em] uppercase text-[#f0c040]">{project.cat}</p>
          </div>
          {project.winner && (
            <span className="font-['DM_Mono'] font-semibold text-[11px] tracking-[0.04em] text-[#c49a32] bg-white/[0.07] border border-white/[0.12] rounded-lg px-3 py-2 mt-4 block leading-snug">{project.winner}</span>
          )}
        </div>
        <div className="px-8 py-8 border-b-2 xl:border-b-0 xl:border-r-2 border-[#e2ddd2] flex flex-col">
          <h3 className="font-['Cormorant_Garamond'] font-light text-[26px] text-[#16130e] leading-tight mb-4">{project.title}</h3>
          <p className="font-['DM_Mono'] text-[15px] leading-[1.85] text-[#2a231a] mb-6 flex-1">{project.description}</p>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="font-['DM_Mono'] font-semibold text-[12px] tracking-[0.04em] px-3 py-[5px] rounded-full text-[#0d4d35] bg-[#d8f0e4] border-2 border-[#7fbfa0]">{t}</span>
            ))}
            {project.tech.length > 4 && (
              <button onClick={onTechClick} className="font-['DM_Mono'] font-semibold text-[12px] tracking-[0.04em] px-3 py-[5px] rounded-full text-[#8a6800] bg-[#faf3e0] border-2 border-[#d4b86a] hover:bg-[#f5e8c0] transition-colors cursor-pointer">
                +{project.tech.length - 4} more
              </button>
            )}
          </div>
          {linkButtons.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {linkButtons.map((btn) => (
                <a key={btn.label} href={btn.url} target="_blank" rel="noopener noreferrer"
                  className={`font-['DM_Mono'] font-bold text-[13px] tracking-[0.08em] lowercase px-5 py-2.5 rounded-full border-2 transition-all duration-200 ${btn.primary ? "text-white bg-[#0b3d2e] border-[#0b3d2e] hover:bg-[#145c42]" : "text-[#0d5c40] border-[#7fbfa0] hover:bg-[#d8f0e4]"}`}>
                  {btn.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col" style={{ minHeight: 280 }}>
        <div className="flex-1 bg-[#edeae4] overflow-hidden relative" style={{ minHeight: 240 }}>
          {img ? (
            <img src={img} alt={project.title} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: imgPos }} />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#928c82]">
              <svg viewBox="0 0 48 48" className="w-10 h-10 opacity-25" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="8" width="40" height="28" rx="3" /><path d="M4 30l10-8 8 6 8-10 14 10" /><circle cx="16" cy="18" r="3" />
              </svg>
              <span className="font-['DM_Mono'] text-[11px] tracking-[0.1em] text-[#b0a898]">preview image</span>
            </div>
          )}
        </div>
        <div className="px-5 py-3 bg-[#f0ece3] border-t-2 border-[#e2ddd2] flex-shrink-0">
          <p className="font-['DM_Mono'] font-semibold text-[11px] tracking-[0.12em] uppercase text-[#928c82]">{project.title}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsPage() {
  const [modalProject, setModalProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="min-h-screen bg-[#fdfcf8]">

      {/* ── Cream header — consistent with rest of site ── */}
      <div className="px-8 md:px-16 pt-16 pb-14 border-b-2 border-[#e2ddd2]">
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="font-['DM_Mono'] font-semibold text-[13px] tracking-[0.18em] uppercase text-[#8a6800] mb-5"
        >
          selected work
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08 }}
          className="font-['Cormorant_Garamond'] font-light text-[#16130e] leading-[0.95] tracking-[-0.02em] mb-6"
          style={{ fontSize: "clamp(52px, 7vw, 96px)" }}
        >
          My <em className="text-[#0b3d2e]">Projects</em>
        </motion.h1>
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.14 }}
          className="block w-10 h-[2px] bg-[#a07c20] mb-6"
        />
        <div className="flex items-end justify-between flex-wrap gap-4">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }}
            className="font-['DM_Mono'] text-[15px] leading-[1.9] text-[#3a342a] max-w-[600px]"
          >
            A selection of things I've built — hackathon wins, client sites, team projects, and systems work.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }}
            className="flex items-center gap-2"
          >
            <span className="font-['Cormorant_Garamond'] font-light italic text-[32px] text-[#0b3d2e] leading-none">
              {String(projects.length).padStart(2, "0")}
            </span>
            <span className="font-['DM_Mono'] font-semibold text-[13px] tracking-[0.14em] uppercase text-[#928c82]">
              projects
            </span>
          </motion.div>
        </div>
      </div>

      <div className="px-8 md:px-16 py-16 space-y-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.num} project={project} index={i} onTechClick={() => setModalProject(project)} />
        ))}
      </div>

      {modalProject && <TechModal project={modalProject} onClose={() => setModalProject(null)} />}
    </section>
  );
}