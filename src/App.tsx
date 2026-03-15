"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
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
        // small delay so layout settles
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          clearTarget();
        }, 50);
      } else if (++tries > 20) {
        clearInterval(interval);
      }
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

  const clearTarget = useCallback(() => setScrollTarget(null), []);

  return (
    <div className="bg-[#fdfcf8] min-h-screen flex">
      <Sidebar
        collapsed={collapsed}
        onScrollRequest={setScrollTarget}
      />

      <motion.main
        className="flex-1 min-w-0 ml-14 lg:ml-[360px]"
        animate={{ marginLeft: collapsed ? 56 : 360 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <TopBanner collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

        <Routes>
          <Route path="/" element={
            <HomePage scrollTarget={scrollTarget} clearTarget={clearTarget} />
          } />
          <Route path="/experience" element={<><ExperiencePage /><Footer /></>} />
          <Route path="/projects" element={<><ProjectsPage /><Footer /></>} />
        </Routes>
      </motion.main>
    </div>
  );
}