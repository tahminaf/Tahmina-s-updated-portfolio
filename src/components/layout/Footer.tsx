"use client";

import { personalInfo } from "../../data/portfolioData";

export function Footer() {
  return (
    <footer className="border-t-2 border-[#e2ddd2] px-8 md:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="font-['DM_Mono'] font-semibold text-[14px] tracking-[0.04em] text-[#6b6358]">
        © 2025 <span className="text-[#8a6800]">{personalInfo.name}</span>. Built with React, Tailwind &amp; lots of{" "}
        <span className="text-[#8a6800]">♥</span>
      </p>
      <p className="font-['Cormorant_Garamond'] font-light italic text-[19px] text-[#6b6358]">
        {personalInfo.location}
      </p>
    </footer>
  );
}