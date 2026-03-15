"use client";

import { motion } from "framer-motion";
import { Project } from "../../data/portfolioData";

interface Props {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col p-10 transition-colors duration-250 ${
        project.dark ? "bg-[#0b3d2e] hover:bg-[#145c42]" : "bg-[#fdfcf8] hover:bg-[#fdfaf4]"
      }`}
    >
      <span className={`font-['Cormorant_Garamond'] font-light italic text-[52px] leading-none mb-5 block transition-colors duration-250 ${
        project.dark ? "text-white/10" : "text-[#c8c0b4]"
      }`}>
        {project.num}
      </span>

      <p className={`font-['DM_Mono'] font-bold text-[13px] tracking-[0.1em] uppercase mb-2 ${
        project.dark ? "text-[#f0c040]" : "text-[#8a6800]"
      }`}>
        {project.cat}
      </p>

      {project.winner && (
        <span className="inline-flex items-center gap-1.5 bg-[#faf3e0] border-2 border-[#d4b86a] text-[#8a6800] font-['DM_Mono'] font-bold text-[12px] tracking-[0.04em] px-3 py-[5px] rounded-full w-fit mb-3">
          {project.winner}
        </span>
      )}

      <h3
        className={`font-['Cormorant_Garamond'] font-light text-[30px] leading-[1.15] mb-3 ${
          project.dark ? "text-white" : "text-[#16130e]"
        }`}
        dangerouslySetInnerHTML={{ __html: project.title }}
      />

      <p className={`font-['DM_Mono'] text-[15px] leading-[1.85] flex-1 mb-6 ${
        project.dark ? "text-[#a0d0b8]" : "text-[#3a342a]"
      }`}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-[6px] mb-6">
        {project.tech.map((t) => (
          <span key={t} className={`font-['DM_Mono'] font-semibold text-[12px] tracking-[0.04em] px-3 py-[5px] rounded-full border-2 ${
            project.dark
              ? "text-[#c8f0dc] bg-white/8 border-white/20"
              : "text-[#0d4d35] bg-[#d8f0e4] border-[#7fbfa0]"
          }`}>
            {t}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-['DM_Mono'] font-bold text-[13px] tracking-[0.08em] lowercase border-b-2 pb-[2px] w-fit mt-auto transition-colors duration-200 ${
            project.dark
              ? "text-[#a0d0b8] border-white/25 hover:text-white hover:border-white/60"
              : "text-[#0d5c40] border-[#7fbfa0] hover:text-[#0b3d2e] hover:border-[#0b3d2e]"
          }`}
        >
          view on github →
        </a>
      )}
    </motion.div>
  );
}