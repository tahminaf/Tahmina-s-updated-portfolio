"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";
import { Footer } from "./components/layout/Footer";
import { TopBanner } from "./components/layout/TopBanner";
import { Hero } from "./components/sections/Hero";
import { TechStack } from "./components/sections/TechStack";
import { About } from "./components/sections/About";
import { ProjectsPage } from "./components/sections/ProjectsPage";
import { Contact } from "./components/sections/Contact";
import { ExperiencePage } from "./components/sections/ExperiencePage";

function HomePage({ scrollTarget, clearTarget }: { scrollTarget: string | null; clearTarget: () => void }) {
  const scrollTargetRef = useRef(scrollTarget);
  scrollTargetRef.current = scrollTarget;

  useEffect(() => {
    const id = scrollTargetRef.current;
    if (!id) return;
    let tries = 0;
    const interval = setInterval(() => {
      const el = document.getElementById(id);
      if (el) {
        clearInterval(interval);
        setTimeout(() => { el.scrollIntoView({ behavior: "smooth", block: "start" }); clearTarget(); }, 50);
      } else if (++tries > 20) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTarget]);

  return (
    <>
      <Hero />
      <TechStack />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const clearTarget = useCallback(() => setScrollTarget(null), []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // On mobile: always 56px (sidebar strip). On desktop: 360 or 56 based on collapsed.
  const marginLeft = isDesktop ? (collapsed ? 56 : 360) : 56;

  return (
    <div className="bg-[#fdfcf8] min-h-screen">
      <Sidebar
        collapsed={collapsed}
        onScrollRequest={setScrollTarget}
        onToggle={() => setCollapsed((v) => !v)}
      />

      <div
        className="min-w-0 pt-20"
        style={{
          marginLeft,
          transition: isDesktop ? "margin-left 0.3s cubic-bezier(0.16,1,0.3,1)" : "none",
        }}
      >
        <TopBanner />

        <Routes>
          <Route path="/" element={
            <HomePage scrollTarget={scrollTarget} clearTarget={clearTarget} />
          } />
          <Route path="/experience" element={<><ExperiencePage /><Footer /></>} />
          <Route path="/projects" element={<><ProjectsPage /><Footer /></>} />
        </Routes>
      </div>
    </div>
  );
}