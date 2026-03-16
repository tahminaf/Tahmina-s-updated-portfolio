"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TopBanner() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 10) {
        setVisible(true);
      } else if (y > lastY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  const marqueeText = "software engineer · computer science · buffalo, ny · open to work · ";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="banner"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-[#fdfcf8] border-b border-[#e2ddd2] flex items-center h-20 overflow-hidden fixed top-0 z-40"
        >
          {/* Scrolling marquee */}
          <div className="flex-1 overflow-hidden relative mx-8">
            <motion.div
              className="flex whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="font-['DM_Mono'] font-semibold text-[13px] tracking-[0.18em] uppercase text-[#928c82] mr-16"
                >
                  {marqueeText}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Year */}
          <span className="flex-shrink-0 font-['DM_Mono'] font-semibold text-[13px] tracking-[0.14em] text-[#c8c0b4] pr-8">
            2026
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}