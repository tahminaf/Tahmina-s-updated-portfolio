"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { personalInfo, navItems } from "../../data/portfolioData";
import { useActiveSection } from "../../hooks/useActiveSection";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

interface Props {
  collapsed?: boolean;
  onScrollRequest: (id: string) => void;
}

/* ── Icons for each nav item ── */
const NavIcon = ({ id, className }: { id: string; className?: string }) => {
  const cls = className ?? "w-5 h-5";
  if (id === "home") return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
  if (id === "about") return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
  if (id === "tech") return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
  if (id === "experiences") return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12.01" />
      <path d="M2 12h20" />
    </svg>
  );
  if (id === "projects") return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
  if (id === "contact") return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
  return null;
};

export function Sidebar({ collapsed = false, onScrollRequest }: Props) {
  const active = useActiveSection(navItems.map((n) => n.id));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isExperiencePage = location.pathname === "/experience";
  const isProjectsPage = location.pathname === "/projects";
  const isOnSubPage = isExperiencePage || isProjectsPage;

  function handleNavClick(id: string) {
    if (id === "experiences") {
      navigate("/experience");
      window.scrollTo(0, 0);
    } else if (id === "projects") {
      navigate("/projects");
      window.scrollTo(0, 0);
    } else if (isOnSubPage) {
      onScrollRequest(id);
      navigate("/");
    } else {
      onScrollRequest(id);
    }
  }

  function isActive(id: string) {
    if (id === "experiences") return isExperiencePage;
    if (id === "projects") return isProjectsPage;
    return !isOnSubPage && active === id;
  }

  return (
    <>
      {/* ════════════════════════════════
          DESKTOP SIDEBAR  (≥ lg)
      ════════════════════════════════ */}
      <motion.aside
        className="hidden lg:flex fixed left-0 top-0 h-screen flex-col justify-between z-50 bg-[#0b3d2e] overflow-hidden"
        animate={{ width: collapsed ? 56 : 360 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Watermark */}
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 0.035 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-[-0.1em] right-[-0.08em] font-['Cormorant_Garamond'] font-light italic text-white pointer-events-none select-none leading-none"
              style={{ fontSize: 300 }} aria-hidden
            >TF</motion.span>
          )}
        </AnimatePresence>

        {/* ── COLLAPSED: icon-only nav — always rendered, shown via opacity ── */}
        <motion.div
          animate={{ opacity: collapsed ? 1 : 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 flex flex-col items-center justify-between py-4 z-10"
          style={{ pointerEvents: collapsed ? "auto" : "none", width: 56 }}
        >
          <div className="flex flex-col items-center w-full">
            {navItems.map((item) => {
              const activeItem = isActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={item.label}
                  className="w-full flex items-center justify-center py-[14px] transition-colors relative"
                  style={{
                    color: activeItem ? "#ffffff" : "#6aaa8a",
                    backgroundColor: activeItem ? "rgba(255,255,255,0.10)" : "transparent",
                  }}
                  onMouseEnter={(e) => { if (!activeItem) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { if (!activeItem) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
                >
                  {activeItem && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#c49a32] rounded-r-full" />
                  )}
                  <NavIcon id={item.id} className="w-[20px] h-[20px]" />
                </button>
              );
            })}
          </div>
          <motion.span
            className="w-[9px] h-[9px] rounded-full bg-[#4dba87] block mb-3 flex-shrink-0"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.div>

        {/* ── EXPANDED: full sidebar ── */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="relative z-20 flex flex-col justify-between h-full px-10 py-12"
            >
              <div>
                {/* Name */}
                <button
                  onClick={() => { onScrollRequest("home"); navigate("/"); }}
                  className="block text-left mb-14 group"
                >
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="font-['Cormorant_Garamond'] font-light text-[42px] tracking-wide text-white leading-none">
                      {personalInfo.name.split(" ")[0]}
                    </span>
                    <sup className="font-['DM_Mono'] text-[13px] font-semibold tracking-widest text-[#c49a32] ml-1">SWE</sup>
                  </div>
                  <span className="font-['Cormorant_Garamond'] font-light italic text-[42px] tracking-wide text-[#c49a32] leading-none block mb-5">
                    {personalInfo.name.split(" ")[1]}
                  </span>
                  <span className="block w-10 h-[2px] bg-white/25 mb-4" />
                  <p className="font-['DM_Mono'] font-semibold text-[16px] tracking-[0.12em] uppercase text-[#6aaa8a]">
                    {personalInfo.role}
                  </p>
                </button>

                {/* Nav with icons */}
                <nav className="flex flex-col gap-[2px]">
                  {navItems.map((item) => {
                    const activeItem = isActive(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className="relative flex items-center gap-4 py-4 px-4 text-left rounded-xl group transition-all duration-200 w-full"
                        style={{ backgroundColor: activeItem ? "rgba(255,255,255,0.08)" : "transparent" }}
                      >
                        <motion.span
                          className="rounded-full flex-shrink-0"
                          animate={{
                            width: 4,
                            height: activeItem ? 32 : 20,
                            backgroundColor: activeItem ? "#c49a32" : "rgba(255,255,255,0.18)",
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        <span style={{ color: activeItem ? "#ffffff" : "#6aaa8a" }} className="flex-shrink-0">
                          <NavIcon id={item.id} />
                        </span>
                        <motion.span
                          className="font-['DM_Mono'] text-[21px] tracking-[0.05em] lowercase"
                          animate={{
                            color: activeItem ? "#ffffff" : "#6aaa8a",
                            fontWeight: activeItem ? 600 : 300,
                          }}
                          transition={{ duration: 0.25 }}
                        >
                          {item.label}
                        </motion.span>
                        {activeItem && (
                          <motion.span
                            layoutId="desktop-active-dot"
                            className="ml-auto w-[7px] h-[7px] rounded-full bg-[#c49a32] flex-shrink-0"
                          />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Status */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 bg-white/[0.07] border border-white/[0.12] rounded-full px-5 py-3 w-fit">
                  <motion.span
                    className="w-[9px] h-[9px] rounded-full bg-[#4dba87] block flex-shrink-0"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="font-['DM_Mono'] font-semibold text-[14px] tracking-[0.06em] text-[#88bfa4]">
                    open to opportunities
                  </span>
                </div>
                <p className="font-['DM_Mono'] font-semibold text-[14px] tracking-[0.06em] text-[#3a7a5e]">
                  {personalInfo.location}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>

      {/* ════════════════════════════════
          MOBILE strip + slide-out
      ════════════════════════════════ */}
      <div className="lg:hidden fixed left-0 top-0 h-screen w-14 z-50 bg-[#0b3d2e] border-r border-white/[0.1] flex flex-col items-center justify-between py-7">
        <button onClick={() => setMobileOpen((v) => !v)} className="flex flex-col gap-[5px] p-2" aria-label="open menu">
          <motion.span className="block w-5 h-[2px] bg-white origin-center" animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} />
          <motion.span className="block w-5 h-[2px] bg-white" animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} />
          <motion.span className="block w-5 h-[2px] bg-white origin-center" animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.25 }} />
        </button>
        <span className="font-['Cormorant_Garamond'] font-light italic text-[#c49a32] select-none" style={{ writingMode: "vertical-rl", fontSize: 15, letterSpacing: "0.14em" }}>
          {personalInfo.name}
        </span>
        <motion.span className="w-[9px] h-[9px] rounded-full bg-[#4dba87] block" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} className="lg:hidden fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed left-0 top-0 h-screen w-[300px] z-[70] bg-[#0b3d2e] flex flex-col justify-between px-8 py-10 overflow-hidden"
            >
              <span className="absolute bottom-[-0.1em] right-[-0.1em] font-['Cormorant_Garamond'] font-light italic text-white pointer-events-none select-none leading-none" style={{ fontSize: 210, opacity: 0.035 }} aria-hidden>TF</span>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <button onClick={() => { onScrollRequest("home"); navigate("/"); setMobileOpen(false); }} className="text-left">
                    <div className="flex items-baseline gap-1 mb-0.5">
                      <span className="font-['Cormorant_Garamond'] font-light text-[40px] tracking-wide text-white leading-none">{personalInfo.name.split(" ")[0]}</span>
                      <sup className="font-['DM_Mono'] text-[11px] font-semibold text-[#c49a32] ml-1">SWE</sup>
                    </div>
                    <span className="font-['Cormorant_Garamond'] font-light italic text-[40px] tracking-wide text-[#c49a32] leading-none block mb-4">{personalInfo.name.split(" ")[1]}</span>
                    <p className="font-['DM_Mono'] font-semibold text-[14px] tracking-[0.12em] uppercase text-[#6aaa8a]">{personalInfo.role}</p>
                  </button>
                  <button onClick={() => setMobileOpen(false)} className="mt-2 w-9 h-9 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center flex-shrink-0 text-white/50 hover:text-white text-[16px] transition-colors">✕</button>
                </div>
                <span className="block w-8 h-[2px] bg-white/20 mb-7" />
                <nav className="flex flex-col gap-[2px]">
                  {navItems.map((item, i) => {
                    const activeItem = isActive(item.id);
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.045, duration: 0.3 }}
                        onClick={() => { handleNavClick(item.id); setMobileOpen(false); }}
                        className="flex items-center gap-4 py-4 px-3 rounded-xl text-left transition-colors duration-150"
                        style={{ backgroundColor: activeItem ? "rgba(255,255,255,0.08)" : "transparent" }}
                      >
                        <span className="rounded-full flex-shrink-0" style={{ width: 4, height: activeItem ? 28 : 18, backgroundColor: activeItem ? "#c49a32" : "rgba(255,255,255,0.15)" }} />
                        <span style={{ color: activeItem ? "#ffffff" : "#6aaa8a" }} className="flex-shrink-0"><NavIcon id={item.id} /></span>
                        <span className="font-['DM_Mono'] text-[20px] tracking-[0.04em] lowercase" style={{ color: activeItem ? "#ffffff" : "#6aaa8a", fontWeight: activeItem ? 600 : 300 }}>{item.label}</span>
                      </motion.button>
                    );
                  })}
                </nav>
              </div>
              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center gap-2 bg-white/[0.07] border border-white/[0.1] rounded-full px-4 py-2.5 w-fit">
                  <motion.span className="w-[8px] h-[8px] rounded-full bg-[#4dba87] block flex-shrink-0" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
                  <span className="font-['DM_Mono'] font-semibold text-[13px] tracking-[0.06em] text-[#88bfa4]">open to opportunities</span>
                </div>
                <p className="font-['DM_Mono'] font-semibold text-[13px] tracking-[0.06em] text-[#3a7a5e]">{personalInfo.location}</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}