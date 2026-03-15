"use client";

import { motion } from "framer-motion";

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

export function TopBanner({ collapsed, onToggle }: Props) {
  const marqueeText = "software engineer · computer science · buffalo, ny · open to work · ";

  return (
    <div className="w-full bg-[#fdfcf8] border-b border-[#e2ddd2] flex items-center h-20 overflow-hidden">

      {/* Collapse toggle button */}
      <button
        onClick={onToggle}
        className="flex-shrink-0 h-full px-6 flex items-center justify-center border-r border-[#e2ddd2] hover:bg-[#f0ece3] transition-colors duration-150 group"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <motion.div
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-[6px]"
        >
          <span className="block w-6 h-[2px] bg-[#928c82] group-hover:bg-[#16130e] transition-colors" />
          <span className="block w-4 h-[2px] bg-[#928c82] group-hover:bg-[#16130e] transition-colors" />
          <span className="block w-6 h-[2px] bg-[#928c82] group-hover:bg-[#16130e] transition-colors" />
        </motion.div>
      </button>

      {/* Scrolling marquee */}
      <div className="flex-1 overflow-hidden relative mx-4">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {/* Duplicate for seamless loop */}
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="font-['DM_Mono'] font-semibold text-[16px] tracking-[0.18em] uppercase text-[#928c82] mr-16"
            >
              {marqueeText}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Year — right */}
      <span className="flex-shrink-0 font-['DM_Mono'] font-semibold text-[16px] tracking-[0.14em] text-[#c8c0b4] pr-8">
        2026
      </span>

    </div>
  );
}